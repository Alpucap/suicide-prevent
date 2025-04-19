import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import i18n from "i18next";

const RegisterPage = () => {
  const { t } = useTranslation();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
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

  const handleRegister = (e) => {
    e.preventDefault();
    setError("");

    if (!username || !email || !password || !confirmPassword) {
      setError(t("register.required"));
      return;
    }

    if (!recaptchaChecked) {
      setError(t("register.recaptcha"));
      return;
    }

    const passwordError = validatePassword(password);
    if (passwordError) {
      setError(passwordError);
      return;
    }

    if (password !== confirmPassword) {
      setError(t("register.passwordMismatch"));
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      alert("Pendaftaran berhasil!");
    }, 1500);
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
              value={username}
              onChange={(e) => setUsername(e.target.value)}
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
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
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
              value={password}
              onChange={(e) => setPassword(e.target.value)}
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
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
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
            className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-xl"
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
