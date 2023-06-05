import urlApi, { urlCate } from "../../../config/config";
import axios from "axios";
import { $$, Validate } from "../../../utilities";
import { router, useEffect, useState } from "../../../lib";

const AdminProductAdd = () => {
    const [cate, setCate] = useState([]);

    useEffect(() => {
        axios.get(urlCate)
        .then(({ data }) => {
            setCate(data);
        });
    }, []);

    axios.get(urlApi).then(() => {
        Validate.isText(".title");
        Validate.isText(".description");
        Validate.isImage(".image");

        document.querySelector(".add").addEventListener("submit", (e) => {
            e.preventDefault();
            const title = document.querySelector(".title");
            const desc = document.querySelector(".description");
            const price = document.querySelector(".price");
            const image = document.querySelector(".image");
            const cate = document.querySelector(".category");
            const post = {
                name: title.value,
                category: cate.value,
                description: desc.value,
                short_description: desc.value,
                list_price: price.value,
                original_price: price.value,
                images:
                    image.value === ""
                        ? ["https://picsum.photos/250/370"]
                        : [image.value],
            };

            let check = true;
            $$(".err").forEach((e) => {
                if (e.textContent != "") {
                    check = false;
                }
            });
            if (check) {
                axios.post(urlApi, post).then(() => {
                    router.navigate("admin/products/");
                    alert(`Success Added Product: ${title.value}`);
                });
            }
        });
    });

    return `
    <div class="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
    <div class="mx-auto max-w-lg">
        <form
        id="form-add"
        action=""
        class="add mb-0 mt-6 space-y-4 rounded-lg p-4 shadow-lg sm:p-6 lg:p-8"
        >
        <p class="text-center text-lg font-medium">Add</p>

        <div class="form-group">
            <label for="email" class="sr-only">Email</label>

            <div class="relative">
            <input
                type="text"
                class="title w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                placeholder="title"
            />
            </div>
            <div class="err text-red-500 text-sm"></div>
        </div>

        <div class="form-group">
            <label for="email" class="sr-only">Email</label>

            <div class="relative">
                <input
                    type="text"
                    class="image w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                    placeholder="link image"
                />
            </div>
            <div class="err text-red-500 text-sm"></div>
        </div>

        <div>
            <label for="email" class="sr-only">Email</label>

            <div class="relative">
            <select class="category w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm text-gray-500">
            ${cate
            .map((i) => {
                return ` 
                    <option value="${i.name}">${i.name}</option>
                    `;
            })
            .join("")}
            </select>
            </div>
        </div>

        <div class="form-group">
            <label for="password" class="sr-only">Password</label>

            <div class="relative">
            <input
                type="text"
                class="description w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                placeholder="Description"
            />
            </div>
            <div class="err text-red-500 text-sm"></div>
        </div>

        <div class="form-group">
        <label for="password" class="sr-only">Password</label>

        <div class="relative">
        <input
            type="number"
            class="price w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
            placeholder="Price"
        />
        </div>
        <div class="err text-red-500 text-sm"></div>
    </div>

        <button
            type="submit"
            class="block w-full rounded-lg bg-indigo-600 px-5 py-3 text-sm font-medium text-white"
        >
            Add new
        </button>
        </form>
    </div>
    </div>
  `;
};

export default AdminProductAdd;
