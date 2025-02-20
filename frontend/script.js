class CidadaoFrontend {
  constructor() {
    this.cadastroForm = document.getElementById('cadastroForm');
    this.buscaForm = document.getElementById('buscaForm');
    this.resultadoDiv = document.getElementById('resultado');

    this.cadastroForm.addEventListener('submit', this.cadastrar.bind(this));
    this.buscaForm.addEventListener('submit', this.buscar.bind(this));

    this.setupValidation();
  }

  setupValidation() {
    const nomeInput = document.getElementById('nome');
    const cpfInput = document.getElementById('cpf');
    const buscaInput = document.getElementById('busca');

    nomeInput.addEventListener('input', (e) => {              // valida nome
      const value = e.target.value.trim();
      const errorElement = document.getElementById('nome-error');
      
      if (!value) {
        errorElement.textContent = 'Nome é obrigatório';
        e.target.classList.add('error');
      } else if (value.length < 3) {
        errorElement.textContent = 'Nome deve ter pelo menos 3 caracteres';
        e.target.classList.add('error');
      } else if (!/^[A-Za-zÀ-ÿ\s]*$/.test(value)) {
        errorElement.textContent = 'Nome deve conter apenas letras';
        e.target.classList.add('error');
      } else {
        errorElement.textContent = '';
        e.target.classList.remove('error');
      }
    });

    cpfInput.addEventListener('input', (e) => {                  // validacao cpf
      let value = e.target.value.replace(/\D/g, '');
      const errorElement = document.getElementById('cpf-error');
      
      if (value.length > 11) value = value.slice(0, 11);
      
      if (value.length > 9) {                                    // formata cpf
        value = value.replace(/^(\d{3})(\d{3})(\d{3})(\d{2})$/, '$1.$2.$3-$4');
      } else if (value.length > 6) {
        value = value.replace(/^(\d{3})(\d{3})(\d{3})/, '$1.$2.$3');
      } else if (value.length > 3) {
        value = value.replace(/^(\d{3})(\d{3})/, '$1.$2');
      }
      
      e.target.value = value;

     
      if (!value) {                                            
        errorElement.textContent = 'CPF é obrigatório';
        e.target.classList.add('error');
      } else if (value.replace(/\D/g, '').length !== 11) {
        errorElement.textContent = 'CPF deve ter 11 dígitos';
        e.target.classList.add('error');
      } else {
        errorElement.textContent = '';
        e.target.classList.remove('error');
      }
    });

   
    buscaInput.addEventListener('input', (e) => {                // valida campo busca
      const value = e.target.value.trim();
      const errorElement = document.getElementById('busca-error');
      
      if (!value) {
        errorElement.textContent = 'Digite algo para buscar';
        e.target.classList.add('error');
      } else {
        errorElement.textContent = '';
        e.target.classList.remove('error');
      }
    });
  }

  showAlert(message, type = 'success') {
    const existingAlerts = document.querySelectorAll('.alert');
    existingAlerts.forEach(alert => {
      alert.style.opacity = '0';
      alert.style.transform = 'translateY(-20px)';
      setTimeout(() => alert.remove(), 300);
    });

    const alertDiv = document.createElement('div');               // cria e molda alert
    alertDiv.className = `alert alert-${type}`;
    
    const contentDiv = document.createElement('div');
    contentDiv.style.display = 'flex';
    contentDiv.style.alignItems = 'center';
    
    const iconSpan = document.createElement('span');
    iconSpan.className = 'alert-icon';
    iconSpan.textContent = type === 'success' ? '✓' : '⚠';
    
    const messageSpan = document.createElement('span');
    messageSpan.textContent = message;
    

    contentDiv.appendChild(iconSpan);
    contentDiv.appendChild(messageSpan);
    alertDiv.appendChild(contentDiv);
    
    document.body.appendChild(alertDiv);
    
   
    requestAnimationFrame(() => {                                 // animacoes alert
      alertDiv.style.opacity = '0';
      alertDiv.style.transform = 'translateY(-20px)';
      
      requestAnimationFrame(() => {
        alertDiv.style.opacity = '1';
        alertDiv.style.transform = 'translateY(0)';
      });
    });
    
    
    setTimeout(() => {                                           // remove alert automaticamente
      alertDiv.style.opacity = '0';
      alertDiv.style.transform = 'translateY(-20px)';
      setTimeout(() => alertDiv.remove(), 300);
    }, 3000);
  }

  validateForm(nome, cpf) {
    let isValid = true;
    const errors = [];

    
    if (!nome.trim()) {                                           // valida campo nome
      errors.push('Nome é obrigatório');
      isValid = false;
    } else if (nome.trim().length < 3) {
      errors.push('Nome deve ter pelo menos 3 caracteres');
      isValid = false;
    } else if (!/^[A-Za-zÀ-ÿ\s]*$/.test(nome.trim())) {
      errors.push('Nome deve conter apenas letras');
      isValid = false;
    }

    const cpfLimpo = cpf.replace(/\D/g, '');                     // valida campo cpf
    if (!cpfLimpo) {
      errors.push('CPF é obrigatório');
      isValid = false;
    } else if (cpfLimpo.length !== 11) {
      errors.push('CPF deve ter 11 dígitos');
      isValid = false;
    }

    return { isValid, errors };
  }

  async cadastrar(event) {
    event.preventDefault();
    const nome = document.getElementById('nome').value;
    const cpf = document.getElementById('cpf').value;

    const { isValid, errors } = this.validateForm(nome, cpf);   // valida formulario
    if (!isValid) {
      this.showAlert(errors.join('. '), 'error');
      return;
    }

    try {
      const response = await fetch('http://localhost:3000/cadastrar', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nome: nome.trim(), cpf }),
      });

      const data = await response.json();
      
      if (data.success) {
        this.showAlert(`Cidadão ${nome.trim()} cadastrado com sucesso!`, 'success');
        this.cadastroForm.reset();
        
        // limpa mensagem erro
        document.querySelectorAll('.error-message').forEach(elem => elem.textContent = '');
        document.querySelectorAll('input').forEach(input => input.classList.remove('error'));
      } else {
        let errorMessage = data.error || 'Erro ao cadastrar';
        if (errorMessage.includes('CPF já cadastrado')) {
          errorMessage = `O CPF ${cpf} já está cadastrado no sistema`;
        }
        this.showAlert(errorMessage, 'error');
      }
    } catch (error) {
      console.error('Erro:', error);
      this.showAlert('Erro ao conectar com o servidor', 'error');
    }
  }

  async buscar(event) { 
    event.preventDefault();
    const busca = document.getElementById('busca').value.trim();

    if (!busca) {
      this.showAlert('Digite algo para buscar', 'error');
      return;
    }

    try {   // processo de busca
      const response = await fetch(`http://localhost:3000/buscar?cpf=${encodeURIComponent(busca)}&nome=${encodeURIComponent(busca)}`);
      const data = await response.json();

      if (data.success && data.cidadaos) {
        if (data.cidadaos.length === 0) {
          this.resultadoDiv.innerHTML = '<div class="resultado-item"><p>Nenhum cidadão encontrado</p></div>';
          this.showAlert('Nenhum cidadão encontrado com estes dados', 'error');
        } else {
          this.resultadoDiv.innerHTML = data.cidadaos.map(cidadao => `
            <div class="resultado-item">
              <p><strong>Nome:</strong> ${cidadao.nome}</p>
              <p><strong>CPF:</strong> ${cidadao.cpf}</p>
              <p><strong>Data de Cadastro:</strong> ${new Date(cidadao.dataCadastro).toLocaleDateString('pt-BR')}</p>
            </div>
          `).join('');
          this.showAlert(`${data.cidadaos.length} cidadão(s) encontrado(s)`, 'success');
        }
      } else {
        this.resultadoDiv.innerHTML = `<div class="resultado-item"><p>${data.message || 'Nenhum resultado encontrado'}</p></div>`;
        this.showAlert('Nenhum resultado encontrado', 'error');
      }
      
      this.buscaForm.reset(); // limpa busca apos pesquisa
    } catch (error) {
      console.error('Erro:', error);
      this.resultadoDiv.innerHTML = '<div class="resultado-item"><p>Erro ao buscar cidadão</p></div>';
      this.showAlert('Erro ao conectar com o servidor', 'error');
    }
  }
}

new CidadaoFrontend();