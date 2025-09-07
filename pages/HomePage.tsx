import React from 'react';

const allLanguages = [
  "English", "हिंदी", "বাংলা", "ગુજરાતી", "ಕನ್ನಡ", "മലയാളം", "मराठी", "ਪੰਜਾਬੀ", "தமிழ்", "తెలుగు", "اردو"
];

const HomePage: React.FC = () => {
  return (
    <div className="bg-white">
      <div className="relative isolate px-6 pt-14 lg:px-8">
        <div className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80" aria-hidden="true">
          <div className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]" style={{clipPath: 'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)'}}></div>
        </div>
        <div className="mx-auto max-w-4xl py-24 sm:py-32 lg:py-40">
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight text-brand-dark sm:text-6xl">
              Welcome to <span className="text-brand-primary">foundtastic</span>
            </h1>
            <p className="mt-6 text-lg leading-8 text-slate-600">
              Your trusted platform for reuniting lost items and loved ones, proudly supporting
            </p>
            <p className="mt-2 text-2xl font-bold text-brand-secondary">
              Ujjain Simhastha Mahakumbh 2028
            </p>
          </div>
        </div>
        
        <div className="text-center pb-20">
          <h2 className="text-xl font-semibold text-brand-dark mb-2">Choose your language</h2>
          <p className="text-slate-500 mb-8">अपनी भाषा चुनें</p>
          <div className="max-w-4xl mx-auto flex flex-wrap justify-center gap-3 sm:gap-4 px-4">
            {allLanguages.map(lang => (
              <a key={lang} href="#" className="px-4 py-2 sm:px-5 sm:py-2.5 bg-white border border-slate-300 text-slate-700 font-medium rounded-lg shadow-sm hover:bg-brand-light hover:border-brand-primary hover:text-brand-primary transition-all duration-300 transform hover:-translate-y-1 text-sm sm:text-base">
                {lang}
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