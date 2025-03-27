export interface PokemonState {
  limit: number;
  pokemons: Pokemon[];
  filteredPokemons: Pokemon[];
  loading: boolean;
  error: string | null;
  singlePokemon: Pokemon | null;
  pokemonTypes: PokemonTypes[];
  searchVal: string;
  selectedType: string;
}

export interface Pokemon {
  id: number;
  name: string;
  types: PokemonType[];
  sprites: PokemonSprites;
  stats: PokemonStats[];
  abilities: PokemonAbility[];
  moves: PokemonMoves[];
}

export type PokemonType = {
  slot: number;
  type: {
    name: string;
    url: string;
  };
};

export type PokemonSprites = {
  back_default: string | null;
  back_female: string | null;
  back_shiny: string | null;
  back_shiny_female: string | null;
  front_default: string | null;
  front_female: string | null;
  front_shiny: string | null;
  front_shiny_female: string | null;
};

export interface PokemonStats {
  base_stat: number;
  effort: number;
  stat: Stats;
}

export interface Stats {
  name: string;
  url: string;
}

export interface PokemonAbility {
  ability: Ability;
  is_hidden: boolean;
  slot: number;
}

export interface Ability {
  name: string;
  url: string;
}

export interface PokemonMoves {
  move: Move;
}

export interface Move {
  name: string;
  url: string;
}

export type PokemonTypes = {
  name: string;
};
