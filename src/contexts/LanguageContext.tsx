import React, { createContext, useContext, useState, ReactNode } from 'react';

type Language = 'hi' | 'en';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations = {
  hi: {
    // Header
    templeTitle: "कालाराम मंदिर",
    sacredMantra: "🕉️ ॐ नमः शिवाय",
    
    // Homepage
    templeName: "कालाराम मंदिर",
    cityName: "नाशिक",
    mainMantra: "🕉️ ॐ श्री राम जय राम जय जय राम 🕉️",
    welcomeText: "पवित्र कालाराम मंदिर की दिव्य यात्रा में आपका स्वागत है। इस डिजिटल तीर्थयात्रा के माध्यम से मंदिर के प्रत्येक पवित्र स्थान की कहानी जानें।",
    startJourney: "डिजिटल तीर्थयात्रा शुरू करें",
    spiritualJourney: "आपकी आध्यात्मिक यात्रा",
    experienceStories: "मंदिर के हर कोने की पवित्र कहानी का अनुभव करें",
    
    // Features
    interactiveMap: "इंटरैक्टिव मंदिर मानचित्र",
    mapDescription: "मंदिर के 10 पवित्र स्थानों को देखें और उनकी कहानियों की खोज करें। प्रत्येक स्थान पर QR कोड स्कैन करें या मानचित्र पर टैप करें।",
    sacredStories: "पवित्र कहानियाँ",
    storiesDescription: "प्रत्येक स्थान का इतिहास, महत्व और आध्यात्मिक संदेश जानें। पारंपरिक कहानियों से जुड़ें।",
    learnAtPace: "अपनी गति से सीखें",
    paceDescription: "अपनी सुविधा के अनुसार मंदिर की यात्रा करें और गहरी आध्यात्मिक समझ विकसित करें।",
    experienceQuote: "यह डिजिटल अनुभव सभी आयु वर्ग के भक्तों के लिए बनाया गया है। मंदिर के पवित्र वातावरण में डूबकर आध्यात्मिक ज्ञान प्राप्त करें।",
    startTempleVisit: "मंदिर दर्शन शुरू करें",
    
    // Navigation
    templeVisit: "मंदिर दर्शन",
    sacredStory: "पवित्र कहानी",
    
    // Map
    scanQR: "QR कोड स्कैन करें या चेकपॉइंट पर टैप करें",
    mapInstructions: "मंदिर के पवित्र स्थानों की कहानियाँ जानने के लिए नक्शे पर दिए गए बिंदुओं पर टैप करें।",
    
    // Common
    backToMap: "मंदिर नक्शे पर वापस जाएं",
    storyNotFound: "कहानी नहीं मिली",
    significance: "महत्व",
    
    // Checkpoint names
    mainEntrance: "मुख्य प्रवेश द्वार",
    sanctum: "गर्भगृह",
    assemblyHall: "सभा मंडप",
    ancientInscription: "प्राचीन शिलालेख",
    eastGate: "पूर्व द्वार",
    dharamshala: "धर्मशाला",
    yagnashala: "यज्ञशाला",
    westCourtyard: "पश्चिम प्रांगण",
    tulsiGarden: "तुलसी वृंदावन",
    sacredPond: "पवित्र कुंड"
  },
  en: {
    // Header
    templeTitle: "Kalaram Mandir",
    sacredMantra: "🕉️ Om Namah Shivaya",
    
    // Homepage
    templeName: "Kalaram Mandir",
    cityName: "Nashik",
    mainMantra: "🕉️ Om Shri Ram Jai Ram Jai Jai Ram 🕉️",
    welcomeText: "Welcome to the divine journey of sacred Kalaram Mandir. Discover the stories of each sacred place through this digital pilgrimage.",
    startJourney: "Start Digital Pilgrimage",
    spiritualJourney: "Your Spiritual Journey",
    experienceStories: "Experience the sacred stories of every corner of the temple",
    
    // Features
    interactiveMap: "Interactive Temple Map",
    mapDescription: "Explore 10 sacred locations of the temple and discover their stories. Scan QR codes at each location or tap on the map.",
    sacredStories: "Sacred Stories",
    storiesDescription: "Learn the history, significance and spiritual message of each location. Connect with traditional stories.",
    learnAtPace: "Learn at Your Own Pace",
    paceDescription: "Visit the temple at your convenience and develop deep spiritual understanding.",
    experienceQuote: "This digital experience is designed for devotees of all ages. Immerse yourself in the sacred atmosphere of the temple and gain spiritual knowledge.",
    startTempleVisit: "Start Temple Visit",
    
    // Navigation
    templeVisit: "Temple Visit",
    sacredStory: "Sacred Story",
    
    // Map
    scanQR: "Scan QR Code or Tap on Checkpoint",
    mapInstructions: "Tap on the points marked on the map to learn stories of the temple's sacred places.",
    
    // Common
    backToMap: "Back to Temple Map",
    storyNotFound: "Story Not Found",
    significance: "Significance",
    
    // Checkpoint names
    mainEntrance: "Main Entrance",
    sanctum: "Sanctum Sanctorum",
    assemblyHall: "Assembly Hall",
    ancientInscription: "Ancient Inscription",
    eastGate: "East Gate",
    dharamshala: "Dharamshala",
    yagnashala: "Yagnashala",
    westCourtyard: "West Courtyard",
    tulsiGarden: "Tulsi Garden",
    sacredPond: "Sacred Pond"
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<Language>('hi');

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations['hi']] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};