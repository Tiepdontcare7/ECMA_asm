const Account = () => {
    return `
        <div class="text-[12px] mt-[-4px]">
        <a href="#/account/signin">Đăng nhập</a>
        <a class="border-l border-[#fff] pl-1" href="#/account/signup">Đăng ký</a>
        </div>
        <div class="text-[12px] flex items-center">
        <a href="#">Tài khoản</a>
        <span class="mt-1 ml-[2px]">
            <ion-icon name="caret-down-outline"></ion-icon>
        </span>
        </div>
    `
}

export default Account