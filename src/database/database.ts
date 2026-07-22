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
  warnings: [],
  welcomes: {},
  warnLimits: {},
  antiLinks: {},
  logChats: {}
},
  null,
  2
)
  );
}

export function getDatabase() {
  return JSON.parse(fs.readFileSync(dbPath, "utf-8"));
}

export function saveDatabase(data: any) {
  fs.writeFileSync(
    dbPath,
    JSON.stringify(data, null, 2)
  );
}
