import {
  clearContents,
  getNode,
  insertLast,
  bindEvent,
} from '../../lib/index.js';

const cartList = getNode('.cart_contents');
const showPrice = getNode('.show_price_product');

// 로컬 스토리지에서 상품 정보를 가져오는 함수
function getProductsFromLocalStorage() {
  const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
  return cartItems;
}

function renderProductsFromLocalStorage() {
  const products = getProductsFromLocalStorage();

  // 이전에 랜더링된 상품 정보를 지우고, 새로운 상품 정보를 랜더링할 컨테이너 요소를 가져옵니다.
  const productInfoContainer = document.querySelector('.product_info');
  productInfoContainer.innerHTML = '';

  // 각 상품 정보를 랜더링합니다.
  for (const product of products) {
    // 상품 정보를 담을 새로운 div 요소를 생성합니다.
    const productElement = document.createElement('div');
    productElement.classList.add('product_item');

    // 상품명을 나타낼 span 요소를 생성하고, 내용을 채웁니다.
    const productName = document.createElement('span');
    productName.innerText = `상품명: ${product.name}`;
    productElement.appendChild(productName);

    // 상품 가격을 나타낼 span 요소를 생성하고, 내용을 채웁니다.
    const productPrice = document.createElement('span');
    productPrice.innerText = ` | 가격: ${product.price} 원`;
    productElement.appendChild(productPrice);

    // 상품 수량을 나타낼 span 요소를 생성하고, 내용을 채웁니다.
    const productQuantity = document.createElement('span');
    productQuantity.innerText = ` | 수량: ${product.quantity}`;
    productElement.appendChild(productQuantity);

    // 새로 생성한 상품 정보를 productInfoContainer에 추가합니다.
    productInfoContainer.appendChild(productElement);
  }
}

// 페이지가 로드되면 로컬스토리지에서 상품 정보를 가져와서 랜더링합니다.
renderProductsFromLocalStorage();

// 상품금액을 랜더링하는 함수
function renderProductPrice() {
  const products = getProductsFromLocalStorage();
  let totalPrice = 0;

  // 상품 금액을 합산합니다.
  for (const product of products) {
    totalPrice += parseInt(product.price) * parseInt(product.quantity);
  }

  // 랜더링할 요소를 가져옵니다.
  const showPriceProductElement = document.querySelector('.show_price_product');

  // 상품금액을 요소에 업데이트합니다.
  showPriceProductElement.textContent = `${totalPrice} 원`;
}

// 페이지가 로드되면 상품금액을 랜더링합니다.
renderProductPrice();
/* ------------------------------- */
