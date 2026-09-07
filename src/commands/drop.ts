import { Context } from "grammy";
import {
  getPokemon
} from "../services/pokemon";

import {
  sendPokemonCard
} from "../cards/pokemon";

export async function dropCommand(
  ctx: Context
) {
  const text =
    ctx.message?.text || "";

  const parts =
    text.trim().split(/\s+/);

  const query =
    parts.slice(1).join(" ").trim();

  if (!query) {
    await ctx.reply(
      "❌ <b>Pokemon name required</b>\n\n" +
      "Example:\n" +
      "<code>/drop pikachu</code>\n" +
      "<code>/drop charizard</code>\n" +
      "<code>/drop mewtwo</code>",
      {
        parse_mode: "HTML"
      }
    );

    return;
  }

  try {
    const pokemon =
      await getPokemon(query);

    await sendPokemonCard(
      ctx,
      pokemon
    );

  } catch (error: any) {
    console.error(
      "Drop command error:",
      error
    );

    await ctx.reply(
      `❌ <b>Pokemon not found</b>\n\n` +
      `I couldn't find <code>${escapeHtml(
        query
      )}</code> in PokéAPI.\n\n` +
      `Try a name like:\n` +
      `• <code>pikachu</code>\n` +
      `• <code>charizard</code>\n` +
      `• <code>mewtwo</code>`,
      {
        parse_mode: "HTML"
      }
    );
  }
}

function escapeHtml(
  text: string
) {
  return text
    .replace(/&/g, "&amp;")
    .replace(
      /</g,
      "&lt;"
    )
    .replace(
      />/g,
      "&gt;"
    );
}
