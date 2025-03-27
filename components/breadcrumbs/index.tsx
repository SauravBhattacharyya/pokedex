import { faArrowRightLong } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";

type BreadcrumbsProps = {
  pokemonName?: string;
};

export default function Breadcrumbs({ pokemonName }: BreadcrumbsProps) {
  return (
    <nav className="text-cyan-700 flex items-center capitalize font-semibold">
      <Link href="/" className="cursor-pointer">
        Home
      </Link>
      {pokemonName && (
        <>
          <FontAwesomeIcon icon={faArrowRightLong} className="mx-2" />
          <p>{pokemonName}</p>
        </>
      )}
    </nav>
  );
}
