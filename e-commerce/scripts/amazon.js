import {myCart} from '../data/cart.js'
let productsHTML = '';

products.forEach((product) => {
  productsHTML += ` 
    <div class="product-container">
      <div class="product-image-container">
        <img class="product-image"
          src="${product.image}">
      </div>

      <div class="product-name limit-text-to-2-lines">
        ${product.name}
      </div>

      <div class="product-rating-container">
        <img class="product-rating-stars"
          src="images/ratings/rating-${product.rating.stars * 10}.png">
        <div class="product-rating-count link-primary">
          ${product.rating.count}
        </div>
      </div>

      <div class="product-price">
        $${(product.priceCents / 100).toFixed(2)}
      </div>

      <div class="product-quantity-container">
        <select class="js-quantity-selector">
          <option selected value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
          <option value="6">6</option>
          <option value="7">7</option>
          <option value="8">8</option>
          <option value="9">9</option>
          <option value="10">10</option>
        </select>
      </div>

      <div class="product-spacer"></div>

      <div class="added-to-cart">
        <img src="images/icons/checkmark.png">
        Added
      </div>

      <button class="add-to-cart-button button-primary" data-product-id="${product.id}" data-product-image="${product.image}">
        Add to Cart
      </button>
    </div>`;
});



document.querySelector('.products-grid-js').innerHTML = productsHTML;



const js_addtocart = document.querySelectorAll('.add-to-cart-button');
// função para adicionar a funcionalidade de adicionar ao carrinho
js_addtocart.forEach((button) => {
  button.addEventListener('click', () => {
    const productId = button.dataset.productId;
    const productContainer = button.parentElement;
    const quantity = parseInt(productContainer.querySelector('select').value);
    myCart.push( {
      product: productId,
      quantity: quantity
    });

    cartQuantityUpdate();
    calculateCart();
  });
})
let cartQuantity = 0;

function cartQuantityUpdate() {
  cartQuantity = 0;
  myCart.forEach((item) => {
      cartQuantity += item.quantity;
    }
    
  )
    let cartQuantityNumber = document.querySelector('.cart-quantity');
    cartQuantityNumber.innerHTML = cartQuantity;


} 
function calculateCart() {
  let totalPrice = 0;
  for (let i = 0; i < myCart.length; i++) {
    let price = 0;
    price += ((myCart[i].quantity) * products.find(product => product.id === myCart[i].product).priceCents);
    totalPrice += price;
    price = 0;
  }
  return totalPrice;
}

