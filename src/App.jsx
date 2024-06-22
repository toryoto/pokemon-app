import { useEffect, useState } from 'react';
import { getAllPokemon, getPokemon } from './utils/pokemon';
import './App.css'
import Card from './components/Card/Card';

function App() {
  const initialURL = "https://pokeapi.co/api/v2/pokemon";
  const [loading, setLoding] = useState(true);
  const [pokemonData, setPokemonData] = useState([]);

  useEffect(() => {
    const fetchPokemonData = async () => {
      let res = await getAllPokemon(initialURL);
      loadPokemon(res.results)
      setLoding(false);
    };
    fetchPokemonData();
  }, [])

  const loadPokemon = async (data) => {
    // Promise.allは複数の非同期処理を並行して実行して、すべての結果を待つ
    let _pokemonData = await Promise.all(
      data.map(async (pokemon) => {
        // それぞれのポケモンの詳細（画像・タイプなど）を取得する
        let pokemonRecord = await getPokemon(pokemon.url);
        return pokemonRecord;
      })
    )
    setPokemonData(_pokemonData);
  };

  console.log(pokemonData);

  return (
    <div className='App'>
      {loading ? (
        <h1>ロード中・・・</h1>
      ) : (
        <>
          <div className="pokemonCardContainer">
            {pokemonData.map((pokemon, i) => {
              return <Card key={i} pokemon={pokemon} />;
            })}
          </div>
        </>
      )}
    </div>
  );
}

export default App
