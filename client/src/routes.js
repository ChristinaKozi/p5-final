import ErrorPage from "./pages/ErrorPage";
import App from "./pages/App";
import Venues from "./pages/Venues"
import Vendors from "./pages/Vendors"
import Entertainment from "./pages/Entertainment"
import UserProfile from "./pages/UserProfile";
import Login from "./pages/Login";

const routes = [
    {
        path: "/login",
        element: <Login />,
        errorElement: <ErrorPage />
    },
    {
        path: "/",
        element: <App />,
        errorElement: <ErrorPage />
    },
    {
        path: "/venues",
        element: <Venues />,
        errorElement: <ErrorPage />
    },
    {
        path: "/vendors",
        element: <Vendors />,
        errorElement: <ErrorPage />
    },
    {
        path: "/entertainment",
        element: <Entertainment />,
        errorElement: <ErrorPage />
    },
    {
        path: "/user",
        element: <UserProfile />,
        errorElement: <ErrorPage />
    }
]

export default routes;