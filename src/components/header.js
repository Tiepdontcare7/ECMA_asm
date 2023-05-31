import axios from "axios";
import urlApi from "../config/config";

const Header = () => {
  axios.get(urlApi)
    .then(({ data }) => {
      const inputNav = document.querySelector('.input-nav');
      const searchNav = document.querySelector('.search-nav');
      
      inputNav.addEventListener('keyup', function (e) {
          // console.log(this.value);
        const dataFilter = data.filter((item) => item.name.toLowerCase().trim().includes(this.value.toLowerCase().trim()));
        const html = dataFilter.map((item) => {
          return `
            <li>
              <a class="hover:bg-slate-100 text-sm hover:text-black block p-2" href="#/product/${item.id}">${item.name}</a>
            </li>
        `
        }).join('')
        searchNav.querySelector('ul').innerHTML = html;

        if(e.key === "Backspace" && this.value === ''){
          searchNav.style.display = 'none';
        }else{
          searchNav.style.display = 'block';
        }
      })      
    })

  return `
  <section class="header">
    <div class="bg-[#1A94FF] max-w-[1440px] mx-auto flex items-center justify-between px-28 py-6 text-white">
      <div>
        <a href="#">
          <img srcset="./src/imgs/logo.png 2x" alt="">
        </a>
      </div>

      <div class="flex items-center">
        <div class="flex items-center pr-7">
          <div class="relative">
            <input class="input-nav min-w-[626px] p-2 px-2 mr-[1.5px] text-black outline-0 " placeholder="Tìm kiếm" type="text">
            <div class="search-nav overflow-y-auto absolute w-full border h-fit max-h-[500px] bg-white text-black rounded">
              <ul>
                
                
              </ul>
            </div>
          </div>
          <div class="bg-[#0D5CB6] p-2 shadow-sm">
            <span>
              <ion-icon name="search-outline"></ion-icon>
            </span>
            <button>Tìm kiếm</button>
          </div>
        </div>

        <div class="flex items-center pr-7">
          <div>
            <ion-icon class="text-[28px] pr-2" name="person-outline"></ion-icon>
          </div>
          <div>
            <div class="text-[12px] mt-[-4px]">
              <a href="#">Đăng nhập</a>
              <a class="border-l border-[#fff] pl-1" href="#">Đăng ký</a>
            </div>
            <div class="text-[12px] flex items-center">
              <a href="#">Tài khoản</a>
              <span class="mt-1 ml-[2px]">
                <ion-icon name="caret-down-outline"></ion-icon>
              </span>
            </div>
          </div>
        </div>

        <div>
          <span class="relative">
            <a href="#">
              <ion-icon class="text-[28px]" name="bag-check-outline"></ion-icon>
            </a>
            <span
              class="text-black text-[11px] bg-yellow-500 rounded-full px-[4px] absolute top-[-17px] right-[2px] block">0</span>
          </span>
          <a href="#" class="ml-1 text-[11px]">Giỏ hàng</a>
        </div>
      </div>
    </div>

    <section>
    `;
};
export default Header;
