async function loadJSON(path) {
  const response = await fetch(path);
  if (!response.ok) {
    throw new Error(`Error cargando ${path}`);
  }
  return response.json();
}

async function loadDexData() {
  const baseCards = await loadJSON("data/cards_base.json");
  const printings = await loadJSON("data/printings_A1.json");

  const baseMap = {};
  baseCards.forEach(card => {
    baseMap[card.baseId] = card;
  });

  const dexCards = printings.map(print => {
    const base = baseMap[print.baseId];

    if (!base) {
      console.warn("Carta base no encontrada:", print.baseId);
      return null;
    }

    return {
      ...base,
      ...print
    };
  }).filter(Boolean);

  return dexCards;
}

function renderDex(cards) {
  const container = document.getElementById("dex");
  container.innerHTML = "";

  cards.forEach(card => {
    const article = document.createElement("article");
    article.className = "card";

    article.innerHTML = `
      <p class="card-id">
        ${card.collection} ${String(card.number).padStart(3, "0")}/${card.baseTotal}
      </p>
      <img src="${card.image}" alt="${card.name}">
      <h2>${card.name}</h2>
      <p>Tipo: ${card.type}</p>
      <p>Rareza: ${card.rarity}</p>
    `;

    container.appendChild(article);
  });
}

document.addEventListener("DOMContentLoaded", async () => {
  try {
    const dexCards = await loadDexData();
    console.log("Dex cargada:", dexCards);
    renderDex(dexCards);
  } catch (err) {
    console.error(err);
  }
});
