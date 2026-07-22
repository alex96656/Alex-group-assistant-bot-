import { getDatabase, saveDatabase } from "./database/database";

export function setLogChat(chatId: number, logChatId: number) {
  const db = getDatabase();

  if (!db.logChats) db.logChats = {};

  db.logChats[chatId] = logChatId;

  saveDatabase(db);
}

export function getLogChat(chatId: number): number | null {
  const db = getDatabase();

  if (!db.logChats) return null;

  return db.logChats[chatId] || null;
}
