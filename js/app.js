const collectionData = [
  {
    id: 1,
    name: "Pikachu",
    type: "Eléctrico",
    image: "assets/img/placeholder.png"
  },
  {
    id: 2,
    name: "Bulbasaur",
    type: "Planta",
    image: "assets/img/placeholder.png"
  },
  {
    id: 3,
    name: "Charmander",
    type: "Fuego",
    image: "assets/img/placeholder.png"
  }
];

function createCard(cardData) {
  const card = document.createElement("article");
  card.classList.add("card");

  card.innerHTML = `
    <img src="${cardData.image}" alt="${cardData.name}">
    <h2>${cardData.name}</h2>
    <p>Tipo: ${cardData.type}</p>
  `;

  return card;
}

function renderCollection(cards) {
  const container = document.getElementById("collection");
  container.innerHTML = "";

  cards.forEach(cardData => {
    const cardElement = createCard(cardData);
    container.appendChild(cardElement);
  });
}

document.addEventListener("DOMContentLoaded", async () => {
  const collection = await getCollection();
  renderCollection(collection);
});

const testCard = {
  id: 999,
  name: "Pikachu",
  type: "Eléctrico",
  image: "assets/img/placeholder.png"
};

addToCollection(testCard).then(() => {
  console.log("Carta guardada");
});


