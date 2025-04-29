import React from "react";
import { Header } from "../Header/Header";
import Footer from "../Footer";

function Contacts() {
    return (
        <>
            <div className="flex flex-col min-h-screen bg-[#F4E4C3]">
                <div className="bg-main">
                    <Header />
                </div>

                <div className="flex-grow">
                    <div className="relative w-full ">
                        <div className="absolute inset-0 bg-about-md-header bg-cover bg-[0_30%]"></div>
                        <div className="relative flex flex-col justify-center bg-[#35190499]/60 text-orange-150 w-full min-h-[30vh] p-10">
                            <h1 className="text-2xl sm:text-4xl mb-4 uppercase text-center">контактная<br />информация</h1>
                        </div>
                    </div>

                    <div className="flex flex-col md:flex-row justify-center items-center px-5 sm:px-20 py-20 gap-10">
                        <div className="flex flex-col items-center">
                            <img className="h-20" src="https://files.art-labyrinth.org/fest2025/svg/phone.svg" alt="" />
                            <p className="font-bold font-deledda">Телефон</p>
                            <p className="font-light font-deledda">+373-XXX-XX-XX</p>
                        </div>
                        <div>
                            <div className="w-1">
                                <img src="https://files.art-labyrinth.org/fest2025/svg/divider.svg" alt="" />
                            </div>
                        </div>
                        <div className="flex flex-col items-center">
                            <img className="h-20" src="https://files.art-labyrinth.org/fest2025/svg/email.svg" alt="" />
                            <p className="font-bold font-deledda">Email</p>
                            <p className="font-light font-deledda">xxxxxxxxxxxxx@gmail.com</p>
                        </div>
                        <div>
                            <div className="w-1">
                                <img src="https://files.art-labyrinth.org/fest2025/svg/divider.svg" alt="" />
                            </div>
                        </div>
                        <div className="flex flex-col items-center">
                            <img className="h-20" src="https://files.art-labyrinth.org/fest2025/svg/web.svg" alt="" />
                            <p className="font-bold font-deledda">Соцсети</p>
                            <p className="font-light font-deledda">TG FB IG</p>
                        </div>
                    </div>

                    <div className="flex flex-col items-center relative w-full">
                        <div className="absolute inset-0 bg-about-md-art-labyrinth bg-cover bg-center"></div>
                        <div className="flex flex-col bg-[#35190499]/70 w-full relative items-center text-orange-150 text-center p-5 sm:p-28">
                            <p className="font-deledda font-bold text-xl">
                                Давайте писать историю фестиваля вместе!
                            </p>
                            <p className="font-deledda font-light mb-5 text-sm">
                                Вы можете задать нам вопрос или оставить предложение
                            </p>
                            <form className="w-full max-w-xl p-5 rounded shadow-md">
                                <div className="mb-2">
                                    <input
                                        className="shadow appearance-none bg-[#F4E4C3] border rounded w-full py-2 px-3 leading-tight font-light font-deledda text-sm focus:outline-none focus:shadow-outline"
                                        id="name"
                                        type="text"
                                        placeholder="Ваше имя"
                                    />
                                </div>
                                <div className="mb-2">
                                    <input
                                        className="shadow appearance-none bg-[#F4E4C3] border rounded w-full py-2 px-3 leading-tight font-light font-deledda text-sm focus:outline-none focus:shadow-outline"
                                        id="phone"
                                        type="tel"
                                        placeholder="Номер телефона"
                                    />
                                </div>
                                <div className="mb-2">
                                    <input
                                        className="shadow appearance-none bg-[#F4E4C3] border rounded w-full py-2 px-3 leading-tight font-light font-deledda text-sm focus:outline-none focus:shadow-outline"
                                        id="email"
                                        type="email"
                                        placeholder="Email"
                                    />
                                </div>
                                <div className="mb-6">
                                    <textarea
                                        className="shadow appearance-none bg-[#F4E4C3] border rounded w-full py-2 px-3 leading-tight font-light font-deledda text-sm focus:outline-none focus:shadow-outline"
                                        id="message"
                                        rows={8}
                                    ></textarea>
                                </div>
                                <div className="flex items-center justify-center">
                                    <button
                                        className="bg-orange-500 hover:bg-orange-700 text-[#FFF9EC] py-2 px-10 rounded font-light font-deledda text-sm focus:outline-none focus:shadow-outline"
                                        type="button"
                                    >
                                        Отправить
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
                <Footer />
            </div>
        </>
    );
}

export default Contacts;
