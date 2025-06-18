import {useNavigate} from "react-router-dom";
import {useTranslation} from 'react-i18next';

export default function Footer({backgroundColor = "bg-main"}) {
  const navigate = useNavigate();
  const {t} = useTranslation();

  return (
    <footer className={`${backgroundColor}`}>
      <div className="px-4 max-w-[1452px] py-4 mx-auto flex justify-between align-middle">
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
        <div className="flex ms-[12px] sm:ms-[14px] gap-[12px] sm:gap-[14px] justify-items-end justify-self-end flex-shrink-0 justify-end align-middle">
          <img className="w-[50px] sm:w-[150px] h-[50px] sm:h-[150px] flex-shrink-0 self-center" src="/Footer/numina.jpg" alt="Numina"/>
          <img className="w-[50px] sm:w-[150px] h-[50px] sm:h-[150px] flex-shrink-0 self-center" src="/Footer/shanti.png" alt="Shanti"/>
        </div>
      </div>
    </footer>
  );
}

