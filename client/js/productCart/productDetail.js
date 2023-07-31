import {
  attr,
  bindEvent,
  clearContents,
  getNode,
  insertLast,
} from "../../lib/index.js";

// 상품 선택 카운트 기능
const selectCount = getNode(".product_detail_select_count");

const plusButton = getNode(".product_detail_plus");

const minusButton = getNode(".product_detail_minus");

const productTotalPrice = getNode(".product_detail_all_price");

// + 버튼을 누르면 카운트값이 증가하는 기능
function handlerPlus(e) {
  e.preventDefault();

  countPlusNumber();
}

function countPlusNumber() {
  let countNumber = +selectCount.innerText + 1;
  if (countNumber === 0) {
    return alert("최소 주문수량은 1 입니다.");
  }
  clearContents(selectCount);
  insertLast(selectCount, `${countNumber}`);

  // 총 상품금액
  function totalPrice(countNumber) {
    let totalProductPrice = countNumber * 4980;

    clearContents(productTotalPrice);
    insertLast(productTotalPrice, `총 상품금액: ${totalProductPrice} 원`);
  }
  totalPrice(countNumber);
}

bindEvent(plusButton, "click", handlerPlus);

// - 버튼을 누르면 값이 카운트값이 감소하는 기능
function handlerMinus(e) {
  e.preventDefault();
  countMiusNumber();
}

function countMiusNumber() {
  let countNumber = +selectCount.innerText - 1;
  if (countNumber === 0) {
    return alert("최소 주문수량은 1 입니다.");
  }
  clearContents(selectCount);
  insertLast(selectCount, `${countNumber}`);

  // 총 상품금액
  function totalPrice(countNumber) {
    let totalProductPrice = countNumber * 4980;

    clearContents(productTotalPrice);
    insertLast(productTotalPrice, `총 상품금액: ${totalProductPrice} 원`);
  }
  totalPrice(countNumber);
}

bindEvent(minusButton, "click", handlerMinus);

/* ------------------------------------- */
