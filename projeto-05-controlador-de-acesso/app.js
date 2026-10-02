// app.js
import http from 'http';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import db from './database.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const publicDir = path.join(__dirname, 'public');

const contentTypes = {
    '.html': 'text/html; charset=utf-8',
    '.css': 'text/css; charset=utf-8',
    '.js': 'text/javascript; charset=utf-8',
    '.json': 'application/json; charset=utf-8'
};

class ContextoRequisicao {
    constructor(request, response, url, pathname, method, body = {}) {
        this.request = request;
        this.response = response;
        this.url = url;
        this.pathname = pathname;
        this.method = method;
        this.body = body;
        this.idParam = url.searchParams.get('id');
        this.perfilUsuario = request.headers['x-user-role'] || 'CLIENTE';
    }
}

// Estrutura chain (controlador)
class EtapaProcesso {
    constructor() {
        this.proximaEtapa = null;
    }
    setProximaEtapa(proximaEtapa) {
        this.proximaEtapa = proximaEtapa;
        return proximaEtapa; // Permite encadeamento fluído
    }
    prosseguir(contexto) {
        if (this.proximaEtapa) {
            this.proximaEtapa.processar(contexto);
        }
    }
}

// Validação de Perfil
class EtapaControleAcesso extends EtapaProcesso {
    processar(contexto) {
        console.log(`[Chain - Acesso] Avaliando perfil para o método ${contexto.method}`);
        const metodosEscrita = ['POST', 'PUT', 'DELETE'];
        
        if (metodosEscrita.includes(contexto.method) && contexto.perfilUsuario !== 'ADMIN') {
            console.log(`[Chain - Acesso] Bloqueado: Perfil ${contexto.perfilUsuario} tentou modificar dados.`);
            contexto.response.writeHead(403);
            return contexto.response.end(JSON.stringify({ error: 'Erro 403: Apenas administradores podem alterar cadastros.' }));
        }
        
        this.prosseguir(contexto);
    }
}

// Validação de dados 
class EtapaValidacaoDados extends EtapaProcesso {
    processar(contexto) {
        if (contexto.method === 'POST' || contexto.method === 'PUT') {
            console.log('[Chain - Validação] Checando campos obrigatórios do formulário...');
            const { nome, email } = contexto.body;
            
            if (!nome || !email) {
                console.log('[Chain - Validação] Falha: Nome ou Email ausentes.');
                contexto.response.writeHead(400);
                return contexto.response.end(JSON.stringify({ error: 'Erro 400: Campos Nome e Email são obrigatórios.' }));
            }
        }
        this.prosseguir(contexto);
    }
}

// Interação com o SQLite
class EtapaExecucaoCRUD extends EtapaProcesso {
    processar(contexto) {
        const { method, body, idParam, response } = contexto;
        response.setHeader('Content-Type', 'application/json; charset=utf-8');

        // CREATE
        if (method === 'POST') {
            console.log('[Chain - CRUD] Executando INSERT no SQLite');
            const sql = `INSERT INTO pessoas (nome, email, telefone, cep, logradouro, numero, complemento, bairro, cidade, estado)
                         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
            db.run(sql, [body.nome, body.email, body.telefone, body.cep, body.logradouro, body.numero, body.complemento, body.bairro, body.cidade, body.estado], function(err) {
                if (err) return response.writeHead(500).end(JSON.stringify({ error: err.message }));
                response.writeHead(201).end(JSON.stringify({ id: this.lastID, message: 'Cadastrado com sucesso via Chain!' }));
            });
            return;
        }

        // READ
        if (method === 'GET') {
            if (idParam) {
                console.log(`[Chain - CRUD] Buscando ID ${idParam}`);
                db.get(`SELECT * FROM pessoas WHERE id = ?`, [idParam], (err, row) => {
                    if (err) return response.writeHead(500).end(JSON.stringify({ error: err.message }));
                    response.writeHead(200).end(JSON.stringify(row || {}));
                });
            } else {
                console.log('[Chain - CRUD] Listando todos os registros');
                db.all(`SELECT * FROM pessoas`, [], (err, rows) => {
                    if (err) return response.writeHead(500).end(JSON.stringify({ error: err.message }));
                    response.writeHead(200).end(JSON.stringify(rows));
                });
            }
            return;
        }

        // UPDATE
        if (method === 'PUT' && idParam) {
            console.log(`[Chain - CRUD] Atualizando ID ${idParam}`);
            const sql = `UPDATE pessoas SET nome=?, email=?, telefone=?, cep=?, logradouro=?, numero=?, complemento=?, bairro=?, cidade=?, estado=? WHERE id=?`;
            db.run(sql, [body.nome, body.email, body.telefone, body.cep, body.logradouro, body.numero, body.complemento, body.bairro, body.cidade, body.estado, idParam], function(err) {
                if (err) return response.writeHead(500).end(JSON.stringify({ error: err.message }));
                response.writeHead(200).end(JSON.stringify({ message: 'Atualizado com sucesso!' }));
            });
            return;
        }

        // DELETE
        if (method === 'DELETE' && idParam) {
            console.log(`[Chain - CRUD] Deletando ID ${idParam}`);
            db.run(`DELETE FROM pessoas WHERE id = ?`, [idParam], function(err) {
                if (err) return response.writeHead(500).end(JSON.stringify({ error: err.message }));
                response.writeHead(200).end(JSON.stringify({ message: 'Deletado com sucesso!' }));
            });
            return;
        }

        // Caso chegue um método não mapeado na API
        response.writeHead(405).end(JSON.stringify({ error: 'Método não permitido.' }));
    }
}

// Servidor
function getRequestBody(request) {
    return new Promise((resolve, reject) => {
        let body = '';
        request.on('data', chunk => body += chunk.toString());
        request.on('end', () => {
            try { resolve(body ? JSON.parse(body) : {}); }
            catch (e) { reject(e); }
        });
    });
}

function serveStaticFile(response, file) {
    fs.readFile(file, (err, data) => {
        if (err) {
            response.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
            return response.end('404 - Página Não encontrada');
        }
        const ext = path.extname(file).toLowerCase();
        response.writeHead(200, { 'Content-Type': contentTypes[ext] || 'application/octet-stream' });
        response.end(data);
    });
}

async function callback(request, response) {
    const url = new URL(request.url, `http://${request.headers.host}`);
    const pathname = decodeURIComponent(url.pathname);
    const method = request.method;

    // Rotas de api encontradas
    if (pathname.startsWith('/api/pessoas')) {
        const body = await getRequestBody(request);
        
        // Instancia o encapsulador de contexto
        const contexto = new ContextoRequisicao(request, response, url, pathname, method, body);

        const controleAcesso = new EtapaControleAcesso();
        const validacaoDados = new EtapaValidacaoDados();
        const executorCRUD = new EtapaExecucaoCRUD();

        // Acesso -> Validação -> Banco de Dados
        controleAcesso.setProximaEtapa(validacaoDados);
        validacaoDados.setProximaEtapa(executorCRUD);

        return controleAcesso.processar(contexto);
    }

    // Rotas de arquivos estáticos
    let file = path.join(publicDir, pathname === '/' ? 'index.html' : pathname);

    if (!file.startsWith(publicDir)) {
        response.writeHead(403).end('Proibido');
        return;
    }

    serveStaticFile(response, file);
}

const server = http.createServer(callback);
const PORT = 5000;
server.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}/`);
});
