import { Context } from "grammy";
import {
  sendCoinflipCard,
} from "../cards/coinflip";

export async function coinflipCommand(
  ctx: Context
) {
  const result =
    Math.random() < 0.5
      ? "HEADS"
      : "TAILS";

  await sendCoinflipCard(
    ctx,
    {
      result,
    }
  );
}
