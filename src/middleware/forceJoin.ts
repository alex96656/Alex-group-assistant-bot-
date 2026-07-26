import { Context } from "grammy";

const CHANNEL = "@otp827";
const GROUP = "@alexgroup27";

export async function forceJoin(ctx: Context): Promise<boolean> {
  if (!ctx.from) return false;

  try {
    const channel = await ctx.api.getChatMember(CHANNEL, ctx.from.id);
    const group = await ctx.api.getChatMember(GROUP, ctx.from.id);

    const joinedChannel = ["creator", "administrator", "member"].includes(channel.status);
    const joinedGroup = ["creator", "administrator", "member"].includes(group.status);

    if (joinedChannel && joinedGroup) {
      return true;
    }

    await ctx.reply(
      `🚫 <b>You must join our official Channel and Group before using Lexxie MiaBot.</b>`,
      {
        parse_mode: "HTML",
        reply_markup: {
          inline_keyboard: [
            [
              {
                text: "📢 Join Channel",
                url: "https://t.me/otp827",
              },
            ],
            [
              {
                text: "👥 Join Group",
                url: "https://t.me/alexgroup27",
              },
            ],
            [
              {
                text: "✅ I've Joined",
                callback_data: "check_join",
              },
            ],
          ],
        },
      }
    );

    return false;
  } catch (err) {
    console.error(err);
    return true;
  }
}
