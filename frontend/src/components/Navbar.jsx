import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import profilImage from '../assets/images/cthpprofil.jpg';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [activeLink, setActiveLink] = useState('home');
    const [scrolled, setScrolled] = useState(false);
    const { t, i18n } = useTranslation();
    const navigate = useNavigate();

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 10);

            const sections = ['about', 'share-your-thoughts', 'emergency'];
            for (const section of sections) {
                const element = document.getElementById(section);
                if (element) {
                    const rect = element.getBoundingClientRect();
                    if (rect.top <= 100 && rect.bottom >= 100) {
                        setActiveLink(section);
                        return;
                    }
                }
            }

            if (window.scrollY < 200) {
                setActiveLink('home');
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    const changeLanguage = (lng) => {
        i18n.changeLanguage(lng);
    };

    const smoothScroll = (id) => {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({
                behavior: 'smooth',
                block: 'start',
            });
            setActiveLink(id);
            setIsOpen(false);
        }
    };

    const handleLinkClick = (link) => {
        if (link === 'home') {
            navigate('/');
            window.scrollTo({ top: 0, behavior: 'smooth' });
        } else {
            smoothScroll(link);
        }
    };

    const navLinks = ['home', 'about', 'share-your-thoughts', 'emergency'];

    return (
        <nav className={`fixed w-full z-50 h-16 transition-all duration-500 ${scrolled ? 'bg-white/95 backdrop-blur-md shadow-sm' : 'bg-white/90 backdrop-blur-md'}`}>
            <div className="container mx-auto relative flex items-center justify-between h-full px-4">
                {/* Logo */}
                <div className="text-xl font-semibold text-text">
                    SuicidePrevent
                </div>

                {/* Mobile Menu Button */}
                <button
                    className="md:hidden block text-text focus:outline-none"
                    onClick={toggleMenu}
                    aria-label="Toggle menu"
                >
                    <div className="space-y-1.5 w-6">
                        <span className={`block h-0.5 w-6 bg-current transition-all duration-300 ${isOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
                        <span className={`block h-0.5 w-6 bg-current transition-all duration-300 ${isOpen ? 'opacity-0' : 'opacity-100'}`}></span>
                        <span className={`block h-0.5 w-6 bg-current transition-all duration-300 ${isOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
                    </div>
                </button>

                {/* Desktop Navigation */}
                <div className="hidden md:flex items-center space-x-8">
                    {navLinks.map((link) => (
                        <button
                            key={link}
                            onClick={() => handleLinkClick(link)}
                            className={`text-text transition-colors duration-300 ${activeLink === link ? 'text-secondary font-medium' : 'hover:text-secondary'}`}
                        >
                            {t(`navbar.${link}`)}
                        </button>
                    ))}
                </div>

                {/* Language and Profile */}
                <div className="hidden md:flex items-center gap-6">
                    <div className="flex gap-2 items-center text-sm text-text">
                        {['id', 'en'].map((lang, index) => (
                            <React.Fragment key={lang}>
                                <button
                                    onClick={() => changeLanguage(lang)}
                                    className={`transition-colors duration-300 ${i18n.language === lang ? 'text-secondary font-medium' : 'hover:text-secondary'}`}
                                >
                                    {t(`navbar.language.${lang}`)}
                                </button>
                                {index === 0 && <span className="text-gray-400">|</span>}
                            </React.Fragment>
                        ))}
                    </div>
                    <Link
                        to="/profile"
                        className="transition-transform duration-300 hover:scale-105"
                    >
                        <img
                            src={profilImage}
                            alt="Profile"
                            className="w-9 h-9 rounded-full object-cover border-2 border-transparent transition-colors duration-300 hover:border-secondary"
                        />
                    </Link>
                </div>
            </div>

            {/* Mobile Menu */}
            <div className={`md:hidden bg-white/95 backdrop-blur-lg p-6 space-y-5 absolute top-16 w-full shadow-md transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] ${isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-6'}`}>
                {navLinks.map((link) => (
                    <button
                        key={link}
                        onClick={() => handleLinkClick(link)}
                        className={`block text-lg transition-colors duration-300 ${activeLink === link ? 'text-secondary font-medium' : 'hover:text-secondary'}`}
                    >
                        {t(`navbar.${link}`)}
                    </button>
                ))}
                <div className="flex gap-3 items-center pt-4 text-text">
                    {['id', 'en'].map((lang, index) => (
                        <React.Fragment key={lang}>
                            <button
                                onClick={() => changeLanguage(lang)}
                                className={`text-sm transition-colors duration-300 ${i18n.language === lang ? 'text-secondary font-medium' : 'hover:text-secondary'}`}
                            >
                                {t(`navbar.language.${lang}`)}
                            </button>
                            {index === 0 && <span className="text-gray-400">|</span>}
                        </React.Fragment>
                    ))}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
