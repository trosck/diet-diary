import {
  deleteDB,
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

const db_name = "dietDiary";
const db_version = 1;

export async function useIndexedDB() {
  return openDB<Schema>(db_name, db_version, {
    upgrade(database, oldVersion, newVersion, transaction, event) {
      database.createObjectStore("products", {
        keyPath: "id",
      });

      database.createObjectStore("dishes", {
        keyPath: "id",
      });

      database
        .createObjectStore("diary", {
          keyPath: "id",
        })
        .createIndex("date", "date");
    },
  });
}
