export type Expenses = {
    id: number;
    title: string;
    amount: number;
    category: string;
    paid: number;
    create_at: number;
}

// id INTEGER PRIMARY KEY AUTOINCREMENT,
//  title TEXT NOT NULL,
//  amount REAL NOT NULL,
//  category TEXT,
//  paid INTEGER DEFAULT 1,
//  created_at INTEGER