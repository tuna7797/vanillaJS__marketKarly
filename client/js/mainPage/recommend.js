// import { productsData } from "./useData.js";
// import { getNode, insertLast } from "../../lib/index.js";

// const recommendList = getNode(".recommend_today_list");
// // const bannerContainer = getNode(".swiper_banner");
// const bannerWrap = getNode(".swiper-wrapper");

// productsData.forEach(
//   ({ name, description, price, saleRatio, salePrice, image }) => {
//     const recommendForSale = /*html*/ `
//     <li class="recommend_today_product swiper-slide" >
//       <a href="/">
//         <figure class="recommend_today_image">
//           <img
//             src="../assets/${image.thumbnail}"
//             alt=${image.alt}
//           />
//           <figcaption class="sr-only">
//             ${description}
//           </figcaption>
//         </figure>
        
//       </a>
//       <a
//         class="recommend_today_name"
//         href="/"
        
//         >${name}</a
//       >
//       <span
//         class="recommend_today_price"
        
//         >${price} 원</span
//       >
//       <button
//         class="recommend_today_cart"
//         aria-label="장바구니 버튼"
//       ></button>
//     </li>

//     `;

//     const recommendOnSale = /*html*/ `
//     <li class="recommend_today_product swiper-slide">
//       <a href="/">
//         <figure class="recommend_today_image">
//           <img
//             src="../../assets/${image.thumbnail}"
  
//             alt=${image.alt}
//           />
//           <figcaption class="sr-only">
//             ${description}
//           </figcaption>
//         </figure>
        
//       </a>
//       <a
//         class="recommend_today_name"
//         href="/"
      
//         >${name}</a
//       >
//       <span class="recommend_today_sale" 
//         >${saleRatio}&#37;</span
//       >
//       <span class="recommend_today_price" 
//         >${salePrice} 원</span
//       >
//       <span class="recommend_today_before_price" aria-hidden="true"
//         >${price} 원</span
//       >
//       <button
//         class="recommend_today_cart"
//         aria-label="장바구니 버튼"
//       ></button>
//     </li>
//     `;

//     if (!salePrice) {
//       insertLast(bannerWrap, recommendForSale);
//     } else {
//       insertLast(bannerWrap , recommendOnSale);
//     }
//   },
// );

// const productsSwiper = new Swiper(".recommend_today_list", {
//   slidesPerView: 4,
//   spaceBetween: 30,
//   navigation: {
//     nextEl: ".recommend_today_right_arrow",
//     // prevEl: ".swiper-button-prev",
//   },
// });
