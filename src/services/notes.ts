import {
  getDatabase,
  saveDatabase
} from "../database/database";

// ============================================
// ADD NOTE
// ============================================

export function addNote(
  userId: string,
  name: string,
  content: string
) {
  const db = getDatabase();

  if (!db.notes) {
    db.notes = {};
  }

  if (!db.notes[userId]) {
    db.notes[userId] = {};
  }

  db.notes[userId][name] = content;

  saveDatabase(db);
}

// ============================================
// GET NOTE
// ============================================

export function getNote(
  userId: string,
  name: string
): string | null {
  const db = getDatabase();

  return db.notes?.[userId]?.[name] ?? null;
}

// ============================================
// LIST NOTES
// ============================================

export function listNotes(
  userId: string
): string[] {
  const db = getDatabase();

  return Object.keys(
    db.notes?.[userId] ?? {}
  );
}
