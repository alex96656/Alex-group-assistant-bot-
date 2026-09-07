const API_BASE = "https://pokeapi.co/api/v2/pokemon";

export interface PokemonData {
  id: number;
  name: string;
  height: number;
  weight: number;
  base_experience: number;
  types: string[];
  image: string;
  shinyImage: string | null;
  stats: {
    hp: number;
    attack: number;
    defense: number;
    spAttack: number;
    spDefense: number;
    speed: number;
  };
}

const cache = new Map<string, PokemonData>();

function cleanName(name: string): string {
  return name.trim().toLowerCase().replace(/\s+/g, "-");
}

function getStat(stats: any[], name: string): number {
  return (
    stats.find((item) => item.stat?.name === name)?.base_stat ?? 0
  );
}

export function getPokemonRarity(pokemon: PokemonData): string {
  if (pokemon.base_experience >= 300) return "MYTHICAL";
  if (pokemon.base_experience >= 200) return "LEGENDARY";
  if (pokemon.base_experience >= 150) return "EPIC";
  if (pokemon.base_experience >= 100) return "RARE";
  if (pokemon.base_experience >= 50) return "UNCOMMON";
  return "COMMON";
}

export async function getPokemon(
  query: string
): Promise<PokemonData> {
  const name = cleanName(query);

  if (!name) {
    throw new Error("Pokemon name is required.");
  }

  const cached = cache.get(name);

  if (cached) {
    return cached;
  }

  const response = await fetch(
    `${API_BASE}/${encodeURIComponent(name)}`
  );

  if (!response.ok) {
    if (response.status === 404) {
      throw new Error(`Pokemon "${query}" was not found.`);
    }

    throw new Error(
      `PokeAPI returned HTTP ${response.status}.`
    );
  }

  const data: any = await response.json();

  const pokemon: PokemonData = {
    id: data.id,
    name: data.name,
    height: data.height,
    weight: data.weight,
    base_experience: data.base_experience ?? 0,

    types:
      data.types?.map(
        (item: any) => item.type.name
      ) ?? [],

    image:
      data.sprites?.other?.["official-artwork"]?.front_default ??
      data.sprites?.front_default,

    shinyImage:
      data.sprites?.other?.["official-artwork"]?.front_shiny ??
      null,

    stats: {
      hp: getStat(data.stats, "hp"),
      attack: getStat(data.stats, "attack"),
      defense: getStat(data.stats, "defense"),
      spAttack: getStat(data.stats, "special-attack"),
      spDefense: getStat(data.stats, "special-defense"),
      speed: getStat(data.stats, "speed")
    }
  };

  if (!pokemon.image) {
    throw new Error("This Pokemon has no usable artwork.");
  }

  cache.set(name, pokemon);

  return pokemon;
}

export async function getRandomPokemon(): Promise<PokemonData> {
  const id = Math.floor(Math.random() * 1025) + 1;
  return getPokemon(String(id));
}
