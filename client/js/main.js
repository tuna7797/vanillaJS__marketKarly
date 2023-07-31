import { getNode as $, renderProductList, tiger } from "../lib/index.js";


const productWrap = $('.product_wrap')


const response = await tiger.get('http://localhost:3000/products');
const productData = response.data;

productData.forEach((item)=> renderProductList(productWrap,item))

console.log(productData);