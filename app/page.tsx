"use client";

import DropdownComponent from "@/components/dropdownComponent";
import Loader from "@/components/loader";
import PokemonCard from "@/components/pokemonCard";
import SearchComponent from "@/components/searchComponent";
import {
  fetchAllPokemon,
  fetchPokemonByType,
  fetchPokemonTypes,
  loadDataFromStorage,
  searchPokemon,
  setSearchVal,
} from "@/lib/features/pokemonSlice";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { ChangeEvent, useEffect } from "react";

export default function Home() {
  const dispatch = useAppDispatch();
  const {
    loading,
    selectedType,
    pokemonTypes,
    searchVal,
    error,
    filteredPokemons,
  } = useAppSelector((state) => state.pokemon);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const storedPokemons = localStorage.getItem("pokemons");
    const storedTypes = localStorage.getItem("pokemonTypes");
    const hasPokemons = storedPokemons && JSON.parse(storedPokemons).length > 0;
    const hasTypes = storedTypes && JSON.parse(storedTypes).length > 0;
    if (hasPokemons && hasTypes) {
      dispatch(loadDataFromStorage());
    } else {
      dispatch(fetchAllPokemon());
      dispatch(fetchPokemonTypes());
    }
  }, [dispatch]);

  const handleTypeSearch = (val: string) => dispatch(fetchPokemonByType(val));

  const handlePokemonSearch = () => dispatch(searchPokemon());

  const handleSearchTextChange = (e: ChangeEvent<HTMLInputElement>) =>
    dispatch(setSearchVal(e.target.value));

  return (
    <main>
      {loading ? (
        <Loader />
      ) : (
        <section className="my-5">
          <div className="flex flex-col items-start mb-2">
            <DropdownComponent
              selectedType={selectedType}
              pokemonTypes={pokemonTypes}
              handleTypeSearch={handleTypeSearch}
            />
            <SearchComponent
              searchVal={searchVal}
              handlePokemonSearch={handlePokemonSearch}
              handleSearchTextChange={handleSearchTextChange}
            />
          </div>
          {error ? (
            <p className="text-center text-red-500">Failed to load Pokemon!</p>
          ) : (
            <div>
              {filteredPokemons && filteredPokemons.length > 0 ? (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                  {filteredPokemons.map((pokemon) => (
                    <PokemonCard key={pokemon.id} pokemon={pokemon} />
                  ))}
                </div>
              ) : (
                <p className="text-center text-gray-500 text-lg mt-10">
                  No Pokemon found
                </p>
              )}
            </div>
          )}
        </section>
      )}
    </main>
  );
}
