const mongoose = require('mongoose');

// Define collection and schema for todo item

var movielist = new mongoose.Schema({
  name: {
    type: String
  },

  watched: {
    type: Boolean
  },

  poster: {
    type: String
  },

  runtime: {
    type: Number
  },

  director: {
    type: String
  },

  synopsis: {
    type: String
  },

  tmdbscore: {
    type: Number
  },

  releasedate: {
    type: Date
  },

  language: {
    type: String
  },

  status: {
    type: String
  }
},

  {
    collection: 'movies'
  });

module.exports = mongoose.model('Movielist', movielist);