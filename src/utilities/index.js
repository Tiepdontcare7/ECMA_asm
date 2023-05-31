import Navigo from "navigo";
const router = new Navigo("/", {linksSelector: "a", hash: true} );

function render(data, target = '#app'){
   document.querySelector(target).innerHTML = data();
}

const $ = document.querySelector.bind(document)
const $$ = document.querySelectorAll.bind(document)

function sortPrice(data){
   return new Promise((resolve, reject) =>{
      data.sort((a, b) =>{
         return a.original_price - b.original_price
      })
      resolve(data)
   })
}
function sortReduce(data){
   return new Promise((resolve, reject) =>{
      data.sort((a, b) =>{
         return b.original_price - a.original_price
      })
      resolve(data)
   })
}

export {render, router,sortPrice, sortReduce, $, $$}