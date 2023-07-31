import { getNode as $, renderProductList, tiger } from "../lib/index.js";


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
