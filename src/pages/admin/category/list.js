import axios from "axios"
import HeaderAdmin from "../../../components/admin/headeradmin"
import { useEffect, useState, router } from "../../../lib"
import { urlCate } from "../../../config/config"
import { $$ } from "../../../utilities"

import Swal from "sweetalert2"

const AdminCategory = () => {
  const [data, setData] = useState([])
  useEffect(() => {
    axios.get(urlCate)
      .then(({ data }) => {
        setData(data)
      })
  }, [])

  useEffect(() => {
    $$('.delete').forEach((btn) => {
      btn.addEventListener('click', function (e) {
        e.preventDefault()
        // const rs = confirm('Are you sure you want to delete this item ?');
        // if (rs) {
        //   axios.delete(urlCate + '/' + `${this.dataset.id}`)
        //     .then(() => {
        //       router.navigate('/admin/category')
        //     })
        // }
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
            axios.delete(urlCate + '/' + `${this.dataset.id}`)
              .then(() => {
                Swal.fire(
                  'Deleted!',
                  'Your file has been deleted.',
                  'success'
                )
                router.navigate('/admin/category')
              })
          }
        })
      })
    })

  })

  return `
    ${HeaderAdmin()}
    <div class="overflow-x-auto">
      <table class="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
        <thead class="ltr:text-left rtl:text-right">
          <tr>
            <th class="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
              id
            </th>
            <th class="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
              Name Category
            </th>
            <th>Chức năng</th>
          </tr>
        </thead>

        <tbody class="divide-y divide-gray-200">
          ${data.map(e => {
            return `
                <tr>
                  <td class="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                    ${e.id}
                  </td>
                  <td class="whitespace-nowrap px-4 py-2 text-gray-700">${e.name}</td>
                  <td class="whitespace-nowrap px-4 py-2">
                    <a href="#/admin/category/edit/${e.id}" class="inline-block rounded bg-indigo-600 px-4 py-2 text-xs font-medium text-white hover:bg-indigo-700">
                      Edit
                    </a>
                    <a data-id="${e.id}" href="#" class="delete inline-block rounded bg-indigo-600 px-4 py-2 text-xs font-medium text-white hover:bg-indigo-700">
                      Delete
                    </a>
                  </td>
                </tr>
              `
  }).join('')
    }
        </tbody>
      </table>
      <div class="float-right mt-5">
        <a href="#/admin/category/add" class="inline-block py-3 px-7 rounded bg-indigo-600 px-4 py-2 text-xs font-medium text-white hover:bg-indigo-700">
        Add new
        </a>
      </div>
    </div>

  `
}

export default AdminCategory