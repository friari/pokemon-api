const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const fetch = require('node-fetch');


let pokemonAll = [];

fetch(
  'https://pokeapi.co/api/v2/pokemon?limit=100',
  { method: 'GET' }
)
.then(response => response.json())
.then(json => {
  json.results.forEach((result, i) => {
    pokemonAll.push({ id: (i+1), name: result.name });
  });
})
.catch(e => console.log(e));

app.get('/pokemon', (req, res) => {
  let result = [{
    "count": pokemonAll.length,
    "results": pokemonAll
  }]

  res.send(result);
});

app.get('/pokemon/:id', (req, res) => {
  const pokemon = pokemonAll.find(p => p.id === parseInt(req.params.id));
  if (!pokemon) res.status(404);
  res.send(pokemon);
});

app.listen(port, () => console.log(`listening on port ${port}`));