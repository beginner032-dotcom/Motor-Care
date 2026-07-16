import React, { useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { MotorIcon } from '../icons/MotorIcon';

export default function LoginView() {
  const { signInWithGoogle } = useAuth();
  const [error, setError] = useState<string | null>(null);
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  const handleLogin = async () => {
    setIsLoggingIn(true);
    setError(null);
    try {
      await signInWithGoogle();
    } catch (err: any) {
      setError(err.message || 'Gagal login. Silakan coba lagi.');
    } finally {
      setIsLoggingIn(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F0F2F5] flex justify-center text-[#1F2937]">
      <div className="w-full max-w-md bg-white h-screen relative flex flex-col justify-center items-center px-6 shadow-2xl">
        <div className="w-20 h-20 bg-[#003399] rounded-2xl flex items-center justify-center mb-6 shadow-lg">
          <MotorIcon className="text-white w-12 h-12" />
        </div>
        
        <h1 className="text-2xl font-bold text-[#1F2937] mb-2">MotoCare</h1>
        <p className="text-gray-500 mb-10 text-center text-sm">
          Aplikasi Manajemen Motor dan Riwayat Servis
        </p>

        {error && (
          <div className="w-full bg-red-50 text-red-500 p-3 rounded-lg text-sm mb-6 text-center border border-red-100">
            {error}
          </div>
        )}

        <button
          onClick={handleLogin}
          disabled={isLoggingIn}
          className="w-full bg-white border border-gray-300 text-gray-700 font-semibold py-3.5 px-4 rounded-xl shadow-sm flex items-center justify-center gap-3 hover:bg-gray-50 active:scale-[0.98] transition-all disabled:opacity-70 disabled:active:scale-100"
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24">
            <path
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              fill="#4285F4"
            />
            <path
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              fill="#34A853"
            />
            <path
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              fill="#FBBC05"
            />
            <path
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              fill="#EA4335"
            />
          </svg>
          {isLoggingIn ? 'Memproses...' : 'Lanjutkan dengan Google'}
        </button>
      </div>
    </div>
  );
}
