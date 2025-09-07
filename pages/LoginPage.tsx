import React, { useState, useEffect } from 'react';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';

type FormStep = 'credentials' | 'emailOtp' | 'mobileOtp' | 'success';

interface LoginPageProps {
    onLoginSuccess: () => void;
}

const LoginPage: React.FC<LoginPageProps> = ({ onLoginSuccess }) => {
  const { t } = useLanguage();
  const location = useLocation();
  const navigate = useNavigate();
  const isRegister = location.pathname.includes('register');
  
  const [step, setStep] = useState<FormStep>('credentials');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [mobile, setMobile] = useState('');
  const [emailOtp, setEmailOtp] = useState('');
  const [mobileOtp, setMobileOtp] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (step === 'success') {
      onLoginSuccess();
      const timer = setTimeout(() => {
        navigate('/profile');
      }, 2000); // Redirect after 2 seconds
      return () => clearTimeout(timer);
    }
  }, [step, onLoginSuccess, navigate]);

  const handleCredentialSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    
    // Login validation
    if (!isRegister) {
      if (email !== 'user@demo.com' || password !== 'password123') {
        setErrors({ form: t.errors.login });
        return;
      }
    } else {
      // Registration validation
      const newErrors: Record<string, string> = {};
      if (!email.trim()) {
        newErrors.email = t.errors.emailRequired;
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        newErrors.email = t.errors.emailInvalid;
      }
      if (!mobile.trim()) {
        newErrors.mobile = t.errors.mobileRequired;
      } else if (!/^[6-9]\d{9}$/.test(mobile)) {
        newErrors.mobile = t.errors.mobileInvalid;
      }
      if (!password) {
        newErrors.password = t.errors.passwordRequired;
      } else if (password.length < 8) {
        newErrors.password = t.errors.passwordLength;
      }
      if (password !== confirmPassword) {
        newErrors.confirmPassword = t.errors.passwordMismatch;
      }
      
      if (Object.keys(newErrors).length > 0) {
        setErrors(newErrors);
        return;
      }
    }
    
    console.log('Credentials submitted. Proceeding to email OTP verification...');
    setStep('emailOtp');
  };
  
  const handleEmailOtpSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    if (emailOtp === '123456') {
      console.log('Email OTP verification successful! Proceeding to mobile OTP verification...');
      setStep('mobileOtp');
    } else {
      setErrors({ otp: t.errors.emailOtp });
    }
  };

  const handleMobileOtpSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    if (mobileOtp === '654321') {
      console.log('Mobile OTP verification successful!');
      setStep('success');
    } else {
      setErrors({ otp: t.errors.mobileOtp });
    }
  };
  
  const getInputClassName = (field: string) => `block w-full rounded-md border-0 py-1.5 text-slate-900 shadow-sm ring-1 ring-inset placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-brand-primary sm:text-sm sm:leading-6 p-2 ${errors[field] ? 'ring-red-500' : 'ring-gray-300'}`;

  const renderCredentialForm = () => (
    <form className="space-y-6" onSubmit={handleCredentialSubmit} noValidate>
      <div>
        <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
          {t.emailLabel}
        </label>
        <div className="mt-2">
          <input id="email" name="email" type="email" autoComplete="email" required value={email} onChange={(e) => setEmail(e.target.value)} className={getInputClassName('email')}/>
          {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
        </div>
      </div>

      {isRegister && (
        <div>
          <label htmlFor="mobile" className="block text-sm font-medium leading-6 text-gray-900">
            {t.mobileLabel}
          </label>
          <div className="mt-2">
            <input id="mobile" name="mobile" type="tel" autoComplete="tel" required value={mobile} onChange={(e) => setMobile(e.target.value)} className={getInputClassName('mobile')}/>
            {errors.mobile && <p className="mt-1 text-sm text-red-600">{errors.mobile}</p>}
          </div>
        </div>
      )}

      <div>
        <div className="flex items-center justify-between">
          <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
            {t.passwordLabel}
          </label>
          {!isRegister && (
            <div className="text-sm">
              <a href="#" className="font-semibold text-brand-primary hover:text-brand-primary/80">
                {t.forgotPassword}
              </a>
            </div>
          )}
        </div>
        <div className="mt-2">
          <input id="password" name="password" type="password" autoComplete={isRegister ? "new-password" : "current-password"} required value={password} onChange={(e) => setPassword(e.target.value)} className={getInputClassName('password')}/>
          {isRegister && <p className="mt-1 text-xs text-slate-500">{t.passwordHint}</p>}
          {errors.password && <p className="mt-1 text-sm text-red-600">{errors.password}</p>}
        </div>
      </div>
      
      {isRegister && (
        <div>
          <label htmlFor="confirmPassword" className="block text-sm font-medium leading-6 text-gray-900">
            {t.passwordConfirmLabel}
          </label>
          <div className="mt-2">
            <input id="confirmPassword" name="confirmPassword" type="password" autoComplete="new-password" required value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} className={getInputClassName('confirmPassword')}/>
            {errors.confirmPassword && <p className="mt-1 text-sm text-red-600">{errors.confirmPassword}</p>}
          </div>
        </div>
      )}
      
      {errors.form && <p className="text-sm text-red-600 text-center">{errors.form}</p>}
      
      <div>
        <button
          type="submit"
          className="flex w-full justify-center rounded-md bg-brand-primary px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-brand-primary/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-primary"
        >
          {isRegister ? t.registerButton : t.loginButton}
        </button>
      </div>
    </form>
  );

  const renderOtpForm = (
    title: string,
    description: React.ReactNode,
    otpValue: string,
    setOtpValue: (value: string) => void,
    handleSubmit: (e: React.FormEvent) => void,
    id: string
  ) => (
     <form className="space-y-6" onSubmit={handleSubmit}>
       <p className="text-center text-sm text-gray-600">
         {description}
       </p>
      <div>
        <label htmlFor={id} className="block text-sm font-medium leading-6 text-gray-900 sr-only">
          {title}
        </label>
        <div className="mt-2">
          <input id={id} name={id} type="text" required value={otpValue} onChange={(e) => setOtpValue(e.target.value)} className={getInputClassName('otp') + " text-center"} placeholder={t.otpPlaceholder}/>
        </div>
      </div>
      
      {errors.otp && <p className="text-sm text-red-600 text-center">{errors.otp}</p>}

      <div>
        <button
          type="submit"
          className="flex w-full justify-center rounded-md bg-brand-primary px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-brand-primary/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-primary"
        >
          {t.verifyButton}
        </button>
      </div>
       <div className="text-center text-sm">
            <button type="button" onClick={() => { setStep('credentials'); setErrors({}); }} className="font-semibold text-brand-primary hover:text-brand-primary/80">
                {t.goBack}
            </button>
        </div>
    </form>
  );

  const renderSuccess = () => (
    <div className="text-center space-y-4">
        <svg className="mx-auto h-12 w-12 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      <h2 className="text-2xl font-bold text-gray-900">
        {isRegister ? t.registerSuccessTitle : t.loginSuccessTitle}
      </h2>
      <p className="text-gray-600">{t.redirectMessage}</p>
       <Link to="/profile" className="inline-block mt-4 rounded-md bg-brand-secondary px-4 py-2 text-sm font-semibold text-white shadow-sm hover:opacity-90">
            {t.goToProfile}
        </Link>
    </div>
  );

  const getTitle = () => {
    switch (step) {
      case 'credentials':
        return isRegister ? t.registerTitle : t.loginTitle;
      case 'emailOtp':
        return t.verifyEmailTitle;
      case 'mobileOtp':
        return t.verifyMobileTitle;
      default:
        return '';
    }
  }

  const renderContent = () => {
    switch(step) {
      case 'credentials':
        return renderCredentialForm();
      case 'emailOtp':
        return renderOtpForm(
          t.verifyEmailTitle,
          <>{t.emailOtpPrompt.replace('{otp}', '<strong>123456</strong>')}</>,
          emailOtp,
          setEmailOtp,
          handleEmailOtpSubmit,
          'email-otp'
        );
      case 'mobileOtp':
        return renderOtpForm(
          t.verifyMobileTitle,
          <>{t.mobileOtpPrompt.replace('{otp}', '<strong>654321</strong>')}</>,
          mobileOtp,
          setMobileOtp,
          handleMobileOtpSubmit,
          'mobile-otp'
        );
      case 'success':
        return renderSuccess();
      default:
        return null;
    }
  }

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          {step === 'success' ? (isRegister ? t.registerSuccessTitle : t.loginSuccessTitle) : getTitle()}
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        {renderContent()}
        
        {step !== 'success' && (
          <p className="mt-10 text-center text-sm text-gray-500">
            {isRegister ? t.alreadyMember : t.notMember}
            <Link to={isRegister ? '/login' : '/register'} className="font-semibold leading-6 text-brand-primary hover:text-brand-primary/80 ml-1">
              {isRegister ? t.signInNow : t.registerNow}
            </Link>
          </p>
        )}
      </div>
    </div>
  );
};

export default LoginPage;
