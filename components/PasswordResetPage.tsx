import React, { useState } from 'react';
import { PasswordResetData } from '../types';

interface PasswordResetPageProps {
  onPasswordReset: (data: PasswordResetData) => Promise<void>;
  onBackToLogin: () => void;
  loading?: boolean;
  error?: string;
  success?: boolean;
}

const PasswordResetPage: React.FC<PasswordResetPageProps> = ({ 
  onPasswordReset, 
  onBackToLogin, 
  loading = false, 
  error,
  success = false
}) => {
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/;
    if (!email) {
      setEmailError('E-posta adresi gereklidir');
      return false;
    } else if (!emailRegex.test(email)) {
      setEmailError('Geçerli bir e-posta adresi girin');
      return false;
    }
    setEmailError('');
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (validateEmail(email)) {
      await onPasswordReset({ email });
    }
  };

  if (success) {
    return (
      <div className=\"min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8\">
        <div className=\"max-w-md w-full space-y-8\">
          {/* Success Message */}
          <div className=\"text-center\">
            <div className=\"mx-auto h-16 w-16 bg-green-500 rounded-2xl flex items-center justify-center mb-6\">
              <svg className=\"h-8 w-8 text-white\" fill=\"none\" stroke=\"currentColor\" viewBox=\"0 0 24 24\">
                <path strokeLinecap=\"round\" strokeLinejoin=\"round\" strokeWidth={2} d=\"M5 13l4 4L19 7\" />
              </svg>
            </div>
            <h2 className=\"text-3xl font-bold text-slate-800 mb-2\">
              E-posta Gönderildi
            </h2>
            <p className=\"text-slate-600\">
              Şifre sıfırlama bağlantısı e-posta adresinize gönderildi
            </p>
          </div>

          <div className=\"bg-white rounded-2xl shadow-xl p-8\">
            <div className=\"text-center space-y-4\">
              <div className=\"bg-green-50 border border-green-200 rounded-xl p-4\">
                <div className=\"flex items-center\">
                  <svg className=\"w-5 h-5 text-green-500 mr-2\" fill=\"none\" stroke=\"currentColor\" viewBox=\"0 0 24 24\">
                    <path strokeLinecap=\"round\" strokeLinejoin=\"round\" strokeWidth={2} d=\"M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z\" />
                  </svg>
                  <div className=\"text-left\">
                    <p className=\"text-sm font-medium text-green-800\">
                      Şifre sıfırlama bağlantısı gönderildi
                    </p>
                    <p className=\"text-xs text-green-600 mt-1\">
                      {email} adresini kontrol edin
                    </p>
                  </div>
                </div>
              </div>

              <div className=\"space-y-4 text-sm text-slate-600\">
                <p>
                  <strong>Sonraki adımlar:</strong>
                </p>
                <ol className=\"text-left space-y-2 list-decimal list-inside\">
                  <li>E-posta kutunuzu kontrol edin</li>
                  <li>\"Şifre Sıfırla\" bağlantısına tıklayın</li>
                  <li>Yeni şifrenizi oluşturun</li>
                  <li>Yeni şifrenizle giriş yapın</li>
                </ol>
              </div>

              <div className=\"bg-blue-50 border border-blue-200 rounded-xl p-4\">
                <div className=\"flex items-start\">
                  <svg className=\"w-5 h-5 text-blue-500 mr-2 mt-0.5\" fill=\"none\" stroke=\"currentColor\" viewBox=\"0 0 24 24\">
                    <path strokeLinecap=\"round\" strokeLinejoin=\"round\" strokeWidth={2} d=\"M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z\" />
                  </svg>
                  <div className=\"text-left\">
                    <p className=\"text-sm font-medium text-blue-800\">
                      E-posta gelmediyse:
                    </p>
                    <ul className=\"text-xs text-blue-600 mt-1 space-y-1\">
                      <li>• Spam/çöp kutusu klasörünü kontrol edin</li>
                      <li>• E-posta adresinizi doğru yazdığınızdan emin olun</li>
                      <li>• 5-10 dakika bekleyip tekrar deneyin</li>
                    </ul>
                  </div>
                </div>
              </div>

              <button
                onClick={onBackToLogin}
                className=\"w-full bg-emerald-600 text-white py-3 px-4 rounded-xl font-semibold hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 transition-all\"
              >
                Giriş Sayfasına Dön
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className=\"min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8\">
      <div className=\"max-w-md w-full space-y-8\">
        {/* Header */}
        <div className=\"text-center\">
          <div className=\"mx-auto h-16 w-16 bg-blue-500 rounded-2xl flex items-center justify-center mb-6\">
            <svg className=\"h-8 w-8 text-white\" fill=\"none\" stroke=\"currentColor\" viewBox=\"0 0 24 24\">
              <path strokeLinecap=\"round\" strokeLinejoin=\"round\" strokeWidth={2} d=\"M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z\" />
            </svg>
          </div>
          <h2 className=\"text-3xl font-bold text-slate-800 mb-2\">
            Şifremi Unuttum
          </h2>
          <p className=\"text-slate-600\">
            E-posta adresinizi girin, size şifre sıfırlama bağlantısı gönderelim
          </p>
        </div>

        {/* Password Reset Form */}
        <div className=\"bg-white rounded-2xl shadow-xl p-8\">
          {error && (
            <div className=\"mb-6 p-4 bg-red-50 border border-red-200 rounded-xl\">
              <div className=\"flex items-center\">
                <svg className=\"w-5 h-5 text-red-500 mr-2\" fill=\"none\" stroke=\"currentColor\" viewBox=\"0 0 24 24\">
                  <path strokeLinecap=\"round\" strokeLinejoin=\"round\" strokeWidth={2} d=\"M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z\" />
                </svg>
                <p className=\"text-red-700\">{error}</p>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className=\"space-y-6\">
            {/* Email Field */}
            <div>
              <label htmlFor=\"email\" className=\"block text-sm font-medium text-slate-700 mb-2\">
                E-posta Adresi
              </label>
              <div className=\"relative\">
                <div className=\"absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none\">
                  <svg className=\"h-5 w-5 text-slate-400\" fill=\"none\" stroke=\"currentColor\" viewBox=\"0 0 24 24\">
                    <path strokeLinecap=\"round\" strokeLinejoin=\"round\" strokeWidth={2} d=\"M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z\" />
                  </svg>
                </div>
                <input
                  id=\"email\"
                  type=\"email\"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={`block w-full pl-10 pr-3 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${
                    emailError ? 'border-red-300' : 'border-slate-300'
                  }`}
                  placeholder=\"ornek@email.com\"
                />
              </div>
              {emailError && (
                <p className=\"mt-1 text-sm text-red-600\">{emailError}</p>
              )}
            </div>

            {/* Info Box */}
            <div className=\"bg-blue-50 border border-blue-200 rounded-xl p-4\">
              <div className=\"flex items-start\">
                <svg className=\"w-5 h-5 text-blue-500 mr-2 mt-0.5\" fill=\"none\" stroke=\"currentColor\" viewBox=\"0 0 24 24\">
                  <path strokeLinecap=\"round\" strokeLinejoin=\"round\" strokeWidth={2} d=\"M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z\" />
                </svg>
                <div>
                  <p className=\"text-sm font-medium text-blue-800 mb-1\">
                    Şifre sıfırlama işlemi nasıl çalışır?
                  </p>
                  <ul className=\"text-xs text-blue-600 space-y-1\">
                    <li>• E-posta adresinize güvenli bir bağlantı gönderilir</li>
                    <li>• Bağlantı 24 saat geçerlidir</li>
                    <li>• Yeni şifrenizi oluşturduktan sonra hemen giriş yapabilirsiniz</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type=\"submit\"
              disabled={loading}
              className=\"w-full bg-blue-600 text-white py-3 px-4 rounded-xl font-semibold hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center\"
            >
              {loading ? (
                <>
                  <svg className=\"animate-spin -ml-1 mr-3 h-5 w-5 text-white\" xmlns=\"http://www.w3.org/2000/svg\" fill=\"none\" viewBox=\"0 0 24 24\">
                    <circle className=\"opacity-25\" cx=\"12\" cy=\"12\" r=\"10\" stroke=\"currentColor\" strokeWidth=\"4\"></circle>
                    <path className=\"opacity-75\" fill=\"currentColor\" d=\"M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z\"></path>
                  </svg>
                  Gönderiliyor...
                </>
              ) : (
                <>
                  <svg className=\"w-5 h-5 mr-2\" fill=\"none\" stroke=\"currentColor\" viewBox=\"0 0 24 24\">
                    <path strokeLinecap=\"round\" strokeLinejoin=\"round\" strokeWidth={2} d=\"M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z\" />
                  </svg>
                  Şifre Sıfırlama Bağlantısı Gönder
                </>
              )}
            </button>
          </form>

          {/* Back to Login */}
          <div className=\"mt-6 text-center\">
            <button
              onClick={onBackToLogin}
              className=\"text-slate-600 hover:text-slate-800 text-sm flex items-center justify-center mx-auto transition-colors\"
            >
              <svg className=\"w-4 h-4 mr-1\" fill=\"none\" stroke=\"currentColor\" viewBox=\"0 0 24 24\">
                <path strokeLinecap=\"round\" strokeLinejoin=\"round\" strokeWidth={2} d=\"M10 19l-7-7m0 0l7-7m-7 7h18\" />
              </svg>
              Giriş sayfasına dön
            </button>
          </div>
        </div>

        {/* Security Note */}
        <div className=\"bg-slate-800 rounded-xl p-6 text-white\">
          <div className=\"flex items-start\">
            <svg className=\"w-6 h-6 text-yellow-400 mr-3 mt-0.5\" fill=\"none\" stroke=\"currentColor\" viewBox=\"0 0 24 24\">
              <path strokeLinecap=\"round\" strokeLinejoin=\"round\" strokeWidth={2} d=\"M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.5 0L4.314 16.5c-.77.833.192 2.5 1.732 2.5z\" />
            </svg>
            <div>
              <h3 className=\"font-semibold text-sm mb-2\">Güvenlik Uyarısı</h3>
              <p className=\"text-xs text-slate-300\">
                Şifre sıfırlama bağlantısını kimseyle paylaşmayın. 
                Excel Formül Yardımcısı ekibi asla e-posta ile şifrenizi sormaz.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PasswordResetPage;"