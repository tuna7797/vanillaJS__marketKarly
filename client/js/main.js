/* global gsap */

import {
  getNode,
  getNodes,
  invisibleElement,
  addClass,
  clearContents,
} from "../lib/index.js";

const [closeNotToday, close] = getNodes(".main_popup > button");
const bannerClose = getNode(".header_banner_button");

// console.log(typeof popup);

// console.log(popup);

// addClass(popup, 'invisible');

const handlePopupClose = (e) => {
  const popup = getNode(".main_popup");

  // console.log(typeof popup);
  // console.popup(popup);
  // console.log(e.target);
  invisibleElement(popup);
};

const handleBannerClose = (e) => {
  const banner = getNode(".header_banner");

  gsap.to(banner, {
    y: -100,
    opacity: 0,
    // duration:0.5,
    onComplete: function () {
      banner.remove();
    },
  });

  addClass(banner, "hide");
  addClass(banner, "hide_banner");
  // clearContents(banner);
  // invisibleElement(banner);
};

close.addEventListener("click", handlePopupClose);
bannerClose.addEventListener("click", handleBannerClose);

// 스와이퍼 사용하기

let templete = /*html*/ `
<div class="swiper-container">
  <div class="swiper-wrapper">
    <div class="swiper-slide" data-imgurl="image1.jpg">
      Slide 1
    </div>
    <div class="swiper-slide" data-imgurl="image2.jpg">
      Slide 2
    </div>
    <div class="swiper-slide" data-imgurl="image3.jpg">
      Slide 3
    </div>
  </div>

  <div class="swiper-button-prev"></div>
  <div class="swiper-button-next"></div>
</div>

`;


const swiper = new Swiper('.swiper-container', {
  slidesPerView: 1,
  spaceBetween: 30,
  loop: true,
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
  autoplay: {
    delay: 2500,
    disableOnInteraction: false,
  },
});
