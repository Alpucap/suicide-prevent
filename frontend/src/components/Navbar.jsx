import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import profilImage from '../assets/images/cthpprofil.jpg';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const { t, i18n } = useTranslation();

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    const changeLanguage = (lng) => {
        i18n.changeLanguage(lng);
    };

    return (
        <nav className="bg-white/20 backdrop-blur-md shadow-md fixed w-full z-50 h-16">
            <div className="container mx-auto relative flex items-center justify-between h-full px-4">
                <div className="flex items-center gap-4">
                <button
                    className="md:hidden block text-text"
                    onClick={toggleMenu}
                >
                    <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 6h16M4 12h16M4 18h16"
                    />
                    </svg>
                </button>
                <div className="text-xl font-semibold text-text md:block">
                    SuicidePrevent
                </div>
                </div>

                <div className="hidden md:flex absolute left-1/2 transform -translate-x-1/2 space-x-6">
                <a href="#home" className="text-text hover:text-secondary">{t("navbar.home")}</a>
                <a href="#about" className="text-text hover:text-secondary">{t("navbar.about")}</a>
                <a href="#services" className="text-text hover:text-secondary">{t("navbar.services")}</a>
                <a href="#contact" className="text-text hover:text-secondary">{t("navbar.contact")}</a>
                </div>

                <div className="hidden md:flex items-center gap-4">
                <div className="flex gap-2 items-center text-sm text-text">
                    <button onClick={() => changeLanguage("id")} className="hover:text-secondary">
                    {t('navbar.language.id')}
                    </button>
                    <span>|</span>
                    <button onClick={() => changeLanguage("en")} className="hover:text-secondary">
                    {t('navbar.language.en')}
                    </button>
                </div>
                <a href="#profile">
                    <img
                    src={profilImage}
                    alt="Profile"
                    className="w-10 h-10 rounded-full object-cover"
                    />
                </a>
                </div>
            </div>

            {/* Dropdown menu - Mobile Only */}
            {isOpen && (
                <div className="md:hidden bg-white/80 backdrop-blur p-4 space-y-4 absolute top-16 w-full shadow-md">
                    <a href="#home" className="block text-text hover:text-secondary">{t("navbar.home")}</a>
                    <a href="#about" className="block text-text hover:text-secondary">{t("navbar.about")}</a>
                    <a href="#services" className="block text-text hover:text-secondary">{t("navbar.services")}</a>
                    <a href="#contact" className="block text-text hover:text-secondary">{t("navbar.contact")}</a>
                    <a href="#services" className="block text-text hover:text-secondary">{t("navbar.profile")}</a>
                    <div className="flex gap-4 items-center pt-4 text-text">
                        <button onClick={() => changeLanguage("id")} className="text-sm hover:text-secondary">
                        {t('navbar.language.id')}
                        </button>
                        <span>|</span>
                        <button onClick={() => changeLanguage("en")} className="text-sm hover:text-secondary">
                        {t('navbar.language.en')}
                        </button>
                    </div>
                </div>
            )}
        </nav>   
    );
};

export default Navbar;
