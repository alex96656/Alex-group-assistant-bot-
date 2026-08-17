import { Context } from "grammy";

export async function ownerCommand(ctx: Context) {
  await ctx.reply(
    `👑 <b>BOT OWNER</b>

╭━━━━━━━━━━━━━━━━━━━━╮
│ 👤 <b>Name:</b> Alex
│ 📡 <b>Status:</b> Online
╰━━━━━━━━━━━━━━━━━━━━╯

💻 <b>DEVELOPER</b>
• Telegram Bot Developer
• Programmer & Tech Enthusiast

⚔️ <b>CLAN SUPPORT</b>
Alex is helping the
『ᴛᴇx』 Clan with technology,
bot development and management.

🌐 <b>COMMUNITY</b>

👥 <b>Group:</b>
<a href="https://t.me/alexgroup27">Join Official Group</a>

📢 <b>Channel:</b>
<a href="https://t.me/otp827">Join Official Channel</a>

📬 <b>OWNER</b>
<a href="https://t.me/mr_alex_dem">Contact Alex</a>

━━━━━━━━━━━━━━━━━━━━
🚀 <i>Thanks for using the bot!</i>`,
    {
      parse_mode: "HTML",
    }
  );
}
