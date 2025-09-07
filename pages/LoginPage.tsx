
import React, { useState } from 'react';
import { useLocation, Link } from 'react-router-dom';

type FormStep = 'credentials' | 'otp' | 'success';

const LoginPage: React.FC = () => {
  const location = useLocation();
  const isRegister = location.pathname.includes('register');
  
  const [step, setStep] = useState<FormStep>('credentials');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');

  const handleCredentialSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (!isRegister && (email !== 'user@demo.com' || password !== 'password123')) {
      setError('Invalid demo credentials. Use user@demo.com and password123.');
      return;
    }
    
    if (email && (isRegister || password)) {
      console.log('Simulating sending OTP...');
      setStep('otp');
    } else {
      setError('Please fill in all fields.');
    }
  };
  
  const handleOtpSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (otp === '123456') {
      console.log('OTP verification successful!');
      setStep('success');
    } else {
      setError('Invalid OTP. Please use the demo OTP: 123456');
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
            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-brand-primary sm:text-sm sm:leading-6 p-2"
          />
        </div>
      </div>

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
            autoComplete="current-password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-brand-primary sm:text-sm sm:leading-6 p-2"
          />
        </div>
      </div>
      
      {error && <p className="text-sm text-red-600">{error}</p>}
      
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

  const renderOtpForm = () => (
     <form className="space-y-6" onSubmit={handleOtpSubmit}>
       <p className="text-center text-sm text-gray-600">
         An OTP has been sent to your email (for demo purposes, use <strong>123456</strong>).
       </p>
      <div>
        <label htmlFor="otp" className="block text-sm font-medium leading-6 text-gray-900">
          Enter OTP
        </label>
        <div className="mt-2">
          <input
            id="otp"
            name="otp"
            type="text"
            required
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-brand-primary sm:text-sm sm:leading-6 p-2"
          />
        </div>
      </div>
      
      {error && <p className="text-sm text-red-600">{error}</p>}

      <div>
        <button
          type="submit"
          className="flex w-full justify-center rounded-md bg-brand-primary px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-brand-primary/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-primary"
        >
          Verify OTP
        </button>
      </div>
       <div className="text-center text-sm">
            <button onClick={() => setStep('credentials')} className="font-semibold text-brand-primary hover:text-brand-primary/80">
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
      <p className="text-gray-600">You will be redirected to your dashboard shortly.</p>
       <Link to="/" className="inline-block mt-4 rounded-md bg-brand-secondary px-4 py-2 text-sm font-semibold text-white shadow-sm hover:opacity-90">
            Go to Home
        </Link>
    </div>
  );

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          {step === 'otp' ? 'Verify your account' : (isRegister ? 'Create a new account' : 'Sign in to your account')}
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        {step === 'credentials' && renderCredentialForm()}
        {step === 'otp' && renderOtpForm()}
        {step === 'success' && renderSuccess()}
        
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
