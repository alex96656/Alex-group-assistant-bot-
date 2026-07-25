// ============================================
// Lexxie MiaBot Shop
// ============================================

import { Context } from "grammy";
import { SHOP_ITEMS } from "../economy/shop";

export async function shopCommand(ctx: Context) {

let text = `🛒 <b>Lexxie Shop</b>\n\n`;

for (const item of SHOP_ITEMS) {

text +=
`${item.id}. ${item.name}
💰 ${item.price.toLocaleString()} Lex Coins

${item.description}

`;
}

text += "🛍 Buy with:\n<code>/buy ITEM_ID</code>";

await ctx.reply(text,{
parse_mode:"HTML"
});

}
