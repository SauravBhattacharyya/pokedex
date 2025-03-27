import { fetchAllPokemonApi } from "@/endpoints";
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

export const pokemonSlice = createSlice({
  name: "pokemon",
  initialState,
  reducers: {},
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
  },
});

export default pokemonSlice.reducer;
