import React from "react";
import ReactDOM from 'react-dom/client';
import App from "./pages/App.js";
import "./index.css";
import routes from "./routes.js"
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { UserProvider } from "./contexts/UserContext.js";
import { BookingProvider } from "./contexts/BookingContext.js";

const router = createBrowserRouter(routes);

const container = document.getElementById("root");
const root = ReactDOM.createRoot(container);

root.render(
    <BookingProvider >
        <UserProvider >
            <RouterProvider router={router} >
                <App />
            </RouterProvider>
        </UserProvider>
    </BookingProvider>
);
