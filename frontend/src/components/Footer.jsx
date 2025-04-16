import React from 'react';
import { useTranslation } from 'react-i18next';

const Footer = () => {
    const { t } = useTranslation();

    return (
        <footer className="bg-accent text-text py-8 mt-10">
            <div className="container mx-auto text-center">
                <p className="text-lg font-semibold mb-2">{t('footer.continueStory')}</p>
                <p className="mb-4">{t('footer.eachStep')}</p>
                
                {/* Social media section */}
                <div className="flex justify-center mb-4 gap-16">
                    <a href="#" className="text-text hover:text-secondary transition duration-300">
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                            <path d="M21 10.5l-7.5 4.5V6L21 10.5z"></path>
                        </svg> Facebook
                    </a>
                    <a href="#" className="text-text hover:text-secondary transition duration-300">
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                            <path d="M21 10.5l-7.5 4.5V6L21 10.5z"></path>
                        </svg> Instagram
                    </a>
                    <a href="#" className="text-text hover:text-secondary transition duration-300">
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                            <path d="M21 10.5l-7.5 4.5V6L21 10.5z"></path>
                        </svg> Tiktok
                    </a>
                </div>

                {/* Links section */}
                <div className="flex justify-center mb-6 gap-16">
                    <a href="#" className="text-text hover:text-secondary transition duration-300">
                        {t('footer.aboutUs')}
                    </a>
                    <a href="#" className="text-text hover:text-secondary transition duration-300">
                        {t('footer.contact')}
                    </a>
                    <a href="#" className="text-text hover:text-secondary transition duration-300">
                        {t('footer.privacyPolicy')}
                    </a>
                </div>

                {/* Copyright */}
                <p className="text-sm">© 2025 suicide prevent. {t('footer.allRightsReserved')}</p>
            </div>
        </footer>
    );
};

export default Footer;
