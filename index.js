const express = require('express');
const axios = require('axios'); 
const ejsLayouts = require('express-ejs-layouts');

const app = express();
const port = process.env.PORT || 3000;

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: false }));
app.use(ejsLayouts);

// GET / - main index of site
app.get('/', (req, res) => {
  let pokemonUrl = 'http://pokeapi.co/api/v2/pokemon/';
  // Use request to call the API
  axios.get(pokemonUrl).then(apiResponse => {
    let pokemon = apiResponse.data.results;
    res.render('index', { pokemon: pokemon.slice(0, 151) });
  })
});

//GET 
// app.get('/views/pokemon/index', (req, res)=>{
//   res.send('pokemon')
// })
app.get("/", async (req, res) => {
  try {
    let data = await axios.get(
      `https://pokeapi.co/api/v2/pokemon/?limit=8&&offset=${getRandomInt(1145)}`
    );
    let pokemon = await data.data.results;

    res.render("index", {
      pokemon: await pokemon,
    });
  } catch (error) {
    // console.error(error);
  }
});

// Imports all routes from the pokemon routes file
app.use('/pokemon', require('./routes/pokemon'));

app.listen(port, () => {
  console.log('...listening on', port );
});