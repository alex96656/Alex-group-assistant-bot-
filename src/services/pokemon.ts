// ============================================
// Lexxie MiaBot Pokémon Service
// Powered by PokeAPI
// ============================================

const POKE_API =
  "https://pokeapi.co/api/v2/pokemon";

export interface PokemonData {
  id: number;
  name: string;
  image: string;
  types: string[];
  height: number;
  weight: number;
}

// Get a specific Pokémon
export async function getPokemon(
  query: string | number
): Promise<PokemonData> {

  const response = await fetch(
    `${POKE_API}/${encodeURIComponent(
      String(query).toLowerCase()
    )}`
  );

  if (!response.ok) {
    throw new Error(
      `Pokémon not found: ${query}`
    );
  }

  const data = await response.json();

  const image =
    data.sprites?.other?.[
      "official-artwork"
    ]?.front_default ||
    data.sprites?.front_default;

  if (!image) {
    throw new Error(
      `No image available for ${data.name}`
    );
  }

  return {
    id: data.id,

    name: data.name,

    image,

    types: data.types.map(
      (type: any) =>
        type.type.name
    ),

    height: data.height,

    weight: data.weight,
  };
}

// Get a random Pokémon
export async function getRandomPokemon(): Promise<PokemonData> {

  // Current Pokédex range
  const id =
    Math.floor(
      Math.random() * 1025
    ) + 1;

  return getPokemon(id);
}
