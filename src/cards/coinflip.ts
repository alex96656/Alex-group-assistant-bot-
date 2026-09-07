// ============================================
// Lexxie MiaBot — Coin Flip Card
// ============================================

import { Context } from "grammy";

import {
  createCanvasBase,
  drawLexxieAvatar,
  roundRect,
  sendCanvas,
  getPlayerInfo,
} from "./game";

interface CoinflipOptions {
  result: "HEADS" | "TAILS";
}

export async function sendCoinflipCard(
  ctx: Context,
  options: CoinflipOptions
) {
  const { canvas, ctx: c } =
    createCanvasBase(1000, 650);

  const { firstName } =
    getPlayerInfo(ctx);

  c.font = "bold 40px sans-serif";
  c.fillStyle = "#ffffff";

  c.fillText(
    "🪙 COIN FLIP",
    65,
    75
  );

  c.font = "18px sans-serif";
  c.fillStyle = "#9ca3af";

  c.fillText(
    "LUCK HAS SPOKEN",
    68,
    105
  );

  // Avatar
  drawLexxieAvatar(
    c,
    150,
    285,
    90
  );

  c.font = "bold 20px sans-serif";
  c.fillStyle = "#ffffff";
  c.textAlign = "center";

  c.fillText(
    firstName.slice(0, 15),
    150,
    415
  );

  c.textAlign = "left";

  // Coin
  c.save();

  c.shadowBlur = 40;
  c.shadowColor = "#f59e0b";

  c.beginPath();
  c.arc(
    550,
    285,
    125,
    0,
    Math.PI * 2
  );

  c.fillStyle = "#f59e0b";
  c.fill();

  c.restore();

  // Coin inner
  c.beginPath();
  c.arc(
    550,
    285,
    98,
    0,
    Math.PI * 2
  );

  c.fillStyle = "#17131f";
  c.fill();

  c.font = "bold 55px sans-serif";
  c.fillStyle = "#fbbf24";
  c.textAlign = "center";

  c.fillText(
    options.result === "HEADS"
      ? "H"
      : "T",
    550,
    305
  );

  c.textAlign = "left";

  // Result panel
  roundRect(
    c,
    330,
    445,
    440,
    105,
    25
  );

  c.fillStyle = "#17152a";
  c.fill();

  c.font = "16px sans-serif";
  c.fillStyle = "#8f8ba3";

  c.fillText(
    "RESULT",
    365,
    480
  );

  c.font = "bold 34px sans-serif";
  c.fillStyle = "#ffffff";

  c.fillText(
    options.result === "HEADS"
      ? "🪙 HEADS!"
      : "🪙 TAILS!",
    365,
    525
  );

  c.font = "15px sans-serif";
  c.fillStyle = "#6b7280";

  c.fillText(
    "⚡ Lexxie MiaBot • Powered by Mr. Alex",
    65,
    615
  );

  await sendCanvas(ctx, canvas);
}
