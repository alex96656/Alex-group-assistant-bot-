import { Context } from "grammy";
import { getPokemon } from "../services/pokemon";

export async function pokemonCommand(ctx: Context) {
  const query =
    ctx.message?.text?.split(" ")[1] || "pikachu";

  try {
    await ctx.reply("🔎 Finding Pokémon...");

    const pokemon = await getPokemon(query);

    await ctx.replyWithPhoto(pokemon.image, {
      caption: `
⚡ <b>${pokemon.name.toUpperCase()}</b>

🔢 #${pokemon.id}
🔥 Type: ${pokemon.types.join(", ")}

📏 Height: ${pokemon.height}
⚖️ Weight: ${pokemon.weight}

👑 Powered by Mr. Alex
`,
      parse_mode: "HTML",
    });
  } catch (error) {
    console.error(error);

    await ctx.reply(
      "❌ Pokémon not found."
    );
  }
}
