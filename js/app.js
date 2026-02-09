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

    <div class="card-controls">
      <button class="minus">−</button>
      <span class="count">x${cardData.count}</span>
      <button class="plus">+</button>
    </div>
  `;

  const plusBtn = card.querySelector(".plus");
  const minusBtn = card.querySelector(".minus");

  plusBtn.addEventListener("click", async () => {
  await addToCollection({
    id: cardData.cardId,
    name: cardData.name,
    type: cardData.type,
    image: cardData.image
  });

  refreshCollection();
});


  minusBtn.addEventListener("click", async () => {
  await removeOneFromCollection(cardData.cardId);
  refreshCollection();
});

  return card;
}




function renderCollection(collection) {
  const container = document.getElementById("collection");
  container.innerHTML = "";

  const groupedCards = groupCollectionByCard(collection);

  groupedCards.forEach(cardData => {
    container.appendChild(createCard(cardData));
  });
}







document.addEventListener("DOMContentLoaded", async () => {
  const collection = await getCollection();
  console.log("COLLECTION RAW:", collection);
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

function groupCollectionByCard(collection) {
  const grouped = {};

  collection.forEach(card => {
    const key = card.cardId;

    if (!grouped[key]) {
      grouped[key] = {
        cardId: card.cardId,
        name: card.name,
        type: card.type,
        image: card.image,
        count: 1
      };
    } else {
      grouped[key].count++;
    }
  });

  return Object.values(grouped);
}

async function refreshCollection() {
  const collection = await getCollection();

  updateCollectionSummary(collection);
  renderCollection(collection);
}


function updateCollectionSummary(collection) {
  const total = collection.length;

  const uniqueIds = new Set(collection.map(card => card.cardId));
  const unique = uniqueIds.size;

  document.getElementById("totalCount").textContent = `Cartas: ${total}`;
  document.getElementById("uniqueCount").textContent = `Únicas: ${unique}`;
}

