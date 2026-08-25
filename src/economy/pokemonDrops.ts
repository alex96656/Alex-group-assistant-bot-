import { getDatabase, saveDatabase } from "../database/database";

export interface PokemonDrop {
  id: string;
  pokemonId: number;
  reward: number;
  claimed: boolean;
  claimedBy?: number;
  expiresAt: number;
}

export function createPokemonDrop(
  pokemonId: number,
  reward: number
): PokemonDrop {
  const db = getDatabase();

  if (!db.pokemonDrops) {
    db.pokemonDrops = {};
  }

  const id =
    `${Date.now()}_${Math.random()
      .toString(36)
      .slice(2, 8)}`;

  const drop: PokemonDrop = {
    id,
    pokemonId,
    reward,
    claimed: false,
    expiresAt: Date.now() + 60_000,
  };

  db.pokemonDrops[id] = drop;

  saveDatabase(db);

  return drop;
}

export function getPokemonDrop(
  id: string
): PokemonDrop | null {
  const db = getDatabase();

  return db.pokemonDrops?.[id] || null;
}

export function claimPokemonDrop(
  id: string,
  userId: number
) {
  const db = getDatabase();

  const drop = db.pokemonDrops?.[id];

  if (!drop) {
    return {
      success: false,
      reason: "❌ This Pokémon drop no longer exists.",
    };
  }

  if (drop.claimed) {
    return {
      success: false,
      reason: "❌ Someone already caught this Pokémon!",
    };
  }

  if (Date.now() > drop.expiresAt) {
    return {
      success: false,
      reason: "⏰ This Pokémon escaped!",
    };
  }

  drop.claimed = true;
  drop.claimedBy = userId;

  saveDatabase(db);

  return {
    success: true,
    drop,
  };
}
