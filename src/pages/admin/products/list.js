// import 'bootstrap/dist/css/bootstrap.css';
import axios from 'axios';
import urlApi from '../../../config/config';
import { $, $$ } from '../../../utilities';
import HeaderAdmin from '../../../components/admin/headeradmin';
import { useState, useEffect, router } from '../../../lib';

const AdminProducts = () => {
    const [data, setData] = useState([])
    useEffect(() => {
        axios.get(urlApi)
            .then(({ data }) => {
                setData(data);
            })
    }, [])

    axios.get(urlApi)
        .then(() => {
            $$('.delete').forEach((btn) => {
                btn.addEventListener('click', function () {
                    const rs = confirm('Are you sure you want to delete this item ?');
                    if (rs) {
                        axios.delete(urlApi + '/' + `${this.dataset.id}`)
                            .then(() => {
                                router.navigate('/admin/products')
                            })
                    }
                })
            })

        })


    return `
    ${HeaderAdmin()}
    <a class="border border-[#000] px-10 py-2 rounded inline-block" href="/admin/product/add">
        <button>Add</button>
    </a>
    <table>
        <thead>
            <tr>
                <th scope="col">Id</th>
                <th scope="col">Title name</th>
                <th scope="col">Description</th>
                <th scope="col">Price</th>
                <th scope="col">Handle</th>
            </tr>
        </thead>
        <tbody>
            ${data.map((item) => {
        return `
                    <tr>
                        <th>${item.id}</th>
                        <td>${item.name}</td>
                        <td>${item.short_description || item.description}</td>
                        <td>${item.original_price}</td>
                        <td>
                            <a href="/admin/product/edit/${item.id}">
                                <button class="edit">Sửa</button>
                            </a>
                            <button data-id="${item.id}" class="delete">Xóa</button>
                        </td>
                    </tr>`
    }).join('')
        }
        </tbody>
    </table>
  `
}

export default AdminProducts