import {LoginPage} from "../pages/LoginPage";
import {RegisterPage} from "../pages/RegisterPage";
import {MessengerPage} from "../pages/MessengerPage/MessengerPage";


export const loginRoutes = [
    {path : "/login", component: LoginPage, layout: null},
    {path: "/register", component: RegisterPage, layout: null}
]

export const privateRoutes = [
    {path: "/", component: MessengerPage, layout: null}
]