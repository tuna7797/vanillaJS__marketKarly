import { clearContents, getNode } from "../../lib/index.js";

const cartList = getNode(".cart_contents");
const showPrice = getNode(".show_price_product");

// 로컬 스토리지에서 상품 정보를 가져오는 함수
function getProductsFromLocalStorage() {
  const cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
  return cartItems;
}

function renderProductsFromLocalStorage() {
  const products = getProductsFromLocalStorage();

  // 이전에 랜더링된 상품 정보를 지우고, 새로운 상품 정보를 랜더링할 컨테이너 요소를 가져옵니다.
  const productInfoContainer = getNode(".product_info");
  productInfoContainer.innerHTML = "";

  // 각 상품 정보를 랜더링합니다.
  for (const product of products) {
    // 상품 정보를 담을 새로운 div 요소를 생성합니다.
    const productElement = document.createElement("div");
    productElement.classList.add("product_item");

    // 상품명을 나타낼 span 요소를 생성하고, 내용을 채웁니다.
    const productName = document.createElement("span");
    productName.innerText = `상품명: ${product.name}`;
    productElement.appendChild(productName);

    // 상품 가격을 나타낼 span 요소를 생성하고, 내용을 채웁니다.
    const productPrice = document.createElement("span");
    productPrice.innerText = ` | 가격: ${product.price} 원`;
    productElement.appendChild(productPrice);

    // 상품 수량을 나타낼 span 요소를 생성하고, 내용을 채웁니다.
    const productQuantity = document.createElement("span");
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
  const showPriceProductElement = getNode(".show_price_product");

  // 상품금액을 요소에 업데이트합니다.
  showPriceProductElement.textContent = `${totalPrice} 원`;
}

// 페이지가 로드되면 상품금액을 랜더링합니다.
renderProductPrice();
/* ------------------------------- */

// 장바구니에서 카드에 담은 것을 로컬스토리지에 삭제할 수 있는 기능
// 버튼 요소 가져오기
const removeProductItem = getNode(".cart_button_click");
const productInfo = getNode(".product_info");

function handlerRemove(e) {
  e.preventDefault();

  // 로컬 스토리지에서 'cartItem' 키에 해당하는 값을 가져오기
  const cartItems = localStorage.getItem("cartItems");

  // 'cartItem' 값이 존재하면 로컬 스토리지에서 제거
  if (cartItems !== null) {
    localStorage.removeItem("cartItems");
    // 바뀐 값 랜더링
    clearContents(productInfo);
    renderProductPrice();
    alert("상품이 모두 취소되었습니다.");
  } else {
    alert("상품목록이 이미 비어있습니다.");
  }
}

removeProductItem.addEventListener("click", handlerRemove);

/* ------------------------------- */

// 할인율 데이터에서 가져와서 할인금액 계산해서 렌더링

// 상품금액 할인율 배송비 합해서 총 결제금액 렌더링
