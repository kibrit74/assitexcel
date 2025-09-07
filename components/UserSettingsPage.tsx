import React, { useState } from 'react';
import { User, UserPreferences, UpdateProfileData } from '../types';

interface UserSettingsPageProps {
  user: User;
  preferences: UserPreferences;
  onUpdateProfile: (data: UpdateProfileData) => Promise<void>;
  onUpdatePreferences: (preferences: UserPreferences) => Promise<void>;
  onChangePassword: (currentPassword: string, newPassword: string) => Promise<void>;
  onDeleteAccount: () => Promise<void>;
  onBack: () => void;
  loading?: boolean;
  error?: string;
  success?: string;
}

const UserSettingsPage: React.FC<UserSettingsPageProps> = ({
  user,
  preferences,
  onUpdateProfile,
  onUpdatePreferences,
  onChangePassword,
  onDeleteAccount,
  onBack,
  loading = false,
  error,
  success
}) => {
  const [activeSection, setActiveSection] = useState<'profile' | 'preferences' | 'security' | 'account'>('profile');
  
  // Profile form state
  const [profileData, setProfileData] = useState<UpdateProfileData>({
    fullName: user.fullName,
    email: user.email,
    profileImage: user.profileImage
  });
  
  // Preferences state
  const [preferencesData, setPreferencesData] = useState<UserPreferences>(preferences);
  
  // Password change state
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  
  // Validation states
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});
  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false
  });

  const validateProfileData = (): boolean => {
    const errors: Record<string, string> = {};
    
    if (!profileData.fullName?.trim()) {
      errors.fullName = 'Ad soyad gereklidir';
    }
    
    if (!profileData.email?.trim()) {
      errors.email = 'E-posta gereklidir';
    } else if (!/^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/.test(profileData.email)) {
      errors.email = 'Geçerli bir e-posta adresi girin';
    }
    
    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const validatePasswordData = (): boolean => {
    const errors: Record<string, string> = {};
    
    if (!passwordData.currentPassword) {
      errors.currentPassword = 'Mevcut şifre gereklidir';
    }
    
    if (!passwordData.newPassword) {
      errors.newPassword = 'Yeni şifre gereklidir';
    } else if (passwordData.newPassword.length < 8) {
      errors.newPassword = 'Yeni şifre en az 8 karakter olmalıdır';
    }
    
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      errors.confirmPassword = 'Şifreler eşleşmiyor';
    }
    
    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    if (validateProfileData()) {
      await onUpdateProfile(profileData);
    }
  };

  const handleUpdatePreferences = async (e: React.FormEvent) => {
    e.preventDefault();
    await onUpdatePreferences(preferencesData);
  };

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (validatePasswordData()) {
      await onChangePassword(passwordData.currentPassword, passwordData.newPassword);
      setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
    }
  };

  const sections = [
    { id: 'profile', label: 'Profil Bilgileri', icon: '👤' },
    { id: 'preferences', label: 'Tercihler', icon: '⚙️' },
    { id: 'security', label: 'Güvenlik', icon: '🔒' },
    { id: 'account', label: 'Hesap', icon: '🗑️' }
  ];

  return (
    <div className=\"min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 py-8 px-4\">
      <div className=\"max-w-4xl mx-auto\">
        {/* Header */}
        <div className=\"flex items-center mb-8\">
          <button
            onClick={onBack}
            className=\"mr-4 p-2 text-slate-600 hover:text-slate-800 transition-colors\"
          >
            <svg className=\"w-6 h-6\" fill=\"none\" stroke=\"currentColor\" viewBox=\"0 0 24 24\">
              <path strokeLinecap=\"round\" strokeLinejoin=\"round\" strokeWidth={2} d=\"M10 19l-7-7m0 0l7-7m-7 7h18\" />
            </svg>
          </button>
          <div>
            <h1 className=\"text-3xl font-bold text-slate-800\">Ayarlar</h1>
            <p className=\"text-slate-600\">Hesap bilgilerinizi ve tercihlerinizi yönetin</p>
          </div>
        </div>

        {/* Success/Error Messages */}
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

        {success && (
          <div className=\"mb-6 p-4 bg-green-50 border border-green-200 rounded-xl\">
            <div className=\"flex items-center\">
              <svg className=\"w-5 h-5 text-green-500 mr-2\" fill=\"none\" stroke=\"currentColor\" viewBox=\"0 0 24 24\">
                <path strokeLinecap=\"round\" strokeLinejoin=\"round\" strokeWidth={2} d=\"M5 13l4 4L19 7\" />
              </svg>
              <p className=\"text-green-700\">{success}</p>
            </div>
          </div>
        )}

        <div className=\"grid md:grid-cols-4 gap-6\">
          {/* Sidebar */}
          <div className=\"md:col-span-1\">
            <div className=\"bg-white rounded-2xl shadow-lg p-4\">
              <nav className=\"space-y-2\">
                {sections.map((section) => (
                  <button
                    key={section.id}
                    onClick={() => setActiveSection(section.id as any)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all text-left ${
                      activeSection === section.id
                        ? 'bg-emerald-500 text-white shadow-md'
                        : 'text-slate-600 hover:bg-slate-100'
                    }`}
                  >
                    <span>{section.icon}</span>
                    <span className=\"font-medium\">{section.label}</span>
                  </button>
                ))}
              </nav>
            </div>
          </div>

          {/* Content */}
          <div className=\"md:col-span-3\">
            <div className=\"bg-white rounded-2xl shadow-lg p-6\">
              {/* Profile Section */}
              {activeSection === 'profile' && (
                <div>
                  <h2 className=\"text-2xl font-bold text-slate-800 mb-6\">Profil Bilgileri</h2>
                  <form onSubmit={handleUpdateProfile} className=\"space-y-6\">
                    {/* Profile Image */}
                    <div className=\"flex items-center space-x-6\">
                      <div className=\"w-24 h-24 bg-emerald-100 rounded-full flex items-center justify-center\">
                        {user.profileImage ? (
                          <img src={user.profileImage} alt={user.fullName} className=\"w-24 h-24 rounded-full object-cover\" />
                        ) : (
                          <span className=\"text-3xl font-bold text-emerald-600\">
                            {user.fullName.split(' ').map(n => n[0]).join('').toUpperCase()}
                          </span>
                        )}
                      </div>
                      <div>
                        <button
                          type=\"button\"
                          className=\"bg-emerald-600 text-white px-4 py-2 rounded-xl hover:bg-emerald-700 transition-colors\"
                        >
                          Fotoğraf Değiştir
                        </button>
                        <p className=\"text-sm text-slate-600 mt-2\">JPG, PNG formatında, max 5MB</p>
                      </div>
                    </div>

                    {/* Form Fields */}
                    <div className=\"grid md:grid-cols-2 gap-6\">
                      <div>
                        <label className=\"block text-sm font-medium text-slate-700 mb-2\">Ad Soyad</label>
                        <input
                          type=\"text\"
                          value={profileData.fullName || ''}
                          onChange={(e) => setProfileData({ ...profileData, fullName: e.target.value })}
                          className={`w-full px-3 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 ${
                            validationErrors.fullName ? 'border-red-300' : 'border-slate-300'
                          }`}
                        />
                        {validationErrors.fullName && (
                          <p className=\"mt-1 text-sm text-red-600\">{validationErrors.fullName}</p>
                        )}
                      </div>

                      <div>
                        <label className=\"block text-sm font-medium text-slate-700 mb-2\">E-posta</label>
                        <input
                          type=\"email\"
                          value={profileData.email || ''}
                          onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                          className={`w-full px-3 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 ${
                            validationErrors.email ? 'border-red-300' : 'border-slate-300'
                          }`}
                        />
                        {validationErrors.email && (
                          <p className=\"mt-1 text-sm text-red-600\">{validationErrors.email}</p>
                        )}
                      </div>
                    </div>

                    <button
                      type=\"submit\"
                      disabled={loading}
                      className=\"bg-emerald-600 text-white px-6 py-2 rounded-xl hover:bg-emerald-700 transition-colors disabled:opacity-50\"
                    >
                      {loading ? 'Kaydediliyor...' : 'Değişiklikleri Kaydet'}
                    </button>
                  </form>
                </div>
              )}

              {/* Preferences Section */}
              {activeSection === 'preferences' && (
                <div>
                  <h2 className=\"text-2xl font-bold text-slate-800 mb-6\">Tercihler</h2>
                  <form onSubmit={handleUpdatePreferences} className=\"space-y-6\">
                    <div className=\"grid md:grid-cols-2 gap-6\">
                      <div>
                        <label className=\"block text-sm font-medium text-slate-700 mb-2\">Dil</label>
                        <select
                          value={preferencesData.language}
                          onChange={(e) => setPreferencesData({ ...preferencesData, language: e.target.value as 'tr' | 'en' })}
                          className=\"w-full px-3 py-2 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500\"
                        >
                          <option value=\"tr\">Türkçe</option>
                          <option value=\"en\">English</option>
                        </select>
                      </div>

                      <div>
                        <label className=\"block text-sm font-medium text-slate-700 mb-2\">Tema</label>
                        <select
                          value={preferencesData.theme}
                          onChange={(e) => setPreferencesData({ ...preferencesData, theme: e.target.value as 'light' | 'dark' })}
                          className=\"w-full px-3 py-2 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500\"
                        >
                          <option value=\"light\">Açık</option>
                          <option value=\"dark\">Koyu</option>
                        </select>
                      </div>
                    </div>

                    <div className=\"space-y-4\">
                      <div className=\"flex items-center justify-between\">
                        <div>
                          <h3 className=\"font-medium text-slate-800\">E-posta Bildirimleri</h3>
                          <p className=\"text-sm text-slate-600\">Yeni özellikler ve güncellemeler hakkında bilgi alın</p>
                        </div>
                        <label className=\"relative inline-flex items-center cursor-pointer\">
                          <input
                            type=\"checkbox\"
                            checked={preferencesData.emailNotifications}
                            onChange={(e) => setPreferencesData({ ...preferencesData, emailNotifications: e.target.checked })}
                            className=\"sr-only peer\"
                          />
                          <div className=\"w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-emerald-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-600\"></div>
                        </label>
                      </div>

                      <div className=\"flex items-center justify-between\">
                        <div>
                          <h3 className=\"font-medium text-slate-800\">Otomatik Geçmiş Kaydetme</h3>
                          <p className=\"text-sm text-slate-600\">Formül ve makro geçmişinizi otomatik olarak kaydedin</p>
                        </div>
                        <label className=\"relative inline-flex items-center cursor-pointer\">
                          <input
                            type=\"checkbox\"
                            checked={preferencesData.autoSaveHistory}
                            onChange={(e) => setPreferencesData({ ...preferencesData, autoSaveHistory: e.target.checked })}
                            className=\"sr-only peer\"
                          />
                          <div className=\"w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-emerald-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-600\"></div>
                        </label>
                      </div>
                    </div>

                    <button
                      type=\"submit\"
                      disabled={loading}
                      className=\"bg-emerald-600 text-white px-6 py-2 rounded-xl hover:bg-emerald-700 transition-colors disabled:opacity-50\"
                    >
                      {loading ? 'Kaydediliyor...' : 'Tercihleri Kaydet'}
                    </button>
                  </form>
                </div>
              )}

              {/* Security Section */}
              {activeSection === 'security' && (
                <div>
                  <h2 className=\"text-2xl font-bold text-slate-800 mb-6\">Güvenlik</h2>
                  <form onSubmit={handleChangePassword} className=\"space-y-6\">
                    <div className=\"space-y-4\">
                      <div>
                        <label className=\"block text-sm font-medium text-slate-700 mb-2\">Mevcut Şifre</label>
                        <div className=\"relative\">
                          <input
                            type={showPasswords.current ? 'text' : 'password'}
                            value={passwordData.currentPassword}
                            onChange={(e) => setPasswordData({ ...passwordData, currentPassword: e.target.value })}
                            className={`w-full px-3 py-2 pr-10 border rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 ${
                              validationErrors.currentPassword ? 'border-red-300' : 'border-slate-300'
                            }`}
                          />
                          <button
                            type=\"button\"
                            onClick={() => setShowPasswords({ ...showPasswords, current: !showPasswords.current })}
                            className=\"absolute inset-y-0 right-0 pr-3 flex items-center\"
                          >
                            {showPasswords.current ? '🙈' : '👁️'}
                          </button>
                        </div>
                        {validationErrors.currentPassword && (
                          <p className=\"mt-1 text-sm text-red-600\">{validationErrors.currentPassword}</p>
                        )}
                      </div>

                      <div>
                        <label className=\"block text-sm font-medium text-slate-700 mb-2\">Yeni Şifre</label>
                        <div className=\"relative\">
                          <input
                            type={showPasswords.new ? 'text' : 'password'}
                            value={passwordData.newPassword}
                            onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })}
                            className={`w-full px-3 py-2 pr-10 border rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 ${
                              validationErrors.newPassword ? 'border-red-300' : 'border-slate-300'
                            }`}
                          />
                          <button
                            type=\"button\"
                            onClick={() => setShowPasswords({ ...showPasswords, new: !showPasswords.new })}
                            className=\"absolute inset-y-0 right-0 pr-3 flex items-center\"
                          >
                            {showPasswords.new ? '🙈' : '👁️'}
                          </button>
                        </div>
                        {validationErrors.newPassword && (
                          <p className=\"mt-1 text-sm text-red-600\">{validationErrors.newPassword}</p>
                        )}
                      </div>

                      <div>
                        <label className=\"block text-sm font-medium text-slate-700 mb-2\">Yeni Şifre Tekrar</label>
                        <div className=\"relative\">
                          <input
                            type={showPasswords.confirm ? 'text' : 'password'}
                            value={passwordData.confirmPassword}
                            onChange={(e) => setPasswordData({ ...passwordData, confirmPassword: e.target.value })}
                            className={`w-full px-3 py-2 pr-10 border rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 ${
                              validationErrors.confirmPassword ? 'border-red-300' : 'border-slate-300'
                            }`}
                          />
                          <button
                            type=\"button\"
                            onClick={() => setShowPasswords({ ...showPasswords, confirm: !showPasswords.confirm })}
                            className=\"absolute inset-y-0 right-0 pr-3 flex items-center\"
                          >
                            {showPasswords.confirm ? '🙈' : '👁️'}
                          </button>
                        </div>
                        {validationErrors.confirmPassword && (
                          <p className=\"mt-1 text-sm text-red-600\">{validationErrors.confirmPassword}</p>
                        )}
                      </div>
                    </div>

                    <button
                      type=\"submit\"
                      disabled={loading}
                      className=\"bg-emerald-600 text-white px-6 py-2 rounded-xl hover:bg-emerald-700 transition-colors disabled:opacity-50\"
                    >
                      {loading ? 'Değiştiriliyor...' : 'Şifreyi Değiştir'}
                    </button>
                  </form>
                </div>
              )}

              {/* Account Section */}
              {activeSection === 'account' && (
                <div>
                  <h2 className=\"text-2xl font-bold text-slate-800 mb-6\">Hesap Yönetimi</h2>
                  <div className=\"space-y-6\">
                    <div className=\"bg-red-50 border border-red-200 rounded-xl p-6\">
                      <h3 className=\"text-lg font-semibold text-red-800 mb-2\">Hesabı Sil</h3>
                      <p className=\"text-red-700 mb-4\">
                        Hesabınızı sildiğinizde tüm verileriniz kalıcı olarak silinecektir. Bu işlem geri alınamaz.
                      </p>
                      <ul className=\"text-sm text-red-600 mb-4 space-y-1\">
                        <li>• Tüm kayıtlı formül ve makrolarınız silinecek</li>
                        <li>• Geçmiş verileriniz kalıcı olarak silinecek</li>
                        <li>• Üyelik bilgileriniz iptal edilecek</li>
                        <li>• Bu işlem geri alınamaz</li>
                      </ul>
                      <button
                        onClick={onDeleteAccount}
                        disabled={loading}
                        className=\"bg-red-600 text-white px-6 py-2 rounded-xl hover:bg-red-700 transition-colors disabled:opacity-50\"
                      >
                        {loading ? 'Siliniyor...' : 'Hesabımı Sil'}
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserSettingsPage;"