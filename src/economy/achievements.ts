import { getDatabase, saveDatabase } from "../database/database";

export function getAchievements(userId: string) {
  const db = getDatabase();

  if (!db.achievements) db.achievements = {};

  if (!db.achievements[userId]) {
    db.achievements[userId] = {
      firstSteps: false,
      richGuy: false,
      banker: false,
      hardWorker: false,
      miner: false,
      fisherman: false,
      luckyOne: false
    };

    saveDatabase(db);
  }

  return db.achievements[userId];
}

export function saveAchievements(userId: string, data: any) {
  const db = getDatabase();

  if (!db.achievements) db.achievements = {};

  db.achievements[userId] = data;

  saveDatabase(db);
}
