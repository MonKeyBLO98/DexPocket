// 1️⃣ CREA LA CARTA (PRIMERO)
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

// 2️⃣ AGRUPAR
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

// 3️⃣ RENDER
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

// 4️⃣ CONTADOR
function updateCollectionSummary(collection) {
  const total = collection.length;
  const unique = new Set(collection.map(c => c.cardId)).size;

  document.getElementById("totalCount").textContent = `Cartas: ${total}`;
  document.getElementById("uniqueCount").textContent = `Únicas: ${unique}`;
}

// 5️⃣ REFRESH
async function refreshCollection() {
  const collection = await getCollection();
  updateCollectionSummary(collection);
  renderCollection(collection);
}

// 6️⃣
