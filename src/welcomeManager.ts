import { getDatabase, saveDatabase } from "./database/database";

// ============================================
// WELCOME SYSTEM
// ============================================

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

export function toggleWelcome(
  chatId: number,
  enabled: boolean
) {
  const db = getDatabase();

  if (!db.welcomes) db.welcomes = {};

  if (!db.welcomes[chatId]) {
    db.welcomes[chatId] = {
      enabled: true,
      message:
        "🎉 Welcome {first_name} to {group_name}! Enjoy your stay! 💙",
    };
  }

  db.welcomes[chatId].enabled = enabled;

  saveDatabase(db);
}

// ============================================
// GOODBYE SYSTEM
// ============================================

export function setGoodbye(
  chatId: number,
  message: string
) {
  const db = getDatabase();

  if (!db.goodbyes) db.goodbyes = {};

  db.goodbyes[chatId] = {
    enabled: true,
    message,
  };

  saveDatabase(db);
}

export function getGoodbye(chatId: number) {
  const db = getDatabase();

  return (
    db.goodbyes?.[chatId] || {
      enabled: true,
      message:
        "👋 Goodbye {first_name}! We'll miss you in {group_name}! 💙",
    }
  );
}

export function toggleGoodbye(
  chatId: number,
  enabled: boolean
) {
  const db = getDatabase();

  if (!db.goodbyes) db.goodbyes = {};

  if (!db.goodbyes[chatId]) {
    db.goodbyes[chatId] = {
      enabled: true,
      message:
        "👋 Goodbye {first_name}! We'll miss you in {group_name}! 💙",
    };
  }

  db.goodbyes[chatId].enabled = enabled;

  saveDatabase(db);
}
