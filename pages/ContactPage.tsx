
import React from 'react';

const ContactPage: React.FC = () => {
  return (
    <div className="bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
            <h1 className="text-4xl font-bold tracking-tight text-brand-dark sm:text-5xl">Get in Touch</h1>
            <p className="mt-4 text-lg text-slate-600">We are here to help. Contact us through the appropriate channel below.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Left Column */}
            <div>
                <h2 className="text-2xl font-bold text-brand-primary mb-4 border-b-2 border-brand-primary pb-2">Transfigure Technologies Pvt Ltd.</h2>
                <div className="space-y-4 text-slate-700">
                    <p><strong>Address:</strong> 123 Tech Park, Innovation Drive, Pune, MH 411057, India</p>
                    <p><strong>Corporate Email:</strong> <a href="mailto:contact@transfigure.tech" className="text-brand-secondary hover:underline">contact@transfigure.tech</a></p>
                    <p><strong>Phone:</strong> <a href="tel:+9102012345678" className="text-brand-secondary hover:underline">+91 020 1234 5678</a></p>
                </div>
            </div>

            {/* Right Column */}
            <div>
                 <h2 className="text-2xl font-bold text-brand-secondary mb-4 border-b-2 border-brand-secondary pb-2">Ujjain Simhastha Mahakumbh 2028</h2>
                 <div className="space-y-4 text-slate-700 mb-8">
                    <p>For inquiries related to the Simhastha event:</p>
                    <p><strong>Email:</strong> <a href="mailto:help@simhastha2028.gov.in" className="text-brand-primary hover:underline">help@simhastha2028.gov.in</a></p>
                    <p><strong>Helpline:</strong> <a href="tel:18001232028" className="text-brand-primary hover:underline">1800-123-2028</a></p>
                </div>

                <div className="bg-brand-light p-6 rounded-lg shadow-md">
                    <h3 className="text-xl font-semibold text-brand-dark mb-4">Contact Simhastha Authorities</h3>
                    <form action="#" method="POST" className="space-y-4">
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-slate-700">Full Name</label>
                            <input type="text" name="name" id="name" className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-brand-primary focus:border-brand-primary" />
                        </div>
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-slate-700">Email Address</label>
                            <input type="email" name="email" id="email" className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-brand-primary focus:border-brand-primary" />
                        </div>
                         <div>
                            <label htmlFor="message" className="block text-sm font-medium text-slate-700">Message</label>
                            <textarea id="message" name="message" rows={4} className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-brand-primary focus:border-brand-primary"></textarea>
                        </div>
                        <div>
                            <button type="submit" className="w-full bg-brand-secondary text-white font-semibold py-2 px-4 rounded-md hover:opacity-90 transition-opacity">Send Message</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>

        {/* Map Section */}
        <div className="mt-20">
             <div className="text-center mb-12">
                <h2 className="text-3xl font-bold tracking-tight text-brand-dark sm:text-4xl">Event Help Centers</h2>
                <p className="mt-4 text-lg text-slate-600">Find police stations, lost & found centers, and help desks on the map.</p>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 rounded-lg overflow-hidden shadow-2xl">
                    <img src="https://picsum.photos/seed/simhastha-map/1200/600" alt="Map of help centers in Ujjain" className="w-full h-full object-cover"/>
                </div>
                <div className="bg-brand-light p-6 rounded-lg shadow-md">
                    <h3 className="text-xl font-semibold text-brand-dark mb-4">Nearby Locations</h3>
                    <ul className="space-y-3 text-slate-700">
                        <li className="p-3 bg-white rounded-md shadow-sm"><strong>Lost & Found Center 1:</strong> Ram Ghat</li>
                        <li className="p-3 bg-white rounded-md shadow-sm"><strong>Police Station:</strong> Mahakal Thana</li>
                        <li className="p-3 bg-white rounded-md shadow-sm"><strong>Help Desk A:</strong> Near Mahakaleshwar Temple</li>
                        <li className="p-3 bg-white rounded-md shadow-sm"><strong>Lost & Found Center 2:</strong> Harsiddhi Temple Area</li>
                        <li className="p-3 bg-white rounded-md shadow-sm"><strong>Help Desk B:</strong> Triveni Ghat</li>
                    </ul>
                </div>
            </div>
        </div>

      </div>
    </div>
  );
};

export default ContactPage;
