
import React, { useState } from 'react';

interface FaqItemProps {
  question: string;
  children: React.ReactNode;
}

const FaqItem: React.FC<FaqItemProps> = ({ question, children }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-slate-200 py-6">
      <dt>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex w-full items-start justify-between text-left text-slate-900"
        >
          <span className="text-base font-semibold leading-7">{question}</span>
          <span className="ml-6 flex h-7 items-center">
            {isOpen ? (
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M18 12H6" />
              </svg>
            ) : (
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m6-6H6" />
              </svg>
            )}
          </span>
        </button>
      </dt>
      {isOpen && (
        <dd className="mt-4 pr-12">
          <p className="text-base leading-7 text-slate-600">{children}</p>
        </dd>
      )}
    </div>
  );
};


const FaqPage: React.FC = () => {
  return (
    <div className="bg-white">
      <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8 lg:py-40">
        <div className="mx-auto max-w-4xl divide-y divide-slate-900/10">
          <h2 className="text-4xl font-bold leading-10 tracking-tight text-slate-900">Frequently Asked Questions</h2>
          <dl className="mt-10 space-y-6 divide-y divide-slate-900/10">
            <FaqItem question="What is Foundtastic?">
              Foundtastic is a digital platform designed to help people report and find lost items or people. It acts as a secure intermediary, connecting the public with authorities and volunteers to facilitate safe reunions, especially during large-scale events like the Ujjain Simhastha Mahakumbh.
            </FaqItem>
            <FaqItem question="How do I report a lost or found item?">
              You can report a lost or found item by registering on our platform. Once logged in, you'll find a simple form to provide details like a description, photo, and the location where the item was lost or found. This information is then used by our AI-powered engine to find potential matches.
            </FaqItem>
            <FaqItem question="Is my personal information safe?">
              Absolutely. We prioritize your privacy and security. Your contact information is never shared directly with other users. Communication and verification are handled through the platform and mediated by authorized personnel (admins or police) to ensure your data remains private until a verified match is confirmed.
            </FaqItem>
            <FaqItem question="How does the matching process work?">
              Our platform uses an advanced AI matching engine that analyzes various data points including text descriptions (fuzzy matching), location proximity, categories, and image similarity (perceptual hashing). When a potential match is found, you will be notified on your dashboard.
            </FaqItem>
            <FaqItem question="What happens when a match is found for my lost item?">
              When a potential match is identified, both parties will be notified. To claim an item, you will need to go through a verification process managed by platform admins or event authorities. They will confirm ownership before arranging the handover, preventing fraud.
            </FaqItem>
             <FaqItem question="Is this service free?">
              For citizens, the core services of reporting and finding items are free. We may introduce premium features or service charges in the future for things like storage or delivery. A SaaS model with advanced analytics is available for authorities and event organizers.
            </FaqItem>
          </dl>
        </div>
      </div>
    </div>
  );
};

export default FaqPage;
