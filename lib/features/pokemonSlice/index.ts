import { fetchAllPokemonApi, pokemonTypesApi } from "@/endpoints";
import { RootState } from "@/lib/store";
import { Pokemon, PokemonState } from "@/types";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState: PokemonState = {
  pokemons: [],
  filteredPokemons: [],
  loading: false,
  error: null,
  singlePokemon: null,
  limit: 151,
  pokemonTypes: [],
  searchVal: "",
  selectedType: "all",
};

export const fetchAllPokemon = createAsyncThunk(
  "pokemon/fetchAll",
  async (_, { getState, rejectWithValue }) => {
    try {
      const { limit, pokemons } = (getState() as RootState).pokemon;
      if (pokemons.length > 0) return pokemons;
      const urls = Array.from(
        { length: limit },
        (_, i) => `${fetchAllPokemonApi}/${i + 1}`
      );
      const responses = await Promise.all(urls.map((url) => axios.get(url)));
      return responses.map((response) => response.data);
    } catch (error: unknown) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }
      return rejectWithValue("An unknown error occurred");
    }
  }
);

export const fetchPokemonTypes = createAsyncThunk(
  "pokemon/types",
  async (_, { getState, rejectWithValue }) => {
    try {
      const { pokemonTypes } = (getState() as RootState).pokemon;
      if (pokemonTypes.length > 0) return pokemonTypes;
      const response = await axios.get(`${pokemonTypesApi}?limit=50`);
      return response.data;
    } catch (error: unknown) {
      if (error instanceof Error) return rejectWithValue(error.message);
      return rejectWithValue("An unknown error occurred");
    }
  }
);

export const pokemonSlice = createSlice({
  name: "pokemon",
  initialState,
  reducers: {
    fetchPokemonByType: (state, action) => {
      state.selectedType = action.payload;
      state.searchVal = "";
      state.filteredPokemons =
        action.payload === "all"
          ? state.pokemons
          : state.pokemons.filter((pokemon) =>
              pokemon.types?.some(
                (t) =>
                  t?.type?.name?.toLowerCase() === action.payload.toLowerCase()
              )
            );
    },
    searchPokemon: (state) => {
      state.selectedType = "all";
      state.filteredPokemons = state.pokemons.filter((pokemon) =>
        pokemon.name.toLowerCase().includes(state.searchVal.toLowerCase())
      );
    },
    setSearchVal: (state, action) => {
      state.searchVal = action.payload;
    },
    loadDataFromStorage: (state) => {
      if (typeof window !== "undefined") {
        const storedPokemons = JSON.parse(
          localStorage.getItem("pokemons") || "[]"
        );
        const storedTypes = JSON.parse(
          localStorage.getItem("pokemonTypes") || "[]"
        );
        state.pokemons = storedPokemons;
        state.filteredPokemons = storedPokemons;
        state.pokemonTypes = storedTypes;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllPokemon.fulfilled, (state, action) => {
        const fetchedPokemons = action.payload.map(
          ({ id, name, types, sprites, stats, abilities, moves }: Pokemon) => ({
            id,
            name,
            types,
            sprites,
            stats,
            abilities,
            moves: moves.slice(0, 5),
          })
        );
        state.pokemons = fetchedPokemons;
        state.filteredPokemons = fetchedPokemons;
        localStorage.setItem("pokemons", JSON.stringify(fetchedPokemons));
        state.loading = false;
        state.error = null;
      })
      .addCase(fetchAllPokemon.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error as string;
      })
      .addCase(fetchAllPokemon.pending, (state) => {
        state.loading = true;
        state.error = null;
      });
    builder
      .addCase(fetchPokemonTypes.fulfilled, (state, action) => {
        state.pokemonTypes = action.payload.results;
        localStorage.setItem(
          "pokemonTypes",
          JSON.stringify(action.payload.results)
        );
        state.loading = false;
        state.error = null;
      })
      .addCase(fetchPokemonTypes.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error as string;
      })
      .addCase(fetchPokemonTypes.pending, (state) => {
        state.loading = true;
        state.error = null;
      });
  },
});

export const {
  fetchPokemonByType,
  searchPokemon,
  setSearchVal,
  loadDataFromStorage,
} = pokemonSlice.actions;

export default pokemonSlice.reducer;
