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
}

const ExcelOutputGuidePage: React.FC<ExcelOutputGuidePageProps> = ({
  currentView,
  onViewChange,
  onOpenShortcuts,
  onOpenHelp
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
        />
        
        <main className="flex-grow">
          {/* Hero Section */}
          <section className="relative overflow-hidden bg-gradient-to-br from-emerald-50 to-white py-20 sm:py-32">
            <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center">
                <div className="mx-auto bg-emerald-100 text-emerald-600 w-20 h-20 rounded-full flex items-center justify-center mb-8">
                  <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none">
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
                
                <h1 className="text-4xl sm:text-6xl font-bold mb-6">
                  <span className="text-slate-800">Excel Çıktı Formatı</span>
                  <span className="block">
                    <span className="bg-gradient-to-r from-slate-800 via-emerald-600 to-slate-800 bg-clip-text text-transparent bg-[length:300%_300%] animate-[gradientShift_4s_ease-in-out_infinite]">
                      Rehberi
                    </span>
                  </span>
                </h1>
                
                <p className="text-xl text-slate-600 mb-8 max-w-3xl mx-auto">
                  Excel dosyalarınızı doğru formatta hazırlayarak AI'dan en iyi sonuçları alın. 
                  Tüm sütunların görüneceği ve her sayfanın 10 satırı geçmeyeceği şekilde düzenleme rehberi.
                </p>
              </div>
            </div>
          </section>

          {/* Content Section */}
          <section className="py-20 bg-white">
            <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="max-w-4xl mx-auto">
                <div className="prose prose-emerald lg:prose-lg max-w-none">
                {/* Ana Yönergeler Kartı */}
                <div className="bg-gradient-to-br from-emerald-50 to-emerald-100/50 p-8 rounded-2xl border border-emerald-200/80 mb-12 shadow-lg">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="bg-emerald-100 text-emerald-600 w-12 h-12 rounded-xl flex items-center justify-center">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <circle cx="12" cy="12" r="9" fill="#10b981" fillOpacity="0.15" stroke="#10b981" strokeWidth="1.5"/>
                        <path d="M8 12l3 3 5-6" stroke="#10b981" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
                        <circle cx="11" cy="15" r="0.8" fill="#10b981"/>
                      </svg>
                    </div>
                    <h2 className="text-2xl font-bold text-slate-800">
                      Excel Dosya Hazırlama Yönergeleri
                    </h2>
                  </div>
                  
                  <p className="text-slate-700 mb-6 text-lg">
                    Uygulamada kullanılacak Excel dosyalarının aşağıdaki kriterlere uygun olması en iyi sonuçları almanızı sağlayacaktır:
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-white p-4 rounded-lg border border-emerald-100 shadow-sm">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-emerald-600">✓</span>
                        <span className="font-semibold text-slate-800">Sütun Görünürlüğü</span>
                      </div>
                      <p className="text-sm text-slate-600">Tüm sütunlar tam olarak görünür olmalıdır</p>
                    </div>
                    
                    <div className="bg-white p-4 rounded-lg border border-emerald-100 shadow-sm">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-emerald-600">✓</span>
                        <span className="font-semibold text-slate-800">Sayfa Limiti</span>
                      </div>
                      <p className="text-sm text-slate-600">Her çalışma sayfası en fazla <strong>10 satır</strong> içermelidir</p>
                    </div>
                    
                    <div className="bg-white p-4 rounded-lg border border-emerald-100 shadow-sm">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-emerald-600">✓</span>
                        <span className="font-semibold text-slate-800">Dosya Formatı</span>
                      </div>
                      <p className="text-sm text-slate-600">XLSX veya XLS formatında olmalıdır</p>
                    </div>
                    
                    <div className="bg-white p-4 rounded-lg border border-emerald-100 shadow-sm">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-emerald-600">✓</span>
                        <span className="font-semibold text-slate-800">Başlık Satırı</span>
                      </div>
                      <p className="text-sm text-slate-600">Veri setinin başlık satırı açıkça belirtilmelidir</p>
                    </div>
                    
                    <div className="bg-white p-4 rounded-lg border border-emerald-100 shadow-sm">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-emerald-600">✓</span>
                        <span className="font-semibold text-slate-800">Gizli İçerik</span>
                      </div>
                      <p className="text-sm text-slate-600">Gizli sütun veya satır bulunmamalıdır</p>
                    </div>
                    
                    <div className="bg-white p-4 rounded-lg border border-emerald-100 shadow-sm">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-emerald-600">✓</span>
                        <span className="font-semibold text-slate-800">Tam Kapsamlılık</span>
                      </div>
                      <p className="text-sm text-slate-600">Tüm çalışma sayfalarını içermelidir</p>
                    </div>
                  </div>
                </div>
                {/* Sayfa Yapısı Bölümü */}
                <div className="bg-white p-8 rounded-2xl border border-slate-200/80 mb-12 shadow-lg">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="bg-blue-100 text-blue-600 w-12 h-12 rounded-xl flex items-center justify-center">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <rect x="3" y="4" width="18" height="16" rx="2" fill="#3b82f6" fillOpacity="0.1" stroke="#3b82f6" strokeWidth="1.5"/>
                        <path d="M8 9h8M8 13h5M8 17h6" stroke="#3b82f6" strokeWidth="1.5" strokeLinecap="round"/>
                        <circle cx="5" cy="9" r="1" fill="#3b82f6" fillOpacity="0.6"/>
                        <circle cx="5" cy="13" r="1" fill="#3b82f6" fillOpacity="0.6"/>
                        <circle cx="5" cy="17" r="1" fill="#3b82f6" fillOpacity="0.6"/>
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
                    <div className="bg-purple-100 text-purple-600 w-12 h-12 rounded-xl flex items-center justify-center">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <path d="M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14H4Z" fill="#8b5cf6" fillOpacity="0.15" stroke="#8b5cf6" strokeWidth="1.8"/>
                        <path d="M8 4l4 6M16 20l-4-6" stroke="#8b5cf6" strokeWidth="1.2" opacity="0.7"/>
                        <circle cx="13" cy="10" r="1" fill="#8b5cf6"/>
                        <circle cx="11" cy="14" r="1" fill="#8b5cf6"/>
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
                    <div className="bg-gradient-to-br from-indigo-50 to-blue-50 p-6 rounded-xl border border-indigo-200/50">
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
                  
                  <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-xl border border-blue-200/50">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none">
                          <path d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 1 1 7.072 0l-.548.547A3.374 3.374 0 0 0 18 18.469V19a2 2 0 1 1-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" stroke="#3b82f6" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </div>
                      <h3 className="text-xl font-semibold text-blue-800">
                        Büyük Veri Setleri İçin İpucu
                      </h3>
                    </div>
                    
                    <p className="text-slate-700 mb-4">
                      10.000 satırdan fazla veri içeren büyük Excel dosyaları için aşağıdaki stratejileri uygulayabilirsiniz:
                    </p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-3">
                        <div className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 bg-blue-500 rounded-full"></span>
                          <span className="text-sm text-slate-700">Önce verileri filtreleyerek analize ihtiyaç duyduğunuz bölümleri belirleyin</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 bg-blue-500 rounded-full"></span>
                          <span className="text-sm text-slate-700">Her çalışma sayfasını 10 satırlık kesitler halinde yeni sayfalara kopyalayın</span>
                        </div>
                      </div>
                      <div className="space-y-3">
                        <div className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 bg-blue-500 rounded-full"></span>
                          <span className="text-sm text-slate-700">Veri setini mantıksal kategorilere bölün</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 bg-blue-500 rounded-full"></span>
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
                          <span className="text-blue-600">├──</span>
                          <span className="font-semibold text-slate-800">Sayfa1: Müşteri Verileri (1-10)</span>
                        </div>
                        <div className="ml-6 space-y-1 text-slate-600">
                          <div className="flex items-center gap-2"><span className="text-blue-500">├──</span> A: Müşteri ID</div>
                          <div className="flex items-center gap-2"><span className="text-blue-500">├──</span> B: Ad</div>
                          <div className="flex items-center gap-2"><span className="text-blue-500">├──</span> C: Soyad</div>
                          <div className="flex items-center gap-2"><span className="text-blue-500">├──</span> D: E-posta</div>
                          <div className="flex items-center gap-2"><span className="text-blue-500">└──</span> E: Puan</div>
                        </div>
                        
                        <div className="flex items-center gap-2 mt-4">
                          <span className="text-blue-600">├──</span>
                          <span className="font-semibold text-slate-800">Sayfa2: Müşteri Verileri (11-20)</span>
                        </div>
                        <div className="ml-6 space-y-1 text-slate-600">
                          <div className="flex items-center gap-2"><span className="text-blue-500">├──</span> A: Müşteri ID</div>
                          <div className="flex items-center gap-2"><span className="text-blue-500">├──</span> B: Ad</div>
                          <div className="flex items-center gap-2"><span className="text-blue-500">...</span> (aynı yapı)</div>
                        </div>
                        
                        <div className="flex items-center gap-2 mt-4">
                          <span className="text-blue-600">└──</span>
                          <span className="font-semibold text-slate-800">Sayfa3: Özet Veriler</span>
                        </div>
                        <div className="ml-6 space-y-1 text-slate-600">
                          <div className="flex items-center gap-2"><span className="text-blue-500">├──</span> A: Kategori</div>
                          <div className="flex items-center gap-2"><span className="text-blue-500">├──</span> B: Toplam</div>
                          <div className="flex items-center gap-2"><span className="text-blue-500">└──</span> C: Ortalama</div>
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
