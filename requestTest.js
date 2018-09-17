const request = require('request');

const tkey = process.env.FILM_APIx; // api key for tmdb
  request(`https://api.themoviedb.org/3/movie/439079?api_key=${tkey}`, (error, response, body) => {
  	if (error || JSON.parse(body).total_results == 0) return console.log('Movie not found');

    console.log(JSON.parse(body).title);
  });