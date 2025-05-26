import React, { useEffect, useRef, useState } from "react";
import { Header } from "../Header/Header";
import Footer from "../Footer";
import { useTranslation } from 'react-i18next';

function Contribute() {
    const { t } = useTranslation<'translation'>();
    const [activePopup, setActivePopup] = useState<string | null>(null);
    const [isCopied, setIsCopied] = useState(false);

    const openPopup = (popupId: string) => {
        setActivePopup(popupId);
    };

    const closePopup = () => {
        setActivePopup(null);
    };

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
          <div className="flex flex-col relative px-4 text-center z-10">
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

        {/* Pricing Block */}
        <section className="bg-[#F4E4C3] py-12">
            <div className="container mx-auto px-4">
                
                {/* Upper Part */}
                <div className="text-left mb-12">
                      <h2 className="text-3xl md:text-4xl font-bold text-brown font-deledda mb-4">
                          {t("contribute.pricing.header")}
                      </h2>
                      <p className="text-lg italic text-brown mb-4">
                          "{t("contribute.pricing.motto")}"
                      </p>
                      <p className="text-brown md:w-2/5">
                          {t("contribute.pricing.text")}
                      </p>
                </div>

                {/* Lower Part */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:h-full">
                    {/* Column 1 */}
                    <div className="md:flex flex-col text-left">
                        <h3 className="text-xl font-bold text-brown mb-2">
                            {t("contribute.pricing.column_1.title")}
                        </h3>
                        <p className="text-2xl font-semibold text-[#4A6218] mb-2">
                            {t("contribute.pricing.column_1.price")}
                        </p>
                        <p className="text-brown mb-4">
                            {t("contribute.pricing.column_1.text")}
                        </p>
                        <button
                            className="md:w-4/5 w-1/2 bg-[#F07B17] text-white px-4 py-2 rounded hover:bg-[#F07B17]/75 mt-auto"
                            onClick={() => openPopup('popup1')}
                        >
                            {t("contribute.pricing.button")}
                        </button>
                    </div>

                    {/* Column 2 */}
                    <div className="md:flex flex-col text-left">
                        <h3 className="text-xl font-bold text-brown mb-2">
                            {t("contribute.pricing.column_2.title")}
                        </h3>
                        <p className="text-2xl font-semibold text-[#4A6218] mb-2">
                            {t("contribute.pricing.column_2.price")}
                        </p>
                        <p className="text-brown mb-4">
                            {t("contribute.pricing.column_2.text")}
                        </p>
                        <button
                            className="md:w-4/5 w-1/2 bg-[#F07B17] text-white px-4 py-2 rounded hover:bg-[#F07B17]/75 mt-auto"
                            onClick={() => openPopup('popup2')}
                        >
                            {t("contribute.pricing.button")}
                        </button>
                    </div>

                    {/* Column 3 */}
                    <div className="md:flex flex-col text-left">
                        <h3 className="text-xl font-bold text-brown mb-2">
                            {t("contribute.pricing.column_3.title")}
                        </h3>
                        <p className="text-2xl font-semibold text-[#4A6218] mb-2">
                            {t("contribute.pricing.column_3.price")}
                        </p>
                        <p className="text-brown mb-4">
                            {t("contribute.pricing.column_3.text")}
                        </p>
                        <button
                            className="md:w-4/5 w-1/2 bg-[#F07B17] text-white px-4 py-2 rounded hover:bg-[#F07B17]/75 mt-auto"
                            onClick={() => openPopup('popup3')}
                        >
                            {t("contribute.pricing.button")}
                        </button>
                    </div>

                    {/* Column 4 */}
                    <div className="md:flex flex-col text-left">
                        <h3 className="text-xl font-bold text-brown mb-2">
                            {t("contribute.pricing.column_4.title")}
                        </h3>
                        <p className="text-brown mb-4">
                            {t("contribute.pricing.column_4.text")}
                        </p>
                        <button
                            className="md:w-4/5 w-1/2 bg-[#4A6218] text-white px-4 py-2 rounded hover:bg-[#4A6218]/75 mt-auto"
                        >
                            {t("contribute.pricing.column_4.button")}
                        </button>
                    </div>
                </div>

                {/* Popup Modals (Placeholder) */}
                {activePopup && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                        <div className="bg-white p-6 rounded-lg max-w-md w-full">
                            <h3 className="text-xl font-bold mb-4">
                                {t(`contribute.pricing.${activePopup}.title`)}
                            </h3>
                            <p className="text-gray-600 mb-4">
                                {t(`contribute.pricing.${activePopup}.description`)}
                            </p>
                            <button
                                className="bg-brown text-white px-4 py-2 rounded hover:bg-brown-600"
                                onClick={closePopup}
                            >
                                {t("contribute.pricing.close_button")}
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </section>

        <section className="bg-main py-12">
          <div className="container mx-auto px-4">
              {/* Upper Row */}
              <div className="text-left mb-12">
                  <h2 className="text-2xl md:text-4xl font-bold text-brown font-deledda mb-4 uppercase">
                      {t("contribute.help_us.header")}
                  </h2>
                  <p className="text-brown text-lg md:w-1/2">
                      {t("contribute.help_us.text_1")}
                  </p>
              </div>

              {/* Lower Row */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:h-full">
                  {/* Left Column */}
                  <div className="flex flex-col text-left">
                      <div className="mb-4">
                          <p className="text-brown text-lg font-bold">
                              {t("contribute.help_us.credentials.bank_name")}
                          </p>
                          <p className="text-brown text-lg">
                              SWIFT-ul Bancii: <span className="font-bold">{t("contribute.help_us.credentials.swift")}</span>
                          </p>
                          <p className="text-brown text-lg">
                              Adresa: <span className="font-bold">{t("contribute.help_us.credentials.address")}</span>
                          </p>
                          <p className="text-brown text-lg">
                              Date beneficiar: <span className="font-bold">{t("contribute.help_us.credentials.account_name")}</span>
                          </p>
                          <p className="text-brown text-lg">
                              Cod fiscal: <span className="font-bold">{t("contribute.help_us.credentials.fisc")}</span>
                          </p>
                          <p className="text-brown text-lg">
                              Nr.contului/IBAN: <span className="font-bold">{t("contribute.help_us.credentials.iban")}</span>
                          </p>
                      </div>
                      <button
                          className={`md:w-2/5 w-1/2 ${
                              isCopied ? 'bg-[#4A6218] text-white' : 'bg-transparent border border-black text-black hover:border-white hover:text-white'
                          } px-4 py-2 rounded mt-auto transition-colors duration-300`}
                          onClick={() => {
                              const details = `${t("contribute.help_us.credentials.bank_name")}\n${t("contribute.help_us.credentials.swift")}\n${t("contribute.help_us.credentials.address")}\n${t("contribute.help_us.credentials.account_name")}\n${t("contribute.help_us.credentials.fisc")}\n${t("contribute.help_us.credentials.iban")}`;
                              navigator.clipboard.writeText(details);
                              setIsCopied(true);
                              setTimeout(() => setIsCopied(false), 2000);
                          }}
                      >
                          {isCopied ? t("contribute.help_us.copied") : t("contribute.help_us.button")}
                      </button>
                  </div>

                  {/* Right Column */}
                  <div className="flex flex-col text-left mt-auto">
                      <p className="text-brown mb-4 text-lg">
                          {t("contribute.help_us.text_2")}
                      </p>
                      <button
                          className="md:w-2/5 w-1/2 bg-[#4A6218] text-white px-4 py-2 rounded hover:bg-[#4A6218]/75 mt-auto"
                      >
                          {t("contribute.contact_button")}
                      </button>
                  </div>
              </div>
          </div>
        </section>

        <section className="bg-[#F4E4C3] py-12">
            <div className="container mx-auto px-4">
                {/* Upper Row with Green Background */}
                <div className="bg-[#4A6218] rounded py-10 outline outline-8 outline-[#4A6218]">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
                        {/* Upper Left Cell */}
                        <div className="flex flex-col text-left text-[#F4E4C3]">
                            <h3 className="text-xl font-bold text-brown mb-0 uppercase">
                                {t("contribute.our_needs.header_1")}
                            </h3>
                            <p className="text-brown text-lg m-0">
                                {t("contribute.our_needs.header_2")}
                            </p>
                            <ul className="text-brown text-lg list-disc mt-4 ml-5">
                                <li>{t("contribute.our_needs.list.item_1")}</li>
                                <li>{t("contribute.our_needs.list.item_2")}</li>
                                <li>{t("contribute.our_needs.list.item_3")}</li>
                                <li>{t("contribute.our_needs.list.item_4")}</li>
                                <li>{t("contribute.our_needs.list.item_5")}</li>
                                <li>{t("contribute.our_needs.list.item_6")}</li>
                                <li>{t("contribute.our_needs.list.item_7")}</li>
                            </ul>
                        </div>

                        {/* Upper Right Cell */}
                        <div className="flex flex-col text-left text-[#F4E4C3]">
                            <p className="text-brown text-lg mx-4">
                                {t("contribute.our_needs.text_3")}
                            </p>
                            <button
                                className="md:w-2/5 w-1/2 bg-transparent text-white border border-white px-4 py-2 md:mx-4 rounded hover:bg-[#99a67d] mt-auto"
                            >
                                {t("contribute.contact_button")}
                            </button>
                        </div>
                    </div>
                </div>

                {/* Lower Row */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 py-10">
                    {/* Lower Left Cell */}
                    <div className="flex flex-col text-left">
                        <h3 className="text-xl font-bold text-brown mb-2 uppercase">
                            {t("contribute.our_needs.header_2")}
                        </h3>
                        <p className="text-brown text-lg">
                            {t("contribute.our_needs.text_2")}
                        </p>
                    </div>

                    {/* Lower Right Cell */}
                    <div className="flex flex-col text-left">
                        <p className="text-brown text-lg mb-4">
                            {t("contribute.our_needs.text_4")}
                        </p>
                        <button
                            className="md:w-2/5 w-1/2 bg-[#F07B17] text-white px-4 py-2 rounded hover:bg-[#F07B17]/75 mt-auto"
                        >
                            {t("contribute.our_needs.button")}
                        </button>
                    </div>
                </div>
            </div>
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