// import 'bootstrap/dist/css/bootstrap.css';
import axios from 'axios';
import urlApi from '../../config/config';
import { router, $, $$ } from '../../utilities';

const AdminProducts = () => {
    (() => {
        axios.get(urlApi)
            .then(({ data }) => {
                const html = data.map((item) => {
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
                $('tbody').innerHTML = html;

                $$('.delete').forEach((btn)=>{
                    btn.addEventListener('click', function(){
                        const rs = confirm('Are you sure you want to delete this item ?');
                        if(rs){
                            axios.delete(urlApi + '/' + `${this.dataset.id}`)
                            .then(()=>{
                                // router.navigate('/admin/products')
                                window.location.reload();
                            })
                        }
                        
                    })
                })

            })
    })();

    return `
    <a href="admin/product/add">add</a>
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
            
        </tbody>
    </table>
  `
}

export default AdminProducts