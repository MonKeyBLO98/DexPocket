const DB_NAME = "dexPocketDB";
const DB_VERSION = 1;
const STORE_COLLECTION = "collection";

function openDB() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onupgradeneeded = (event) => {
      const db = event.target.result;

      if (!db.objectStoreNames.contains(STORE_COLLECTION)) {
        db.createObjectStore(STORE_COLLECTION, { keyPath: "id" });
      }
    };

    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

async function addToCollection(card) {
  const db = await openDB();

  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_COLLECTION, "readwrite");
    const store = tx.objectStore(STORE_COLLECTION);

    store.put(card);

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
