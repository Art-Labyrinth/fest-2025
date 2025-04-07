import React from "react";
import { Header } from "../Header/Header";
import { Sun } from "../Svg/Sun";
// import { UpArrow } from "../Svg/UpArrow";
// import { DownArrow } from "../Svg/DownArrow";
// import { UpStars } from "../Svg/UpStars";
// import { DownStars } from "../Svg/DownStars";
// import { UpMoon } from "../Svg/UpMoon";
// import { DownMoon } from "../Svg/DownMoon";
import { Mountains } from "../Svg/Mountains";
import { Map } from "../Svg/Map";
import { FiveHands } from "../Svg/FiveHands";
import { Divider } from "../Svg/Divider";

function MainPage() {
  return (
    <main className="min-h-screen h-full min-w-screen w-full">
      <Header />
      <Sun />

      {/* <div className="absolute 2xl:left-48 lg:left-28 md:left-10 sm:left-2 top-80">
        <UpArrow />
      </div>
      <div className="absolute 2xl:left-72 lg:left-64 md:left-32 sm:left-10 top-64">
        <DownArrow />
      </div>

      <div className="absolute 2xl:right-56 lg:right-36 md:right-16 sm:right-5 top-36">
        <UpStars />
      </div>
      <div className="absolute 2xl:right-56 lg:right-36 md:right-16 sm:right-5 top-36">
        <DownStars />
      </div>
      <div className="absolute 2xl:right-80 lg:right-72 md:right-36 sm:right-12 top-52">
        <UpMoon />
      </div>
      <div className="absolute 2xl:right-48 lg:right-28 md:right-10 sm:right-2 top-80">
        <DownMoon />
      </div> */}

      <Mountains />

      <div className="text-center">
        <div className="text-2xl font-bold">July 10–13, 2025</div>
        <div className="mt-4 text-2xl">14 Art Labyrinth Summer Festival</div>
        <div className="mt-6 justify-center flex">
          <FiveHands />
        </div>
        <div className="mt-6 text-5xl font-black">Five Hands<br />One Rhythm</div>
        <div className="mt-10 flex flex-wrap justify-center gap-4 text-lg">
          <span className="px-4 py-2">#community</span>
          <span className="px-4 py-2">#art</span>
          <span className="px-4 py-2">#eco-life</span>
          <span className="px-4 py-2">#no alcohol</span>
          <span className="px-4 py-2">#music</span>
          <span className="px-4 py-2">#no drugs</span>
        </div>
        <div className="mt-10 text-lg font-black leading-none">
          <div className="flex flex-col sm:flex-row justify-center items-center gap-10 text-left">
            <div className="flex items-end gap-3 ">
              <Map />
              <div>Poiana<br />Șoldănești</div>
            </div>
            <Divider />
            <div>
              +37379601910
              <br />
              fest.art-labyrinth.org
            </div>
          </div>
        </div>
      </div>

    </main>
  );
}

export default MainPage;
