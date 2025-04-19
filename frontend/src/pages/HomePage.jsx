import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import newsData from "../assets/data/news-data.json"; 
import cthpProfilImage from "../assets/images/cthpprofil.jpg";

const HomePage = () => {
    const { t } = useTranslation();
    const [showCallModal, setShowCallModal] = useState(false);

    const newsItems = newsData.map(item => ({
        ...item,
        title: t(`${item.translationKey}.title`),
        excerpt: t(`${item.translationKey}.excerpt`),
        image: cthpProfilImage
    }));

    const handleCallClick = (e) => {
        if (!/Mobi|Android/i.test(navigator.userAgent)) {
            e.preventDefault();
            setShowCallModal(true);
        }
    };

    return (
        <div className="bg-background p-4">
            {/* Hero Section */}
            <div className="relative flex items-center justify-center min-h-screen bg-background">
                <div className="relative z-10 px-6 py-16 sm:py-24 lg:py-32 text-center max-w-3xl mx-auto">
                    <h1 className="text-4xl font-medium tracking-normal text-primary sm:text-5xl lg:text-6xl leading-tight">
                    {t("homepage.heading")}
                    </h1>
                    
                    <p className="mt-6 text-lg text-text max-w-2xl mx-auto leading-relaxed">
                    {t("homepage.tagline")}
                    </p>
                    
                    <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4">
                        <a
                            href="#emergency"
                            className="px-6 py-3 bg-primary hover:bg-secondary text-accent font-medium rounded-md transition-colors duration-300 flex items-center justify-center gap-2"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                            </svg>
                            {t("homepage.emergencies.needHelp")}
                        </a>
                        
                        <a
                        href="#about"
                        onClick={(e) => {
                            e.preventDefault();
                            document.getElementById('about').scrollIntoView({
                            behavior: 'smooth',
                            block: 'start'  
                            });
                        }}
                        className="px-6 py-3 border border-primary text-primary hover:bg-primary/10 font-medium rounded-md transition-colors duration-300"
                        >
                        {t("homepage.learnmore")}
                        </a>
                    </div>
                </div>

                {/* Interactive dot scroll indicator */}
                <button 
                    onClick={() => {
                        document.getElementById('description').scrollIntoView({
                        behavior: 'smooth'
                        });
                    }}
                    className="absolute bottom-8 left-1/2 transform -translate-x-1/2 group"
                    aria-label="Scroll to about section"
                    >
                    <div className="animate-bounce h-10 w-10 flex items-center justify-center">
                        <div className="h-3 w-3 bg-primary rounded-full opacity-70 group-hover:opacity-100 group-hover:scale-125 transition-all duration-300 cursor-pointer"></div>
                    </div>
                </button>
            </div>

            {/* Description */}
            <div id="description" className="flex items-center justify-center min-h-screen pt-20"> 
                <div className="max-w-6xl mx-auto px-4 text-center">
                    <p className="text-m leading-relaxed">
                    {t("homepage.description")}
                    </p>
                </div>
            </div>

            {/* About Us */}
            <div className="flex items-center justify-center h-screen" id="about">
                <div className="max-w-6xl mx-auto px-4 text-center">
                    <p className="text-m leading-relaxed">
                        {t("homepage.aboutus")}
                    </p>
                    <a 
                        href="https://discord.gg/your-link" 
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-8 inline-flex items-center gap-2 text-primary hover:text-green-600 hover:underline"
                        >
                        {t("homepage.community")}
                        </a>
                </div>
            </div>

            {/* Quotes */}
            <div className="flex items-center justify-center h-screen" id="quotes">
                <div className="max-w-6xl mx-auto px-4 text-center">
                    <p className="text-m leading-relaxed">
                        {t("homepage.quotes")}
                    </p>
                </div>
            </div>

            {/* News Section */}
            <div className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {newsItems.map(news => (
                        <div 
                            key={news.id} 
                            className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300"
                        >
                            <img 
                                src={news.image} 
                                alt={news.title} 
                                className="w-full h-48 object-cover"
                            />
                            <div className="p-6">
                                <span className="text-sm text-gray-500">{news.date}</span>
                                <h3 className="text-xl font-semibold mt-2 mb-3 text-primary">
                                    {news.title}
                                </h3>
                                <p className="text-text mb-4">
                                    {news.excerpt}
                                </p>
                                <button className="text-accent bg-primary hover:bg-secondary px-4 py-2 rounded-md transition duration-300">
                                    {t("homepage.newsSection.readMore")}
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            
            {/* Emergency Quick Help Section */}
            <div className="bg-red-50 border-l-4 border-danger p-6 my-12" id="emergency">
                <div className="max-w-7xl mx-auto text-center">
                    <h2 className="text-2xl font-bold text-danger mb-4">
                        {t("homepage.emergencies.needHelp")}
                    </h2>
                    <p className="text-danger mb-6">
                        {t("homepage.emergencies.description")}
                    </p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* National Health Hotline */}
                        <a
                            href="tel:119"
                            onClick={handleCallClick}
                            className="bg-danger hover:bg-danger text-white font-bold py-4 px-6 rounded-lg shadow-md transition duration-300 flex items-center justify-center gap-2"
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                            </svg>
                            {t("homepage.emergencies.callHotline")} (119)
                        </a>

                        {/* Ministry of Health Website */}
                        <a
                            href="https://kemkes.go.id/id/home"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-white hover:bg-gray-100 text-danger border border-danger font-bold py-4 px-6 rounded-lg shadow-md transition duration-300 flex items-center justify-center gap-2"
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                            </svg>
                            {t("homepage.emergencies.visitKemkes")}
                        </a>
                    </div>

                    <p className="text-sm text-gray-500 mt-6">
                        {t("homepage.emergencies.note")}
                    </p>
                </div>
            </div>

            {/* Emergency Call Modal */}
            {showCallModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-lg p-6 max-w-md w-full shadow-xl">
                        <h3 className="text-xl font-bold mb-4 text-primary">
                            {t("homepage.emergencies.callHelp")}
                        </h3>
                        <p className="mb-6">
                            {t("homepage.emergencies.desktopMessage")}
                        </p>
                        <div className="flex justify-end gap-3">
                            <button
                                onClick={() => setShowCallModal(false)}
                                className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
                            >
                                {t("homepage.emergencies.close")}
                            </button>
                            <a
                                href="https://kemkes.go.id"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="px-4 py-2 bg-primary text-white rounded-md hover:bg-secondary transition-colors"
                            >
                                {t("homepage.emergencies.visitWebsite")}
                            </a>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default HomePage;