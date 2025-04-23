const botoesCriarMeta = document.querySelectorAll('.criar-meta'); 
let quadroSelecionado = null;

//Executor quando o Botão de criar meta for acionado.
botoesCriarMeta.forEach(botao => {
    botao.addEventListener('click', abrirModal);
});

//Abri o Pop-up para preencher dados da meta.
function abrirModal(event){
    const modal = document.getElementById('modal-meta');
    modal.removeAttribute('hidden');
  
    const botao = event.target;
    quadroSelecionado = botao.closest('.conteudo-quadro');
};

//Interpretador quando o botão de salvar for acionado.
const botaoSalvarMeta = document.getElementById('salvar-meta');
botaoSalvarMeta.addEventListener('click', salvarMeta);

//Função de Salvar Meta
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
    document.getElementById('modal-meta').setAttribute('hidden', true);
  
    // Limpa os campos do Modal
    document.getElementById('titulo-meta').value = '';
    document.getElementById('descricao-meta').value = '';
    document.getElementById('subtarefas-meta').value = '';
};

//Interpretador quando o botão de cancelar for acionado.
const botaoCancelar = document.getElementById('cancelar-modal');
botaoCancelar.addEventListener('click', cancelarModal);

//Função de Cancelar a Meta
function cancelarModal(){
        // Oculta o Modal
        document.getElementById('modal-meta').setAttribute('hidden', true);
  
        // Limpa os campos do Modal
        document.getElementById('titulo-meta').value = '';
        document.getElementById('descricao-meta').value = '';
        document.getElementById('subtarefas-meta').value = '';
};
