//event bus
window.Event = new Vue();

let app = new Vue({
    el: '#app',
    // components creates a reference so the component can be accessed from outside
    components: { 'shopping-cart': shoppingCart},
    data: {
        appName: "POSTER SPACE",
        allPosters: '',
    },
    methods:{
        fetchPosters:function(){
            //I couldn't figure out how to connect AJAX to QueryBuilder.php
            axios.post('/core/action.php', { 
                action:'fetchposters'
            }).then(function(response){
                this.allPosters = response.data;
                //emit posters to event bus, visible to all components
                Event.$emit('postersLoaded', this.allPosters);
            });
        }
    },
    mounted() {
        this.fetchPosters();
    },
    created() {
        Event.$on('logout', function() {
            //delete cookie by changing the expire date
            document.cookie = "user=John Doe; expires=Thu, 01 Jan 1970 00:00:01 GMT";
        }.bind(this));
    }
})
Vue.config.devtools = true
Vue.config.productionTip = false