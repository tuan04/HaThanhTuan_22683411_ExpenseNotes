import * as SQLite from "expo-sqlite";
import { useEffect, useState } from "react";

export function useExpenses() {
  const [db, setDb] = useState<SQLite.SQLiteDatabase | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    (async () => {
      const database = await SQLite.openDatabaseAsync("mydb.db");
      setDb(database);

      // Tạo bảng nếu chưa có
      await database.execAsync(`CREATE TABLE IF NOT EXISTS expenses (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          title TEXT NOT NULL,
          amount REAL NOT NULL,
          category TEXT,
          paid INTEGER DEFAULT 1,
          created_at INTEGER
        );`);

      setReady(true);
    })();
  }, []);

  const getAll = async () => {
    if (!db) return [];
    return await db.getAllAsync("SELECT * FROM expenses");
  };

  const add = async (
    title: string,
    amount: number,
    category: string | null = null,
  ) => {
    if (!db) return;
    const timestamp = Date.now();
    await db.runAsync(
      "INSERT INTO expenses (title, amount, category, created_at) VALUES (?, ?, ?, ?)",
      [title, amount, category, timestamp]
    );
  };

  const remove = async (id: number) => {
    if (!db) return;
    await db.runAsync("DELETE FROM expenses WHERE id = ?", [id]);
  };

  const changePaidStatus = async (id: number) => {
    if (!db) return;
    await db.runAsync(
      `UPDATE expenses SET paid = CASE WHEN paid = 0 THEN 1 ELSE 0 END WHERE id = ?`,
      [id]
    );
  };

  return { ready, getAll, add, remove, changePaidStatus };
}
