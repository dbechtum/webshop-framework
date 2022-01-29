Vue.component('product-list', {
    template: `
    <div class="container pt-3">
        <div class="row row-cols-1 row-cols-sm-3 row-cols-md-4 row-cols-lg-5 g-3">
            <product v-for="poster in posters" :poster="poster" :key="poster.id"></product>
        </div> 
    </div>   
    `,
    data() {
        return {
            posters: '',
        }
    },
    created() {
        //event from app.js that loads all posters
        Event.$on('postersLoaded', function(posterdata) {
            this.posters = posterdata;       
        }.bind(this));
    }
})