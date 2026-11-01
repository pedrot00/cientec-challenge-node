# 📋 Cadastro de Cidadãos | Sistema de Cadastro e Validação de CPF

![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)

O **Cadastro de Cidadãos** é uma aplicação web desenvolvida para realizar o cadastro, a validação e a consulta de informações de cidadãos, com foco na integridade dos dados e na experiência do usuário.

O projeto foi desenvolvido para um **desafio técnico da Cientec**, utilizando Node.js no backend, sem frameworks, e HTML, CSS e JavaScript no frontend.

A aplicação permite cadastrar cidadãos, validar CPFs automaticamente e consultar informações armazenadas localmente em um arquivo JSON.

---

## 🚀 Funcionalidades

- **Cadastro de cidadãos:** registro de informações pessoais por meio de um formulário.
- **Validação de CPF:** verificação automática da validade do documento.
- **Validação em tempo real:** identificação de campos incorretos ou incompletos.
- **Consulta de cidadãos:** busca de registros por nome ou CPF.
- **Feedback visual:** mensagens de sucesso e erro durante as operações.
- **Persistência local:** armazenamento automático dos dados em JSON.
- **Interface responsiva:** adaptação a diferentes dispositivos e tamanhos de tela.

---

## 🛠️ Tecnologias utilizadas

| Tecnologia | Utilização |
|---|---|
| **Node.js** | Servidor backend e processamento das operações. |
| **HTML5** | Estruturação da interface e dos formulários. |
| **CSS3** | Estilização, animações e responsividade. |
| **JavaScript** | Validação dos campos e interatividade. |
| **JSON** | Armazenamento local dos cidadãos cadastrados. |

---

## 🗂️ Estrutura do projeto

```text
cientec-challenge-node/
├── backend/
│   ├── data/
│   │   └── cidadaos.json         # Armazenamento dos registros
│   ├── models/
│   │   └── Cidadao.js            # Modelo dos cidadãos
│   ├── services/
│   │   └── CidadaoService.js     # Lógica de cadastro e busca
│   └── server.js                 # Servidor Node.js
├── frontend/
│   ├── index.html                # Interface web
│   ├── styles.css                # Estilização
│   └── script.js                 # Interações e validações
├── package.json
├── package-lock.json
└── README.md
```

---

## ⚙️ Como executar

### Pré-requisitos

- [Node.js](https://nodejs.org/pt) instalado.
- Navegador web moderno.

### 1. Clonar o repositório

```bash
git clone https://github.com/pedrot00/cientec-challenge-node.git
cd cientec-challenge-node
```

### 2. Instalar as dependências

```bash
npm install
```

### 3. Iniciar o servidor

```bash
node backend/server.js
```

O backend será iniciado em `http://localhost:3000`.

### 4. Abrir o frontend

Abra o arquivo `frontend/index.html` diretamente no navegador.

### 5. Testar a aplicação

**Cadastro:** preencha o formulário com nome e CPF válido e clique em **Cadastrar**. O sistema apresentará uma mensagem indicando o resultado da operação.

**Consulta:** informe o nome ou CPF de um cidadão cadastrado e clique em **Buscar** para visualizar as informações.

---

## 💾 Armazenamento dos dados

Os cidadãos cadastrados são armazenados no arquivo `backend/data/cidadaos.json`, atualizado automaticamente durante as operações de cadastro.

Exemplo de registro:

```json
{
  "nome": "João Silva",
  "cpf": "529.982.247-25",
  "dataCadastro": "2025-02-20T16:07:28.308Z"
}
```

A aplicação utiliza armazenamento local, dispensando a configuração de um banco de dados externo.

> **Observação:** recomenda-se utilizar dados fictícios durante os testes e evitar publicar arquivos contendo informações pessoais reais.

---

## 🔄 Comunicação com o backend

O frontend realiza requisições HTTP para o servidor Node.js.

A operação de cadastro utiliza o seguinte endpoint:

| Método | Endpoint | Descrição |
|---|---|---|
| `POST` | `/cadastrar` | Recebe e processa os dados de um cidadão. |

**Exemplo de requisição:**

```json
{
  "nome": "João Silva",
  "cpf": "529.982.247-25"
}
```

---

## 👨‍💻 Autor

**Pedro S. Teixeira**

- **GitHub:** [pedrot00](https://github.com/pedrot00)
- **LinkedIn:** [Pedro Santos Teixeira](https://www.linkedin.com/in/pedro-santos-teixeira/)
- **E-mail:** pedro.s.teixeira@ufv.br

Projeto desenvolvido como parte de um **desafio técnico da Cientec**, aplicando conceitos de desenvolvimento web, validação de dados e comunicação cliente-servidor.
