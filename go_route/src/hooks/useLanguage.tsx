
import { createContext, useContext, useState, ReactNode } from "react";

type LanguageContextType = {
  language: string;
  setLanguage: (lang: string) => void;
  t: (key: string) => string;
};


const translations: Record<string, Record<string, string>> = {
  en: {
    "language.current": "English",
    "home.routeBus": "Route Bus",
    "home.cityBus": "City Bus",
    "home.chatbot": "Chatbot",
    "home.sos": "SOS",
    "home.savedRoutes": "Saved Routes",
    "home.bookingHistory": "Booking History",
    "home.testimonials": "What Users Say",
    "profile.title": "Your Profile",
    "profile.id": "User ID",
    "profile.name": "Name",
    "profile.email": "Email",
    "profile.phone": "Phone",
    "profile.guardian": "Guardian Details",
    "profile.theme": "App Theme",
    "routeBus.title": "Book Route Bus",
    "routeBus.from": "From",
    "routeBus.to": "To",
    "routeBus.findBuses": "Find Buses",
    "cityBus.title": "Track City Bus",
    "cityBus.findBuses": "Find Buses",
    "chatbot.title": "GoRoute Assistant",
    "chatbot.placeholder": "Ask me anything about bus routes...",
    "sos.title": "Emergency Contact",
    "sos.callGuardian": "Call Guardian",
    "sos.shareLocation": "Share Location",
    "sos.callHelpline": "Call Helpline",
  },
  hi: {
    "language.current": "हिंदी",
    "home.routeBus": "रूट बस",
    "home.cityBus": "शहरी बस",
    "home.chatbot": "चैटबॉट",
    "home.sos": "आपातकाल",
    "home.savedRoutes": "सहेजे गए मार्ग",
    "home.bookingHistory": "बुकिंग इतिहास",
    "home.testimonials": "उपयोगकर्ताओं का कहना है",
    "profile.title": "आपका प्रोफाइल",
    "profile.id": "उपयोगकर्ता ID",
    "profile.name": "नाम",
    "profile.email": "ईमेल",
    "profile.phone": "फोन",
    "profile.guardian": "अभिभावक विवरण",
    "profile.theme": "ऐप थीम",
    "routeBus.title": "रूट बस बुक करें",
    "routeBus.from": "से",
    "routeBus.to": "तक",
    "routeBus.findBuses": "बसें खोजें",
    "cityBus.title": "शहरी बस ट्रैक करें",
    "cityBus.findBuses": "बसें खोजें",
    "chatbot.title": "GoRoute सहायक",
    "chatbot.placeholder": "बस मार्गों के बारे में कुछ भी पूछें...",
    "sos.title": "आपातकालीन संपर्क",
    "sos.callGuardian": "अभिभावक को कॉल करें",
    "sos.shareLocation": "स्थान साझा करें",
    "sos.callHelpline": "हेल्पलाइन को कॉल करें",
  },
  ta: {
    "language.current": "தமிழ்",
    "home.routeBus": "வழி பேருந்து",
    "home.cityBus": "நகர பேருந்து",
    "home.chatbot": "உரையாடல் உதவியாளர்",
    "home.sos": "அவசர உதவி",
    "home.savedRoutes": "சேமித்த வழிகள்",
    "home.bookingHistory": "முந்தைய பயணங்கள்",
    "home.testimonials": "பயனர்கள் கருத்து",
    "profile.title": "உங்கள் சுயவிவரம்",
    "profile.id": "பயனர் ID",
    "profile.name": "பெயர்",
    "profile.email": "மின்னஞ்சல்",
    "profile.phone": "தொலைபேசி",
    "profile.guardian": "பாதுகாவலர் விவரங்கள்",
    "profile.theme": "தோற்றம்",
    "routeBus.title": "வழி பேருந்து முன்பதிவு",
    "routeBus.from": "இருந்து",
    "routeBus.to": "வரை",
    "routeBus.findBuses": "பேருந்துகளைக் கண்டறிக",
    "cityBus.title": "நகர பேருந்து கண்காணிப்பு",
    "cityBus.findBuses": "பேருந்துகளைக் கண்டறிக",
    "chatbot.title": "GoRoute உதவியாளர்",
    "chatbot.placeholder": "பேருந்து வழிகள் பற்றி எதையும் கேளுங்கள்...",
    "sos.title": "அவசர தொடர்பு",
    "sos.callGuardian": "பாதுகாவலரை அழைக்க",
    "sos.shareLocation": "இருப்பிடத்தை பகிர",
    "sos.callHelpline": "உதவி மையத்தை அழைக்க",
  }
};

const LanguageContext = createContext<LanguageContextType>({
  language: "en",
  setLanguage: () => {},
  t: () => "",
});

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState(
    localStorage.getItem("goroute-language") || "en"
  );

  const saveLanguage = (lang: string) => {
    localStorage.setItem("goroute-language", lang);
    setLanguage(lang);
  };

  const t = (key: string): string => {
    return translations[language]?.[key] || translations["en"][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage: saveLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};
