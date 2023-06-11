import Footer from "../../components/client/footer"
import Header from "../../components/client/header"
import axios from 'axios'
import urlApi from "../../config/config"
import { $, sortPrice, sortReduce, navBar, findUserByName } from "../../utilities"
import { useState, useEffect } from "../../lib"

const HomePage = () => {
  axios.get(urlApi)
    .then(({ data }) => {

      navBar()

      const renderProduct = (data) => {
        const html = data.map((item) => {
          return `
              <div class="flex flex-col">
              <div class="mb-3 flex justify-center">
                <a href="#/product/${item.id}">
                  <img title="${item.name}" srcset="${item.images[0]} 2x" alt="Error">
                </a>
              </div>
              <div class="mt-auto">
                <div class="mb-2">
                  <img srcset="./src/imgs/tiki-now.png 2x" alt="">
                </div>
                <span class="text-[#00AB56] uppercase block mb-2">GIAO SIÊU TỐC 2H</span>
                <span class="item-title mb-2">${item.name}</span>
                <div class="flex items-center gap-x-2 my-1">
                  <ul class="flex items-center">
                    <li><ion-icon name="star"></ion-icon></li>
                    <li><ion-icon name="star"></ion-icon></li>
                    <li><ion-icon name="star"></ion-icon></li>
                    <li><ion-icon name="star"></ion-icon></li>
                    <li><ion-icon name="star"></ion-icon></li>
                  </ul>
                  <span class="text-[#787878] text-xs block border-l border-[#ccc] pl-2">Đã bán ${item?.quantity_sold?.value ?? 'API null'}</span>
                </div>
                <div>
                  <span class="text-base text-red-600">${item.original_price} ₫</span>
                  <span class="text-red-600 border border-red-600 rounded px-1 ml-1">-23%</span>
                </div>
                <div class="mt-1">
                  <img srcset="./src/imgs/rehonhoantien.png 2x" alt="">
                </div>
              </div>
            </div>
            <!-- End Item -->
            `
        })
        const products = document.querySelector('.products')
        products.innerHTML = html.join('')
      }

      $('.phobien').addEventListener('click', function () {
        axios.get(urlApi)
          .then(({ data }) => {
            setData(data);
          })
      })
      $('.thap').addEventListener('click', function () {
        sortPrice(data)
          .then((data) => {
            renderProduct(data);
          })
      })
      $('.cao').addEventListener('click', function () {
        sortReduce(data)
          .then((data) => {
            renderProduct(data);
          })
      })
    })

  const [data, setData] = useState([])

  useEffect(() => {
    axios.get(urlApi)
      .then(({ data }) => {
        setData(data);
      })
  }, [])

  useEffect(async () => {
    const userLocal = JSON.parse(localStorage.getItem('data'))
    if(userLocal){
      const userFilter = await findUserByName(userLocal.username)
      let sum = 0
      userFilter.card.forEach((e) => {
        sum += 1
      });
      $('.quantity-card').textContent = sum
    }
  })


  return `
  ${Header()}
  <div class="bg-[#F5F5FA] flex items-center max-w-[1440px] mx-auto py-1 px-28">
    <div class="pr-[5px]">
      <a class="text-[#808089]" href="#">
        Trang chủ
      </a>
    </div>

    <div class="flex items-center">
      <span class="relative top-[2px]">
        <ion-icon name="chevron-forward-outline"></ion-icon>
      </span>
      <a href="#" class="text-[13px] pl-[2px]">
        Nhà sách tiki
      </a>
    </div>
  </div>

  <section class="content">
    <div class="flex gap-x-20 max-w-[1440px] mx-auto px-28 py-3 mb-16">
      <div class="w-[15%]">
        <h2 class="uppercase mb-3">Danh Mục Sản Phẩm</h2>
        <ul>
          <li><a class="text-xs mb-2" href="#">English Books</a></li>
          <li><a class="text-xs mb-2" href="#">Sách tiếng Việt</a></li>
          <li><a class="text-xs mb-2" href="#">Văn phòng phẩm</a></li>
          <li><a class="text-xs mb-2" href="#">Quà lưu niệm</a></li>
        </ul>
      </div>

      <div  class="w-[85%]">
        <div>
          <h3 class="text-xl mb-3">Nhà Sách Tiki</h3>
        </div>

        <div>
          <img srcset="./src/imgs/banner.png 2x" alt="">
        </div>

        <ul class="relative flex items-center mt-7 pb-3 border-b-[1px] border-[#ccc]">
          <li class="phobien product-item px-5 cursor-pointer active">Phổ biến</li>
          <li class="product-item px-5 cursor-pointer">Bán chạy</li>
          <li class="product-item px-5 cursor-pointer">Hàng mới</li>
          <li class="thap product-item px-5 cursor-pointer">Giá thấp</li>
          <li class="cao product-item px-5 cursor-pointer">Giá cao</li>
          <div class="line absolute bottom-0 left-0 bg-blue-700 h-[2px] transition-all"></div>
        </ul>

        <div class="flex items-center mt-3 mb-5 gap-x-2">
          <span class="bg-slate-200 py-[4px] rounded-full px-4">
            <img srcset="./src/imgs/tiki-now.png 2x" alt="">
          </span>
          <span class="bg-slate-200 rounded-full px-4">
            <img srcset="./src/imgs/freeship.png 2x" alt="">
          </span>
        </div>

        <div class="products grid grid-cols-4 gap-12">
        
        ${data.map((item) => {
    return `
            <div class="flex flex-col">
              <div class="mb-3 flex justify-center">
                <a data-navigo href="#/product/${item.id}">
                  <img title="${item.name}" srcset="${item.images[0]} 2x" alt="Error">
                </a>
              </div>
              <div class="mt-auto">
                <div class="mb-2">
                  <img srcset="./src/imgs/tiki-now.png 2x" alt="">
                </div>
                <span class="text-[#00AB56] uppercase block mb-2">GIAO SIÊU TỐC 2H</span>
                <span class="item-title mb-2">${item.name}</span>
                <div class="flex items-center gap-x-2 my-1">
                  <ul class="flex items-center">
                    <li><ion-icon name="star"></ion-icon></li>
                    <li><ion-icon name="star"></ion-icon></li>
                    <li><ion-icon name="star"></ion-icon></li>
                    <li><ion-icon name="star"></ion-icon></li>
                    <li><ion-icon name="star"></ion-icon></li>
                  </ul>
                  <span class="text-[#787878] text-xs block border-l border-[#ccc] pl-2">Đã bán ${item?.quantity_sold?.value ?? 'API null'}</span>
                </div>
                <div>
                  <span class="text-base text-red-600">${item.original_price} ₫</span>
                  <span class="text-red-600 border border-red-600 rounded px-1 ml-1">-23%</span>
                </div>
                <div class="mt-1">
                  <img srcset="./src/imgs/rehonhoantien.png 2x" alt="">
                </div>
              </div>
            </div>
        <!-- End Item -->
          `
  }).join('\n')}
    
        </div>
      </div>
    </div>
</section>
  ${Footer()}
  `
}



export default HomePage