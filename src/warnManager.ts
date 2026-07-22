import { getDatabase, saveDatabase } from "./database/database";
export function getWarnLimit(chatId: number): number {
  const db = getDatabase();

  if (!db.warnLimits) db.warnLimits = {};

  return db.warnLimits[chatId] || 3;
}

export function setWarnLimit(chatId: number, limit: number) {
  const db = getDatabase();

  if (!db.warnLimits) db.warnLimits = {};

  db.warnLimits[chatId] = limit;

  saveDatabase(db);
}

export function addWarning(chatId: number, userId: number) {
  const db = getDatabase();

  if (!db.warnings) db.warnings = [];

  let warning = db.warnings.find(
    (w: any) => w.chatId === chatId && w.userId === userId
  );

  if (!warning) {
    warning = {
      chatId,
      userId,
      count: 0,
    };

    db.warnings.push(warning);
  }

  warning.count++;

  saveDatabase(db);

  return warning.count;
}

export function getWarnings(chatId: number, userId: number) {
  const db = getDatabase();

  const warning = db.warnings.find(
    (w: any) => w.chatId === chatId && w.userId === userId
  );

  return warning ? warning.count : 0;
}

export function clearWarnings(chatId: number, userId: number) {
  const db = getDatabase();

  db.warnings = db.warnings.filter(
    (w: any) => !(w.chatId === chatId && w.userId === userId)
  );

  saveDatabase(db);
}
