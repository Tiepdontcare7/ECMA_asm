import { render, router, useEffect } from "../../lib"
import { $, login } from "../../utilities"
import Header from "./header"

const Signin = () => {
    useEffect(() => {
        const username = $(".username")
        const password = $(".password")
        $('.signin').addEventListener('submit', (e) => {
            e.preventDefault();
            const user = {
                username: username.value,
                password: password.value,
            }
            const userLocal = JSON.parse(localStorage.getItem(user.username))
            
            login(userLocal, user)
            .then((data) => {
                localStorage.setItem('data', JSON.stringify(data));
                router.navigate('/')
            })
            .catch((error) => {
                console.log(error);
            })

        })
    })
    return `
        <div class="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
        <div class="mx-auto max-w-lg">
            <h1 class="text-center text-2xl font-bold text-indigo-600 sm:text-3xl">
            Get started today
            </h1>

            <p class="mx-auto mt-4 max-w-md text-center text-gray-500">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Obcaecati sunt
            dolores deleniti inventore quaerat mollitia?
            </p>

            <form action="" class="signin mb-0 mt-6 space-y-4 rounded-lg p-4 shadow-lg sm:p-6 lg:p-8">
            <p class="text-center text-lg font-medium">Sign in to your account</p>

            <div>
                <label for="text" class="sr-only">Email</label>

                <div class="relative">
                <input
                    type="text"
                    class="username w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                    placeholder="Username"
                />
                </div>
            </div>

            <div>
                <label for="password" class="sr-only">Password</label>

                <div class="relative">
                <input
                    type="password"
                    class="password w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                    placeholder="Enter password"
                />
                </div>
            </div>


            <button type="submit" class="block w-full rounded-lg bg-indigo-600 px-5 py-3 text-sm font-medium text-white">
                Sign in
            </button>

            <p class="text-center text-sm text-gray-500">
            No account?
                <a class="underline" href="#/account/signup">Sign up</a>
            </p>
            </form>
        </div>
        </div>

  `
}

export default Signin