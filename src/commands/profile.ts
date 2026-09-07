import { Context } from "grammy";
import {
  getDatabase,
  saveDatabase,
} from "../database/database";

import {
  sendProfileCard,
} from "../cards/profile";

export async function profileCommand(
  ctx: Context
) {
  if (!ctx.from) return;

  const db = getDatabase();

  if (!db.profiles) {
    db.profiles = {};
  }

  const id = String(ctx.from.id);

  if (!db.profiles[id]) {
    db.profiles[id] = {
      joinedAt: Date.now(),
      badges: [],
    };

    saveDatabase(db);
  }

  await sendProfileCard(ctx);
}
