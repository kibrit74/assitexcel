import React from 'react';

const AboutPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-slate-800 mb-4">
            Excel Formül Yardımcısı Hakkında
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Yapay zeka destekli Excel formül ve makro asistanınız
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

          {/* Features Overview */}
          <section className="bg-gradient-to-r from-slate-800 to-slate-900 rounded-2xl shadow-lg p-8 text-white">
            <h2 className="text-3xl font-bold mb-6 text-center">Öne Çıkan Özellikler</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-16 h-16 bg-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">Hızlı ve Güvenilir</h3>
                <p className="text-slate-300">Saniyeler içinde doğru formüller ve makrolar üretin</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">Öğrenirken Kullan</h3>
                <p className="text-slate-300">Detaylı açıklamalar ile Excel bilginizi geliştirin</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">Türkçe Odaklı</h3>
                <p className="text-slate-300">Ana dilinizde sorunsuz Excel deneyimi</p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;