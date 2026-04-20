import { products } from "./products.js";
export const myCart = [
  {
    productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
    quantity: 2,
  }, {
    productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
    quantity: 1,
  }
];

let cartQuantity = 0;

export function addToCart() {
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
      calculateCart(productId);
    });
  })
}




function cartQuantityUpdate() {
  cartQuantity = 0;
  myCart.forEach((cartItem) => {
      cartQuantity += cartItem.quantity;
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
  }
  return totalPrice;
}


