// ============================================
// Lexxie MiaBot Owner Keyboard
// ============================================

import { InlineKeyboard } from "grammy";

export function ownerKeyboard() {
  return new InlineKeyboard()
    .text("📢 Broadcast", "owner_broadcast")
    .text("📊 Stats", "owner_stats")
    .row()
    .text("👥 Users", "owner_users")
    .text("⚙️ Settings", "owner_settings");
}
