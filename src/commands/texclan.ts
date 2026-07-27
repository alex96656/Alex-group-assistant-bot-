import { Context } from "grammy";

export async function texClanCommand(ctx: Context) {
  await ctx.reply(
`🔥 <b>TEX CLAN</b> 🔥

⚔️ Members:

• Dark legend
• Lord ghost
• MR.ALEX
• Johnson
• Killer queen
• Mr.Red Shelby

💙 Together We Rise.`
,
{
  parse_mode: "HTML"
}
  );
}
