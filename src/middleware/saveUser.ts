// ============================================
// Lexxie MiaBot Save User Middleware
// ============================================

import { Context, NextFunction } from "grammy";
import { getDatabase, saveDatabase } from "../database/database";

export async function saveUser(ctx: Context, next: NextFunction) {

  if (ctx.from) {

    const db = getDatabase();

    const exists = db.users.find(
      (user: any) => user.user_id === ctx.from!.id.toString()
    );

    if (!exists) {
      db.users.push({
        user_id: ctx.from.id.toString(),
        username: ctx.from.username || null,
        first_name: ctx.from.first_name
      });

      saveDatabase(db);
    }
  }

  await next();
}
