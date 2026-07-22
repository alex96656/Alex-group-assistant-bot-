import { getDatabase, saveDatabase } from "./database/database";

export function setAntiLink(chatId: number, enabled: boolean) {
  const db = getDatabase();

  if (!db.antiLinks) db.antiLinks = {};

  db.antiLinks[chatId] = enabled;

  saveDatabase(db);
}

export function isAntiLinkEnabled(chatId: number): boolean {
  const db = getDatabase();

  if (!db.antiLinks) return false;

  return db.antiLinks[chatId] ?? false;
}
