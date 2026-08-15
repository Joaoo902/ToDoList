// pegando referencia do HTML usando ID que criei
const formTarefa = document.getElementById('form-tarefa');
const inputTarefa = document.getElementById('task-input');
const listaTarefas = document.getElementById('lista-de-tarefas');

// detecta alguma tarefa que o ususário coloca
formTarefa.addEventListener('submit', function(event) {
    event.preventDefault(); // previne o carregamento automatico da pagina 

    const textoTarefa = inputTarefa.value.trim(); // pega o valor do input e remove espaços em branco

    if (textoTarefa == '') { // verifica se o input não está vazio, se tiver vazio não faz nada
        return;
    }

    // cria um elemento li na memória do navegador
    const novaLi = document.createElement('li');

    // cria a estrutura interna com o texto da tarefa e o botão excluir
    novaLi.innerHTML = `
        <span>${textoTarefa}</span>
        <button class="btn-excluir">X</button>
    `;

    // Coloca a <li> dentro da <ul> no HTML
    listaTarefas.appendChild(novaLi);

    // Limpa o campo e coloca o cursor novamente nele
    inputTarefa.value = '';
    inputTarefa.focus();
});

// Adiciona um evento de clique na lista de tarefas para excluir a tarefa
listaTarefas.addEventListener('click', function (event) {
    if (event.target.classList.contains('btn-excluir')) {
        const liParaRemover = event.target.parentElement;
        liParaRemover.remove();
    }
});