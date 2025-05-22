import React, { useEffect, useRef, useState } from "react";
import { Header } from "../Header/Header";
import Footer from "../Footer";
import { useTranslation } from 'react-i18next';

function Contribute() {
    const { t } = useTranslation<'translation'>();
    
    return (
    <main>
        <div className="bg-main">
            <Header />
        </div>
        
        {/*Hero Top */}
        <section
          className="relative bg-cover bg-top sm:bg-[center_50%]  py-[5%] w-full"
          style={{ backgroundImage: "url('/contribute_hero_1.jpg')" }}
        >
          <div className="flex flex-col relative container mx-auto px-4 text-center z-10">
            <h1 className="text-4xl md:text-5xl font-bold text-brown font-deledda mb-4 text-[#F4E4C3]">
              {t("contribute.hero_1.header")}
            </h1>
            <div className="sm:w-full sm:max-w-[50%] mx-auto p-6 text-[#F4E4C3] whitespace-pre-line">
              <p className="text-brown text-lg font-extrabold">
              {t("contribute.hero_1.text_1")}
              </p>
              <p className="text-brown text-lg">
              {t("contribute.hero_1.text_2")}
              </p>
            </div>
          </div>
          <div className="absolute inset-0 bg-[#35190499] bg-opacity-60"></div>
        </section>


        {/*Hero Bottom */}
        <section
          className="relative bg-cover bg-top sm:bg-[center_70%]  py-[5%] w-full"
          style={{ backgroundImage: "url('/contribute_hero_2.jpg')" }}
        >
          <div className="flex flex-col relative container mx-auto px-4 text-center z-10">
            <div className="sm:w-full sm:max-w-[50%] mx-auto p-6 text-[#FFF9EC] whitespace-pre-line">
              <p className="text-brown text-lg">
              {t("contribute.hero_2.text")}
              </p>
            </div>
          </div>
          <div className="absolute inset-0 bg-[#35190499] bg-opacity-60"></div>
        </section>
        <Footer/>
    </main>
    )
    
}

export default Contribute;