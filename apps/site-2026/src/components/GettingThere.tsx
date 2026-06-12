import React from "react";
import { useTranslation } from "react-i18next";

/* Brown bus / car icons for the navigation cards (recolored from the 2025 set). */
const BusIcon = () => (
  <svg width="34" height="34" viewBox="0 0 35 36" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-brown">
    <path d="M10.209 21.5555C10.209 21.072 10.401 20.6083 10.7429 20.2665C11.0848 19.9246 11.5484 19.7325 12.0319 19.7325C12.5154 19.7325 12.979 19.9246 13.3209 20.2665C13.6628 20.6083 13.8548 21.072 13.8548 21.5555C13.8548 22.0389 13.6628 22.5026 13.3209 22.8445C12.979 23.1863 12.5154 23.3784 12.0319 23.3784C11.5484 23.3784 11.0848 23.1863 10.7429 22.8445C10.401 22.5026 10.209 22.0389 10.209 21.5555ZM22.9694 19.7325C22.4859 19.7325 22.0223 19.9246 21.6804 20.2665C21.3385 20.6083 21.1465 21.072 21.1465 21.5555C21.1465 22.0389 21.3385 22.5026 21.6804 22.8445C22.0223 23.1863 22.4859 23.3784 22.9694 23.3784C23.4529 23.3784 23.9165 23.1863 24.2584 22.8445C24.6003 22.5026 24.7923 22.0389 24.7923 21.5555C24.7923 21.072 24.6003 20.6083 24.2584 20.2665C23.9165 19.9246 23.4529 19.7325 22.9694 19.7325Z" fill="#351904" />
    <path d="M11.1191 4.32813C9.87424 4.3278 8.66648 4.75223 7.69547 5.53128C6.72445 6.31032 6.04829 7.39734 5.77872 8.61271H5.65039C5.07023 8.61271 4.51383 8.84318 4.10359 9.25341C3.69336 9.66365 3.46289 10.22 3.46289 10.8002V11.894C3.46289 12.4977 3.95289 12.9877 4.55664 12.9877H5.65039V24.7448C5.65039 25.8021 6.1506 26.7427 6.92643 27.3421V29.4844C6.92643 30.0645 7.1569 30.6209 7.56714 31.0312C7.97737 31.4414 8.53377 31.6719 9.11393 31.6719C9.69409 31.6719 10.2505 31.4414 10.6607 31.0312C11.071 30.6209 11.3014 30.0645 11.3014 29.4844V28.026H23.6973V29.4844C23.6973 30.0645 23.9277 30.6209 24.338 31.0312C24.7482 31.4414 25.3046 31.6719 25.8848 31.6719C26.4649 31.6719 27.0213 31.4414 27.4316 31.0312C27.8418 30.6209 28.0723 30.0645 28.0723 29.4844V27.3421C28.4694 27.0355 28.7909 26.642 29.0121 26.1917C29.2333 25.7414 29.3483 25.2465 29.3483 24.7448V12.9877H30.4421C30.7321 12.9877 31.0103 12.8725 31.2155 12.6674C31.4206 12.4622 31.5358 12.184 31.5358 11.894V10.8002C31.5358 10.22 31.3053 9.66365 30.8951 9.25341C30.4849 8.84318 29.9285 8.61271 29.3483 8.61271H29.22C28.9504 7.39734 28.2743 6.31032 27.3032 5.53128C26.3322 4.75223 25.1245 4.3278 23.8796 4.32813H11.1191ZM27.1608 9.79688V15.0833H7.83789V9.79688C7.83789 8.92663 8.18359 8.09204 8.79895 7.47668C9.4143 6.86133 10.2489 6.51563 11.1191 6.51563H23.8796C24.7498 6.51563 25.5844 6.86133 26.1997 7.47668C26.8151 8.09204 27.1608 8.92663 27.1608 9.79688ZM26.0671 25.8385H8.93164C8.64156 25.8385 8.36336 25.7233 8.15824 25.5182C7.95312 25.3131 7.83789 25.0349 7.83789 24.7448V17.2708H27.1608V24.7448C27.1608 25.0349 27.0456 25.3131 26.8405 25.5182C26.6353 25.7233 26.3571 25.8385 26.0671 25.8385Z" fill="#351904" />
  </svg>
);

