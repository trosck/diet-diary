import { openDB, type IDBPDatabase, type IDBPObjectStore } from "idb";

const db_name = "dietDiary";
const db_version = 1;

let db: IDBPDatabase;
async function useIndexedDB() {
  if (db) return db;

  db = await openDB(db_name, db_version, {
    upgrade(database, oldVersion, newVersion, transaction, event) {
      database.createObjectStore("products", {
        autoIncrement: true,
        keyPath: "id",
      });

      database.createObjectStore("dishes", {
        autoIncrement: true,
      });

      const diaryStore = database.createObjectStore("diary", {
        autoIncrement: true,
      });

      diaryStore.createIndex("date", "date");
    },
  });

  return db;
}

export function useObjectStore(storeName: string) {
  return async function (
    callback: (
      store: IDBPObjectStore<
        unknown,
        ArrayLike<string>,
        string,
        "readonly" | "readwrite"
      >
    ) => Promise<any> | any,
    mode: IDBTransactionMode = "readonly"
  ) {
    const db = await useIndexedDB();
    const transaction = db.transaction(storeName, mode);
    const store = transaction.objectStore(storeName);
    const result = await callback(store);
    await transaction.done;
    return result;
  };
}
