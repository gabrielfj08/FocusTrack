const botoesCriarMeta = document.querySelectorAll('.criar-meta'); 
const botaoCriarQuadro = document.querySelectorAll('.criar-quadro');
let quadroSelecionado = null;
let proxQuadro = null;

//Executor quando o Botão de criar Meta for acionado.
botoesCriarMeta.forEach(botoesCriarMeta => {
  botoesCriarMeta.addEventListener('click', abrirModalMeta);
});

//Abrir o Pop-up para preencher dados da Meta.
function abrirModalMeta(event){
    const modal = document.getElementById('modal');
    const modalMeta = document.getElementById('modal-conteudo-meta');
    const modalQuadro = document.getElementById('modal-conteudo-quadro');

    modal.removeAttribute('hidden');
    modal.classList.add('ativo');
    
    modalMeta.removeAttribute('hidden');
    modalMeta.classList.add('ativo');
  
    modalQuadro.setAttribute('hidden', true);
    modalQuadro.classList.remove('ativo');

    const botao = event.target;
    quadroSelecionado = botao.closest('.conteudo-quadro');
};

//Interpretador quando o botão de salvar Meta for acionado.
const botaoSalvarMeta = document.getElementById('salvar-meta');
botaoSalvarMeta.addEventListener('click', salvarMeta);

//Função de Salvar Meta.
function salvarMeta(){
    //Pegar as informações preenchidas no Modal do HTML
    const titulo = document.getElementById('titulo-meta').value;
    const descricao = document.getElementById('descricao-meta').value;
    const subtarefas = document.getElementById('subtarefas-meta').value;

    if (titulo.trim() === ''){
        alert('ERRO Preencha o Campo de Título de maneira correta!! ');
        return;
    };

    //Criar a estrutura para a meta
    const meta = document.createElement('div');
    meta.classList.add('meta');
    const titleMeta = document.createElement('h3'); 
    const descritionMeta = document.createElement('p');
    const ul = document.createElement('ul');
    ul.classList.add('subtarefas');
    
    //Insirir as informações dentro da Váriavel
    titleMeta.textContent = titulo;
    descritionMeta.textContent = descricao;
    
    //Colocar as Subtarefas em forma de lista checkbox
    if (subtarefas !== '') {
      const tarefas = subtarefas.split(',');
      tarefas.forEach(tarefa => {
        const li = document.createElement('li');
        const input = document.createElement('input');
        input.type = 'checkbox';
        li.appendChild(input);
        li.appendChild(document.createTextNode(' ' + tarefa.trim()));
        ul.appendChild(li);
      });
    };
    
    //Colocar dentro da hierarquização da Meta
    meta.appendChild(titleMeta);
    meta.appendChild(descritionMeta);
    meta.appendChild(ul);

    quadroSelecionado.insertBefore(meta, quadroSelecionado.querySelector('.criar-meta'));

    // Oculta o Modal
    document.getElementById('modal-conteudo-meta').setAttribute('hidden', true);
    document.getElementById('modal-conteudo-meta').classList.remove('ativo');
    document.getElementById('modal').setAttribute('hidden', true);
    document.getElementById('modal').classList.remove('ativo');
  
    // Limpa os campos do Modal
    document.getElementById('titulo-meta').value = '';
    document.getElementById('descricao-meta').value = '';
    document.getElementById('subtarefas-meta').value = '';
};

//Executor Quando o Botão de criar Quadro for acionado.
botaoCriarQuadro.forEach(botaoCriarQuadro => {
  botaoCriarQuadro.addEventListener('click', abrirModalQuadro);
});

//Abrir o Pop-up para preencher dados do Quadro.
function abrirModalQuadro(event) {
  const modal = document.getElementById('modal');
  const modalMeta = document.getElementById('modal-conteudo-meta');
  const modalQuadro = document.getElementById('modal-conteudo-quadro');

  modal.removeAttribute('hidden');
  modal.classList.add('ativo');

  modalQuadro.removeAttribute('hidden');
  modalQuadro.classList.add('ativo');

  modalMeta.setAttribute('hidden', true);
  modalMeta.classList.remove('ativo');

  proxQuadro = document.querySelector('.quadros');
}

//Interpretador quando o botão de salvar Quadro for acionado.
const botaoSalvarQuadro = document.getElementById('salvar-quadro');
botaoSalvarQuadro.addEventListener('click', salvarQuadro);

//Função de Salvar Quadro.
function salvarQuadro(){
    //Pegar informaçãoes do Modal no HTMl.
    const titulo = document.getElementById('titulo-quadro').value;
    if (titulo.trim() === ''){
      alert('ERRO Preencha o Campo de Título de maneira correta!! ');
      return;
  };

  //Criar estrutura Quadro.
  const quadro = document.createElement('div');
  quadro.classList.add('quadro');
  const conteudoQuadro = document.createElement('div');
  conteudoQuadro.classList.add('conteudo-quadro');
  const tituloQuadro = document.createElement('h2');
  const br = document.createElement('br');
  const button = document.createElement('button');
  button.classList.add('criar-meta');

  tituloQuadro.textContent = titulo;
  button.textContent = "+ Nova Meta";

  button.addEventListener('click', abrirModalMeta); //Ele já se torna executável assim que criado.

  //Hierarquia para as informações do quadro.
  conteudoQuadro.appendChild(tituloQuadro);
  conteudoQuadro.appendChild(br);
  conteudoQuadro.appendChild(button);
  quadro.appendChild(conteudoQuadro);

  proxQuadro.insertBefore(quadro, proxQuadro.querySelector('.criar-quadro'));

  // Oculta o Modal
  document.getElementById('modal-conteudo-quadro').setAttribute('hidden', true);
  document.getElementById('modal-conteudo-quadro').classList.remove('ativo');
  document.getElementById('modal').setAttribute('hidden', true);
  document.getElementById('modal').classList.remove('ativo');
 
  // Limpa os campos do Modal
  document.getElementById('titulo-quadro').value = ''; 
};

//Interpretador quando o botão de cancelar for acionado.

// Cancelar meta
const botaoCancelarMeta = document.getElementById('cancelar-meta');
botaoCancelarMeta.addEventListener('click', cancelarModal);

// Cancelar quadro
const botaoCancelarQuadro = document.getElementById('cancelar-quadro');
botaoCancelarQuadro.addEventListener('click', cancelarModal);

//Função de Cancelar os Moadais.
function cancelarModal() {
  const modal = document.getElementById('modal');
  const modalMeta = document.getElementById('modal-conteudo-meta');
  const modalQuadro = document.getElementById('modal-conteudo-quadro');

  modal.setAttribute('hidden', true);
  modal.classList.remove('ativo');

  // Fecha ambos os conteúdos, não importa qual esteja aberto
  modalMeta.setAttribute('hidden', true);
  modalMeta.classList.remove('ativo');

  modalQuadro.setAttribute('hidden', true);
  modalQuadro.classList.remove('ativo');

  // Limpa os campos do modal de metas
  if (document.getElementById('titulo-meta')) document.getElementById('titulo-meta').value = '';
  if (document.getElementById('descricao-meta')) document.getElementById('descricao-meta').value = '';
  if (document.getElementById('subtarefas-meta')) document.getElementById('subtarefas-meta').value = '';

  // Limpa o campo do modal de quadros
  if (document.getElementById('titulo-quadro')) document.getElementById('titulo-quadro').value = '';
}
