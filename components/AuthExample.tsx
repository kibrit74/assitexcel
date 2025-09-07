import React, { useState } from 'react';
import LoginPage from './LoginPage';
import SignupPage from './SignupPage';
import { LoginCredentials, RegisterData } from '../types';

const AuthExample: React.FC = () => {
  const [currentView, setCurrentView] = useState<'login' | 'signup'>('login');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Mock login function
  const handleLogin = async (credentials: LoginCredentials): Promise<void> => {
    setLoading(true);
    setError(null);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Mock validation
      if (credentials.email === 'demo@example.com' && credentials.password === 'demo123') {
        console.log('Login successful:', credentials);
        alert('Giriş başarılı!');
      } else {
        throw new Error('Geçersiz e-posta adresi veya şifre');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Bir hata oluştu');
    } finally {
      setLoading(false);
    }
  };

  // Mock signup function
  const handleSignup = async (userData: RegisterData): Promise<void> => {
    setLoading(true);
    setError(null);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Mock validation
      if (userData.email === 'existing@example.com') {
        throw new Error('Bu e-posta adresi zaten kullanılıyor');
      }
      
      console.log('Signup successful:', userData);
      alert('Hesap başarıyla oluşturuldu! Lütfen e-posta adresinizi doğrulayın.');
      setCurrentView('login');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Bir hata oluştu');
    } finally {
      setLoading(false);
    }
  };

  // Mock forgot password function
  const handleForgotPassword = (email: string): void => {
    console.log('Password reset requested for:', email);
    alert(`Şifre sıfırlama bağlantısı ${email} adresine gönderildi.`);
  };
  
  // Mock Google login function
  const handleGoogleLogin = async (): Promise<void> => {
    setLoading(true);
    setError(null);
    
    try {
      // Simulate Google OAuth flow
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      console.log('Google login successful');
      alert('Google ile giriş başarılı!');
      setCurrentView('login'); // Keep on login page for demo
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Google ile giriş yapılırken bir hata oluştu');
    } finally {
      setLoading(false);
    }
  };
  
  // Mock Google signup function
  const handleGoogleSignup = async (): Promise<void> => {
    setLoading(true);
    setError(null);
    
    try {
      // Simulate Google OAuth flow
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      console.log('Google signup successful');
      alert('Google ile kayıt başarılı!');
      setCurrentView('login'); // Redirect to login after successful signup
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Google ile kayıt olurken bir hata oluştu');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {currentView === 'login' ? (
        <LoginPage
          onLogin={handleLogin}
          onForgotPassword={handleForgotPassword}
          onRegisterClick={() => setCurrentView('signup')}
          onGoogleLogin={handleGoogleLogin}
          loading={loading}
          error={error || undefined}
        />
      ) : (
        <SignupPage
          onSignup={handleSignup}
          onLoginClick={() => setCurrentView('login')}
          onGoogleSignup={handleGoogleSignup}
          loading={loading}
          error={error || undefined}
        />
      )}
    </>
  );
};

export default AuthExample;
