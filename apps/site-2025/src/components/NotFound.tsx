import React from "react";
import { Header } from "./Header/Header";
import Footer from "./Footer/Footer";

export default function NotFound() {
    return (
        <div className="bg-main min-h-screen flex flex-col">
            <Header />
            <div className="flex flex-col flex-grow bg-cover bg-center
            bg-[url('https://files.art-labyrinth.org/fest2025/svg/404.svg')]
            ">
                <h1 className="text-[8rem] sm:text-[11rem] text-[#5A5C3F] font-['IBM_Plex_Mono'] mx-auto pt-10">404</h1>
            </div>
            <Footer backgroundColor="" />
        </div>
    );
}
