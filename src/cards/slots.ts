// ============================================
// Lexxie MiaBot — Slots Card
// ============================================

import { Context } from "grammy";

import {
  createCanvasBase,
  drawLexxieAvatar,
  roundRect,
  sendCanvas,
  getPlayerInfo,
} from "./game";

interface SlotsOptions {
  a: string;
  b: string;
  c: string;
  bet: number;
  reward: number;
  balance: number;
}

export async function sendSlotsCard(
  ctx: Context,
  options: SlotsOptions
) {
  const { canvas, ctx: c } =
    createCanvasBase(1000, 650);

  const {
    firstName,
  } = getPlayerInfo(ctx);

  c.font = "bold 40px sans-serif";
  c.fillStyle = "#ffffff";

  c.fillText(
    "🎰 SLOT MACHINE",
    60,
    75
  );

  c.font = "18px sans-serif";
  c.fillStyle = "#9ca3af";

  c.fillText(
    "SPIN • MATCH • WIN",
    65,
    105
  );

  // Avatar
  drawLexxieAvatar(
    c,
    135,
    265,
    85
  );

  c.font = "bold 20px sans-serif";
  c.fillStyle = "#ffffff";
  c.textAlign = "center";

  c.fillText(
    firstName.slice(0, 15),
    135,
    390
  );

  c.textAlign = "left";

  // Slot machine body
  roundRect(
    c,
    250,
    155,
    680,
    300,
    30
  );

  c.fillStyle = "#11101e";
  c.fill();

  c.strokeStyle = "#8b5cf6";
  c.lineWidth = 3;
  c.stroke();

  // Slot windows
  const slots = [
    { x: 295, value: options.a },
    { x: 500, value: options.b },
    { x: 705, value: options.c },
  ];

  for (const slot of slots) {
    roundRect(
      c,
      slot.x,
      210,
      160,
      150,
      20
    );

    c.fillStyle = "#211c35";
    c.fill();

    c.font = "70px sans-serif";
    c.textAlign = "center";
    c.fillStyle = "#ffffff";

    c.fillText(
      slot.value,
      slot.x + 80,
      310
    );
  }

  c.textAlign = "left";

  // Result
  const won = options.reward > 0;

  c.font = "bold 30px sans-serif";
  c.fillStyle = won
    ? "#a7f3d0"
    : "#fca5a5";

  c.fillText(
    won
      ? `🎉 WIN +${options.reward.toLocaleString()}`
      : `💔 LOSS -${options.bet.toLocaleString()}`,
    295,
    405
  );

  // Bottom stats
  drawBox(
    c,
    60,
    490,
    270,
    90,
    "BET",
    options.bet.toLocaleString()
  );

  drawBox(
    c,
    365,
    490,
    270,
    90,
    "WIN",
    options.reward.toLocaleString()
  );

  drawBox(
    c,
    670,
    490,
    270,
    90,
    "BALANCE",
    options.balance.toLocaleString()
  );

  c.font = "15px sans-serif";
  c.fillStyle = "#6b7280";

  c.fillText(
    "⚡ Lexxie MiaBot • Powered by Mr. Alex",
    60,
    615
  );

  await sendCanvas(ctx, canvas);
}

function drawBox(
  c: any,
  x: number,
  y: number,
  width: number,
  height: number,
  label: string,
  value: string
) {
  roundRect(
    c,
    x,
    y,
    width,
    height,
    18
  );

  c.fillStyle = "#17152a";
  c.fill();

  c.font = "14px sans-serif";
  c.fillStyle = "#8f8ba3";

  c.fillText(
    label,
    x + 20,
    y + 28
  );

  c.font = "bold 24px sans-serif";
  c.fillStyle = "#ffffff";

  c.fillText(
    value,
    x + 20,
    y + 62
  );
}
