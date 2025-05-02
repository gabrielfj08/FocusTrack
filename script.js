const botoesCriarMeta = document.querySelectorAll('.criar-meta');
const botoesCriarQuadro = document.querySelectorAll('.criar-quadro');
const botoesEditarQuadro = document.querySelectorAll('.editar-quadro');
const botoesEditarMeta = document.querySelectorAll('.editar-meta');
let quadroSelecionado = null;
let proxQuadro = null;

// Modal elementos
const modal = document.getElementById('modal');
const modalMeta = document.getElementById('modal-conteudo-meta');
const modalQuadro = document.getElementById('modal-conteudo-quadro');

// Botões principais
const botaoSalvarMeta = document.getElementById('salvar-meta');
const botaoSalvarQuadro = document.getElementById('salvar-quadro');
const botaoCancelarMeta = document.getElementById('cancelar-meta');
const botaoCancelarQuadro = document.getElementById('cancelar-quadro');


// Adiciona evento para abrir modal de meta
botoesCriarMeta.forEach(botao => {
  botao.addEventListener('click', abrirModalMeta);
});

// Adiciona evento para abrir modal de quadro
botoesCriarQuadro.forEach(botao => {
  botao.addEventListener('click', abrirModalQuadro);
});

// Adiciona evento para abrir modal de editar quadro
botoesEditarQuadro.forEach(botao => {
  botao.addEventListener('click', EditarQuadros);
});

// Adiciona evento para abrir modal de editar quadro
botoesEditarMeta.forEach(botao => {
  botao.addEventListener('click', EditarMetas);
});


// Ações de salvar
botaoSalvarMeta.addEventListener('click', salvarMeta);
botaoSalvarQuadro.addEventListener('click', salvarQuadro);

// Cancelar qualquer modal
botaoCancelarMeta.addEventListener('click', fecharModal);
botaoCancelarQuadro.addEventListener('click', fecharModal);

// Abrir modal de meta
function abrirModalMeta(event) {
  modal.removeAttribute('hidden');
  modal.classList.add('ativo');

  modalMeta.removeAttribute('hidden');
  modalMeta.classList.add('ativo');

  modalQuadro.setAttribute('hidden', true);
  modalQuadro.classList.remove('ativo');

  quadroSelecionado = event.target.closest('.conteudo-quadro');
}

// Abrir modal de quadro
function abrirModalQuadro() {
  modal.removeAttribute('hidden');
  modal.classList.add('ativo');

  modalQuadro.removeAttribute('hidden');
  modalQuadro.classList.add('ativo');

  modalMeta.setAttribute('hidden', true);
  modalMeta.classList.remove('ativo');

  proxQuadro = document.querySelector('.quadros');
}

// Salvar uma nova meta
function salvarMeta() {
  const titulo = document.getElementById('titulo-meta').value.trim();
  const descricao = document.getElementById('descricao-meta').value.trim();
  const subtarefasInput = document.getElementById('subtarefas-meta').value.trim();

  if (!titulo) {
    alert('ERRO: Preencha o título corretamente!');
    return;
  }

  const meta = document.createElement('div');
  meta.classList.add('meta');

  const titleMeta = document.createElement('h4');
  titleMeta.textContent = titulo;

  const descritionMeta = document.createElement('p');
  descritionMeta.classList.add('descricao-meta');
  descritionMeta.textContent = descricao;

  const ul = document.createElement('ul');
  ul.classList.add('subtarefas');

  if (subtarefasInput) {
    const tarefas = subtarefasInput.split(',');
    tarefas.forEach(tarefa => {
      const li = document.createElement('li');
      const input = document.createElement('input');
      input.type = 'checkbox';
      li.appendChild(input);
      li.appendChild(document.createTextNode(' ' + tarefa.trim()));
      ul.appendChild(li);
    });
  }

  const botaoEditarMeta = document.createElement('button');
  botaoEditarMeta.classList.add('editar-meta');
  botaoEditarMeta.textContent = '...';
  botaoEditarMeta.style.display = 'none';

  botaoEditarMeta.addEventListener('click', () => {
    popUpMeta(meta);
  });

  meta.addEventListener('mouseenter', () => {
    descritionMeta.textContent = descricao.length > 5 ? descricao.substring(0, 5) + '...' : descricao;
    botaoEditarMeta.style.display = 'inline-block';
  });

  meta.addEventListener('mouseleave', () => {
    descritionMeta.textContent = '';
    botaoEditarMeta.style.display = 'none';
  });
  
  meta.appendChild(titleMeta);
  meta.appendChild(botaoEditarMeta);
  meta.appendChild(descritionMeta);
  meta.appendChild(ul);

  quadroSelecionado.insertBefore(meta, quadroSelecionado.querySelector('.criar-meta'));

  fecharModal();
  limparCamposMeta();
}

