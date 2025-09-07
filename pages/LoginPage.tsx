import React, { useState, useEffect } from 'react';
import { useLocation, Link, useNavigate } from 'react-router-dom';

type FormStep = 'credentials' | 'emailOtp' | 'mobileOtp' | 'success';

interface LoginPageProps {
    onLoginSuccess: () => void;
}

const LoginPage: React.FC<LoginPageProps> = ({ onLoginSuccess }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const isRegister = location.pathname.includes('register');
  
  const [step, setStep] = useState<FormStep>('credentials');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [mobile, setMobile] = useState('');
  const [emailOtp, setEmailOtp] = useState('');
  const [mobileOtp, setMobileOtp] = useState('');
  const [error, setError] = useState('');

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
    setError('');
    
    if (!isRegister && (email !== 'user@demo.com' || password !== 'password123')) {
      setError('Invalid demo credentials. Use user@demo.com and password123.');
      return;
    }
    
    if (isRegister && (!email || !password || !mobile)) {
        setError('Please fill in all fields.');
        return;
    }

    if (!isRegister && (!email || !password)) {
        setError('Please fill in all fields.');
        return;
    }
    
    console.log('Credentials submitted. Proceeding to email OTP verification...');
    setStep('emailOtp');
  };
  
  const handleEmailOtpSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (emailOtp === '123456') {
      console.log('Email OTP verification successful! Proceeding to mobile OTP verification...');
      setStep('mobileOtp');
    } else {
      setError('Invalid Email OTP. Please use the demo OTP: 123456');
    }
  };

  const handleMobileOtpSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (mobileOtp === '654321') {
      console.log('Mobile OTP verification successful!');
      setStep('success');
    } else {
      setError('Invalid Mobile OTP. Please use the demo OTP: 654321');
    }
  };
  
  const renderCredentialForm = () => (
    <form className="space-y-6" onSubmit={handleCredentialSubmit}>
      <div>
        <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
          Email address
        </label>
        <div className="mt-2">
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="block w-full rounded-md border-0 py-1.5 text-slate-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-brand-primary sm:text-sm sm:leading-6 p-2"
          />
        </div>
      </div>

      {isRegister && (
        <div>
          <label htmlFor="mobile" className="block text-sm font-medium leading-6 text-gray-900">
            Mobile Number
          </label>
          <div className="mt-2">
            <input
              id="mobile"
              name="mobile"
              type="tel"
              autoComplete="tel"
              required
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
              className="block w-full rounded-md border-0 py-1.5 text-slate-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-brand-primary sm:text-sm sm:leading-6 p-2"
            />
          </div>
        </div>
      )}

      <div>
        <div className="flex items-center justify-between">
          <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
            Password
          </label>
          {!isRegister && (
            <div className="text-sm">
              <a href="#" className="font-semibold text-brand-primary hover:text-brand-primary/80">
                Forgot password?
              </a>
            </div>
          )}
        </div>
        <div className="mt-2">
          <input
            id="password"
            name="password"
            type="password"
            autoComplete={isRegister ? "new-password" : "current-password"}
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="block w-full rounded-md border-0 py-1.5 text-slate-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-brand-primary sm:text-sm sm:leading-6 p-2"
          />
        </div>
      </div>
      
      {error && <p className="text-sm text-red-600 text-center">{error}</p>}
      
      <div>
        <button
          type="submit"
          className="flex w-full justify-center rounded-md bg-brand-primary px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-brand-primary/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-primary"
        >
          {isRegister ? 'Register and Verify' : 'Sign in'}
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
          <input
            id={id}
            name={id}
            type="text"
            required
            value={otpValue}
            onChange={(e) => setOtpValue(e.target.value)}
            className="block w-full rounded-md border-0 py-1.5 text-slate-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-brand-primary sm:text-sm sm:leading-6 p-2 text-center"
            placeholder="Enter 6-digit OTP"
          />
        </div>
      </div>
      
      {error && <p className="text-sm text-red-600 text-center">{error}</p>}

      <div>
        <button
          type="submit"
          className="flex w-full justify-center rounded-md bg-brand-primary px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-brand-primary/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-primary"
        >
          Verify
        </button>
      </div>
       <div className="text-center text-sm">
            <button type="button" onClick={() => { setStep('credentials'); setError(''); }} className="font-semibold text-brand-primary hover:text-brand-primary/80">
                Go Back
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
        {isRegister ? 'Registration Successful!' : 'Login Successful!'}
      </h2>
      <p className="text-gray-600">You will be redirected to your profile dashboard shortly.</p>
       <Link to="/profile" className="inline-block mt-4 rounded-md bg-brand-secondary px-4 py-2 text-sm font-semibold text-white shadow-sm hover:opacity-90">
            Go to Profile
        </Link>
    </div>
  );

  const getTitle = () => {
    switch (step) {
      case 'credentials':
        return isRegister ? 'Create a new account' : 'Sign in to your account';
      case 'emailOtp':
        return 'Verify your Email';
      case 'mobileOtp':
        return 'Verify your Mobile Number';
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
          'Enter Email OTP',
          <>An OTP has been sent to your email (for demo purposes, use <strong>123456</strong>).</>,
          emailOtp,
          setEmailOtp,
          handleEmailOtpSubmit,
          'email-otp'
        );
      case 'mobileOtp':
        return renderOtpForm(
          'Enter Mobile OTP',
          <>An OTP has been sent to your mobile (for demo purposes, use <strong>654321</strong>).</>,
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
          {step === 'success' ? (isRegister ? 'Registration Successful!' : 'Login Successful!') : getTitle()}
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        {renderContent()}
        
        {step !== 'success' && (
          <p className="mt-10 text-center text-sm text-gray-500">
            {isRegister ? 'Already a member?' : 'Not a member?'}
            <Link to={isRegister ? '/login' : '/register'} className="font-semibold leading-6 text-brand-primary hover:text-brand-primary/80 ml-1">
              {isRegister ? 'Sign in' : 'Register now'}
            </Link>
          </p>
        )}
      </div>
    </div>
  );
};

export default LoginPage;