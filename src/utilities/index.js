import axios from "axios";
import {router} from "../lib"
import { urlUsers } from "../config/config";
import bcrypt from 'bcryptjs';


function render(data, target = "#app") {
   document.querySelector(target).innerHTML = data();
}

const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

function sortPrice(data) {
   return new Promise((resolve, reject) => {
      data.sort((a, b) => {
         return a.original_price - b.original_price;
      });
      resolve(data);
   });
}
function sortReduce(data) {
   return new Promise((resolve, reject) => {
      data.sort((a, b) => {
         return b.original_price - a.original_price;
      });
      resolve(data);
   });
}

function navBar() {
   const productItemActive = document.querySelector(".product-item.active");
   const line = document.querySelector(".line");
   line.style.left = productItemActive.offsetLeft + "px";
   line.style.width = productItemActive.offsetWidth + "px";
   document.querySelectorAll(".product-item").forEach((item) => {
      item.addEventListener("click", (e) => {
         document.querySelector(".product-item.active").classList.remove("active");

         line.style.left = e.target.offsetLeft + "px";
         line.style.width = e.target.offsetWidth + "px";

         e.target.classList.add("active");
      });
   });
}

const Validate = {
   isText: function (selector) {
      const input = document.querySelector(selector);
      let checked = true;
      input.onblur = () => {
         if (!input.value) {
            input.closest(".form-group").querySelector(".err").innerText =
               "Không được bỏ trống!";
            input.style.border = "1px solid red";
            checked = false;
         } else if (input.value.length < 7) {
            input.closest(".form-group").querySelector(".err").innerText =
               "Độ dài không ngắn hơn 7 ký tự!";
            input.style.border = "1px solid red";
            checked = false;
         } else {
            input.closest(".form-group").querySelector(".err").innerText = "";
            input.style.border = "1px solid green";
         }
      };
      return checked
   },
   isImage: function (selector) {
      const input = document.querySelector(selector);
      input.onblur = () => {
         if (!input.value) {
            input.closest(".form-group").querySelector(".err").innerText =
               "Ảnh Không được bỏ trống!";
            input.style.border = "1px solid red";
         } else if (input.value.length < 7) {
            input.closest(".form-group").querySelector(".err").innerText =
               "Độ dài không ngắn hơn 7 ký tự!";
            input.style.border = "1px solid red";
         } else if (!input.value.includes("https://")) {
            input.closest(".form-group").querySelector(".err").innerText =
               "Bạn phải nhập link ảnh";
            input.style.border = "1px solid red";
         } else {
            input.closest(".form-group").querySelector(".err").innerText = "";
            input.style.border = "1px solid green";
         }
      };
   },
};

function findUserByName(username) {
   return new Promise(function (resolve, reject) {
      axios.get(urlUsers)
         .then(({ data }) => {
            const dataFilter = data.find(item => item.username == username)
            resolve(dataFilter)
         })
   })
}


function hashPassword(password) {
   return new Promise(function (resolve, reject) {
      bcrypt.hash(password, 10, function (err, hash) {
         if (err) {
            console.error(err);
            return;
         }
         resolve(hash)
      })
   })
}
function comparePassword(userFilter, user) {
   return new Promise(function (resolve, reject) {
      bcrypt.compare(user.password, userFilter.password, function (err, isMatch) {
         if (err) {
            console.error(err);
            return;
         }
         if (isMatch) {
            resolve(userFilter);
         } else {
            reject('Mật khẩu không chính xác! Kiểm tra lại!');
         }
      })
   })
}

async function updateQuantityCard() {
   const userLocal = JSON.parse(localStorage.getItem('data'))
   const userFilter = await findUserByName(userLocal.username)
   let sum = 0
   userFilter.card.forEach((e) => {
      sum += 1
   });
   $('.quantity-card').textContent = sum
}
export { render, router, sortPrice, sortReduce, $, $$, navBar, Validate, findUserByName, hashPassword, comparePassword, updateQuantityCard };
