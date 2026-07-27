import { Context, InlineKeyboard } from "grammy";

const CHANNEL_1 = "@otp827";
const CHANNEL_2 = "@mrdarklegend";
const GROUP = "@alexgroup27";

export async function forceJoin(ctx: Context): Promise<boolean> {
  if (!ctx.from) return false;

  try {
    const channel1 = await ctx.api.getChatMember(CHANNEL_1, ctx.from.id);
    const channel2 = await ctx.api.getChatMember(CHANNEL_2, ctx.from.id);
    const group = await ctx.api.getChatMember(GROUP, ctx.from.id);

    const joinedChannel1 = ["creator", "administrator", "member"].includes(channel1.status);
    const joinedChannel2 = ["creator", "administrator", "member"].includes(channel2.status);
    const joinedGroup = ["creator", "administrator", "member"].includes(group.status);

    if (joinedChannel1 && joinedChannel2 && joinedGroup) {
      return true;
    }
  } catch (err) {
    console.log(err);
  }

  const keyboard = new InlineKeyboard()
    .url("📢 Official Channel", "https://t.me/otp827")
    .row()
    .url("🔥 Dark Legend Channel", "https://t.me/mrdarklegend")
    .row()
    .url("👥 Official Group", "https://t.me/alexgroup27")
    .row()
    .text("✅ I've Joined", "check_join");

  await ctx.reply(
`🔒 <b>ACCESS REQUIRED</b>

Welcome to <b>Lexxie MiaBot</b> 🤖

Before you can use this bot, please join our official community.

📢 Official Channel
🔥 Dark Legend Channel
👥 Official Group

After joining all three, tap <b>✅ I've Joined</b> below to continue.

<i>Thank you for supporting the TEX Community.</i> 💙`,
    {
      parse_mode: "HTML",
      reply_markup: keyboard,
    }
  );

  return false;
}
