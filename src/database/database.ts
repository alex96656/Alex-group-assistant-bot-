// ============================================
// Lexxie MiaBot JSON Database
// ============================================

import fs from "fs";
import path from "path";

const dbPath = path.join(process.cwd(), "lexxie.json");

if (!fs.existsSync(dbPath)) {
  fs.writeFileSync(
    dbPath,
    JSON.stringify(
      {
        users: [],
        groups: [],
        profiles: {},
        achievements: {},
        warnings: [],
        welcomes: {},
        warnLimits: {},
        antiLinks: {},
        logChats: {},
        pokemonDrops: {}
      },
      null,
      2
    )
  );
}

export function getDatabase() {
  const db = JSON.parse(
    fs.readFileSync(dbPath, "utf-8")
  );

  // Upgrade older databases automatically
  if (!db.users) db.users = [];
  if (!db.groups) db.groups = [];
  if (!db.profiles) db.profiles = {};
  if (!db.achievements) db.achievements = {};
  if (!db.warnings) db.warnings = [];
  if (!db.welcomes) db.welcomes = {};
  if (!db.warnLimits) db.warnLimits = {};
  if (!db.antiLinks) db.antiLinks = {};
  if (!db.logChats) db.logChats = {};
  if (!db.pokemonDrops) db.pokemonDrops = {};

  return db;
}

export function saveDatabase(data: any) {
  fs.writeFileSync(
    dbPath,
    JSON.stringify(data, null, 2)
  );
}
