import { InlineKeyboard } from "grammy";

export function backKeyboard() {
  return new InlineKeyboard().text("⬅️ Back", "main_menu");
}
