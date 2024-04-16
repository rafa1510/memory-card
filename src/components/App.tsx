import React from 'react'
import { useState, useEffect } from 'react'
import Navbar from './Navbar'
import Card from './Card'

interface Pokemon {
  image: string
  name: string
}

export default function App() {
  const [pokemons, setPokemons] = useState(Array<Pokemon>)
  const [score, setScore] = useState(0)
  const [highScore, setHighScore] = useState(0)

  const [clickedIndexes, setClickedIndexes] = useState(new Set<number>([]))

  function handleTurn(index: number) {
    if (clickedIndexes.has(index)) {
      if (clickedIndexes.size > highScore) {
        setHighScore(clickedIndexes.size)
      }
      setScore(0)
      setClickedIndexes(new Set([]))
    } else {
      const currentClickedIndexes = clickedIndexes
      currentClickedIndexes.add(index)
      setClickedIndexes(currentClickedIndexes)
      setScore(score + 1)
    }
  }

  useEffect(() => {
    async function fetchPokemons() {
      const pokemonNames = [
        'ditto',
        'pikachu',
        'charmander',
        'squirtle',
        'lucario',
        'greninja',
        'bulbasaur',
        'rayquaza',
        'mewtwo',
        'gyarados',
      ]

      try {
        const pokemonsData = await Promise.all(
          pokemonNames.map(async (name) => {
            const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`)
            const pokemonObject = await response.json()
            return {
              image: pokemonObject.sprites.front_default,
              name: pokemonObject.species.name,
            }
          })
        )
        setPokemons(pokemonsData)
      } catch (error) {
        console.error('Failed to fetch Pokemons: ', error)
      }
    }

    fetchPokemons().catch((error) => {
      console.error('Error fetching data: ', error)
    })
  }, [])

  return (
    <div>
      <Navbar score={score} highScore={highScore} />
      {pokemons.map((pokemon, index) => (
        <Card key={index} pokemonImage={pokemon.image} pokemonName={pokemon.name} index={index} handleClick={handleTurn} />
      ))}
    </div>
  )
}
