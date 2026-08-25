import {
  Context,
  InlineKeyboard,
} from "grammy";

import {
  getDatabase,
} from "../database/database";

import {
  getRandomPokemon,
} from "../services/pokemon";

import {
  createPokemonDrop,
} from "../economy/pokemonDrops";

export async function dropAllCommand(
  ctx: Context
) {
  if (!ctx.from) return;

  const ownerId =
    Number(process.env.OWNER_ID);

  if (ctx.from.id !== ownerId) {
    return ctx.reply(
      "❌ This command is owner-only."
    );
  }

  try {
    await ctx.reply(
      "🎁 Creating a global Pokémon drop..."
    );

    const pokemon =
      await getRandomPokemon();

    const reward =
      Math.floor(
        Math.random() * 1901
      ) + 100;

    const db = getDatabase();

    let sent = 0;
    let failed = 0;

    for (const group of db.groups) {
      try {
        const drop =
          createPokemonDrop(
            pokemon.id,
            reward
          );

        const keyboard =
          new InlineKeyboard().text(
            "🎯 CATCH POKÉMON",
            `pokemon_catch:${drop.id}`
          );

        await ctx.api.sendPhoto(
          Number(group.chat_id),
          pokemon.image,
          {
            caption:
`╭━━━━━━━━━━━━━━━━━━━━╮
     🌟 <b>WILD POKÉMON!</b>
╰━━━━━━━━━━━━━━━━━━━━╯

⚡ <b>${pokemon.name.toUpperCase()}</b>

🔥 Type
${pokemon.types.join(" • ")}

💰 Catch Reward
<b>${reward.toLocaleString()} Lex Coins</b>

🎯 <b>FIRST CATCH WINS!</b>

⏳ You have 60 seconds.

━━━━━━━━━━━━━━━━━━━━
⚡ <b>Powered by Mr. Alex</b>`,
            parse_mode: "HTML",
            reply_markup: keyboard,
          }
        );

        sent++;

      } catch (error) {
        console.error(
          `Drop failed for ${group.chat_id}:`,
          error
        );

        failed++;
      }
    }

    await ctx.reply(
`╭━━━━━━━━━━━━━━━━━━━━╮
      🎉 <b>DROP BROADCAST</b>
╰━━━━━━━━━━━━━━━━━━━━╯

⚡ Pokémon
<b>${pokemon.name.toUpperCase()}</b>

💰 Reward
<b>${reward.toLocaleString()} Lex Coins</b>

📢 Sent
<b>${sent}</b> groups

❌ Failed
<b>${failed}</b> groups

━━━━━━━━━━━━━━━━━━━━
✅ Broadcast complete.`
    );

  } catch (error) {
    console.error(
      "Global Pokémon drop error:",
      error
    );

    await ctx.reply(
      "❌ Failed to create the Pokémon drop."
    );
  }
}
