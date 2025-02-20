# 📋 Cadastro de Cidadãos

Este é um sistema de cadastro de cidadãos com validação automática de CPF, verificação de dados e uma interface responsiva. Ele consiste em um backend em Node.js (sem frameworks) e um frontend com HTML, CSS e JavaScript. O projeto foi desenvolvido para um desafio técnico da Cientec.
---

## 🚀 Recursos
- 📝 Validação em tempo real dos campos do formulário
- 💳 Exibição dos dados e retorno das operações realizadas
- 🎨 Design amigável e responsivo
- ✅ Feedback visual para erros e sucesso no preenchimento
---

## 🛠️ Tecnologias Utilizadas
- **Node.Js**: Integração do servidor 🌍
- **HTML5**: Estruturação do conteúdo 📄
- **CSS3**: Estilização, animações e transições 🎨
- **JavaScript**: Lógica para validação e interatividade ⚙️
---

## 📁 Estrutura do Projeto
```sh
/projeto
├── /backend
│   ├── /data
│   │   └── cidadaos.json          # Armazenamento dos cidadãos cadastrados
│   ├── /models
│   │   └── Cidadao.js             # Classe que representa um cidadão
│   ├── /services
│   │   └── CidadaoService.js      # Lógica de negócio (cadastro e busca)
│   └── server.js                  # Ponto de entrada do servidor
├── /frontend
│   ├── index.html                 # Interface do usuário
│   ├── styles.css                 # Estilos da interface
│   └── script.js                  # Lógica do frontend
├── /node_modules                  # Dependências do Node.js (gerada automaticamente)
├── package.json                   # Configurações e dependências do projeto
├── package-lock.json              # Versões exatas das dependências
└── README.md                      # Este arquivo
```
---
## 📂 Como Usar
Antes de começar, você precisa ter instalado:
  Node.Js
   Baixe e instale a versão LTS do Node.js.
    Verifique a instalação com os comandos:
   ```sh
    node -v
    npm -v
   ```
---

### 1. Clonar o repositório
```sh
  git clone https://github.com/pedrot00/cientec-challenge-node
  cd cientec-challenge-node
```

###  2.  Instale as Dependências
 ```sh
  cd backend
  npm install
```

###  3. Inicie o Servidor Backend
Na pasta backend, execute o servidor Node.js:
 ```sh
  node server.js
```
Se tudo estiver correto, você verá a mensagem:
 ```sh
  Servidor rodando na porta 3000
```
###  4. Abra o Frontend no Navegador
Abra o arquivo frontend/index.html no navegador:
*Você pode arrastar o arquivo para o navegador ou abrir diretamente pelo terminal:
 ```sh
  open frontend/index.html  # No macOS
  start frontend/index.html # No Windows
```
### 5. Teste a Aplicação
*Cadastro:
-Preencha o formulário com nome e CPF válido.
-Clique em "Cadastrar".
-Se o CPF for válido, você verá uma mensagem de sucesso.

*Busca:
-Digite o CPF ou nome do cidadão cadastrado.
-Clique em "Buscar".
-Se o cidadão existir, os dados serão exibidos na área de resultado.
---
## Rotas do Backend
O backend possui  rota principal.
Cadastrar Cidadão:

-Método: POST
-URL: http://localhost:3000/cadastrar
-Body (JSON)

Os dados dos cidadãos cadastrados são armazenados em um arquivo JSON (backend/data/cidadaos.json). Esse arquivo é atualizado automaticamente sempre que um novo cidadão é cadastrado.
Exemplo de conteúdo do arquivo:
 ```sh
 {
  "nome": "João Silva",
  "cpf": "123.456.789-09"
  "dataCadastro": "2025-02-20T16:07:28.308Z"
}
```


## 🤝 Contribuição
Contribuições são bem-vindas! Siga os passos abaixo:

Faça um fork do projeto 🍴

Crie uma branch para sua feature (git checkout -b feature/nova-feature) 🌿

Commit suas mudanças (git commit -m 'Adicionando nova feature') 💾

Push para a branch (git push origin feature/nova-feature) 🚀

Abra um Pull Request 📥

## 📞 Contato
Se tiver dúvidas ou sugestões, sinta-se à vontade para entrar em contato:

📧 Email: pedro.s.teixeira@ufv.br
🚀 Linkedin: https://www.linkedin.com/in/pedro-santos-teixeira/
🐙 GitHub: pedrot00 
