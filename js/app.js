//O principal objetivo deste desafio é fortalecer suas habilidades em lógica de programação. Aqui você deverá desenvolver a lógica para resolver o problema.

const addFriendForm = document.querySelector("#add-friend-form");
const drawFriendButton = document.querySelector("#draw-friend-btn");
const clearFriendsButton = document.querySelector("#clear-friends-btn");
const friendList = document.querySelector("#friends-list");
const friendDraw = document.querySelector("#result-draw");
const friendInput = document.querySelector("#friend-input");
const errorMessage = document.querySelector("#error-message");

let friends = [];
let friendCount = 0;

function renderFriendsList(friends) {
  friendList.innerHTML = "";

  friends.forEach((friend) => {
    if (friend.sorted) {
      friendList.innerHTML += `<li class="sorted">${friend.name}</li>`;
    } else {
      friendList.innerHTML += `<li>${friend.name}</li>`;
    }
  });

  console.log(friends);
}

function addFriend(value) {
  friends.push({ id: friends.length + 1, name: value, sorted: false });
}

function clearFriends() {
  friends = [];
}

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

  addFriend(friendInput.value);
  renderFriendsList(friends);
  addFriendForm.reset();
  errorMessage.style.display = "none";
});

drawFriendButton.addEventListener("click", () => {
  if (friends.length === 0) {
    return;
  }

  if (friends.every((friend) => friend.sorted)) {
    friendDraw.textContent = "Todos os amigos já foram sorteados";
    return;
  }

  const notSortedFriends = friends.filter((friend) => !friend.sorted);
  const randomIndex = Math.floor(Math.random() * notSortedFriends.length);
  const randomFriend = notSortedFriends[randomIndex];

  friendDraw.textContent = `O amigo sorteado foi: ${randomFriend.name}`;

  const sortedIndex = friends.findIndex(
    (friend) => friend.id === randomFriend.id
  );

  friends[sortedIndex].sorted = true;

  renderFriendsList(friends);
});

clearFriendsButton.addEventListener("click", () => {
  clearFriends();
  renderFriendsList(friends);
});


