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
         let a1 = a.original_price
         let b1 = b.original_price
         return a1 - b1
      })
      return resolve(data)
   })
}
function sortReduce(data){
   return new Promise((resolve, reject) =>{
      data.sort((a, b) =>{
         let a1 = a.original_price
         let b1 = b.original_price
         return b1 - a1
      })
      return resolve(data)
   })
}

export {render, router,sortPrice, sortReduce, $, $$}