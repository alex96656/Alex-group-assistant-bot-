import { Bot } from "grammy";
import { mainKeyboard } from "./keyboards";
import { backKeyboard } from "./backKeyboard";
import { helpKeyboard } from "./helpKeyboard";

import { claimPokemonDrop } from "./economy/pokemonDrops";
import { getPokemon } from "./services/pokemon";
import {
  getEconomy,
  saveEconomy,
} from "./economy/economy";

export function registerCallbacks(bot: Bot) {

  // ============================================
  // 🏠 MAIN MENU
  // ============================================

  bot.callbackQuery("main_menu", async (ctx) => {
    await ctx.answerCallbackQuery();

    await ctx.editMessageText(
`╭━━━━━━━━━━━━━━━━━━━━╮
      🤖 <b>LEXXIE MIABOT</b>
╰━━━━━━━━━━━━━━━━━━━━╯

✨ Welcome back!

Choose an option below to explore Lexxie's features.`,
      {
        parse_mode: "HTML",
        reply_markup: mainKeyboard(),
      }
    );
  });


  // ============================================
  // 🤖 BOT INFO
  // ============================================

  bot.callbackQuery("botinfo", async (ctx) => {
    await ctx.answerCallbackQuery();

    await ctx.editMessageText(
`╭━━━━━━━━━━━━━━━━━━━━╮
       🤖 <b>LEXXIE MIABOT</b>
╰━━━━━━━━━━━━━━━━━━━━╯

📦 Version
<b>1.0.0</b>

⚡ Status
🟢 <b>Online</b>

🛠 Built with
<b>TypeScript + Grammy</b>

👑 Developer
<a href="https://t.me/mr_alex_dem">@mr_alex_dem</a>

━━━━━━━━━━━━━━━━━━━━
✨ <i>Smart • Fun • Powerful</i>`,
      {
        parse_mode: "HTML",
        reply_markup: backKeyboard(),
      }
    );
  });


  // ============================================
  // 👑 OWNER
  // ============================================

  bot.callbackQuery("owner", async (ctx) => {
    await ctx.answerCallbackQuery();

    await ctx.editMessageText(
`╭━━━━━━━━━━━━━━━━━━━━╮
        👑 <b>OWNER</b>
╰━━━━━━━━━━━━━━━━━━━━╯

🤖 Lexxie MiaBot

Created & powered by

👤 <a href="https://t.me/mr_alex_dem">@mr_alex_dem</a>

💎 Thanks for using Lexxie!`,
      {
        parse_mode: "HTML",
        reply_markup: backKeyboard(),
      }
    );
  });


  // ============================================
  // 📚 HELP
  // ============================================

  bot.callbackQuery("help", async (ctx) => {
    await ctx.answerCallbackQuery();

    await ctx.editMessageText(
`📚 <b>LEXXIE HELP CENTER</b>

Choose a category below.

🛡️ Moderation
⚙️ Utilities
🎮 Fun & Games
🤖 AI
👑 Owner
ℹ️ About`,
      {
        parse_mode: "HTML",
        reply_markup: helpKeyboard(),
      }
    );
  });


  // ============================================
  // ⚙️ SETTINGS
  // ============================================

  bot.callbackQuery("settings", async (ctx) => {
    await ctx.answerCallbackQuery();

    await ctx.editMessageText(
`⚙️ <b>SETTINGS</b>

🚧 <b>Under Development</b>

More customization options are coming soon.

✨ Stay tuned for future updates.`,
      {
        parse_mode: "HTML",
        reply_markup: backKeyboard(),
      }
    );
  });


  // ============================================
  // 🛠 TOOLS
  // ============================================

  bot.callbackQuery("tools", async (ctx) => {
    await ctx.answerCallbackQuery();

    await ctx.editMessageText(
`🛠 <b>LEXTOOLS</b>

📊 Dashboard
💾 Backup
👥 Users
📢 Broadcast

━━━━━━━━━━━━━━━━━━━━
🚧 More tools coming soon.`,
      {
        parse_mode: "HTML",
        reply_markup: backKeyboard(),
      }
    );
  });


  // ============================================
  // 🚀 FEATURES
  // ============================================

  bot.callbackQuery("features", async (ctx) => {
    await ctx.answerCallbackQuery();

    await ctx.editMessageText(
`🚀 <b>LEXXIE FEATURES</b>

🛡️ Moderation
✅ Welcome System
✅ Goodbye System
✅ Anti-Link
✅ Warning System
✅ Admin Tools

💰 Economy
✅ Coins
✅ Work
✅ Mine
✅ Fish
✅ Rob
✅ Shop

🎮 Games
✅ Slots
✅ Dice
✅ Coin Flip
✅ Pokémon Drops

🤖 AI
✅ AI Chat

━━━━━━━━━━━━━━━━━━━━
⚡ <b>More features are coming.</b>`,
      {
        parse_mode: "HTML",
        reply_markup: backKeyboard(),
      }
    );
  });


  // ============================================
  // 🛡 MODERATION HELP
  // ============================================

  bot.callbackQuery("help_moderation", async (ctx) => {
    await ctx.answerCallbackQuery();

    await ctx.editMessageText(
`🛡️ <b>MODERATION</b>

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

👋 Welcome / Goodbye
🔗 Anti-Link`,
      {
        parse_mode: "HTML",
        reply_markup: backKeyboard(),
      }
    );
  });


  // ============================================
  // ⚙️ UTILITIES HELP
  // ============================================

  bot.callbackQuery("help_utilities", async (ctx) => {
    await ctx.answerCallbackQuery();

    await ctx.editMessageText(
`⚙️ <b>UTILITIES</b>

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


  // ============================================
  // 🎮 FUN HELP
  // ============================================

  bot.callbackQuery("help_fun", async (ctx) => {
    await ctx.answerCallbackQuery();

    await ctx.editMessageText(
`🎮 <b>LEXXIE GAMES</b>

🎰 /slots &lt;amount&gt;
🪙 /coinflip
🎲 /dice

✨ Pokémon
🎁 /drop

💰 Earn Lex Coins
⭐ Gain XP
🏆 Level up
📦 Collect Pokémon

━━━━━━━━━━━━━━━━━━━━
🎯 <i>More games coming soon.</i>`,
      {
        parse_mode: "HTML",
        reply_markup: backKeyboard(),
      }
    );
  });


  // ============================================
  // 🤖 AI HELP
  // ============================================

  bot.callbackQuery("help_ai", async (ctx) => {
    await ctx.answerCallbackQuery();

    await ctx.editMessageText(
`🤖 <b>AI CENTER</b>

💬 AI Chat
🌍 Translator
🖼️ Image Analysis
🎨 Image Generator
📄 OCR
📝 Summarizer

🚧 Some AI features are
still under development.`,
      {
        parse_mode: "HTML",
        reply_markup: backKeyboard(),
      }
    );
  });


  // ============================================
  // 👑 OWNER HELP
  // ============================================

  bot.callbackQuery("help_owner", async (ctx) => {
    await ctx.answerCallbackQuery();

    await ctx.editMessageText(
`👑 <b>OWNER COMMANDS</b>

📢 /broadcast
📊 /dashboard
💾 /backup
👥 /users

━━━━━━━━━━━━━━━━━━━━
🔐 <i>Owner-only controls</i>`,
      {
        parse_mode: "HTML",
        reply_markup: backKeyboard(),
      }
    );
  });


  // ============================================
  // ℹ️ ABOUT
  // ============================================

  bot.callbackQuery("help_about", async (ctx) => {
    await ctx.answerCallbackQuery();

    await ctx.editMessageText(
`╭━━━━━━━━━━━━━━━━━━━━╮
       🤖 <b>LEXXIE MIABOT</b>
╰━━━━━━━━━━━━━━━━━━━━╯

📦 Version: <b>1.0.0</b>

⚡ Status: 🟢 <b>Online</b>

👑 Developer
<a href="https://t.me/mr_alex_dem">@mr_alex_dem</a>

━━━━━━━━━━━━━━━━━━━━
💎 <i>Built for fun and community.</i>`,
      {
        parse_mode: "HTML",
        reply_markup: backKeyboard(),
      }
    );
  });


  // ============================================
  // 📊 DASHBOARD
  // ============================================

  bot.callbackQuery("dash_stats", async (ctx) => {
    await ctx.answerCallbackQuery();

    await ctx.editMessageText(
`📊 <b>DASHBOARD STATISTICS</b>

🚧 Live statistics coming soon.

━━━━━━━━━━━━━━━━━━━━
🤖 Lexxie is running normally.`,
      {
        parse_mode: "HTML",
        reply_markup: backKeyboard(),
      }
    );
  });


  bot.callbackQuery("dash_users", async (ctx) => {
    await ctx.answerCallbackQuery();

    await ctx.editMessageText(
`👥 <b>USER MANAGEMENT</b>

Use:

/users

to view registered bot users.`,
      {
        parse_mode: "HTML",
        reply_markup: backKeyboard(),
      }
    );
  });


  bot.callbackQuery("dash_backup", async (ctx) => {
    await ctx.answerCallbackQuery();

    await ctx.editMessageText(
`💾 <b>DATABASE BACKUP</b>

Use:

/backup

to create a database backup.`,
      {
        parse_mode: "HTML",
        reply_markup: backKeyboard(),
      }
    );
  });


  bot.callbackQuery("dash_info", async (ctx) => {
    await ctx.answerCallbackQuery();

    await ctx.editMessageText(
`🤖 <b>LEXXIE MIABOT</b>

📦 Version: <b>1.0.0</b>

🟢 Status: <b>Online</b>

👑 Developer:
<a href="https://t.me/mr_alex_dem">@mr_alex_dem</a>`,
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


  // ============================================
  // 🎮 GAMES
  // ============================================

  bot.callbackQuery("games", async (ctx) => {
    await ctx.answerCallbackQuery();

    await ctx.editMessageText(
`╭━━━━━━━━━━━━━━━━━━━━╮
        🎮 <b>LEXXIE GAMES</b>
╰━━━━━━━━━━━━━━━━━━━━╯

🎰 <b>Casino</b>
/slots &lt;amount&gt;
/coinflip
/dice

🌟 <b>Pokémon</b>
/drop

💰 <b>Economy</b>
/work
/mine
/fish
/rob
/daily
/bonus

🛒 <b>Shop</b>
/shop
/buy
/inv
/sell

━━━━━━━━━━━━━━━━━━━━
⭐ Earn XP • Level Up • Collect`,
      {
        parse_mode: "HTML",
        reply_markup: backKeyboard(),
      }
    );
  });


  // ============================================
  // 🌟 POKÉMON CATCH SYSTEM
  // ============================================

  bot.callbackQuery(
    /^pokemon_catch:(.+)$/,
    async (ctx) => {

      if (!ctx.from) return;

      const dropId = ctx.match[1];

      const result = claimPokemonDrop(
        dropId,
        ctx.from.id
      );

      // ----------------------------------------
      // ❌ Failed catch
      // ----------------------------------------

      if (!result.success || !result.drop) {

        await ctx.answerCallbackQuery({
          text:
            result.reason ||
            "❌ You missed it!",
          show_alert: true,
        });

        return;
      }

      try {

        const pokemon = await getPokemon(
          result.drop.pokemonId
        );

        const user = getEconomy(
          ctx.from.id.toString()
        );

        // --------------------------------------
        // 📦 Add Pokémon
        // --------------------------------------

        if (!user.pokemon) {
          user.pokemon = [];
        }

        user.pokemon.push(pokemon.id);

        // --------------------------------------
        // 💰 Reward
        // --------------------------------------

        user.balance += result.drop.reward;

        // --------------------------------------
        // ⭐ XP
        // --------------------------------------

        user.xp += 50;

        // --------------------------------------
        // 🆙 Level system
        // --------------------------------------

        while (
          user.xp >= user.level * 100
        ) {
          user.xp -= user.level * 100;
          user.level += 1;
        }

        saveEconomy(
          ctx.from.id.toString(),
          user
        );

        // --------------------------------------
        // 🎉 Success popup
        // --------------------------------------

        await ctx.answerCallbackQuery({
          text:
            `🎉 ${pokemon.name} caught!`,
          show_alert: true,
        });

        // --------------------------------------
        // 🏆 Update card
        // --------------------------------------

        await ctx.editMessageCaption({
          caption:
`╭━━━━━━━━━━━━━━━━━━━━╮
      🏆 <b>POKÉMON CAUGHT!</b>
╰━━━━━━━━━━━━━━━━━━━━╯

⚡ <b>${pokemon.name.toUpperCase()}</b>

👤 Trainer
<b>${ctx.from.first_name}</b>

━━━━━━━━━━━━━━━━━━━━

💰 Reward
<b>+${result.drop.reward.toLocaleString()} Lex Coins</b>

⭐ XP
<b>+50 XP</b>

📦 Collection
<b>Added successfully!</b>

💳 Balance
<b>${user.balance.toLocaleString()} Lex Coins</b>

⭐ Level
<b>${user.level}</b>

━━━━━━━━━━━━━━━━━━━━
⚡ <b>Powered by Mr. Alex</b>`,
          parse_mode: "HTML",
        });

      } catch (error) {

        console.error(
          "Pokemon catch error:",
          error
        );

        await ctx.answerCallbackQuery({
          text:
            "❌ Something went wrong while catching it.",
          show_alert: true,
        });

      }
    }
  );

}
