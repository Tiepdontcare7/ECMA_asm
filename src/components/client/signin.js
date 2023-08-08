import { router, useEffect } from '../../lib';
import { $, findUserByName, comparePassword } from '../../utilities';
import Joi from 'joi';

const schema = Joi.object({
    username: Joi.string().min(4),
    password: Joi.string().min(4),
});

const Signin = () => {
    useEffect(() => {
        const username = $('.username');
        const password = $('.password');

        $('.signin').addEventListener(
            'submit',
            async (e) => {
                e.preventDefault();
                const user = {
                    username: username.value,
                    password: password.value,
                };
                const {
                    error,
                    value: { name },
                } = schema.validate(user);

                const userFilter = await findUserByName(user.username);

                if (error) {
                    alert(error.message);
                } else if (userFilter) {
                    comparePassword(userFilter, user)
                        .then((data) => {
                            if (data.role == 0) {
                                alert('Đăng nhập thành công!');
                                // localStorage.setItem('data', JSON.stringify(data));
                                localStorage.setItem('data', JSON.stringify({ username: data.username }));
                                router.navigate('/');
                            } else {
                                alert('Bạn đã đăng nhập với tư cách quản trị viên!');
                                router.navigate('/admin/products');
                            }
                        })
                        .catch((error) => {
                            alert(error);
                        });
                } else {
                    alert('Tài khoản không chính xác! Kiểm tra lại');
                }
            },
            [],
        );
    });
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
                <input tabindex="0"
                    type="text"
                    class="username w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                    placeholder="Username"
                />
                </div>
            </div>

            <div>
                <label for="password" class="sr-only">Password</label>

                <div class="relative">
                <input tabindex="1"
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

  `;
};

export default Signin;
