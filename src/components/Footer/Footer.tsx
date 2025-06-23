import {useNavigate} from "react-router-dom";
import {useTranslation} from 'react-i18next';

export default function Footer({backgroundColor = "bg-main"}) {
  const navigate = useNavigate();
  const {t} = useTranslation();

  return (
    <footer className={`${backgroundColor}`}>
      <div className="px-4 max-w-[1452px] py-4 mx-auto flex justify-between align-middle flex-wrap md:flex-nowrap gap-[20px] md:gap-0">
        <div className="flex w-[100%]">
          <div className="w-[35px] sm:w-[70px] me-[23px] sm:me-[60px] flex-shrink-0 self-center" onClick={() => navigate('/')}>
            <img src="https://files.art-labyrinth.org/logo.svg" alt=""/>
          </div>
          <div className="self-center">
            <div className="block mb-[8px] sm:mb-[20px] font-bold text-[12px] sm:text-[16px] text-[#351904]">
              {t("contacts.header.name")}
            </div>
            {/*<div className="text-sm text-[12px] mt-[12px] mb-[8px] text-[#351904]">*/}
            {/*  {t("contacts.hero.tel_text")}*/}
            {/*</div>*/}
            <a href={`mailto:${t("contacts.hero.email_text")}`} className="block text-sm text-[12px] sm:text-[16px] mb-[8px] sm:mb-[12px] text-[#351904]">
              {t("contacts.hero.email_text")}
            </a>
            <div className="flex gap-[12px] sm:gap-[14px] items-center">
              <a
                href="https://t.me/+wpqpF2uV3-IzZTQ6"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block"
              >
                <img src="https://files.art-labyrinth.org/icons/tg.svg" alt="" className="w-5 cursor-pointer contrast-100 hover:contrast-75 active:contrast-100"/>
              </a>
              <a
                href="https://www.facebook.com/ArtLabyrinthFestival/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block"
              >
                <img src="https://files.art-labyrinth.org/icons/fb.svg" alt="" className="w-5 cursor-pointer contrast-100 hover:contrast-75 active:contrast-100"/>
              </a>
              <a
                href="https://www.instagram.com/artlabsummerfestival"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block"
              >
                <img src="https://files.art-labyrinth.org/icons/in.svg" alt="" className="w-5 cursor-pointer contrast-100 hover:contrast-75 active:contrast-100"/>
              </a>
            </div>
          </div>
        </div>
        <div className="flex flex-wrap w-[100%] md:w-auto md:flex-nowrap ms-0 md:ms-[12px] gap-[12px] sm:gap-[14px] justify-start md:justify-items-end justify-self-end flex-shrink-0 md:justify-end align-middle">
          <a target="_blank" rel="noopener noreferrer" className="flex-shrink-0 self-center" href="https://numina.md/"><img className="w-[80px] h-[80px] md:w-[85px] md:h-[85px] lg:w-[140px] lg:h-[140px]" src="/Footer/numina.jpg" alt="Numina"/></a>
          <a target="_blank" rel="noopener noreferrer" className="flex-shrink-0 self-center" href="https://www.instagram.com/shanti.space.md"><img className="w-[80px] h-[80px] md:w-[85px] md:h-[85px] lg:w-[140px] lg:h-[140px]" src="/Footer/shanti.png" alt="Shanti"/></a>

          <a target="_blank" rel="noopener noreferrer" className="flex-shrink-0 self-center" href="https://growhills.com"><img className="w-[80px] h-[80px] md:w-[85px] md:h-[85px] lg:w-[140px] lg:h-[140px]" src="/Footer/growhills.png" alt="Growhills"/></a>
          <a target="_blank" rel="noopener noreferrer" className="flex-shrink-0 self-center" href="https://pergament.md"><img className="w-[80px] h-[80px] md:w-[85px] md:h-[85px] lg:w-[140px] lg:h-[140px]" src="/Footer/pergament.png" alt="Pergament"/></a>
          <a target="_blank" rel="noopener noreferrer" className="flex-shrink-0 self-center" href="https://xstyle.md"><img className="w-[80px] h-[80px] md:w-[85px] md:h-[85px] lg:w-[140px] lg:h-[140px]" src="/Footer/x-style.png" alt="X-Style"/></a>
        </div>
      </div>
    </footer>
  );
}

