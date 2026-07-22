// ============================================
// Lexxie MiaBot Help Command
// ============================================

import { Context } from "grammy";

export async function helpCommand(ctx: Context) {
  await ctx.reply(
`<b>🤖 Lexxie MiaBot v1.0.0</b>
👑 <b>Owner:</b> <a href="https://t.me/mr_alex_dem">@mr_alex_dem</a>
📦 <b>Total Commands:</b> 40+
⚡ <b>Status:</b> Online
━━━━━━━━━━━━━━━━━━━━
<b>📋 INFORMATION COMMANDS</b>

/start - Start the bot
/help - Show this help menu
/menu - Open the main menu
/owner - Show owner information
/botinfo - Show bot information
/id - Show your Telegram ID
/userinfo - Show your profile information
/avatar - Show your profile photo
/server - Show server status
/ping - Check bot response speed
/uptime - Show bot uptime
/stats - Show bot statistics
👤 /profile - View your or a replied user's profile

━━━━━━━━━━━━━━━━━━━━
<b>🛠️ UTILITY COMMANDS</b>

/echo &lt;text&gt; - Repeat your message
/calc &lt;expression&gt; - Calculator
/note save &lt;name&gt; &lt;text&gt; - Save a note
/note get &lt;name&gt; - Get a saved note

━━━━━━━━━━━━━━━━━━━━
<b>🎉 FUN COMMANDS</b>

/dice - Roll a dice 🎲
/coinflip - Flip a coin 🪙
/quote - Random inspirational quote 💬
/poll - Create a Telegram poll 📊

━━━━━━━━━━━━━━━━━━━━
<b>🛡️ MODERATION COMMANDS</b>

🚫 /ban - Ban a user
👢 /kick - Kick a user
🔇 /mute - Mute a user
🔊 /unmute - Unmute a user

⚠️ /warn - Warn a user
📋 /warnings - View warnings
🗑️ /clearwarnings - Clear warnings
⚙️ /setwarnlimit - Set warning limit

⭐ /promote - Promote a user
⬇️ /demote - Demote a user

📌 /pin - Pin a message
📍 /unpin - Unpin messages

👥 /admins - Show group administrators
🗑️ /del - Delete a replied message
🧹 /purge - Delete the replied message

🔗 /antilink on
🔗 /antilink off
🔗 /antilink status

👋 /setwelcome
👋 /welcome on
👋 /welcome off
👋 /resetwelcome

💡 Reply to a user's message when using moderation commands.

━━━━━━━━━━━━━━━━━━━━
<b>👑 OWNER COMMANDS</b>

/broadcast - Send an announcement to all users
📊 /dashboard - Owner dashboard
━━━━━━━━━━━━━━━━━━━━
<b>🚀 COMING SOON</b>

🤖 AI Chat
🌍 Translator
🌤️ Weather
📝 Reminder System
🎵 Music Search

━━━━━━━━━━━━━━━━━━━━
💙 <b>Thank you for using Lexxie MiaBot!</b>`,
    {
      parse_mode: "HTML",
      disable_web_page_preview: true,
    }
  );
}
