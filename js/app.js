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

async function refreshCollection() {
  const collection = await getCollection();
  updateCollectionSummary(collection);
  renderCollection(collection);
}

document.addEventListener("DOMContentLoaded", () => {
  refreshCollection();
});
