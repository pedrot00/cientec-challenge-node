const fs = require('fs');
const { cpf } = require('cpf-cnpj-validator');
const Cidadao = require('../models/Cidadao');

class CidadaoService {
  constructor() {
    this.dataFile = './data/cidadaos.json';
    this.cidadaos = this.carregarDados();
  }

  carregarDados() {
    try {                                                        // verificacao diretorio e arquivo
      const dir = './data';
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir);
      }

      if (!fs.existsSync(this.dataFile)) {
        fs.writeFileSync(this.dataFile, '[]');
        return [];
      }

      const dados = fs.readFileSync(this.dataFile, 'utf8');      // verificacao dados no json
      return dados ? JSON.parse(dados) : [];
    } catch (error) {
      console.error('Erro ao carregar dados:', error);
      return [];
    }
  }

  salvarDados() {
    try {
      fs.writeFileSync(this.dataFile, JSON.stringify(this.cidadaos, null, 2));
      return true;
    } catch (error) {
      console.error('Erro ao salvar dados:', error);
      throw new Error('Erro ao salvar os dados');
    }
  }

  cadastrar(nome, cpfInput) {
  
    if (!nome || nome.trim().length < 3) {                        // validacao nome
      throw new Error('Nome deve ter pelo menos 3 caracteres');
    }

    const cpfLimpo = cpfInput.replace(/[^\d]/g, '');              // valiadcao formato cpf
    if (!cpf.isValid(cpfLimpo)) {
      throw new Error('CPF inválido');
    }

    const cidadaoExistente = this.cidadaos.find(                  // verificacao cpf e usuario cadastrado
      (c) => c.cpf.replace(/[^\d]/g, '') === cpfLimpo
    );
    if (cidadaoExistente) {                     
      throw new Error('CPF já cadastrado');
    }

    const novoCidadao = {                                        // cria novo cidadao e salva no json
      id: Date.now(), 
      nome: nome.trim(),
      cpf: cpf.format(cpfLimpo),                                 // formata cpf
      dataCadastro: new Date().toISOString()
    };
    this.cidadaos.push(novoCidadao);
    
    if (!this.salvarDados()) {
      throw new Error('Erro ao salvar o cadastro');
    }

    return novoCidadao;
  }

  buscar(cpfInput, nome) {                                     // verifica se ha registro do cidadao ou termo comum ao usuario
    const termoCpf = cpfInput ? cpfInput.replace(/[^\d]/g, '') : '';
    const termoNome = nome ? nome.trim().toLowerCase() : '';

    return this.cidadaos.filter((cidadao) => {
      const cpfMatch = termoCpf ? 
        cidadao.cpf.replace(/[^\d]/g, '').includes(termoCpf) : false;
      const nomeMatch = termoNome ? 
        cidadao.nome.toLowerCase().includes(termoNome) : false;
      
      return cpfMatch || nomeMatch;
    });
  }
}

module.exports = CidadaoService;