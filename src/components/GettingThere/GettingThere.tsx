import React from "react";
import Footer from "../Footer/Footer";
import {Header} from "../Header/Header";
import {useTranslation} from 'react-i18next';

export default function GettingThere() {
  const {t} = useTranslation();
  return (
    <>
      <div className="bg-main">
        <Header/>
      </div>
      <div className="flex align-middle justify-center w-[100%] max-w-[100%] h-[37vw] md:h-[29vw] ml-auto mr-auto bg-cover" style={{backgroundImage: "url(/GettingThere/banner.jpg)"}}>
        <h1 className="text-[#F4E4C3] self-center text-3xl sm:text-[40px] font-serif uppercase font-bold">{t("gettingthere.header")}</h1>
      </div>


      <div className="px-4 w-[1730px] max-w-[100%] mt-0 mb-0 ml-auto mr-auto">

        <div className="mt-[30px] sm:mt-[60px] mb-[20px] sm:mb-[30px] grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-[16px] sm:gap-[28px]">
          <a href="#our-transport">
            <div className="rounded-[10px] bg-[#2b390e24] px-[28px] py-[20px] h-full">
              <svg width="35" height="36" viewBox="0 0 35 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M10.209 21.5555C10.209 21.072 10.401 20.6083 10.7429 20.2665C11.0848 19.9246 11.5484 19.7325 12.0319 19.7325C12.5154 19.7325 12.979 19.9246 13.3209 20.2665C13.6628 20.6083 13.8548 21.072 13.8548 21.5555C13.8548 22.0389 13.6628 22.5026 13.3209 22.8445C12.979 23.1863 12.5154 23.3784 12.0319 23.3784C11.5484 23.3784 11.0848 23.1863 10.7429 22.8445C10.401 22.5026 10.209 22.0389 10.209 21.5555ZM22.9694 19.7325C22.4859 19.7325 22.0223 19.9246 21.6804 20.2665C21.3385 20.6083 21.1465 21.072 21.1465 21.5555C21.1465 22.0389 21.3385 22.5026 21.6804 22.8445C22.0223 23.1863 22.4859 23.3784 22.9694 23.3784C23.4529 23.3784 23.9165 23.1863 24.2584 22.8445C24.6003 22.5026 24.7923 22.0389 24.7923 21.5555C24.7923 21.072 24.6003 20.6083 24.2584 20.2665C23.9165 19.9246 23.4529 19.7325 22.9694 19.7325Z" fill="black"/>
                <path
                  d="M11.1191 4.32813C9.87424 4.3278 8.66648 4.75223 7.69547 5.53128C6.72445 6.31032 6.04829 7.39734 5.77872 8.61271H5.65039C5.07023 8.61271 4.51383 8.84318 4.10359 9.25341C3.69336 9.66365 3.46289 10.22 3.46289 10.8002V11.894C3.46289 12.4977 3.95289 12.9877 4.55664 12.9877H5.65039V24.7448C5.65039 25.8021 6.1506 26.7427 6.92643 27.3421V29.4844C6.92643 30.0645 7.1569 30.6209 7.56714 31.0312C7.97737 31.4414 8.53377 31.6719 9.11393 31.6719C9.69409 31.6719 10.2505 31.4414 10.6607 31.0312C11.071 30.6209 11.3014 30.0645 11.3014 29.4844V28.026H23.6973V29.4844C23.6973 30.0645 23.9277 30.6209 24.338 31.0312C24.7482 31.4414 25.3046 31.6719 25.8848 31.6719C26.4649 31.6719 27.0213 31.4414 27.4316 31.0312C27.8418 30.6209 28.0723 30.0645 28.0723 29.4844V27.3421C28.4694 27.0355 28.7909 26.642 29.0121 26.1917C29.2333 25.7414 29.3483 25.2465 29.3483 24.7448V12.9877H30.4421C30.7321 12.9877 31.0103 12.8725 31.2155 12.6674C31.4206 12.4622 31.5358 12.184 31.5358 11.894V10.8002C31.5358 10.22 31.3053 9.66365 30.8951 9.25341C30.4849 8.84318 29.9285 8.61271 29.3483 8.61271H29.22C28.9504 7.39734 28.2743 6.31032 27.3032 5.53128C26.3322 4.75223 25.1245 4.3278 23.8796 4.32813H11.1191ZM27.1608 9.79688V15.0833H7.83789V9.79688C7.83789 8.92663 8.18359 8.09204 8.79895 7.47668C9.4143 6.86133 10.2489 6.51563 11.1191 6.51563H23.8796C24.7498 6.51563 25.5844 6.86133 26.1997 7.47668C26.8151 8.09204 27.1608 8.92663 27.1608 9.79688ZM26.0671 25.8385H8.93164C8.64156 25.8385 8.36336 25.7233 8.15824 25.5182C7.95312 25.3131 7.83789 25.0349 7.83789 24.7448V17.2708H27.1608V24.7448C27.1608 25.0349 27.0456 25.3131 26.8405 25.5182C26.6353 25.7233 26.3571 25.8385 26.0671 25.8385Z"
                  fill="black"/>
              </svg>
              <h4 className="font-bold text-[32px] leading-[1.08] text-[#351904] mt-[11px] mb-[2px]">{t("gettingthere.our_transport_title")}</h4>
              <h5 className="font-sans font-light text-[24px] leading-[1.08] text-[#351904]">{t("gettingthere.our_transport_subtitle")}</h5>
            </div>
          </a>
          <a href="#our-transport-pmr">
            <div className="rounded-[10px] bg-[#2b390e24] px-[28px] py-[20px] h-full">
              <svg width="35" height="36" viewBox="0 0 35 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M10.209 21.5555C10.209 21.072 10.401 20.6083 10.7429 20.2665C11.0848 19.9246 11.5484 19.7325 12.0319 19.7325C12.5154 19.7325 12.979 19.9246 13.3209 20.2665C13.6628 20.6083 13.8548 21.072 13.8548 21.5555C13.8548 22.0389 13.6628 22.5026 13.3209 22.8445C12.979 23.1863 12.5154 23.3784 12.0319 23.3784C11.5484 23.3784 11.0848 23.1863 10.7429 22.8445C10.401 22.5026 10.209 22.0389 10.209 21.5555ZM22.9694 19.7325C22.4859 19.7325 22.0223 19.9246 21.6804 20.2665C21.3385 20.6083 21.1465 21.072 21.1465 21.5555C21.1465 22.0389 21.3385 22.5026 21.6804 22.8445C22.0223 23.1863 22.4859 23.3784 22.9694 23.3784C23.4529 23.3784 23.9165 23.1863 24.2584 22.8445C24.6003 22.5026 24.7923 22.0389 24.7923 21.5555C24.7923 21.072 24.6003 20.6083 24.2584 20.2665C23.9165 19.9246 23.4529 19.7325 22.9694 19.7325Z" fill="black"/>
                <path
                  d="M11.1191 4.32813C9.87424 4.3278 8.66648 4.75223 7.69547 5.53128C6.72445 6.31032 6.04829 7.39734 5.77872 8.61271H5.65039C5.07023 8.61271 4.51383 8.84318 4.10359 9.25341C3.69336 9.66365 3.46289 10.22 3.46289 10.8002V11.894C3.46289 12.4977 3.95289 12.9877 4.55664 12.9877H5.65039V24.7448C5.65039 25.8021 6.1506 26.7427 6.92643 27.3421V29.4844C6.92643 30.0645 7.1569 30.6209 7.56714 31.0312C7.97737 31.4414 8.53377 31.6719 9.11393 31.6719C9.69409 31.6719 10.2505 31.4414 10.6607 31.0312C11.071 30.6209 11.3014 30.0645 11.3014 29.4844V28.026H23.6973V29.4844C23.6973 30.0645 23.9277 30.6209 24.338 31.0312C24.7482 31.4414 25.3046 31.6719 25.8848 31.6719C26.4649 31.6719 27.0213 31.4414 27.4316 31.0312C27.8418 30.6209 28.0723 30.0645 28.0723 29.4844V27.3421C28.4694 27.0355 28.7909 26.642 29.0121 26.1917C29.2333 25.7414 29.3483 25.2465 29.3483 24.7448V12.9877H30.4421C30.7321 12.9877 31.0103 12.8725 31.2155 12.6674C31.4206 12.4622 31.5358 12.184 31.5358 11.894V10.8002C31.5358 10.22 31.3053 9.66365 30.8951 9.25341C30.4849 8.84318 29.9285 8.61271 29.3483 8.61271H29.22C28.9504 7.39734 28.2743 6.31032 27.3032 5.53128C26.3322 4.75223 25.1245 4.3278 23.8796 4.32813H11.1191ZM27.1608 9.79688V15.0833H7.83789V9.79688C7.83789 8.92663 8.18359 8.09204 8.79895 7.47668C9.4143 6.86133 10.2489 6.51563 11.1191 6.51563H23.8796C24.7498 6.51563 25.5844 6.86133 26.1997 7.47668C26.8151 8.09204 27.1608 8.92663 27.1608 9.79688ZM26.0671 25.8385H8.93164C8.64156 25.8385 8.36336 25.7233 8.15824 25.5182C7.95312 25.3131 7.83789 25.0349 7.83789 24.7448V17.2708H27.1608V24.7448C27.1608 25.0349 27.0456 25.3131 26.8405 25.5182C26.6353 25.7233 26.3571 25.8385 26.0671 25.8385Z"
                  fill="black"/>
              </svg>
              <h4 className="font-bold text-[32px] leading-[1.08] text-[#351904] mt-[11px] mb-[2px]">{t("gettingthere.pmr_transport_title")}</h4>
              <h5 className="font-sans font-light text-[24px] leading-[1.08] text-[#351904]">{t("gettingthere.pmr_transport_subtitle")}</h5>
            </div>
          </a>
          <a href="#public-transport">
            <div className="rounded-[10px] bg-[#2b390e24] px-[28px] py-[20px] h-full">
              <svg width="35" height="35" viewBox="0 0 35 35" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M27.3438 2.1875H7.65625C6.78601 2.1875 5.95141 2.5332 5.33606 3.14856C4.7207 3.76391 4.375 4.59851 4.375 5.46875V27.3438C4.37493 27.8051 4.47232 28.2612 4.66081 28.6822C4.8493 29.1032 5.12463 29.4797 5.46875 29.7869V31.0352C5.46875 31.5065 5.65601 31.9586 5.98932 32.2919C6.32264 32.6252 6.77471 32.8125 7.24609 32.8125H9.16016C9.63154 32.8125 10.0836 32.6252 10.4169 32.2919C10.7502 31.9586 10.9375 31.5065 10.9375 31.0352V30.625H24.0625V31.0352C24.0625 31.5065 24.2498 31.9586 24.5831 32.2919C24.9164 32.6252 25.3685 32.8125 25.8398 32.8125H27.7539C28.2253 32.8125 28.6774 32.6252 29.0107 32.2919C29.344 31.9586 29.5312 31.5065 29.5312 31.0352V29.7869C29.8754 29.4797 30.1507 29.1032 30.3392 28.6822C30.5277 28.2612 30.6251 27.8051 30.625 27.3438V5.46875C30.625 4.59851 30.2793 3.76391 29.6639 3.14856C29.0486 2.5332 28.214 2.1875 27.3438 2.1875ZM10.081 27.3314C9.63075 27.3804 9.17644 27.2885 8.78071 27.0683C8.38497 26.8481 8.06733 26.5106 7.87162 26.1022C7.6759 25.6938 7.61176 25.2347 7.68804 24.7883C7.76432 24.3419 7.97727 23.9302 8.29749 23.61C8.61771 23.2898 9.02943 23.0768 9.47582 23.0005C9.92221 22.9243 10.3813 22.9884 10.7897 23.1841C11.1981 23.3798 11.5356 23.6975 11.7558 24.0932C11.976 24.4889 12.0679 24.9433 12.0189 25.3935C11.965 25.8889 11.7435 26.3512 11.3911 26.7036C11.0387 27.056 10.5764 27.2775 10.081 27.3314ZM16.1328 19.6875H7.65625C7.36617 19.6875 7.08797 19.5723 6.88285 19.3671C6.67773 19.162 6.5625 18.8838 6.5625 18.5938V9.84375C6.5625 9.55367 6.67773 9.27547 6.88285 9.07035C7.08797 8.86523 7.36617 8.75 7.65625 8.75H16.1328C16.2053 8.75 16.2749 8.77881 16.3262 8.83009C16.3774 8.88137 16.4062 8.95092 16.4062 9.02344V19.4141C16.4062 19.4866 16.3774 19.5561 16.3262 19.6074C16.2749 19.6587 16.2053 19.6875 16.1328 19.6875ZM17.5 6.5625H7.6877C7.0998 6.5625 6.59395 6.11133 6.56387 5.52412C6.55636 5.37601 6.57905 5.22792 6.63056 5.08886C6.68207 4.94979 6.76132 4.82265 6.86349 4.71517C6.96567 4.60769 7.08864 4.52211 7.22492 4.46363C7.3612 4.40515 7.50795 4.375 7.65625 4.375H27.3123C27.9002 4.375 28.4061 4.82617 28.4361 5.41338C28.4436 5.56149 28.4209 5.70958 28.3694 5.84864C28.3179 5.98771 28.2387 6.11485 28.1365 6.22233C28.0343 6.32981 27.9114 6.41539 27.7751 6.47387C27.6388 6.53235 27.492 6.5625 27.3438 6.5625H17.5ZM18.8672 8.75H27.3438C27.6338 8.75 27.912 8.86523 28.1171 9.07035C28.3223 9.27547 28.4375 9.55367 28.4375 9.84375V18.5938C28.4375 18.8838 28.3223 19.162 28.1171 19.3671C27.912 19.5723 27.6338 19.6875 27.3438 19.6875H18.8672C18.7947 19.6875 18.7251 19.6587 18.6738 19.6074C18.6226 19.5561 18.5938 19.4866 18.5938 19.4141V9.02344C18.5938 8.95092 18.6226 8.88137 18.6738 8.83009C18.7251 8.77881 18.7947 8.75 18.8672 8.75ZM22.9811 25.3935C22.9321 24.9433 23.024 24.4889 23.2442 24.0932C23.4644 23.6975 23.8019 23.3798 24.2103 23.1841C24.6187 22.9884 25.0778 22.9243 25.5242 23.0005C25.9706 23.0768 26.3823 23.2898 26.7025 23.61C27.0227 23.9302 27.2357 24.3419 27.312 24.7883C27.3882 25.2347 27.3241 25.6938 27.1284 26.1022C26.9327 26.5106 26.615 26.8481 26.2193 27.0683C25.8236 27.2885 25.3692 27.3804 24.919 27.3314C24.4236 27.2775 23.9613 27.056 23.6089 26.7036C23.2565 26.3512 23.035 25.8889 22.9811 25.3935Z"
                  fill="#351904"/>
              </svg>
              <h4 className="font-bold text-[32px] leading-[1.08] text-[#351904] mt-[11px] mb-[2px]">{t("gettingthere.public_transport_title")}</h4>
              <h5 className="font-sans font-light text-[24px] leading-[1.08] text-[#351904]">{t("gettingthere.public_transport_subtitle")}</h5>
            </div>
          </a>
          <a href="#your-transport">
            <div className="rounded-[10px] bg-[#2b390e24] px-[28px] py-[20px] h-full">
              <svg width="35" height="35" viewBox="0 0 35 35" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M24.791 29.1667H10.2077V30.625C10.2077 31.0118 10.054 31.3827 9.78055 31.6562C9.50706 31.9297 9.13612 32.0833 8.74935 32.0833H5.83268C5.44591 32.0833 5.07498 31.9297 4.80148 31.6562C4.52799 31.3827 4.37435 31.0118 4.37435 30.625V17.5H2.91602V11.6667H4.37435V7.29167C4.37435 6.51812 4.68164 5.77625 5.22862 5.22927C5.7756 4.68229 6.51747 4.375 7.29102 4.375H27.7077C28.4812 4.375 29.2231 4.68229 29.7701 5.22927C30.3171 5.77625 30.6243 6.51812 30.6243 7.29167V11.6667H32.0827V17.5H30.6243V30.625C30.6243 31.0118 30.4707 31.3827 30.1972 31.6562C29.9237 31.9297 29.5528 32.0833 29.166 32.0833H26.2493C25.8626 32.0833 25.4916 31.9297 25.2182 31.6562C24.9447 31.3827 24.791 31.0118 24.791 30.625V29.1667ZM7.29102 7.29167V17.5H27.7077V7.29167H7.29102ZM10.9368 26.25C11.517 26.25 12.0734 26.0195 12.4836 25.6093C12.8939 25.1991 13.1243 24.6427 13.1243 24.0625C13.1243 23.4823 12.8939 22.9259 12.4836 22.5157C12.0734 22.1055 11.517 21.875 10.9368 21.875C10.3567 21.875 9.80029 22.1055 9.39005 22.5157C8.97982 22.9259 8.74935 23.4823 8.74935 24.0625C8.74935 24.6427 8.97982 25.1991 9.39005 25.6093C9.80029 26.0195 10.3567 26.25 10.9368 26.25ZM24.0618 26.25C24.642 26.25 25.1984 26.0195 25.6086 25.6093C26.0189 25.1991 26.2493 24.6427 26.2493 24.0625C26.2493 23.4823 26.0189 22.9259 25.6086 22.5157C25.1984 22.1055 24.642 21.875 24.0618 21.875C23.4817 21.875 22.9253 22.1055 22.5151 22.5157C22.1048 22.9259 21.8743 23.4823 21.8743 24.0625C21.8743 24.6427 22.1048 25.1991 22.5151 25.6093C22.9253 26.0195 23.4817 26.25 24.0618 26.25Z"
                  fill="black"/>
              </svg>
              <h4 className="font-bold text-[32px] leading-[1.08] text-[#351904] mt-[11px] mb-[2px]">{t("gettingthere.by_car_title")}</h4>
              <h5 className="font-sans font-light text-[24px] leading-[1.08] text-[#351904]">{t("gettingthere.by_car_subtitle")}</h5>
            </div>
          </a>
        </div>
        <h2 id="our-transport" className="font-bold text-[30px] sm:text-[40px] leading-[1.08] mt-[34px] sm:mt-[54px] mb-[3px] sm:mb-[3px]">
          {t("gettingthere.our_transport.title")}
        </h2>
        <h3 className="text-[22px] sm:text-[28px] font-evolventa mb-[25px] sm:mb-[40px]">
          {t("gettingthere.our_transport.subtitle")}
        </h3>

        {/* Пример цикла по дням */}
        <div className="columns-1 lg:columns-2 gap-[40px] ">
          {Object.entries(t("gettingthere.our_transport.days", {returnObjects: true})).map(([day, rides]) => (
            <React.Fragment key={day}>
              <h6 className="ride-day">{day}</h6>
              <ul className="ride-list">
                {rides.map((ride: string, index: number) => (
                  <li key={index} className="ride-time">{ride}</li>
                ))}
              </ul>
            </React.Fragment>
          ))}
        </div>

        <div className="font-evolventa italic text-[22px] sm:text-[28px] mb-[30px] sm:mb-[60px]">
          <strong>{t("common.price_label")}</strong> - {t("gettingthere.our_transport.price")}
        </div>

        <hr className="h-px my-8 bg-[#35190466] border-0 dark:bg-[#35190466]"/>

        <h2 id="our-transport-pmr" className="font-bold text-[30px] sm:text-[40px] leading-[1.08] mt-[34px] sm:mt-[54px] mb-[3px] sm:mb-[3px]">
          {t("gettingthere.tiraspol_transport.title")}
        </h2>
        <h3 className="text-[22px] sm:text-[28px] font-evolventa mb-[25px] sm:mb-[40px]">
          {t("gettingthere.tiraspol_transport.subtitle")}
        </h3>

        {Object.entries(t("gettingthere.tiraspol_transport.days", {returnObjects: true})).map(([day, rides]) => (
          <React.Fragment key={day}>
            <h6 className="ride-day">{day}</h6>
            <ul className="ride-list">
              {rides.map((ride: string, index: number) => (
                <li key={index} className="ride-time">{ride}</li>
              ))}
            </ul>
          </React.Fragment>
        ))}

        <div className="font-evolventa italic text-[22px] sm:text-[28px] mb-[30px] sm:mb-[60px]">
          <strong>{t("common.price_label")}</strong> - {t("gettingthere.tiraspol_transport.price")}
        </div>

        <div className="p-[20px] sm:p-[30px] border-[2px] border-black mb-[40px] sm:mb-[65px]">
          <p className="text-[22px] sm:text-[28px] font-evolventa mb-[8px]">
            {t("gettingthere.tiraspol_transport.prepaymentInfo")}
          </p>

          <p className="text-[22px] sm:text-[28px] font-evolventa">
            <strong>{t("gettingthere.tiraspol_transport.paymentMethodsTitle")}</strong>
          </p>

          <p className="text-[22px] sm:text-[28px] font-evolventa">
            {t("gettingthere.tiraspol_transport.methodCard")}
          </p>

          <p className="text-[22px] sm:text-[28px] font-evolventa mb-[8px]">
            {t("gettingthere.tiraspol_transport.methodCash")}
          </p>

          <p className="text-[22px] sm:text-[28px] font-evolventa">
            <strong>{t("gettingthere.tiraspol_transport.questionsTitle")}</strong>{" "}
            {t("gettingthere.tiraspol_transport.questionsDesc")}
          </p>

          <p className="text-[22px] sm:text-[28px] font-evolventa">
            {t("gettingthere.tiraspol_transport.telegramCoordinator")}
          </p>

          <p className="text-[22px] sm:text-[28px] font-evolventa">
            {t("gettingthere.tiraspol_transport.telegramChannel")}
            <a
              className="underline hover:no-underline break-all"
              target="_blank"
              rel="noreferrer noopener"
              href={t("gettingthere.tiraspol_transport.telegramLinkHref")}
            >
              {t("gettingthere.tiraspol_transport.telegramLinkText")}
            </a>
          </p>
        </div>

        <hr className="h-px my-8 bg-[#35190466] border-0 dark:bg-[#35190466]"/>

        <h2 id="public-transport" className="font-bold text-[30px] sm:text-[40px] leading-[1.08] mt-[34px] sm:mt-[54px] mb-[3px] sm:mb-[3px]">
          {t("gettingthere.public_transport.title")}
        </h2>
        <h3 className="text-[22px] sm:text-[28px] font-evolventa mb-[25px] sm:mb-[40px]">
          {t("gettingthere.public_transport.subtitle")}
        </h3>

        <div className="ride-day">{t("common.to")}</div>
        <ul className="ride-list">
          {(t("gettingthere.public_transport.forward", {returnObjects: true}) as string[]).map((item, i) => (
            <li key={i} className="ride-time">{item}</li>
          ))}
        </ul>

        <div className="ride-day">{t("common.back")}</div>
        <ul className="ride-list">
          {(t("gettingthere.public_transport.back", {returnObjects: true}) as string[]).map((item, i) => (
            <li key={i} className="ride-time">{item}</li>
          ))}
        </ul>

        <div className="font-evolventa italic text-[22px] sm:text-[28px] mb-[30px] sm:mb-[60px]">
          <strong>{t("common.price_label")}</strong> - {t("gettingthere.public_transport.price")}
        </div>

        <hr className="h-px my-8 bg-[#35190466] border-0 dark:bg-[#35190466]"/>

        <h2 id="your-transport" className="font-bold text-[30px] sm:text-[40px] leading-[1.08] mt-[34px] sm:mt-[54px] mb-[3px] sm:mb-[3px]">
          {t("gettingthere.by_car.title")}
        </h2>
        <h3 className="text-[22px] sm:text-[28px] font-evolventa mb-[25px] sm:mb-[40px]">
          {t("gettingthere.by_car.subtitle")}
        </h3>

        <ul className="ride-list">
          {(t("gettingthere.by_car.directions", {returnObjects: true}) as string[]).map((dir, i) => (
            <li key={i} className="ride-time">{dir}</li>
          ))}

          <li className="ride-time">
            {t("gettingthere.by_car.parking_prefix")}
            <a
              className="underline hover:no-underline break-all"
              target="_blank"
              rel="noreferrer noopener"
              href={t("gettingthere.by_car.parking_link_href")}
            >
              {t("gettingthere.by_car.parking_link_href")}
            </a>
          </li>

          <li className="ride-time">
            {t("gettingthere.by_car.festival_prefix")}
            <a
              className="underline hover:no-underline break-all"
              target="_blank"
              rel="noreferrer noopener"
              href={t("gettingthere.by_car.festival_link_href")}
            >
              {t("gettingthere.by_car.festival_link_href")}
            </a>
          </li>
        </ul>

        <div className="text-[22px] sm:text-[28px] font-evolventa">
          {t("gettingthere.by_car.parking")}
        </div>

        <div className="font-evolventa italic text-[22px] sm:text-[28px] mb-[20px] sm:mb-[60px]">
          <strong>{t("common.price_label_short")}</strong> - {t("gettingthere.by_car.price")}
        </div>

        <hr className="h-px my-8 bg-[#35190466] border-0 dark:bg-[#35190466]"/>

        <h2 className="font-bold text-[30px] sm:text-[40px] leading-[1.08] mt-[34px] sm:mt-[54px] mb-[3px] sm:mb-[3px]">
          {t("gettingthere.rideshare.title")}
        </h2>

        <div className="text-[22px] sm:text-[28px] font-evolventa mb-[20px] sm:mb-[30px]">
          {t("gettingthere.rideshare.telegram")} <a className="underline hover:no-underline break-all" target="_blank" rel="noreferrer noopener" href={t("gettingthere.rideshare.telegram_href")}>{t("gettingthere.rideshare.telegram_href")}</a>.
        </div>

        <div className="text-[22px] sm:text-[28px] font-evolventa mb-[30px] sm:mb-[60px]">
          {t("gettingthere.rideshare.note")}
        </div>
      </div>
      <Footer/>
    </>
  );
}
