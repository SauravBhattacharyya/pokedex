import { Pokemon } from "@/types";
import { faArrowRightLong } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import Link from "next/link";
import styles from "./styles.module.scss";

export default function PokemonCard({ pokemon }: { pokemon: Pokemon }) {
  return (
    <div className="bg-gray-100 rounded-md text-sm md:text-base mt-5">
      <div
        className={`${styles.pokemonImage} flex items-center justify-center bg-white rounded-t-md`}
      >
        <Image
          width={96}
          height={96}
          src={pokemon.sprites.front_default || "/assets/images/poke-ball.png"}
          alt={pokemon.name}
          className="w-full h-full"
        />
      </div>
      <div className="py-5">
        <p className="font-bold capitalize pl-3">{pokemon.name}</p>
        <div className="pl-3 text-cyan-700  mt-6">
          <Link className="cursor-pointer" href={`pokemon/${pokemon.id}`}>
            Details
            <FontAwesomeIcon className="ml-2" icon={faArrowRightLong} />
          </Link>
        </div>
      </div>
    </div>
  );
}
