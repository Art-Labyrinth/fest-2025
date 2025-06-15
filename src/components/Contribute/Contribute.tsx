import React, { useState, useRef } from "react";
import { Header } from "../Header/Header";
import Footer from "../Footer";
import { useTranslation } from 'react-i18next';
import { API_URL } from "src/config";
import i18n from "src/i18n";
import { useLocation } from "react-router-dom";

function Contribute() {
    const { t } = useTranslation();
    const [isCopied, setIsCopied] = useState(false);
    const formRef = useRef<HTMLFormElement>(null);
    const formBlockRef = useRef<HTMLDivElement>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [orderData, setOrderData] = useState<any>({
        is_paied: false,
        order_id: 0,
        bpay_url: "",
    });

    const [error, setError] = useState<string | null>(null);
    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const debug = params.get("debug");
    // const fbclid = params.get("fbclid");

    interface Ticket {
        category: "basic" | "preferential" | "family" | "special";
        name: string;
        count: number;
        price: number;
        email: string;

        phone?: string;
        tg?: string;
        message?: string;
    }
    const ticketPricesCurrent = {
        basic: 650,
        preferential: 325,
        family: 485,
    };
    const ticketPricesFuture = {
        basic: 0,
        preferential: 0,
        family: 0,
    };
    const priceChangeDate = new Date('2025-07-01T00:00:00+03:00');
    const ticketPrices = (new Date() < priceChangeDate) ? ticketPricesCurrent : ticketPricesFuture;


    const [newTicket, setNewTicket] = useState<Ticket>({
        category: "basic",
        name: "",
        count: 1,
        price: ticketPrices.basic,
        email: "",

        phone: "",
        tg: "",
        message: "",
    });

    const discountCount = new Date() < priceChangeDate ? 6 : 11;
    const totalPrice = (newTicket.count || 1) * newTicket.price * (newTicket.count >= discountCount && newTicket.category === "basic" ? 0.9 : 1);
    const strikethroughPrice = (newTicket.count || 1) * ticketPrices.basic;



    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        if (formRef.current) {
            if (!formRef.current.reportValidity()) {
                setIsLoading(false);
                return;
            }
        } else {
            setIsLoading(false);
            return;
        }
        const data = {
            type_order: newTicket.category,
            name: newTicket.name,
            quantity: newTicket.count,
            price: newTicket.price,
            email: newTicket.email,
            phone: newTicket.phone,
            tg: newTicket.tg,
            message: newTicket.message,
            lang: i18n.language === "md" ? "ro" : i18n.language,
        }

        try {
            const response = await fetch(`${API_URL}/bpay/create_order`, {
                method: 'POST',
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            });

            if (response.ok) {
                const responseData = await response.json();
                setOrderData({
                    is_paied: true,
                    order_id: responseData?.order_id,
                    bpay_url: responseData?.redirect_url,
                });
            } else {
                throw new Error(`HTTP error! status: ${response.statusText}`);
            }
        } catch (error) {
            setError("Failed to create order. Please try again later.");
            console.error("Failed to create order:", error);

        }
        setIsLoading(false);
    }

    const handleChangeType = (category: Ticket["category"], price: Ticket["price"]) => {
        setNewTicket({ ...newTicket, category: category, price: price });
        formBlockRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });

    }

    const ticketTypes = [
        {
            key: "basic",
            title: t("contribute.pricing.column_1.title"),
            price: ticketPrices.basic,
            text: t("contribute.pricing.column_1.text"),
        },
        {
            key: "preferential",
            title: t("contribute.pricing.column_2.title"),
            price: ticketPrices.preferential,
            text: t("contribute.pricing.column_2.text"),
        },
        {
            key: "family",
            title: t("contribute.pricing.column_3.title"),
            price: ticketPrices.family,
            text: t("contribute.pricing.column_3.text"),
        },
        {
            key: "special",
            title: t("contribute.pricing.column_4.title"),
            price: 0,
            text: t("contribute.pricing.column_4.text"),
        },
    ];

    const inputClass = "mt-1 block w-full rounded border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#4A6218] bg-[#C0CCA440]";

    return (
        <main>
            <div className="bg-main">
                <Header />
            </div>

            {/*Hero Top */}
            <section
                className="relative bg-cover bg-top sm:bg-[center_50%] py-[5%] w-full
                    bg-[url('https://files.art-labyrinth.org/fest2025/contribute/sm_contribute_hero_1.webp')]
                    md:bg-[url('https://files.art-labyrinth.org/fest2025/contribute/md_contribute_hero_1.webp')]
                    lg:bg-[url('https://files.art-labyrinth.org/fest2025/contribute/lg_contribute_hero_1.webp')]
                    xl:bg-[url('https://files.art-labyrinth.org/fest2025/contribute/xl_contribute_hero_1.webp')]
                    2xl:bg-[url('https://files.art-labyrinth.org/fest2025/contribute/2xl_contribute_hero_1.webp')]"

            >
                <div className="flex flex-col relative px-4 text-center z-10">
                    <h1 className="text-4xl md:text-5xl font-bold font-deledda mb-4 text-[#F4E4C3] uppercase">
                        {t("contribute.hero_1.header")}
                    </h1>
                    <div className="max-w-xl mx-auto p-6 text-[#F4E4C3]">
                        {debug && (
                            <p className="text-lg font-extrabold text-red-500 bg-white">
                                Debug mode is ON:
                                <br /> {(new Date()).toLocaleDateString()} {(new Date()).toLocaleTimeString()}
                                <br /> {priceChangeDate.toLocaleDateString()} {priceChangeDate.toLocaleTimeString()}
                                <br /> {new Date() < priceChangeDate ? "True" : "False"}
                            </p>
                        )}
                        <p className="text-lg font-extrabold">
                            {t("contribute.hero_1.text_1")}
                        </p>
                        <p className="text-lg">
                            {t("contribute.hero_1.text_2")}
                        </p>
                    </div>
                </div>
                <div className="absolute inset-0 bg-[#35190499] bg-opacity-60"></div>
            </section>

            {orderData.is_paied ? (
                <section className="flex flex-col bg-[#F4E4C3] py-12 items-center justify-center rounded-lg shadow-lg text-center">
                    {newTicket.category === "special" ? (
                        <>
                            <div className="text-lg mb-2 font-semibold max-w-3xl px-5">
                                {t("contribute.post_form.special_text")}
                            </div>
                        </>
                    ) : (
                        <>
                            <div className="text-brown mb-2 font-semibold">
                                {t("contribute.post_form.grateful")}
                            </div>
                            <div className="mb-4">
                                {t("contribute.post_form.number")}
                                <span className="text-[#4A6218] font-bold text-3xl ml-2">{orderData.order_id}</span>
                            </div>
                            <div className="mb-4 text-brown">
                                {t("contribute.post_form.link_text")}
                            </div>
                            <a
                                href={orderData.bpay_url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="bg-[#4A6218]/10 hover:bg-[#4A6218]/20 rounded-lg px-6 py-3 mb-4"
                            >
                                <span className="text-5xl text-black font-deledda">O</span>
                                <span className="text-5xl text-[#ffae00] font-deledda">nline</span>
                                {/* <img src="https://files.art-labyrinth.org/fest2025/contribute/BPay495x167.svg" alt="BPay" className="h-12" /> */}
                            </a>
                            <div className="mb-2 text-brown">
                                {t("contribute.post_form.terminal")} <span className="font-bold">Bpay</span>.<br />
                            </div>
                            <div className="mt-4 text-brown">
                                {t("contribute.post_form.detail")}<br />
                                {t("contribute.post_form.spam")}
                            </div>
                        </>
                    )}
                </section>
            ) : (
                <>
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
                                <div className="text-brown bg-[#F6D8B4] border-l-4 border-[#F07B17] p-4 my-4 font-semibold shadow-md rounded">
                                    {(t("contribute.pricing.warnings", { returnObjects: true }) as String[]).map((warning, index) => (
                                        <p key={index}>{warning}</p>
                                    ))}
                                </div>
                                <p className="font-deledda">
                                    {t("contribute.pricing.note")}
                                </p>
                            </div>

                            {/* Lower Part */}
                            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:h-full">
                                {ticketTypes.map((type) => (
                                    <div
                                        key={type.key}
                                        className={`p-5 md:flex flex-col text-left cursor-pointer border-2 transition-all ${newTicket.category === type.key ? "border-[#2B390E] rounded-xl bg-[#F6D8B4]/60" : "border-transparent shadow-lg"}`}
                                        onClick={() => handleChangeType(type.key as Ticket["category"], type.price)}
                                    >
                                        <h3 className="text-xl font-bold text-brown mb-2">{type.title}</h3>
                                        {type.key !== "special" && (
                                            <p className="text-2xl font-semibold text-[#4A6218] mb-2">{type.price} mdl</p>
                                        )}
                                        <p className="text-brown mb-4">{type.text}</p>
                                    </div>
                                ))}
                            </div>

                            <div className="my-8 h-0.5 bg-[#4A6218] opacity-40 rounded w-full" />

                            {/* Submit Form */}
                            <div ref={formBlockRef} className="p-6 max-w-5xl w-full mx-auto flex flex-col md:flex-row gap-8 rounded-lg shadow-lg mt-10">
                                {/* Left part: Form */}
                                <form ref={formRef} className="flex-1 flex flex-col gap-4">
                                    <h2 className="text-2xl font-bold text-brown mb-2 text-center">
                                        {newTicket.category === "basic"
                                            ? t("contribute.pricing.column_1.title")
                                            : newTicket.category === "preferential"
                                                ? t("contribute.pricing.column_2.title")
                                                : newTicket.category === "family"
                                                    ? t("contribute.pricing.column_3.title")
                                                    : t("contribute.pricing.column_4.title")}
                                    </h2>

                                    <label className="text-brown font-semibold">
                                        {["basic", "special"].includes(newTicket.category) ? t("contribute.form.name") : t("contribute.form.lastname")}
                                        <input
                                            type="text"
                                            className={inputClass}
                                            value={newTicket.name}
                                            onChange={e => setNewTicket({ ...newTicket, name: e.target.value })}
                                            required
                                        />
                                    </label>
                                    {newTicket.category === "special" ? (
                                        <>
                                            <label className="text-brown font-semibold">
                                                {t("contribute.form.phone")}
                                                <input
                                                    type="tel"
                                                    className={inputClass}
                                                    value={newTicket.phone}
                                                    onChange={e => setNewTicket({ ...newTicket, phone: e.target.value })}
                                                />
                                            </label>
                                            <label className="text-brown font-semibold">
                                                {t("contribute.form.telegram")}
                                                <input
                                                    type="text"
                                                    className={inputClass}
                                                    value={newTicket.tg}
                                                    onChange={e => setNewTicket({ ...newTicket, tg: e.target.value })}
                                                />
                                            </label>
                                            <label className="text-brown font-semibold">
                                                {t("contribute.form.message")}
                                                <textarea
                                                    className={`${inputClass} h-24`}
                                                    value={newTicket.message}
                                                    onChange={e => setNewTicket({ ...newTicket, message: e.target.value })}
                                                    // placeholder={t("contribute.form.message_placeholder")}
                                                    required
                                                ></textarea>
                                            </label>
                                        </>
                                    ) : (
                                        <>
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
                                                    className={inputClass}
                                                    value={newTicket.email}
                                                    onChange={e => setNewTicket({ ...newTicket, email: e.target.value })}
                                                    required
                                                />
                                            </label>
                                        </>
                                    )}

                                </form>
                                {/* Right part: Sum and button */}
                                <div className="flex flex-col items-center justify-center bg-[#F6D8B4] rounded-lg p-6 min-w-[220px] shadow-lg">
                                    {error && <p className="text-red-500 mb-4 text-lg font-bold max-w-48">{error}</p>}
                                    {newTicket.category !== "special" && (
                                        <>
                                            <span className="text-brown text-lg mb-2">{t("contribute.form.total")}</span>
                                            {(newTicket.count >= discountCount && newTicket.category === "basic") && (
                                                <div className="flex flex-row gap-2">
                                                    <span className="line-through text-red-500">
                                                        {strikethroughPrice.toLocaleString()} mdl
                                                    </span>
                                                    {/* <span className="text-lg  -500 mb-2">-10 %</span> */}
                                                </div>
                                            )}
                                            <span className="text-3xl font-bold text-[#4A6218] mb-4">
                                                {totalPrice.toLocaleString()} MDL
                                            </span>
                                        </>
                                    )}
                                    <button
                                        type="button"
                                        className="w-full bg-[#4A6218] text-white px-6 py-2 rounded hover:bg-[#4A6218]/75 disabled:bg-[#99a67d] transition-colors"
                                        onClick={handleSubmit}
                                        disabled={isLoading || (new Date() > priceChangeDate)}
                                    >
                                        {newTicket.category === "special" ? t("contribute.form.special_submit") : t("contribute.form.submit")}
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
                </>
            )
            }

            {
                isLoading && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
                        <div className="flex flex-col items-center">
                            <svg className="animate-spin h-12 w-12 text-[#4A6218] mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
                            </svg>
                        </div>
                    </div>
                )
            }

            {/*Hero Bottom */}
            <section
                className="relative bg-cover bg-top sm:bg-[center_70%]  py-[5%] w-full
                    bg-[url('https://files.art-labyrinth.org/fest2025/contribute/sm_contribute_hero_2.webp')]
                    md:bg-[url('https://files.art-labyrinth.org/fest2025/contribute/md_contribute_hero_2.webp')]
                    lg:bg-[url('https://files.art-labyrinth.org/fest2025/contribute/lg_contribute_hero_2.webp')]
                    xl:bg-[url('https://files.art-labyrinth.org/fest2025/contribute/xl_contribute_hero_2.webp')]
                    2xl:bg-[url('https://files.art-labyrinth.org/fest2025/contribute/2xl_contribute_hero_2.webp')]"
            >
                <div className="flex flex-col relative container mx-auto px-4 text-center z-10">
                    <div className="max-w-lg mx-auto p-6 text-[#FFF9EC]">
                        <p className="text-brown text-lg">
                            {t("contribute.hero_2.text")}
                        </p>
                    </div>
                </div>
                <div className="absolute inset-0 bg-[#35190499] bg-opacity-60"></div>
            </section>
            <Footer />
        </main >
    )

}

export default Contribute;