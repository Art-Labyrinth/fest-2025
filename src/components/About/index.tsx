import React from "react";
import Footer from "../Footer/";

export default function About() {
    return (
        <>
            <div className="flex flex-col">
                <div className="relative w-full">
                    <div className="absolute inset-0 bg-[url('/public/img/about/md_header.webp')] bg-cover bg-[0_30%]"></div>
                    <div className="flex flex-col bg-[#35190499]/60 w-full relative p-10 items-center text-orange-150">
                        <h1 className="text-4xl mb-4 uppercase text-center">Art-Labyrinth<br />Summer Festival 2025</h1>
                        <p className="text-lg max-w-2xl text-center mb-10">
                            Каждый год Art Labyrinth Summer Festival собирает людей, готовых объединиться в поисках вдохновения, творчества и осознанности. В 2025 году фестиваль пройдет с 10 по 13 июля на живописных берегах реки Днестр в селе Пояна, Молдова, в нашем самом любимом и солнечном месте. Мы возвращаемся сюда, чтобы снова создать пространство, где искусство, музыка и природа сливаются в едином потоке.
                        </p>
                    </div>
                </div>

                <div className="flex flex-wrap items-center px-20 bg-[#F4E4C3]">
                    <div className="w-1/2 p-10">
                        <h1 className="text-4xl font-bold mb-4">Тема этого года: Five Hands, One Rhythm</h1>
                        <p className="text-lg max-w-2xl mb-2">
                            Five Hands, One Rhythm — это не просто название. Это символ единства, творчества и общности. В мире, полном уникальных индивидуумов, только вместе мы можем создать нечто большее. Пять рук — это символ коллективного действия, сплетающего различные энергии и направления в одну гармоничную и мощную силу. Пять рук — это художники, музыканты, мастера, мечтатели, те, кто приходит, чтобы внести свою часть в общую картину, создавая мир, где не существует разделений.
                        </p>
                        <p className="text-lg max-w-2xl">
                            Один ритм — это сердце фестиваля. Это биение, которое объединяет нас всех, давая пространство для творчества и осознанности. Это ритм жизни, который отражается в каждом моменте, в каждой мелодии и в каждом движении. Это наша цель — осознанное созидание, в котором каждый участник становится частью чего-то большего, чем он сам.
                        </p>
                    </div>
                    <div className="w-1/2">

                    </div>
                </div>

                <div className="flex flex-wrap items-center px-20">
                    <div className="w-1/2">

                    </div>
                    <div className="w-1/2 p-10">
                        <h1 className="text-4xl font-bold mb-4">О фестивале</h1>
                        <p className="text-lg max-w-2xl mb-2">
                            Art Labyrinth Summer Festival — это ежегодное событие, которое было основано в 2008 году и с тех пор стало значимой вехой в культурной жизни Молдовы. Каждый год мы выбираем новое место, чтобы создать уникальную атмосферу и соединить людей через искусство и музыку. Но наше место — Пояна, на берегу Днестра — стало нашим особенным уголком, местом силы, где встречаются природа и творчество.
                        </p>
                        <p className="text-lg max-w-2xl mb-2">
                            Мы верим, что фестиваль — это не просто собрание людей. Это пространство для преобразования, обмена идеями и вдохновения. На Art Labyrinth каждый может раскрыть свой потенциал, стать частью сообщества, внести свой вклад в общую цель и стать созидателем.
                        </p>
                        <p className="text-lg max-w-2xl mb-2">
                            Наш фестиваль объединяет разных людей — художников, музыкантов, мастеров, волонтеров, мечтателей — все те, кто готов работать в едином ритме и создавать что-то великое. Мы приглашаем вас в путешествие, где каждый шаг наполнен осознанностью, каждый момент — гармонией, а каждый человек имеет значение.
                        </p>
                    </div>
                </div>

                <div className="flex flex-col items-center p-10 bg-[#F4E4C3]">
                    <h1 className="text-4xl font-bold mb-4">Что вас ждёт?</h1>
                </div>

                <div className="flex flex-col items-center relative w-full">
                    <div className="absolute inset-0 bg-[url('/public/img/about/md_Art-Labyrinth.webp')] bg-cover bg-center"></div>
                    <div className="flex flex-col bg-[#35190499]/70 w-full relative items-center text-orange-150 text-center p-20">
                        <p className="text-lg max-w-2xl mb-2">
                            Art Labyrinth — это место, где исчезают границы между искусством и жизнью, между человеком и природой, между прошлым и будущим. Это пространство для создания, вдохновения и самовыражения.
                        </p>
                        <p className="text-lg max-w-2xl mb-2">
                            Присоединяйтесь к нам, станьте частью фестиваля, откройте для себя ритм единства и творчества, который будет звучать в каждом из нас.
                        </p>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}