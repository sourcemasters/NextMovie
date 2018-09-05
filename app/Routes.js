'use strict'

const express = require('express');

const movieRoutes = express.Router();

const Nextmovie = require('./Nextmovie');

// get all movies in the db

movieRoutes.route('/all').get(function (req, res, next) {
  Nextmovie.find(function (err, movies) {
    if (err) {
      return next(new Error(err));
    }

    res.json(movies); // return all movies
  });
});

// create a film item
movieRoutes.route('/add').post(function (req, res) {
  Nextmovie.create(
    {
      name: req.body.name,
      watched: false
    },
    function (error, movie) {
      if (error) {
        res.status(400).send('Unable to create movie list');
      }
      res.status(200).json(movie);
    });
});

// delete a movie item

movieRoutes.route('/delete/:id').get(function (req, res, next) {
  var id = req.params.id;
  Nextmovie.findByIdAndRemove(id, function (err, movie) {
    if (err) {
      return next(new Error('Movie was not found'));
    }
    res.json('Successfully removed');
  });
});

// perform update on movie item

movieRoutes.route('/update/:id').post(function (req, res, next) {
  var id = req.params.id;
  Nextmovie.findById(id, function (error, movie) {
    if (error) {
      return next(new Error('Movie was not found'));
    } else {
      movie.name = req.body.name;
      movie.watched = req.body.watched;

      movie.save({
        function (error, movie) {
          if (error) {
            res.status(400).send('Unable to update movie');
          } else {
            res.status(200).json(movie);
          }
        }
      });
    }
  });
});

module.exports = movieRoutes;