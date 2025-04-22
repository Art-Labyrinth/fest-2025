import { Sun } from "../Svg/Sun";
import { UpStars } from "../Svg/UpStars";
import { DownStars } from "../Svg/DownStars";
import { Mountains } from "../Svg/Mountains";
import { Map } from "../Svg/Map";
import { FiveHands } from "../Svg/FiveHands";
import { Divider } from "../Svg/Divider";
import Moon from "../Svg/Moon";
import Arrow from "../Svg/Arrow";

import About from "../About";
import Footer from "../Footer";
import { Header } from "../Header/Header";

function MainPage() {
  return (
    <main>
      <div className="h-screen bg-main">
        <Header />

        <div className="absolute left-10 md:left-44 top-36 h-1/4">
          <Sun />
        </div>
        <div className="absolute 2xl:left-28 lg:left-28 md:left-10 left-2 bottom-5 h-4/6">
          <Arrow />
        </div>
        <div className="absolute 2xl:left-72 lg:left-64 md:left-32 left-10 top-52 h-4/6 transform rotate-180">
          <Arrow />
        </div>

        <div className="absolute 2xl:right-80 lg:right-72 md:right-36 right-12 top-52 h-4/6">
          <Moon className="h-full w-full" />
        </div>
        <div className="absolute 2xl:right-28 lg:right-28 md:right-10 right-2 top-52 h-4/6 transform rotate-180">
          <Moon className="h-full w-full" />
        </div>

        <div className="absolute 2xl:right-56 lg:right-36 md:right-16 right-5 top-36 h-28">
          <UpStars />
        </div>
        <div className="absolute 2xl:right-40 lg:right-28 md:right-16 right-5 top-52 h-36">
          <DownStars />
        </div>

        <div className="w-full absolute bottom-0">
          <Mountains />
        </div>

        <div className="text-center">
          <div className="text-xl sm:text-3xl font-bold md:pt-16">July 10–13, 2025</div>
          <div className="text-xl sm:text-3xl mt-4">14 Art Labyrinth Summer Festival</div>
          <div className="justify-center flex mt-6 mx-auto w-1/2 md:w-1/4">
            <FiveHands />
          </div>
          <div className="mt-6 text-4xl sm:text-6xl font-black">Five Hands<br />One Rhythm</div>
          <div className="mt-10 flex flex-wrap justify-center gap-3 text-md sm:text-xl font-bold leading-none">
            <span className="px-4">#community</span>
            <span className="px-4">#art</span>
            <span className="px-4">#eco-life</span>
            <span className="px-4">#no alcohol</span>
            <span className="px-4">#music</span>
            <span className="px-4">#no drugs</span>
            <span className="px-4">#non aggressive</span>
            <span className="px-4">#culture</span>
          </div>
          <div className="mt-10 text-lg sm:text-2xl font-black leading-none">
            <div className="flex flex-col sm:flex-row justify-center items-center gap-2 sm:gap-10 text-center sm:text-left">
              <div className="flex items-end gap-3 ">
                <Map />
                <div>Poiana<br />Șoldănești</div>
              </div>
              <Divider />
              <div>
                <a href="tel:+37379601910">+373 79 601 910</a>
                <br />
                fest.art-labyrinth.org
              </div>
            </div>
          </div>
        </div>
      </div>

      <About />
      <Footer />
    </main>
  );
}

export default MainPage;
