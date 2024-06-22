import { useEffect, useState } from 'react';
import { getAllPokemon, getPokemon } from './utils/pokemon';
import './App.css'
import Card from './components/Card/Card';
import { Navbar } from './components/Navbar/Navbar';

function App() {
  const initialURL = "https://pokeapi.co/api/v2/pokemon";
  const [loading, setLoding] = useState(true);
  const [pokemonData, setPokemonData] = useState([]);
  const [nextURL, setNextURL] = useState("");

  useEffect(() => {
    const fetchPokemonData = async () => {
      let res = await getAllPokemon(initialURL);
      // 20体それぞれのポケモンのデータを取得するメソッドを発火
      loadPokemon(res.results);
      // 次の20体のポケモンのURLを格納
      setNextURL(res.next);
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

  const handleNextPage = async () => {
    setLoding(true);

    let res = await getAllPokemon(nextURL);
    loadPokemon(res.results);
    // 次の20体へのURLを保存
    setNextURL(res.next);
    setLoding(false);
  };
  const handlePrevPage = () => {};

  return (
    <>
      <Navbar />
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
            <div className="btn">
              <button onClick={handlePrevPage}>前へ</button>
              <button onClick={handleNextPage}>次へ</button>
            </div>
          </>
        )}
      </div>
    </>
  );
}

export default App
