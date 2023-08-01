import { getNode as $, getCss, loadStorage, saveStorage, setCss, tiger } from "../../lib/index.js";
import { renderProductList } from "./productData.js";

/* 상품목록 데이터 ajax get,load */

const productWrap = $('.product_wrap')


const response = await tiger.get('http://localhost:3000/products');
const productData = response.data;

productData.forEach((item)=> renderProductList(productWrap,item))


/* 브랜드nav drop down JS애니메이션구현 */

const sideBarButton = $('.side_bar_button_clicked');

sideBarButton.addEventListener('click', () => {
  
  const brandList = $('.brand');
  brandList.classList.toggle("brand_list_hide");
  $('.arrow_top').classList.toggle("arrow_top_rotate");

});


/* localstorage를 이용한 최근 본 상품 구현 */

// 로컬 스토리지의 값을 업데이트하여 배열에 새 값을 추가
function updateStorage(key, value) {
  return new Promise((resolve, reject) => {
    if (!key) {
      reject({message: 'key를 입력해주세요.'});
    } else {
      loadStorage(key)
        .then((storedValues) => {
          if (!Array.isArray(storedValues)) {
            storedValues = []; // 저장된 값이 배열이 아닌 경우 빈 배열로 초기화
          }

          storedValues.reverse(); // 배열을 역순으로 뒤집기
          storedValues.push(value); // 뒤집어진 배열 앞에 새 값을 추가
          storedValues.reverse(); // 배열을 다시 원래 순서로 뒤집기
          
          saveStorage(key, storedValues)
            .then(() => {
              resolve();
            })
            .catch((error) => {
              reject({message: error.message});
            });
        })
        .catch((error) => {
          reject({message: error.message});
        });
    }
  });
}

// 제품 링크 클릭 리스너
const productLinks = document.querySelectorAll('.product_link');
productLinks.forEach((link) => {
  link.addEventListener('click', (event) => {

    const imgSrc = event.currentTarget.querySelector('.product_img').src;
    updateStorage('imageSrc', imgSrc)
      .then(() => {
        console.log('이미지 src가 저장되었습니다.');
        addImageViewedList(imgSrc);
      })
      .catch((error) => {
        console.error(`Error: ${error.message}`);
      });
  });
});

// 이미지를 최근 본 상품 목록에 추가
function addImageViewedList(src) {
  const recentlyViewedList = $('.recent_product_viewed_list');
  
  const listItem = document.createElement('li');
  const listLink = document.createElement('a');
  const listImage = document.createElement('img');
  listImage.src = src;
  listLink.appendChild(listImage);
  listItem.appendChild(listLink);
  listItem.className = 'recent_product_viewed_item';
  listLink.className = 'recent_product_viewed_link';

  // 이미지를 목록의 첫번째 위치에 추가하기 전에, 목록 길이가 10개인지 확인
  if (recentlyViewedList.children.length >= 10) {
    recentlyViewedList.removeChild(recentlyViewedList.lastElementChild); // 가장 마지막 있는 항목을 삭제
  }

  // 항목들을 recent_product_viewed_list의 가장 첫 번째 위치에 추가하기
  recentlyViewedList.insertBefore(listItem, recentlyViewedList.firstElementChild);
}


// 로컬 스토리지에서 이미지 src를 load
loadStorage('imageSrc')
  .then((imageSrcArray) => {
    // 이미지 src로 최근 본 상품 목록에 이미지를 추가
    if (imageSrcArray && Array.isArray(imageSrcArray)) {
      for (let i = imageSrcArray.length - 1; i >= 0; i--) {
        addImageViewedList(imageSrcArray[i]);
      }
    }
  })
  .catch((error) => {
    console.error(`Error: ${error.message}`);
  });





  /* 최근 본 상품 slide */
  
  function smoothScroll(element, target, duration) {
    const start = element.scrollTop;
    const change = target - start;
    let currentTime = 0;
    const increment = 20;
  
    function animateScroll() {
      currentTime += increment;
      const value = Math.easeInOutQuad(currentTime, start, change, duration);
      element.scrollTop = value;
      if (currentTime < duration) {
        requestAnimationFrame(animateScroll);
      }
    }
    animateScroll();
  }
  
  Math.easeInOutQuad = function (t, start, change, duration) {
    t /= duration / 2;
    if (t < 1) return (change / 2) * t * t + start;
    t--;
    return (-change / 2) * (t * (t - 2) - 1) + start;
  };
  
  $('.recent_product_viewed_up').addEventListener('click', () => {
    const box = $('.recent_product_viewed_box');
    const currentScrollTop = box.scrollTop;
    if (currentScrollTop === 0) return;
    const newScrollTop = currentScrollTop - 88;
    smoothScroll(box, newScrollTop, 500);
  });
  
  $('.recent_product_viewed_down').addEventListener('click', () => {
    const box = $('.recent_product_viewed_box');
    const currentScrollTop = box.scrollTop;
  
    const itemCount = $('.recent_product_viewed_list').getElementsByTagName('li').length;
    if (itemCount <= 2) {
      return;
    }
  
    const maxScrollTop = box.scrollHeight - box.clientHeight;
    if (currentScrollTop === maxScrollTop) return;
    const newScrollTop = currentScrollTop + 88;
    smoothScroll(box, newScrollTop, 200);
  });