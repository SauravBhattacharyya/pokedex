import { configureStore } from "@reduxjs/toolkit";
import pokemonSlice from "../features/pokemonSlice";

export const makeStore = () => {
  return configureStore({ reducer: { pokemon: pokemonSlice } });
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
