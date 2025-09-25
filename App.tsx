
import React, { useState, useCallback } from 'react';
import LoginPage from './components/LoginPage';
import ImageGeneratorPage from './components/ImageGeneratorPage';

const App: React.FC = () => {
  // This is a mock authentication state. In a real application,
  // you would use Clerk's hooks like `useUser` and `useAuth`.
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = useCallback(() => {
    setIsLoggedIn(true);
  }, []);

  const handleLogout = useCallback(() => {
    setIsLoggedIn(false);
  }, []);

  return (
    <div className="min-h-screen bg-gray-900">
      {isLoggedIn ? (
        <ImageGeneratorPage onLogout={handleLogout} />
      ) : (
        <LoginPage onLogin={handleLogin} />
      )}
    </div>
  );
};

export default App;
