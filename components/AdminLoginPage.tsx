import React, { useState } from 'react';
import { LoginCredentials } from '../types';
import ModernFooter from './ModernFooter';
import { ModernNavbar } from './ModernNavbar';

// Admin-specific icons
const ShieldIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none">
        <path d="M12 1l9 4v7c0 5.55-3.84 10.74-9 12-5.16-1.26-9-6.45-9-12V5l9-4z" fill="#10b981" fillOpacity="0.1" stroke="#10b981" strokeWidth="1.8"/>
        <path d="M9 12l2 2 4-4" stroke="#10b981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <circle cx="12" cy="12" r="1" fill="#10b981"/>
    </svg>
);

const KeyIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
        <circle cx="8" cy="16" r="3" fill="#10b981" fillOpacity="0.2" stroke="#10b981" strokeWidth="1.5"/>
        <path d="M10.85 12.15L19 4a2 2 0 0 1 3 3l-7.85 7.85" stroke="#10b981" strokeWidth="1.5"/>
        <path d="M18 2l3 3M21 3l-1 1" stroke="#10b981" strokeWidth="1.5"/>
    </svg>
);

interface AdminLoginPageProps {
    onLogin: (credentials: LoginCredentials) => Promise<void>;
    onBackToNormalLogin: () => void;
    loading?: boolean;
    error?: string;
    onViewChange?: (view: 'landing' | 'app' | 'about' | 'faq' | 'login' | 'register' | 'profile' | 'settings' | 'admin') => void;
    onOpenShortcuts?: () => void;
    onOpenHelp?: () => void;
    isAuthenticated?: boolean;
    user?: { fullName: string; profileImage?: string; role?: 'user' | 'admin' | 'super_admin'; isAdmin?: boolean } | null;
    onLogout?: () => void;
}

