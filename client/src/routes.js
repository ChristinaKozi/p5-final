import ErrorPage from "./pages/ErrorPage";
import App from "./pages/App";
import Venues from "./pages/Venues"
import Vendors from "./pages/Vendors"
import Entertainment from "./pages/Entertainment"
import UserProfile from "./pages/UserProfile";
import Login from "./pages/Login";
import Confirmation from "./pages/Confirmation";

const routes = [
    {
        path: "/",
        element: <App />,
        errorElement: <ErrorPage />
    },
    {
        path: "/login",
        element: <Login />,
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
        path: "/confirmation",
        element: <Confirmation />,
        errorElement: <ErrorPage />
    },
    {
        path: "/user",
        element: <UserProfile />,
        errorElement: <ErrorPage />
    }
]

export default routes;