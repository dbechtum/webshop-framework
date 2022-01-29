Vue.component('product-display', {
    template: `
    <div>
        <div class="product shadow">
            <div class="productContainer">
                <div class="productCloseButton" @click="hideProduct()"
                    style="cursor: pointer;">
                    <p>&#10005;</p>
                </div>
                <div class="product-image">
                    <div class="image">
                        <div v-if="megaDeal" class="sale">-40%</div>
                        <div v-else-if="deal" class="sale">-20%</div>
                        <img v-bind:src="image">
                    </div>
                </div>
                <div class="product-info">
                    <h1>{{ poster.category }} - {{ poster.title }}</h1>
                    <h2>{{ stock }}</h2>
                    <div>
                        <button class="orientationButton" type="button" v-for="(orientation, index) in orientations"
                            :key="index" @click='updateOrientation(index)'>
                            {{ orientation }}
                        </button>
                    </div>
                    <div>
                        <button class="sizeButton" type="button" v-for="(size, index) in sizes" :key="index"
                            @click='updateSize(index)'>
                            {{ size }}
                        </button>
                    </div>
                    <div class="price">Price:</div>
                    <div v-show="originalPrice!== 0" class="price"
                        style="text-decoration: line-through; color: gray;">
                        &#36;{{ originalPrice }},-</div>
                    <div class="price">&#36;{{ price }},-</div>
                    <button v-on:click="addToCart(poster, orientations[selectedOrientation], sizes[selectedSize])">Add to Cart
                    </button>
                </div>
            </div>
        </div>
        <div class="productBackground" @click="hideProduct()"></div>
    </div>
    `,
    data() {
        return {
            poster: posterdata[0],
            selectedOrientation: 0,
            orientations: ["Landscape", "Portrait"],
            selectedSize: 0,
            sizes: ["Large", "Medium", "Small"],
            productDiscount: 1,
        }
    },
    computed: {
        megaDeal(){
            return (this.poster.stock >= 200);
        },
        deal(){
            return (this.poster.stock >= 100);
        },
        image(){
            if(this.selectedOrientation === 0){
                return `/core/assets/images/posters/landscape/${this.poster.id}.jpg`;
            } else {
                return `/core/assets/images/posters/portrait/${this.poster.id}.jpg`;
            }
        },
        productTitle(){
            return 0;
        },
        stock(){
            //check the stock and set a discount multiplier accordingly
            if(this.poster.stock <= 0) {
                this.productDiscount = 1;
                return "Out of stock";
            } else if (this.poster.stock < 10) {
                this.productDiscount = 1;
                return "Almost out of stock";
            } else if (this.poster.stock < 100) {
                this.productDiscount = 1;
                return "In stock";
            } else if (this.poster.stock < 200) {
                this.productDiscount = 0.8;
                return "Discounted!";
            } else {
                this.productDiscount = 0.6;
                return "Mega Deal!";
            }
        },
        originalPrice(){
            //if there is a discount set the origal price, so it can be displayed next to the discounted price
            if(this.deal || this.megaDeal){
                switch (this.selectedSize) {
                    case 0:
                        return 15;
                    case 1:
                        return 10;
                    case 2:
                        return 5;
                    default:
                        return 0;
                }
            } else {
                return 0;
            }
        },
        price(){
            //calculate the discounted price
            switch (this.selectedSize){
                case 0:
                    return 15 *  this.productDiscount;
                    break;
                case 1:
                    return 10 * this.productDiscount;
                    break;
                case 2:
                    return 5 * this.productDiscount;
                    break;
            }
        },
    },
    methods: {
        showProduct: function() {
            this.updateOrientationButtons();
            this.updateSizeButtons();
            $('.product').fadeIn();
            $('.productBackground').fadeIn();
        },
        hideProduct: function() {
            $('.product').fadeOut();
            $('.productBackground').fadeOut();
        },
        updateOrientation: function(index) {
            this.selectedOrientation = index;
            this.updateOrientationButtons();
        },
        //loop through orientation buttons and set the current to 'selected'
        updateOrientationButtons: function() {
            let orientationButtons = document.querySelectorAll(".orientationButton");
            for(let i = 0; i < orientationButtons.length; i++) {
                orientationButtons[i].classList.remove("selected");
            }
            orientationButtons[this.selectedOrientation].classList.add("selected");
        },
        updateSize: function(index) {
            this.selectedSize = index;
            this.updateSizeButtons();
        },
        //loop through size buttons and set the current to 'selected'
        updateSizeButtons: function() {
            let sizeButtons = document.querySelectorAll(".sizeButton");
            for(let i = 0; i < sizeButtons.length; i++) {
                sizeButtons[i].classList.remove("selected");
            }
            sizeButtons[this.selectedSize].classList.add("selected");
        },
        //emit to the event bus (app.js) which item was added, the event bus is visible to all components
        addToCart: function(poster, orientation, size) {
            Event.$emit('addToCart', poster, orientation, size);
        }
    },
    created() {
        //emited from product.js when clicking on a product
        Event.$on('showProduct', function(poster) {
            this.poster = poster;
            this.showProduct();
        }.bind(this));
    }
})