const CarIcon = () => (
  <svg width="34" height="34" viewBox="0 0 35 35" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M24.791 29.1667H10.2077V30.625C10.2077 31.0118 10.054 31.3827 9.78055 31.6562C9.50706 31.9297 9.13612 32.0833 8.74935 32.0833H5.83268C5.44591 32.0833 5.07498 31.9297 4.80148 31.6562C4.52799 31.3827 4.37435 31.0118 4.37435 30.625V17.5H2.91602V11.6667H4.37435V7.29167C4.37435 6.51812 4.68164 5.77625 5.22862 5.22927C5.7756 4.68229 6.51747 4.375 7.29102 4.375H27.7077C28.4812 4.375 29.2231 4.68229 29.7701 5.22927C30.3171 5.77625 30.6243 6.51812 30.6243 7.29167V11.6667H32.0827V17.5H30.6243V30.625C30.6243 31.0118 30.4707 31.3827 30.1972 31.6562C29.9237 31.9297 29.5528 32.0833 29.166 32.0833H26.2493C25.8626 32.0833 25.4916 31.9297 25.2182 31.6562C24.9447 31.3827 24.791 31.0118 24.791 30.625V29.1667ZM7.29102 7.29167V17.5H27.7077V7.29167H7.29102ZM10.9368 26.25C11.517 26.25 12.0734 26.0195 12.4836 25.6093C12.8939 25.1991 13.1243 24.6427 13.1243 24.0625C13.1243 23.4823 12.8939 22.9259 12.4836 22.5157C12.0734 22.1055 11.517 21.875 10.9368 21.875C10.3567 21.875 9.80029 22.1055 9.39005 22.5157C8.97982 22.9259 8.74935 23.4823 8.74935 24.0625C8.74935 24.6427 8.97982 25.1991 9.39005 25.6093C9.80029 26.0195 10.3567 26.25 10.9368 26.25ZM24.0618 26.25C24.642 26.25 25.1984 26.0195 25.6086 25.6093C26.0189 25.1991 26.2493 24.6427 26.2493 24.0625C26.2493 23.4823 26.0189 22.9259 25.6086 22.5157C25.1984 22.1055 24.642 21.875 24.0618 21.875C23.4817 21.875 22.9253 22.1055 22.5151 22.5157C22.1048 22.9259 21.8743 23.4823 21.8743 24.0625C21.8743 24.6427 22.1048 25.1991 22.5151 25.6093C22.9253 26.0195 23.4817 26.25 24.0618 26.25Z" fill="#351904" />
  </svg>
);

/* Renders a { "day label": ["ride", ...] } map as headed bulleted lists, in two
   columns on large screens. break-inside-avoid keeps a day's rides together. */
