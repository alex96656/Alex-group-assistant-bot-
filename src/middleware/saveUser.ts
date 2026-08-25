// ============================================
// Lexxie MiaBot Save User / Group Middleware
// ============================================

import {
  Context,
  NextFunction,
} from "grammy";

import {
  getDatabase,
  saveDatabase,
} from "../database/database";

export async function saveUser(
  ctx: Context,
  next: NextFunction
) {
  const db = getDatabase();

  // ==========================================
  // 👤 Save users
  // ==========================================

  if (ctx.from) {
    const userId =
      ctx.from.id.toString();

    const exists = db.users.some(
      (user: any) =>
        user.user_id === userId
    );

    if (!exists) {
      db.users.push({
        user_id: userId,
        username:
          ctx.from.username || null,
        first_name:
          ctx.from.first_name,
      });
    }
  }

  // ==========================================
  // 👥 Save groups
  // ==========================================

  if (
    ctx.chat &&
    (
      ctx.chat.type === "group" ||
      ctx.chat.type === "supergroup"
    )
  ) {
    const groupId =
      ctx.chat.id.toString();

    const exists = db.groups.some(
      (group: any) =>
        group.chat_id === groupId
    );

    if (!exists) {
      db.groups.push({
        chat_id: groupId,
        title:
          ctx.chat.title ||
          "Unknown Group",
        added_at:
          new Date().toISOString(),
      });
    }
  }

  saveDatabase(db);

  await next();
}
