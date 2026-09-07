import { createCanvas } from "@napi-rs/canvas";
import { Context, InputFile } from "grammy";
import { getEconomy } from "../economy/economy";

export function createCanvasBase(width = 1000, height = 650) {
  const canvas = createCanvas(width, height);
  const ctx = canvas.getContext("2d");

  // Background
  ctx.fillStyle = "#080812";
  ctx.fillRect(0, 0, width, height);

  // Header glow
  ctx.fillStyle = "#15102b";
  ctx.fillRect(0, 0, width, 130);

  return { canvas, ctx };
}

// ============================================
// ORIGINAL PROGRAMMED LEXXIE AVATAR
// ============================================

export function drawLexxieAvatar(
  ctx: any,
  x: number,
  y: number,
  radius: number
) {
  // Glow
  ctx.beginPath();
  ctx.arc(x, y, radius + 15, 0, Math.PI * 2);
  ctx.fillStyle = "rgba(139, 92, 246, 0.15)";
  ctx.fill();

  // Face
  ctx.beginPath();
  ctx.arc(x, y, radius, 0, Math.PI * 2);
  ctx.fillStyle = "#c4b5fd";
  ctx.fill();

  // Hair
  ctx.beginPath();
  ctx.arc(
    x,
    y - radius * 0.15,
    radius * 0.92,
    Math.PI,
    Math.PI * 2
  );
  ctx.fillStyle = "#7c3aed";
  ctx.fill();

  // Hair sides
  ctx.fillStyle = "#6d28d9";
  ctx.fillRect(
    x - radius * 0.85,
    y - radius * 0.15,
    radius * 0.18,
    radius * 0.65
  );

  ctx.fillRect(
    x + radius * 0.67,
    y - radius * 0.15,
    radius * 0.18,
    radius * 0.65
  );

  // Eyes
  ctx.beginPath();
  ctx.arc(
    x - radius * 0.32,
    y - radius * 0.05,
    radius * 0.09,
    0,
    Math.PI * 2
  );
  ctx.arc(
    x + radius * 0.32,
    y - radius * 0.05,
    radius * 0.09,
    0,
    Math.PI * 2
  );
  ctx.fillStyle = "#7c3aed";
  ctx.fill();

  // Smile
  ctx.beginPath();
  ctx.arc(
    x,
    y + radius * 0.12,
    radius * 0.28,
    0,
    Math.PI
  );
  ctx.strokeStyle = "#4c1d95";
  ctx.lineWidth = 5;
  ctx.stroke();

  // Lexxie L logo
  ctx.font = `bold ${radius * 0.32}px sans-serif`;
  ctx.textAlign = "center";
  ctx.fillStyle = "#ffffff";
  ctx.fillText("L", x, y + radius * 0.75);
  ctx.textAlign = "left";
}

// ============================================
// ROUNDED RECTANGLE
// ============================================

export function roundRect(
  ctx: any,
  x: number,
  y: number,
  width: number,
  height: number,
  radius: number
) {
  ctx.beginPath();

  ctx.moveTo(x + radius, y);
  ctx.lineTo(x + width - radius, y);

  ctx.quadraticCurveTo(
    x + width,
    y,
    x + width,
    y + radius
  );

  ctx.lineTo(x + width, y + height - radius);

  ctx.quadraticCurveTo(
    x + width,
    y + height,
    x + width - radius,
    y + height
  );

  ctx.lineTo(x + radius, y + height);

  ctx.quadraticCurveTo(
    x,
    y + height,
    x,
    y + height - radius
  );

  ctx.lineTo(x, y + radius);

  ctx.quadraticCurveTo(
    x,
    y,
    x + radius,
    y
  );

  ctx.closePath();
}

// ============================================
// SEND CANVAS
// ============================================

export async function sendCanvas(
  ctx: Context,
  canvas: any
) {
  const buffer = canvas.toBuffer("image/png");

  await ctx.replyWithPhoto(
    new InputFile(buffer, "lexxie-card.png")
  );
}

