// ============================================
// Lexxie MiaBot — Profile Card
// ============================================

import {
  createCanvasBase,
  drawLexxieAvatar,
  getPlayerInfo,
  roundRect,
  sendCanvas,
} from "./game";

import { Context } from "grammy";

export async function sendProfileCard(
  ctx: Context
) {
  if (!ctx.from) return;

  const { canvas, ctx: c } =
    createCanvasBase(1000, 650);

  const {
    firstName,
    username,
    user,
  } = getPlayerInfo(ctx);

  // Header
  c.font = "bold 38px sans-serif";
  c.fillStyle = "#ffffff";

  c.fillText(
    "👤 PLAYER PROFILE",
    65,
    75
  );

  c.font = "18px sans-serif";
  c.fillStyle = "#9ca3af";

  c.fillText(
    "LEXXIE • PLAYER DATABASE",
    68,
    105
  );

  // Avatar panel
  roundRect(
    c,
    55,
    145,
    270,
    390,
    30
  );

  c.fillStyle = "#11101f";
  c.fill();

  drawLexxieAvatar(
    c,
    190,
    300,
    105
  );

  c.font = "bold 25px sans-serif";
  c.fillStyle = "#ffffff";
  c.textAlign = "center";

  c.fillText(
    "LEXXIE",
    190,
    455
  );

  c.font = "16px sans-serif";
  c.fillStyle = "#9ca3af";

  c.fillText(
    "GAME AVATAR",
    190,
    485
  );

  c.textAlign = "left";

  // Player information
  c.font = "bold 32px sans-serif";
  c.fillStyle = "#ffffff";

  c.fillText(
    firstName.slice(0, 22),
    370,
    175
  );

  c.font = "20px sans-serif";
  c.fillStyle = "#a78bfa";

  c.fillText(
    username.slice(0, 30),
    370,
    210
  );

  // Stats boxes
  drawStat(
    c,
    370,
    255,
    245,
    105,
    "⭐",
    "LEVEL",
    String(user.level)
  );

  drawStat(
    c,
    640,
    255,
    285,
    105,
    "💰",
    "LEX COINS",
    user.balance.toLocaleString()
  );

  drawStat(
    c,
    370,
    385,
    245,
    105,
    "✨",
    "XP",
    user.xp.toLocaleString()
  );

  drawStat(
    c,
    640,
    385,
    285,
    105,
    "🏦",
    "BANK",
    user.bank.toLocaleString()
  );

  // XP progress
  c.font = "bold 19px sans-serif";
  c.fillStyle = "#ffffff";

  c.fillText(
    "LEVEL PROGRESS",
    370,
    535
  );

  const needed =
    Math.max(100, user.level * 100);

  const progress =
    Math.min(user.xp / needed, 1);

  roundRect(
    c,
    370,
    550,
    555,
    22,
    11
  );

  c.fillStyle = "#29263b";
  c.fill();

  if (progress > 0) {
    roundRect(
      c,
      370,
      550,
      555 * progress,
      22,
      11
    );

    c.fillStyle = "#8b5cf6";
    c.fill();
  }

  c.font = "15px sans-serif";
  c.fillStyle = "#6b7280";

  c.fillText(
    `⚡ Lexxie MiaBot • Level ${user.level}`,
    65,
    610
  );

  await sendCanvas(ctx, canvas);
}

function drawStat(
  c: any,
  x: number,
  y: number,
  width: number,
  height: number,
  icon: string,
  label: string,
  value: string
) {
  roundRect(
    c,
    x,
    y,
    width,
    height,
    20
  );

  c.fillStyle = "#17152a";
  c.fill();

  c.font = "25px sans-serif";
  c.fillStyle = "#c4b5fd";

  c.fillText(
    icon,
    x + 20,
    y + 38
  );

  c.font = "14px sans-serif";
  c.fillStyle = "#8f8ba3";

  c.fillText(
    label,
    x + 60,
    y + 30
  );

  c.font = "bold 25px sans-serif";
  c.fillStyle = "#ffffff";

  c.fillText(
    value,
    x + 60,
    y + 65
  );
}
