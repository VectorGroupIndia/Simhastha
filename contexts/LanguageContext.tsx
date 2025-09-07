import React, { createContext, useState, useContext, ReactNode } from 'react';
import { uiStrings } from '../translations';
import { Report } from '../pages/ProfilePage'; // Assuming Report type is exported

type Language = 'English' | 'हिंदी';
type UiStrings = typeof uiStrings.English;
type ReportStatus = Report['status'];

interface LanguageContextType {
    language: Language;
    setLanguage: (language: Language) => void;
    t: UiStrings;
    translateStatus: (status: ReportStatus) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [language, setLanguage] = useState<Language>('English');

    const t = uiStrings[language];

    const translateStatus = (status: ReportStatus): string => {
        // Fallback to English status if translation is missing
        return uiStrings[language].status[status] || uiStrings.English.status[status];
    };

    return (
        <LanguageContext.Provider value={{ language, setLanguage, t, translateStatus }}>
            {children}
        </LanguageContext.Provider>
    );
};

export const useLanguage = (): LanguageContextType => {
    const context = useContext(LanguageContext);
    if (context === undefined) {
        throw new Error('useLanguage must be used within a LanguageProvider');
    }
    return context;
};
