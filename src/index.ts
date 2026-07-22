// ============================================
// Lexxie MiaBot Main File
// ============================================
import "dotenv/config";

import { Bot } from "grammy";
import { config } from "./config";
import { mainKeyboard } from "./keyboards";

import { startCommand } from "./commands/start";
import { helpCommand } from "./commands/help";
import { ownerCommand } from "./commands/owner";
import { botInfoCommand } from "./commands/botinfo";
import { menuCommand } from "./commands/menu";
import { pingCommand } from "./commands/ping";
import { registerCallbacks } from "./callbacks";
import { idCommand } from "./commands/id";
import { banCommand } from "./commands/ban";
import { kickCommand } from "./commands/kick";
import { muteCommand } from "./commands/mute";
import { unmuteCommand } from "./commands/unmute";
import { uptimeCommand } from "./commands/uptime";
import { statsCommand } from "./commands/stats";
import { whoisCommand } from "./commands/whois";
import { antiLink } from "./middleware/antiLink";
import { saveUser } from "./middleware/saveUser";
import { aiChat } from "./middleware/aiChat";
import { broadcastCommand } from "./commands/broadcast";
import { serverCommand } from "./commands/server";
import { userinfoCommand } from "./commands/userinfo";
import { avatarCommand } from "./commands/avatar";
import { coinflipCommand } from "./commands/coinflip";
import { diceCommand } from "./commands/dice";
import { echoCommand } from "./commands/echo";
import { quoteCommand } from "./commands/quote";
import { pollCommand } from "./commands/poll";
import { calcCommand } from "./commands/calc";
import { noteCommand } from "./commands/note";
import { notesCommand } from "./commands/notes";
import { setWelcomeCommand } from "./commands/setwelcome";
import { welcomeCommand } from "./commands/welcome";
import { resetWelcomeCommand } from "./commands/resetwelcome";
import { welcomeMiddleware } from "./middleware/welcome";
import { warnCommand } from "./commands/warn";
import { warningsCommand } from "./commands/warnings";
import { clearWarningsCommand } from "./commands/clearwarnings";
import { antiLinkCommand } from "./commands/antilink";
import { setLogCommand } from "./commands/setlog";
import { promoteCommand } from "./commands/promote";
import { demoteCommand } from "./commands/demote";
import { setWarnLimitCommand } from "./commands/setwarnlimit";
import { pinCommand } from "./commands/pin";
import { unpinCommand } from "./commands/unpin";
import { adminsCommand } from "./commands/admins";
import { delCommand } from "./commands/del";
import { purgeCommand } from "./commands/purge";
import { profileCommand } from "./commands/profile";
import { dashboardCommand } from "./commands/dashboard";
import { backupCommand } from "./commands/backup";
import { reportCommand } from "./commands/report";
import { usersCommand } from "./commands/users";





const bot = new Bot(process.env.BOT_TOKEN || "");

bot.command("start", startCommand);
bot.command("help", helpCommand);
bot.command("owner", ownerCommand);
bot.command("botinfo", botInfoCommand);
bot.command("menu", menuCommand);
bot.command("ping", pingCommand);
bot.command("id", idCommand);
bot.command("ban", banCommand);
bot.command("kick", kickCommand);
bot.command("report", reportCommand);
bot.command("mute", muteCommand);
bot.command("unmute", unmuteCommand);
bot.command("uptime", uptimeCommand);
bot.command("stats", statsCommand);
bot.command("whois", whoisCommand);
bot.use(saveUser);
// bot.use(aiChat);
bot.command("broadcast", broadcastCommand);
bot.command("server", serverCommand);
bot.command("userinfo", userinfoCommand);
bot.command("avatar", avatarCommand);
bot.command("coinflip", coinflipCommand);
bot.command("dice", diceCommand);
bot.command("echo", echoCommand);
bot.command("quote", quoteCommand);
bot.command("poll", pollCommand);
bot.command("calc", calcCommand);
bot.command("note", noteCommand);
bot.command("notes", notesCommand);
bot.command("setwelcome", setWelcomeCommand);
bot.command("welcome", welcomeCommand);
bot.command("resetwelcome", resetWelcomeCommand);
bot.use(welcomeMiddleware);
bot.command("warn", warnCommand);
bot.command("warnings", warningsCommand);
bot.command("clearwarnings", clearWarningsCommand);
bot.command("antilink", antiLinkCommand);
bot.command("setlog", setLogCommand);
bot.command("promote", promoteCommand);
bot.command("demote", demoteCommand);
bot.command("setwarnlimit", setWarnLimitCommand);
bot.command("pin", pinCommand);
bot.command("unpin", unpinCommand);
bot.command("admins", adminsCommand);
bot.command("del", delCommand);
bot.command("purge", purgeCommand);
bot.command("profile", profileCommand);
bot.command("dashboard", dashboardCommand);
bot.command("backup", backupCommand);
bot.command("users", usersCommand);









registerCallbacks(bot);
bot.catch((err) => {
  console.error("Bot error:", err.error);
});
bot.start({
  onStart: () => {
    console.log("Lexxie MiaBot is running...");
  },
});
