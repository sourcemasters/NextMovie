<template>
    <div id="app">
        <div class="container">
            <div class="row col-md-6 offset-md-3">
                <add-movie></add-movie>
                <list-movies></list-movies>
            </div>
        </div>
    </div>    
</template>

<script>
    import AddMovie from './AddMovie.vue';
    import ListMovies from './ListMovies.vue';
    export default {
        name: 'app',
        data() {
            return {}
        },
        components: {AddMovie, ListMovies},
    }
</script>

<style>
    .fade-enter-active,
    .fade-leave-active {
        transition: opacity .5s
    }
    .fade-enter,
    .fade-leave-active {
        opacity: 0
    }
</style>
