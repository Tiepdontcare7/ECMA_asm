import { useEffect, useState } from '../../lib';
import { findUserByName, $, $$ } from '../../utilities';
import Header from '../../components/client/header';
import axios from 'axios';
import { urlUsers } from '../../config/config';

const Card = () => {
    const [data, setData] = useState([]);

    useEffect(async () => {
        const userLocal = JSON.parse(localStorage.getItem('data'));
        const userFilter = await findUserByName(userLocal.username);

        setData(userFilter.card);
    }, []);

    useEffect(async () => {
        const userLocal = JSON.parse(localStorage.getItem('data'));
        const userFilter = await findUserByName(userLocal.username);
        let sum = 0;
        userFilter.card.forEach((e) => {
            sum += 1;
        });
        $('.quantity-card').textContent = sum;

        //Tổng price
        cm: $('.price').textContent = data.reduce((sum, e) => sum + Number(e.price * e.quantity), 0);
    });

    useEffect(async () => {
        const userLocal = JSON.parse(localStorage.getItem('data'));
        const userFilter = await findUserByName(userLocal.username);

        $$('.delete').forEach((btn) => {
            btn.onclick = function () {
                const index = this.dataset.index;
                userFilter.card.splice(index, 1);

                axios.put(urlUsers + '/' + userFilter.id, userFilter);
                setData(userFilter.card);
            };
        });
    });

    return `
  ${Header()}
    <div class="overflow-x-auto">
      <table class="min-w-full my-10 divide-y-2 divide-gray-200 bg-white text-sm">
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
        ${data
            .map((item, index) => {
                return `
            <tr>
              <td class="text-center whitespace-nowrap py-2 text-gray-900">
                <img class="w-full max-w-[150px] block mx-auto" src="${item.image}"/>
              </td>
              <td class="whitespace-nowrap px-4 py-2 text-gray-700">${item.quantity}</td>
              <td class="whitespace-nowrap px-4 py-2 text-gray-700">${item.name}</td>
              <td class="whitespace-nowrap px-4 py-2 text-gray-700">${item.price}</td>
              <td class="whitespace-nowrap px-4 py-2">
                <button data-index="${index}" class="delete inline-block rounded bg-indigo-600 px-4 py-2 text-xs font-medium text-white hover:bg-indigo-700">
                  Delete
                </button>
              </td>
            </tr>
          `;
            })
            .join('')}

        </tbody>
      </table>

      ${
          data.length == 0
              ? `
        <div class="py-10">
          <img class="block mx-auto" src="https://bizweb.dktcdn.net/100/320/202/themes/714916/assets/empty-cart.png?1650292912948" />
        </div>
        `
              : ''
      }

      <div class="border-t border-[#ccc]">
        <span>Cái giá phải trả: </span>
        <span class="price text-blue-500">0</span>
      </div>
      <button>Thanh toán</button>
    </div>

  `;
};

export default Card;
