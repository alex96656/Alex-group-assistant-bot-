import { Bot } from "grammy";
import { mainKeyboard } from "./keyboards";
import { backKeyboard } from "./backKeyboard";
import { helpKeyboard } from "./helpKeyboard";

export function registerCallbacks(bot: Bot) {

  bot.callbackQuery("main_menu", async (ctx) => {
    await ctx.answerCallbackQuery();

    await ctx.editMessageText(
`🤖 <b>Welcome to Lexxie MiaBot</b>

Choose an option below.`,
      {
        parse_mode: "HTML",
        reply_markup: mainKeyboard(),
      }
    );
  });

  bot.callbackQuery("botinfo", async (ctx) => {
    await ctx.answerCallbackQuery();

    await ctx.editMessageText(
`🤖 <b>Lexxie MiaBot</b>

📦 Version: 1.0.0

👑 Developer
<a href="https://t.me/mr_alex_dem">@mr_alex_dem</a>

⚡ Status
Online

🛠 Built with
TypeScript
Grammy Framework`,
      {
        parse_mode: "HTML",
        reply_markup: backKeyboard(),
      }
    );
  });

  bot.callbackQuery("owner", async (ctx) => {
    await ctx.answerCallbackQuery();

    await ctx.editMessageText(
`👑 <b>Owner Panel</b>

Developer:
<a href="https://t.me/mr_alex_dem">@mr_alex_dem</a>

Thanks for using Lexxie MiaBot.`,
      {
        parse_mode: "HTML",
        reply_markup: backKeyboard(),
      }
    );
  });

  bot.callbackQuery("help", async (ctx) => {
  await ctx.answerCallbackQuery();

  await ctx.editMessageText(
`📚 <b>Lexxie MiaBot Help Center</b>

Choose a category below.`,
    {
      parse_mode: "HTML",
      reply_markup: helpKeyboard(),
    }
  );
});

  

bot.callbackQuery("settings", async (ctx) => {
    await ctx.answerCallbackQuery();

    await ctx.editMessageText(
`⚙️ <b>Settings</b>

🚧 This feature is under development.

More settings will be available soon.`,
      {
        parse_mode: "HTML",
        reply_markup: backKeyboard(),
      }
    );
  });

  bot.callbackQuery("tools", async (ctx) => {
    await ctx.answerCallbackQuery();

    await ctx.editMessageText(
`🛠 <b>Tools</b>

📊 Dashboard
💾 Backup
👥 Users
📢 Broadcast

More tools coming soon.`,
      {
        parse_mode: "HTML",
        reply_markup: backKeyboard(),
      }
    );
  });

  bot.callbackQuery("features", async (ctx) => {
    await ctx.answerCallbackQuery();

    await ctx.editMessageText(
`🚀 <b>Lexxie MiaBot Features</b>

✅ Moderation
✅ Dashboard
✅ Backup
✅ Notes
✅ Welcome
✅ Anti-Link
✅ Warn System
✅ Profile
✅ Admin Tools

🤖 AI Features
🚧 Coming Soon`,
      {
        parse_mode: "HTML",
        reply_markup: backKeyboard(),
      }
    );
  });

bot.callbackQuery("help_moderation", async (ctx) => {
    await ctx.answerCallbackQuery();

    await ctx.editMessageText(
`🛡️ <b>Moderation Commands</b>

🚫 /ban
👢 /kick
🔇 /mute
🔊 /unmute

⚠️ /warn
📋 /warnings
🗑️ /clearwarnings

⭐ /promote
⬇️ /demote

📌 /pin
📍 /unpin

🗑️ /del
🧹 /purge

🚨 /report

👋 Welcome System
🔗 Anti-Link`,
      {
        parse_mode: "HTML",
        reply_markup: backKeyboard(),
      }
    );
  });

  bot.callbackQuery("help_utilities", async (ctx) => {
    await ctx.answerCallbackQuery();

    await ctx.editMessageText(
`⚙️ <b>Utility Commands</b>

🏓 /ping
🆔 /id
👤 /userinfo
🖼️ /avatar
📊 /stats
🖥️ /server
⏱️ /uptime
🧮 /calc
📝 /note
📒 /notes
👥 /admins
👤 /profile`,
      {
        parse_mode: "HTML",
        reply_markup: backKeyboard(),
      }
    );
  });

  bot.callbackQuery("help_fun", async (ctx) => {
    await ctx.answerCallbackQuery();

    await ctx.editMessageText(
`🎉 <b>Fun Commands</b>

🎲 /dice
🪙 /coinflip
💬 /quote
📊 /poll`,
      {
        parse_mode: "HTML",
        reply_markup: backKeyboard(),
      }
    );
  });

  bot.callbackQuery("help_ai", async (ctx) => {
    await ctx.answerCallbackQuery();

    await ctx.editMessageText(
`🤖 <b>AI Center</b>

🚧 Coming Soon

💬 AI Chat
🌍 Translator
🖼️ Image Analysis
🎨 Image Generator
📄 OCR
📝 Summarizer`,
      {
        parse_mode: "HTML",
        reply_markup: backKeyboard(),
      }
    );
  });

  bot.callbackQuery("help_owner", async (ctx) => {
    await ctx.answerCallbackQuery();

    await ctx.editMessageText(
`👑 <b>Owner Commands</b>

📢 /broadcast
📊 /dashboard
💾 /backup
👥 /users`,
      {
        parse_mode: "HTML",
        reply_markup: backKeyboard(),
      }
    );
  });

  bot.callbackQuery("help_about", async (ctx) => {
    await ctx.answerCallbackQuery();

    await ctx.editMessageText(
`🤖 <b>Lexxie MiaBot</b>

📦 Version: 1.0.0

👑 Developer
<a href="https://t.me/mr_alex_dem">@mr_alex_dem</a>

⚡ Status
Online`,
      {
        parse_mode: "HTML",
        reply_markup: backKeyboard(),
      }
    );
  });

bot.callbackQuery("dash_stats", async (ctx) => {
    await ctx.answerCallbackQuery();

    await ctx.editMessageText(
`📊 <b>Dashboard Statistics</b>

🚧 Live statistics coming soon.`,
      {
        parse_mode: "HTML",
        reply_markup: backKeyboard(),
      }
    );
  });

  bot.callbackQuery("dash_users", async (ctx) => {
    await ctx.answerCallbackQuery();

    await ctx.editMessageText(
`👥 <b>User Management</b>

Use /users to view all bot users.`,
      {
        parse_mode: "HTML",
        reply_markup: backKeyboard(),
      }
    );
  });

  bot.callbackQuery("dash_backup", async (ctx) => {
    await ctx.answerCallbackQuery();

    await ctx.editMessageText(
`💾 <b>Backup</b>

Use /backup to export your database.`,
      {
        parse_mode: "HTML",
        reply_markup: backKeyboard(),
      }
    );
  });

  bot.callbackQuery("dash_info", async (ctx) => {
    await ctx.answerCallbackQuery();

    await ctx.editMessageText(
`🤖 <b>Lexxie MiaBot</b>

📦 Version: 1.0.0

👑 Developer
<a href="https://t.me/mr_alex_dem">@mr_alex_dem</a>

⚡ Status
Online`,
      {
        parse_mode: "HTML",
        reply_markup: backKeyboard(),
      }
    );
  });

  bot.callbackQuery("dash_close", async (ctx) => {
    await ctx.answerCallbackQuery();

    try {
      await ctx.deleteMessage();
    } catch {}
  });

}
