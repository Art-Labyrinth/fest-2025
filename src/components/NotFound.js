import React from "react";
import { Header } from "./Header/Header";
import Footer from "./Footer";

export default function NotFound() {
    return (
        <div className="bg-main min-h-screen flex flex-col">
            <Header />
            <div className="flex flex-col items-center align-middle justify-center text-center flex-grow">
                <h1>404</h1>
                <p>Страница не найдена</p>
            </div>
            <Footer backgroundColor="" />
        </div>
    );
}
