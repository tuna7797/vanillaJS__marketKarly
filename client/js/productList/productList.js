import { getNode as $, getCss, loadStorage, saveStorage, setCss, tiger } from "../../lib/index.js";
import { renderProductList } from "./productData.js";


const productWrap = $('.product_wrap')


const response = await tiger.get('http://localhost:3000/products');
const productData = response.data;

productData.forEach((item)=> renderProductList(productWrap,item))


//brandList Drop Down

const sideBarButton = $('.side_bar_button_clicked');

sideBarButton.addEventListener('click', () => {
  
  const brandList = $('.brand');
  brandList.classList.toggle("brand_list_hide");
  $('.arrow_top').classList.toggle("arrow_top_rotate");

});



// 로컬 스토리지의 값을 업데이트하여 배열에 새 값을 추가
function updateStorage(key, value) {
  return new Promise((resolve, reject) => {
    if (!key) {
      reject({ message: 'key를 입력해주세요.' });
    } else {
      loadStorage(key)
        .then((storedValues) => {
          if (!Array.isArray(storedValues)) {
            storedValues = []; // 저장된 값이 배열이 아닌 경우 빈 배열로 초기화
          }
          storedValues.push(value);
          saveStorage(key, storedValues)
            .then(() => {
              resolve();
            })
            .catch((error) => {
              reject({ message: error.message });
            });
        })
        .catch((error) => {
          reject({ message: error.message });
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
  const recentlyViewedList = $('.recent_viewed_list');
  const listItem = document.createElement('li');
  const listLink = document.createElement('a');
  const listImage = document.createElement('img');
  listImage.src = src;
  listLink.appendChild(listImage);
  listItem.appendChild(listLink);
  recentlyViewedList.appendChild(listItem);
  listItem.className = 'recent_viewed_item';
  listLink.className = 'recent_viewed_link';

  // 이미지를 목록의 첫번째 위치에 추가하기 전에, 목록 길이가 10개인지 확인
  if (recentlyViewedList.children.length >= 10) {
    recentlyViewedList.removeChild(recentlyViewedList.lastElementChild); // 가장 끝에 있는 항목을 삭제
  }

  // 이미지를 목록의 첫번째 위치에 추가
  if (recentlyViewedList.lastChild) {
    recentlyViewedList.insertBefore(listItem, recentlyViewedList.lastChild);
  } else {
    recentlyViewedList.appendChild(listItem);
  }

  
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
  
  $('.recent_viewed_up').addEventListener('click',(e)=>{
    const currentTop = parseInt(getCss($('.recent_viewed_list'), 'top'));
    if (currentTop === 0) return;
    const newTop = currentTop + 88;
    setCss($('.recent_viewed_list'),'top', newTop + 'px')

  })
  $('.recent_viewed_down').addEventListener('click',()=>{
    const currentTop = parseInt(getCss($('.recent_viewed_list'), 'top'));
    if (currentTop === -616) return;
    const newTop = currentTop - 88;
    setCss($('.recent_viewed_list'),'top', newTop + 'px')
  })
