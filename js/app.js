//O principal objetivo deste desafio é fortalecer suas habilidades em lógica de programação. Aqui você deverá desenvolver a lógica para resolver o problema.

const addFriendForm = document.querySelector("#add-friend-form");
const drawFriendButton = document.querySelector("#draw-friend-btn");
const friendList = document.querySelector("#friends-list");
const friendDraw = document.querySelector("#result-draw");
const friendInput = document.querySelector("#friend-input");
const errorMessage = document.querySelector("#error-message");

const friends = [];

addFriendForm.addEventListener("submit", (e) => {
  e.preventDefault();

  if (!friendInput.checkValidity()) {
    errorMessage.style.display = "block";
    const validityState = friendInput.validity;

    if (validityState.valueMissing) {
      errorMessage.textContent = "O nome do amigo não pode estar vazio";
    } else if (friends.includes(friendInput.value)) {
      errorMessage.textContent = "Esse amigo já foi adicionado";
    } else if (validityState.tooShort) {
      errorMessage.textContent = "Digite um nome com mais de 3 caracteres";
    }

    setTimeout(() => {
      errorMessage.style.display = "none";
    }, 3000);

    return;
  }

  friends.push(friendInput.value);
  friendList.innerHTML += `<li>${friendInput.value}</li>`;
  addFriendForm.reset();
  errorMessage.style.display = "none";
});
