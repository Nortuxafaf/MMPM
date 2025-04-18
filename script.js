const socket = io(' https://98da-2804-14c-ca28-8852-90f9-f969-2f44-e5a8.ngrok-free.app');  // Substitua pela URL do seu servidor exposto
const inputMensagem = document.getElementById('mensagem');
const btnEnviar = document.getElementById('enviar');
const containerMensagens = document.getElementById('mensagens-flutuantes');

// Enviar mensagem
btnEnviar.addEventListener('click', () => {
  const msg = inputMensagem.value.trim();
  if (msg !== '') {
    const mensagemObj = {
      texto: msg,
      id: Date.now()  // Usando timestamp como ID único para a mensagem
    };
    socket.emit('nova mensagem', mensagemObj);  // Envia o objeto de mensagem
    inputMensagem.value = '';  // Limpa o campo de input
  }
});

// Receber nova mensagem
socket.on('nova mensagem', (msg) => {
  const el = document.createElement('div');
  el.classList.add('mensagem');
  el.textContent = msg.texto;
  el.dataset.id = msg.id;

  // Posicionar a mensagem de forma aleatória
  const posX = Math.random() * (window.innerWidth - 250);
  const posY = Math.random() * (window.innerHeight - 80);
  el.style.left = `${posX}px`;
  el.style.top = `${posY}px`;

  containerMensagens.appendChild(el);
});

// Remover mensagem com animação
socket.on('remover mensagem', (id) => {
  const el = document.querySelector(`.mensagem[data-id="${id}"]`);
  if (el) {
    el.classList.add('saida');
    setTimeout(() => el.remove(), 1000);  // Remove após a animação
  }
});
