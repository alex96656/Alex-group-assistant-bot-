import { Context } from "grammy";

export async function clanHistoryCommand(ctx: Context) {
  await ctx.reply(
`📖 <b>『 THE BOOK OF TERMUX 』</b>

━━━━━━━━━━━━━━━━━━━━
<b>📜 CHAPTER I — THE BEGINNING</b>

In the beginning, there was curiosity.

A group of learners came together with one purpose: to understand technology, coding, networking, and automation.

From this vision, <b>TEX CLAN</b> was born.

━━━━━━━━━━━━━━━━━━━━
<b>👑 CHAPTER II — THE FOUR ELDERS</b>

👑 Lord Legend — Dark lord

👑 Lord Ghost — Silent Guardian

👑 Lord Johnson — Master of the Web

👑 Lady Queen — Queen of Wisdom

Together they taught:

<i>"Seek knowledge before power, wisdom before pride, and truth before glory."</i>

━━━━━━━━━━━━━━━━━━━━
<b>⚔️ CHAPTER III — THE BROTHERHOOD</b>

The brotherhood welcomed everyone willing to learn.

Members studied programming, Linux, Termux, networking, scripting, and web technologies.

They believed that true strength comes from knowledge, discipline, loyalty, and respect.

━━━━━━━━━━━━━━━━━━━━
<b>📖 CHAPTER IV — THE CODE</b>

📚 Knowledge with responsibility.

🤝 Loyalty above selfishness.

🛡️ Respect earns respect.

💻 Every learner can become a teacher.

🚀 Never stop improving yourself.

━━━━━━━━━━━━━━━━━━━━
💎 <b>Powered by MR.ALEX</b>`,
    {
      parse_mode: "HTML",
    }
  );
}