// Salvar novo quadro
function salvarQuadro() {
  const titulo = document.getElementById('titulo-quadro').value.trim();

  if (!titulo) {
    alert('ERRO: Preencha o título corretamente!');
    return;
  }

  const quadro = document.createElement('div');
  quadro.classList.add('quadro');

  const conteudoQuadro = document.createElement('div');
  conteudoQuadro.classList.add('conteudo-quadro');

  const tituloQuadro = document.createElement('h2');
  tituloQuadro.textContent = titulo;

  const botaoEditarQuadro = document.createElement('button');
  botaoEditarQuadro.classList.add('editar-quadro');
  botaoEditarQuadro.textContent = '...';
  botaoEditarQuadro.addEventListener('click', () => popUpQuadro(quadro));  
  

  const br = document.createElement('br');

  const botaoNovaMeta = document.createElement('button');
  botaoNovaMeta.classList.add('criar-meta');
  botaoNovaMeta.textContent = '+ Nova Meta';
  botaoNovaMeta.addEventListener('click', abrirModalMeta);

  conteudoQuadro.appendChild(tituloQuadro);
  conteudoQuadro.appendChild(botaoEditarQuadro);
  conteudoQuadro.appendChild(br);
  conteudoQuadro.appendChild(botaoNovaMeta);

  quadro.appendChild(conteudoQuadro);
  proxQuadro.insertBefore(quadro, proxQuadro.querySelector('.criar-quadro'));

  fecharModal();
  limparCamposQuadro();
}

function EditarQuadros() {
  botoesEditarQuadro.forEach(botao => {
    botao.addEventListener('click', (e) => {
      const quadro = e.target.closest('.quadro');
      popUpQuadro(quadro);
    });
  });
}

function EditarMetas() {
  botoesEditarMeta.forEach(botao => {
    botao.addEventListener('click', (e) => {
      const meta = e.target.closest('.meta');
      popUpMeta(meta);
    });
  });
}


// Fecha o modal
function fecharModal() {
  modal.setAttribute('hidden', true);
  modal.classList.remove('ativo');

  modalMeta.setAttribute('hidden', true);
  modalMeta.classList.remove('ativo');

  modalQuadro.setAttribute('hidden', true);
  modalQuadro.classList.remove('ativo');
}

// Limpa os campos da meta
function limparCamposMeta() {
  document.getElementById('titulo-meta').value = '';
  document.getElementById('descricao-meta').value = '';
  document.getElementById('subtarefas-meta').value = '';
}

// Limpa os campos do quadro
function limparCamposQuadro() {
  document.getElementById('titulo-quadro').value = '';
}

function popUpMeta(meta) {
  const opcao = prompt('Escolha uma ação:\n1 - Editar título\n2 - Editar descrição\n3 - Excluir meta');

  if (!opcao) return;

  switch (opcao.trim()) {
    case '1':
      const novoTitulo = prompt('Novo título da meta:');
      if (novoTitulo) {
        meta.querySelector('h4').textContent = novoTitulo;
      }
      break;
    
    case '2':
      const novaDescricao = prompt('Nova descrição da meta:');
      if (novaDescricao) {
        meta.querySelector('.descricao-meta').textContent = novaDescricao;
      }
      break;
    
    case '3':
      if (confirm('Tem certeza que deseja excluir esta meta?')) {
        meta.remove();
      }
      break;    

    default:
      alert('Opção inválida!');
  }
}

function popUpQuadro(quadro) {
  const opcao = prompt('Escolha uma ação:\n1 - Editar título do quadro\n2 - Excluir quadro');

  if (!opcao) return;

  switch (opcao.trim()) {
    case '1':
      const novoTituloQuadro = prompt('Novo título do quadro:');
      if (novoTituloQuadro) {
        quadro.querySelector('h2').textContent = novoTituloQuadro;
      }
      break;

    case '2':
      const confirmar = confirm('Tem certeza que deseja excluir este quadro? Todas as metas dentro dele também serão apagadas.');
      if (confirmar) {
        quadro.remove();
      }
      break;

    default:
      alert('Opção inválida!');
  }
}
