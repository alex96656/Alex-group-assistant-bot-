import { Api } from "grammy";
import { getLogChat } from "./logManager";

export async function sendLog(
  api: Api,
  chatId: number,
  message: string
) {
  const logChat = getLogChat(chatId);

  if (!logChat) return;

  try {
    await api.sendMessage(logChat, message, {
      parse_mode: "HTML",
    });
  } catch (err) {
    console.error("Log Error:", err);
  }
}
