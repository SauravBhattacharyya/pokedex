"use client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { SearchComponentProps } from "@/types";
import { FormEvent } from "react";

export default function SearchComponent({
  handlePokemonSearch,
  handleSearchTextChange,
  searchVal,
}: SearchComponentProps) {
  const handleFormSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handlePokemonSearch();
  };
  return (
    <form
      className="relative flex items-center text-xs md:text-base mt-2 w-full max-w-md"
      onSubmit={handleFormSubmit}
    >
      <div className="absolute left-2 text-gray-400">
        <FontAwesomeIcon icon={faSearch} />
      </div>
      <input
        type="text"
        value={searchVal}
        onChange={handleSearchTextChange}
        placeholder="Search..."
        className="rounded-l-sm py-2 pl-7 flex-1 bg-white focus:border-red-400 focus:ring-2 focus:ring-red-400 outline-none transition"
      />
      <button
        type="submit"
        className="py-2 px-2 rounded-r-sm bg-sky-950 text-white cursor-pointer"
      >
        Search
      </button>
    </form>
  );
}
