
import React from 'react';

const AboutPage: React.FC = () => {
  return (
    <div className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:mx-0">
          <p className="text-base font-semibold leading-7 text-brand-primary">About Us</p>
          <h2 className="mt-2 text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">Transfigure Technologies</h2>
          <p className="mt-6 text-xl leading-8 text-gray-600">
            Pioneering civic-tech solutions to build safer, smarter, and more connected communities.
          </p>
        </div>
        <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 lg:mx-0 lg:mt-24 lg:max-w-none lg:grid-cols-2">
            <div>
              <h3 className="text-2xl font-bold tracking-tight text-gray-900">Our Project: foundtastic</h3>
              <div className="mt-6 space-y-6 text-gray-600">
                <p>
                  Foundtastic is more than just a lost and found application; it's a comprehensive digital ecosystem designed to foster a sense of security and community. Developed by Transfigure Technologies, our platform serves as a trusted intermediary, leveraging cutting-edge technology to connect citizens, authorities, and volunteers in a seamless and secure manner.
                </p>
                <p>
                  We are building a smart civic-tech platform that scales from local communities to mega-gatherings, helping reduce the burden on authorities, protecting users against fraud, and creating a reliable digital network for recovering what matters most.
                </p>
              </div>
            </div>
            <div>
              <h3 className="text-2xl font-bold tracking-tight text-gray-900">Our Vision & Mission</h3>
              <div className="mt-6 space-y-6 text-gray-600">
                <p>
                  <strong>Vision:</strong> To create a world where nothing and no one is permanently lost, by building an intelligent, accessible, and universally trusted lost-and-found network.
                </p>
                <p>
                  <strong>Mission:</strong> To empower communities with a robust, AI-driven platform that simplifies the process of reporting and recovering lost items and people, ensuring safety, privacy, and peace of mind for everyone.
                </p>
              </div>
            </div>
            <div className="lg:col-span-2">
              <h3 className="text-2xl font-bold tracking-tight text-gray-900">Our Role in Ujjain Simhastha Mahakumbh 2028</h3>
              <div className="mt-6 space-y-6 text-gray-600">
                <p>
                  The Simhastha Mahakumbh in Ujjain is one of the largest peaceful gatherings on Earth, drawing millions of devotees. The sheer scale of the event presents unique challenges, particularly in managing lost items and ensuring the safety of attendees. Transfigure Technologies is proud to partner with the authorities to deploy Foundtastic as the official digital lost and found platform for this monumental event.
                </p>
                <p>
                  Our role extends beyond technology. We are committed to providing a comprehensive support system including:
                </p>
                <ul className="list-disc list-inside space-y-2">
                  <li><strong>AI-Powered Matching:</strong> Utilizing advanced algorithms to quickly match lost reports with found items.</li>
                  <li><strong>Volunteer Coordination:</strong> A dedicated module to manage and dispatch volunteers to assist those in need.</li>
                  <li><strong>Data Analytics & Heatmaps:</strong> Providing authorities with real-time insights into crowd density and hotspots for lost reports, enabling proactive measures.</li>
                  <li><strong>Secure Verification:</strong> Ensuring that items are returned to their rightful owners through a robust verification process managed by authorities.</li>
                  <li><strong>Multi-Lingual Support:</strong> Catering to the diverse linguistic background of the attendees.</li>
                </ul>
                <p>
                  We are dedicated to making the Ujjain Simhastha Mahakumbh 2028 a safe and spiritually fulfilling experience for every pilgrim.
                </p>
              </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
