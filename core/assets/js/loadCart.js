////
//  Update the cart content indicator in the navbar, when loading the page
//  It tries it several times, in case the page is loaded slowly
////
let cart = app.$refs.cart;
let cartContent = JSON.parse(localStorage.getItem('cartContent'));
if(cartContent !== null){
    cart.cartContent = cartContent;
}
function delay(n){
    return new Promise(function(resolve){
        setTimeout(resolve,n*1000);
    });
}
async function updateCartHeaderOnLoad(){
    await delay(0.1);
    
    cart.updateCartHeader();

    await delay(1);
    
    cart.updateCartHeader();

    await delay(5);
    
    cart.updateCartHeader();
}

updateCartHeaderOnLoad();