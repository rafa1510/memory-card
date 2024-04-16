import React from 'react'

export default function Card({
  pokemonImage,
  pokemonName,
  index,
  handleClick,
}: {
  pokemonImage: string
  pokemonName: string
  index: number
  handleClick: Function
}) {
  return (
    <button className="avatar bg-primary rounded-full hover:bg-secondary" onClick={() => handleClick(index)}>
      {pokemonImage && pokemonName ? <img src={pokemonImage} alt={pokemonName} /> : <div className="skeleton h-16 w-16 rounded-full"></div>}
    </button>
  )
}
