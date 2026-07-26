// ============================================
// Lexxie MiaBot Gift Code Command
// ============================================

import { Context } from "grammy";
import { createGiftCode } from "../economy/giftcodes";

const OWNER_ID = 8705922736;

export async function giftCodeCommand(ctx: Context) {
  if (!ctx.from) return;

  if (ctx.from.id !== OWNER_ID) {
    return ctx.reply("❌ This command is owner only.");
  }

  const args = ctx.message?.text?.split(" ");

  if (!args || args.length < 5) {
    return ctx.reply(
`Usage:

/giftcode <CODE> <AMOUNT> <CLAIMS> <DAYS>

Example:
/giftcode WELCOME 5000 100 7`
    );
  }

  const code = args[1].toUpperCase();
  const reward = Number(args[2]);
  const claims = Number(args[3]);
  const days = Number(args[4]);

  if (
    isNaN(reward) ||
    isNaN(claims) ||
    isNaN(days)
  ) {
    return ctx.reply("❌ Invalid values.");
  }

  const expires =
    Date.now() + days * 24 * 60 * 60 * 1000;

  createGiftCode(
    code,
    reward,
    claims,
    expires
  );

  await ctx.reply(
`🎁 Gift Code Created!

🎟 Code: ${code}

💰 Reward:
${reward.toLocaleString()} Lex Coins

👥 Max Claims:
${claims}

⏳ Expires in:
${days} day(s)`
  );
}
