import { useTranslation } from 'react-i18next';
export default function About() {
    const { t } = useTranslation();
    const features = t("about.features", { returnObjects: true }) as string[];

    return (
        <div className="flex flex-col">
            <div className="relative w-full">
                <picture>
                    <source media="(min-width: 1536px)" srcSet={`${process.env.PUBLIC_URL}/Home/block2/2xl_background.webp`} />
                    <source media="(min-width: 1280px)" srcSet={`${process.env.PUBLIC_URL}/Home/block2/xl_background.webp`} />
                    <source media="(min-width: 1024px)" srcSet={`${process.env.PUBLIC_URL}/Home/block2/lg_background.webp`} />
                    <source media="(min-width: 768px)" srcSet={`${process.env.PUBLIC_URL}/Home/block2/md_background.webp`} />
                    <img
                        src={`${process.env.PUBLIC_URL}/Home/block2/sm_background.webp`}
                        alt=""
                        className="absolute inset-0 w-full h-full object-cover object-center"
                    />
                </picture>
                <div className="flex flex-col bg-[#35190499]/60 relative px-5 py-16 sm:py-24 items-center text-center text-orange-150 w-full font-roca">
                    <img
                        src={`${process.env.PUBLIC_URL}/Home/block2/location.svg`}
                        alt=""
                        className="h-14 sm:h-20 mb-6"
                    />
                    <h1 className="text-3xl sm:text-5xl mb-6 uppercase leading-tight">{t("about.title")}</h1>
                    <p className="sm:text-lg max-w-3xl leading-relaxed">
                        {t("about.text_1")}
                    </p>
                </div>
            </div>

            <div className="flex flex-col md:flex-row items-start gap-8 sm:gap-12 bg-[#FFF9EC] sm:bg-[#F4E4C3] text-brown px-6 sm:px-28 py-16 sm:py-24">
                {/* Left: theme text */}
                <div className="flex-1">
                    <div className="flex flex-col sm:flex-row items-center sm:items-start gap-3 sm:gap-5">
                        <h1 className="text-3xl sm:text-4xl font-roca uppercase leading-tight text-center sm:text-left">
                            {t("about.theme_label")} <br /> {t("about.theme_name")}
                        </h1>
                        <img
                            src={`${process.env.PUBLIC_URL}/Home/block3/vector-spiral.svg`}
                            alt=""
                            className="w-32 sm:w-40 shrink-0"
                        />
                    </div>
                    <div className="mt-6 font-deledda space-y-4">
                        <p>{t("about.text_2")}</p>
                        <p>{t("about.text_3")}</p>
                        <p>{t("about.text_4")}</p>
                    </div>
                </div>
                {/* Right: fox + photo (pulled up so it nearly touches the block above).
                    Photo fills the column width and crops to a fixed height on desktop
                    (like block 4) so wide monitors don't leave an empty centre. */}
                <div className="flex-1 w-full flex flex-col items-center gap-1 md:-mt-24">
                    <img
                        src={`${process.env.PUBLIC_URL}/Home/block3/fox.svg`}
                        alt=""
                        className="w-[70%] max-w-md"
                    />
                    <img
                        src={`${process.env.PUBLIC_URL}/Home/block3/photo-tema-goda.webp`}
                        alt=""
                        className="w-full lg:h-96 lg:object-cover lg:object-center"
                    />
                </div>
            </div>

            <div className="flex flex-col-reverse md:flex-row items-stretch sm:px-20 pt-5 sm:pt-20 pb-0 sm:pb-20 bg-main gap-10">
                <div className="flex-1 flex sm:py-5 px-0">
                    <div className="w-32 hidden lg:flex justify-center">
                        <img src="https://files.art-labyrinth.org/fest2025/svg/moon.svg" alt="" />
                    </div>
                    <div className="w-full lg:w-10/12 h-full bg-about-sm-o-festivale bg-cover">
                        <div className="w-full h-full bg-[#F19C5533]/20 min-h-96"></div>
                    </div>
                </div>
                <div className="flex-1 flex py-5">
                    <div className="sm:w-10/12 px-5 sm:px-0">
                        <div className="flex flex-col sm:flex-row items-center sm:items-start justify-start">
                            <h1 className="text-3xl font-roca mb-4 uppercase whitespace-nowrap">{t("nav.about")}</h1>
                            <div className="w-3/12 pl-5">
                                <img src="https://files.art-labyrinth.org/fest2025/svg/squiggle.svg" alt="" />
                            </div>
                        </div>
                        <p className="my-5">
                            {t("about.theme_text_1")}
                        </p>
                        <p className="my-5">
                            {t("about.theme_text_2")}
                        </p>
                        <p className="my-5">
                            {t("about.theme_text_3")}
                        </p>
                        <p className="my-5">
                            {t("about.theme_text_4")}
                        </p>
                    </div>
                    <div className="w-32 hidden sm:flex justify-center">
                        <img src="https://files.art-labyrinth.org/fest2025/svg/moon.svg" alt="" />
                    </div>
                </div>
            </div>

            <div className="flex flex-col items-center bg-[#FFF9EC] sm:bg-[#F4E4C3] px-5 sm:px-20">
                <div className="hidden sm:block absolute w-3/12 left-0">
                    <img src="https://files.art-labyrinth.org/fest2025/svg/zodiac.svg" alt="" />
                </div>
                <div className="flex justify-center items-center w-full gap-5 mb-7 pt-20">
                    <h1 className="text-3xl font-roca uppercase">{t("about.features_title")}</h1>
                    <div className="hidden sm:block w-11">
                        <img src="https://files.art-labyrinth.org/fest2025/svg/three-dashes.svg" alt="" />
                    </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10 w-full max-w-7xl pb-20 px-10 sm:px-0">

                    <div className="flex flex-col items-center">
                        <div className="w-36 sm:w-48 h-60 sm:h-72 bg-about-md-live-music bg-cover bg-[50%] rounded-full">
                            <div className="w-full h-full bg-[#F19C5533]/20 rounded-full"></div>
                        </div>
                        <p className="mt-2 text-center">{Array.isArray(features) && features[0]}</p>
                    </div>
                    <div className="flex flex-col items-center">
                        <div className="w-36 sm:w-48 h-60 sm:h-72 bg-about-md-card-performance bg-cover bg-[90%] rounded-full">
                            <div className="w-full h-full bg-[#F19C5533]/20 rounded-full"></div>
                        </div>
                        <p className="mt-2 text-center">{Array.isArray(features) && features[1]}</p>
                    </div>
                    <div className="flex flex-col items-center">
                        <div className="w-36 sm:w-48 h-60 sm:h-72 bg-about-md-installation bg-cover bg-[93%] rounded-full">
                            <div className="w-full h-full bg-custom-red-black rounded-full"></div>
                        </div>
                        <p className="mt-2 text-center">{Array.isArray(features) && features[2]}</p>
                    </div>
                    <div className="flex flex-col items-center">
                        <div className="w-36 sm:w-48 h-60 sm:h-72 bg-about-md-workshops bg-cover bg-[50%] rounded-full">
                            <div className="w-full h-full bg-[#F19C5533]/20 rounded-full"></div>
                        </div>
                        <p className="mt-2 text-center">{Array.isArray(features) && features[3]}</p>
                    </div>

                    <div className="hidden lg:flex justify-center items-center w-28 mx-auto">
                        <img src="https://files.art-labyrinth.org/fest2025/svg/moon.svg" alt="" />
                    </div>
                    <div className="flex flex-col items-center">
                        <div className="w-36 sm:w-48 h-60 sm:h-72 bg-about-md-ecology bg-cover bg-[50%] rounded-full">
                            <div className="w-full h-full bg-custom-red-black rounded-full"></div>
                        </div>
                        <p className="mt-2 text-center">{Array.isArray(features) && features[4]}</p>
                    </div>
                    <div className="flex flex-col items-center">
                        <div className="w-36 sm:w-48 h-60 sm:h-72 bg-about-md-meditations bg-cover bg-[50%] rounded-full">
                            <div className="w-full h-full bg-custom-red-black rounded-full"></div>
                        </div>
                        <p className="mt-2 text-center">{Array.isArray(features) && features[5]}</p>
                    </div>
                    <div className="hidden lg:flex justify-center items-center w-28 mx-auto">
                        <img src="https://files.art-labyrinth.org/fest2025/svg/moon.svg" alt="" />
                    </div>

                </div>

            </div>

            <div className="flex flex-col items-center relative w-full">
                <div className="absolute inset-0 bg-about-md-art-labyrinth bg-cover bg-center"></div>
                <div className="flex flex-col bg-[#35190499]/70 w-full relative items-center text-orange-150 text-center p-5 sm:p-28">
                    <p className="font-deledda font-light max-w-2xl mb-5">
                        {t("about.closing")}
                    </p>
                </div>
            </div>
        </div>
    );
}
