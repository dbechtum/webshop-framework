Vue.component('category', {
    props: ["category"],
    template: `
    <div>
        <li class="nav-item">
            <a :id="category" class="nav-link category pt-0 pb-1" :class="{ active: isActive }" :category="category" @click="setCategory(category)">{{ category }}</a>
        </li>
    </div>
    `,
    data() {
        return {
            isActive: false
        }
    },
    methods: {
        setCategory: function(category){
            localStorage.setItem('selectedCategory', category);
            //emit to all instances of category.js and product.js through event bus, that the selected category was updated
            Event.$emit('categoryUpdated', category);
        },
    },
    created() {
        Event.$on('categoryUpdated', function(category) {
            //set active if received category = self
            this.isActive = (category === this.category);         
        }.bind(this));
        //event from app.js that loads all posters
        Event.$on('postersLoaded', function(posterdata) {
            this.posters = posterdata;       
            console.log(this.posters);  
        }.bind(this));
    },
    mounted() {
        let category = localStorage.getItem('selectedCategory');
        this.isActive = (category === this.category); 
    }
})