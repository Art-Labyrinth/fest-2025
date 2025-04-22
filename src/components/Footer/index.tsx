import { Logo } from "../Svg/Logo";
import SocialTelegram from "../Svg/SocialTelegram";
import SocialInstagram from "../Svg/SocialInstagram";
import SocialFacebook from "../Svg/SocialFacebook";
import { useNavigate } from "react-router-dom";

export default function Footer() {
    const navigate = useNavigate();

    return (
        <footer className="flex flex-wrap px-16 pt-12 pb-8 w-full min-h-48 max-md:px-5 max-md:max-w-full gap-5 bg-main" onClick={() => navigate('/')}>
            <div className="relative left-[10%] py-5 w-12">
                <Logo />
            </div>
            <div className="flex flex-wrap gap-5 w-full sm:w-7/12 justify-start py-2 max-md:px-5 max-md:max-w-full mx-auto">
                <div className="flex flex-col justify-center items-start px-10">
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

