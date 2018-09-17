<template>
  <div>
    <h2>Create Your Movie List</h2>
    <form @submit.prevent>
      <div class="form-group">
        <input type="text" class="form-control" @keypress="typing=true" placeholder="What do you want to watch?" v-model="movies" @keyup.enter="addMovie($event)">
        <span class="help-block small text-center" v-show="typing">Hit enter to save</span>
      </div>
    </form>
  </div>
</template>

<script>
  import axios from 'axios';  
  import bus from "./../bus.js";

  export default {
    data() {
      return {
        movies: '',
        typing: false,
      }
    },
    methods: {
      addMovie(event) {
        if (event) event.preventDefault();

      request(`http://api.themoviedb.org/3/search/movie?api_key=${tkey}&query=${req.body.name}`, function(error, response, body) {
        if (error || JSON.parse(body).total_results === 0) return res.status(404).send('Movie not found');
        IdHolder.tmdbID = JSON.parse(body).results[0].id;
        console.log(tkey);

        request(`https://api.themoviedb.org/3/movie/${IdHolder.tmdbID}?api_key=${tkey}`, (error, response, body) => {
          if (error) return res.status(400).send('Unable to process movie details');
          IdHolder.output = JSON.parse(body);
      });
    });

        let url = 'http://localhost:4000/api/add';
        let param = {
          name: this.movies,
          watched: 0
      };
        axios.post(url, param).then((response) => {
          console.log(response);
          this.clearMovies();
          this.refreshMovies();
          this.typing = false;
        }).catch((error) => {
          console.log(error);
        })
      },
      clearMovies() {
        this.movies = '';
      },
      refreshMovies() {
        bus.$emit("refreshMovies")
      }
    }
  }
</script>