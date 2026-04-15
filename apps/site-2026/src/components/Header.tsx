import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { t, i18n } = useTranslation();
  const location = useLocation();

  const langs = ["ru", "en", "md"];
  const navLinks = [
    { to: "/", label: t("nav.home") },
    { to: "/about", label: t("nav.about") },
    { to: "/contacts", label: t("nav.contacts") },
  ];

  return (
    <header className="flex items-center justify-between px-5 md:px-12 py-4 bg-[#fffbf5] border-b border-orange-150">
      <Link to="/" className="flex items-center gap-3">
        <img
          src="https://files.art-labyrinth.org/logo-black.svg"
          alt="Art-Labyrinth"
          className="h-10"
        />
      </Link>

      {/* Desktop nav */}
      <nav className="hidden sm:flex items-center gap-6 font-deledda text-brown">
        {navLinks.map((l) => (
          <Link
            key={l.to}
            to={l.to}
            className={`hover:opacity-60 transition-opacity ${location.pathname === l.to ? "font-bold" : ""}`}
          >
            {l.label}
          </Link>
        ))}
      </nav>

      {/* Lang switcher */}
      <div className="hidden sm:flex items-center gap-2 font-deledda text-sm text-brown">
        {langs.map((lng) => (
          <button
            key={lng}
            onClick={() => i18n.changeLanguage(lng)}
            className={`uppercase hover:opacity-60 transition-opacity ${i18n.language === lng ? "font-bold underline" : ""}`}
          >
            {lng}
          </button>
        ))}
      </div>

      {/* Mobile burger */}
      <button className="sm:hidden" onClick={() => setMenuOpen(!menuOpen)}>
        <span className="block w-6 h-0.5 bg-brown mb-1" />
        <span className="block w-6 h-0.5 bg-brown mb-1" />
        <span className="block w-6 h-0.5 bg-brown" />
      </button>

      {menuOpen && (
        <div className="fixed inset-0 bg-[#fffbf5] z-50 flex flex-col items-center justify-center gap-8 font-deledda text-brown text-2xl">
          <button className="absolute top-5 right-8 text-4xl" onClick={() => setMenuOpen(false)}>×</button>
          {navLinks.map((l) => (
            <Link key={l.to} to={l.to} onClick={() => setMenuOpen(false)} className="hover:opacity-60">
              {l.label}
            </Link>
          ))}
          <div className="flex gap-4 text-base mt-4">
            {langs.map((lng) => (
              <button
                key={lng}
                onClick={() => { i18n.changeLanguage(lng); setMenuOpen(false); }}
                className={`uppercase hover:opacity-60 ${i18n.language === lng ? "font-bold underline" : ""}`}
              >
                {lng}
              </button>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
