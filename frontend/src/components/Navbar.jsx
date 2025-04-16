import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

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
        <nav className="bg-white/20 backdrop-blur-md shadow-md fixed w-full z-50 h-16 flex items-center">
            <div className="container mx-auto flex justify-between items-center px-4">

                {/* Hamburger menu (mobile size) */}
                <button className="text-text md:hidden block" onClick={toggleMenu}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                </button>

                {/* Main nav */}
                <div className="md:flex md:space-x-8 hidden w-full justify-center">
                    <a href="#home" className="relative text-text hover:text-secondary transition duration-300 ease-in-out after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-0 hover:after:w-full after:h-[2px] after:bg-secondary after:transition-all after:duration-300">
                        {t('navbar.home')}
                    </a>
                    <a href="#about" className="relative text-text hover:text-secondary transition duration-300 ease-in-out after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-0 hover:after:w-full after:h-[2px] after:bg-secondary after:transition-all after:duration-300">
                        {t('navbar.about')}
                    </a>
                    <a href="#profile" className="relative text-text hover:text-secondary transition duration-300 ease-in-out after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-0 hover:after:w-full after:h-[2px] after:bg-secondary after:transition-all after:duration-300 mx-4">
                        {t('navbar.profile')}
                    </a>
                    <a href="#services" className="relative text-text hover:text-secondary transition duration-300 ease-in-out after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-0 hover:after:w-full after:h-[2px] after:bg-secondary after:transition-all after:duration-300">
                        {t('navbar.services')}
                    </a>
                    <a href="#contact" className="relative text-text hover:text-secondary transition duration-300 ease-in-out after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-0 hover:after:w-full after:h-[2px] after:bg-secondary after:transition-all after:duration-300">
                        {t('navbar.contact')}
                    </a>
                </div>

                {/* Language switcher */}
                <div className="hidden md:flex gap-2 items-center">
                    <button onClick={() => changeLanguage("id")} className="text-text hover:text-secondary text-sm">{t('navbar.language.id')}</button>
                    <span className="text-text text-sm">|</span>
                    <button onClick={() => changeLanguage("en")} className="text-text hover:text-secondary text-sm">{t('navbar.language.en')}</button>
                    <span className="text-text text-sm">|</span>
                    <button onClick={() => changeLanguage("jp")} className="text-text hover:text-secondary text-sm">{t('navbar.language.jp')}</button>
                </div>
            </div>

            {/* Mobile dropdown */}
            <div className={`${isOpen ? 'block' : 'hidden'} md:hidden bg-secondary text-text p-4 space-y-4 absolute top-16 w-full`}>
                <a href="#home" className="block hover:text-white">{t('navbar.home')}</a>
                <a href="#about" className="block hover:text-white">{t('navbar.about')}</a>
                <a href="#services" className="block hover:text-white">{t('navbar.services')}</a>
                <a href="#profile" className="block hover:text-white">{t('navbar.profile')}</a>
                <a href="#contact" className="block hover:text-white">{t('navbar.contact')}</a>
                <div className="flex gap-4 pt-2">
                    <button onClick={() => changeLanguage("id")} className="text-sm">{t('navbar.language.id')}</button>
                    <button onClick={() => changeLanguage("en")} className="text-sm">{t('navbar.language.en')}</button>
                    <button onClick={() => changeLanguage("jp")} className="text-sm">{t('navbar.language.jp')}</button>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
