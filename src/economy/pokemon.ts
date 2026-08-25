import {
  getEconomy,
  saveEconomy,
} from "./economy";

export function addPokemon(
  userId: string,
  pokemonId: number
) {
  const user = getEconomy(userId);

  if (!user.pokemon) {
    user.pokemon = [];
  }

  user.pokemon.push(pokemonId);

  saveEconomy(userId, user);
}

export function getPokemonCollection(
  userId: string
): number[] {
  const user = getEconomy(userId);

  return user.pokemon || [];
}
