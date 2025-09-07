import React from 'react';

// Feature Icons
const FeatureIcon = ({ children, bgColor = "bg-emerald-100", textColor = "text-emerald-600" }: { children: React.ReactNode; bgColor?: string; textColor?: string }) => (
  <div className={`w-16 h-16 ${bgColor} rounded-2xl flex items-center justify-center ${textColor} shadow-lg`}>
    {children}
  </div>
);

const SmartMergeIcon = () => (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M12 2L2 7v10c0 5.55 3.84 10 9 10s9-4.45 9-10V7l-10-5z"/>
    <path d="M12 8v8"/>
    <path d="M8 12h8"/>
  </svg>
);

const CommissionIcon = () => (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/>
    <circle cx="9" cy="7" r="4"/>
    <path d="M22 21v-2a4 4 0 0 0-3-3.87"/>
    <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
  </svg>
);

const AutoFillIcon = () => (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="3" y="3" width="7" height="7"/>
    <rect x="14" y="3" width="7" height="7"/>
    <rect x="14" y="14" width="7" height="7"/>
    <rect x="3" y="14" width="7" height="7"/>
    <path d="M10 7h4"/>
    <path d="M7 10v4"/>
  </svg>
);

const CleanDataIcon = () => (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
    <polyline points="14,2 14,8 20,8"/>
    <line x1="16" y1="13" x2="8" y2="13"/>
    <line x1="16" y1="17" x2="8" y2="17"/>
    <path d="M10 9H8"/>
  </svg>
);

const DateFormatIcon = () => (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
    <line x1="16" y1="2" x2="16" y2="6"/>
    <line x1="8" y1="2" x2="8" y2="6"/>
    <line x1="3" y1="10" x2="21" y2="10"/>
    <path d="M8 14h.01"/>
    <path d="M12 14h.01"/>
    <path d="M16 14h.01"/>
    <path d="M8 18h.01"/>
    <path d="M12 18h.01"/>
  </svg>
);

const ConditionalColorIcon = () => (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
    <circle cx="12" cy="12" r="3"/>
  </svg>
);

const AboutPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-blue-50 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-3xl mb-6 shadow-lg">
            <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
              <polyline points="14 2 14 8 20 8" />
              <line x1="16" y1="13" x2="8" y2="13" />
              <line x1="16" y1="17" x2="8" y2="17" />
              <line x1="10" y1="9" x2="8" y2="9" />
            </svg>
          </div>
          <h1 className="text-5xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent mb-4 font-['Poppins',_sans-serif]">
            ExcelBot AI
          </h1>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto font-['Inter',_sans-serif] leading-relaxed">
            Yapay zeka ile Excel'de çalışmak çok kolay! Türkçe açıklamanızı yazın, size özel formüller ve makrolar oluşturalım.
          </p>
        </div>

        {/* Main Content */}
        <div className="space-y-12">
          {/* Nedir Section */}
          <section className="bg-white rounded-2xl shadow-lg p-8">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center mr-4">
                <svg className="w-6 h-6 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h2 className="text-3xl font-bold text-slate-800">Nedir?</h2>
            </div>
            
            <div className="space-y-6 text-slate-700">
              <p className="text-lg leading-relaxed">
                Excel Formül Yardımcısı, yapay zeka teknolojisi kullanarak Excel formülleri ve VBA makroları oluşturmanıza yardımcı olan gelişmiş bir web uygulamasıdır. Türkçe doğal dil işleme ile Excel'deki karmaşık işlemlerinizi kolaylaştırır.
              </p>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-slate-50 rounded-xl p-6">
                  <h3 className="text-xl font-semibold text-slate-800 mb-3 flex items-center">
                    <span className="w-2 h-2 bg-emerald-500 rounded-full mr-3"></span>
                    Formül Üretimi
                  </h3>
                  <p className="text-slate-600">
                    Türkçe açıklamanızı yazın, size uygun Excel formülünü otomatik olarak oluştursun. VLOOKUP, INDEX/MATCH, IF gibi karmaşık formülleri kolayca üretin.
                  </p>
                </div>
                
                <div className="bg-slate-50 rounded-xl p-6">
                  <h3 className="text-xl font-semibold text-slate-800 mb-3 flex items-center">
                    <span className="w-2 h-2 bg-emerald-500 rounded-full mr-3"></span>
                    VBA Makroları
                  </h3>
                  <p className="text-slate-600">
                    Excel'de otomasyona ihtiyacınız olduğunda, istediğiniz işlemi açıklayın ve size özel VBA makrosu oluşturalım.
                  </p>
                </div>
                
                <div className="bg-slate-50 rounded-xl p-6">
                  <h3 className="text-xl font-semibold text-slate-800 mb-3 flex items-center">
                    <span className="w-2 h-2 bg-emerald-500 rounded-full mr-3"></span>
                    Akıllı Analiz
                  </h3>
                  <p className="text-slate-600">
                    Excel dosyanızı yükleyin, verilerinizi analiz edelim ve size en uygun çözümleri önerelim.
                  </p>
                </div>
                
                <div className="bg-slate-50 rounded-xl p-6">
                  <h3 className="text-xl font-semibold text-slate-800 mb-3 flex items-center">
                    <span className="w-2 h-2 bg-emerald-500 rounded-full mr-3"></span>
                    Türkçe Destek
                  </h3>
                  <p className="text-slate-600">
                    Tamamen Türkçe arayüz ve doğal dil işleme ile ana dilinizde Excel uzmanı desteği alın.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Nasıl Kullanır Section */}
          <section className="bg-white rounded-2xl shadow-lg p-8">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mr-4">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
              <h2 className="text-3xl font-bold text-slate-800">Nasıl Kullanır?</h2>
            </div>
            
            <div className="space-y-8">
              <p className="text-lg text-slate-700 leading-relaxed">
                Excel Formül Yardımcısı'nı kullanmak çok kolay! Sadece birkaç adımda istediğiniz sonuçlara ulaşabilirsiniz:
              </p>
              
              <div className="space-y-6">
                {/* Step 1 */}
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-10 h-10 bg-emerald-500 text-white rounded-full flex items-center justify-center font-bold text-lg">
                    1
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-slate-800 mb-2">Excel Dosyanızı Yükleyin</h3>
                    <p className="text-slate-600 mb-3">
                      Çalışmak istediğiniz Excel dosyasını sürükleyip bırakın veya "Dosya Seç" butonuna tıklayarak yükleyin. Sistem dosyanızı analiz edecek ve sayfa verilerini gösterecektir.
                    </p>
                    <div className="bg-slate-50 rounded-lg p-4">
                      <p className="text-sm text-slate-600">
                        <strong>Desteklenen Formatlar:</strong> .xlsx, .xls, .csv, .tsv (Maksimum 10MB, 100,000 satır)
                      </p>
                    </div>
                  </div>
                </div>

                {/* Step 2 */}
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-10 h-10 bg-blue-500 text-white rounded-full flex items-center justify-center font-bold text-lg">
                    2
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-slate-800 mb-2">İstediğinizi Türkçe Açıklayın</h3>
                    <p className="text-slate-600 mb-3">
                      Yapmak istediğiniz işlemi sade Türkçe ile anlatın. Örneğin: "A sütunundaki değerleri B sütunundaki değerlerle çarp", "Toplam satış miktarını hesapla" gibi.
                    </p>
                    <div className="bg-slate-50 rounded-lg p-4">
                      <p className="text-sm text-slate-600">
                        <strong>Etkili Açıklama İpuçları:</strong> Sütun adlarını belirtin, örneklerle açıklayın. <br/>
                        Örnek: "Maaşı 5000'den fazla olan çalışanların sayısını bul"
                      </p>
                    </div>
                  </div>
                </div>

                {/* Step 3 */}
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-10 h-10 bg-purple-500 text-white rounded-full flex items-center justify-center font-bold text-lg">
                    3
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-slate-800 mb-2">Formül veya Makro Seçin</h3>
                    <p className="text-slate-600 mb-3">
                      "Formül" modunda Excel formülleri, "Makro" modunda VBA kodları üretilir. İhtiyacınıza göre uygun modu seçin.
                    </p>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-3">
                        <p className="text-sm font-medium text-emerald-800">Formül Modu</p>
                        <p className="text-xs text-emerald-600">Hızlı hesaplamalar için</p>
                      </div>
                      <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                        <p className="text-sm font-medium text-blue-800">Makro Modu</p>
                        <p className="text-xs text-blue-600">Otomasyon için</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Step 4 */}
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-10 h-10 bg-orange-500 text-white rounded-full flex items-center justify-center font-bold text-lg">
                    4
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-slate-800 mb-2">Sonucu Alın ve Uygulayın</h3>
                    <p className="text-slate-600 mb-3">
                      Sistem size özel formül veya makro oluşturacak. Detaylı açıklamalar, kullanım örnekleri ve uyarılar ile birlikte sonuçları görüntüleyebilirsiniz.
                    </p>
                    <div className="bg-slate-50 rounded-lg p-4">
                      <p className="text-sm text-slate-600">
                        <strong>Sonuç Özellikleri:</strong> Detaylı açıklamalar, kullanım örnekleri, uyarılar ve canlı önizleme ile kapsamlı çözümler.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Quick Tips */}
              <div className="bg-gradient-to-r from-emerald-50 to-blue-50 rounded-xl p-6 mt-8">
                <h3 className="text-xl font-semibold text-slate-800 mb-4 flex items-center">
                  <svg className="w-5 h-5 text-emerald-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                  Hızlı İpuçları
                </h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="flex items-start space-x-3">
                    <span className="text-emerald-600">•</span>
                    <p className="text-slate-700">Verilerinizi belirtirken sütun adlarını kullanın</p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <span className="text-emerald-600">•</span>
                    <p className="text-slate-700">Örneklerle açıklama yapın</p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <span className="text-emerald-600">•</span>
                    <p className="text-slate-700">Karmaşık işlemleri adım adım bölün</p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <span className="text-emerald-600">•</span>
                    <p className="text-slate-700">Geçmişinizi kullanarak zaman kazanın</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Smart Features Section */}
          <section className="bg-white rounded-2xl shadow-lg p-8">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-slate-800 mb-4 font-['Poppins',_sans-serif]">Akıllı Excel Özellikleri</h2>
              <p className="text-lg text-slate-600 max-w-3xl mx-auto font-['Inter',_sans-serif]">
                AI destekli sistemimiz, Excel'de karşılaştığınız en yaygın problemleri anında çözüyor
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Sütunları Birleştir */}
              <div className="text-center group">
                <FeatureIcon bgColor="bg-emerald-100" textColor="text-emerald-600">
                  <SmartMergeIcon />
                </FeatureIcon>
                <h3 className="text-lg font-semibold text-slate-800 mt-4 mb-2 font-['Inter',_sans-serif]">Ad ve soyadı sütunlarını birleştir</h3>
                <p className="text-slate-600 text-sm leading-relaxed">
                  "A sütunundaki ad ile B sütunundaki soyadı birleştir" demeniz yeterli
                </p>
                <div className="mt-3 bg-slate-50 rounded-lg px-3 py-2">
                  <code className="text-xs text-slate-700 font-['JetBrains_Mono',_monospace]">= A2 & " " & B2</code>
                </div>
              </div>
              
              {/* Komisyon Hesaplama */}
              <div className="text-center group">
                <FeatureIcon bgColor="bg-blue-100" textColor="text-blue-600">
                  <CommissionIcon />
                </FeatureIcon>
                <h3 className="text-lg font-semibold text-slate-800 mt-4 mb-2 font-['Inter',_sans-serif]">Satış verilerine göre komisyon hesapla</h3>
                <p className="text-slate-600 text-sm leading-relaxed">
                  Karmaşık komisyon kurallarını basit Türkçe ile açıklayın
                </p>
                <div className="mt-3 bg-slate-50 rounded-lg px-3 py-2">
                  <code className="text-xs text-slate-700 font-['JetBrains_Mono',_monospace]">= EĞER(C2>10000; C2*0.05; C2*0.03)</code>
                </div>
              </div>
              
              {/* Otomatik Doldur */}
              <div className="text-center group">
                <FeatureIcon bgColor="bg-purple-100" textColor="text-purple-600">
                  <AutoFillIcon />
                </FeatureIcon>
                <h3 className="text-lg font-semibold text-slate-800 mt-4 mb-2 font-['Inter',_sans-serif]">Boş hücreleri otomatik doldur</h3>
                <p className="text-slate-600 text-sm leading-relaxed">
                  Eksik veri alanlarını akıllı kurallara göre otomatik tamamlayın
                </p>
                <div className="mt-3 bg-slate-50 rounded-lg px-3 py-2">
                  <code className="text-xs text-slate-700 font-['JetBrains_Mono',_monospace]">= EĞER(EBOŞSA(A2); "Veri Yok"; A2)</code>
                </div>
              </div>
              
              {/* Temizlik */}
              <div className="text-center group">
                <FeatureIcon bgColor="bg-orange-100" textColor="text-orange-600">
                  <CleanDataIcon />
                </FeatureIcon>
                <h3 className="text-lg font-semibold text-slate-800 mt-4 mb-2 font-['Inter',_sans-serif]">Yinelenen kayıtları temizle</h3>
                <p className="text-slate-600 text-sm leading-relaxed">
                  Veri setinizdeki duplike kayıtları bulup temizleyen makrolar
                </p>
                <div className="mt-3 bg-slate-50 rounded-lg px-3 py-2">
                  <code className="text-xs text-slate-700 font-['JetBrains_Mono',_monospace]">VBA Makro Kodu</code>
                </div>
              </div>
              
              {/* Tarih Formatı */}
              <div className="text-center group">
                <FeatureIcon bgColor="bg-teal-100" textColor="text-teal-600">
                  <DateFormatIcon />
                </FeatureIcon>
                <h3 className="text-lg font-semibold text-slate-800 mt-4 mb-2 font-['Inter',_sans-serif]">Tarih formatlarını düzenle</h3>
                <p className="text-slate-600 text-sm leading-relaxed">
                  Farklı tarih formatlarını standart hale getirin
                </p>
                <div className="mt-3 bg-slate-50 rounded-lg px-3 py-2">
                  <code className="text-xs text-slate-700 font-['JetBrains_Mono',_monospace]">= METNİ(A2; "gg.aa.yyyy")</code>
                </div>
              </div>
              
              {/* Koşullu Renklendirme */}
              <div className="text-center group">
                <FeatureIcon bgColor="bg-pink-100" textColor="text-pink-600">
                  <ConditionalColorIcon />
                </FeatureIcon>
                <h3 className="text-lg font-semibold text-slate-800 mt-4 mb-2 font-['Inter',_sans-serif]">Koşullu renklendirme uygula</h3>
                <p className="text-slate-600 text-sm leading-relaxed">
                  Değerlere göre hücreleri otomatik renklendir
                </p>
                <div className="mt-3 bg-slate-50 rounded-lg px-3 py-2">
                  <code className="text-xs text-slate-700 font-['JetBrains_Mono',_monospace]">Koşullu Biçimlendirme</code>
                </div>
              </div>
            </div>
            
            {/* CTA Section */}
            <div className="text-center mt-12 bg-gradient-to-r from-emerald-500 to-blue-500 rounded-2xl p-8 text-white">
              <h3 className="text-2xl font-bold mb-4 font-['Poppins',_sans-serif]">Hemen Deneyin!</h3>
              <p className="text-lg mb-6 opacity-90 font-['Inter',_sans-serif]">
                Excel dosyanızı yükleyin ve hangi işlemi yapmak istediğinizi Türkçe anlatın
              </p>
              <button className="bg-white text-emerald-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors shadow-lg font-['Inter',_sans-serif]">
                Hemen Başlayın
              </button>
            </div>
          </section>
          
          {/* Core Benefits */}
          <section className="bg-gradient-to-r from-slate-800 to-slate-900 rounded-2xl shadow-lg p-8 text-white">
            <h2 className="text-3xl font-bold mb-8 text-center font-['Poppins',_sans-serif]">Neden ExcelBot AI?</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-3 font-['Inter',_sans-serif]">⚡ Hızlı ve Güvenilir</h3>
                <p className="text-slate-300 leading-relaxed font-['Inter',_sans-serif]">
                  Saniyeler içinde doğru formüller ve makrolar üretin. Manuel araştırma yapmaya son!
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-3 font-['Inter',_sans-serif]">📚 Öğrenirken Kullanın</h3>
                <p className="text-slate-300 leading-relaxed font-['Inter',_sans-serif]">
                  Her formül detaylı açıklamasıyla gelir. Excel bilginizi geliştirirken iş yapın.
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-3 font-['Inter',_sans-serif]">🇹🇷 Türkçe Odaklı</h3>
                <p className="text-slate-300 leading-relaxed font-['Inter',_sans-serif]">
                  Ana dilinizde Excel uzmanı desteği. İngilizce formül isimleri ezberlemek yok!
                </p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;