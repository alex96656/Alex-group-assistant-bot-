// ============================================
// Lexxie MiaBot Gift Code Manager
// ============================================

import { getDatabase, saveDatabase } from "../database/database";

export function createGiftCode(
  code: string,
  reward: number,
  maxClaims: number,
  expires: number
) {
  const db = getDatabase();

  if (!db.giftCodes) db.giftCodes = {};

  db.giftCodes[code] = {
    reward,
    maxClaims,
    claimed: [],
    expires,
  };

  saveDatabase(db);
}

export function getGiftCode(code: string) {
  const db = getDatabase();

  if (!db.giftCodes) db.giftCodes = {};

  return db.giftCodes[code];
}

export function saveGiftCode(code: string, data: any) {
  const db = getDatabase();

  if (!db.giftCodes) db.giftCodes = {};

  db.giftCodes[code] = data;

  saveDatabase(db);
}
