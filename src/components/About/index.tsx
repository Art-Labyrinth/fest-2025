import React from "react";
import { FiveHands } from "../Svg/FiveHands";
import Moon from "../Svg/Moon";
import Squiggle from "../Svg/Squiggle";
import ThreeDashes from "../Svg/ThreeDashes";
import Zodiac from "../Svg/Zodiac";

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
                    <div className="flex">
                        <h1 className="text-3xl font-bold mb-4 uppercase">Тема этого года: <br /> Five Hands, One Rhythm</h1>
                        <div className="relative w-32"><FiveHands /></div>
                    </div>
                    <div className="pr-5 max-w-lg">
                        <p className="my-5">
                            Five Hands, One Rhythm — это не просто название. Это символ единства, творчества и общности. В мире, полном уникальных индивидуумов, только вместе мы можем создать нечто большее. Пять рук — это символ коллективного действия, сплетающего различные энергии и направления в одну гармоничную и мощную силу. Пять рук — это художники, музыканты, мастера, мечтатели, те, кто приходит, чтобы внести свою часть в общую картину, создавая мир, где не существует разделений.
                        </p>
                        <p className="my-5">
                            Один ритм — это сердце фестиваля. Это биение, которое объединяет нас всех, давая пространство для творчества и осознанности. Это ритм жизни, который отражается в каждом моменте, в каждой мелодии и в каждом движении. Это наша цель — осознанное созидание, в котором каждый участник становится частью чего-то большего, чем он сам.
                        </p>
                    </div>
                </div>
                <div className="flex-1 flex flex-col items-center justify-center px-5 py-5">
                    <div className="flex items-center w-24 max-w-[30%] transform -rotate-90 h-0">
                        <Moon />
                    </div>

                    <div className="bg-[url('/public/img/about/md_tema-goda.webp')] bg-cover bg-[0_20%] w-11/12 mt-14 mx-auto">
                        <div className="bg-[#F19C5533]/20 w-full h-full min-h-96"></div>
                    </div>
                </div>
            </div>

            <div className="flex flex-col md:flex-row items-stretch px-5 sm:px-20 py-20 bg-main gap-10">
                <div className="flex-1 flex py-5 px-0">
                    <div className="w-32 hidden lg:flex justify-center">
                        <Moon />
                    </div>
                    <div className="w-full lg:w-10/12 h-full bg-[url('/public/img/about/sm_o-festivale.webp')] bg-cover">
                        <div className="w-full h-full bg-[#F19C5533]/20 min-h-96"></div>
                    </div>
                </div>
                <div className="flex-1 flex py-5">
                    <div className="w-10/12">
                        <div className="flex items-start justify-start">
                            <h1 className="text-3xl font-bold mb-4 uppercase whitespace-nowrap">О фестивале</h1>
                            <div className="w-3/12 pl-5">
                                <Squiggle />
                            </div>
                        </div>
                        <p className="my-5">
                            Art Labyrinth Summer Festival — это ежегодное событие, которое было основано в 2008 году и с тех пор стало значимой вехой в культурной жизни Молдовы. Каждый год мы выбираем новое место, чтобы создать уникальную атмосферу и соединить людей через искусство и музыку. Но наше место — Пояна, на берегу Днестра — стало нашим особенным уголком, местом силы, где встречаются природа и творчество.
                        </p>
                        <p className="my-5">
                            Мы верим, что фестиваль — это не просто собрание людей. Это пространство для преобразования, обмена идеями и вдохновения. На Art Labyrinth каждый может раскрыть свой потенциал, стать частью сообщества, внести свой вклад в общую цель и стать созидателем.
                        </p>
                        <p className="my-5">
                            Наш фестиваль объединяет разных людей — художников, музыкантов, мастеров, волонтеров, мечтателей — все те, кто готов работать в едином ритме и создавать что-то великое. Мы приглашаем вас в путешествие, где каждый шаг наполнен осознанностью, каждый момент — гармонией, а каждый человек имеет значение.
                        </p>
                    </div>
                    <div className="w-32 flex justify-center">
                        <Moon />
                    </div>
                </div>
            </div>

            <div className="flex flex-col items-center bg-[#F4E4C3] px-5 sm:px-20">
                <div className="absolute w-3/12 left-0">
                    <Zodiac />
                </div>
                <div className="flex justify-center items-center w-full gap-5 mb-7 pt-20">
                    <h1 className="text-3xl font-bold uppercase">Что вас ждёт?</h1>
                    <div className="w-11">
                        <ThreeDashes />
                    </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 w-full max-w-7xl pb-20">
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

                    <div className="hidden lg:flex justify-center items-center w-28 mx-auto">
                        <Moon />
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
                    <div className="hidden lg:flex justify-center items-center w-28 mx-auto">
                        <Moon />
                    </div>
                </div>
            </div>

            <div className="flex flex-col items-center relative w-full">
                <div className="absolute inset-0 bg-[url('/public/img/about/md_Art-Labyrinth.webp')] bg-cover bg-center"></div>
                <div className="flex flex-col bg-[#35190499]/70 w-full relative items-center text-orange-150 text-center p-5 sm:p-28">
                    <p className="font-deledda font-light max-w-2xl mb-5">
                        Art Labyrinth — это место, где исчезают границы между искусством и жизнью, между человеком и природой, между прошлым и будущим. Это пространство для создания, вдохновения и самовыражения.
                    </p>
                    <p className="font-deledda font-light max-w-2xl">
                        Присоединяйтесь к нам, станьте частью фестиваля, откройте для себя ритм единства и творчества, который будет звучать в каждом из нас.
                    </p>
                </div>
            </div>
        </div>
    );
}