const dexData = [
  {
    id: 101,
    name: "Charizard",
    type: "Fuego",
    image: "assets/img/placeholder.png"
  },
  {
    id: 102,
    name: "Squirtle",
    type: "Agua",
    image: "assets/img/placeholder.png"
  }
];


function createDexCard(cardData) {
  const card = document.createElement("article");
  card.classList.add("card");

  card.innerHTML = `
    <img src="${cardData.image}" alt="${cardData.name}">
    <h2>${cardData.name}</h2>
    <p>Tipo: ${cardData.type}</p>
    <button class="add-btn">Agregar</button>
  `;

  const button = card.querySelector(".add-btn");

  button.addEventListener("click", async () => {
    await addToCollection(cardData);
    alert(`${cardData.name} agregada a tu colección`);
  });

  return card;
}


function renderDex(cards) {
  const container = document.getElementById("dexList");
  container.innerHTML = "";

  cards.forEach(cardData => {
    container.appendChild(createDexCard(cardData));
  });
}

document.addEventListener("DOMContentLoaded", () => {
  renderDex(dexData);
});


