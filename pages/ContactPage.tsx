
import React, { useState } from 'react';

const ContactPage: React.FC = () => {
    const [formStep, setFormStep] = useState<'details' | 'otp' | 'success'>('details');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [mobile, setMobile] = useState('');
    const [message, setMessage] = useState('');
    const [otp, setOtp] = useState('');
    const [error, setError] = useState('');

    const handleDetailsSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        if (name && email && mobile && message) {
            console.log('Simulating sending OTP...');
            setFormStep('otp');
        } else {
            setError('Please fill in all fields.');
        }
    };

    const handleOtpSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        if (otp === '123456') {
            console.log('OTP verification successful!');
            setFormStep('success');
        } else {
            setError('Invalid OTP. Please use the demo OTP: 123456');
        }
    };

    const renderDetailsForm = () => (
        <form onSubmit={handleDetailsSubmit} className="space-y-4">
            <div>
                <label htmlFor="name" className="block text-sm font-medium text-slate-700">Full Name</label>
                <input type="text" name="name" id="name" value={name} onChange={e => setName(e.target.value)} required className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-brand-primary focus:border-brand-primary" />
            </div>
            <div>
                <label htmlFor="email" className="block text-sm font-medium text-slate-700">Email Address</label>
                <input type="email" name="email" id="email" value={email} onChange={e => setEmail(e.target.value)} required className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-brand-primary focus:border-brand-primary" />
            </div>
            <div>
                <label htmlFor="mobile" className="block text-sm font-medium text-slate-700">Mobile Number</label>
                <input type="tel" name="mobile" id="mobile" value={mobile} onChange={e => setMobile(e.target.value)} required className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-brand-primary focus:border-brand-primary" />
            </div>
            <div>
                <label htmlFor="message" className="block text-sm font-medium text-slate-700">Message</label>
                <textarea id="message" name="message" rows={4} value={message} onChange={e => setMessage(e.target.value)} required className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-brand-primary focus:border-brand-primary"></textarea>
            </div>
            {error && <p className="text-sm text-red-600">{error}</p>}
            <div>
                <button type="submit" className="w-full bg-brand-secondary text-white font-semibold py-2 px-4 rounded-md hover:opacity-90 transition-opacity">Send Message</button>
            </div>
        </form>
    );

    const renderOtpForm = () => (
        <form onSubmit={handleOtpSubmit} className="space-y-4 text-center">
            <p className="text-sm text-slate-600">
                An OTP has been sent to your email and mobile.
                <br />
                (For demo purposes, use OTP: <strong>123456</strong>)
            </p>
            <div>
                <label htmlFor="otp" className="block text-sm font-medium text-slate-700 sr-only">Enter OTP</label>
                <input type="text" name="otp" id="otp" value={otp} onChange={e => setOtp(e.target.value)} required placeholder="Enter 6-digit OTP" className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-brand-primary focus:border-brand-primary text-center" />
            </div>
            {error && <p className="text-sm text-red-600">{error}</p>}
            <div>
                <button type="submit" className="w-full bg-brand-secondary text-white font-semibold py-2 px-4 rounded-md hover:opacity-90 transition-opacity">Verify & Submit</button>
            </div>
        </form>
    );
    
    const renderSuccessMessage = () => (
        <div className="text-center space-y-4 p-6 bg-green-50 border border-green-200 rounded-lg">
             <svg className="mx-auto h-12 w-12 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h3 className="text-xl font-bold text-green-800">Message Sent Successfully!</h3>
            <p className="text-green-700">Thank you for contacting us. We will get back to you shortly.</p>
        </div>
    );

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
                    <p><strong>Address:</strong> 2371, Kshitij Nivas, Datta Nagar, Vasud-Akola Road, Sangola, Solpaur, Maharashtra, 413307</p>
                    <p><strong>Corporate Email:</strong> <a href="mailto:contact@thetransfigure.com" className="text-brand-secondary hover:underline">contact@thetransfigure.com</a></p>
                    <p><strong>Phone:</strong> <a href="tel:+917276199099" className="text-brand-secondary hover:underline">+91 7276199099</a></p>
                </div>
            </div>

            {/* Right Column */}
            <div>
                 <h2 className="text-2xl font-bold text-brand-secondary mb-4 border-b-2 border-brand-secondary pb-2">Ujjain Simhastha Mahakumbh 2028</h2>
                 <div className="space-y-4 text-slate-700 mb-8">
                    <p>For inquiries related to the Simhastha event:</p>
                    <p><strong>Official Email:</strong> <a href="mailto:help@simhastha2028.gov.in" className="text-brand-primary hover:underline">help@simhastha2028.gov.in</a></p>
                    <p><strong>General Enquiries:</strong> Helpline <a href="tel:18001232028" className="text-brand-primary hover:underline">1800-123-2028</a></p>
                    <p><strong>For Emergency:</strong> Dial <a href="tel:112" className="text-brand-primary hover:underline font-bold">112</a></p>
                     <p><strong>For Lost and Found:</strong> Contact nearest Help Desk or use the platform.</p>
                </div>

                <div className="bg-brand-light p-6 rounded-lg shadow-md">
                    <h3 className="text-xl font-semibold text-brand-dark mb-4 text-center">Contact Simhastha Authorities</h3>
                    {formStep === 'details' && renderDetailsForm()}
                    {formStep === 'otp' && renderOtpForm()}
                    {formStep === 'success' && renderSuccessMessage()}
                </div>
            </div>
        </div>

        {/* Map Section */}
        <div className="mt-20">
             <div className="text-center mb-12">
                <h2 className="text-3xl font-bold tracking-tight text-brand-dark sm:text-4xl">Find Help Centers</h2>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
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
                <div className="lg:col-span-2 rounded-lg overflow-hidden shadow-2xl">
                    <iframe 
                        src="https://maps.google.com/maps?q=Ujjain&t=&z=13&ie=UTF8&iwloc=&output=embed"
                        width="100%"
                        height="100%"
                        style={{border:0, minHeight: '450px'}}
                        allowFullScreen={false}
                        loading="lazy"
                        title="Ujjain Help Centers Map"
                        referrerPolicy="no-referrer-when-downgrade">
                    </iframe>
                </div>
            </div>
        </div>

      </div>
    </div>
  );
};

export default ContactPage;
