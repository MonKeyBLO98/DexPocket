function groupCollectionByCard(collection) {
  const grouped = {};

  collection.forEach(card => {
    if (!grouped[card.cardId]) {
      grouped[card.cardId] = {
        cardId: card.cardId,
        name: card.name,
        type: card.type,
        image: card.image,
        count: 0,
        collection: card.collection,
        number: card.number,
        baseTotal: card.baseTotal
      };
    }
    grouped[card.cardId].count++;
  });

  return Object.values(grouped);
}

function createCard(cardData) {
  const card = document.createElement("article");
  card.classList.add("card");

  card.innerHTML = `
    <img src="${cardData.image}" alt="${cardData.name}">
    <h2>${cardData.name}</h2>
    <p class="card-id">
      ${cardData.collection}
      ${String(cardData.number).padStart(3, "0")}/${cardData.baseTotal}
    </p>

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
      cardId: cardData.cardId,
      name: cardData.name,
      type: cardData.type,
      image: cardData.image,
      collection: cardData.collection,
      number: cardData.number,
      baseTotal: cardData.baseTotal
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

  groupedCards.sort((a, b) => {
    if (a.collection !== b.collection) {
      return a.collection.localeCompare(b.collection);
    }
    return a.number - b.number;
  });

  groupedCards.forEach(cardData => {
    container.appendChild(createCard(cardData));
  });
}

function updateCollectionSummary(collection) {
  const total = collection.length;

  const uniqueIds = new Set(collection.map(card => card.cardId));
  const unique = uniqueIds.size;

  const totalEl = document.getElementById("totalCount");
  const uniqueEl = document.getElementById("uniqueCount");

  if (totalEl) totalEl.textContent = `Cartas: ${total}`;
  if (uniqueEl) uniqueEl.textContent = `Únicas: ${unique}`;
}



async function refreshCollection() {
  const collection = await getCollection();
  updateCollectionSummary(collection);
  renderCollection(collection);
}

document.addEventListener("DOMContentLoaded", () => {
  refreshCollection();
});
