import { Context } from "grammy";
import { isOwner } from "./owner";

export async function isAdmin(ctx: Context): Promise<boolean> {
  // Owner can always use admin commands
  if (await isOwner(ctx)) {
    return true;
  }

  if (!ctx.chat || !ctx.from) {
    return false;
  }

  // Only works in groups
  if (ctx.chat.type !== "group" && ctx.chat.type !== "supergroup") {
    return false;
  }

  try {
    const member = await ctx.api.getChatMember(
      ctx.chat.id,
      ctx.from.id
    );

    return (
      member.status === "administrator" ||
      member.status === "creator"
    );
  } catch {
    return false;
  }
}
