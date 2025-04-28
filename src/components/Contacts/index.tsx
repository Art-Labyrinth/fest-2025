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
                        <div>
                            Телефон
                        </div>
                        <div>
                            <div className="w-1">
                                <img src="https://files.art-labyrinth.org/fest2025/svg/divider.svg" alt="" />
                            </div>
                        </div>
                        <div>
                            Email
                        </div>
                        <div>
                            <div className="w-1">
                                <img src="https://files.art-labyrinth.org/fest2025/svg/divider.svg" alt="" />
                            </div>
                        </div>
                        <div>
                            Соцсети
                        </div>
                    </div>

                    <div className="hidden flex-col items-center relative w-full">
                        <div className="absolute inset-0 bg-about-md-art-labyrinth bg-cover bg-center"></div>
                        <div className="flex flex-col bg-[#35190499]/70 w-full relative items-center text-orange-150 text-center p-5 sm:p-28">
                            <p className="font-deledda font-light max-w-2xl mb-5">
                            </p>
                            <form className="w-full max-w-lg bg-white p-5 rounded shadow-md">
                                <div className="mb-4">
                                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                                        Имя
                                    </label>
                                    <input
                                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                        id="name"
                                        type="text"
                                        placeholder="Введите ваше имя"
                                    />
                                </div>
                                <div className="mb-4">
                                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                                        Email
                                    </label>
                                    <input
                                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                        id="email"
                                        type="email"
                                        placeholder="Введите ваш email"
                                    />
                                </div>
                                <div className="mb-6">
                                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="message">
                                        Сообщение
                                    </label>
                                    <textarea
                                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                        id="message"
                                        placeholder="Введите ваше сообщение"
                                        rows={4}
                                    ></textarea>
                                </div>
                                <div className="flex items-center justify-between">
                                    <button
                                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
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
