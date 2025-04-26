import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import authService from "../services/authService"; 

const LoginPage = () => {
    const { t, i18n } = useTranslation();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        identifier: "",
        password: ""
    });
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        setError("");

        if (!formData.identifier || !formData.password) {
            setError(t("login.required"));
            return;
        }

        setLoading(true);

        try {
            const result = await authService.login({
                email: formData.identifier, 
                password: formData.password
            });

            if (result.success) {
                navigate("/"); 
            } else {
                setError(result.message || t("login.failed"));
            }
        } catch (err) {
            setError(t("login.error"));
            console.error("Login error:", err);
        } finally {
            setLoading(false);
        }
    };

    const handleGoogleLogin = () => {
        try {
            // Implementasi Google Login bisa ditambahkan di sini
            alert("Login dengan Google berhasil (simulasi)");
        } catch (error) {
            setError(t("login.googleFail"));
        }
    };

    const changeLanguage = (lng) => {
        i18n.changeLanguage(lng);
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-green-50 dark:bg-gray-900">
            <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg w-full max-w-md">

                {/* Language Switcher */}
                <div className="flex justify-end mb-4 space-x-2 text-sm">
                    <button
                        onClick={() => changeLanguage("id")}
                        className={`font-medium ${i18n.language === "id" ? "text-green-700 underline" : "text-gray-500"}`}
                    >
                        ID
                    </button>
                    <span className="text-gray-400">|</span>
                    <button
                        onClick={() => changeLanguage("en")}
                        className={`font-medium ${i18n.language === "en" ? "text-green-700 underline" : "text-gray-500"}`}
                    >
                        EN
                    </button>
                </div>

                <h2 className="text-2xl font-bold text-center text-green-800 dark:text-green-300 mb-6">
                    {t("login.title")}
                </h2>

                <form onSubmit={handleLogin} className="space-y-4">
                    <div>
                        <label className="block text-green-700 dark:text-gray-200 mb-1">
                            {t("login.identifier")}
                        </label>
                        <input
                            type="text"
                            name="identifier"
                            value={formData.identifier}
                            onChange={handleChange}
                            placeholder={t("login.identifierPlaceholder")}
                            className="w-full px-4 py-2 rounded-xl border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                        />
                    </div>

                    <div>
                        <label className="block text-green-700 dark:text-gray-200 mb-1">
                            {t("login.password")}
                        </label>
                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            placeholder={t("login.passwordPlaceholder")}
                            className="w-full px-4 py-2 rounded-xl border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                        />
                    </div>

                    {error && <p className="text-red-500 text-sm">{error}</p>}

                    <button
                        type="submit"
                        disabled={loading}
                        className={`w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-xl ${
                            loading ? 'opacity-50 cursor-not-allowed' : ''
                        }`}
                    >
                        {loading ? t("login.processing") : t("login.loginButton")}
                    </button>
                </form>

                <div className="my-4 text-center text-green-600 dark:text-gray-300">
                    {t("login.or")}
                </div>

                <button
                    onClick={handleGoogleLogin}
                    className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded-xl"
                >
                    {t("login.googleLogin")}
                </button>

                <div className="text-center mt-4 text-sm text-green-600 dark:text-gray-400">
                    <a href="/forgot-password" className="text-blue-500 hover:underline">
                        {t("login.forgot")}
                    </a>
                </div>

                <div className="text-center mt-2 text-sm text-green-600 dark:text-gray-400">
                    {t("login.noAccount")}{" "}
                    <a href="/register" className="text-blue-500 hover:underline">
                        {t("login.register")}
                    </a>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;