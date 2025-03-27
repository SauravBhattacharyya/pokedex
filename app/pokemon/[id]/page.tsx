"use client";

import { useParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { useAppSelector } from "@/lib/hooks";
import { Pokemon } from "@/types";
import Loader from "@/components/loader";
import Breadcrumbs from "@/components/breadcrumbs";
import PokemonDetailedStats from "@/components/pokemonDetailedStats";

export default function PokemonDetails() {
  const { id } = useParams();
  const { pokemons } = useAppSelector((state) => state.pokemon);
  const [loading, setLoading] = useState(true);

  const singlePokemon = useMemo(() => {
    if (!id) return null;
    let found = pokemons.find((p) => p.id === Number(id));

    if (!found && typeof window !== "undefined") {
      const storedPokemons = JSON.parse(
        localStorage.getItem("pokemons") || "[]"
      );
      found = storedPokemons.find((p: Pokemon) => p.id === Number(id));
    }

    return found || null;
  }, [id, pokemons]);

  useEffect(() => {
    setLoading(false);
  }, [singlePokemon]);

  if (!id) return null;

  if (loading) return <Loader />;

  if (!singlePokemon)
    return (
      <div className="text-sm md:text-base flex flex-col items-start px-20">
        <Breadcrumbs />
        <p className="text-center text-gray-500 text-lg mt-10 w-full">
          Pokémon not found.
        </p>
      </div>
    );

  return (
    <>
      <div className="text-sm md:text-base flex flex-col items-start px-20">
        <Breadcrumbs pokemonName={singlePokemon.name} />
        <div className="w-full flex justify-center">
          <PokemonDetailedStats singlePokemon={singlePokemon} />
        </div>
      </div>
    </>
  );
}
