import i18n from "i18next";
import { initReactI18next } from "react-i18next";

i18n.use(initReactI18next).init({
  debug: true,
  fallbackLng: "bg",
  resources: {
    bg: {
      translation: {
        WelcomeTo: "Добре дошли в",
      },
    },
    en: {
      translation: {
        WelcomeTo: "Welcome to",
      },
    },
  },
});

export default i18n;
