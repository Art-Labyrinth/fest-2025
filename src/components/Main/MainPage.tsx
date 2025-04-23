import About from "../About";
import Footer from "../Footer";
import { Header } from "../Header/Header";

function MainPage() {
  return (
    <main>
      <div className="h-screen bg-main">
        <Header />

        <img className="absolute left-[10%] top-[15%] w-44 max-w-[25%]" src="https://files.art-labyrinth.org/fest2025/svg/sun.svg" alt="" />

        <img className="absolute left-[5%] bottom-[3%] w-56 max-w-[30%]" src="https://files.art-labyrinth.org/fest2025/svg/arrow.svg" alt="" />
        <img className="absolute left-[14%] top-[17%] w-56 max-w-[30%] transform rotate-180" src="https://files.art-labyrinth.org/fest2025/svg/arrow.svg" alt="" />

        <img className="absolute right-[17%] top-[18%] w-44 max-w-[25%]" src="https://files.art-labyrinth.org/fest2025/svg/moon.svg" alt="" />
        <img className="absolute right-[6%] top-[22%] w-44 max-w-[25%] transform rotate-180" src="https://files.art-labyrinth.org/fest2025/svg/moon.svg" alt="" />

        <img className="absolute right-[10%] top-[18%] w-32 max-w-[20%]" src="https://files.art-labyrinth.org/fest2025/svg/up-stars.svg" alt="" />
        <img className="absolute right-[8%] top-[26%] w-36 max-w-[20%]" src="https://files.art-labyrinth.org/fest2025/svg/down-stars.svg" alt="" />

        <img className="w-full absolute bottom-0" src="https://files.art-labyrinth.org/fest2025/svg/mountains.svg" alt="" />

        <div className="h-full">
          <div className="flex justify-center items-center text-xl sm:text-3xl font-bold h-[10%]">July 10–13, 2025</div>
          <div className="flex justify-center items-center text-xl sm:text-3xl h-[10%]">14 Art-Labyrinth Summer Festival</div>
          <div className="flex justify-center items-center mx-auto w-1/2 md:w-1/4 h-[20%]">
            <img src="https://files.art-labyrinth.org/fest2025/svg/five-hands.svg" alt="" />
          </div>
          <div className="flex justify-center items-center text-center text-4xl sm:text-6xl font-black h-[15%]">Five Hands<br />One Rhythm</div>
          <div className="flex justify-center items-center text-sm sm:text-lg font-bold leading-none h-[15%]">
            <div className="flex flex-wrap justify-center gap-5">
              <span className="px-3">#community</span>
              <span className="px-3">#art</span>
              <span className="px-3">#eco-life</span>
              <span className="px-3">#no alcohol</span>
              <span className="px-3">#music</span>
              <span className="px-3">#no drugs</span>
              <span className="px-3">#non aggressive</span>
              <span className="px-3">#culture</span>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row justify-center items-center text-lg sm:text-2xl font-black gap-5 sm:gap-10 leading-none h-[15%]">
              <div className="flex items-center gap-3">
                <div className="w-10">
                  <img src="https://files.art-labyrinth.org/fest2025/svg/map.svg" alt="" />
                </div>
                <div>Poiana<br />Șoldănești</div>
              </div>
              <div className="absolute sm:relative w-1 transform rotate-90 sm:rotate-0">
                <img src="https://files.art-labyrinth.org/fest2025/svg/divider.svg" alt="" />
              </div>
              <div className="text-center sm:text-left">
                <a href="tel:+37379601910">+373 79 601 910</a>
                <br />
                fest.art-labyrinth.org
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
