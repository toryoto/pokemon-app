export const getAllPokemon = (url) => {
  return new Promise((resolve, reject) => {
    fetch(url)
      .then((res) => res.json())
      .then((data) => resolve(data))
      .catch((error) => {
        reject(`Failed to fetch data: ${error.message}`)
      });
  });
}

export const getPokemon = (url) => {
  return new Promise((resolve, reject) => {
    fetch(url)
      .then((res) => res.json())
      .then((data) => resolve(data))
      .catch((error) => {
        reject(`Failed to fetch data: ${error.message}`)
      });
  });
}