console.log("HORA: 10.22");
// 1️⃣ CREA LA CARTA (PRIMERO)
function createCollectionCard(cardData) {
  const card = document.createElement("article");
  card.classList.add("card");

  card.innerHTML = `
    <img src="${cardData.image}" alt="${cardData.name}">
    <h2>${cardData.name}</h2>
    <p>${cardData.collection} ${cardData.number}/${cardData.baseTotal}</p>
    <p>Cantidad: <strong>${cardData.count}</strong></p>

    <div class="card-controls">
      <button class="add">+</button>
      <button class="remove">−</button>
    </div>
  `;

  card.querySelector(".add").addEventListener("click", async () => {
    await addOneFromCollection(cardData.cardId);
    refreshCollection();
  });

  card.querySelector(".remove").addEventListener("click", async () => {
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

console.log("app.js cargado");

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
    container.appendChild(createCollectionCard(cardData));
  });
  console.log("Renderizando colección:", groupedCards);

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
document.addEventListener("DOMContentLoaded", async () => {
  console.log("DOMContentLoaded OK");

  try {
    const collection = await getCollection();
    console.log("Collection obtenida:", collection);

    renderCollection(collection);
  } catch (e) {
    console.error("ERROR en carga inicial:", e);
  }
});
