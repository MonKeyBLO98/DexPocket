const DB_NAME = "dexPocketDB";
const DB_VERSION = 2;
const STORE_COLLECTION = "collection";

function openDB() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onupgradeneeded = (event) => {
      const db = event.target.result;

      if (!db.objectStoreNames.contains(STORE_COLLECTION)) {
        db.createObjectStore("collection", {
      keyPath: "uid",
      autoIncrement: true
});

      }
    };

    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

async function addToCollection(card) {
  const db = await openDB();

  const entry = {
    cardId: card.id,
    name: card.name,
    type: card.type,
    image: card.image,
    addedAt: Date.now()
  };

  return new Promise((resolve, reject) => {
    const tx = db.transaction("collection", "readwrite");
    const store = tx.objectStore("collection");

    store.add(entry);

    tx.oncomplete = () => resolve();
    tx.onerror = () => reject(tx.error);
  });
}


async function getCollection() {
  const db = await openDB();

  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_COLLECTION, "readonly");
    const store = tx.objectStore(STORE_COLLECTION);

    const request = store.getAll();

    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}
