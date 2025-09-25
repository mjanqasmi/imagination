
import React from 'react';
import Button from './Button';
import LogoIcon from './icons/LogoIcon';
import GoogleIcon from './icons/GoogleIcon';

interface LoginPageProps {
  onLogin: () => void;
}

const LoginPage: React.FC<LoginPageProps> = ({ onLogin }) => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-grid-gray-700/20">
        <div className="absolute inset-0 bg-gradient-to-b from-gray-900 to-black/80"></div>
      <div className="relative text-center p-8 max-w-md w-full bg-gray-900/70 backdrop-blur-xl border border-gray-700 rounded-2xl shadow-2xl shadow-indigo-500/10">
        <div className="flex justify-center mb-6">
          <LogoIcon className="h-16 w-16 text-indigo-500" />
        </div>
        <h1 className="text-4xl font-extrabold text-gray-100 mb-2 tracking-tight">
          Welcome to AI Image Studio
        </h1>
        <p className="text-gray-400 mb-8 text-lg">
          The place where your words become art.
        </p>
        <p className="text-sm text-gray-500 mb-6">
          In a real application, this would use a service like Clerk for secure authentication. For this demo, simply click below to continue.
        </p>
        <Button onClick={onLogin} className="w-full text-lg">
          <GoogleIcon className="w-6 h-6 mr-3" />
          Sign In & Start Creating
        </Button>
      </div>
    </div>
  );
};

export default LoginPage;
