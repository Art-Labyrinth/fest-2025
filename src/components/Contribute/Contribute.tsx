import React, { useState } from "react";
import { Header } from "../Header/Header";
import Footer from "../Footer";
import { useTranslation } from 'react-i18next';

function Contribute() {
    const { t } = useTranslation<'translation'>();
    const [isCopied, setIsCopied] = useState(false);

    interface Ticket {
        category: "basic" | "preferential" | "family";
        name: string;
        count: number;
        price: number;
        email?: string;
    }
    const [newTicket, setNewTicket] = useState<Ticket>({
        category: "basic",
        name: "",
        count: 1,
        price: 500,
        email: "",
    });

    const ticketPricesCurrent = {
        basic: 500,
        preferential: 250,
        family: 375,
    };
    const ticketPricesFuture = {
        basic: 650,
        preferential: 325,
        family: 485,
    };
    const priceChangeDate = new Date('2025-06-12');
    const ticketPrices = (new Date() < priceChangeDate) ? ticketPricesCurrent : ticketPricesFuture;

    return (
        <main>
            <div className="bg-main">
                <Header />
            </div>

            {/*Hero Top */}
            <section
                className="relative bg-cover bg-top sm:bg-[center_50%] py-[5%] w-full"
                style={{ backgroundImage: "url('/contribute_hero_1.jpg')" }}
            >
                <div className="flex flex-col relative px-4 text-center z-10">
                    <h1 className="text-4xl md:text-5xl font-bold text-brown font-deledda mb-4 text-[#F4E4C3] uppercase">
                        {t("contribute.hero_1.header")}
                    </h1>
                    <div className="sm:w-full sm:max-w-[50%] mx-auto p-6 text-[#F4E4C3] whitespace-pre-line">
                        <p className="text-brown text-lg font-extrabold">
                            {t("contribute.hero_1.text_1")}
                        </p>
                        <p className="text-brown text-lg">
                            {t("contribute.hero_1.text_2")}
                        </p>
                    </div>
                </div>
                <div className="absolute inset-0 bg-[#35190499] bg-opacity-60"></div>
            </section>

            {/* Pricing Block */}
            <section className="bg-[#F4E4C3] py-12">
                <div className="container px-4 max-w-6xl mx-auto ">

                    {/* Upper Part */}
                    <div className="text-left mb-12">
                        <h2 className="text-3xl md:text-4xl font-bold text-brown font-deledda mb-4">
                            {t("contribute.pricing.header")}
                        </h2>
                        <p className="text-lg italic text-brown mb-4">
                            "{t("contribute.pricing.motto")}"
                        </p>
                        <p className="text-brown md:w-2/5">
                            {t("contribute.pricing.text")}
                        </p>
                        {(new Date() < priceChangeDate) && (
                            <p className="text-brown bg-[#F6D8B4] border-l-4 border-[#F07B17] p-4 my-4 font-semibold shadow-md rounded">
                                {t("contribute.pricing.warning_1")} <br /> {t("contribute.pricing.warning_2")}
                            </p>
                        )}
                        <p className="font-deledda">
                            {t("contribute.pricing.note")}
                        </p>
                    </div>

                    {/* Lower Part */}
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:h-full">
                        {/* Column 1 */}
                        <div
                            className={`p-5 md:flex flex-col text-left cursor-pointer border-2 transition-all ${newTicket.category === "basic" ? "border-[#2B390E] bg-[#F6D8B4]/60" : "border-transparent"}`}
                            onClick={() => setNewTicket({ ...newTicket, category: "basic", price: ticketPrices.basic })}
                        >
                            <h3 className="text-xl font-bold text-brown mb-2">
                                {t("contribute.pricing.column_1.title")}
                            </h3>
                            <p className="text-2xl font-semibold text-[#4A6218] mb-2">
                                {ticketPrices.basic} mdl
                            </p>
                            <p className="text-brown mb-4">
                                {t("contribute.pricing.column_1.text")}
                            </p>
                        </div>

                        {/* Column 2 */}
                        <div
                            className={`p-5 md:flex flex-col text-left cursor-pointer border-2 transition-all ${newTicket.category === "preferential" ? "border-[#2B390E] bg-[#F6D8B4]/60" : "border-transparent"}`}
                            onClick={() => setNewTicket({ ...newTicket, category: "preferential", price: ticketPrices.preferential })}
                        >
                            <h3 className="text-xl font-bold text-brown mb-2">
                                {t("contribute.pricing.column_2.title")}
                            </h3>
                            <p className="text-2xl font-semibold text-[#4A6218] mb-2">
                                {ticketPrices.preferential} mdl
                            </p>
                            <p className="text-brown mb-4">
                                {t("contribute.pricing.column_2.text")}
                            </p>
                        </div>

                        {/* Column 3 */}
                        <div
                            className={`p-5 md:flex flex-col text-left cursor-pointer border-2 transition-all ${newTicket.category === "family" ? "border-[#2B390E] bg-[#F6D8B4]/60" : "border-transparent"}`}
                            onClick={() => setNewTicket({ ...newTicket, category: "family", price: ticketPrices.family })}
                        >
                            <h3 className="text-xl font-bold text-brown mb-2">
                                {t("contribute.pricing.column_3.title")}
                            </h3>
                            <p className="text-2xl font-semibold text-[#4A6218] mb-2">
                                {ticketPrices.family} mdl
                            </p>
                            <p className="text-brown mb-4">
                                {t("contribute.pricing.column_3.text")}
                            </p>
                        </div>

                        {/* Column 4 */}
                        <div className="md:flex flex-col text-left">
                            <h3 className="text-xl font-bold text-brown mb-2">
                                {t("contribute.pricing.column_4.title")}
                            </h3>
                            <p className="text-brown mb-4">
                                {t("contribute.pricing.column_4.text")}
                            </p>
                            <button
                                className="md:w-4/5 w-1/2 bg-[#4A6218] text-white px-4 py-2 rounded hover:bg-[#4A6218]/75 disabled:bg-[#99a67d] mt-auto"
                                disabled
                            >
                                {t("contribute.pricing.column_4.button")}
                            </button>
                            {t("contribute.pricing.coming_soon")}
                        </div>
                    </div>

                    {/* Submit Form */}
                    <div className="p-6 max-w-5xl w-full mx-auto flex flex-col md:flex-row gap-8 rounded-lg shadow-lg mt-10">
                        {/* Left part: Form */}
                        <form className="flex-1 flex flex-col gap-4" onSubmit={e => { e.preventDefault(); /* TODO: handle submit */ }}>
                            <label className="text-brown font-semibold">
                                {newTicket.category === "basic" ? t("contribute.form.name") : t("contribute.form.lastname")}
                                <input
                                    type="text"
                                    className="mt-1 block w-full rounded border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#4A6218] bg-[#C0CCA440]"
                                    value={newTicket.name}
                                    onChange={e => setNewTicket({ ...newTicket, name: e.target.value })}
                                    required
                                />
                            </label>
                            <label className="text-brown font-semibold flex flex-col gap-2">
                                {t("contribute.form.tickets")}
                                <input
                                    type="range"
                                    min={1}
                                    max={10}
                                    value={newTicket.count}
                                    onChange={e => setNewTicket({ ...newTicket, count: Number(e.target.value) })}
                                    className="w-full accent-[#4A6218]"
                                />
                                <span className="text-brown">{t("contribute.form.count")}: <b>{newTicket.count || 1}</b></span>
                            </label>
                            <label className="text-brown font-semibold">
                                Email
                                <input
                                    type="email"
                                    className="mt-1 block w-full rounded border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#4A6218] bg-[#C0CCA440]"
                                    value={newTicket.email}
                                    onChange={e => setNewTicket({ ...newTicket, email: e.target.value })}
                                    required
                                />
                            </label>
                            {t("contribute.pricing.coming_description")}

                        </form>
                        {/* Right part: Sum and button */}
                        <div className="flex flex-col items-center justify-center bg-[#F6D8B4] rounded-lg p-6 min-w-[220px] shadow-lg">
                            <span className="text-brown text-lg italic mb-2 font-sans font-bold">
                                {newTicket.category === "basic"
                                    ? t("contribute.pricing.guest")
                                    : newTicket.category === "preferential"
                                        ? t("contribute.pricing.column_2.title")
                                        : t("contribute.pricing.column_3.title")}
                            </span>
                            <span className="text-brown text-lg mb-2">{t("contribute.form.total")}</span>
                            <span className="text-3xl font-bold text-[#4A6218] mb-4">
                                {((newTicket.count || 1) * newTicket.price).toLocaleString()} MDL
                            </span>
                            <button
                                type="submit"
                                className="w-full bg-[#4A6218] text-white px-6 py-2 rounded hover:bg-[#4A6218]/75 disabled:bg-[#99a67d] transition-colors"
                                formAction="#"
                                disabled
                            >
                                {t("contribute.form.submit")} <br />
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            <section className="bg-main py-12">
                <div className="container px-4 text-[#351904] font-deledda max-w-6xl mx-auto">
                    {/* Upper Row */}
                    <div className="text-left mb-12">
                        <h2 className="text-2xl md:text-4xl font-bold font-deledda mb-4 uppercase">
                            {t("contribute.help_us.header")}
                        </h2>
                        <p className="md:w-1/2">
                            {t("contribute.help_us.text_1")}
                        </p>
                    </div>

                    {/* Lower Row */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:h-full">
                        {/* Left Column */}
                        <div className="flex flex-col text-left">
                            <div className="mb-4">
                                {(t("contribute.help_us.credentials_list", { returnObjects: true }) as string[]).map((item, idx) => (
                                    <p key={idx} className="text-lg">{item}</p>
                                ))}
                            </div>
                            <button
                                className={`md:w-2/5 w-1/2 ${isCopied ? 'bg-[#4A6218] text-white' : 'bg-transparent border border-black text-black hover:border-white hover:text-white'
                                    } px-4 py-2 rounded mt-auto transition-colors duration-300`}
                                onClick={() => {
                                    const details = (t("contribute.help_us.credentials_list", { returnObjects: true }) as string[]).join(' \n');
                                    navigator.clipboard.writeText(details);
                                    setIsCopied(true);
                                    setTimeout(() => setIsCopied(false), 2000);
                                }}
                            >
                                {isCopied ? t("contribute.help_us.copied") : t("contribute.help_us.button")}
                            </button>
                        </div>

                        {/* Right Column */}
                        <div className="flex flex-col text-left mt-auto">
                            <p className="mb-4">
                                {t("contribute.help_us.text_2")}
                            </p>
                            <button
                                className="md:w-2/5 w-1/2 bg-[#4A6218] text-white px-4 py-2 rounded hover:bg-[#4A6218]/75 disabled:bg-[#99a67d] mt-auto"
                                disabled
                            >
                                {t("contribute.contact_button")}
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            <section className="bg-[#F4E4C3] py-10 ">
                <div className="container mx-auto font-deledda">
                    {/* Upper Row with Green Background */}
                    <div className="bg-[#4A6218] rounded py-10 outline outline-8 outline-[#4A6218]">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-0 px-5 max-w-6xl mx-auto">
                            {/* Upper Left Cell */}
                            <div className="flex flex-col text-left text-[#F4E4C3]">
                                <h3 className="text-xl font-bold text-brown mb-0 uppercase font-sans">
                                    {t("contribute.our_needs.header_1")}
                                </h3>
                                <p className="text-brown  m-0">
                                    {t("contribute.our_needs.header_3")}
                                </p>
                                <ul className="text-brown list-disc mt-4 ml-5">
                                    {(t("contribute.our_needs.list", { returnObjects: true }) as string[]).map((item, idx) => (
                                        <li key={idx}>{item}</li>
                                    ))}
                                </ul>
                            </div>

                            {/* Upper Right Cell */}
                            <div className="flex flex-col text-left text-[#F4E4C3] my-auto gap-5">
                                <p className="text-brown mx-4">
                                    {t("contribute.our_needs.text_3")}
                                </p>
                                <button
                                    className="md:w-2/5 w-1/2 bg-transparent text-white border border-white px-4 py-2 md:mx-4 rounded hover:bg-[#434937] disabled:bg-[#99a67d] mt-auto"
                                    disabled
                                >
                                    {t("contribute.contact_button")}
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Lower Row */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 py-10 max-w-6xl mx-auto text-[#351904]">
                        {/* Lower Left Cell */}
                        <div className="flex flex-col text-left">
                            <h3 className="text-xl font-bold text-brown mb-2 uppercase">
                                {t("contribute.our_needs.header_2")}
                            </h3>
                            <p className="text-brown text-lg">
                                {t("contribute.our_needs.text_2")}
                            </p>
                        </div>

                        {/* Lower Right Cell */}
                        <div className="flex flex-col text-left">
                            <p className="text-brown text-lg mb-4 my-auto">
                                {t("contribute.our_needs.text_4")}
                            </p>
                            <button
                                className="md:w-2/5 w-1/2 bg-[#F07B17] text-white px-4 py-2 rounded hover:bg-[#F07B17]/75 disabled:bg-[#F6D8B4] mt-auto"
                                disabled
                            >
                                {t("contribute.our_needs.button")}
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            {/*Hero Bottom */}
            <section
                className="relative bg-cover bg-top sm:bg-[center_70%]  py-[5%] w-full"
                style={{ backgroundImage: "url('/contribute_hero_2.jpg')" }}
            >
                <div className="flex flex-col relative container mx-auto px-4 text-center z-10">
                    <div className="sm:w-full sm:max-w-[50%] mx-auto p-6 text-[#FFF9EC] whitespace-pre-line">
                        <p className="text-brown text-lg">
                            {t("contribute.hero_2.text")}
                        </p>
                    </div>
                </div>
                <div className="absolute inset-0 bg-[#35190499] bg-opacity-60"></div>
            </section>
            <Footer />
        </main>
    )

}

export default Contribute;