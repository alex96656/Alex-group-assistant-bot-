// ============================================
// Lexxie MiaBot Fish Command
// ============================================

import { Context } from "grammy";
import { getEconomy, saveEconomy } from "../economy/economy";

const FISH_COOLDOWN = 20 * 60 * 1000;

const fish = [
"🐟 Tilapia",
"🐠 Goldfish",
"🐡 Pufferfish",
"🦑 Squid",
"🦀 Crab",
"🦞 Lobster",
"🦈 Shark"
];

export async function fishCommand(ctx: Context) {

if (!ctx.from) return;

const user = getEconomy(ctx.from.id.toString());

if (!user.fish) user.fish = 0;

const hasRod =
user.items?.some((i:any)=>
i.name.includes("Fishing Rod")
);

if (!hasRod){
return ctx.reply(
"🎣 You need a Fishing Rod.\n\nBuy one using /shop."
);
}

const now = Date.now();

const remaining =
FISH_COOLDOWN - (now - user.fish);

if(remaining > 0){

const mins =
Math.ceil(remaining/60000);

return ctx.reply(
`⏳ Come back in ${mins} minute(s).`
);

}

const caught =
fish[Math.floor(Math.random()*fish.length)];

const reward =
Math.floor(Math.random()*1001)+600;

user.balance += reward;
user.fish = now;

saveEconomy(ctx.from.id.toString(),user);

await ctx.reply(
`🎣 Fishing Complete!

You caught:

${caught}

💰 Earned:
${reward.toLocaleString()} Lex Coins`
);

}
