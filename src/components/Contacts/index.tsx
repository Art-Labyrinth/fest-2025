import React from "react";
import { Header } from "../Header/Header";
import Footer from "../Footer";
import { API_URL } from "src/config";
import { useNavigate } from "react-router-dom";
import { useTranslation } from 'react-i18next';

export default function Contacts() {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = React.useState(false);
    const [formData, setFormData] = React.useState({
        dest: "fest2025",
        name: "",
        last: "",
        phone: "",
        email: "",
        message: "",
        csrf_token: localStorage.getItem("csrf_token") || "",
    });
    const { t } = useTranslation();

    const handleSubmit = async () => {
        setIsLoading(true);
        const emailInput = document.getElementById("email") as HTMLInputElement;
        const messageInput = document.getElementById("message") as HTMLTextAreaElement;

        if (!emailInput.reportValidity() || !messageInput.reportValidity()) {
            if (!emailInput.reportValidity()) {
                emailInput.focus();
            } else if (!messageInput.reportValidity()) {
                messageInput.focus();
            }
            setTimeout(() => {
                setIsLoading(false);
            }, 3000);
            return;
        }

        const sessionId = localStorage.getItem("sessionId") || "";

        try {
            const response = await fetch(`${API_URL}/feedback/submit`, {
                method: 'POST',
                headers: { "X-Session-ID": sessionId || "", "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });
            if (response.ok) {
                alert(t("contacts.form.success.title") + " " + t("contacts.form.success.text"));
                navigate("/");
            } else {
                alert(t("contacts.form.error.title") + " " + t("contacts.form.error.text"));
            }
        } catch (error) {
            console.error('Error submitting form:', error);
        } finally {
            setTimeout(() => {
                setIsLoading(false);
            }, 3000);

        }
    };
    return (
        <>
            <div className="flex flex-col min-h-screen bg-[#F4E4C3]">
                <div className="bg-main">
                    <Header />
                </div>

                <div className="flex-grow">
                    <div className="relative w-full ">
                        <div className="absolute inset-0 bg-about-md-header bg-cover bg-[0_30%]"></div>
                        <div className="relative flex flex-col justify-center bg-[#35190499]/60 text-orange-150 w-full min-h-[30vh] p-10">
                            <h1 className="text-2xl sm:text-4xl mb-4 uppercase text-center">{t("contacts.header.title_1")}<br />{t("contacts.header.title_2")}</h1>
                        </div>
                    </div>

                    <div className="flex flex-col md:flex-row justify-center items-center px-5 sm:px-20 py-20 gap-10">
                        <div className="flex flex-col items-center">
                            <img className="h-20" src="https://files.art-labyrinth.org/fest2025/svg/phone.svg" alt="" />
                            <p className="font-bold font-deledda">{t("contacts.hero.tel_title")}</p>
                            <p className="font-light font-deledda">{t("contacts.hero.tel_text")}</p>
                        </div>
                        <div>
                            <div className="w-1">
                                <img src="https://files.art-labyrinth.org/fest2025/svg/divider.svg" alt="" />
                            </div>
                        </div>
                        <div className="flex flex-col items-center">
                            <img className="h-20" src="https://files.art-labyrinth.org/fest2025/svg/email.svg" alt="" />
                            <p className="font-bold font-deledda">{t("contacts.hero.email_title")}</p>
                            <p className="font-light font-deledda">{t("contacts.hero.email_text")}</p>
                        </div>
                        <div>
                            <div className="w-1">
                                <img src="https://files.art-labyrinth.org/fest2025/svg/divider.svg" alt="" />
                            </div>
                        </div>
                        <div className="flex flex-col items-center">
                            <img className="h-20" src="https://files.art-labyrinth.org/fest2025/svg/web.svg" alt="" />
                            <p className="font-bold font-deledda">{t("contacts.hero.social_title")}</p>
                            <p className="font-light font-deledda">{t("contacts.hero.social_tg")} {t("contacts.hero.social_fb")} {t("contacts.hero.social_ig")}</p>
                        </div>
                    </div>

                    <div className="flex flex-col items-center relative w-full">
                        <div className="absolute inset-0 bg-about-md-art-labyrinth bg-cover bg-center"></div>
                        <div className="flex flex-col bg-[#35190499]/70 w-full relative items-center text-orange-150 text-center p-5 sm:p-28">
                            <p className="font-deledda font-bold text-xl">
                                {t("contacts.form.header_1")}
                            </p>
                            <p className="font-deledda font-light mb-5 text-sm">
                                {t("contacts.form.header_2")}
                            </p>
                            <div className="w-full max-w-xl p-5 rounded shadow-md text-black">
                                <div className="mb-2">
                                    <input
                                        type="text"
                                        id="name"
                                        className="hidden"
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    />
                                    <input
                                        className="shadow appearance-none bg-[#F4E4C3] border rounded w-full py-2 px-3 leading-tight font-light font-deledda text-sm focus:outline-none focus:shadow-outline"
                                        id="last"
                                        type="text"
                                        placeholder={t("contacts.form.name")}
                                        value={formData.last}
                                        onChange={(e) => setFormData({ ...formData, last: e.target.value })}
                                    />
                                </div>
                                <div className="mb-2">
                                    <input
                                        className="shadow appearance-none bg-[#F4E4C3] border rounded w-full py-2 px-3 leading-tight font-light font-deledda text-sm focus:outline-none focus:shadow-outline"
                                        id="phone"
                                        type="tel"
                                        placeholder={t("contacts.form.phone")}
                                        value={formData.phone}
                                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                    />
                                </div>
                                <div className="mb-2">
                                    <input
                                        className="shadow appearance-none bg-[#F4E4C3] border rounded w-full py-2 px-3 leading-tight font-light font-deledda text-sm focus:outline-none focus:shadow-outline"
                                        id="email"
                                        type="email"
                                        placeholder={t("contacts.form.email")}
                                        value={formData.email}
                                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                        required
                                    />
                                </div>
                                <div className="mb-6">
                                    <textarea
                                        className="shadow appearance-none bg-[#F4E4C3] border rounded w-full py-2 px-3 leading-tight font-light font-deledda text-sm focus:outline-none focus:shadow-outline"
                                        id="message"
                                        rows={8}
                                        value={formData.message}
                                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                        required
                                    ></textarea>
                                </div>
                                <div className="flex items-center justify-center">
                                    <button
                                        className={`${isLoading ? "bg-gray-500" : "bg-orange-500 hover:bg-orange-700"} text-[#FFF9EC] py-2 px-10 rounded font-light font-deledda text-sm focus:outline-none focus:shadow-outline`}
                                        type="button"
                                        onClick={handleSubmit}
                                        disabled={isLoading}
                                    >
                                        {t("contacts.form.send")}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <Footer />
            </div>
        </>
    );
}

