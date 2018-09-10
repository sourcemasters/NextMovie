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