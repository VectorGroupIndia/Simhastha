import React, { useState } from 'react';
import { useLanguage } from '../../contexts/LanguageContext';

interface AuthStepProps {
    onAuthSuccess: () => void;
}

type InternalStep = 'email' | 'emailOtp' | 'mobile' | 'mobileOtp' | 'setPassword';

const AuthStep: React.FC<AuthStepProps> = ({ onAuthSuccess }) => {
    const { t } = useLanguage();
    const [step, setStep] = useState<InternalStep>('email');
    const [email, setEmail] = useState('');
    const [mobile, setMobile] = useState('');
    const [emailOtp, setEmailOtp] = useState('');
    const [mobileOtp, setMobileOtp] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [isRegistered, setIsRegistered] = useState<boolean | null>(null);

    const handleEmailSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setErrors({});
        if (!email.trim()) {
            setErrors({ email: t.errors.emailRequired });
            return;
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            setErrors({ email: t.errors.emailInvalid });
            return;
        }

        console.log('Checking user registration for:', email);
        if (email.toLowerCase() === 'user@demo.com') {
            setIsRegistered(true);
        } else {
            setIsRegistered(false);
        }
        console.log('Simulating sending OTP to email...');
        setStep('emailOtp');
    };

    const handleEmailOtpSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setErrors({});
        if (emailOtp === '123456') {
            console.log('Email OTP verified.');
            setStep('mobile');
        } else {
            setErrors({ otp: t.errors.emailOtp });
        }
    };

    const handleMobileSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setErrors({});
        if (!mobile.trim()) {
            setErrors({ mobile: t.errors.mobileRequired });
            return;
        } else if (!/^[6-9]\d{9}$/.test(mobile)) {
            setErrors({ mobile: t.errors.mobileInvalid });
            return;
        }
        console.log('Simulating sending OTP to mobile...');
        setStep('mobileOtp');
    };
    
    const handleMobileOtpSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setErrors({});
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
            setErrors({ otp: t.errors.mobileOtp });
        }
    };

    const handlePasswordSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const newErrors: Record<string, string> = {};
        if (password.length < 8) {
            newErrors.password = t.errors.passwordLength;
        }
        if (password !== confirmPassword) {
            newErrors.confirmPassword = t.errors.passwordMismatch;
        }
        
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        setErrors({});
        console.log('Password set successfully. New user registration complete.');
        onAuthSuccess();
    };

    const getInputClassName = (field: string) => `mt-1 block w-full px-3 py-2 bg-white border rounded-md shadow-sm focus:outline-none focus:ring-brand-primary focus:border-brand-primary text-slate-900 ${errors[field] ? 'border-red-500' : 'border-slate-300'}`;
    
    const renderPasswordForm = () => (
        <form onSubmit={handlePasswordSubmit} className="space-y-4" noValidate>
            <div className="text-center p-4 bg-green-50 border border-green-200 rounded-lg">
                <p className="font-semibold text-green-800">{t.authMobileVerified}</p>
                <p className="text-sm text-green-700">{t.authSetPasswordPrompt}</p>
            </div>
            <div>
                <label htmlFor="password" a-label="block text-sm font-medium text-slate-700">{t.passwordLabel}</label>
                <input type="password" name="password" id="password" value={password} onChange={e => setPassword(e.target.value)} required placeholder={t.passwordHint} className={getInputClassName('password')} />
                 {errors.password && <p className="mt-1 text-sm text-red-600">{errors.password}</p>}
            </div>
            <div>
                <label htmlFor="confirmPassword" a-label="block text-sm font-medium text-slate-700">{t.passwordConfirmLabel}</label>
                <input type="password" name="confirmPassword" id="confirmPassword" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} required className={getInputClassName('confirmPassword')} />
                 {errors.confirmPassword && <p className="mt-1 text-sm text-red-600">{errors.confirmPassword}</p>}
            </div>
            <button type="submit" className="w-full bg-brand-secondary text-white font-semibold py-2 px-4 rounded-md hover:opacity-90 transition-opacity">{t.authCreateAccount}</button>
        </form>
    );
    
    const renderContent = () => {
        switch(step) {
            case 'email':
                return (
                    <form onSubmit={handleEmailSubmit} className="space-y-4" noValidate>
                        <p className="text-center text-slate-600">{t.authPrompt}</p>
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-slate-700">{t.emailLabel}</label>
                            <input type="email" name="email" id="email" value={email} onChange={e => setEmail(e.target.value)} required className={getInputClassName('email')} />
                             {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
                        </div>
                        <button type="submit" className="w-full bg-brand-secondary text-white font-semibold py-2 px-4 rounded-md hover:opacity-90 transition-opacity">{t.authContinue}</button>
                    </form>
                );
            case 'emailOtp':
                return (
                     <form onSubmit={handleEmailOtpSubmit} className="space-y-4 text-center">
                        <p className="text-sm text-slate-600" dangerouslySetInnerHTML={{ __html: t.emailOtpPrompt.replace('{otp}', '<strong>123456</strong>') }} />
                        <div>
                            <label htmlFor="email-otp" className="sr-only">{t.emailLabel} OTP</label>
                            <input type="text" name="email-otp" id="email-otp" value={emailOtp} onChange={e => setEmailOtp(e.target.value)} required placeholder={t.otpPlaceholder} className={getInputClassName('otp') + ' text-center'} />
                        </div>
                        {errors.otp && <p className="text-sm text-red-600">{errors.otp}</p>}
                        <button type="submit" className="w-full bg-brand-secondary text-white font-semibold py-2 px-4 rounded-md hover:opacity-90 transition-opacity">{t.authVerifyEmail}</button>
                    </form>
                );
            case 'mobile':
                 return (
                    <form onSubmit={handleMobileSubmit} className="space-y-4" noValidate>
                        <div className="text-center p-4 bg-green-50 border border-green-200 rounded-lg">
                           <p className="font-semibold text-green-800">{t.authEmailVerified}</p>
                           {isRegistered ? <p className="text-sm text-green-700">{t.authWelcomeBack}</p> : <p className="text-sm text-green-700">{t.authNewAccount}</p>}
                        </div>
                        <p className="text-center text-slate-600">{t.authMobilePrompt}</p>
                        <div>
                            <label htmlFor="mobile" className="block text-sm font-medium text-slate-700">{t.mobileLabel}</label>
                            <input type="tel" name="mobile" id="mobile" value={mobile} onChange={e => setMobile(e.target.value)} required className={getInputClassName('mobile')} />
                             {errors.mobile && <p className="mt-1 text-sm text-red-600">{errors.mobile}</p>}
                        </div>
                        <button type="submit" className="w-full bg-brand-secondary text-white font-semibold py-2 px-4 rounded-md hover:opacity-90 transition-opacity">{t.authSendOtp}</button>
                    </form>
                );
            case 'mobileOtp':
                 return (
                     <form onSubmit={handleMobileOtpSubmit} className="space-y-4 text-center">
                        <p className="text-sm text-slate-600" dangerouslySetInnerHTML={{ __html: t.mobileOtpPrompt.replace('{otp}', '<strong>654321</strong>') }} />
                        <div>
                            <label htmlFor="mobile-otp" className="sr-only">{t.mobileLabel} OTP</label>
                            <input type="text" name="mobile-otp" id="mobile-otp" value={mobileOtp} onChange={e => setMobileOtp(e.target.value)} required placeholder={t.otpPlaceholder} className={getInputClassName('otp') + ' text-center'} />
                        </div>
                        {errors.otp && <p className="text-sm text-red-600">{errors.otp}</p>}
                        <button type="submit" className="w-full bg-brand-secondary text-white font-semibold py-2 px-4 rounded-md hover:opacity-90 transition-opacity">{t.authVerifyMobile}</button>
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
