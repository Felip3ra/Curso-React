import { createBrowserRouter } from "react-router";

import { Home } from "./pages/home";
import { Sobre } from "./pages/sobre";
import { Contato } from "./pages/contato";
import { Produto } from "./pages/produto";
import { NotFound } from "./pages/notfound";
const router = createBrowserRouter([
    {
        path: "/",
        element: <Home/>
    },
    {
        path: "/sobre",
        element: <Sobre/>   
    },
    {
        path: "/contato",
        element: <Contato/>
    },
    {
        path: "/produto/:id",
        element: <Produto/>
    },
    {
        //ultima rota, caso nenhuma das outras seja encontrada
        path: "*",
        element: <NotFound/>
    }
])

export {router};