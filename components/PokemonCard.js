import Image from "next/image";
import Link from "next/link";

export default function PokemonCard({ name, index }) {
    return (
        <Link href={`/pokemon/${index}`} passHref>
            <div className="bg-gray-800 p-4 rounded-lg shadow-lg hover:scale-105 transform transition cursor-pointer">
                <Image
                    src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${index}.png`}
                    alt={name}
                    width={100}
                    height={100}
                    className="mx-auto"
                />
                <h2 className="text-center text-lg font-semibold mt-2 capitalize">{name}</h2>
            </div>
        </Link>
    );
}
