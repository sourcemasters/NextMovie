<template>
    <div>
        <div class="col-md-12" v-show="movies.length>0">
            <h3>Watched Movies</h3>
         <div class="row mrb-10" v-for="movie in movies">
             <div class="input-group m-b-5">
                 <span class="input-group-append" title="Delete movie?" v-on:click="deleteMovie(movie._id)">X</span>
             </div>
         </div>
        </div>
        <div class="row alert alert-secondary text-center" v-show="movies.length==0">
            <p class="alert alert-secondary">
                <strong>No Movies Yet</strong>
                <br/>
                You have not watched any movies yet. <a href="http://netflix.com">Get started!</a></p>
        </div>
    </div>
</template>

<script>
    import axios from 'axios';
    import bus from './../bus.js';

    export default {
        data() {
            return {
                movies: []
            }
        }    ,
        created: function() { // get movie items and start listening to events once component is created
            this.fetchMovies();
            this.listenToEvents();
        },
        methods: {
            fetchMovies() {
                let url = 'http://localhost:4000/api/all'
            }
        }
    }
</script>
>
