import React, { useEffect, useRef, useState } from "react";
import { Header } from "../Header/Header";
import Footer from "../Footer";
import { useTranslation } from 'react-i18next';

function Contribute() {
    const { t } = useTranslation<'translation'>();
    const [activePopup, setActivePopup] = useState<string | null>(null);
    const [isCopied, setIsCopied] = useState(false);

    interface Ticket {
        id: number;
        category: "basic" | "family" | "child" | "discount"; // Новые категории
        name: string;
        surname?: string; // Необязательно для детей
        email?: string; // Необязательно для детей и льготного
        isParent?: boolean; // Для семейной категории
    }
    const [tickets, setTickets] = useState<Ticket[]>([]);
    const [newTicket, setNewTicket] = useState<Ticket>({ id: 0, category: "basic", name: "", surname: "", email: "", isParent: false });
    const [familyMembers, setFamilyMembers] = useState<{ adults: number; children: number }>({ adults: 1, children: 1 });
    const [email, setEmail] = useState<string>("");
    const [familySurname, setFamilySurname] = useState<string>("");

    const addTicket = () => {
        if (
            newTicket.name &&
            (newTicket.category !== "family" || (newTicket.isParent ? newTicket.email : true)) &&
            (newTicket.category !== "discount" || email || true) &&
            (newTicket.category !== "child" || !newTicket.email)
        ) {
            const ticketToAdd = { ...newTicket, id: Date.now(), surname: newTicket.category === "family" ? familySurname : newTicket.surname };
            if (newTicket.category === "family" && newTicket.isParent) ticketToAdd.email = email;
            setTickets([...tickets, ticketToAdd]);
            setNewTicket({ id: 0, category: "basic", name: "", surname: "", email: "", isParent: false });
        }
    };

    const addAdult = () => familyMembers.adults < 2 && setFamilyMembers({ ...familyMembers, adults: familyMembers.adults + 1 });
    const addChild = () => familyMembers.children < 10 && setFamilyMembers({ ...familyMembers, children: familyMembers.children + 1 });

    const calculateTicketPrice = (ticket: Ticket) => {
        const basePrices = {
            basic: 500,
            family: 375,
            child: 0,
            discount: 250
        };
        const basicTicketsCount = tickets.filter(t => t.category === "basic").length;
        if (ticket.category === "basic" && basicTicketsCount >= 6) {
            return basePrices.basic * 0.9; // 10% скидка
        }
        return basePrices[ticket.category];
    };

const calculateTotal = () => {
    return tickets.reduce((total, ticket) => total + calculateTicketPrice(ticket), 0);
};

    const isPaymentEnabled = () => {
        const hasAdult = tickets.some(t => t.isParent);
        const hasChild = tickets.some(t => !t.isParent && t.category === "family");
        return hasAdult && hasChild && tickets.every(t => t.name && (t.isParent ? t.email : true));
    };

    const openPopup = (popupId: string) => {
        setActivePopup(popupId);
    };

    const closePopup = () => {
        setActivePopup(null);
    };

    return (
    <main>
        <div className="bg-main">
            <Header />
        </div>
        
        {/*Hero Top */}
        <section
          className="relative bg-cover bg-top sm:bg-[center_50%]  py-[5%] w-full"
          style={{ backgroundImage: "url('/contribute_hero_1.jpg')" }}
        >
          <div className="flex flex-col relative px-4 text-center z-10">
            <h1 className="text-4xl md:text-5xl font-bold text-brown font-deledda mb-4 text-[#F4E4C3]">
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
            <div className="container mx-auto px-4">
                
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
                </div>

                {/* Lower Part */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:h-full">
                    {/* Column 1 */}
                    <div className="md:flex flex-col text-left">
                        <h3 className="text-xl font-bold text-brown mb-2">
                            {t("contribute.pricing.column_1.title")}
                        </h3>
                        <p className="text-2xl font-semibold text-[#4A6218] mb-2">
                            {t("contribute.pricing.column_1.price")}
                        </p>
                        <p className="text-brown mb-4">
                            {t("contribute.pricing.column_1.text")}
                        </p>
                        <button
                            className="md:w-4/5 w-1/2 bg-[#4A6218] text-white px-4 py-2 rounded hover:bg-[#4A6218]/75 mt-auto"
                            onClick={() => openPopup('ticket')}
                        >
                            {t("contribute.pricing.button")}
                        </button>
                    </div>

                    {/* Column 2 */}
                    <div className="md:flex flex-col text-left">
                        <h3 className="text-xl font-bold text-brown mb-2">
                            {t("contribute.pricing.column_2.title")}
                        </h3>
                        <p className="text-2xl font-semibold text-[#4A6218] mb-2">
                            {t("contribute.pricing.column_2.price")}
                        </p>
                        <p className="text-brown mb-4">
                            {t("contribute.pricing.column_2.text")}
                        </p>
                        <button
                            className="md:w-4/5 w-1/2 bg-[#F07B17] text-white px-4 py-2 rounded hover:bg-[#F07B17]/75 mt-auto"
                            onClick={() => openPopup('popup2')}
                        >
                            {t("contribute.pricing.button")}
                        </button>
                    </div>

                    {/* Column 3 */}
                    <div className="md:flex flex-col text-left">
                        <h3 className="text-xl font-bold text-brown mb-2">
                            {t("contribute.pricing.column_3.title")}
                        </h3>
                        <p className="text-2xl font-semibold text-[#4A6218] mb-2">
                            {t("contribute.pricing.column_3.price")}
                        </p>
                        <p className="text-brown mb-4">
                            {t("contribute.pricing.column_3.text")}
                        </p>
                        <button
                            className="md:w-4/5 w-1/2 bg-[#F07B17] text-white px-4 py-2 rounded hover:bg-[#F07B17]/75 mt-auto"
                            onClick={() => openPopup('popup3')}
                        >
                            {t("contribute.pricing.button")}
                        </button>
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
                            className="md:w-4/5 w-1/2 bg-[#4A6218] text-white px-4 py-2 rounded hover:bg-[#4A6218]/75 mt-auto"
                        >
                            {t("contribute.pricing.column_4.button")}
                        </button>
                    </div>
                </div>

                {/* Popup Modals (Placeholder) */}
                {activePopup && activePopup === 'ticket' && (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-[#F4E4C3] p-6 rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto relative">
            <button
                className="absolute left-4 top-4 text-black text-2xl font-bold"
                onClick={closePopup}
            >
                &times;
            </button>
            <h3 className="text-2xl font-bold text-black mb-4">
                {t("contribute.ticket_form.title")}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Left Column - Ticket Selection */}
                <div className="space-y-4">
                    <div>
                        <select
                            className="w-full bg-[#C0CCA4]/25 text-black p-2 rounded"
                            value={newTicket.category}
                            onChange={(e) => {
                                const category = e.target.value as "basic" | "family" | "child" | "discount";
                                setNewTicket({ ...newTicket, category, isParent: category === "family" ? true : false });
                            }}
                        >
                            <option value="basic">{t("contribute.ticket_form.basic")}</option>
                            <option value="family">{t("contribute.ticket_form.family")}</option>
                            <option value="child">{t("contribute.ticket_form.child")}</option>
                            <option value="discount">{t("contribute.ticket_form.discount")}</option>
                        </select>
                    </div>
                    {newTicket.category === "family" ? (
                        <>
                            <div className="border border-black p-4 rounded">
                                <input
                                    type="text"
                                    className="w-full bg-[#C0CCA4]/25 text-black p-2 rounded"
                                    value={familySurname}
                                    onChange={(e) => setFamilySurname(e.target.value)}
                                    placeholder={t("contribute.ticket_form.surname_placeholder")}
                                />
                            </div>
                            {Array.from({ length: familyMembers.adults }).map((_, index) => (
                                <div key={index} className="border border-black p-4 rounded">
                                    <input
                                        type="text"
                                        className="w-full bg-[#C0CCA4]/25 text-black p-2 rounded mb-2"
                                        value={tickets.find(t => t.isParent && tickets.indexOf(t) === index)?.name || ""}
                                        onChange={(e) => {
                                            const newTickets = [...tickets];
                                            if (!newTickets[index]) newTickets[index] = { id: Date.now(), category: "family", name: "", surname: familySurname, email: "", isParent: true };
                                            newTickets[index].name = e.target.value;
                                            setTickets(newTickets);
                                        }}
                                        placeholder={t("contribute.ticket_form.name_placeholder")}
                                    />
                                    <input
                                        type="email"
                                        className="w-full bg-[#C0CCA4]/25 text-black p-2 rounded"
                                        value={tickets.find(t => t.isParent && tickets.indexOf(t) === index)?.email || ""}
                                        onChange={(e) => {
                                            const newTickets = [...tickets];
                                            if (!newTickets[index]) newTickets[index] = { id: Date.now(), category: "family", name: "", surname: familySurname, email: "", isParent: true };
                                            newTickets[index].email = e.target.value;
                                            setTickets(newTickets);
                                        }}
                                        placeholder={t("contribute.ticket_form.email_placeholder")}
                                    />
                                </div>
                            ))}
                            {Array.from({ length: familyMembers.children }).map((_, index) => (
                                <div key={index + familyMembers.adults} className="border border-black p-4 rounded">
                                    <input
                                        type="text"
                                        className="w-full bg-[#C0CCA4]/25 text-black p-2 rounded"
                                        value={tickets.find(t => !t.isParent && tickets.indexOf(t) === index + familyMembers.adults)?.name || ""}
                                        onChange={(e) => {
                                            const newTickets = [...tickets];
                                            if (!newTickets[index + familyMembers.adults]) newTickets[index + familyMembers.adults] = { id: Date.now(), category: "family", name: "", surname: familySurname, email: "", isParent: false };
                                            newTickets[index + familyMembers.adults].name = e.target.value;
                                            setTickets(newTickets);
                                        }}
                                        placeholder={t("contribute.ticket_form.name_placeholder")}
                                    />
                                </div>
                            ))}
                            <div className="flex space-x-4">
                                <button
                                    className="bg-[#F07B17] text-white px-4 py-2 rounded hover:bg-[#F07B17]/75"
                                    onClick={addAdult}
                                    disabled={familyMembers.adults >= 2}
                                >
                                    {t("contribute.ticket_form.add_parent")}
                                </button>
                                <button
                                    className="bg-[#F07B17] text-white px-4 py-2 rounded hover:bg-[#F07B17]/75"
                                    onClick={addChild}
                                    disabled={familyMembers.children >= 10}
                                >
                                    {t("contribute.ticket_form.add_child")}
                                </button>
                                <button
                                    className="bg-[#F07B17] text-white px-4 py-2 rounded hover:bg-[#F07B17]/75"
                                    onClick={() => {
                                        if (familySurname && tickets.every(t => t.name && (t.isParent ? t.email : true))) {
                                            setTickets([...tickets]);
                                            setFamilyMembers({ adults: 1, children: 1 });
                                            setFamilySurname("");
                                        }
                                    }}
                                >
                                    {t("contribute.ticket_form.add_ticket")}
                                </button>
                            </div>
                        </>
                    ) : (
                        <div className="border border-black p-4 rounded">
                            <input
                                type="text"
                                className="w-full bg-[#C0CCA4]/25 text-black p-2 rounded mb-2"
                                value={newTicket.name}
                                onChange={(e) => setNewTicket({ ...newTicket, name: e.target.value })}
                                placeholder={t("contribute.ticket_form.name_placeholder")}
                            />
                            <input
                                type="text"
                                className="w-full bg-[#C0CCA4]/25 text-black p-2 rounded mb-2"
                                value={newTicket.surname}
                                onChange={(e) => setNewTicket({ ...newTicket, surname: e.target.value })}
                                placeholder={t("contribute.ticket_form.surname_placeholder")}
                            />
                            {newTicket.category !== "child" && (
                                <input
                                    type="email"
                                    className="w-full bg-[#C0CCA4]/25 text-black p-2 rounded mb-2"
                                    value={newTicket.category === "discount" ? email : newTicket.email || ""}
                                    onChange={(e) => {
                                        if (newTicket.category === "discount") setEmail(e.target.value);
                                        else setNewTicket({ ...newTicket, email: e.target.value });
                                    }}
                                    placeholder={t("contribute.ticket_form.email_placeholder")}
                                    disabled={newTicket.category === "discount" && email === ""}
                                />
                            )}
                            <button
                                className="bg-[#F07B17] text-white px-4 py-2 rounded hover:bg-[#F07B17]/75 mt-4"
                                onClick={addTicket}
                            >
                                {t("contribute.ticket_form.add_ticket")}
                            </button>
                        </div>
                    )}
                </div>

                {/* Right Column - Cart */}
                <div className="space-y-4">
                    <h4 className="text-lg font-semibold text-black">
                        {t("contribute.ticket_form.cart")}
                    </h4>
                    <ul className="space-y-2">
                        {tickets.map((ticket) => (
                            <li key={ticket.id} className="border border-black p-2 rounded text-black flex justify-between items-center">
                                <span>
                                    {t(`contribute.ticket_form.${ticket.category}`)} - {ticket.name}
                                </span>
                                <span>
                                    {calculateTicketPrice(ticket)} лей
                                </span>
                            </li>
                        ))}
                    </ul>
                    <p className="text-black font-bold mt-4">
                        {t("contribute.ticket_form.total")}: {calculateTotal()} лей
                    </p>
                    <div className="flex space-x-4">
                        <button
                            className="bg-[#F07B17] text-white px-4 py-2 rounded hover:bg-[#F07B17]/75"
                            onClick={() => console.log("Proceed to payment with total:", calculateTotal(), "Email:", email)}
                            disabled={!isPaymentEnabled()}
                        >
                            {t("contribute.ticket_form.pay")}
                        </button>
                        <button
                            className="bg-[#F07B17] text-white px-4 py-2 rounded hover:bg-[#F07B17]/75"
                            onClick={() => {
                                setTickets([]);
                                setFamilyMembers({ adults: 1, children: 1 });
                                setFamilySurname("");
                                setEmail("");
                            }}
                        >
                            {t("contribute.ticket_form.clear_cart")}
                        </button>
                    </div>
                    {tickets.some(t => t.category === "discount") && (
                        <p className="text-black mt-4">
                            {t("contribute.ticket_form.contact_for_special_case")}:
                            Contact: example@email.com
                        </p>
                    )}
                </div>
            </div>
        </div>
    </div>
)}
            </div>
        </section>

        <section className="bg-main py-12">
          <div className="container mx-auto px-4">
              {/* Upper Row */}
              <div className="text-left mb-12">
                  <h2 className="text-2xl md:text-4xl font-bold text-brown font-deledda mb-4 uppercase">
                      {t("contribute.help_us.header")}
                  </h2>
                  <p className="text-brown text-lg md:w-1/2">
                      {t("contribute.help_us.text_1")}
                  </p>
              </div>

              {/* Lower Row */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:h-full">
                  {/* Left Column */}
                  <div className="flex flex-col text-left">
                      <div className="mb-4">
                          <p className="text-brown text-lg font-bold">
                              {t("contribute.help_us.credentials.bank_name")}
                          </p>
                          <p className="text-brown text-lg">
                              SWIFT-ul Bancii: <span className="font-bold">{t("contribute.help_us.credentials.swift")}</span>
                          </p>
                          <p className="text-brown text-lg">
                              Adresa: <span className="font-bold">{t("contribute.help_us.credentials.address")}</span>
                          </p>
                          <p className="text-brown text-lg">
                              Date beneficiar: <span className="font-bold">{t("contribute.help_us.credentials.account_name")}</span>
                          </p>
                          <p className="text-brown text-lg">
                              Cod fiscal: <span className="font-bold">{t("contribute.help_us.credentials.fisc")}</span>
                          </p>
                          <p className="text-brown text-lg">
                              Nr.contului/IBAN: <span className="font-bold">{t("contribute.help_us.credentials.iban")}</span>
                          </p>
                      </div>
                      <button
                          className={`md:w-2/5 w-1/2 ${
                              isCopied ? 'bg-[#4A6218] text-white' : 'bg-transparent border border-black text-black hover:border-white hover:text-white'
                          } px-4 py-2 rounded mt-auto transition-colors duration-300`}
                          onClick={() => {
                              const details = `${t("contribute.help_us.credentials.bank_name")}\n${t("contribute.help_us.credentials.swift")}\n${t("contribute.help_us.credentials.address")}\n${t("contribute.help_us.credentials.account_name")}\n${t("contribute.help_us.credentials.fisc")}\n${t("contribute.help_us.credentials.iban")}`;
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
                      <p className="text-brown mb-4 text-lg">
                          {t("contribute.help_us.text_2")}
                      </p>
                      <button
                          className="md:w-2/5 w-1/2 bg-[#4A6218] text-white px-4 py-2 rounded hover:bg-[#4A6218]/75 mt-auto"
                      >
                          {t("contribute.contact_button")}
                      </button>
                  </div>
              </div>
          </div>
        </section>

        <section className="bg-[#F4E4C3] py-12">
            <div className="container mx-auto px-4">
                {/* Upper Row with Green Background */}
                <div className="bg-[#4A6218] rounded py-10 outline outline-8 outline-[#4A6218]">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
                        {/* Upper Left Cell */}
                        <div className="flex flex-col text-left text-[#F4E4C3]">
                            <h3 className="text-xl font-bold text-brown mb-0 uppercase">
                                {t("contribute.our_needs.header_1")}
                            </h3>
                            <p className="text-brown text-lg m-0">
                                {t("contribute.our_needs.header_2")}
                            </p>
                            <ul className="text-brown text-lg list-disc mt-4 ml-5">
                                <li>{t("contribute.our_needs.list.item_1")}</li>
                                <li>{t("contribute.our_needs.list.item_2")}</li>
                                <li>{t("contribute.our_needs.list.item_3")}</li>
                                <li>{t("contribute.our_needs.list.item_4")}</li>
                                <li>{t("contribute.our_needs.list.item_5")}</li>
                                <li>{t("contribute.our_needs.list.item_6")}</li>
                                <li>{t("contribute.our_needs.list.item_7")}</li>
                            </ul>
                        </div>

                        {/* Upper Right Cell */}
                        <div className="flex flex-col text-left text-[#F4E4C3]">
                            <p className="text-brown text-lg mx-4">
                                {t("contribute.our_needs.text_3")}
                            </p>
                            <button
                                className="md:w-2/5 w-1/2 bg-transparent text-white border border-white px-4 py-2 md:mx-4 rounded hover:bg-[#99a67d] mt-auto"
                            >
                                {t("contribute.contact_button")}
                            </button>
                        </div>
                    </div>
                </div>

                {/* Lower Row */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 py-10">
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
                        <p className="text-brown text-lg mb-4">
                            {t("contribute.our_needs.text_4")}
                        </p>
                        <button
                            className="md:w-2/5 w-1/2 bg-[#F07B17] text-white px-4 py-2 rounded hover:bg-[#F07B17]/75 mt-auto"
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
        <Footer/>
    </main>
    )
    
}

export default Contribute;