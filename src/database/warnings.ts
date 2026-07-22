// ============================================
// Lexxie MiaBot Warnings Database
// ============================================

import { getDatabase, saveDatabase } from "./database";

export function addWarning(
  user_id: string,
  chat_id: string,
  reason: string,
  warned_by: string
) {

  const db = getDatabase();

  db.warnings.push({
    user_id,
    chat_id,
    reason,
    warned_by,
    created_at: new Date().toISOString()
  });

  saveDatabase(db);
}


export function getWarnings(
  user_id: string,
  chat_id: string
) {

  const db = getDatabase();

  return db.warnings.filter(
    (warning: any) =>
      warning.user_id === user_id &&
      warning.chat_id === chat_id
  );
}


export function clearWarnings(
  user_id: string,
  chat_id: string
) {

  const db = getDatabase();

  db.warnings = db.warnings.filter(
    (warning: any) =>
      !(
        warning.user_id === user_id &&
        warning.chat_id === chat_id
      )
  );

  saveDatabase(db);
}
