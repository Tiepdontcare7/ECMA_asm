import { render, router } from "../src/utilities/index";

import HomePage from "../src/pages/home";
import ProductDetail from "./pages/productDetail";
import NotFoundPage from "./pages/notfoundpage";

import AdminProducts from "./pages/admin/list";
import AdminProductAdd from "./pages/admin/add";
import AdminProductEdit from "./pages/admin/edit";


router.on({
    "/": () => render(HomePage),
    "/product/:id": ({data}) => {
        render(() => ProductDetail(data)),
        window.scrollTo(0, 0) 
    },
    

    //Admin
    "/admin/products": () => render(AdminProducts),
    "/admin/product/add": () => render(AdminProductAdd),
    "/admin/product/edit/:id": ({data}) => render(() => AdminProductEdit(data)),
    "/not": () => render(NotFoundPage)
}),

router.notFound(() => {
    render(NotFoundPage);
})

router.resolve();




