const AdminLoginPage: React.FC<AdminLoginPageProps> = ({
    onLogin,
    onBackToNormalLogin,
    loading = false,
    error,
    onViewChange = () => {},
    onOpenShortcuts = () => {},
    onOpenHelp = () => {},
    isAuthenticated = false,
    user = null,
    onLogout = () => {}
}) => {
    const [formData, setFormData] = useState<LoginCredentials>({
        email: '',
        password: ''
    });
    const [showPassword, setShowPassword] = useState(false);
    const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});

    const validateForm = (): boolean => {
        const errors: Record<string, string> = {};

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!formData.email) {
            errors.email = 'E-posta adresi gereklidir';
        } else if (!emailRegex.test(formData.email)) {
            errors.email = 'Geçerli bir e-posta adresi girin';
        }

        // Password validation
        if (!formData.password) {
            errors.password = 'Şifre gereklidir';
        } else if (formData.password.length < 6) {
            errors.password = 'Şifre en az 6 karakter olmalıdır';
        }

        setValidationErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (validateForm()) {
            await onLogin(formData);
        }
    };

    return (
        <div className="min-h-screen flex flex-col bg-gradient-to-br from-red-50 via-orange-50 to-amber-50">
            <ModernNavbar
                currentView="login"
                onViewChange={onViewChange}
                onOpenShortcuts={onOpenShortcuts}
                onOpenHelp={onOpenHelp}
                isAuthenticated={isAuthenticated}
                user={user}
                onLogout={onLogout}
            />

            <main className="flex-grow flex items-center justify-center py-20 sm:py-32 px-4 sm:px-6 lg:px-8">
                <div className="max-w-md w-full space-y-8">
                    {/* Header */}
                    <div className="text-center">
                        <div className="mx-auto h-16 w-16 bg-gradient-to-br from-red-500 to-orange-500 rounded-2xl flex items-center justify-center mb-6 shadow-lg">
                            <ShieldIcon />
                        </div>
                        <h2 className="text-3xl font-bold text-slate-800 mb-2">
                            Admin Girişi
                        </h2>
                        <p className="text-slate-600">
                            Yönetici paneline erişim için özel kimlik doğrulama
                        </p>
                    </div>

                    {/* Admin Notice */}
                    <div className="bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 rounded-xl p-4">
                        <div className="flex items-center gap-3">
                            <div className="text-amber-600">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" fill="currentColor"/>
                                </svg>
                            </div>
                            <div>
                                <h4 className="font-semibold text-amber-800">Yönetici Erişimi</h4>
                                <p className="text-sm text-amber-700">Bu sayfa sadece sistem yöneticileri içindir.</p>
                            </div>
                        </div>
                    </div>

                    {/* Admin Login Form */}
                    <div className="bg-white rounded-2xl shadow-xl p-8 border-2 border-red-100">
                        {error && (
                            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl">
                                <div className="flex items-center">
                                    <svg className="h-5 w-5 text-red-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    <span className="text-red-800 text-sm">{error}</span>
                                </div>
                            </div>
                        )}

                        <form onSubmit={handleSubmit} className="space-y-6">
                            {/* Email Input */}
                            <div>
                                <label htmlFor="admin-email" className="block text-sm font-semibold text-slate-700 mb-2">
                                    Admin E-posta
                                </label>
                                <input
                                    id="admin-email"
                                    type="email"
                                    value={formData.email}
                                    onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                                    className="w-full px-4 py-3 border-2 border-slate-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors"
                                    placeholder="admin@example.com"
                                    required
                                />
                                {validationErrors.email && (
                                    <p className="mt-1 text-sm text-red-600">{validationErrors.email}</p>
                                )}
                            </div>

                            {/* Password Input */}
                            <div>
                                <label htmlFor="admin-password" className="block text-sm font-semibold text-slate-700 mb-2">
                                    Admin Şifresi
                                </label>
                                <div className="relative">
                                    <input
                                        id="admin-password"
                                        type={showPassword ? 'text' : 'password'}
                                        value={formData.password}
                                        onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
                                        className="w-full px-4 py-3 pr-12 border-2 border-slate-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors"
                                        placeholder="••••••••"
                                        required
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-600"
                                    >
                                        {showPassword ? (
                                            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21" />
                                            </svg>
                                        ) : (
                                            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                            </svg>
                                        )}
                                    </button>
                                </div>
                                {validationErrors.password && (
                                    <p className="mt-1 text-sm text-red-600">{validationErrors.password}</p>
                                )}
                            </div>

                            {/* Submit Button */}
                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full bg-gradient-to-r from-red-600 to-orange-600 text-white font-bold py-3 px-4 rounded-xl hover:from-red-700 hover:to-orange-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                            >
                                {loading ? (
                                    <>
                                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        Doğrulanıyor...
                                    </>
                                ) : (
                                    <>
                                        <KeyIcon />
                                        <span className="ml-2">Admin Girişi</span>
                                    </>
                                )}
                            </button>
                        </form>

                        {/* Back to Normal Login */}
                        <div className="mt-6 text-center">
                            <button
                                onClick={onBackToNormalLogin}
                                className="text-slate-600 hover:text-slate-800 text-sm font-medium hover:underline"
                            >
                                ← Normal kullanıcı girişine dön
                            </button>
                        </div>
                    </div>

                    {/* Admin Info Box */}
                    <div className="bg-slate-50 rounded-xl p-4 text-center">
                        <h4 className="font-semibold text-slate-800 mb-2">Demo Admin Hesabı</h4>
                        <p className="text-sm text-slate-600 mb-3">Test etmek için aşağıdaki bilgileri kullanabilirsiniz:</p>
                        <div className="bg-white rounded-lg p-3 text-left font-mono text-sm">
                            <div className="text-slate-700">E-posta: <span className="text-emerald-600">admin@example.com</span></div>
                            <div className="text-slate-700">Şifre: <span className="text-emerald-600">admin123</span></div>
                        </div>
                    </div>
                </div>
            </main>

            <ModernFooter />
        </div>
    );
};

export default AdminLoginPage;