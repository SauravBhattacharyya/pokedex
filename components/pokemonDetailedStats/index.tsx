import { Pokemon } from "@/types";
import Image from "next/image";
import styles from "./styles.module.scss";

export default function PokemonDetailedStats({
  singlePokemon,
}: {
  singlePokemon: Pokemon;
}) {
  return (
    <div className="mt-6 max-w-xs">
      <div
        className={`${styles.pokemonImage} bg-teal-300 rounded-t-md flex items-center justify-center`}
      >
        <Image
          src={
            singlePokemon.sprites.front_default ||
            "/assets/images/poke-ball.png"
          }
          alt={singlePokemon.name}
          width={96}
          height={96}
          className="h-full w-full"
        />
      </div>
      <div className="bg-yellow-400 p-4 md:p-6 rounded-b-md">
        <div>
          <span className="font-bold mr-2">Name:</span>
          <span className="capitalize">{singlePokemon.name}</span>
        </div>
        <div>
          <span className="font-bold mr-2">Type:</span>

          {singlePokemon.types.map((type, index: number) => (
            <span key={type.slot}>
              {type.type.name}
              {index < singlePokemon.types.length - 1 && ", "}
            </span>
          ))}
        </div>
        <div>
          <span className="font-bold mr-2">Stats:</span>

          {singlePokemon.stats.map((stat, index: number) => (
            <span key={stat.stat.name}>{`${stat.stat.name} ${stat.base_stat}${
              index < singlePokemon.stats.length - 1 ? ", " : ""
            }`}</span>
          ))}
        </div>
        <div>
          <span className="font-bold mr-2">Abilities:</span>
          {singlePokemon.abilities.map((ability, index: number) => (
            <span key={ability.slot}>
              {ability.ability.name}
              {index < singlePokemon.abilities.length - 1 && ", "}
            </span>
          ))}
        </div>
        <div>
          <span className="font-bold mr-2">Some Moves:</span>
          {singlePokemon.moves.slice(0, 5).map((move, index) => (
            <span key={move.move.name}>
              {move.move.name}
              {index < 4 && ", "}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
