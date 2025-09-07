import React, { useState } from 'react';
import { User, SavedFormula, SavedMacro, UserHistory, AppResult } from '../types';

interface ProfilePageProps {
  user: User;
  savedFormulas: SavedFormula[];
  savedMacros: SavedMacro[];
  userHistory?: UserHistory[];
  onUpdateProfile: (data: any) => Promise<void>;
  onDeleteFormula: (id: string) => void;
  onDeleteMacro: (id: string) => void;
  onToggleFavoriteFormula: (id: string) => void;
  onToggleFavoriteMacro: (id: string) => void;
  onUseFormula: (formula: SavedFormula) => void;
  onUseMacro: (macro: SavedMacro) => void;
  onUpgradePlan: (planId: string) => void;
  onUseHistoryItem?: (result: AppResult) => void;
  onDeleteHistoryItem?: (historyId: string) => void;
  onClearHistory?: () => void;
}

const ProfilePage: React.FC<ProfilePageProps> = ({
  user,
  savedFormulas,
  savedMacros,
  userHistory = [],
  onUpdateProfile,
  onDeleteFormula,
  onDeleteMacro,
  onToggleFavoriteFormula,
  onToggleFavoriteMacro,
  onUseFormula,
  onUseMacro,
  onUpgradePlan,
  onUseHistoryItem,
  onDeleteHistoryItem,
  onClearHistory
}) => {
  const [activeTab, setActiveTab] = useState<'profile' | 'formulas' | 'macros' | 'history' | 'membership'>('profile');
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('tr-TR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }).format(new Date(date));
  };

  const getCreditUsagePercentage = () => {
    return Math.round((user.credits / user.maxCredits) * 100);
  };

  const getPlanColor = (planType: string) => {
    switch (planType) {
      case 'free': return 'bg-slate-100 text-slate-700';
      case 'premium': return 'bg-gradient-to-r from-purple-500 to-pink-500 text-white';
      case 'pro': return 'bg-gradient-to-r from-emerald-500 to-blue-500 text-white';
      default: return 'bg-slate-100 text-slate-700';
    }
  };

  const tabs = [
    { id: 'profile', label: 'Profil', icon: '👤' },
    { id: 'formulas', label: 'Formüllerim', icon: '📊' },
    { id: 'macros', label: 'Makrolarım', icon: '⚙️' },
    { id: 'history', label: 'Geçmiş', icon: '📅' },
    { id: 'membership', label: 'Üyelik', icon: '💎' }
  ];

  return (
    <div className=\"min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 py-8 px-4\">
      <div className=\"max-w-6xl mx-auto\">
        {/* Header */}
        <div className=\"text-center mb-8\">
          <h1 className=\"text-4xl font-bold text-slate-800 mb-2\">Profil</h1>
          <p className=\"text-slate-600\">Hesap bilgilerinizi ve kayıtlı verilerinizi yönetin</p>
        </div>

        {/* Tabs */}
        <div className=\"bg-white rounded-2xl shadow-lg p-2 mb-8\">
          <div className=\"flex flex-wrap gap-2\">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex-1 min-w-0 px-4 py-3 rounded-xl font-medium transition-all flex items-center justify-center gap-2 ${
                  activeTab === tab.id
                    ? 'bg-emerald-500 text-white shadow-md'
                    : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                <span>{tab.icon}</span>
                <span className=\"hidden sm:inline\">{tab.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        {activeTab === 'profile' && (
          <div className=\"space-y-6\">
            {/* User Info Card */}
            <div className=\"bg-white rounded-2xl shadow-lg p-6\">
              <div className=\"flex items-center justify-between mb-6\">
                <h2 className=\"text-2xl font-bold text-slate-800\">Kullanıcı Bilgileri</h2>
                <button
                  onClick={() => setIsEditingProfile(!isEditingProfile)}
                  className=\"bg-emerald-600 text-white px-4 py-2 rounded-xl hover:bg-emerald-700 transition-colors flex items-center gap-2\"
                >
                  <svg className=\"w-4 h-4\" fill=\"none\" stroke=\"currentColor\" viewBox=\"0 0 24 24\">
                    <path strokeLinecap=\"round\" strokeLinejoin=\"round\" strokeWidth={2} d=\"M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z\" />
                  </svg>
                  {isEditingProfile ? 'İptal' : 'Düzenle'}
                </button>
              </div>

              <div className=\"grid md:grid-cols-2 gap-6\">
                <div className=\"flex items-center space-x-4\">
                  <div className=\"w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center\">
                    {user.profileImage ? (
                      <img src={user.profileImage} alt={user.fullName} className=\"w-20 h-20 rounded-full object-cover\" />
                    ) : (
                      <span className=\"text-2xl font-bold text-emerald-600\">
                        {user.fullName.split(' ').map(n => n[0]).join('').toUpperCase()}
                      </span>
                    )}
                  </div>
                  <div>
                    <h3 className=\"text-xl font-semibold text-slate-800\">{user.fullName}</h3>
                    <p className=\"text-slate-600\">{user.email}</p>
                    <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${getPlanColor(user.membershipPlan.type)}`}>
                      {user.membershipPlan.name}
                    </span>
                  </div>
                </div>

                <div className=\"grid grid-cols-2 gap-4\">
                  <div className=\"bg-slate-50 rounded-xl p-4\">
                    <h4 className=\"text-sm font-medium text-slate-600 mb-1\">Kayıt Tarihi</h4>
                    <p className=\"text-lg font-semibold text-slate-800\">{formatDate(user.createdAt)}</p>
                  </div>
                  <div className=\"bg-slate-50 rounded-xl p-4\">
                    <h4 className=\"text-sm font-medium text-slate-600 mb-1\">Son Giriş</h4>
                    <p className=\"text-lg font-semibold text-slate-800\">
                      {user.lastLogin ? formatDate(user.lastLogin) : 'İlk giriş'}
                    </p>
                  </div>
                </div>
              </div>

              {isEditingProfile && (
                <div className=\"mt-6 pt-6 border-t border-slate-200\">
                  <form className=\"space-y-4\">
                    <div className=\"grid md:grid-cols-2 gap-4\">
                      <div>
                        <label className=\"block text-sm font-medium text-slate-700 mb-2\">Ad Soyad</label>
                        <input
                          type=\"text\"
                          defaultValue={user.fullName}
                          className=\"w-full px-3 py-2 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500\"
                        />
                      </div>
                      <div>
                        <label className=\"block text-sm font-medium text-slate-700 mb-2\">E-posta</label>
                        <input
                          type=\"email\"
                          defaultValue={user.email}
                          className=\"w-full px-3 py-2 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500\"
                        />
                      </div>
                    </div>
                    <div className=\"flex gap-3\">
                      <button
                        type=\"submit\"
                        className=\"bg-emerald-600 text-white px-6 py-2 rounded-xl hover:bg-emerald-700 transition-colors\"
                      >
                        Kaydet
                      </button>
                      <button
                        type=\"button\"
                        onClick={() => setIsEditingProfile(false)}
                        className=\"bg-slate-300 text-slate-700 px-6 py-2 rounded-xl hover:bg-slate-400 transition-colors\"
                      >
                        İptal
                      </button>
                    </div>
                  </form>
                </div>
              )}
            </div>

            {/* Stats Cards */}
            <div className=\"grid md:grid-cols-3 gap-6\">
              <div className=\"bg-white rounded-2xl shadow-lg p-6\">
                <div className=\"flex items-center justify-between mb-4\">
                  <h3 className=\"text-lg font-semibold text-slate-800\">Kayıtlı Formüller</h3>
                  <span className=\"text-2xl\">📊</span>
                </div>
                <p className=\"text-3xl font-bold text-slate-800\">{savedFormulas.length}</p>
                <p className=\"text-sm text-slate-600 mt-1\">
                  {savedFormulas.filter(f => f.isFavorite).length} favori
                </p>
              </div>

              <div className=\"bg-white rounded-2xl shadow-lg p-6\">
                <div className=\"flex items-center justify-between mb-4\">
                  <h3 className=\"text-lg font-semibold text-slate-800\">Kayıtlı Makrolar</h3>
                  <span className=\"text-2xl\">⚙️</span>
                </div>
                <p className=\"text-3xl font-bold text-slate-800\">{savedMacros.length}</p>
                <p className=\"text-sm text-slate-600 mt-1\">
                  {savedMacros.filter(m => m.isFavorite).length} favori
                </p>
              </div>

              <div className=\"bg-white rounded-2xl shadow-lg p-6\">
                <div className=\"flex items-center justify-between mb-4\">
                  <h3 className=\"text-lg font-semibold text-slate-800\">Kalan Kredi</h3>
                  <span className=\"text-2xl\">💎</span>
                </div>
                <p className=\"text-3xl font-bold text-slate-800\">{user.credits}</p>
                <div className=\"mt-2\">
                  <div className=\"flex justify-between text-sm text-slate-600 mb-1\">
                    <span>Kullanım: {getCreditUsagePercentage()}%</span>
                    <span>{user.maxCredits} maksimum</span>
                  </div>
                  <div className=\"w-full bg-slate-200 rounded-full h-2\">
                    <div 
                      className=\"bg-purple-600 h-2 rounded-full transition-all\"
                      style={{ width: `${getCreditUsagePercentage()}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'membership' && (
          <div className=\"space-y-6\">
            {/* Current Plan */}
            <div className=\"bg-white rounded-2xl shadow-lg p-6\">
              <h2 className=\"text-2xl font-bold text-slate-800 mb-6\">Mevcut Üyelik Planınız</h2>
              
              <div className={`rounded-2xl p-6 ${getPlanColor(user.membershipPlan.type)}`}>
                <div className=\"flex items-center justify-between mb-4\">
                  <h3 className=\"text-2xl font-bold\">{user.membershipPlan.name}</h3>
                  <span className=\"text-3xl font-bold\">
                    ₺{user.membershipPlan.price}/{user.membershipPlan.price === 0 ? 'ücretsiz' : 'ay'}
                  </span>
                </div>
                
                <div className=\"grid md:grid-cols-2 gap-6\">
                  <div>
                    <h4 className=\"font-semibold mb-3\">Plan Özellikleri:</h4>
                    <ul className=\"space-y-2\">
                      {user.membershipPlan.features.map((feature, index) => (
                        <li key={index} className=\"flex items-center gap-2\">
                          <span>✓</span>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className=\"font-semibold mb-3\">Kredi Durumu:</h4>
                    <div className=\"space-y-3\">
                      <div>
                        <div className=\"flex justify-between text-sm mb-1\">
                          <span>Kalan Kredi</span>
                          <span>{user.credits} / {user.maxCredits}</span>
                        </div>
                        <div className=\"w-full bg-white/30 rounded-full h-3\">
                          <div 
                            className=\"bg-white h-3 rounded-full transition-all\"
                            style={{ width: `${getCreditUsagePercentage()}%` }}
                          ></div>
                        </div>
                      </div>
                      <p className=\"text-sm opacity-90\">
                        Aylık {user.membershipPlan.monthlyCredits} kredi yenilenecek
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Plan Upgrade Options */}
            {user.membershipPlan.type !== 'pro' && (
              <div className=\"bg-white rounded-2xl shadow-lg p-6\">
                <h2 className=\"text-2xl font-bold text-slate-800 mb-6\">Yükseltme Seçenekleri</h2>
                
                <div className=\"grid md:grid-cols-2 gap-6\">
                  <div className=\"border-2 border-purple-300 rounded-2xl p-6\">
                    <h3 className=\"text-xl font-bold text-slate-800 mb-2\">Premium</h3>
                    <p className=\"text-3xl font-bold text-purple-600 mb-4\">₺29/ay</p>
                    <ul className=\"space-y-2 mb-6 text-sm\">
                      <li>✓ 500 aylık formül/makro</li>
                      <li>✓ Öncelikli destek</li>
                      <li>✓ Gelişmiş özellikler</li>
                      <li>✓ Reklamsız deneyim</li>
                    </ul>
                    <button
                      onClick={() => onUpgradePlan('premium')}
                      className=\"w-full bg-purple-600 text-white py-3 rounded-xl hover:bg-purple-700 transition-colors\"
                    >
                      Premium'a Yükselt
                    </button>
                  </div>

                  <div className=\"border-2 border-emerald-300 rounded-2xl p-6\">
                    <h3 className=\"text-xl font-bold text-slate-800 mb-2\">Pro</h3>
                    <p className=\"text-3xl font-bold text-emerald-600 mb-4\">₺49/ay</p>
                    <ul className=\"space-y-2 mb-6 text-sm\">
                      <li>✓ Sınırsız formül/makro</li>
                      <li>✓ 24/7 destek</li>
                      <li>✓ Özel özellikler</li>
                      <li>✓ API erişimi</li>
                    </ul>
                    <button
                      onClick={() => onUpgradePlan('pro')}
                      className=\"w-full bg-emerald-600 text-white py-3 rounded-xl hover:bg-emerald-700 transition-colors\"
                    >
                      Pro'ya Yükselt
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Simplified Formulas Tab */}
        {activeTab === 'formulas' && (
          <div className=\"space-y-6\">
            <div className=\"bg-white rounded-2xl shadow-lg p-6\">
              <h2 className=\"text-2xl font-bold text-slate-800 mb-4\">Kayıtlı Formüllerim</h2>
              <input
                type=\"text\"
                placeholder=\"Formüllerde ara...\"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className=\"w-full px-4 py-2 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 mb-4\"
              />
              
              {savedFormulas.length === 0 ? (
                <div className=\"text-center py-12\">
                  <span className=\"text-6xl mb-4 block\">📊</span>
                  <h3 className=\"text-xl font-semibold text-slate-800 mb-2\">Henüz kayıtlı formül yok</h3>
                  <p className=\"text-slate-600\">İlk formülünüzü oluşturmak için ana sayfaya gidin.</p>
                </div>
              ) : (
                <div className=\"grid md:grid-cols-2 gap-4\">
                  {savedFormulas.map((formula) => (
                    <div key={formula.id} className=\"border border-slate-200 rounded-xl p-4\">
                      <div className=\"flex items-start justify-between mb-2\">
                        <h3 className=\"font-semibold text-slate-800\">{formula.title}</h3>
                        <button
                          onClick={() => onToggleFavoriteFormula(formula.id)}
                          className={formula.isFavorite ? 'text-yellow-500' : 'text-slate-400'}
                        >
                          ⭐
                        </button>
                      </div>
                      <p className=\"text-sm text-slate-600 mb-2\">{formula.description}</p>
                      <div className=\"bg-slate-50 rounded p-2 mb-3\">
                        <code className=\"text-sm\">{formula.formula}</code>
                      </div>
                      <div className=\"flex gap-2\">
                        <button
                          onClick={() => onUseFormula(formula)}
                          className=\"flex-1 bg-emerald-600 text-white py-1 px-3 rounded text-sm hover:bg-emerald-700\"
                        >
                          Kullan
                        </button>
                        <button
                          onClick={() => onDeleteFormula(formula.id)}
                          className=\"bg-red-500 text-white py-1 px-3 rounded text-sm hover:bg-red-600\"
                        >
                          🗑️
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Simplified Macros Tab */}
        {activeTab === 'macros' && (
          <div className=\"space-y-6\">
            <div className=\"bg-white rounded-2xl shadow-lg p-6\">
              <h2 className=\"text-2xl font-bold text-slate-800 mb-4\">Kayıtlı Makrolarım</h2>
              <input
                type=\"text\"
                placeholder=\"Makrolarda ara...\"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className=\"w-full px-4 py-2 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4\"
              />
              
              {savedMacros.length === 0 ? (
                <div className=\"text-center py-12\">
                  <span className=\"text-6xl mb-4 block\">⚙️</span>
                  <h3 className=\"text-xl font-semibold text-slate-800 mb-2\">Henüz kayıtlı makro yok</h3>
                  <p className=\"text-slate-600\">İlk makronuzu oluşturmak için ana sayfaya gidin.</p>
                </div>
              ) : (
                <div className=\"space-y-4\">
                  {savedMacros.map((macro) => (
                    <div key={macro.id} className=\"border border-slate-200 rounded-xl p-4\">
                      <div className=\"flex items-start justify-between mb-2\">
                        <h3 className=\"font-semibold text-slate-800\">{macro.title}</h3>
                        <button
                          onClick={() => onToggleFavoriteMacro(macro.id)}
                          className={macro.isFavorite ? 'text-yellow-500' : 'text-slate-400'}
                        >
                          ⭐
                        </button>
                      </div>
                      <p className=\"text-sm text-slate-600 mb-2\">{macro.description}</p>
                      <div className=\"bg-slate-50 rounded p-3 mb-3 overflow-x-auto\">
                        <pre className=\"text-xs text-slate-800\">{macro.code.substring(0, 150)}...</pre>
                      </div>
                      <div className=\"flex gap-2\">
                        <button
                          onClick={() => onUseMacro(macro)}
                          className=\"flex-1 bg-blue-600 text-white py-1 px-3 rounded text-sm hover:bg-blue-700\"
                        >
                          Kullan
                        </button>
                        <button
                          onClick={() => onDeleteMacro(macro.id)}
                          className=\"bg-red-500 text-white py-1 px-3 rounded text-sm hover:bg-red-600\"
                        >
                          🗑️
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* History Tab */}
        {activeTab === 'history' && (
          <div className=\"space-y-6\">
            <div className=\"bg-white rounded-2xl shadow-lg p-6\">
              <div className=\"flex items-center justify-between mb-6\">
                <h2 className=\"text-2xl font-bold text-slate-800\">Formül ve Makro Geçmişiniz</h2>
                {onClearHistory && (
                  <button
                    onClick={onClearHistory}
                    className=\"bg-red-600 text-white px-4 py-2 rounded-xl hover:bg-red-700 transition-colors flex items-center gap-2\"
                  >
                    <svg className=\"w-4 h-4\" fill=\"none\" stroke=\"currentColor\" viewBox=\"0 0 24 24\">
                      <path strokeLinecap=\"round\" strokeLinejoin=\"round\" strokeWidth={2} d=\"M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16\" />
                    </svg>
                    Tüm Geçmişi Temizle
                  </button>
                )}
              </div>

              {userHistory.length === 0 ? (
                <div className=\"text-center py-12\">
                  <span className=\"text-6xl mb-4 block\">📅</span>
                  <h3 className=\"text-xl font-semibold text-slate-800 mb-2\">Henüz geçmiş yok</h3>
                  <p className=\"text-slate-600\">Formül veya makro oluşturmaya başladığınızda burada görüntülenecek.</p>
                </div>
              ) : (
                <div className=\"space-y-4\">
                  {userHistory.map((historyItem) => {
                    const getTypeIcon = (type: string) => {
                      switch (type) {
                        case 'formula': return '📊';
                        case 'macro': return '⚙️';
                        case 'web_search': return '🌐';
                        default: return '📄';
                      }
                    };

                    const getTypeLabel = (type: string) => {
                      switch (type) {
                        case 'formula': return 'Formül';
                        case 'macro': return 'Makro';
                        case 'web_search': return 'Web Arama';
                        default: return 'Bilinmiyor';
                      }
                    };

                    return (
                      <div key={historyItem.id} className=\"border border-slate-200 rounded-xl p-4 hover:bg-slate-50 transition-colors\">
                        <div className=\"flex items-start justify-between mb-3\">
                          <div className=\"flex items-start gap-3 flex-1\">
                            <div className=\"text-2xl\">{getTypeIcon(historyItem.resultType)}</div>
                            <div className=\"flex-1\">
                              <div className=\"flex items-center gap-2 mb-1\">
                                <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                                  historyItem.resultType === 'formula' 
                                    ? 'bg-emerald-100 text-emerald-800'
                                    : historyItem.resultType === 'macro'
                                    ? 'bg-blue-100 text-blue-800'
                                    : 'bg-purple-100 text-purple-800'
                                }`}>
                                  {getTypeLabel(historyItem.resultType)}
                                </span>
                                <span className=\"text-xs text-slate-500\">
                                  {new Date(historyItem.createdAt).toLocaleDateString('tr-TR', {
                                    day: 'numeric',
                                    month: 'long',
                                    year: 'numeric',
                                    hour: '2-digit',
                                    minute: '2-digit'
                                  })}
                                </span>
                              </div>
                              <p className=\"text-sm font-medium text-slate-800 mb-2\">{historyItem.prompt}</p>
                              {historyItem.resultType === 'formula' && (
                                <div className=\"bg-slate-100 rounded p-2\">
                                  <code className=\"text-sm text-slate-700\">
                                    {(historyItem.resultData.data as any).formula?.code || 'Formül bulunamadı'}
                                  </code>
                                </div>
                              )}
                              {historyItem.resultType === 'macro' && (
                                <div className=\"bg-slate-100 rounded p-2\">
                                  <p className=\"text-sm text-slate-700 font-medium\">
                                    {(historyItem.resultData.data as any).title || 'Makro başlığı'}
                                  </p>
                                  <p className=\"text-xs text-slate-500 mt-1\">
                                    {(historyItem.resultData.data as any).description || 'Açıklama yok'}
                                  </p>
                                </div>
                              )}
                            </div>
                          </div>
                          <div className=\"flex items-center gap-2 ml-4\">
                            {onUseHistoryItem && (
                              <button
                                onClick={() => onUseHistoryItem(historyItem.resultData)}
                                className=\"bg-emerald-600 text-white px-3 py-1 rounded-lg text-sm hover:bg-emerald-700 transition-colors\"
                                title=\"Tekrar kullan\"
                              >
                                Kullan
                              </button>
                            )}
                            {onDeleteHistoryItem && (
                              <button
                                onClick={() => onDeleteHistoryItem(historyItem.id)}
                                className=\"bg-red-500 text-white px-3 py-1 rounded-lg text-sm hover:bg-red-600 transition-colors\"
                                title=\"Sil\"
                              >
                                🗑️
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;
