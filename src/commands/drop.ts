import { Context, InlineKeyboard } from "grammy";
import { getRandomPokemon } from "../services/pokemon";
import { createPokemonDrop } from "../economy/pokemonDrops";

export async function dropCommand(ctx: Context) {
  if (!ctx.chat) return;

  if (
    ctx.chat.type !== "group" &&
    ctx.chat.type !== "supergroup"
  ) {
    return ctx.reply(
      "❌ Pokémon drops only work in groups."
    );
  }

  try {
    const pokemon = await getRandomPokemon();

    const reward =
      Math.floor(Math.random() * 901) + 100;

    const drop = createPokemonDrop(
      pokemon.id,
      reward
    );

    const keyboard = new InlineKeyboard().text(
      "🎯 CATCH POKÉMON",
      `pokemon_catch:${drop.id}`
    );

    await ctx.replyWithPhoto(pokemon.image, {
      caption: `
🌟 <b>WILD POKÉMON APPEARED!</b>

⚡ <b>${pokemon.name.toUpperCase()}</b>

🔥 Type:
${pokemon.types.join(" • ")}

💰 Reward:
<b>${reward.toLocaleString()} Lex Coins</b>

🎯 Be the first to catch it!

⏳ You have 60 seconds.

━━━━━━━━━━━━━━━━━━━━
⚡ <b>Powered by Mr. Alex</b>
`,
      parse_mode: "HTML",
      reply_markup: keyboard,
    });
  } catch (error) {
    console.error("Pokemon drop error:", error);

    await ctx.reply(
      "❌ Lexxie couldn't find a Pokémon right now."
    );
  }
}
