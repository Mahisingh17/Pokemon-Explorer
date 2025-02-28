import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

export default function Home({ pokemons }) {
    const [search, setSearch] = useState("");

    const filteredPokemons = pokemons.filter((pokemon) =>
        pokemon.name.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center p-6">
            <h1 className="text-4xl font-bold mb-6">Pokémon Explorer</h1>

            {/* Search Bar */}
            <input
                type="text"
                placeholder="Search Pokémon..."
                className="mb-6 p-2 text-black rounded-lg w-80"
                onChange={(e) => setSearch(e.target.value)}
            />

            {/* Pokémon List */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
                {filteredPokemons.map((pokemon, index) => (
                    <Link key={index} href={`/pokemon/${index + 1}`} passHref>
                        <div className="bg-gray-800 p-4 rounded-lg shadow-lg hover:scale-105 transform transition cursor-pointer">
                            <Image
                                src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${index + 1}.png`}
                                alt={pokemon.name}
                                width={100}
                                height={100}
                                className="mx-auto"
                            />
                            <h2 className="text-center text-lg font-semibold mt-2 capitalize">{pokemon.name}</h2>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}

export async function getStaticProps() {
    try {
        const response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=50");
        const data = await response.json();

        return {
            props: { pokemons: data.results },
        };
    } catch (error) {
        console.error("Failed to fetch Pokémon:", error);
        return { props: { pokemons: [] } };
    }
}
