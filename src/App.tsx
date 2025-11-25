import { useState, useEffect } from 'react';
import LoginPage from './components/LoginPage';
import MemberArea from './components/MemberArea';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loggedIn = localStorage.getItem('isLoggedIn') === 'true';
    setIsLoggedIn(loggedIn);
    setIsLoading(false);
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#0a1f1a] via-[#0d2818] to-[#051a12] flex items-center justify-center">
        <div className="text-emerald-400 text-lg">Carregando...</div>
      </div>
    );
  }

  if (!isLoggedIn) {
    return <LoginPage onLogin={() => setIsLoggedIn(true)} />;
  }

  return <MemberArea onLogout={() => setIsLoggedIn(false)} />;
}

export default App;
