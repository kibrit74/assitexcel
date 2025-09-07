import React from 'react';
import { ModernNavbar } from './ModernNavbar';
import ModernFooter from './ModernFooter';
import { KeyboardShortcutsModal } from './KeyboardShortcutsModal';
import { HelpCenterModal } from './HelpCenterModal';
import { PerformanceMonitorComponent } from './PerformanceMonitor';
import AccessibilityProvider, { LiveRegion } from './AccessibilityEnhancements';

interface ExcelOutputGuidePageProps {
  currentView: string;
  onViewChange: (view: 'landing' | 'app' | 'about' | 'faq' | 'login' | 'register' | 'profile' | 'settings' | 'excel-guide') => void;
  onOpenShortcuts: () => void;
  onOpenHelp: () => void;
  isAuthenticated?: boolean;
  user?: { fullName: string; profileImage?: string } | null;
  onLogout?: () => void;
}

const ExcelOutputGuidePage: React.FC<ExcelOutputGuidePageProps> = ({
  currentView,
  onViewChange,
  onOpenShortcuts,
  onOpenHelp,
  isAuthenticated = false,
  user = null,
  onLogout = () => {}
}) => {
  const [isShortcutsModalOpen, setIsShortcutsModalOpen] = React.useState(false);
  const [isHelpCenterModalOpen, setIsHelpCenterModalOpen] = React.useState(false);

  return (
    <AccessibilityProvider>
      <div className="min-h-screen flex flex-col bg-gradient-to-br from-emerald-50 to-white">
        {/* Live region for screen reader announcements */}
        <LiveRegion message="" priority="polite" />
        
        <ModernNavbar 
          currentView={currentView}
          onViewChange={onViewChange}
          onOpenShortcuts={() => setIsShortcutsModalOpen(true)}
          onOpenHelp={() => setIsHelpCenterModalOpen(true)}
          isAuthenticated={isAuthenticated}
          user={user}
          onLogout={onLogout}
        />
        
        <main className="flex-grow">
          {/* Hero Section - Updated with Landing Page Styles */}
          <section className="relative overflow-hidden bg-gradient-to-b from-white via-emerald-50/30 to-white py-20 sm:py-32">
            {/* Background decoration */}
            <div className="absolute inset-0 -z-10">
              <div className="absolute top-0 left-1/4 w-96 h-96 bg-emerald-100 rounded-full opacity-20 blur-3xl"></div>
              <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-emerald-100 rounded-full opacity-20 blur-3xl"></div>
            </div>
            
            <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center">
                {/* Updated Guide Icon */}
                <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-emerald-100 to-emerald-50 rounded-3xl shadow-xl mb-8 ring-4 ring-white ring-opacity-50">
                  <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none">
                    {/* Book/Guide icon with compass */}
                    <circle cx="12" cy="5" r="3" fill="#10b981" fillOpacity="0.15" stroke="#10b981" strokeWidth="1.5"/>
                    <path d="M12 2v6M10 5h4" stroke="#10b981" strokeWidth="1.5" strokeLinecap="round"/>
                    <path d="M4 9h16a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V10a1 1 0 0 1 1-1z" fill="#10b981" fillOpacity="0.1" stroke="#10b981" strokeWidth="1.8"/>
                    <path d="M12 9v12" stroke="#10b981" strokeWidth="1.5" strokeLinecap="round"/>
                    <path d="M7 13h3M14 13h3M7 17h2M15 17h2" stroke="#10b981" strokeWidth="1.2" strokeLinecap="round" opacity="0.7"/>
                    <circle cx="12" cy="5" r="1" fill="#10b981"/>
                  </svg>
                </div>
                
                <h1 className="text-4xl sm:text-7xl font-bold mb-6 font-['Poppins',_'Inter',_sans-serif]">
                  <span className="block text-slate-800 mb-2">Excel Çıktı Formatı</span>
                  <span className="relative inline-block">
                    <span className="relative z-10 bg-gradient-to-r from-emerald-600 via-emerald-500 to-emerald-600 bg-clip-text text-transparent animate-gradient-x">
                      Rehberi
                    </span>
                    <span className="absolute inset-0 bg-emerald-200 blur-2xl opacity-30"></span>
                  </span>
                </h1>
                
                <p className="text-xl lg:text-2xl text-slate-600 mb-12 max-w-3xl mx-auto leading-relaxed font-['Inter',_sans-serif]">
                  Excel dosyalarınızı doğru formatta hazırlayarak 
                  <span className="font-semibold text-emerald-600"> AI'dan en iyi sonuçları </span>
                  alın. Adım adım düzenleme rehberi.
                </p>
                
                {/* CTA Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <button
                    onClick={() => window.scrollTo({ top: document.getElementById('guidelines')?.offsetTop || 0, behavior: 'smooth' })}
                    className="px-8 py-4 bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 flex items-center justify-center gap-2"
                  >
                    <span>Rehberi İncele</span>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                    </svg>
                  </button>
                  <button
                    onClick={() => onViewChange('app')}
                    className="px-8 py-4 bg-white hover:bg-slate-50 text-emerald-700 font-semibold rounded-xl shadow-lg hover:shadow-xl border-2 border-emerald-200 transform hover:scale-105 transition-all duration-200"
                  >
                    Uygulamaya Dön
                  </button>
                </div>
              </div>
            </div>
          </section>

          {/* Content Section */}
          <section id="guidelines" className="py-20 bg-gradient-to-b from-white via-slate-50/50 to-white">
            <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="max-w-4xl mx-auto">
                <div className="prose prose-emerald lg:prose-lg max-w-none">
                {/* Ana Yönergeler Kartı - Updated with Landing Page Styles */}
                <div className="relative bg-gradient-to-br from-white to-emerald-50/30 p-10 rounded-3xl border border-emerald-100 shadow-2xl mb-12 overflow-hidden">
                  {/* Decorative background */}
                  <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-100 rounded-full opacity-20 blur-2xl"></div>
                  <div className="absolute bottom-0 left-0 w-32 h-32 bg-emerald-100 rounded-full opacity-20 blur-2xl"></div>
                  
                  <div className="relative z-10">
                    <div className="flex items-center gap-4 mb-8">
                      <div className="flex-shrink-0 w-16 h-16 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-2xl flex items-center justify-center shadow-lg">
                        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none">
                          <path d="M9 11l3 3L22 4" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                          <path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </div>
                      <h2 className="text-3xl font-bold text-slate-800 font-['Poppins',_'Inter',_sans-serif]">
                        Excel Dosya Hazırlama Yönergeleri
                      </h2>
                    </div>
                    
                    <p className="text-slate-600 mb-8 text-lg leading-relaxed font-['Inter',_sans-serif]">
                      Uygulamamada kullanılacak Excel dosyalarının aşağıdaki kriterlere uygun olması 
                      <span className="font-semibold text-emerald-600">en iyi sonuçları almanızı</span> sağlayacaktır:
                    </p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="group bg-white hover:bg-gradient-to-br hover:from-emerald-50 hover:to-white p-6 rounded-2xl border border-emerald-100 hover:border-emerald-300 shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                        <div className="flex items-start gap-3">
                          <div className="flex-shrink-0 w-10 h-10 bg-emerald-100 group-hover:bg-emerald-200 rounded-xl flex items-center justify-center transition-colors">
                            <svg className="w-6 h-6 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                          </div>
                          <div>
                            <h3 className="font-bold text-slate-800 mb-1">Sütun Görünürlüğü</h3>
                            <p className="text-sm text-slate-600">Tüm sütunlar tam olarak görünür olmalıdır</p>
                          </div>
                        </div>
                      </div>
                      
                      <div className="group bg-white hover:bg-gradient-to-br hover:from-emerald-50 hover:to-white p-6 rounded-2xl border border-emerald-100 hover:border-emerald-300 shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                        <div className="flex items-start gap-3">
                          <div className="flex-shrink-0 w-10 h-10 bg-emerald-100 group-hover:bg-emerald-200 rounded-xl flex items-center justify-center transition-colors">
                            <span className="text-2xl font-bold text-emerald-600">10</span>
                          </div>
                          <div>
                            <h3 className="font-bold text-slate-800 mb-1">Sayfa Limiti</h3>
                            <p className="text-sm text-slate-600">Her çalışma sayfası en fazla <span className="font-semibold text-emerald-600">10 satır</span> içermelidir</p>
                          </div>
                        </div>
                      </div>
                      
                      <div className="group bg-white hover:bg-gradient-to-br hover:from-emerald-50 hover:to-white p-6 rounded-2xl border border-emerald-100 hover:border-emerald-300 shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                        <div className="flex items-start gap-3">
                          <div className="flex-shrink-0 w-10 h-10 bg-emerald-100 group-hover:bg-emerald-200 rounded-xl flex items-center justify-center transition-colors">
                            <svg className="w-6 h-6 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                          </div>
                          <div>
                            <h3 className="font-bold text-slate-800 mb-1">Dosya Formatı</h3>
                            <p className="text-sm text-slate-600">XLSX veya XLS formatında olmalıdır</p>
                          </div>
                        </div>
                      </div>
                      
                      <div className="group bg-white hover:bg-gradient-to-br hover:from-emerald-50 hover:to-white p-6 rounded-2xl border border-emerald-100 hover:border-emerald-300 shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                        <div className="flex items-start gap-3">
                          <div className="flex-shrink-0 w-10 h-10 bg-emerald-100 group-hover:bg-emerald-200 rounded-xl flex items-center justify-center transition-colors">
                            <svg className="w-6 h-6 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
                            </svg>
                          </div>
                          <div>
                            <h3 className="font-bold text-slate-800 mb-1">Başlık Satırı</h3>
                            <p className="text-sm text-slate-600">Veri setinin başlık satırı açıkça belirtilmelidir</p>
                          </div>
                        </div>
                      </div>
                      
                      <div className="group bg-white hover:bg-gradient-to-br hover:from-emerald-50 hover:to-white p-6 rounded-2xl border border-emerald-100 hover:border-emerald-300 shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                        <div className="flex items-start gap-3">
                          <div className="flex-shrink-0 w-10 h-10 bg-emerald-100 group-hover:bg-emerald-200 rounded-xl flex items-center justify-center transition-colors">
                            <svg className="w-6 h-6 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21" />
                            </svg>
                          </div>
                          <div>
                            <h3 className="font-bold text-slate-800 mb-1">Gizli İçerik</h3>
                            <p className="text-sm text-slate-600">Gizli sütun veya satır bulunmamalıdır</p>
                          </div>
                        </div>
                      </div>
                      
                      <div className="group bg-white hover:bg-gradient-to-br hover:from-emerald-50 hover:to-white p-6 rounded-2xl border border-emerald-100 hover:border-emerald-300 shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                        <div className="flex items-start gap-3">
                          <div className="flex-shrink-0 w-10 h-10 bg-emerald-100 group-hover:bg-emerald-200 rounded-xl flex items-center justify-center transition-colors">
                            <svg className="w-6 h-6 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                            </svg>
                          </div>
                          <div>
                            <h3 className="font-bold text-slate-800 mb-1">Tam Kapsamlılık</h3>
                            <p className="text-sm text-slate-600">Tüm çalışma sayfalarını içermelidir</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* Sayfa Yapısı Bölümü */}
                <div className="bg-white p-8 rounded-2xl border border-slate-200/80 mb-12 shadow-lg">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="bg-emerald-100 text-emerald-600 w-12 h-12 rounded-xl flex items-center justify-center">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <rect x="3" y="4" width="18" height="16" rx="2" fill="#10b981" fillOpacity="0.1" stroke="#10b981" strokeWidth="1.5"/>
                        <path d="M8 9h8M8 13h5M8 17h6" stroke="#10b981" strokeWidth="1.5" strokeLinecap="round"/>
                        <circle cx="5" cy="9" r="1" fill="#10b981" fillOpacity="0.6"/>
                        <circle cx="5" cy="13" r="1" fill="#10b981" fillOpacity="0.6"/>
                        <circle cx="5" cy="17" r="1" fill="#10b981" fillOpacity="0.6"/>
                      </svg>
                    </div>
                    <h2 className="text-2xl font-bold text-slate-800">
                      Sayfa Yapısı ve Organizasyon
                    </h2>
                  </div>
                  
                  <p className="text-slate-700 mb-8 text-lg">
                    Excel dosyanızı hazırlarken, yapay zeka algoritmasının verilerinizi doğru bir şekilde işleyebilmesi için dosya yapısının doğru düzenlenmesi önemlidir. Her sayfadaki verilerin düzenli ve tutarlı olması, formül ve makro önerilerinin doğruluğunu artıracaktır.
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-6 rounded-xl border border-emerald-200/50">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center">
                          <span className="text-emerald-600 font-bold">✓</span>
                        </div>
                        <h3 className="text-lg font-semibold text-emerald-800">Önerilen Format</h3>
                      </div>
                      <ul className="space-y-3 text-slate-700">
                        <li className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></span>
                          <span className="text-sm">Temiz, açık başlıklar</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></span>
                          <span className="text-sm">Her sütunda tutarlı veri tipleri</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></span>
                          <span className="text-sm">Sayfa başına 10 veya daha az satır</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></span>
                          <span className="text-sm">Tam görünür sütunlar</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></span>
                          <span className="text-sm">Birleştirilmemiş hücreler</span>
                        </li>
                      </ul>
                    </div>
                    
                    <div className="bg-gradient-to-br from-red-50 to-rose-50 p-6 rounded-xl border border-red-200/50">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
                          <span className="text-red-600 font-bold">×</span>
                        </div>
                        <h3 className="text-lg font-semibold text-red-800">Kaçınılması Gerekenler</h3>
                      </div>
                      <ul className="space-y-3 text-slate-700">
                        <li className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 bg-red-500 rounded-full"></span>
                          <span className="text-sm">Karmaşık birleştirilmiş hücreler</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 bg-red-500 rounded-full"></span>
                          <span className="text-sm">Gizli satır ve sütunlar</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 bg-red-500 rounded-full"></span>
                          <span className="text-sm">Tek sayfada çok fazla veri</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 bg-red-500 rounded-full"></span>
                          <span className="text-sm">Tutarsız veri formatları</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 bg-red-500 rounded-full"></span>
                          <span className="text-sm">Eksik başlıklar</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                
                {/* Sayfa Optimizasyonu Bölümü */}
                <div className="bg-white p-8 rounded-2xl border border-slate-200/80 mb-12 shadow-lg">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="bg-emerald-100 text-emerald-600 w-12 h-12 rounded-xl flex items-center justify-center">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <path d="M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14H4Z" fill="#10b981" fillOpacity="0.15" stroke="#10b981" strokeWidth="1.8"/>
                        <path d="M8 4l4 6M16 20l-4-6" stroke="#10b981" strokeWidth="1.2" opacity="0.7"/>
                        <circle cx="13" cy="10" r="1" fill="#10b981"/>
                        <circle cx="11" cy="14" r="1" fill="#10b981"/>
                      </svg>
                    </div>
                    <h2 className="text-2xl font-bold text-slate-800">
                      Sayfa Optimizasyonu
                    </h2>
                  </div>
                  
                  <p className="text-slate-700 mb-8 text-lg">
                    Formül ve makro oluşturma sürecini optimize etmek için, çalışma sayfalarınızı daha küçük, işlenebilir parçalara bölmek faydalı olacaktır:
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <div className="bg-gradient-to-br from-indigo-50 to-emerald-50 p-6 rounded-xl border border-indigo-200/50">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center">
                          <span className="text-indigo-600 font-bold text-lg">1</span>
                        </div>
                        <h3 className="text-lg font-semibold text-indigo-800">Sayfa Limitleri</h3>
                      </div>
                      <p className="text-sm text-slate-700">
                        Her sayfa en fazla 10 satır içermelidir. Büyük veri setlerini birden fazla sayfaya bölebilirsiniz.
                      </p>
                    </div>
                    
                    <div className="bg-gradient-to-br from-teal-50 to-cyan-50 p-6 rounded-xl border border-teal-200/50">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-8 h-8 bg-teal-100 rounded-full flex items-center justify-center">
                          <span className="text-teal-600 font-bold text-lg">2</span>
                        </div>
                        <h3 className="text-lg font-semibold text-teal-800">Sayfa İsimlendirme</h3>
                      </div>
                      <p className="text-sm text-slate-700">
                        Sayfaları açıklayıcı isimlerle adlandırın ("Müşteri Verileri Sayfa 1", "Müşteri Verileri Sayfa 2").
                      </p>
                    </div>
                    
                    <div className="bg-gradient-to-br from-orange-50 to-amber-50 p-6 rounded-xl border border-orange-200/50">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center">
                          <span className="text-orange-600 font-bold text-lg">3</span>
                        </div>
                        <h3 className="text-lg font-semibold text-orange-800">Veri Tutarlılığı</h3>
                      </div>
                      <p className="text-sm text-slate-700">
                        Bölünmüş sayfalarda başlık satırlarını tekrarlayın ve veri yapısını koruyun.
                      </p>
                    </div>
                  </div>
                  
                  <div className="bg-gradient-to-br from-emerald-50 to-indigo-50 p-6 rounded-xl border border-emerald-200/50">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none">
                          <path d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 1 1 7.072 0l-.548.547A3.374 3.374 0 0 0 18 18.469V19a2 2 0 1 1-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" stroke="#10b981" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </div>
                      <h3 className="text-xl font-semibold text-emerald-800">
                        Büyük Veri Setleri İçin İpucu
                      </h3>
                    </div>
                    
                    <p className="text-slate-700 mb-4">
                      10.000 satırdan fazla veri içeren büyük Excel dosyaları için aşağıdaki stratejileri uygulayabilirsiniz:
                    </p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-3">
                        <div className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></span>
                          <span className="text-sm text-slate-700">Önce verileri filtreleyerek analize ihtiyaç duyduğunuz bölümleri belirleyin</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></span>
                          <span className="text-sm text-slate-700">Her çalışma sayfasını 10 satırlık kesitler halinde yeni sayfalara kopyalayın</span>
                        </div>
                      </div>
                      <div className="space-y-3">
                        <div className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></span>
                          <span className="text-sm text-slate-700">Veri setini mantıksal kategorilere bölün</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></span>
                          <span className="text-sm text-slate-700">Pivot tablolar kullanarak özet veri görünümleri oluşturun</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Örnek Dosya Düzeni Bölümü */}
                <div className="bg-white p-8 rounded-2xl border border-slate-200/80 mb-12 shadow-lg">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="bg-green-100 text-green-600 w-12 h-12 rounded-xl flex items-center justify-center">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" fill="#10b981" fillOpacity="0.1" stroke="#10b981" strokeWidth="1.8" strokeLinejoin="round"/>
                        <path d="M14 2v6h6" fill="none" stroke="#10b981" strokeWidth="1.6" strokeLinejoin="round"/>
                        <g stroke="#10b981" strokeWidth="1.2" opacity="0.8">
                          <path d="M16 13H8M16 17H8M10 9H8"/>
                        </g>
                        <g fill="#10b981" opacity="0.6">
                          <circle cx="9" cy="13" r="0.8"/>
                          <circle cx="9" cy="17" r="0.8"/>
                        </g>
                      </svg>
                    </div>
                    <h2 className="text-2xl font-bold text-slate-800">
                      Örnek Dosya Düzeni
                    </h2>
                  </div>
                  
                  <p className="text-slate-700 mb-8 text-lg">
                    Aşağıdaki gibi bir dosya yapısı, uygulamanın verileri analiz etmesi ve doğru formüller/makrolar önermesi için idealdir:
                  </p>
                  
                  <div className="bg-gradient-to-br from-slate-50 to-gray-50 p-8 rounded-xl border border-slate-200/80 overflow-x-auto mb-8 shadow-inner">
                    <div className="font-mono text-sm text-slate-700 leading-relaxed">
                      <div className="text-emerald-600 font-semibold mb-4">Örnek Excel Dosyası:</div>
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <span className="text-emerald-600">├──</span>
                          <span className="font-semibold text-slate-800">Sayfa1: Müşteri Verileri (1-10)</span>
                        </div>
                        <div className="ml-6 space-y-1 text-slate-600">
                          <div className="flex items-center gap-2"><span className="text-emerald-500">├──</span> A: Müşteri ID</div>
                          <div className="flex items-center gap-2"><span className="text-emerald-500">├──</span> B: Ad</div>
                          <div className="flex items-center gap-2"><span className="text-emerald-500">├──</span> C: Soyad</div>
                          <div className="flex items-center gap-2"><span className="text-emerald-500">├──</span> D: E-posta</div>
                          <div className="flex items-center gap-2"><span className="text-emerald-500">└──</span> E: Puan</div>
                        </div>
                        
                        <div className="flex items-center gap-2 mt-4">
                          <span className="text-emerald-600">├──</span>
                          <span className="font-semibold text-slate-800">Sayfa2: Müşteri Verileri (11-20)</span>
                        </div>
                        <div className="ml-6 space-y-1 text-slate-600">
                          <div className="flex items-center gap-2"><span className="text-emerald-500">├──</span> A: Müşteri ID</div>
                          <div className="flex items-center gap-2"><span className="text-emerald-500">├──</span> B: Ad</div>
                          <div className="flex items-center gap-2"><span className="text-emerald-500">...</span> (aynı yapı)</div>
                        </div>
                        
                        <div className="flex items-center gap-2 mt-4">
                          <span className="text-emerald-600">└──</span>
                          <span className="font-semibold text-slate-800">Sayfa3: Özet Veriler</span>
                        </div>
                        <div className="ml-6 space-y-1 text-slate-600">
                          <div className="flex items-center gap-2"><span className="text-emerald-500">├──</span> A: Kategori</div>
                          <div className="flex items-center gap-2"><span className="text-emerald-500">├──</span> B: Toplam</div>
                          <div className="flex items-center gap-2"><span className="text-emerald-500">└──</span> C: Ortalama</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Önemli Hatırlatma Kartı */}
                <div className="bg-gradient-to-br from-amber-50 to-yellow-50 p-8 rounded-2xl border border-amber-200/50 mb-8 shadow-lg">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="bg-amber-100 text-amber-600 w-12 h-12 rounded-xl flex items-center justify-center">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <path d="M12 9v4m0 4h.01M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0z" stroke="#d97706" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <circle cx="12" cy="9" r="1" fill="#d97706"/>
                        <circle cx="12" cy="16" r="1" fill="#d97706"/>
                      </svg>
                    </div>
                    <h3 className="text-2xl font-bold text-amber-800">
                      Önemli Hatırlatma
                    </h3>
                  </div>
                  
                  <div className="bg-white p-6 rounded-xl border border-amber-200/30 shadow-sm">
                    <p className="text-slate-700 text-lg leading-relaxed">
                      Excel dosyanızı hazırlarken <strong className="text-amber-700">tüm sütunların tam olarak görünür</strong> olduğundan ve <strong className="text-amber-700">her sayfanın 10 satırı geçmediğinden</strong> emin olun. Bu düzenleme, yapay zeka motorunun verinizi daha doğru analiz etmesini ve daha isabetli formüller üretmesini sağlayacaktır.
                    </p>
                  </div>
                </div>
                </div>
              </div>
            </div>
          </section>
          
          {/* Bottom CTA Section */}
          <section className="py-16 bg-gradient-to-br from-emerald-50 to-white">
            <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
              <div className="bg-white p-8 rounded-2xl shadow-lg border border-emerald-200/50">
                <h2 className="text-2xl font-bold text-slate-800 mb-4">
                  Hazır mısınız?
                </h2>
                <p className="text-slate-600 mb-6">
                  Excel dosyanızı bu rehbere uygun hazırladıktan sonra uygulamamızdan en iyi sonuçları alabilirsiniz.
                </p>
                <button
                  onClick={() => onViewChange('app')}
                  className="bg-emerald-600 text-white font-bold py-3 px-8 rounded-xl hover:bg-emerald-700 transition-colors shadow-lg hover:shadow-xl flex items-center gap-2 mx-auto"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none">
                    <path d="M5 12h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                    <path d="M12 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  Uygulamayı Kullanmaya Başla
                </button>
              </div>
            </div>
          </section>
        </main>
        
        <ModernFooter />
        
        {/* Global Modals */}
        {isShortcutsModalOpen && <KeyboardShortcutsModal isOpen={isShortcutsModalOpen} onClose={() => setIsShortcutsModalOpen(false)} />}
        {isHelpCenterModalOpen && <HelpCenterModal isOpen={isHelpCenterModalOpen} onClose={() => setIsHelpCenterModalOpen(false)} />}
        
        {/* Performance Monitor */}
        <PerformanceMonitorComponent />
      </div>
    </AccessibilityProvider>
  );
};

export default ExcelOutputGuidePage;
