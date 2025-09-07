import React, { useState } from 'react';

interface AuthStepProps {
    onAuthSuccess: () => void;
}

type InternalStep = 'email' | 'emailOtp' | 'mobile' | 'mobileOtp' | 'setPassword';

const AuthStep: React.FC<AuthStepProps> = ({ onAuthSuccess }) => {
    const [step, setStep] = useState<InternalStep>('email');
    const [email, setEmail] = useState('');
    const [mobile, setMobile] = useState('');
    const [emailOtp, setEmailOtp] = useState('');
    const [mobileOtp, setMobileOtp] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [isRegistered, setIsRegistered] = useState<boolean | null>(null);

    const handleEmailSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        if (email) {
            console.log('Checking user registration for:', email);
            // Simulate checking if user is registered
            if (email.toLowerCase() === 'user@demo.com') {
                setIsRegistered(true);
            } else {
                setIsRegistered(false);
            }
            console.log('Simulating sending OTP to email...');
            setStep('emailOtp');
        }
    };

    const handleEmailOtpSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        if (emailOtp === '123456') {
            console.log('Email OTP verified.');
            setStep('mobile');
        } else {
            setError('Invalid Email OTP. Use demo OTP: 123456');
        }
    };

    const handleMobileSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        if (mobile) {
             console.log('Simulating sending OTP to mobile...');
             setStep('mobileOtp');
        }
    };
    
    const handleMobileOtpSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        if (mobileOtp === '654321') {
            console.log('Mobile OTP verified.');
            if (isRegistered) {
                console.log('Existing user authentication complete.');
                onAuthSuccess();
            } else {
                console.log('New user. Proceeding to set password.');
                setStep('setPassword');
            }
        } else {
            setError('Invalid Mobile OTP. Use demo OTP: 654321');
        }
    };

    const handlePasswordSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        if (password !== confirmPassword) {
            setError('Passwords do not match.');
            return;
        }
        if (password.length < 8) {
            setError('Password must be at least 8 characters long.');
            return;
        }
        console.log('Password set successfully. New user registration complete.');
        onAuthSuccess();
    };
    
    const renderPasswordForm = () => (
        <form onSubmit={handlePasswordSubmit} className="space-y-4">
            <div className="text-center p-4 bg-green-50 border border-green-200 rounded-lg">
                <p className="font-semibold text-green-800">Mobile Verified!</p>
                <p className="text-sm text-green-700">Please set a password to create your new account.</p>
            </div>
            <div>
                <label htmlFor="password" a-label="block text-sm font-medium text-slate-700">Password</label>
                <input type="password" name="password" id="password" value={password} onChange={e => setPassword(e.target.value)} required placeholder="Minimum 8 characters" className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-brand-primary focus:border-brand-primary text-slate-900" />
            </div>
            <div>
                <label htmlFor="confirmPassword" a-label="block text-sm font-medium text-slate-700">Confirm Password</label>
                <input type="password" name="confirmPassword" id="confirmPassword" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} required className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-brand-primary focus:border-brand-primary text-slate-900" />
            </div>
            {error && <p className="text-sm text-red-600">{error}</p>}
            <button type="submit" className="w-full bg-brand-secondary text-white font-semibold py-2 px-4 rounded-md hover:opacity-90 transition-opacity">Create Account & Proceed</button>
        </form>
    );
    
    const renderContent = () => {
        switch(step) {
            case 'email':
                return (
                    <form onSubmit={handleEmailSubmit} className="space-y-4">
                        <p className="text-center text-slate-600">Please enter your email to begin. We'll check if you have an account.</p>
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-slate-700">Email Address</label>
                            <input type="email" name="email" id="email" value={email} onChange={e => setEmail(e.target.value)} required className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-brand-primary focus:border-brand-primary text-slate-900" />
                        </div>
                        <button type="submit" className="w-full bg-brand-secondary text-white font-semibold py-2 px-4 rounded-md hover:opacity-90 transition-opacity">Continue</button>
                    </form>
                );
            case 'emailOtp':
                return (
                     <form onSubmit={handleEmailOtpSubmit} className="space-y-4 text-center">
                        <p className="text-sm text-slate-600">An OTP has been sent to <strong>{email}</strong>. <br/> (For demo purposes, use OTP: <strong>123456</strong>)</p>
                        <div>
                            <label htmlFor="email-otp" className="sr-only">Email OTP</label>
                            <input type="text" name="email-otp" id="email-otp" value={emailOtp} onChange={e => setEmailOtp(e.target.value)} required placeholder="Enter 6-digit OTP" className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-brand-primary focus:border-brand-primary text-center text-slate-900" />
                        </div>
                        {error && <p className="text-sm text-red-600">{error}</p>}
                        <button type="submit" className="w-full bg-brand-secondary text-white font-semibold py-2 px-4 rounded-md hover:opacity-90 transition-opacity">Verify Email</button>
                    </form>
                );
            case 'mobile':
                 return (
                    <form onSubmit={handleMobileSubmit} className="space-y-4">
                        <div className="text-center p-4 bg-green-50 border border-green-200 rounded-lg">
                           <p className="font-semibold text-green-800">Email Verified!</p>
                           {isRegistered ? <p className="text-sm text-green-700">Welcome back! We found an existing account for you.</p> : <p className="text-sm text-green-700">We will create a new account for you.</p>}
                        </div>
                        <p className="text-center text-slate-600">Please enter your mobile number for verification.</p>
                        <div>
                            <label htmlFor="mobile" className="block text-sm font-medium text-slate-700">Mobile Number</label>
                            <input type="tel" name="mobile" id="mobile" value={mobile} onChange={e => setMobile(e.target.value)} required className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-brand-primary focus:border-brand-primary text-slate-900" />
                        </div>
                        <button type="submit" className="w-full bg-brand-secondary text-white font-semibold py-2 px-4 rounded-md hover:opacity-90 transition-opacity">Send OTP</button>
                    </form>
                );
            case 'mobileOtp':
                 return (
                     <form onSubmit={handleMobileOtpSubmit} className="space-y-4 text-center">
                        <p className="text-sm text-slate-600">An OTP has been sent to <strong>{mobile}</strong>. <br/> (For demo purposes, use OTP: <strong>654321</strong>)</p>
                        <div>
                            <label htmlFor="mobile-otp" className="sr-only">Mobile OTP</label>
                            <input type="text" name="mobile-otp" id="mobile-otp" value={mobileOtp} onChange={e => setMobileOtp(e.target.value)} required placeholder="Enter 6-digit OTP" className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-brand-primary focus:border-brand-primary text-center text-slate-900" />
                        </div>
                        {error && <p className="text-sm text-red-600">{error}</p>}
                        <button type="submit" className="w-full bg-brand-secondary text-white font-semibold py-2 px-4 rounded-md hover:opacity-90 transition-opacity">Verify Mobile & Proceed</button>
                    </form>
                );
            case 'setPassword':
                return renderPasswordForm();
        }
    };
    
    return (
        <div className="max-w-md mx-auto">
            {renderContent()}
        </div>
    );
};

export default AuthStep;