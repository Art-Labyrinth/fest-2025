import { useEffect, useState } from "react";
import About from "../About";
import Footer from "../Footer";
import { Header } from "../Header/Header";
import { useTranslation } from 'react-i18next';

function MainPage() {
  const [isMobile, setIsMobile] = useState(true);

  const { t } = useTranslation();

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
    <main>
      <div className="h-screen bg-main">
        <Header />

        {!isMobile && (
          <>
            <img className="absolute left-[10%] top-[15%] w-44 max-w-[25%]" src="https://files.art-labyrinth.org/fest2025/svg/sun.svg" alt="" />

            <img className="absolute left-[5%] bottom-[3%] w-56 max-w-[30%]" src="https://files.art-labyrinth.org/fest2025/svg/arrow.svg" alt="" />
            <img className="absolute left-[14%] top-[17%] w-56 max-w-[30%] transform rotate-180" src="https://files.art-labyrinth.org/fest2025/svg/arrow.svg" alt="" />

            <img className="absolute right-[17%] top-[18%] w-44 max-w-[25%]" src="https://files.art-labyrinth.org/fest2025/svg/moon.svg" alt="" />
            <img className="absolute right-[6%] top-[22%] w-44 max-w-[25%] transform rotate-180" src="https://files.art-labyrinth.org/fest2025/svg/moon.svg" alt="" />

            <img className="absolute right-[10%] top-[18%] w-32 max-w-[20%]" src="https://files.art-labyrinth.org/fest2025/svg/up-stars.svg" alt="" />
            <img className="absolute right-[8%] top-[26%] w-36 max-w-[20%]" src="https://files.art-labyrinth.org/fest2025/svg/down-stars.svg" alt="" />
          </>
        )}

        <img className="h-[20%] sm:h-auto sm:w-[80%] sm:left-[10%] absolute bottom-0" src="https://files.art-labyrinth.org/fest2025/svg/mountains.svg" alt="" />

        <div className="h-full">
          <div className="flex justify-center items-center text-2xl sm:text-3xl font-bold h-[7%]">{t("main.festival_dates")}</div>
          <div className="flex flex-wrap justify-center items-center text-2xl sm:text-3xl text-center h-[10%] max-w-[90%] mx-auto gap-1">
            <span>{t("main.14th_festival")}</span>
            <span>{t("main.summer_fest")}</span>
          </div>
          <div className="flex justify-center items-center mx-auto w-4/6 md:w-1/4 h-[20%]">
            <img src="https://files.art-labyrinth.org/fest2025/svg/five-hands.svg" alt="" />
          </div>
          <div className="flex justify-center items-center text-center text-5xl sm:text-6xl font-black h-[12%]">{t("main.five_hands")}<br />{t("main.one_rhythm")}</div>
          <div className="flex justify-center items-center text-sm sm:text-lg font-bold leading-none h-[15%]">
            <div className="flex flex-wrap justify-center gap-2">
              {(t("main.hashtags", { returnObjects: true }) as string[]).map((item: string, index: number) => (
                <span key={index} className="px-3">{item}</span>
              ))}
            </div>
          </div>
          <div className="flex flex-row justify-center items-center text-sm sm:text-2xl font-black gap-5 sm:gap-10 leading-none h-[10%]">
            <a
              href="https://maps.app.goo.gl/1vBPMhBe9KXDNgNb9"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block"
            >
              <div className="flex items-center gap-3 sm:pl-16 hover:contrast-50">
                <div className="w-10">
                  <img src="https://files.art-labyrinth.org/fest2025/svg/map.svg" alt="" />
                </div>
                <div className="text-center sm:text-left">{t("main.loc_city")}<br />{t("main.loc_region")}</div>
              </div>
            </a>
            <div className="hidden sm:block w-1">
              <img src="https://files.art-labyrinth.org/fest2025/svg/divider.svg" alt="" />
            </div>
            <div className="text-center sm:text-left hover:contrast-50">
              <a href={`tel:${t("main.info_tel_url")}`}>{t("main.info_tel")}</a>
              <br />
              {t("main.info_url")}
            </div>
          </div>
          <div className="flex justify-center items-center text-sm sm:text-lg font-bold leading-none h-[5%]">
            <div className="w-10">
              <img src="https://files.art-labyrinth.org/fest2025/svg/arrows.svg" alt="" />
            </div>
          </div>
        </div>
      </div>

      <About />
      <Footer/>
    </main>
  );
}

export default MainPage;
