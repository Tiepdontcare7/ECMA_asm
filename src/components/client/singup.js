import { router, useEffect } from "../../lib"
import { $ } from "../../utilities"

const Signup = () => {
    useEffect(() => {
        const username = $(".username")
        const password = $(".password")
        const cfpassword = $('.cfpassword')
        $('.signup').addEventListener('submit', (e) => {
            e.preventDefault();
            const user = {
                username: username.value,
                password: password.value,
                cfpassword: cfpassword.value
            }
            const userStore = localStorage.getItem(user.username)
            if(userStore != null){
                alert('Account đã tồn tại!')
            }else if(!user.username || !user.password || !user.cfpassword){
                alert('Không bỏ trống!')
            }
            else{
                localStorage.setItem(user.username, JSON.stringify(user))
                alert('Đăng ký thành công, hãy đăng nhập!')
                router.navigate('/')
            }
        })
    },[])
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

            <form action="" class="signup mb-0 mt-6 space-y-4 rounded-lg p-4 shadow-lg sm:p-6 lg:p-8">
            <p class="text-center text-lg font-medium">Sign up now</p>

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

            <div>
                <label for="password" class="sr-only">Password</label>

                <div class="relative">
                <input
                    type="password"
                    class="cfpassword w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                    placeholder="Confirm password"
                />
                </div>
            </div>

            <button type="submit" class="block w-full rounded-lg bg-indigo-600 px-5 py-3 text-sm font-medium text-white">
                Sign up
            </button>

            <p class="text-center text-sm text-gray-500">
                <a class="underline" href="#/account/signin">Sign in</a>
            </p>
            </form>
        </div>
        </div>

  `
}

export default Signup