// =====================================================================
// EmpregaJá — script.js
// 1) Navegação por hiperlink (menu mobile + link ativo ao rolar)
// 2) Busca por área de atuação (filtra tabela de vagas)
// 3) Validação do formulário de candidatura
// =====================================================================

document.addEventListener('DOMContentLoaded', () => {

  /* ---------------------------------------------------------------
     1. NAVEGAÇÃO — menu mobile (hambúrguer) e fechamento ao clicar
        em um hiperlink do menu
  --------------------------------------------------------------- */
  const navToggle = document.getElementById('navToggle');
  const nav = document.getElementById('nav');

  if (navToggle && nav) {
    navToggle.addEventListener('click', () => {
      const aberto = nav.classList.toggle('open');
      navToggle.setAttribute('aria-expanded', aberto ? 'true' : 'false');
    });

    // Navegação por hiperlink: ao clicar em qualquer link do menu,
    // rola suavemente até a seção e fecha o menu mobile
    nav.querySelectorAll('a.nav__link').forEach(link => {
      link.addEventListener('click', () => {
        nav.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // Destaca no menu o link correspondente à seção visível (navegação)
  const secoes = document.querySelectorAll('section[id], header[id]');
  const links = document.querySelectorAll('.nav__link');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        links.forEach(l => {
          l.classList.toggle('active', l.getAttribute('href') === `#${id}`);
        });
      }
    });
  }, { rootMargin: '-40% 0px -50% 0px' });

  secoes.forEach(sec => observer.observe(sec));

  /* ---------------------------------------------------------------
     2. BUSCA POR ÁREA DE ATUAÇÃO — filtra a tabela de vagas
  --------------------------------------------------------------- */
  const inputBusca = document.getElementById('buscaArea');
  const btnLimpar = document.getElementById('btnLimparBusca');
  const tabela = document.getElementById('tabelaVagas');
  const linhasVagas = tabela ? Array.from(tabela.querySelectorAll('tbody tr')) : [];
  const mensagemVazia = document.getElementById('tabelaVazia');

  function filtrarVagas() {
    const termo = inputBusca.value.trim().toLowerCase();
    let visiveis = 0;

    linhasVagas.forEach(linha => {
      const area = (linha.dataset.area || '').toLowerCase();
      const cargo = linha.children[0].textContent.toLowerCase();
      const corresponde = termo === '' || area.includes(termo) || cargo.includes(termo);

      linha.hidden = !corresponde;
      if (corresponde) visiveis++;
    });

    if (mensagemVazia) mensagemVazia.hidden = visiveis !== 0;
  }

  if (inputBusca) {
    inputBusca.addEventListener('input', filtrarVagas);
  }
  if (btnLimpar) {
    btnLimpar.addEventListener('click', () => {
      inputBusca.value = '';
      filtrarVagas();
      inputBusca.focus();
    });
  }

  /* ---------------------------------------------------------------
     3. VALIDAÇÃO DO FORMULÁRIO DE CADASTRO
  --------------------------------------------------------------- */
  const form = document.getElementById('formCadastro');
  const feedback = document.getElementById('formFeedback');

  if (!form) return;

  const campos = {
    nome: document.getElementById('nome'),
    email: document.getElementById('email'),
    telefone: document.getElementById('telefone'),
    cidade: document.getElementById('cidade'),
    cargo: document.getElementById('cargo'),
    escolaridade: document.getElementById('escolaridade'),
    termos: document.getElementById('termos'),
  };

  function mostrarErro(campo, mensagem) {
    const wrapper = campo.closest('.field');
    const erroEl = document.getElementById(`err-${campo.id}`);
    if (wrapper) wrapper.classList.add('invalid');
    if (erroEl) erroEl.textContent = mensagem;
  }

  function limparErro(campo) {
    const wrapper = campo.closest('.field');
    const erroEl = document.getElementById(`err-${campo.id}`);
    if (wrapper) wrapper.classList.remove('invalid');
    if (erroEl) erroEl.textContent = '';
  }

  function validarNome() {
    const valor = campos.nome.value.trim();
    if (valor.length < 3) {
      mostrarErro(campos.nome, 'Informe seu nome completo.');
      return false;
    }
    if (!valor.includes(' ')) {
      mostrarErro(campos.nome, 'Digite nome e sobrenome.');
      return false;
    }
    limparErro(campos.nome);
    return true;
  }

  function validarEmail() {
    const valor = campos.email.value.trim();
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!regex.test(valor)) {
      mostrarErro(campos.email, 'Digite um e-mail válido.');
      return false;
    }
    limparErro(campos.email);
    return true;
  }

  function validarTelefone() {
    const digitos = campos.telefone.value.replace(/\D/g, '');
    if (digitos.length < 10) {
      mostrarErro(campos.telefone, 'Telefone precisa ter ao menos 10 dígitos (com DDD).');
      return false;
    }
    limparErro(campos.telefone);
    return true;
  }

  function validarCidade() {
    if (campos.cidade.value.trim().length < 2) {
      mostrarErro(campos.cidade, 'Informe sua cidade.');
      return false;
    }
    limparErro(campos.cidade);
    return true;
  }

  function validarCargo() {
    if (campos.cargo.value === '') {
      mostrarErro(campos.cargo, 'Selecione o cargo de interesse.');
      return false;
    }
    limparErro(campos.cargo);
    return true;
  }

  function validarEscolaridade() {
    if (campos.escolaridade.value === '') {
      mostrarErro(campos.escolaridade, 'Selecione sua escolaridade.');
      return false;
    }
    limparErro(campos.escolaridade);
    return true;
  }

  function validarTermos() {
    if (!campos.termos.checked) {
      mostrarErro(campos.termos, 'Você precisa aceitar os termos para continuar.');
      return false;
    }
    limparErro(campos.termos);
    return true;
  }

  // Validação em tempo real (ao sair do campo)
  campos.nome.addEventListener('blur', validarNome);
  campos.email.addEventListener('blur', validarEmail);
  campos.telefone.addEventListener('blur', validarTelefone);
  campos.cidade.addEventListener('blur', validarCidade);
  campos.cargo.addEventListener('change', validarCargo);
  campos.escolaridade.addEventListener('change', validarEscolaridade);
  campos.termos.addEventListener('change', validarTermos);

  form.addEventListener('submit', (event) => {
    event.preventDefault();

    const validacoes = [
      validarNome(),
      validarEmail(),
      validarTelefone(),
      validarCidade(),
      validarCargo(),
      validarEscolaridade(),
      validarTermos(),
    ];

    const formularioValido = validacoes.every(Boolean);

    feedback.classList.remove('success', 'error', 'show');

    if (formularioValido) {
      feedback.textContent = '✅ Cadastro enviado com sucesso!';
      feedback.classList.add('success', 'show');
      form.reset();
      Object.values(campos).forEach(campo => {
        if (campo) limparErro(campo);
      });
    } else {
      feedback.textContent = '❌ Preencha todos os campos obrigatórios corretamente.';
      feedback.classList.add('error', 'show');

      // Leva o usuário até o primeiro campo com erro (navegação assistida)
      const primeiroInvalido = form.querySelector('.field.invalid input, .field.invalid select');
      if (primeiroInvalido) {
        primeiroInvalido.scrollIntoView({ behavior: 'smooth', block: 'center' });
        primeiroInvalido.focus();
      }
    }
  });
});
