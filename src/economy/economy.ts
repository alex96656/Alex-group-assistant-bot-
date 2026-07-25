// ============================================
// Lexxie MiaBot Economy System
// ============================================

import { getDatabase, saveDatabase } from "../database/database";

export function getEconomy(userId: string) {
  const db = getDatabase();

  if (!db.economy) db.economy = {};

  if (!db.economy[userId]) {
    db.economy[userId] = {
      balance: 500,
      bank: 0,
      xp: 0,
      level: 1,
      daily: 0,
      bonus: 0,
      rob: 0,
      work: 0,
      mine: 0,
      fish: 0,
      inventory: [],
      items: [],
      bio: "",
      age: null,
      nickname: "",
      photo: ""
    };

    saveDatabase(db);
  }

  return db.economy[userId];
}

export function saveEconomy(userId: string, data: any) {
  const db = getDatabase();

  if (!db.economy) db.economy = {};

  db.economy[userId] = data;

  saveDatabase(db);
}
