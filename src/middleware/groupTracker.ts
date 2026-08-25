import { Context, NextFunction } from "grammy";
import {
  getDatabase,
  saveDatabase,
} from "../database/database";

export async function groupTracker(
  ctx: Context,
  next: NextFunction
) {
  const update = ctx.myChatMember;

  if (update) {
    const chat = update.chat;

    if (
      chat.type === "group" ||
      chat.type === "supergroup"
    ) {
      const newStatus = update.new_chat_member.status;

      // Bot was added or promoted into the group
      if (
        newStatus === "member" ||
        newStatus === "administrator"
      ) {
        const db = getDatabase();

        if (!db.groups) {
          db.groups = [];
        }

        const chatId = chat.id.toString();

        const exists = db.groups.some(
          (group: any) =>
            group.chat_id === chatId
        );

        if (!exists) {
          db.groups.push({
            chat_id: chatId,
            title: chat.title || "Unknown Group",
            added_at: new Date().toISOString(),
          });

          saveDatabase(db);

          console.log(
            `✅ Group registered: ${chat.title} (${chatId})`
          );
        }
      }

      // Bot was removed/blocked from the group
      if (
        newStatus === "left" ||
        newStatus === "kicked"
      ) {
        const db = getDatabase();

        if (db.groups) {
          db.groups = db.groups.filter(
            (group: any) =>
              group.chat_id !== chat.id.toString()
          );

          saveDatabase(db);

          console.log(
            `🗑️ Group removed: ${chat.title}`
          );
        }
      }
    }
  }

  await next();
}
