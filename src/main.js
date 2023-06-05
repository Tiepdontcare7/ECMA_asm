import { render, router } from "../src/lib/index";

import HomePage from "./pages/client/home";
import ProductDetail from "./pages/client/productDetail";
import NotFoundPage from "./components/404";

import AdminProducts from "./pages/admin/products/list";
import AdminProductAdd from "./pages/admin/products/add";
import AdminProductEdit from "./pages/admin/products/edit";
import AdminCategory from "./pages/admin/category/list";


router.on({
    "/": () => render(HomePage, app),
    "/product/:id": ({ data }) => {
        render(() => ProductDetail(data), app),
            window.scrollTo(0, 0)
    },
    
    
    //Admin
    "/admin/products": () => render(AdminProducts,app),
    "/admin/product/add": () => render(AdminProductAdd,app),
    "/admin/product/edit/:id": ({ data }) => render(() => AdminProductEdit(data), app),
    "/admin/category": () => render(AdminCategory, app),
    "/not": () => render(NotFoundPage, app)
}),

router.notFound(() => {
    render(NotFoundPage, app);
})

router.resolve();




















