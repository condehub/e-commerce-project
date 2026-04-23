import { myCart, removeFromCart, saveToStorage } from "../data/cart.js";
import { products } from "../data/products.js";
import { convertToFixed } from "./utils/money.js";

// Função auxiliar continua igual
function findItem(productId) {
  return products.find((product) => product.id === productId);
}

// 1. CRIAMOS A FUNÇÃO DE RENDERIZAÇÃO
export function renderOrderSummary() {
  const orderSummary = document.querySelector('.order-summary');
  
  // 2. A Folha em Branco: Usamos uma variável vazia para montar o HTML
  let cartSummaryHTML = ''; 

  myCart.forEach(cartItem => { 
    const matchingProduct = findItem(cartItem.productId);
    
    // 3. Montamos o HTML todo na variável (em vez de jogar direto na tela)
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

  // 4. A MÁGICA: Substituímos o HTML antigo pelo novo (o "=" apaga tudo que estava antes)
  orderSummary.innerHTML = cartSummaryHTML;

  // 5. Recriamos os eventos de clique APENAS para os novos botões
  document.querySelectorAll('.js-delete-link')
    .forEach((link) => {
      link.addEventListener('click', () => {
        const productId = link.dataset.productId;
        
        // Remove do array de dados
        removeFromCart(productId);
        
        // Salva a alteração (descomentei o seu saveToStorage)
        saveToStorage(); 
        
        // 6. O PULO DO GATO: Em vez de usar .remove() na div, nós mandamos 
        // a página se desenhar inteira de novo! Como o item não está mais 
        // no myCart, ele simplesmente não vai aparecer na tela.
        renderOrderSummary(); 
      });
   });
}

// 7. Chamamos a função uma vez no final do arquivo para ela rodar quando a página carregar
renderOrderSummary();