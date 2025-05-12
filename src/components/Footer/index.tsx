import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from 'react-i18next';

export default function Footer({ backgroundColor = "bg-main" }) {
    const navigate = useNavigate();

    const { t } = useTranslation();

    const [isMobile, setIsMobile] = useState(false);

    const backgroundClass = backgroundColor || "bg-main";

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 640);
        };

        handleResize();
        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    return (
        <footer className={`flex flex-wrap items-center sm:px-16 sm:pt-12 sm:pb-8 w-full sm:min-h-48 gap-5 ${backgroundClass}`}>
            <div className="relative left-[5%] sm:left-[10%] py-5 w-12" onClick={() => navigate('/')}>
                <img src="https://files.art-labyrinth.org/logo.svg" alt="" />
            </div>
            <div className="flex flex-wrap gap-5 w-[80%] sm:w-9/12 justify-start py-5 sm:py-2 px-5 mx-auto">
                <div className="flex flex-col justify-center items-start sm:px-10">
                    <div className="font-bold text-yellow-950">
                        {t("footer.contacts")}
                    </div>
                    <div className="text-sm text-yellow-950 mt-2 sm:mt-3">
                        {t("footer.tel")}
                    </div>
                    <div className="text-sm text-yellow-950">
                        {isMobile ? t("footer.email_mob") : t("footer.email")}
                    </div>
                    <div className="flex gap-3 items-center mt-3">
                        <img src="https://files.art-labyrinth.org/icons/tg.svg" alt="" className="w-5 contrast-75 hover:contrast-50 active:contrast-100" />
                        <img src="https://files.art-labyrinth.org/icons/fb.svg" alt="" className="w-5 contrast-75 hover:contrast-50 active:contrast-100" />
                        <img src="https://files.art-labyrinth.org/icons/in.svg" alt="" className="w-5 contrast-75 hover:contrast-50 active:contrast-100" />
                    </div>
                </div>

            </div>
        </footer>
    );
}

