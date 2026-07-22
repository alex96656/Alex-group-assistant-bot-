import { getDatabase, saveDatabase } from "./database/database";

export function setWelcome(chatId: number, message: string) {
  const db = getDatabase();

  if (!db.welcomes) db.welcomes = {};

  db.welcomes[chatId] = {
    enabled: true,
    message,
  };

  saveDatabase(db);
}

export function getWelcome(chatId: number) {
  const db = getDatabase();

  return (
    db.welcomes?.[chatId] || {
      enabled: true,
      message:
        "🎉 Welcome {first_name} to {group_name}! Enjoy your stay! 💙",
    }
  );
}

export function toggleWelcome(chatId: number, enabled: boolean) {
  const db = getDatabase();

  if (!db.welcomes) db.welcomes = {};

  if (!db.welcomes[chatId]) {
    db.welcomes[chatId] = {
      message:
        "🎉 Welcome {first_name} to {group_name}! Enjoy your stay! 💙",
    };
  }

  db.welcomes[chatId].enabled = enabled;

  saveDatabase(db);
}
