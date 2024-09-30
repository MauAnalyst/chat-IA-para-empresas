//const { load } = require("mime");

const form = document.getElementById('iaForm');
//const respostaIA = document.getElementById('respostaIA');
const historicoDiv = document.getElementById('historico');
const iconDelet = document.getElementById('deleteChat');
const msgmInitial = document.querySelector('.msgm-initial');
const loading = document.querySelector('#loading');
loading.style.display = 'none';




// Carrega o histórico do localStorage
function carregarHistorico() {
    //MgsmInicial();
    //msgmInitial.style.display = 'none';
    
    const historico = JSON.parse(localStorage.getItem('historico')) || [];
    historico.forEach(entry => {
        const divPerg = document.createElement('div');
        const divResp = document.createElement('div');
        divPerg.id = 'blocoUser';
        divResp.id = 'blocoIA';
        divPerg.textContent = `${entry.pergunta}`;
        divResp.textContent = `${entry.resposta}`;
        historicoDiv.appendChild(divPerg);
        historicoDiv.appendChild(divResp);
    });
}

form.addEventListener('submit', async (event) => {
    event.preventDefault();
    msgmInitial.style.display = 'none';
    loading.style.display = 'none'

    const perguntaInput = document.getElementById('pergunta');
    const pergunta = perguntaInput.value;

    // Limpa o input logo após o submit
    perguntaInput.value = '';

    //guardando a resposta no histórico
    const divPerg = document.createElement('div');
    divPerg.id = 'blocoUser';
    divPerg.textContent = `${pergunta}`;
    historicoDiv.appendChild(divPerg);

    //loading
    const divLoad = document.createElement('div');
    divLoad.id = 'loading';
    divLoad.innerHTML = '<div class="loader"><li class="ball"></li><li class="ball"></li><li class="ball"></li></div>';
    historicoDiv.appendChild(divLoad);


    const response = await fetch('/home', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ pergunta })
    });
    
    const data = await response.json();
    //divLoad.style.display = 'none'
    loading.style.display = 'none'
    //respostaIA.textContent = data.resposta; // Atualiza a resposta da IA

    // Armazena a pergunta e resposta no localStorage
    const historico = JSON.parse(localStorage.getItem('historico')) || [];
    historico.push({ pergunta, resposta: data.resposta });
    localStorage.setItem('historico', JSON.stringify(historico));

    // Atualiza o histórico exibido
    const divResp = document.createElement('div');
    divResp.id = 'blocoIA';
    divResp.textContent = `${data.resposta}`;
    historicoDiv.removeChild(divLoad);
    historicoDiv.appendChild(divResp);

});

// Função para limpar o histórico
iconDelet.addEventListener('click', () => {
    historicoDiv.innerHTML = '';
    localStorage.removeItem('historico');
    msgmInitial.style.display = 'block';
});

//function para verificar localStorage
function MgsmInicial(){
    if (localStorage.length === 0) {
        console.log("localStorage está vazio");
        msgmInitial.style.display = 'block';
    } else {
        console.log("localStorage tem itens armazenados");
        msgmInitial.style.display = 'none';
    }
}

// Carrega o histórico ao iniciar
carregarHistorico();
MgsmInicial();