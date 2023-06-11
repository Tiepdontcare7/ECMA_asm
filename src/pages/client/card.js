import { useEffect, useState } from "../../lib"
import { findUserByName , $} from "../../utilities"
import { urlUsers } from "../../config/config"
import axios from "axios"
import Header from "../../components/client/header"

const Card = () => {
  const [data, setData] = useState([])

  useEffect(async() =>{

    const userLocal = JSON.parse(localStorage.getItem('data'))
    const userFilter = await findUserByName(userLocal.username)
    
    setData(userFilter.card)

    
  },[])
  
  useEffect(async() => {
    const userLocal = JSON.parse(localStorage.getItem('data'))
    const userFilter = await findUserByName(userLocal.username)
    let sum = 0
    userFilter.card.forEach((e) => {
      sum += 1
    });
    $('.quantity-card').textContent = sum
  })

  return `
  ${Header()}
    <div class="overflow-x-auto">
    <h1>Card</h1>
      <table class="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
        <thead class="ltr:text-left rtl:text-right">
          <tr>
            <th class="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
              Name
            </th>
            <th class="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
              Quantity
            </th>
            <th class="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
              Name
            </th>
            <th class="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
              Salary
            </th>
            <th class="px-4 py-2"></th>
          </tr>
        </thead>

        <tbody class="divide-y divide-gray-200">
        ${data.map((item)=>{
          return `
            <tr>
              <td class="text-center whitespace-nowrap py-2 text-gray-900">
                <img class="w-full max-w-[150px] block mx-auto" src="${item.image}"/>
              </td>
              <td class="whitespace-nowrap px-4 py-2 text-gray-700">${item.quantity}</td>
              <td class="whitespace-nowrap px-4 py-2 text-gray-700">${item.name}</td>
              <td class="whitespace-nowrap px-4 py-2 text-gray-700">${item.price}</td>
              <td class="whitespace-nowrap px-4 py-2">
                <a
                  href="#"
                  class="inline-block rounded bg-indigo-600 px-4 py-2 text-xs font-medium text-white hover:bg-indigo-700"
                >
                  Delete
                </a>
              </td>
            </tr>
          `
        }).join('')

        }

        </tbody>
      </table>
      <div>
        <span>Tổng tiền: </span>
        <span>0</span>
      </div>
      <button>Thanh toán</button>
    </div>

  `
}

export default Card