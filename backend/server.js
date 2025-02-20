const http = require('http');
const CidadaoService = require('./services/CidadaoService');
const url = require('url');

const PORT = 3000;
const cidadaoService = new CidadaoService();

const server = http.createServer((req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {                           // tratamento requisicao
    res.statusCode = 204;
    res.end();
    return;
  }

  if (req.method === 'POST' && req.url === '/cadastrar') {
    let body = '';
    req.on('data', (chunk) => {
      body += chunk.toString();
    });
    req.on('end', () => {
      try {
        const { nome, cpf } = JSON.parse(body);
        
        if (!nome || !cpf) {                                // validacao dados
          throw new Error('Nome e CPF são obrigatórios');
        }

        const cpfLimpo = cpf.replace(/[^\d]/g, '');         // remove nao-numeros
        const novoCidadao = cidadaoService.cadastrar(nome, cpfLimpo);
        
        res.statusCode = 201;
        res.end(JSON.stringify({ 
          success: true,
          message: 'Cidadão cadastrado com sucesso', 
          cidadao: novoCidadao 
        }));
      } catch (error) {
        res.statusCode = 400;
        res.end(JSON.stringify({ 
          success: false,
          error: error.message 
        }));
      }
    });
  } else if (req.method === 'GET' && req.url.startsWith('/buscar')) {
    try {
      const parsedUrl = url.parse(req.url, true);
      const { cpf, nome } = parsedUrl.query;

      if (!cpf && !nome) {
        throw new Error('É necessário fornecer CPF ou nome para busca');
      }

      const resultado = cidadaoService.buscar(cpf || '', nome || '');
      if (resultado.length > 0) {
        res.end(JSON.stringify({
          success: true,
          cidadaos: resultado
        }));
      } else {                        // tratamento busca
        res.statusCode = 404;
        res.end(JSON.stringify({
          success: false,
          message: 'Cidadão não encontrado'
        }));
      }
    } catch (error) {
      res.statusCode = 400;
      res.end(JSON.stringify({
        success: false,
        error: error.message
      }));
    }
  } else {
    res.statusCode = 404;
    res.end(JSON.stringify({
      success: false,
      error: 'Rota não encontrada'
    }));
  }
});

server.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);   // mensagem confirmacao
});