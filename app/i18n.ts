import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import { resources } from "@nikolagsiderov/pawpal-fe-common";

i18n.use(initReactI18next).init({
  debug: true,
  fallbackLng: "bg",
  resources: resources,
});

export default i18n;
