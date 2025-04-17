import React from "react";
import { Logo } from "../Svg/Logo";
import SocialTelegram from "../Svg/SocialTelegram";
import SocialInstagram from "../Svg/SocialInstagram";
import SocialFacebook from "../Svg/SocialFacebook";

export default function Footer() {
    return (
        // flex flex-col sm:flex-row p-6 max-md:px-8 max-sm:px-5 justify-between items-center text-brown font-deledda relative
        <footer className="flex flex-col sm:flex-row px-16 pt-12 pb-8 w-full min-h-48 max-md:px-5 max-md:max-w-full gap-5 relative">
            <a href="/" className="relative 2xl:left-56 lg:left-36 md:left-16 sm:left-5 py-6">
                <Logo />
            </a>
            <div className="flex flex-wrap gap-5 w-full sm:w-7/12 justify-start py-2 max-md:px-5 max-md:max-w-full mx-auto">
                <div className="flex flex-col justify-center items-start">
                    <div className="font-bold text-yellow-950">
                        Контакты
                    </div>
                    <div className="text-sm text-yellow-950 mt-3">
                        +373 XXX-XXX-XXX
                    </div>
                    <div className="text-sm text-yellow-950">
                        xxx@gmail.com
                    </div>
                    <div className="flex gap-3 items-center mt-3">
                        <SocialTelegram />
                        <SocialInstagram />
                        <SocialFacebook />
                    </div>
                </div>

            </div>
        </footer>
    );
}

