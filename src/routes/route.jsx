import { createBrowserRouter } from "react-router-dom";
import Login from "../pages/Login";
import Items from "../pages/Items/Items";
import Dashbord from "../pages/Dashbord/Dashbord";
import ItemAdd from "../components/ItemAdd/ItemAdd";
import ShowItem from "../components/ShowItem/ShowItem";
import EditItem from "../components/EditItem/EditItem";


export const route = createBrowserRouter([
    {
        path: "/",
        element: <Dashbord /> ,
        children: [
            {
                path: "/items",
                element: <Items />,
            },
            {
                path: "/items/add",
                element: <ItemAdd />,
            },
            {
                path: "/item/:id",
                element: <ShowItem />,
            },
            {
                path: "/item/edit/:id",
                element: <EditItem />,
            },
        ],
    },
    {
        path: "/login",
        element: <Login />,
    },
]);