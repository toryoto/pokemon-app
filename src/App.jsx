import { useEffect } from 'react';
import { getAllPokemon } from './utils/pokemon';
import './App.css'

function App() {
  const initialURL = "https://pokeapi.co/api/v2/pokemon";

  useEffect(() => {
    const fetchPokemonData = async () => {
      let res = await getAllPokemon(initialURL);
      console.log(res)
    };
    fetchPokemonData();
  }, [])

  return <div className='App'></div>
}

export default App
