"use client";
import { DropdownComponentProps } from "@/types";
import { ChangeEvent } from "react";

export default function DropdownComponent({
  selectedType,
  pokemonTypes,
  handleTypeSearch,
}: DropdownComponentProps) {
  const handleSelectedType = (e: ChangeEvent<HTMLSelectElement>) =>
    handleTypeSearch(e.target.value);

  return (
    <div className="text-xs md:text-base w-full max-w-xs">
      <select
        className="w-full bg-white p-2 rounded-sm focus:border-red-400 focus:ring-2 focus:ring-red-400 outline-none transition"
        value={selectedType}
        onChange={handleSelectedType}
      >
        <option value="all">All</option>
        {pokemonTypes.length > 0 &&
          pokemonTypes.map((type) => (
            <option key={type.name} className="">
              {type.name.charAt(0).toUpperCase() + type.name.slice(1)}
            </option>
          ))}
      </select>
    </div>
  );
}
