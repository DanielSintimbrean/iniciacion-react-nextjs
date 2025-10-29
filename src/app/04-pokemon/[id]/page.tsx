import Link from "next/link";
import { notFound } from "next/navigation";

async function getPokemon(id: string) {
  const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
  if (!res.ok) return null;
  return res.json() as Promise<{
    name: string;
    sprites: { front_default: string };
  }>;
}

export default async function PokemonDetail({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const pokemon = await getPokemon(id);

  if (!pokemon) {
    notFound();
  }

  return (
    <div className="flex min-h-screen justify-center bg-zinc-50 font-sans">
      <main className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-center bg-white">
        <div className="mb-4 w-lg text-left">
          <Link href="/04-pokemon">Volver</Link>
        </div>
        <h1 className="mb-8 text-center text-4xl font-bold text-gray-800">
          {pokemon.name}
        </h1>
        <img className="size-64" src={pokemon.sprites.front_default} />
      </main>
    </div>
  );
}
