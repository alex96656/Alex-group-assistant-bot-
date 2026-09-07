import {
  createCanvas,
  loadImage
} from "@napi-rs/canvas";

import {
  Context,
  InputFile
} from "grammy";

import {
  PokemonData,
  getPokemonRarity
} from "../services/pokemon";

const WIDTH = 1200;
const HEIGHT = 800;

// ============================================
// COLORS
// ============================================

const BG = "#080812";
const PANEL = "#11101e";
const PANEL_2 = "#17152a";
const WHITE = "#ffffff";
const MUTED = "#9894aa";
const PURPLE = "#8b5cf6";
const PURPLE_LIGHT = "#c4b5fd";

// ============================================
// PREMIUM POKEMON CARD
// ============================================

export async function sendPokemonCard(
  ctx: Context,
  pokemon: PokemonData
) {
  const canvas = createCanvas(
    WIDTH,
    HEIGHT
  );

  const c = canvas.getContext("2d");

  drawBackground(c);

  const rarity = getPokemonRarity(
    pokemon
  );

  // Header
  c.font = "bold 38px sans-serif";
  c.fillStyle = WHITE;

  c.fillText(
    "LEXXIE  POKEMON",
    60,
    65
  );

  c.font = "18px sans-serif";
  c.fillStyle = MUTED;

  c.fillText(
    "WILD ENCOUNTER",
    62,
    95
  );

  // Pokédex number
  c.textAlign = "right";

  c.font = "bold 24px sans-serif";
  c.fillStyle = PURPLE_LIGHT;

  c.fillText(
    `#${String(pokemon.id).padStart(3, "0")}`,
    1135,
    70
  );

  c.font = "16px sans-serif";
  c.fillStyle = MUTED;

  c.fillText(
    rarity,
    1135,
    96
  );

  c.textAlign = "left";

  // Main Pokémon artwork panel
  roundRect(
    c,
    55,
    135,
    520,
    560,
    36
  );

  c.fillStyle = PANEL;
  c.fill();

  c.strokeStyle = PURPLE;
  c.lineWidth = 3;
  c.stroke();

  // Artwork glow
  c.beginPath();
  c.arc(
    315,
    405,
    190,
    0,
    Math.PI * 2
  );

  c.fillStyle =
    "rgba(139, 92, 246, 0.10)";

  c.fill();

  // Load PokeAPI artwork
  try {
    const response = await fetch(
      pokemon.image
    );

    if (response.ok) {
      const buffer = Buffer.from(
        await response.arrayBuffer()
      );

      const image = await loadImage(
        buffer
      );

      const maxWidth = 390;
      const maxHeight = 390;

      const scale = Math.min(
        maxWidth / image.width,
        maxHeight / image.height
      );

      const imageWidth =
        image.width * scale;

      const imageHeight =
        image.height * scale;

      c.drawImage(
        image,
        315 - imageWidth / 2,
        400 - imageHeight / 2,
        imageWidth,
        imageHeight
      );
    }
  } catch (error) {
    console.error(
      "Pokemon artwork error:",
      error
    );
  }

  // Name
  c.textAlign = "center";

  c.font = "bold 34px sans-serif";
  c.fillStyle = WHITE;

  c.fillText(
    formatPokemonName(pokemon.name),
    315,
    625
  );

  // Types
  c.font = "16px sans-serif";
  c.fillStyle = MUTED;

  c.fillText(
    pokemon.types
      .map(formatPokemonName)
      .join("  •  ")
      .toUpperCase(),
    315,
    655
  );

  c.textAlign = "left";

  // ==========================================
  // RIGHT INFORMATION PANEL
  // ==========================================

  roundRect(
    c,
    610,
    135,
    535,
    560,
    36
  );

  c.fillStyle = PANEL;
  c.fill();

  c.strokeStyle = "#27233c";
  c.lineWidth = 2;
  c.stroke();

  // Rarity badge
  drawBadge(
    c,
    650,
    170,
    rarity
  );

  // Stats title
  c.font = "bold 23px sans-serif";
  c.fillStyle = WHITE;

  c.fillText(
    "BASE STATS",
    650,
    250
  );

  drawStat(
    c,
    650,
    290,
    "HP",
    pokemon.stats.hp
  );

  drawStat(
    c,
    650,
    350,
    "ATTACK",
    pokemon.stats.attack
  );

  drawStat(
    c,
    650,
    410,
    "DEFENSE",
    pokemon.stats.defense
  );

  drawStat(
    c,
    650,
    470,
    "SP. ATTACK",
    pokemon.stats.spAttack
  );

  drawStat(
    c,
    650,
    530,
    "SP. DEFENSE",
    pokemon.stats.spDefense
  );

  drawStat(
    c,
    650,
    590,
    "SPEED",
    pokemon.stats.speed
  );

  // Info row
  c.font = "15px sans-serif";
  c.fillStyle = MUTED;

  c.fillText(
    `Height: ${pokemon.height / 10} m`,
    650,
    645
  );

  c.fillText(
    `Weight: ${pokemon.weight / 10} kg`,
    850,
    645
  );

  // Footer
  c.font = "15px sans-serif";
  c.fillStyle = "#686477";

  c.fillText(
    "Lexxie MiaBot  •  Powered by Mr. Alex",
    60,
    750
  );

  c.textAlign = "right";

  c.fillText(
    `BASE XP  ${pokemon.base_experience}`,
    1140,
    750
  );

  c.textAlign = "left";

  const buffer =
    canvas.toBuffer("image/png");

  await ctx.replyWithPhoto(
    new InputFile(
      buffer,
      "lexxie-pokemon.png"
    ),
    {
      caption:
        `✨ <b>Wild ${formatPokemonName(
          pokemon.name
        )} appeared!</b>\n\n` +
        `Use <code>/drop ${pokemon.name}</code> to view it again.`,
      parse_mode: "HTML"
    }
  );
}

