import React, { useState } from 'react';
import { RegisterData } from '../types';

interface RegisterPageProps {
  onRegister: (data: RegisterData) => Promise<void>;
  onLoginClick: () => void;
  loading?: boolean;
  error?: string;
}

const RegisterPage: React.FC<RegisterPageProps> = ({ 
  onRegister, 
  onLoginClick, 
  loading = false, 
  error 
}) => {
  const [formData, setFormData] = useState<RegisterData>({
    email: '',
    password: '',
    fullName: '',
    confirmPassword: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});

  const validateForm = (): boolean => {
    const errors: Record<string, string> = {};

    // Name validation
    if (!formData.fullName.trim()) {
      errors.fullName = 'Ad soyad gereklidir';
    } else if (formData.fullName.trim().length < 2) {
      errors.fullName = 'Ad soyad en az 2 karakter olmalıdır';
    }

    // Email validation
    const emailRegex = /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/;
    if (!formData.email) {
      errors.email = 'E-posta adresi gereklidir';
    } else if (!emailRegex.test(formData.email)) {
      errors.email = 'Geçerli bir e-posta adresi girin';
    }

    // Password validation
    if (!formData.password) {
      errors.password = 'Şifre gereklidir';
    } else if (formData.password.length < 8) {
      errors.password = 'Şifre en az 8 karakter olmalıdır';
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)/.test(formData.password)) {
      errors.password = 'Şifre en az bir büyük harf, bir küçük harf ve bir rakam içermelidir';
    }

    // Confirm password validation
    if (!formData.confirmPassword) {
      errors.confirmPassword = 'Şifre tekrarı gereklidir';
    } else if (formData.password !== formData.confirmPassword) {
      errors.confirmPassword = 'Şifreler eşleşmiyor';
    }

    // Terms validation
    if (!acceptTerms) {
      errors.terms = 'Kullanım koşullarını kabul etmelisiniz';
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      await onRegister(formData);
    }
  };

  const getPasswordStrength = (password: string): { strength: number; label: string; color: string } => {
    let strength = 0;
    if (password.length >= 8) strength++;
    if (/[a-z]/.test(password)) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/\\d/.test(password)) strength++;
    if (/[^\\w\\s]/.test(password)) strength++;

    if (strength <= 2) return { strength, label: 'Zayıf', color: 'bg-red-500' };
    if (strength <= 3) return { strength, label: 'Orta', color: 'bg-yellow-500' };
    if (strength <= 4) return { strength, label: 'Güçlü', color: 'bg-green-500' };
    return { strength, label: 'Çok Güçlü', color: 'bg-emerald-500' };
  };

  const passwordStrength = getPasswordStrength(formData.password);

  return (
    <div className=\"min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8\">
      <div className=\"max-w-md w-full space-y-8\">
        {/* Header */}
        <div className=\"text-center\">
          <div className=\"mx-auto h-16 w-16 bg-emerald-500 rounded-2xl flex items-center justify-center mb-6\">
            <svg className=\"h-8 w-8 text-white\" fill=\"none\" stroke=\"currentColor\" viewBox=\"0 0 24 24\">
              <path strokeLinecap=\"round\" strokeLinejoin=\"round\" strokeWidth={2} d=\"M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z\" />
            </svg>
          </div>
          <h2 className=\"text-3xl font-bold text-slate-800 mb-2\">
            Hesap Oluşturun
          </h2>
          <p className=\"text-slate-600\">
            Excel Formül Yardımcısı'na katılın ve AI destekli Excel deneyimini yaşayın
          </p>
        </div>

        {/* Register Form */}
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
            {/* Full Name Field */}
            <div>
              <label htmlFor=\"fullName\" className=\"block text-sm font-medium text-slate-700 mb-2\">
                Ad Soyad
              </label>
              <div className=\"relative\">
                <div className=\"absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none\">
                  <svg className=\"h-5 w-5 text-slate-400\" fill=\"none\" stroke=\"currentColor\" viewBox=\"0 0 24 24\">
                    <path strokeLinecap=\"round\" strokeLinejoin=\"round\" strokeWidth={2} d=\"M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z\" />
                  </svg>
                </div>
                <input
                  id=\"fullName\"
                  type=\"text\"
                  required
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  className={`block w-full pl-10 pr-3 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all ${
                    validationErrors.fullName ? 'border-red-300' : 'border-slate-300'
                  }`}
                  placeholder="İsim Soyisim"
                />
              </div>
              {validationErrors.fullName && (
                <p className=\"mt-1 text-sm text-red-600\">{validationErrors.fullName}</p>
              )}
            </div>

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
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className={`block w-full pl-10 pr-3 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all ${
                    validationErrors.email ? 'border-red-300' : 'border-slate-300'
                  }`}
                  placeholder=\"ornek@email.com\"
                />
              </div>
              {validationErrors.email && (
                <p className=\"mt-1 text-sm text-red-600\">{validationErrors.email}</p>
              )}
            </div>

            {/* Password Field */}
            <div>
              <label htmlFor=\"password\" className=\"block text-sm font-medium text-slate-700 mb-2\">
                Şifre
              </label>
              <div className=\"relative\">
                <div className=\"absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none\">
                  <svg className=\"h-5 w-5 text-slate-400\" fill=\"none\" stroke=\"currentColor\" viewBox=\"0 0 24 24\">
                    <path strokeLinecap=\"round\" strokeLinejoin=\"round\" strokeWidth={2} d=\"M12 15v2a3 3 0 11-6 0v-2m6 0V9a3 3 0 00-6 0v6m6 0h4a2 2 0 012 2v4a2 2 0 01-2 2H6a2 2 0 01-2-2v-4a2 2 0 012-2h4\" />
                  </svg>
                </div>
                <input
                  id=\"password\"
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className={`block w-full pl-10 pr-12 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all ${
                    validationErrors.password ? 'border-red-300' : 'border-slate-300'
                  }`}
                  placeholder=\"••••••••\"
                />
                <button
                  type=\"button\"
                  onClick={() => setShowPassword(!showPassword)}
                  className=\"absolute inset-y-0 right-0 pr-3 flex items-center\"
                >
                  {showPassword ? (
                    <svg className=\"h-5 w-5 text-slate-400 hover:text-slate-600\" fill=\"none\" stroke=\"currentColor\" viewBox=\"0 0 24 24\">
                      <path strokeLinecap=\"round\" strokeLinejoin=\"round\" strokeWidth={2} d=\"M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21\" />
                    </svg>
                  ) : (
                    <svg className=\"h-5 w-5 text-slate-400 hover:text-slate-600\" fill=\"none\" stroke=\"currentColor\" viewBox=\"0 0 24 24\">
                      <path strokeLinecap=\"round\" strokeLinejoin=\"round\" strokeWidth={2} d=\"M15 12a3 3 0 11-6 0 3 3 0 016 0z\" />
                      <path strokeLinecap=\"round\" strokeLinejoin=\"round\" strokeWidth={2} d=\"M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z\" />
                    </svg>
                  )}
                </button>
              </div>
              
              {/* Password Strength Indicator */}
              {formData.password && (
                <div className=\"mt-2\">
                  <div className=\"flex items-center justify-between mb-1\">
                    <span className=\"text-xs text-slate-600\">Şifre Gücü:</span>
                    <span className={`text-xs font-medium ${
                      passwordStrength.strength <= 2 ? 'text-red-600' :
                      passwordStrength.strength <= 3 ? 'text-yellow-600' :
                      passwordStrength.strength <= 4 ? 'text-green-600' : 'text-emerald-600'
                    }`}>
                      {passwordStrength.label}
                    </span>
                  </div>
                  <div className=\"w-full bg-slate-200 rounded-full h-2\">
                    <div 
                      className={`h-2 rounded-full transition-all ${passwordStrength.color}`}
                      style={{ width: `${(passwordStrength.strength / 5) * 100}%` }}
                    ></div>
                  </div>
                </div>
              )}
              
              {validationErrors.password && (
                <p className=\"mt-1 text-sm text-red-600\">{validationErrors.password}</p>
              )}
            </div>

            {/* Confirm Password Field */}
            <div>
              <label htmlFor=\"confirmPassword\" className=\"block text-sm font-medium text-slate-700 mb-2\">
                Şifre Tekrarı
              </label>
              <div className=\"relative\">
                <div className=\"absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none\">
                  <svg className=\"h-5 w-5 text-slate-400\" fill=\"none\" stroke=\"currentColor\" viewBox=\"0 0 24 24\">
                    <path strokeLinecap=\"round\" strokeLinejoin=\"round\" strokeWidth={2} d=\"M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z\" />
                  </svg>
                </div>
                <input
                  id=\"confirmPassword\"
                  type={showConfirmPassword ? 'text' : 'password'}
                  required
                  value={formData.confirmPassword}
                  onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                  className={`block w-full pl-10 pr-12 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all ${
                    validationErrors.confirmPassword ? 'border-red-300' : 'border-slate-300'
                  }`}
                  placeholder=\"••••••••\"
                />
                <button
                  type=\"button\"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className=\"absolute inset-y-0 right-0 pr-3 flex items-center\"
                >
                  {showConfirmPassword ? (
                    <svg className=\"h-5 w-5 text-slate-400 hover:text-slate-600\" fill=\"none\" stroke=\"currentColor\" viewBox=\"0 0 24 24\">
                      <path strokeLinecap=\"round\" strokeLinejoin=\"round\" strokeWidth={2} d=\"M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21\" />
                    </svg>
                  ) : (
                    <svg className=\"h-5 w-5 text-slate-400 hover:text-slate-600\" fill=\"none\" stroke=\"currentColor\" viewBox=\"0 0 24 24\">
                      <path strokeLinecap=\"round\" strokeLinejoin=\"round\" strokeWidth={2} d=\"M15 12a3 3 0 11-6 0 3 3 0 016 0z\" />
                      <path strokeLinecap=\"round\" strokeLinejoin=\"round\" strokeWidth={2} d=\"M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z\" />
                    </svg>
                  )}
                </button>
              </div>
              {validationErrors.confirmPassword && (
                <p className=\"mt-1 text-sm text-red-600\">{validationErrors.confirmPassword}</p>
              )}
            </div>

            {/* Terms and Conditions */}
            <div>
              <div className=\"flex items-start\">
                <input
                  id=\"accept-terms\"
                  type=\"checkbox\"
                  checked={acceptTerms}
                  onChange={(e) => setAcceptTerms(e.target.checked)}
                  className=\"h-4 w-4 text-emerald-600 focus:ring-emerald-500 border-slate-300 rounded mt-1\"
                />
                <label htmlFor=\"accept-terms\" className=\"ml-3 block text-sm text-slate-700\">
                  <span className=\"font-medium\">Kullanım Koşulları</span> ve <span className=\"font-medium\">Gizlilik Politikası</span>'nı okudum ve kabul ediyorum.
                </label>
              </div>
              {validationErrors.terms && (
                <p className=\"mt-1 text-sm text-red-600\">{validationErrors.terms}</p>
              )}
            </div>

            {/* Submit Button */}
            <button
              type=\"submit\"
              disabled={loading}
              className=\"w-full bg-emerald-600 text-white py-3 px-4 rounded-xl font-semibold hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center\"
            >
              {loading ? (
                <>
                  <svg className=\"animate-spin -ml-1 mr-3 h-5 w-5 text-white\" xmlns=\"http://www.w3.org/2000/svg\" fill=\"none\" viewBox=\"0 0 24 24\">
                    <circle className=\"opacity-25\" cx=\"12\" cy=\"12\" r=\"10\" stroke=\"currentColor\" strokeWidth=\"4\"></circle>
                    <path className=\"opacity-75\" fill=\"currentColor\" d=\"M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z\"></path>
                  </svg>
                  Hesap oluşturuluyor...
                </>
              ) : (
                'Hesap Oluştur'
              )}
            </button>
          </form>

          {/* Divider */}
          <div className=\"mt-8\">
            <div className=\"relative\">
              <div className=\"absolute inset-0 flex items-center\">
                <div className=\"w-full border-t border-slate-300\" />
              </div>
              <div className=\"relative flex justify-center text-sm\">
                <span className=\"px-2 bg-white text-slate-500\">veya</span>
              </div>
            </div>
          </div>

          {/* Login Link */}
          <div className=\"mt-6 text-center\">
            <p className=\"text-slate-600\">
              Zaten hesabınız var mı?{' '}
              <button
                onClick={onLoginClick}
                className=\"text-emerald-600 hover:text-emerald-500 font-medium\"
              >
                Giriş yapın
              </button>
            </p>
          </div>
        </div>

        {/* Benefits */}
        <div className=\"bg-gradient-to-r from-emerald-500 to-blue-500 rounded-xl p-6 text-white\">
          <h3 className=\"font-semibold mb-3\">Üye olmanın avantajları:</h3>
          <div className=\"space-y-2 text-sm\">
            <div className=\"flex items-center\">
              <svg className=\"w-4 h-4 mr-2\" fill=\"none\" stroke=\"currentColor\" viewBox=\"0 0 24 24\">
                <path strokeLinecap=\"round\" strokeLinejoin=\"round\" strokeWidth={2} d=\"M5 13l4 4L19 7\" />
              </svg>
              <span>Aylık 50 ücretsiz formül/makro üretimi</span>
            </div>
            <div className=\"flex items-center\">
              <svg className=\"w-4 h-4 mr-2\" fill=\"none\" stroke=\"currentColor\" viewBox=\"0 0 24 24\">
                <path strokeLinecap=\"round\" strokeLinejoin=\"round\" strokeWidth={2} d=\"M5 13l4 4L19 7\" />
              </svg>
              <span>Formül geçmişinizi kaydedin</span>
            </div>
            <div className=\"flex items-center\">
              <svg className=\"w-4 h-4 mr-2\" fill=\"none\" stroke=\"currentColor\" viewBox=\"0 0 24 24\">
                <path strokeLinecap=\"round\" strokeLinejoin=\"round\" strokeWidth={2} d=\"M5 13l4 4L19 7\" />
              </svg>
              <span>Favori formüllerinizi yönetin</span>
            </div>
            <div className=\"flex items-center\">
              <svg className=\"w-4 h-4 mr-2\" fill=\"none\" stroke=\"currentColor\" viewBox=\"0 0 24 24\">
                <path strokeLinecap=\"round\" strokeLinejoin=\"round\" strokeWidth={2} d=\"M5 13l4 4L19 7\" />
              </svg>
              <span>Premium özelliklere erişim</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;"