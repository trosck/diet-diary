import {
  openDB,
  type DBSchema,
  type IDBPDatabase,
  type IDBPObjectStore,
} from "idb";
import type { Dish } from "~/types/Dish";
import type { Meal } from "~/types/Meal";
import type { Product } from "~/types/Product";

interface Schema extends DBSchema {
  products: {
    value: Product;
    key: string;
  };
  dishes: {
    value: Dish;
    key: string;
  };
  diary: {
    value: Meal;
    key: string;
    indexes: { date: Date };
  };
}

type StoreName = "products" | "dishes" | "diary";

const db_name = "dietDiary";
const db_version = 1;

let db: IDBPDatabase<Schema>;
async function useIndexedDB() {
  if (db) return db;

  db = await openDB<Schema>(db_name, db_version, {
    upgrade(database, oldVersion, newVersion, transaction, event) {
      database.createObjectStore("products", {
        autoIncrement: true,
        keyPath: "id",
      });

      database.createObjectStore("dishes", {
        autoIncrement: true,
        keyPath: "id",
      });

      database
        .createObjectStore("diary", {
          autoIncrement: true,
          keyPath: "id",
        })
        .createIndex("date", "date");
    },
  });

  return db;
}

export function useObjectStore(storeName: StoreName) {
  return async function (
    callback: (
      store: IDBPObjectStore<Schema, [StoreName], StoreName, IDBTransactionMode>
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
