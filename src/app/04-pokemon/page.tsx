"use client";

import Link from "next/link";
import { useState } from "react";

export default function PokemonList() {
  const [pokemonId, setPokemonId] = useState(1);

  return (
    <div className="flex min-h-screen justify-center bg-zinc-50 font-sans">
      <main className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-center bg-white">
        <h1 className="mb-8 text-center text-4xl font-bold text-gray-800">
          Buscar Pokemon
        </h1>
        <input
          type="number"
          className="mb-4 rounded border px-2 py-1"
          value={pokemonId}
          onChange={(e) => setPokemonId(Number(e.target.value))}
        />
        <Link href={`/04-pokemon/${pokemonId}`}>Buscar</Link>
      </main>
    </div>
  );
}
