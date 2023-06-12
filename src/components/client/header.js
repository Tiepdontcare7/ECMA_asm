import axios from "axios";
import { router, useEffect, useState } from "../../lib";
import { $ } from "../../utilities";
import Account from "./account";
import urlApi from "../../config/config";

const Header = () => {

  const [acc, setAcc] = useState([])

  useEffect(() => {
    const dataSignin = localStorage.getItem('data');
    if (dataSignin != null) {
      const data = JSON.parse(dataSignin);
      setAcc(data.username)
    }
  },[])

  useEffect(() => {
    cm: // logout
    $('.out').onclick = () => {
      localStorage.removeItem('data');
      // router.navigate('/')
      window.location.reload();
    }
    $('.card').onclick = () => {
      const dataSignin = localStorage.getItem('data');
      if (dataSignin == null) {
        alert('Bạn cần đăng nhập!')
        router.navigate('#/account/signin')
      }else{
        router.navigate('#/card')
      }

    }
  })

  useEffect(() => {
    axios.get(urlApi)
    .then(({data})=> {

      const inputNav = document.querySelector('.input-nav');
      const searchNav = document.querySelector('.search-nav');
  
      inputNav.addEventListener('keyup', function (e) {
        const dataFilter = data.filter((item) => item.name.toLowerCase().trim().includes(this.value.toLowerCase().trim()));
        const html = dataFilter.map((item) => {
          return `
              <li>
                <a class="hover:bg-slate-100 text-sm hover:text-black block p-2" href="#/product/${item.id}">${item.name}</a>
              </li>
          `
        }).join('')
        searchNav.querySelector('ul').innerHTML = html;
  
        if (e.key === "Backspace" && this.value === '') {
          searchNav.style.display = 'none';
        } else {
          searchNav.style.display = 'block';
        }
      })
    })
  })


  return `
  <section class="header">
    <div class="bg-[#1A94FF] max-w-[1440px] mx-auto flex items-center justify-between px-28 py-6 text-white">
      <div>
        <a href="#">
          <img srcset="/src/imgs/logo.png 2x" alt="">
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

        <div class=" flex items-center pr-7">
          <div>
            <ion-icon class="out text-[28px] pr-2 cursor-pointer" name="person-outline"></ion-icon>
          </div>
          <div class="account">
            ${`${acc}` || Account()}
          </div>
        </div>

        <div>
          <span class="relative">
            <a href="#">
              <ion-icon class="text-[28px]" name="bag-check-outline"></ion-icon>
            </a>
            <span
              class="text-white quantity-card text-black text-[11px] bg-yellow-500 rounded-full px-[4px] absolute top-[-17px] right-[2px] block">0</span>
          </span>
          <a href="#" class="card ml-1 text-[11px]">Giỏ hàng</a>
        </div>
      </div>
    </div>

    <section>
    `;
};
export default Header;
