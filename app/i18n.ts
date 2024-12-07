import i18n from "i18next";
import { initReactI18next } from "react-i18next";

i18n.use(initReactI18next).init({
  debug: true,
  fallbackLng: "bg",
  resources: {
    bg: {
      translation: {
        WelcomeTo: "Добре дошли в",
        FollowUsOnSocialMedia: "Последвайте ни в социалните мрежи:",
        TheBestBulgarianPlatformForPets:
          "Най-добрата българска платформа за домашни любимци!",
        HeroDescription:
          "Разгледай одобрени гледачи за твоя любимец близо до теб и резервирай престоят им в техния уютен дом, докато теб те няма. Твоето куче или котка ще са ти благодарни! 😊",
        HeroDescription2:
          "Вече не е нужно да досаждаш на приятели и съседи или да звъниш безкрайно на съмнителни хотели.",
        PetSittingDescription:
          "Разгледай одобрени гледачи за твоя любимец близо до теб и резервирай престоят им в техния уютен дом, докато теб те няма.",
        FindAHome: "Намери дом",
        FindAHomeDescription:
          "Намери дом на твоя домашен любимец като осиновиш, продадеш или подариш.",
        LostFound: "Търси се/Намерено",
        LostFoundDescription:
          "Помогни на обществото на хората с домашни любимци като сигнализираш за намерен домашен любимец.",
        FindAPartner: "Намери партньор",
        FindAPartnerDescription:
          "Намери си подходящ партньор или приятел за твоя домашен любимец.",
        FAQ: "Често задавани въпроси",
        FAQuestion1: "Как мога да стана гледач на домашни любимци?",
        FAQuestion1Answer1:
          "Лесно. Регистрирай се в платформата, ако все още нямате регистрация. Имате възможност и да се регистрирате, ползвайки вашия Google или Facebook акаунт за по-удобно.",
        FAQuestion1Answer2:
          "Следвайте стъпките в страницата „Стани гледач“ и попълнете необходимите данни.",
        FAQuestion2: "Как да платя резервация?",
        FAQuestion2Answer:
          "След като резервирате гледач на домашен любимец чрез нашата платформа и след като избраният гледач се е съгласил с резервацията, което може да отнеме до 48 часа.",
        FAQuestion3: "Какво ще стане, ако трябва да анулирам резервация?",
        FAQuestion3Answer:
          "Ако промените плановете или решението си, моля, следвайте нашите",
        CancellationPolicy: "Правила за анулиране",
        FAQuestion4:
          "Каква е типичната цена на ден за гледане на домашен любимец?",
        FAQuestion4Answer1:
          "Зависи индивидуално от всеки гледач и варира в зависимост от критерии като личен опит с домашни любимци, тип настаняване, местоположение, заетост, рейтинг и т.н.",
        FAQuestion4Answer2:
          "Със сигурност можем да ви посъветваме, така че да бъдете конкурентоспособни, но и справедливо възнаградени.",
        DownloadTheMobileApp: "Свали мобилното приложение",
        DownloadOnTheAppStore: "Свали в App Store",
        DownloadOnGooglePlay: "Свали в Google Play",
        TermsOfUse: "Условия за ползване",
        PrivacyAndCookiesPolicy: "Политика за поверителност и бисквитки",
        DesignAndDevelopment: "Изработка и дизайн: ",
        PetSitting: "Гледане на домашни любимци",
      },
    },
    en: {
      translation: {
        WelcomeTo: "Welcome to",
        FollowUsOnSocialMedia: "Follow us on social media:",
        TheBestBulgarianPlatformForPets:
          "The best Bulgarian platform for pets!",
        HeroDescription:
          "Browse approved sitters for your pet near you and book their stay in a cozy home while you're away. Your dog or cat will thank you! 😊",
        HeroDescription2:
          "You no longer need to bother friends and neighbors or endlessly call questionable hotels.",
        Stay: "Stay",
        StayDescription:
          "Browse approved sitters for your pet near you and book their stay in their cozy home while you're away.",
        FindAHome: "Find a home",
        FindAHomeDescription:
          "Find a home for your pet by adopting, selling, or giving it away.",
        LostFound: "Lost/Found",
        LostFoundDescription:
          "Help the pet community by reporting a found pet.",
        FindAPartner: "Find a partner",
        FindAPartnerDescription:
          "Find a suitable partner or friend for your pet.",
        FAQ: "Frequently asked questions",
        FAQuestion1: "How can I become a pet sitter?",
        FAQuestion1Answer1:
          "It's easy. Register on the platform if you don't have an account yet. You also have the option to sign up using your Google or Facebook account for convenience.",
        FAQuestion1Answer2:
          "Follow the steps on the “Become a Pet Sitter“ page and fill in the required information.",
        FAQuestion2: "How can I pay for a reservation?",
        FAQuestion2Answer:
          "Once you book a pet sitter through our platform and the selected sitter agrees to the reservation, which may take up to 48 hours, you can proceed with the payment.",
        FAQuestion3: "What will happen if I need to cancel a reservation?",
        FAQuestion3Answer:
          "If you change your plans or decision, please follow our",
        CancellationPolicy: "Cancellation policy",
        FAQuestion4: "What is the typical daily price for pet sitting?",
        FAQuestion4Answer1:
          "It depends on each individual sitter and varies based on criteria such as personal experience with pets, type of accommodation, location, availability, rating, and more.",
        FAQuestion4Answer2:
          "We can certainly advise you so that you remain competitive while being fairly compensated.",
        DownloadTheMobileApp: "Download the mobile app",
        DownloadOnTheAppStore: "Download on the App Store",
        DownloadOnGooglePlay: "Download on Google Play",
        TermsOfUse: "Terms of Use",
        PrivacyAndCookiesPolicy: "Privacy and Cookies Policy",
        DesignAndDevelopment: "Design and development: ",
        PetSitting: "Pet Sitting/Stay",
      },
    },
  },
});

export default i18n;
