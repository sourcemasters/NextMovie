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
        
        let that = this;
        axios.get(`http://api.themoviedb.org/3/search/movie?api_key=d3d327f7f687384a8074b41ead81a040&query=${that.movies}`)
        .then((response) => {
;         if (response.data.total_results === 0) console.log('Movie not found');
          let tmdbID = response.data.results[0].id; // get id of first search result

          axios.get(`https://api.themoviedb.org/3/movie/${tmdbID}?api_key=d3d327f7f687384a8074b41ead81a040`).then(response => {
            let output = response.data;
            let url = 'http://localhost:4000/api/add';
            console.log(output.title);
            let param = {
              name: output.title,
              watched: 0,
              runtime: output.runtime,
              poster: output.poster_path,
              synopsis: output.overview,
              tmdbscore: output.vote_average,
              releasedate: output.release_date,
              language: output.spoken_languages,
              status: output.status
            };
            axios.post(url, param).then((response) => {
              console.log(response);
              that.clearMovies();
              that.refreshMovies();
              that.typing = false;
            }).catch((error) => {
              console.log(error);
            });
          }).catch((error) => { return console.log('Unable to process movie details');});
        }).catch(error => {return console.log('Movie not found');});    
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