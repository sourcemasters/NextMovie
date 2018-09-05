const mongoose = require('mongoose');

// Define collection and schema for todo item

var movielist = new mongoose.Schema({
  name: {
    type: String
  },

  done: {
    type: Boolean
  }
},

  {
    collection: 'movies'
  });

module.exports = mongoose.model('Movielist', movielist);