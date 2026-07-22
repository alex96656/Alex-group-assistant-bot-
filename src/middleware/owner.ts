// ============================================
// Lexxie MiaBot Owner Middleware
// ============================================

import { Context } from "grammy";
import { config } from "../config";

export async function isOwner(ctx: Context) {
  const userId = ctx.from?.id;

  if (!userId) {
    return false;
  }

  return userId.toString() === config.ownerId;
}