// ============================================
// PLAYER INFO
// ============================================

export function getPlayerInfo(ctx: Context) {
  const firstName = ctx.from?.first_name || "Player";

  const username = ctx.from?.username
    ? `@${ctx.from.username}`
    : firstName;

  const user = getEconomy(
    String(ctx.from?.id || "0")
  );

  return {
    firstName,
    username,
    user
  };
}

// ============================================
// GENERIC GAME CARD
// Keeps dice.ts and other old commands working
// ============================================

export async function sendGameCard(
  ctx: Context,
  options: {
    title: string;
    content: string;
    result?: string;
    emoji?: string;
  }
) {
  if (!ctx.from) return;

  const { canvas, ctx: c } = createCanvasBase(
    1000,
    650
  );

  const {
    firstName,
    username,
    user
  } = getPlayerInfo(ctx);

  const emoji = options.emoji || "🎮";

  // Title
  c.font = "bold 40px sans-serif";
  c.fillStyle = "#ffffff";
  c.fillText(
    `${emoji} ${options.title}`,
    60,
    75
  );

  c.font = "18px sans-serif";
  c.fillStyle = "#9ca3af";
  c.fillText(
    "LEXXIE GAME CENTER",
    65,
    105
  );

  // Lexxie avatar
  drawLexxieAvatar(
    c,
    160,
    280,
    90
  );

  // Player name
  c.font = "bold 20px sans-serif";
  c.fillStyle = "#ffffff";
  c.textAlign = "center";

  c.fillText(
    firstName.slice(0, 15),
    160,
    410
  );

  c.font = "15px sans-serif";
  c.fillStyle = "#8f8ba3";

  c.fillText(
    username.slice(0, 18),
    160,
    435
  );

  c.textAlign = "left";

  // Main panel
  roundRect(
    c,
    300,
    150,
    620,
    300,
    30
  );

  c.fillStyle = "#11101e";
  c.fill();

  c.strokeStyle = "#8b5cf6";
  c.lineWidth = 3;
  c.stroke();

  // Content
  c.font = "bold 25px sans-serif";
  c.fillStyle = "#ffffff";

  const lines = options.content.split("\n");

  let y = 215;

  for (const line of lines.slice(0, 7)) {
    c.fillText(
      line.slice(0, 45),
      340,
      y
    );

    y += 42;
  }

  // Result
  if (options.result) {
    c.font = "bold 27px sans-serif";
    c.fillStyle = "#c4b5fd";

    c.fillText(
      options.result.slice(0, 40),
      340,
      410
    );
  }

  // Stats
  drawSmallStat(
    c,
    300,
    485,
    "LEVEL",
    String(user.level)
  );

  drawSmallStat(
    c,
    510,
    485,
    "COINS",
    user.balance.toLocaleString()
  );

  drawSmallStat(
    c,
    720,
    485,
    "XP",
    user.xp.toLocaleString()
  );

  // Footer
  c.font = "15px sans-serif";
  c.fillStyle = "#6b7280";

  c.fillText(
    "Lexxie MiaBot • Powered by Mr. Alex",
    60,
    615
  );

  await sendCanvas(
    ctx,
    canvas
  );
}

// ============================================
// SMALL STAT BOX
// ============================================

function drawSmallStat(
  c: any,
  x: number,
  y: number,
  label: string,
  value: string
) {
  roundRect(
    c,
    x,
    y,
    190,
    75,
    16
  );

  c.fillStyle = "#17152a";
  c.fill();

  c.font = "13px sans-serif";
  c.fillStyle = "#8f8ba3";

  c.fillText(
    label,
    x + 15,
    y + 25
  );

  c.font = "bold 20px sans-serif";
  c.fillStyle = "#ffffff";

  c.fillText(
    value,
    x + 15,
    y + 55
  );
}
