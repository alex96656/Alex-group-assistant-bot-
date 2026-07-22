import { Context } from "grammy";

const quotes = [
  "💡 Success is the sum of small efforts repeated every day.",
  "🚀 Stay consistent. Small progress is still progress.",
  "🌟 Believe in yourself and keep learning.",
  "💻 Every expert was once a beginner.",
  "🔥 Don't stop until you're proud."
];

export async function quoteCommand(ctx: Context) {
  const quote = quotes[Math.floor(Math.random() * quotes.length)];
  await ctx.reply(quote);
}
