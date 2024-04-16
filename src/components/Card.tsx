import React from 'react'

export default function Card({ pokemonImage, pokemonName }: { pokemonImage: string; pokemonName: string }) {
  return (
    <div className="avatar bg-primary rounded-full">
      {pokemonImage && pokemonName ? <img src={pokemonImage} alt={pokemonName} /> : <div className="skeleton h-16 w-16 rounded-full"></div>}
    </div>
  )
}