function DaysBlock({ days }: { days: Record<string, string[]> }) {
  return (
    <div className="columns-1 lg:columns-2 gap-10">
      {Object.entries(days).map(([day, rides]) => (
        <div key={day} className="break-inside-avoid mb-6">
          <h6 className="font-evolventa font-bold text-lg sm:text-xl mb-2">{day}</h6>
          <ul className="list-disc list-inside ml-2 font-evolventa text-lg sm:text-xl space-y-1">
            {rides.map((ride, i) => (
              <li key={i}>{ride}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

function SectionHeading({ id, title, subtitle }: { id: string; title: string; subtitle?: string }) {
  return (
    <>
      <h2 id={id} className="scroll-mt-24 font-roca uppercase text-2xl sm:text-4xl leading-tight mt-14 mb-1">
        {title}
      </h2>
      {subtitle && <h3 className="font-evolventa text-lg sm:text-2xl mb-7 opacity-80">{subtitle}</h3>}
    </>
  );
}

const Divider = () => <hr className="my-10 border-0 h-px bg-brown/30" />;

export default function GettingThere() {
  const { t } = useTranslation();

  const orgDays = t("gettingthere.org.days", { returnObjects: true }) as Record<string, string[]>;
  const pmrDays = t("gettingthere.pmr.days", { returnObjects: true }) as Record<string, string[]>;
  const publicRides = t("gettingthere.public.rides", { returnObjects: true }) as string[];
  const carPrices = t("gettingthere.car.prices", { returnObjects: true }) as string[];

  const navCards = [
    { href: "#org", icon: <BusIcon />, title: t("gettingthere.nav.org"), sub: t("gettingthere.nav.org_sub") },
    { href: "#pmr", icon: <BusIcon />, title: t("gettingthere.nav.pmr"), sub: t("gettingthere.nav.pmr_sub") },
    { href: "#public", icon: <BusIcon />, title: t("gettingthere.nav.public"), sub: t("gettingthere.nav.public_sub") },
    { href: "#car", icon: <CarIcon />, title: t("gettingthere.nav.car"), sub: t("gettingthere.nav.car_sub") },
  ];

  const linkClass = "underline hover:no-underline break-all";

  return (
    <div className="font-deledda text-brown bg-[#FFF9EC] sm:bg-[#F4E4C3]">
      {/* Page header (2026 brown bar, same pattern as Program) */}
      <div className="bg-brown text-orange-150 flex flex-col items-center justify-center text-center gap-2 py-14 px-5">
        <h1 className="text-3xl sm:text-5xl font-roca uppercase">{t("gettingthere.header")}</h1>
        <p className="font-deledda text-sm sm:text-base opacity-90">{t("gettingthere.subheader")}</p>
      </div>

      <div className="max-w-screen-2xl mx-auto px-5 sm:px-8 py-12">
        {/* Anchor navigation cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 sm:gap-6">
          {navCards.map((card) => (
            <a key={card.href} href={card.href}>
              <div className="h-full rounded-xl bg-brown/10 px-6 py-5 transition-colors hover:bg-brown/20">
                {card.icon}
                <h4 className="font-roca text-xl sm:text-2xl leading-tight mt-3">{card.title}</h4>
                <h5 className="font-deledda font-light text-base sm:text-lg leading-tight opacity-80">{card.sub}</h5>
              </div>
            </a>
          ))}
        </div>

        {/* 1. Organized transport (Chișinău) */}
        <SectionHeading id="org" title={t("gettingthere.org.title")} subtitle={String(t("gettingthere.org.subtitle"))} />
        <DaysBlock days={orgDays} />
        <p className="font-evolventa italic text-lg sm:text-2xl mt-2 mb-8">{t("gettingthere.org.price")}</p>

        <div className="border-2 border-brown/40 rounded-xl p-5 sm:p-7 space-y-4 font-evolventa text-lg sm:text-xl">
          <p>
            {t("gettingthere.org.registration")}{" "}
            <a className={linkClass} target="_blank" rel="noreferrer noopener" href={String(t("gettingthere.org.registration_link"))}>
              {t("gettingthere.org.registration_link")}
            </a>
          </p>
          <p>
            {t("gettingthere.org.payment_note")}{" "}
            <a className={linkClass} href={`tel:${t("gettingthere.org.payment_phone_tel")}`}>
              {t("gettingthere.org.payment_phone")}
            </a>
          </p>
          <div>
            <p className="font-bold">{t("gettingthere.org.contact_label")}</p>
            <p>{t("gettingthere.org.contact_name")}</p>
            <p>
              <a className={linkClass} href={`tel:${t("gettingthere.org.contact_phone_tel")}`}>
                {t("gettingthere.org.contact_phone")}
              </a>
            </p>
            <p>
              Telegram:{" "}
              <a className={linkClass} target="_blank" rel="noreferrer noopener" href={String(t("gettingthere.org.contact_telegram_link"))}>
                {t("gettingthere.org.contact_telegram")}
              </a>
            </p>
          </div>
          <p>{t("gettingthere.org.contact_hours")}</p>
        </div>

        <Divider />

        {/* 2. Transnistria transport */}
        <SectionHeading id="pmr" title={t("gettingthere.pmr.title")} />
        <DaysBlock days={pmrDays} />
        <p className="font-evolventa italic text-lg sm:text-2xl mt-2 mb-2">{t("gettingthere.pmr.price")}</p>
        <p className="font-evolventa text-lg sm:text-xl mb-8">{t("gettingthere.pmr.registration")}</p>

        <div className="font-evolventa text-lg sm:text-xl space-y-2 mb-8">
          <p className="font-bold">{t("gettingthere.pmr.booking_label")}</p>
          <p>
            <a className={linkClass} href={`tel:${t("gettingthere.pmr.booking_phone_1_tel")}`}>
              {t("gettingthere.pmr.booking_phone_1")}
            </a>
          </p>
          <p>
            <a className={linkClass} href={`tel:${t("gettingthere.pmr.booking_phone_2_tel")}`}>
              {t("gettingthere.pmr.booking_phone_2")}
            </a>
          </p>
          <p>
            Telegram:{" "}
            <a className={linkClass} target="_blank" rel="noreferrer noopener" href={String(t("gettingthere.pmr.booking_telegram_link"))}>
              {t("gettingthere.pmr.booking_telegram")}
            </a>
          </p>
        </div>

        <div className="border-2 border-brown/40 rounded-xl p-5 sm:p-7 font-evolventa text-lg sm:text-xl">
          ⚠️ {t("gettingthere.pmr.warning")}
        </div>

        <Divider />

        {/* 3. Public minibus */}
        <SectionHeading id="public" title={t("gettingthere.public.title")} subtitle={String(t("gettingthere.public.subtitle"))} />
        <h6 className="font-evolventa font-bold text-lg sm:text-xl mb-2">{t("gettingthere.public.daily_label")}</h6>
        <ul className="list-disc list-inside ml-2 font-evolventa text-lg sm:text-xl space-y-1 mb-8">
          {publicRides.map((ride, i) => (
            <li key={i}>{ride}</li>
          ))}
        </ul>
        <p className="font-evolventa text-lg sm:text-xl">
          <span className="font-bold">{t("gettingthere.public.driver_label")}</span>{" "}
          <a className={linkClass} href={`tel:${t("gettingthere.public.driver_phone_tel")}`}>
            {t("gettingthere.public.driver_phone")}
          </a>
        </p>

        <Divider />

        {/* 4. By private car */}
        <SectionHeading id="car" title={t("gettingthere.car.title")} />
        <p className="font-evolventa text-lg sm:text-xl mb-4">{t("gettingthere.car.intro")}</p>
        <p className="font-evolventa text-lg sm:text-xl mb-2">{t("gettingthere.car.parking_intro")}</p>
        <ul className="list-disc list-inside ml-2 font-evolventa text-lg sm:text-xl space-y-1 mb-4">
          {carPrices.map((price, i) => (
            <li key={i}>{price}</li>
          ))}
        </ul>
        <p className="font-evolventa text-lg sm:text-xl mb-4">{t("gettingthere.car.outro")}</p>
        <p className="font-evolventa text-lg sm:text-xl mb-8">
          <span className="font-bold">{t("gettingthere.car.parking_label")}</span>{" "}
          <a className={linkClass} target="_blank" rel="noreferrer noopener" href={String(t("gettingthere.car.parking_link"))}>
            {t("gettingthere.car.parking_link")}
          </a>
        </p>

        <div className="border-2 border-brown/40 rounded-xl p-5 sm:p-7 font-evolventa text-lg sm:text-xl">
          ⚠️ {t("gettingthere.car.warning")}
        </div>
      </div>
    </div>
  );
}
