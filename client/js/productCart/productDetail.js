import {
  bindEvent,
  clearContents,
  getNode,
  insertLast,
} from '../../lib/index.js';

// url에 id값을 가져와서 data.json에서 id에 해당하는 객체를 가져와서 초기화하는 기능
const titleNode = getNode('.product_detail_title');

fetch('../../../server/db/data.json')
  .then((response) => response.json())
  .then((data) => {
    // JSON 파일 내용을 JavaScript 객체로 변환한 데이터 사용
    const productId = getQueryStringValue('id');
    const product = data.products.find((item) => item.id === productId);

    clearContents(titleNode);
    insertLast(titleNode, product.name);

    if (product) {
      console.log(product);
    } else {
      console.log(`"${productId}" 아이디의 상품이 없습니다.`);
    }
  })
  .catch((error) => {
    console.error('JSON 데이터를 가져오는 도중 오류가 발생했습니다.', error);
  });

/* ------------------------------------- */

// 상품 선택 카운트 기능
const selectCount = getNode('.product_detail_select_count');

const plusButton = getNode('.product_detail_plus');

const minusButton = getNode('.product_detail_minus');

const productTotalPrice = getNode('.product_detail_all_price');

// + 버튼을 누르면 카운트값이 증가하는 기능
function handlerPlus(e) {
  e.preventDefault();

  countPlusNumber();
}

function countPlusNumber() {
  let countNumber = +selectCount.innerText + 1;
  if (countNumber === 0) {
    return alert('최소 주문수량은 1 입니다.');
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

bindEvent(plusButton, 'click', handlerPlus);

// - 버튼을 누르면 값이 카운트값이 감소하는 기능
function handlerMinus(e) {
  e.preventDefault();
  countMiusNumber();
}

function countMiusNumber() {
  let countNumber = +selectCount.innerText - 1;
  if (countNumber === 0) {
    return alert('최소 주문수량은 1 입니다.');
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

bindEvent(minusButton, 'click', handlerMinus);

/* ------------------------------------- */

// 장바구니 담기를 누르면 로컬스토리지에 상품명, 갯수, 상품가격이 들어감

/* ------------------------------------- */

// 현재 URL에서 쿼리 문자열을 가져오는 함수
function getQueryStringValue(key) {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(key);
}
