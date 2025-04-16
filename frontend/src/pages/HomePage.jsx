import React from "react";
import { useTranslation } from "react-i18next";

const HomePage = () => {
    const { t } = useTranslation();

    return (
        <div className="bg-background p-4">
            <div className="flex items-center justify-center h-screen flex-col sm:gap-1 md:gap-2 lg:gap-3 xl:gap-4">
                <h1 className="text-primary text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl tracking-wide">
                {t("homepage.heading")}
                </h1>
                <p className="text-text text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl">
                {t("homepage.tagline")}
                </p>
            </div>

            <div className="bg-primary flex items-center justify-center p-8 rounded-md text-accent">
                <p>{t("homepage.section1")}</p>
            </div>

            <div className="flex items-center justify-center h-screen">
                <p>{t("homepage.section2")}</p>
            </div>

            <div className="flex items-center justify-center h-screen">
                <p>{t("homepage.section3")}</p>
            </div>

            <div className="flex items-center justify-center h-screen">
                <a
                href="#"
                className="bg-primary text-accent py-2 px-6 rounded-lg shadow-lg hover:bg-secondary transition duration-300 transform active:scale-95"
                >
                <p className="text-lg font-semibold">{t("homepage.cta")}</p>
                </a>
            </div>
        </div>
    );
};

export default HomePage;
