import React from "react";

export default function About() {
    return (
        <div className="flex flex-col">
            <div className="relative w-full">
                <div className="absolute inset-0 bg-[url('/public/img/about/md_header.webp')] bg-cover bg-[0_30%]"></div>
                <div className="flex flex-col bg-[#35190499]/60 relative p-10 items-center text-orange-150 w-full">
                    <h1 className="text-4xl mb-4 uppercase text-center">Art-Labyrinth<br />Summer Festival 2025</h1>
                    <p className="text-lg max-w-2xl text-center mb-10">
                        Каждый год Art Labyrinth Summer Festival собирает людей, готовых объединиться в поисках вдохновения, творчества и осознанности. В 2025 году фестиваль пройдет с 10 по 13 июля на живописных берегах реки Днестр в селе Пояна, Молдова, в нашем самом любимом и солнечном месте. Мы возвращаемся сюда, чтобы снова создать пространство, где искусство, музыка и природа сливаются в едином потоке.
                    </p>
                </div>
            </div>

            <div className="flex flex-col md:flex-row items-stretch px-5 sm:px-20 py-20 bg-[#F4E4C3]">
                <div className="flex-1 px-5 py-5">
                    <h1 className="text-3xl font-bold mb-4 uppercase">Тема этого года: <br /> Five Hands, One Rhythm</h1>
                    <p className="my-5">
                        Five Hands, One Rhythm — это не просто название. Это символ единства, творчества и общности. В мире, полном уникальных индивидуумов, только вместе мы можем создать нечто большее.
                    </p>
                </div>
                <div className="flex-1 px-5 py-5">
                    <div className="bg-[url('/public/img/about/md_tema-goda.webp')] bg-cover bg-[0_20%] w-full h-full">
                        <div className="bg-[#F19C5533]/20 w-full h-full min-h-96"></div>
                    </div>
                </div>
            </div>

            <div className="flex flex-col md:flex-row items-stretch px-5 sm:px-20 py-20 bg-main">
                <div className="flex-1 px-5 py-5">
                    <div className="w-full h-full bg-[url('/public/img/about/sm_o-festivale.webp')] bg-cover">
                        <div className="w-full h-full bg-[#F19C5533]/20 min-h-96"></div>
                    </div>
                </div>
                <div className="flex-1 px-5 py-5">
                    <h1 className="text-3xl font-bold mb-4 uppercase">О фестивале</h1>
                    <p className="my-5">
                        Art Labyrinth Summer Festival — это ежегодное событие, которое было основано в 2008 году и с тех пор стало значимой вехой в культурной жизни Молдовы.
                    </p>
                </div>
            </div>

            <div className="flex flex-col items-center bg-[#F4E4C3] px-5 sm:px-20 py-20">
                <h1 className="text-3xl font-bold mb-4 uppercase">Что вас ждёт?</h1>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 w-full max-w-7xl">
                    <div className="flex flex-col items-center">
                        <div className="w-48 h-72 bg-[url('/public/img/about/md_live-music.webp')] bg-cover bg-[50%] rounded-full">
                            <div className="w-full h-full bg-[#F19C5533]/20 rounded-full"></div>
                        </div>
                        <p className="mt-2 text-center">Живая музыка и выступления местных и зарубежных артистов</p>
                    </div>
                    <div className="flex flex-col items-center">
                        <div className="w-48 h-72 bg-[url('/public/img/about/md_card-performance.webp')] bg-cover bg-[90%] rounded-full">
                            <div className="w-full h-full bg-[#F19C5533]/20 rounded-full"></div>
                        </div>
                        <p className="mt-2 text-center">Театральные и огненные перформансы</p>
                    </div>
                    <div className="flex flex-col items-center">
                        <div className="w-48 h-72 bg-[url('/public/img/about/md_installation.webp')] bg-cover bg-[93%] rounded-full">
                            <div className="w-full h-full bg-custom-red-black rounded-full"></div>
                        </div>
                        <p className="mt-2 text-center">Лэнд-арт и инсталляции</p>
                    </div>
                    <div className="flex flex-col items-center">
                        <div className="w-48 h-72 bg-[url('/public/img/about/md_workshops.webp')] bg-cover bg-[50%] rounded-full">
                            <div className="w-full h-full bg-[#F19C5533]/20 rounded-full"></div>
                        </div>
                        <p className="mt-2 text-center">Мастер-классы и творческие воркшопы</p>
                    </div>

                    <div className="hidden lg:flex flex-col items-center">
                    </div>
                    <div className="flex flex-col items-center">
                        <div className="w-48 h-72 bg-[url('/public/img/about/md_ecologu.webp')] bg-cover bg-[50%] rounded-full">
                            <div className="w-full h-full bg-custom-red-black rounded-full"></div>
                        </div>
                        <p className="mt-2 text-center">Экологические инициативы и жизнь в гармонии с природой</p>
                    </div>
                    <div className="flex flex-col items-center">
                        <div className="w-48 h-72 bg-[url('/public/img/about/md_meditations.webp')] bg-cover bg-[50%] rounded-full">
                            <div className="w-full h-full bg-custom-red-black rounded-full"></div>
                        </div>
                        <p className="mt-2 text-center">Осознанные практики и медитации</p>
                    </div>
                    <div className="hidden lg:flex items-center">
                    </div>
                </div>
            </div>

            <div className="flex flex-col items-center relative w-full">
                <div className="absolute inset-0 bg-[url('/public/img/about/md_Art-Labyrinth.webp')] bg-cover bg-center"></div>
                <div className="flex flex-col bg-[#35190499]/70 w-full relative items-center text-orange-150 text-center p-5 sm:p-28">
                    <p className="font-deledda font-light max-w-2xl mb-5">
                        Art Labyrinth — это место, где исчезают границы между искусством и жизнью, между человеком и природой, между прошлым и будущим. Это пространство для создания, вдохновения и самовыражения.
                    </p>
                    <p className="font-deledda max-w-2xl">
                        Присоединяйтесь к нам, станьте частью фестиваля, откройте для себя ритм единства и творчества, который будет звучать в каждом из нас.
                    </p>
                </div>
            </div>
        </div>
    );
}