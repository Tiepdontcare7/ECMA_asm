import Header from "../../components/client/header"
import Footer from "../../components/client/footer"
import urlApi from "../../config/config";
import axios from "axios";
import { router } from "../../lib";
import { useState, useEffect } from "../../lib";

const ProductDetail = ({ id }) => {
  const [cate, setCate] = useState([])
  const [data, setData] = useState([])

  useEffect(() => {
    axios.get(urlApi)
      .then(({ data }) => {
        const dataFilter = data.find(item => item.id === +id)

        if (dataFilter == undefined) router.navigate('/not')
        setData(dataFilter)

        const cate = data.filter(item => item.category === +dataFilter.category && item.id != dataFilter.id)
        setCate(cate)
      })
  }, [])


  useEffect(() => {
      //QUANTITY PRODUCT
      const quantityInput = document.querySelector('.number');
      document.querySelector('.add').addEventListener('click', () => {
        quantityInput.value = parseInt(quantityInput.value) + 1;
      });
      document.querySelector('.remove').addEventListener('click', () => {
        const currentValue = parseInt(quantityInput.value);
        if (currentValue > 1) quantityInput.value = currentValue - 1;
      });
    })


  return `
    ${Header()}
    <div class="path-bar bg-[#F5F5FA] flex items-center max-w-[1440px] mx-auto py-1 px-28">
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

      <div class="flex items-center">
        <span class="relative top-[2px]">
          <ion-icon name="chevron-forward-outline"></ion-icon>
        </span>
        <a href="#" class="text-[13px] pl-[2px]">
          ${data.name}
        </a>
      </div>
    </div>
    
    <section class="detail">

      <div class="max-w-[1440px] mx-auto px-28 pt-5 pb-[100px]">
              
        <!-- Sản phẩm -->
        <div class="flex product-detail max-w-[900px]">
          <div>
            <div class="mb-4">
              <img srcset="${data.images?.[0]} 2x" alt="">
            </div>
            <ul class="grid grid-cols-5">
              
              ${data.images?.map((img) => {
    return `
                  <li>
                    <a href="#">
                      <img class="w-[100px] h-[100px]" srcset="${img} 2x" alt="">
                    </a>
                  </li>
                `
  }).join('')}
            </ul>
          </div>

          <div class="border-l-[1px] border-[#ccc] pl-3 pt-5">
            <div class="border- border-b-[1px] pb-3">
              <div>
                <span>
                  Tác giả:
                  <span class="text-[#0D5CB6]">Ca Tây</span>
                </span>
                <span>
                  Đứng thứ 13 trong
                  <span class="text-[#0D5CB6]">
                    Top 1000
                    <span>Sách tư duy - Kỹ năng sống <span>bán chạy tháng này</span></span>
                  </span>
                </span>
              </div>
              <h3 class="text-2xl">${data.name}</h3>
              <div class="flex items-center gap-x-2 my-1">
                <ul class="flex items-center">
                  <li><ion-icon name="star"></ion-icon></li>
                  <li><ion-icon name="star"></ion-icon></li>
                  <li><ion-icon name="star"></ion-icon></li>
                  <li><ion-icon name="star"></ion-icon></li>
                  <li><ion-icon name="star"></ion-icon></li>
                </ul>
                <span class="text-[#787878] text-xs block">(Xem 2942 đánh giá)</span>
                <span class="text-[#787878] text-xs block border-l border-[#ccc] pl-2">Đã bán ${data?.quantity_sold?.text ?? 'API null'}</span>
              </div>

              <div class="bg-[#FAFAFA] pl-5 pt-5 pr-7 pb-10 mt-4">
                <div>
                  <span class="text-3xl text-red-600">${data.list_price} ₫</span>
                  <span class="text-xs text-[#808089] line-through mx-1">369.700 ₫</span>
                  <span class="text-red-600 border border-red-600 rounded px-1 ml-1">-23%</span>
                </div>
              </div>
            </div>

            <div class="pt-9 pl-2">
              <span>Số Lượng</span>
              <div class="mt-3">
                <button class="remove border px-2 pt-1"><ion-icon name="remove-outline"></ion-icon></button>
                <input class="number border outline-0 text-center p-[2px] w-12 relative bottom-[2px]" autofocus
                  type="number" value="1">
                <button class="add border px-2 pt-1"><ion-icon name="add-outline"></ion-icon></button>
              </div>

              <button class="bg-[#FF3945] py-3 px-28 text-white mt-7 rounded hover:opacity-70">Chọn mua</button>
            </div>
          </div>
        </div>

        <!-- Sản phẩm tương tự -->
        <div class="mt-12">
          <span class="text-xl block mb-6">Sản Phẩm Tương Tự</span>
          <div class="grid grid-cols-6 gap-x-6">
            ${cate.map((item) => {
    return `
                    <div>
                    <div>
                    <a href="#/product/${item.id}">
                      <img srcset="${item.images[0]} 2x" alt="">
                    </a>
                    </div>
                    <div>
                      <div class="mb-2 relative bottom-2">
                        <img srcset="/src/imgs/detail-freeship.png 2x" alt="">
                      </div>
                      <span class="item-title mb-2">${item.name}</span>
                      <div class="flex items-center gap-x-2 my-1">
                        <ul class="flex items-center">
                          <li><ion-icon name="star"></ion-icon></li>
                          <li><ion-icon name="star"></ion-icon></li>
                          <li><ion-icon name="star"></ion-icon></li>
                          <li><ion-icon name="star"></ion-icon></li>
                          <li><ion-icon name="star"></ion-icon></li>
                        </ul>
                        <span class="text-[#787878] text-xs block border-l border-[#ccc] pl-2">Đã bán ${item?.quantity_sold?.text ?? 'API null'}</span>
                      </div>
                      <div>
                        <span class="text-base text-red-600">${item.list_price} ₫</span>
                        <span class="text-red-600 border border-red-600 rounded px-1 ml-1">-23%</span>
                      </div>
                      <div class="mt-1">
                        <img srcset="/src/imgs/rehonhoantien.png 2x" alt="">
                      </div>
                    </div>
                  </div>
                  <!-- End Item -->
              `
  }).join('')}
            
            
          </div>
        </div>

        <!-- Thông tin chi tiết -->
        <div class="mt-12">
          <span class="text-xl block mb-6">Thông tin chi tiết</span>

          <table class="striped-table">
            <tr>
              <th>Công ty phát hành</th>
              <td>Bloom Books</td>
            </tr>
            <tr>
              <th>Ngày xuất bản</th>
              <td>2020-09-01 00:00:00</td>
            </tr>
            <tr>
              <th>Kích thước</th>
              <td>14.5 x 20 cm</td>
            </tr>
            <tr>
              <th>Dịch Giả</th>
              <td>Tuyết Mai</td>
            </tr>
            <tr>
              <th>Loại bìa</th>
              <td>Bìa mềm</td>
            </tr>
            <tr>
              <th>Số trang</th>
              <td>288</td>
            </tr>
            <tr>
              <th>Nhà xuất bản</th>
              <td>Nhà Xuất Bản Thế Giới</td>
            </tr>
          </table>
        </div>

        <!-- Mô tả sản phẩm -->
        <div class="mt-12">
          <span class="text-xl block mb-6">Mô Tả Sản Phẩm</span>
          <div class="desc-detail">
              <p>
              ${data.description}
            </p>
            <div class="text-center">
              <button class="text-[#189EFF] border-[1px] border-[#189EFF] py-2 rounded px-10 hover:bg-[#189eff] hover:text-white">Xem Thêm Nội Dung</button>
            </div>
          
          </div>
        </div>
      </div>
    </div>
    </section>
    ${Footer()}
  `
}

export default ProductDetail