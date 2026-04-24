import { myCart, removeFromCart, saveToStorage } from "../data/cart.js";
import { products } from "../data/products.js";
import { convertToFixed } from "./utils/money.js";
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';


function findItem(productId) {
  return products.find((product) => product.id === productId);
}


export function renderOrderSummary() {
  let cartQuantityItems = 0;

  myCart.forEach((cartItem) => {
    cartQuantityItems += cartItem.quantity;
  });

  const orderSummary = document.querySelector('.order-summary');
 
  let cartSummaryHTML = ''; 

  myCart.forEach(cartItem => { 
    const matchingProduct = findItem(cartItem.productId);
    
   
    cartSummaryHTML += `
    <div class="cart-item-container product-${matchingProduct.id}">
      <div class="delivery-date">Delivery date: Tuesday, June 21</div>
      <div class="cart-item-details-grid">
        <img class="product-image" src=${matchingProduct.image}>
        <div class="cart-item-details">
          <div class="product-name">${matchingProduct.name}</div>
          <div class="product-price">$${convertToFixed(matchingProduct.priceCents)}</div>
          <div class="product-quantity">
            <span>Quantity: <span class="quantity-label">${cartItem.quantity}</span></span>
            <span class="update-quantity-link link-primary">Update</span>
            <span class="delete-quantity-link link-primary js-delete-link" data-product-id="${matchingProduct.id}">
              Delete
            </span>
          </div>
        </div>
        </div>
    </div>`;
  });

 
  orderSummary.innerHTML = cartSummaryHTML;



  const cartQuantityElement = document.querySelector('.return-to-home-link');
  if (cartQuantityElement) {
    cartQuantityElement.innerHTML = `${cartQuantityItems} items`;
  }

  document.querySelectorAll('.js-delete-link')
    .forEach((link) => {
      link.addEventListener('click', () => {
        const productId = link.dataset.productId;
        
      
        removeFromCart(productId);
        

        saveToStorage(); 
        
        renderOrderSummary(); 
      });
   });
}


renderOrderSummary();

const hoje = dayjs();
console.log(hoje.format('D'))