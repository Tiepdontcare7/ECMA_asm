// import 'bootstrap/dist/css/bootstrap.css';
import axios from 'axios';
import urlApi, { urlCate } from '../../../config/config';
import { $, $$ } from '../../../utilities';
import HeaderAdmin from '../../../components/admin/headeradmin';
import { useState, useEffect, router } from '../../../lib';
import Swal from 'sweetalert2';

const AdminProducts = () => {
    const [data, setData] = useState([])
    const [cate, setCate] = useState([])
    useEffect(() => {
        axios.get(urlApi)
            .then(({ data }) => {
                setData(data);
            })
    }, [])

    useEffect(() => {
        axios.get(urlCate)
            .then(({ data }) => {
                setCate(data)
            })
    }, [])

    useEffect(() => {
        $$('.delete').forEach((btn) => {
            btn.addEventListener('click', function () {
                Swal.fire({
                    title: 'Are you sure?',
                    text: "You won't be able to revert this!",
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Yes, delete it!'
                }).then((result) => {
                    if (result.isConfirmed) {
                        axios.delete(urlApi + '/' + `${this.dataset.id}`)
                            .then(() => {
                                Swal.fire(
                                    'Deleted!',
                                    'Your file has been deleted.',
                                    'success'
                                ).then(() => {
                                    router.navigate('/admin/products')
                                })
                            })
                    }
                })
            })
        })
    })

    useEffect(() => {
        $('#form-search').addEventListener('submit', (e) => {
            e.preventDefault();
            const valueInput = $('.search-admin').value
            axios.get(urlApi)
                .then(({ data }) => {
                    const datafilter = data.filter(data => data.name.toLowerCase().includes(valueInput.toLowerCase()));
                    setData(datafilter)
                })

        })
    })



    return `
    ${HeaderAdmin()}
    <a class="border float-right my-4 bg-blue-400 text-white border-[#000] px-10 py-2 rounded inline-block" href="#/admin/product/add">
        <button>Add</button>
    </a>
    <table>
        <thead>
            <tr>
                <th scope="col">Id</th>
                <th scope="col">Title name</th>
                <th scope="col">Category</th>
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
                        <td>
                            ${(cate.find(i => { return i.id == item.category }))?.name == undefined ? 'undefined' : (cate.find(i => i.id == item.category))?.name
            }
                        </td>
                        <td>${item.short_description || item.description}</td>
                        <td>${item.original_price}</td>
                        <td>
                            <a href="#/admin/product/edit/${item.id}">
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