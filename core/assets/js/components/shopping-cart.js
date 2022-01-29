let shoppingCart = Vue.component('shopping-cart', {
    template: `
    <div>
        <div class="cart shadow">
            <div class="cartCloseButton" @click="hideCart()" style="cursor: pointer;">
                <p>&#10005;</p>
            </div>
            <li v-for="(content, index) in cartContent">
                <div v-if="content.title!='Subscription'" is="shopping-item"
                    v-bind:key="index" v-bind:index="index"
                    v-bind:title="content.title"
                    v-bind:id="content.id"
                    v-bind:stock="content.stock"
                    v-bind:orientation="content.orientation"
                    v-bind:size="content.size"
                    v-bind:amount="content.amount">
                </div>
                <div v-else>
                    <p>put subscriptions component here</p>
                </div>
            </li>
            <p v-show="cart_total_price.toFixed(2)>0">{{"Total: $" + cart_total_price.toFixed(2)}}</p>
            <p v-show="cart_total_price.toFixed(2)<=0">Cart is empty...</p>
            <p class="totalDiscount" v-show="cart_total_discount>0">{{"You saved $" + cart_total_discount.toFixed(2)}}
            </p>
        </div>
        <div class="cartBackground" @click="hideCart()"></div>
    </div>
    `,
    data() {
        return {
            cartContent: [],
            posters: posterdata,
        }
    },
    computed: {
        //calculate the total price of all the products in the cart, based on poster size and discount
        cart_total_price(){
            let total = 0;

            this.cartContent.forEach(el => {
                let poster = this.posters.find(poster => poster.id === el.id);
                if(poster.stock >= 200){
                    total += ((el.size != 'Small' ? el.size == 'Large' ? 15 : 10 : 5) * el.amount * 0.6);
                } else if (poster.stock>= 100){
                    total += ((el.size != 'Small' ? el.size == 'Large' ? 15 : 10 : 5) * el.amount * 0.8);
                } else {
                    total += ((el.size != 'Small' ? el.size == 'Large' ? 15 : 10 : 5) * el.amount);
                }
            });
            return total;
        },
        //calculate the total discount of all the products in the cast, based on poster size and discount
        cart_total_discount(){
            let total = 0;

            this.cartContent.forEach(el => {
                let poster = this.posters.find(poster => poster.id === el.id);
                if(poster.stock >= 200){
                    total += ((el.size != 'Small' ? el.size == 'Large' ? 15 : 10 : 5) * el.amount * 0.4);
                } else if (poster.stock>= 100){
                    total += ((el.size != 'Small' ? el.size == 'Large' ? 15 : 10 : 5) * el.amount * 0.2);
                }        
            });
            return total;
        }
    },
    methods: {
        showCart: function() {
            $('.cart').fadeIn();
            $('.cartBackground').fadeIn();
        },
        hideCart: function() {
            $('.cart').fadeOut();
            $('.cartBackground').fadeOut();
        },
        addToCart: function(poster, orientation, size) {
            //check if the cart item already exists by finding the index.
            let index = this.cartContent.findIndex(
                x => 
                x.title === poster.title &&
                x.id === poster.id &&
                x.stock === poster.stock &&
                x.orientation === orientation &&
                x.size === size);
            //if the index doesn't exist, add the item
            if(index === -1){
                this.cartContent.push({
                    title: poster.title,
                    id: poster.id,
                    stock: poster.stock,
                    orientation: orientation,
                    size: size,
                    amount: 1
                })
            //if the index does exist, increase the amount
            } else {
                this.cartContent[index].amount++;
            }
            this.updateCartHeader();
            this.saveCartContent();
        },
        removeItem: function(index){
            this.cartContent.splice(index,1);
            this.updateCartHeader();
            this.saveCartContent();
        },
        //add or reduce from the cart, (amount) can be negative and positive
        updateCartItem: function(index, amount) {
            this.cartContent[index].amount += amount;
            if(this.cartContent[index].amount === 0){
                this.removeItem(index);
            }
            this.updateCartHeader();
            this.saveCartContent();
        },
        //updates the indicator in the navbar that shows how many items are in the cart
        updateCartHeader: function(){
            let cartAmount = document.querySelector(".cartAmount");

            let itemCount = 0;
            for (let i = 0; i < this.cartContent.length; i++) {
                itemCount += this.cartContent[i].amount;
            }

            try{
                cartAmount.innerHTML = itemCount;
                if(itemCount === 0){
                    cartAmount.style.display = "none";
                } else {
                    cartAmount.style.display = "inline-block";
                }
            } catch (error) {
                console.log("Failed to load cart content indicator");
            }
        },
        saveCartContent: function(){
            localStorage.setItem('cartContent', JSON.stringify(this.cartContent));
        }
    },
    created() {
        Event.$on('showCart', function() {
            this.showCart();
        }.bind(this));
        Event.$on('addToCart', function(poster, orientation, size) {
            this.addToCart(poster, orientation, size);
        }.bind(this));
        Event.$on('updateCartItem', function(index, amount) {
            this.updateCartItem(index, amount);
        }.bind(this));
        Event.$on('removeItem', function(index) {
            this.removeItem(index);
        }.bind(this));
        //event from app.js that loads all posters
        Event.$on('postersLoaded', function(posterdata) {
            this.posters = posterdata;       
        }.bind(this));
    }
})