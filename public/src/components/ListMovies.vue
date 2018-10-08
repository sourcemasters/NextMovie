<template>
    <div>
        <div class="col-md-12" v-show="movies.filter((film) => {return !film.watched;}).length>0">
            <h3>Movies to Watch</h3>
            <div class="row mrb-10" id="movie-row" v-for="movie in movies.filter((film) => {return !film.watched;})">
                <!-- Improve the styling here later: the film stats should float left of the poster -->
                <div class="poster-holder">
                    <img class="poster-self" :src="movie.poster">
                </div>
                <div padding="2em">
                    <h4>{{movie.name}}</h4>
                    <p>
                        <br>Runtime: {{movie.runtime}} minutes
                        <br>TMDB Score: {{movie.tmdbscore}}
                        <br>Release Date: {{movie.releasedate.substring(0, 10)}}
                        <br>Languages: {{movie.language}}
                    </p>
                </div>
                <p>{{movie.synopsis.substring(0, 250)}}...</p>
                <div>
                    <span class="input-group-prepend" margin="0.5rem"><input type="checkbox" v-model="movie.watched" :checked="movie.watched" :value="movie.watched" v-on:change="updateMovie(movie)" title="Mark as watched?"/>&nbsp;&nbsp;Watched?</span>
                    <span margin="1em" class="input-group-append" id="movie-entryinput" title="Delete movie?" v-on:click="deleteMovie(movie._id)">Remove</span>
                </div>
            </div>
        </div>
        <div class="row alert alert-info text-center" v-show="movies.filter((film) => {return !film.watched;}).length==0">
            <p class="alert alert-info">
              <strong>No Movies Yet</strong>
            <br/>
            You haven't planned any movies. Try adding some!</p>
        </div>

        <hr/>

        <div class="col-md-12" v-show="movies.filter((film) => {return film.watched;}).length>0">
            <h3>Watched Movies</h3>
            <div class="row mrb-10" v-for="movie in movies.filter((film) => {return film.watched;})">
                 <div class="input-group m-b-5">
                     <input type="text" class="form-control" :class="movie.watched?'movies__watched':''" v-model="movie.name" @keypress="movie.editing=true" @keyup.enter="updateMovie(movie)">
                     <span class="input-group-append" title="Delete movie?" v-on:click="deleteMovie(movie._id)">X</span>
                </div>
            </div>
        </div>
            <div class="row alert alert-secondary text-center" v-show="movies.filter((film) => {return film.watched;}).length==0">
                <p class="alert alert-secondary">
                    <strong>No Movies Watched</strong>
                    <br/>
                    You have not watched any movies yet. <a href="http://netflix.com">Get started!</a></p>
            </div>
    </div>
</template>

<script>
    import axios from 'axios';
    import bus from './../bus.js'

    export default {
        data() {
            return {
                movies: []
            }
        },
        created: function() { // get movie items and start listening to events once component is created
            this.fetchMovies();
            this.listenToEvents();
        },
        methods: {
            fetchMovies() {
                let uri = 'http://localhost:4000/api/all';
                axios.get(uri).then((response) => {
                    this.movies = response.data;
                });
            },
            updateMovie(movie) {
                let id = movie._id;
                let uri = 'http://localhost:4000/api/update/' + id;
                movie.editing = false;
                axios.post(uri, movie).then((response) => {
                    console.log(response);
                }).catch((error) => {
                    console.log(error);
                })
            },
            deleteMovie(id) { //delete movie item
                let uri = 'http://localhost:4000/api/delete/' + id;
                axios.get(uri);
                this.fetchMovies();
            },
            listenToEvents() {
                bus.$on('refreshMovies', ($event) => {
                    this.fetchMovies(); // referesh or update movie list on the page
                })
            }
        }
    }
</script>
<style scoped>
    .delete__icon {
        background-color: #ee22aa;
    }
    .movies__watched {
        text-decoration: line-through !important
    }
    .no_border_left_right {
        border-left: 0px;
        border-right: 0px;
    }
    .flat_form {
        border-radius: 0px;
    }
    .mrb-10 {
        margin-bottom: 10px;
    }
    .addon-left {
        background-color: none !important;
        border-left: 0px !important;
        cursor: pointer !important;
    }
    .addon-right {
        background-color: none !important;
        border-right: 0px !important;
    }
    .poster-holder {
        float: left;
    }
    .poster-self {
        border: solid black 1px;
    }
    #movie-row {
        width: 110%;
        padding: 0.5em;
        border: 2px solid grey;
        margin: 0.5em;
    }
    #movie-entryinput {
        margin: 0.5em;
        color: aqua;
    }
    #movie-entryinput:hover {
        color: orange;
    }

</style>