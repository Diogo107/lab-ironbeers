const express = require('express');
const hbs = require('hbs');
const path = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');

const app = express();
const punkAPI = new PunkAPIWrapper();

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));

// add the partials here:
hbs.registerPartials(__dirname + '/views/partials');
// add the routes here:
app.get('/', (req, res) => res.render('index'));

app.get('/beers', (req, res) => {
  punkAPI
    .getBeers()
    .then(beersFromApi => {
      console.log('Beers from the database: ', beersFromApi);
      res.render('beers', { beersFromApi });
      //beers = beersFromApi;
    })
    .catch(error => console.log(error));
  //console.log(beers);
});

app.get('/random-beer', (req, res) => {
  punkAPI
    .getRandom()
    .then(beersFromApi => {
      console.log('Beers from the database: ', beersFromApi);
      res.render('random-beer', { beersFromApi });
      //beers = beersFromApi;
    })
    .catch(error => console.log(error));
  //console.log(beers);
});
/*
  for (let i = 0; i < 25; i++) {
    let beer = punkAPI
      .getBeers(i)
      .then(beersFromApi =>
        console.log('Beers from the database: ', beersFromApi)
      )
      .catch(error => console.log(error));

    //var beer = punkAPI.getBeers(i);
    beers.push(beer);
  }
  console.log(beers);
  res.render('beers', beers);
  */

app.get('/:name', (req, res) => {
  const name = req.params.name;
  const single = punkAPI.getBeers(name);
  res.render('beer', { single });
});

app.listen(3000, () => console.log('🏃‍ on port 3000'));
