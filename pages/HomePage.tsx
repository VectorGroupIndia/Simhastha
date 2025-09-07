
import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';

const allLanguages: { code: 'English' | 'हिंदी' | string, name: string }[] = [
  { code: 'English', name: 'English' },
  { code: 'हिंदी', name: 'हिंदी' },
  { code: 'বাংলা', name: 'বাংলা' },
  { code: 'ગુજરાતી', name: 'ગુજરાતી' },
  { code: 'ಕನ್ನಡ', name: 'ಕನ್ನಡ' },
  { code: 'മലയാളം', name: 'മലയാളം' },
  { code: 'मराठी', name: 'मराठी' },
  { code: 'ਪੰਜਾਬੀ', name: 'ਪੰਜਾਬੀ' },
  { code: 'தமிழ்', name: 'தமிழ்' },
  { code: 'తెలుగు', name: 'తెలుగు' },
  { code: 'اردو', name: 'اردو' },
];

const HomePage: React.FC = () => {
  const { setLanguage, t } = useLanguage();

  const handleLanguageClick = (e: React.MouseEvent<HTMLAnchorElement>, langCode: string) => {
    e.preventDefault();
    if (langCode === 'English' || langCode === 'हिंदी') {
      setLanguage(langCode);
    } else {
      alert(`${langCode} support is coming soon!`);
    }
  };

  return (
    <div className="bg-white">
      <div className="relative isolate px-6 pt-14 lg:px-8">
        <div className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80" aria-hidden="true">
          <div className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]" style={{clipPath: 'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)'}}></div>
        </div>
        <div className="mx-auto max-w-4xl py-24 sm:py-32 lg:py-40">
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight text-brand-dark sm:text-6xl">
              {t.homeWelcome} <span className="text-brand-primary">foundtastic</span>
            </h1>
            <p className="mt-6 text-lg leading-8 text-slate-600">
              {t.homeTagline}
            </p>
            <p className="mt-2 text-2xl font-bold text-brand-secondary">
              {t.homeEvent}
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
                <Link to="/report" className="rounded-md bg-brand-secondary px-8 py-3.5 text-lg font-semibold text-white shadow-sm hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-secondary">
                  {t.homeButton}
                </Link>
            </div>
          </div>
        </div>
        
        <div className="text-center pb-20">
          <h2 className="text-xl font-semibold text-brand-dark mb-2">{t.homeChooseLang}</h2>
          <p className="text-slate-500 mb-8">{t.homeChooseLangHi}</p>
          <div className="max-w-4xl mx-auto flex flex-wrap justify-center gap-3 sm:gap-4 px-4">
            {allLanguages.map(lang => (
              <a 
                key={lang.code} 
                href="#" 
                onClick={(e) => handleLanguageClick(e, lang.code)}
                className="px-4 py-2 sm:px-5 sm:py-2.5 bg-white border border-slate-300 text-slate-700 font-medium rounded-lg shadow-sm hover:bg-brand-light hover:border-brand-primary hover:text-brand-primary transition-all duration-300 transform hover:-translate-y-1 text-sm sm:text-base"
              >
                {lang.name}
              </a>
            ))}
          </div>
        </div>

        <div className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]" aria-hidden="true">
          <div className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]" style={{clipPath: 'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)'}}></div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
