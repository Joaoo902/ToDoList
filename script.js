const formTarefa = document.getElementById('form-tarefa');
const inputTarefa = document.getElementById('task-input');
const listaTarefas = document.getElementById('lista-de-tarefas');

function obterTarefasSalvas() {
    const tarefas = localStorage.getItem('minhasTarefas');
    return tarefas ? JSON.parse(tarefas) : [];
}

function salvarTarefas(tarefas) {
    localStorage.setItem('minhasTarefas', JSON.stringify(tarefas));
}

function criarElementoTarefa(texto) {
    const novaLi = document.createElement('li');
    novaLi.innerHTML = `
        <span>${texto}</span>
        <button class="btn-excluir">X</button>
    `;
    listaTarefas.appendChild(novaLi);
}

function carregarTarefas() {
    const tarefas = obterTarefasSalvas();
    tarefas.forEach(function (tarefa) {
        criarElementoTarefa(tarefa);
    });
}

formTarefa.addEventListener('submit', function (event) {
    event.preventDefault();

    const textoTarefa = inputTarefa.value.trim();

    if (textoTarefa === '') {
        return;
    }

    criarElementoTarefa(textoTarefa);

    const tarefas = obterTarefasSalvas();
    tarefas.push(textoTarefa);
    salvarTarefas(tarefas);

    inputTarefa.value = '';
    inputTarefa.focus();
});

listaTarefas.addEventListener('click', function (event) {
    if (event.target.classList.contains('btn-excluir')) {
        const liParaRemover = event.target.parentElement;
        const textoParaRemover = liParaRemover.querySelector('span').textContent;

        liParaRemover.remove();

        let tarefas = obterTarefasSalvas();
        tarefas = tarefas.filter(function (tarefa) {
            return tarefa !== textoParaRemover;
        });
        salvarTarefas(tarefas);
    }
});

carregarTarefas();