import { useState, useEffect } from 'react';
import './App.css';

const url =
  'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon';

function App() {
  const [openCards, setOpenCards] = useState([]);
  const [matched, setMatched] = useState([]);

  const pokemons = [
    { id: 1, name: 'balbasaur' },
    { id: 8, name: 'wartotle' },
    { id: 9, name: 'blastoise' },
    { id: 6, name: 'charizard' },
  ];

  const pokemonPairs = [...pokemons, ...pokemons];

  const handleFlip = (index) => {
    setOpenCards((opened) => [...opened, index]);
  };

  useEffect(() => {
    const firstMatch = pokemonPairs[openCards[0]];
    const secondMatch = pokemonPairs[openCards[1]];

    if (secondMatch && secondMatch.id === firstMatch.id) {
      setMatched((matched) => [...matched, firstMatch.id]);
    }

    if (openCards.length === 2) setTimeout(() => setOpenCards([]), 500);
  }, [openCards]);

  console.log({ matched });

  return (
    <div className='App'>
      <div className='cards'>
        {pokemonPairs.map((pokemon, index) => {
          let flipped = false;

          if (openCards.includes(index)) flipped = true;
          if (matched.includes(pokemon.id)) flipped = true;

          return (
            <div
              className={`pokemon-card ${flipped ? 'flipped' : ''}`}
              key={index}
              onClick={() => handleFlip(index)}
            >
              <div className='inner'>
                <div className='front'>
                  <img
                    src={`${url}/${pokemon.id}.png`}
                    alt='pokemon'
                    width='100'
                  />
                </div>
                <div className='back'></div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;
