import { Navigate, useRoutes } from "react-router-dom";
import HomeLayout from "@/layouts/home/HomeLayout";
import LandingPage from "@/pages/LandingPage";

export default function Router() {
    return useRoutes([
        {
            path: "/",
            element: <HomeLayout/>,
            children: [
                {element: <LandingPage/>, index: true},
            ],
        },
        {
            path: "*",
            element: <Navigate to="/404" replace/>,
        },
    ]);
}
