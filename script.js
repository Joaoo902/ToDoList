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

function criarElementoTarefa(objetoTarefa) {
    const novaLi = document.createElement('li');

    if (objetoTarefa.concluida) {
        novaLi.classList.add('concluida');
    }

    novaLi.innerHTML = `
        <span>${objetoTarefa.texto}</span>
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

    const novaTarefa = { texto: textoTarefa, concluida: false};

    criarElementoTarefa(novaTarefa);

    const tarefas = obterTarefasSalvas();
    tarefas.push(novaTarefa);
    salvarTarefas(tarefas);

    inputTarefa.value = '';
    inputTarefa.focus();
});

listaTarefas.addEventListener('click', function (event) {
    const elementoClicado = event.target;

    if (event.target.classList.contains('btn-excluir')) {
        const liParaRemover = event.target.parentElement;
        const textoParaRemover = liParaRemover.querySelector('span').textContent;

        liParaRemover.remove();

        let tarefas = obterTarefasSalvas();
        tarefas = tarefas.filter(function (tarefa) {
            return tarefa !== textoParaRemover;
        });
        salvarTarefas(tarefas);
        return;
    }

    letLiAlvo = null;
    if (elementoClicado.tagName === 'SPAN') {
        liAlvo = elementoClicado.parentElement;
    } else if (elementoClicado.tagName === 'LI') {
        liAlvo = elementoClicado;
    }

    if (liAlvo) {
        liAlvo.classList.toggle('concluida');
        const textoTarefa = liAlvo.querySelector('span').textContent;

        const tarefas = obterTarefasSalvas();
        const tarefaObjeto = tarefas.find(function (t) {
            return t.texto === textoTarefa;
        });

        if (tarefaObjeto) {
            tarefaObjeto.concluida = liAlvo.classList.contains('concluida');
            salvarTarefas(tarefas);
        }
    }
});

carregarTarefas();