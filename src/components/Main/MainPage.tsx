import React from "react";
import { Header } from "../Header/Header";
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

function MainPage() {
  return (
    <main className="min-h-screen h-full min-w-screen w-full">
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
        <div className="text-3xl font-bold md:pt-16">July 10–13, 2025</div>
        <div className="mt-4 text-3xl">14 Art Labyrinth Summer Festival</div>
        <div className="mt-6 justify-center flex">
          <FiveHands />
        </div>
        <div className="mt-6 text-6xl font-black">Five Hands<br />One Rhythm</div>
        <div className="mt-10 flex flex-wrap justify-center gap-3 text-xl font-bold">
          <span className="px-4 py-2">#community</span>
          <span className="px-4 py-2">#art</span>
          <span className="px-4 py-2">#eco-life</span>
          <span className="px-4 py-2">#no alcohol</span>
          <span className="px-4 py-2">#music</span>
          <span className="px-4 py-2">#no drugs</span>
          <span className="px-4 py-2">#non aggressive</span>
          <span className="px-4 py-2">#culture</span>
        </div>
        <div className="mt-10 text-2xl font-black leading-none">
          <div className="flex flex-col sm:flex-row justify-center items-center gap-10 text-left">
            <div className="flex items-end gap-3 ">
              <Map />
              <div>Poiana<br />Șoldănești</div>
            </div>
            <Divider />
            <div>
               <a href="tel:+37379601910">+37379601910</a>
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
