import { Sun } from "../Svg/Sun";
import { UpArrow } from "../Svg/UpArrow";
import { DownArrow } from "../Svg/DownArrow";
import { UpStars } from "../Svg/UpStars";
import { DownStars } from "../Svg/DownStars";
import { UpMoon } from "../Svg/UpMoon";
import { DownMoon } from "../Svg/DownMoon";
import { Mountains } from "../Svg/Mountains";
import { Map } from "../Svg/Map";
import { FiveHands } from "../Svg/FiveHands";
import { Divider } from "../Svg/Divider";

import About from "../About";
import Footer from "../Footer";
import { Header } from "../Header/Header";

function MainPage() {
  return (
    <main>
      <div className="h-screen bg-main">
        <Header />

        <Sun />
        <UpArrow />
        <DownArrow />

        <UpMoon />
        <DownMoon />
        <UpStars />
        <DownStars />

        <Mountains />

        <div className="text-center">
          <div className="text-xl sm:text-3xl font-bold md:pt-16">July 10–13, 2025</div>
          <div className="text-xl sm:text-3xl mt-4">14 Art Labyrinth Summer Festival</div>
          <div className="justify-center flex mt-6">
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
