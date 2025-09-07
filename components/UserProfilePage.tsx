import React, { useState } from 'react';
import { User, UpdateProfileData } from '../types';
import ModernFooter from './ModernFooter';
import { ModernNavbar } from './ModernNavbar';

interface UserProfilePageProps {
  user?: User | null;
  onUpdateProfile: (data: UpdateProfileData) => Promise<void>;
  onLogout: () => void;
  onNavigateToApp: () => void;
  loading?: boolean;
  error?: string;
  onViewChange?: (view: 'landing' | 'app' | 'about' | 'faq' | 'login' | 'register' | 'profile' | 'settings') => void;
  onOpenShortcuts?: () => void;
  onOpenHelp?: () => void;
}

const UserProfilePage: React.FC<UserProfilePageProps> = ({
  user,
  onUpdateProfile,
  onLogout,
  onNavigateToApp,
  loading = false,
  error,
  onViewChange = () => {},
  onOpenShortcuts = () => {},
  onOpenHelp = () => {}
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    fullName: user?.fullName || '',
    email: user?.email || '',
    profileImage: user?.profileImage || ''
  });
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});

  const validateForm = (): boolean => {
    const errors: Record<string, string> = {};

    // Full name validation
    if (!formData.fullName.trim()) {
      errors.fullName = 'Ad ve soyad gereklidir';
    } else if (formData.fullName.trim().length < 2) {
      errors.fullName = 'Ad ve soyad en az 2 karakter olmalıdır';
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email) {
      errors.email = 'E-posta adresi gereklidir';
    } else if (!emailRegex.test(formData.email)) {
      errors.email = 'Geçerli bir e-posta adresi girin';
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        await onUpdateProfile(formData);
        setIsEditing(false);
      } catch (err) {
        console.error('Profile update failed:', err);
      }
    }
  };

  const handleCancel = () => {
    setFormData({
      fullName: user?.fullName || '',
      email: user?.email || '',
      profileImage: user?.profileImage || ''
    });
    setValidationErrors({});
    setIsEditing(false);
  };

  const getMembershipColor = (type: string) => {
    switch (type) {
      case 'pro': return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'premium': return 'bg-emerald-100 text-emerald-800 border-emerald-200';
      default: return 'bg-blue-100 text-blue-800 border-blue-200';
    }
  };

  const getMembershipIcon = (type: string) => {
    switch (type) {
      case 'pro':
        return (
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
          </svg>
        );
      case 'premium':
        return (
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
          </svg>
        );
      default:
        return (
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
          </svg>
        );
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50">
      <ModernNavbar 
        currentView="profile"
        onViewChange={onViewChange}
        onOpenShortcuts={onOpenShortcuts}
        onOpenHelp={onOpenHelp}
        isAuthenticated={!!user}
        user={user ? { fullName: user.full_name || user.fullName, profileImage: user.profileImage } : null}
        onLogout={onLogout}
      />
      
      <main className="flex-grow max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-slate-800 mb-2">Hoş Geldiniz!</h1>
          <p className="text-slate-600">Profilinizi görüntüleyin ve hesap bilgilerinizi yönetin</p>
        </div>

        {/* Navigation */}
        <div className="flex justify-center mb-8">
          <button
            onClick={onNavigateToApp}
            className="bg-emerald-600 text-white px-8 py-3 rounded-xl font-semibold hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 transition-all flex items-center text-lg"
          >
            <svg className="w-6 h-6 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            Excel Formül Yardımcısını Kullanmaya Başla
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Information */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-xl p-8">
              {error && (
                <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl">
                  <div className="flex items-center">
                    <svg className="w-5 h-5 text-red-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <p className="text-red-700">{error}</p>
                  </div>
                </div>
              )}

              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-slate-800">Kişisel Bilgiler</h2>
                {!isEditing && (
                  <button
                    onClick={() => setIsEditing(true)}
                    className="text-emerald-600 hover:text-emerald-500 font-medium flex items-center"
                  >
                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                    Düzenle
                  </button>
                )}
              </div>

              {isEditing ? (
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Profile Image */}
                  <div className="flex items-center space-x-6">
                    <div className="flex-shrink-0">
                      <div className="h-20 w-20 rounded-full bg-emerald-500 flex items-center justify-center text-white text-2xl font-bold">
                        {formData.fullName ? formData.fullName.charAt(0).toUpperCase() : 'U'}
                      </div>
                    </div>
                    <div>
                      <button
                        type="button"
                        className="bg-white border border-slate-300 rounded-lg px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                      >
                        Fotoğraf Değiştir
                      </button>
                      <p className="text-sm text-slate-500 mt-2">JPG, GIF veya PNG. Max 1MB.</p>
                    </div>
                  </div>

                  {/* Full Name */}
                  <div>
                    <label htmlFor="fullName" className="block text-sm font-medium text-slate-700 mb-2">
                      Ad ve Soyad
                    </label>
                    <input
                      id="fullName"
                      type="text"
                      required
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      className={`block w-full px-3 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all ${
                        validationErrors.fullName ? 'border-red-300' : 'border-slate-300'
                      }`}
                      placeholder="Adınızı ve soyadınızı girin"
                    />
                    {validationErrors.fullName && (
                      <p className="mt-1 text-sm text-red-600">{validationErrors.fullName}</p>
                    )}
                  </div>

                  {/* Email */}
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-2">
                      E-posta Adresi
                    </label>
                    <input
                      id="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className={`block w-full px-3 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all ${
                        validationErrors.email ? 'border-red-300' : 'border-slate-300'
                      }`}
                      placeholder="E-posta adresinizi girin"
                    />
                    {validationErrors.email && (
                      <p className="mt-1 text-sm text-red-600">{validationErrors.email}</p>
                    )}
                  </div>

                  {/* Action Buttons */}
                  <div className="flex items-center justify-end space-x-4">
                    <button
                      type="button"
                      onClick={handleCancel}
                      className="px-4 py-2 border border-slate-300 rounded-xl font-medium text-slate-700 hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2 transition-all"
                    >
                      İptal
                    </button>
                    <button
                      type="submit"
                      disabled={loading}
                      className="px-6 py-2 bg-emerald-600 text-white rounded-xl font-semibold hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {loading ? 'Kaydediliyor...' : 'Kaydet'}
                    </button>
                  </div>
                </form>
              ) : (
                <div className="space-y-6">
                  {/* Profile Display */}
                  <div className="flex items-center space-x-6">
                    <div className="flex-shrink-0">
                      <div className="h-20 w-20 rounded-full bg-emerald-500 flex items-center justify-center text-white text-2xl font-bold">
                        {user?.fullName ? user.fullName.charAt(0).toUpperCase() : 'U'}
                      </div>
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-slate-800">{user?.fullName || 'Demo Kullanıcı'}</h3>
                      <p className="text-slate-600">{user?.email || 'demo@example.com'}</p>
                      <p className="text-sm text-slate-500">
                        Üyelik tarihi: {user?.createdAt ? new Date(user.createdAt).toLocaleDateString('tr-TR') : 'Bugün'}
                      </p>
                    </div>
                  </div>

                  {/* Additional Info */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">Son Giriş</label>
                      <p className="text-slate-900">
                        {user?.lastLogin ? new Date(user.lastLogin).toLocaleDateString('tr-TR') : 'Şimdi'}
                      </p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">Hesap Durumu</label>
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800">
                        Aktif
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Membership Card */}
            <div className="bg-white rounded-2xl shadow-xl p-6">
              <h3 className="text-lg font-semibold text-slate-800 mb-4">Üyelik Bilgileri</h3>
              <div className={`p-4 rounded-xl border-2 ${getMembershipColor(user?.membershipPlan?.type || 'free')}`}>
                <div className="flex items-center mb-2">
                  {getMembershipIcon(user?.membershipPlan?.type || 'free')}
                  <span className="ml-2 font-semibold capitalize">
                    {user?.membershipPlan?.name || 'Ücretsiz Plan'}
                  </span>
                </div>
                <p className="text-sm opacity-80">
                  Aylık {user?.membershipPlan?.monthlyCredits || 100} kredi
                </p>
              </div>
              
              <div className="mt-4 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-600">Kullanılan Kredi</span>
                  <span className="font-medium">
                    {user?.maxCredits ? (user.maxCredits - user.credits) : 0} / {user?.maxCredits || 100}
                  </span>
                </div>
                <div className="w-full bg-slate-200 rounded-full h-2">
                  <div
                    className="bg-emerald-600 h-2 rounded-full"
                    style={{
                      width: user?.maxCredits 
                        ? `${((user.maxCredits - user.credits) / user.maxCredits) * 100}%`
                        : '10%'
                    }}
                  ></div>
                </div>
              </div>
            </div>

            {/* Welcome Message */}
            <div className="bg-gradient-to-r from-emerald-100 to-teal-100 border border-emerald-200 rounded-2xl p-6">
              <div className="flex items-start">
                <svg className="w-6 h-6 text-emerald-600 mr-3 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <div>
                  <p className="text-sm text-emerald-800 font-medium mb-1">🎉 Başarıyla giriş yaptınız!</p>
                  <p className="text-xs text-emerald-700">
                    Excel Formül Yardımcısı ile verimliliğinizi artırın. Formül oluşturmaya başlamak için yukarıdaki butona tıklayın.
                  </p>
                </div>
              </div>
            </div>

            {/* Logout */}
            <div className="bg-white rounded-2xl shadow-xl p-6">
              <button
                onClick={onLogout}
                className="w-full bg-red-600 text-white py-3 px-4 rounded-xl font-semibold hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-all flex items-center justify-center"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
                Çıkış Yap
              </button>
            </div>
          </div>
        </div>
      </main>
      
      {/* Footer */}
      <ModernFooter />
    </div>
  );
};

export default UserProfilePage;
