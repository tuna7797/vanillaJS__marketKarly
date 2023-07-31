/* global gsap */

import {
  getNode,
  getNodes,
  invisibleElement,
  addClass,
  clearContents,
  tiger,
  insertLast,
} from '../lib/index.js';

const [closeNotToday, close] = getNodes('.main_popup > button');
const bannerClose = getNode('.header_banner_button');
const bannerData = (await tiger.get('http://localhost:3000/banner')).data;

// 스와이퍼

const bannerWrap = getNode('.swiper-wrapper');
bannerData.forEach(({ id, src, alt, figcaption }) => {
  const templete = /*html*/ `
      <figure class="main_banner_image_box swiper-slide">
      
      <img
        class="main_banner_image"
        src=${src}
        alt=${alt}
      />
      <figcaption class="sr-only">
        ${figcaption}
      </figcaption>
      </figure>
  
    `;

  insertLast(bannerWrap, templete);
});

// function slideNum() {
//   console.log(this.activeIndex);
// }

// let slideChanged = false;

function CurrentSlideIndex(swiper) {
  // console.log('현재 슬라이드 번호:', swiper.realIndex + 1); // 현재 슬라이드 번호 출력
  return swiper.realIndex + 1;
}

function slideNum(curNum, length) {
  const slide = getNode('.main_banner_page');
  const templete = `
    ${curNum} / ${length}
  `;
  clearContents(slide);
  insertLast(slide, templete);
}

// JS 코드
const mySwiper = new Swiper('.swiper-container', {
  direction: 'horizontal', // 가로 슬라이드
  loop: true, // 슬라이드 루프
  autoplay: {
    delay: 2000, // 3초마다 슬라이드 자동 전환
    disableOnInteraction: false, // 방문자가 슬라이드에 interaction 하더라도 자동 전환을 계속 유지
  },
  navigation: {
    nextEl: '.main_banner_right_arrow', // 다음 슬라이드에 대한 버튼 선택자
    prevEl: '.main_banner_left_arrow', // 이전 슬라이드에 대한 버튼 선택자
  },
  keyboard: {
    enabled: true, // 키보드 단축키 사용 가능하게 설정
    onlyInViewport: true, // 슬라이더가 뷰포트 내에 있을 때만 작동하도록 설정
    pageUpDown: true, // Page Up 및 Page Down 키도 작동하도록 설정
  },
  on: {
    init: function () {
      slideNum(CurrentSlideIndex(this), bannerData.length);
    },

    slideChangeTransitionStart: function () {
      let slideChanged = false;
      if (!slideChanged) {
        slideChanged = true;
        setTimeout(() => {
          slideNum(CurrentSlideIndex(this), bannerData.length), // 슬라이드 전환 후 슬라이드 번호 출력
            (slideChanged = false);
        }, 50);
      }
    },
  },
});

// 버튼

const arrowButton = getNode('.main_banner_button');

arrowButton.addEventListener('mouseenter', () => {
  arrowButton.to(button, { duration: 1, opacity: 1, ease: 'expo.out' });
});

arrowButton.addEventListener('mouseleave', () => {
  gsap.to(arrowButton, { duration: 1, opacity: 0.3, ease: 'expo.out' });
});

const handlePopupClose = (e) => {
  const popup = getNode('.main_popup');

  // console.log(typeof popup);
  // console.popup(popup);
  // console.log(e.target);
  invisibleElement(popup);
};

const handleBannerClose = (e) => {
  const banner = getNode('.header_banner');

  gsap.to(banner, {
    y: -100,
    opacity: 0,
    // duration:0.5,
    onComplete: function () {
      banner.remove();
    },
  });

  addClass(banner, 'hide');
  addClass(banner, 'hide_banner');
  // clearContents(banner);
  // invisibleElement(banner);
};

close.addEventListener('click', handlePopupClose);
bannerClose.addEventListener('click', handleBannerClose);

// 스와이퍼 사용하기

// let templete = /*html*/ `
// <div class="swiper-container">
//   <div class="swiper-wrapper">
//     <div class="swiper-slide" data-imgurl="image1.jpg">
//       Slide 1
//     </div>
//     <div class="swiper-slide" data-imgurl="image2.jpg">
//       Slide 2
//     </div>
//     <div class="swiper-slide" data-imgurl="image3.jpg">
//       Slide 3
//     </div>
//   </div>

//   <div class="swiper-button-prev"></div>
//   <div class="swiper-button-next"></div>
// </div>

// `;

// const swiper = new Swiper('.swiper-container', {
//   slidesPerView: 1,
//   spaceBetween: 30,
//   loop: true,
//   navigation: {
//     nextEl: '.swiper-button-next',
//     prevEl: '.swiper-button-prev',
//   },
//   autoplay: {
//     delay: 2500,
//     disableOnInteraction: false,
//   },
// });
