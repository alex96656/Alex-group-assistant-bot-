import { Context } from "grammy";

export async function texClanCommand(ctx: Context) {
  await ctx.reply(
`🔥 <b>『 TEX CLAN 』</b> 🔥

━━━━━━━━━━━━━━━━━━━━
<b>👑 TEX CLAN LEADERS 👑</b>

💻👑 Dark Legend ⚡ <i>Shadow Phantom</i>
🖥️👑 Lord Ghost 👾 <i>Ghost Protocol</i>
💀👑 MR.ALEX 🔥 <i>Cyber Overlord</i>
⚙️👑 Johnson 🛡️ <i>Hex Commander</i>
🛰️👑 Killer Queen ⚔️ <i>Silent Assassin</i>
🧠👑 Mr.Red Shelby 🚀 <i>Crimson Reaper</i>

━━━━━━━━━━━━━━━━━━━━
🏴‍☠️ <b>Motto:</b>
<i>"We Move in Silence, We Strike with Precision."</i>

⚡ <b>Elite • Loyalty • Brotherhood</b>

💎 <b>Powered by MR.ALEX</b>`,
    {
      parse_mode: "HTML",
    }
  );
}
