import Image from "next/image";

export default function PokemonDetail({ pokemon }) {
    return (
        <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center p-6">
            <h1 className="text-4xl font-bold mb-4 capitalize">{pokemon.name}</h1>
            <Image
                src={pokemon.sprites.front_default}
                alt={pokemon.name}
                width={200}
                height={200}
            />

            <div className="bg-gray-800 p-4 rounded-lg shadow-lg mt-4 w-80">
                <h2 className="text-xl font-semibold">Abilities</h2>
                <ul className="list-disc list-inside">
                    {pokemon.abilities.map((a, i) => (
                        <li key={i} className="capitalize">{a.ability.name}</li>
                    ))}
                </ul>
                <h2 className="text-xl font-semibold mt-4">Type</h2>
                <p className="capitalize">{pokemon.types.map(t => t.type.name).join(", ")}</p>
                <h2 className="text-xl font-semibold mt-4">Stats</h2>
                <ul>
                    {pokemon.stats.map((s, i) => (
                        <li key={i}>{s.stat.name}: {s.base_stat}</li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export async function getStaticPaths() {
    const response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=50");
    const data = await response.json();

    const paths = data.results.map((_, index) => ({
        params: { id: String(index + 1) },
    }));

    return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${params.id}`);
    const pokemon = await response.json();

    return { props: { pokemon } };
}
