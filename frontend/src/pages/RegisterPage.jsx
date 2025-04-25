import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import i18n from "i18next";
import { useNavigate } from "react-router-dom";
import authService from "../services/authService"; 

const RegisterPage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: ""
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [recaptchaChecked, setRecaptchaChecked] = useState(false);

  const toggleLanguage = () => {
    const nextLang = i18n.language === "id" ? "en" : "id";
    i18n.changeLanguage(nextLang);
  };

  const handleGoogleRegister = () => {
    alert("Google Sign-In belum dihubungkan (dummy action).");
  };

  const validatePassword = (pwd) => {
    const passwordRules = [
      { regex: /^.{8,128}$/, message: t("register.passwordLength") },
      { regex: /[A-Z]/, message: t("register.uppercase") },
      { regex: /[a-z]/, message: t("register.lowercase") },
      { regex: /[0-9]/, message: t("register.number") },
      { regex: /^[\p{Script=Latin}\p{Script=Cyrillic}~!?@#$%^&*_\-+()\[\]{}<>\/\\|"'.,:;0-9A-Za-z]{8,128}$/u, message: t("register.allowedChars") },
      { regex: /^\S+$/, message: t("register.noSpaces") },
    ];

    for (let rule of passwordRules) {
      if (!rule.regex.test(pwd)) return rule.message;
    }
    return null;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");

    // Validasi input
    if (!formData.username || !formData.email || !formData.password || !formData.confirmPassword) {
      setError(t("register.required"));
      return;
    }

    if (!recaptchaChecked) {
      setError(t("register.recaptcha"));
      return;
    }

    const passwordError = validatePassword(formData.password);
    if (passwordError) {
      setError(passwordError);
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError(t("register.passwordMismatch"));
      return;
    }

    setLoading(true);

    try {
      // Panggil authService.register
      const result = await authService.register({
        name: formData.username,
        email: formData.email,
        phone: formData.phone,
        password: formData.password
      });

      if (result.success) {
        alert(t("register.success"));
        navigate("/login"); 
      } else {
        setError(result.message || t("register.error"));
      }
    } catch (err) {
      setError(t("register.error"));
      console.error("Registration error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-green-50 dark:bg-gray-900 px-4">
      <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg w-full max-w-md flex flex-col justify-center">

        {/* Language Switch */}
        <div className="flex justify-end mb-4">
          <button
            onClick={toggleLanguage}
            className="text-sm font-medium text-green-700 dark:text-gray-300"
          >
            {i18n.language === "id" ? "ID | EN" : "EN | ID"}
          </button>
        </div>

        <h2 className="text-2xl font-bold text-center text-green-800 dark:text-green-300 mb-4">
          {t("register.title")}
        </h2>

        <form onSubmit={handleRegister} className="space-y-4">
          <div>
            <label className="block text-green-700 dark:text-gray-200 mb-1">
              {t("register.username")}
            </label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder={t("register.usernamePlaceholder")}
              className="w-full px-4 py-2 rounded-xl border dark:border-gray-600 dark:bg-gray-700 dark:text-white"
            />
          </div>

          <div>
            <label className="block text-green-700 dark:text-gray-200 mb-1">
              {t("register.email")}
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder={t("register.emailPlaceholder")}
              className="w-full px-4 py-2 rounded-xl border dark:border-gray-600 dark:bg-gray-700 dark:text-white"
            />
          </div>

          <div>
            <label className="block text-green-700 dark:text-gray-200 mb-1">
              {t("register.phone")}
            </label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder={t("register.phonePlaceholder")}
              className="w-full px-4 py-2 rounded-xl border dark:border-gray-600 dark:bg-gray-700 dark:text-white"
            />
          </div>

          <div>
            <label className="block text-green-700 dark:text-gray-200 mb-1">
              {t("register.password")}
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder={t("register.passwordPlaceholder")}
              className="w-full px-4 py-2 rounded-xl border dark:border-gray-600 dark:bg-gray-700 dark:text-white"
            />
          </div>

          <div>
            <label className="block text-green-700 dark:text-gray-200 mb-1">
              {t("register.confirmPassword")}
            </label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder={t("register.confirmPasswordPlaceholder")}
              className="w-full px-4 py-2 rounded-xl border dark:border-gray-600 dark:bg-gray-700 dark:text-white"
            />
          </div>

          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={recaptchaChecked}
              onChange={(e) => setRecaptchaChecked(e.target.checked)}
              id="recaptcha"
              className="w-4 h-4"
            />
            <label htmlFor="recaptcha" className="text-sm text-gray-700 dark:text-gray-300">
              {t("register.recaptcha")}
            </label>
          </div>

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className={`w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-xl ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            {loading ? t("register.processing") : t("register.registerButton")}
          </button>
        </form>

        <div className="text-center mt-3 text-sm text-green-600 dark:text-gray-400">
          {t("register.haveAccount")}{" "}
          <a href="/login" className="text-blue-500 hover:underline">
            {t("register.loginLink")}
          </a>
        </div>

        {/* Google Register Link */}
        <div className="mt-4 text-center">
          <button
            onClick={handleGoogleRegister}
            className="text-sm text-blue-500 hover:underline"
          >
            {t("register.google")}
          </button>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;