// ============================================
// BACKGROUND
// ============================================

function drawBackground(c: any) {
  c.fillStyle = BG;
  c.fillRect(
    0,
    0,
    WIDTH,
    HEIGHT
  );

  // Decorative circles
  for (let i = 0; i < 8; i++) {
    c.beginPath();

    c.arc(
      80 + i * 170,
      110 + (i % 2) * 620,
      90,
      0,
      Math.PI * 2
    );

    c.fillStyle =
      "rgba(139, 92, 246, 0.035)";

    c.fill();
  }

  // Top line
  c.fillStyle = PURPLE;

  c.fillRect(
    55,
    115,
    1090,
    3
  );
}

// ============================================
// STAT BAR
// ============================================

function drawStat(
  c: any,
  x: number,
  y: number,
  name: string,
  value: number
) {
  c.font = "bold 15px sans-serif";
  c.fillStyle = MUTED;

  c.fillText(
    name,
    x,
    y
  );

  c.textAlign = "right";

  c.fillStyle = WHITE;

  c.fillText(
    String(value),
    1090,
    y
  );

  c.textAlign = "left";

  // Background bar
  roundRect(
    c,
    x,
    y + 12,
    440,
    12,
    6
  );

  c.fillStyle = "#252239";
  c.fill();

  // Value bar
  const percentage =
    Math.min(value, 255) / 255;

  roundRect(
    c,
    x,
    y + 12,
    440 * percentage,
    12,
    6
  );

  c.fillStyle = PURPLE_LIGHT;
  c.fill();
}

// ============================================
// RARITY BADGE
// ============================================

function drawBadge(
  c: any,
  x: number,
  y: number,
  rarity: string
) {
  roundRect(
    c,
    x,
    y,
    180,
    48,
    18
  );

  c.fillStyle =
    "rgba(139, 92, 246, 0.16)";

  c.fill();

  c.strokeStyle = PURPLE;
  c.lineWidth = 1.5;
  c.stroke();

  c.font = "bold 16px sans-serif";
  c.fillStyle = PURPLE_LIGHT;

  c.fillText(
    rarity,
    x + 22,
    y + 31
  );
}

// ============================================
// ROUNDED RECTANGLE
// ============================================

function roundRect(
  c: any,
  x: number,
  y: number,
  width: number,
  height: number,
  radius: number
) {
  c.beginPath();

  c.moveTo(
    x + radius,
    y
  );

  c.lineTo(
    x + width - radius,
    y
  );

  c.quadraticCurveTo(
    x + width,
    y,
    x + width,
    y + radius
  );

  c.lineTo(
    x + width,
    y + height - radius
  );

  c.quadraticCurveTo(
    x + width,
    y + height,
    x + width - radius,
    y + height
  );

  c.lineTo(
    x + radius,
    y + height
  );

  c.quadraticCurveTo(
    x,
    y + height,
    x,
    y + height - radius
  );

  c.lineTo(
    x,
    y + radius
  );

  c.quadraticCurveTo(
    x,
    y,
    x + radius,
    y
  );

  c.closePath();
}

// ============================================
// FORMAT NAME
// ============================================

function formatPokemonName(
  name: string
) {
  return name
    .split("-")
    .map(
      (part) =>
        part.charAt(0).toUpperCase() +
        part.slice(1)
    )
    .join(" ");
}
