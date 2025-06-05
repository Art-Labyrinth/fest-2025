import React from "react";
import { Header } from "../Header/Header";
import { useTranslation } from "react-i18next";
import Footer from "../Footer";

export default function Fail() {
    const { t } = useTranslation();


    return (
        <div className="flex flex-col min-h-screen bg-main">
            <Header />
            <div
                className="flex flex-grow relative bg-cover items-center text-center
                bg-[url('https://files.art-labyrinth.org/fest2025/contribute/sm_contribute_hero_1.webp')]
                md:bg-[url('https://files.art-labyrinth.org/fest2025/contribute/md_contribute_hero_1.webp')]
                lg:bg-[url('https://files.art-labyrinth.org/fest2025/contribute/lg_contribute_hero_1.webp')]
                xl:bg-[url('https://files.art-labyrinth.org/fest2025/contribute/xl_contribute_hero_1.webp')]
                2xl:bg-[url('https://files.art-labyrinth.org/fest2025/contribute/2xl_contribute_hero_1.webp')]
            ">
                <div className="absolute inset-0 bg-[#35190499] bg-opacity-60"></div>
                <div className="flex flex-col relative px-4 z-10 max-w-lg mx-auto">
                    <h1 className="text-4xl font-semibold text-brown mb-4 text-[#F4E4C3] uppercase">
                        {t("contribute.fail.header")}
                    </h1>
                    <div className="p-6 text-[#F4E4C3] font-deledda">
                        <p className="text-brown text-xl">
                            {t("contribute.fail.text")}
                        </p>
                    </div>
                </div>
            </div>
            <Footer backgroundColor="" />
        </div>
    );
}