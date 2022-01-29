Vue.component('categories', {
    template: `
    <header id="header">
            <nav class="navbar navbar-expand-md navbar-light bg-light pt-0 back">
                <div class="container border-bottom ">
                    <button class="navbar-toggler" type="button" data-bs-toggle="collapse"
                        data-bs-target="#navbarCatNavDropdown"
                        aria-controls="navbarCatNavDropdown" aria-expanded="false"
                        aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse col-12 col-md-auto mb-2 justify-content-center mb-md-0"
                        id="navbarCatNavDropdown">
                        <ul id="browsePopulateCategories"
                            class="navbar-nav container align-items-md-center">

                            <category v-for="(category, index) in categories" :category="category" :key="index"></category>

                        </ul>
                    </div>
                </div>
            </nav>
        </header>  
    `,
    data(){
        return {
            posters: '',
        }
    },
    computed: {
        //create list of categories from posters
        categories(){ 
            let catList = [];
            let i = 0;
            for (poster in this.posters){
                let cat = this.posters[i].category;
                if(cat) {
                    catList.push(cat);
                }
                i++
            }
            //return unique entries in catList as a new array
            let finalCatList = [...new Set(catList)];
            return finalCatList;
        }
    },
    created() {
        //event from app.js that loads all posters
        Event.$on('postersLoaded', function(posterdata) {
            this.posters = posterdata;       
        }.bind(this));
    }
})