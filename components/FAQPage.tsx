import React, { useState } from 'react';
import { FAQItem } from '../types';

const FAQPage: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [expandedItems, setExpandedItems] = useState<string[]>([]);

  const faqData: FAQItem[] = [
    // General Questions
    {
      id: '1',
      question: 'Excel Formül Yardımcısı nedir ve nasıl çalışır?',
      answer: 'Excel Formül Yardımcısı, yapay zeka teknolojisi kullanarak Excel formülleri ve VBA makroları oluşturan web tabanlı bir uygulamadır. Türkçe doğal dil işleme ile isteklerinizi anlayıp size uygun çözümler üretir.',
      category: 'general'
    },
    {
      id: '2',
      question: 'Hangi Excel sürümleri destekleniyor?',
      answer: 'Tüm modern Excel sürümleri desteklenmektedir: Excel 2016, 2019, 2021, Excel 365 ve Excel Online. Ayrıca Google Sheets ile de uyumludur.',
      category: 'general'
    },
    {
      id: '3',
      question: 'Verilerim güvenli mi?',
      answer: 'Evet, verileriniz tamamen güvenlidir. Yüklediğiniz Excel dosyaları sadece formül üretimi için geçici olarak işlenir ve sunucularımızda saklanmaz. Tüm verileriniz şifrelenir.',
      category: 'general'
    },
    {
      id: '4',
      question: 'Mobil cihazlarda kullanabilir miyim?',
      answer: 'Evet, uygulamamız responsive tasarıma sahiptir ve mobil cihazlarda sorunsuz çalışır. Ancak en iyi deneyim için masaüstü veya tablet kullanmanızı öneririz.',
      category: 'general'
    },

    // Formula Questions
    {
      id: '5',
      question: 'Hangi tür formüller oluşturulabilir?',
      answer: 'VLOOKUP, INDEX/MATCH, IF, SUMIF, COUNTIF, CONCATENATE, DATE, FINANCIAL fonksiyonları ve daha birçok karmaşık formül türü oluşturulabilir. Matematiksel hesaplamalardan metinsel işlemlere kadar geniş bir yelpaze desteklenir.',
      category: 'formulas'
    },
    {
      id: '6',
      question: 'Formül çalışmıyorsa ne yapmalıyım?',
      answer: 'Önce Excel sürümünüzün ve dil ayarlarınızın doğru olduğundan emin olun. Formülde Türkçe fonksiyon adları kullanıyorsanız, Excel ayarlarınızı kontrol edin. Sorun devam ederse \"Hata Bildir\" butonunu kullanabilirsiniz.',
      category: 'formulas'
    },
    {
      id: '7',
      question: 'Array formülleri destekleniyor mu?',
      answer: 'Evet, Excel 365 ve 2021 sürümlerindeki yeni array formülleri (XLOOKUP, FILTER, UNIQUE, SORT vb.) desteklenmektedir. Sistem otomatik olarak Excel sürümünüze uygun formül üretir.',
      category: 'formulas'
    },
    {
      id: '8',
      question: 'Formülleri nasıl daha iyi açıklayabilirim?',
      answer: 'Mümkün olduğunca spesifik olun. Sütun adlarını belirtin, istediğiniz sonucu örneklerle açıklayın ve hangi verileri kullanmak istediğinizi net şekilde ifade edin. Örnek: \"A sütunundaki satış miktarları ile B sütunundaki fiyatları çarparak toplam geliri hesapla\"',
      category: 'formulas'
    },

    // Macro Questions
    {
      id: '9',
      question: 'VBA makroları nasıl çalışır?',
      answer: 'VBA makroları Excel içinde tekrarlayan işlemleri otomatikleştiren kod parçacıklarıdır. Oluşturulan makroları Excel\\'de Geliştirici sekmesi > Makrolar bölümünden çalıştırabilirsiniz.',
      category: 'macros'
    },
    {
      id: '10',
      question: 'Makroları güvenli mi?',
      answer: 'Oluşturduğumuz tüm makrolar güvenli ve zararsızdır. Sadece belirttiğiniz işlemleri yapar, sistem dosyalarına veya diğer uygulamalara müdahale etmez. Yine de makroları çalıştırmadan önce kodu incelemenizi öneririz.',
      category: 'macros'
    },
    {
      id: '11',
      question: 'Makro çalışmıyor, ne yapmalıyım?',
      answer: 'Excel\\'de makroların etkin olduğundan emin olun (Dosya > Seçenekler > Güven Merkezi > Makro Ayarları). Ayrıca makroyu doğru çalışma sayfasına yerleştirdiğinizden emin olun.',
      category: 'macros'
    },

    // Membership Questions
    {
      id: '12',
      question: 'Ücretsiz sürümde ne kadar kullanım hakkım var?',
      answer: 'Ücretsiz sürümde ayda 50 formül/makro üretimi hakkınız bulunmaktadır. Bu limit her ay başında sıfırlanır.',
      category: 'membership'
    },
    {
      id: '13',
      question: 'Premium üyeliğin avantajları nelerdir?',
      answer: 'Premium üyelikle ayda 500 formül/makro üretimi, öncelikli destek, gelişmiş özellikler ve reklamsız deneyim elde edersiniz. Ayrıca formül geçmişinizi kaydedebilir ve favorilerinizi oluşturabilirsiniz.',
      category: 'membership'
    },
    {
      id: '14',
      question: 'Üyeliğimi nasıl iptal edebilirim?',
      answer: 'Profil sayfanızdan \"Üyelik Ayarları\" bölümüne giderek üyeliğinizi istediğiniz zaman iptal edebilirsiniz. İptal işlemi mevcut dönem sonunda geçerli olur.',
      category: 'membership'
    },
    {
      id: '15',
      question: 'Kredilerim ne zaman yenilenir?',
      answer: 'Kredileriniz her ay belirlenen tarihte otomatik olarak yenilenir. Kullanılmayan krediler bir sonraki aya aktarılmaz.',
      category: 'membership'
    },

    // Technical Questions
    {
      id: '16',
      question: 'Büyük Excel dosyaları yükleyebilir miyim?',
      answer: 'Maksimum 10MB boyutunda ve 100,000 satıra kadar dosya yükleyebilirsiniz. Daha büyük dosyalar için önce verileri filtreleyerek küçültmenizi öneririz.',
      category: 'technical'
    },
    {
      id: '17',
      question: 'Hangi dosya formatları destekleniyor?',
      answer: 'Excel (.xlsx, .xls), CSV (.csv) ve TSV (.tsv) formatları desteklenmektedir. Metin dosyaları için UTF-8 kodlaması önerilir.',
      category: 'technical'
    },
    {
      id: '18',
      question: 'İnternet bağlantısı olmadan kullanabilir miyim?',
      answer: 'Hayır, uygulama yapay zeka servisleri kullandığı için internet bağlantısı gereklidir. Ancak formüller oluşturulduktan sonra Excel\\'de çevrimdışı kullanabilirsiniz.',
      category: 'technical'
    },
    {
      id: '19',
      question: 'Tarayıcı uyumluluğu nasıl?',
      answer: 'Chrome, Firefox, Safari ve Edge tarayıcılarının güncel sürümleri desteklenmektedir. En iyi performans için Chrome kullanmanızı öneririz.',
      category: 'technical'
    },
    {
      id: '20',
      question: 'Verilerimi dışa aktarabilir miyim?',
      answer: 'Evet, Premium üyelikle formül geçmişinizi ve favori formüllerinizi Excel formatında dışa aktarabilirsiniz.',
      category: 'technical'
    }
  ];

  const categories = {
    all: 'Tümü',
    general: 'Genel',
    formulas: 'Formüller',
    macros: 'Makrolar',
    membership: 'Üyelik',
    technical: 'Teknik'
  };

  const filteredFAQs = activeCategory === 'all' 
    ? faqData 
    : faqData.filter(item => item.category === activeCategory);

  const toggleExpand = (itemId: string) => {
    setExpandedItems(prev => 
      prev.includes(itemId)
        ? prev.filter(id => id !== itemId)
        : [...prev, itemId]
    );
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'general':
        return (
          <svg className=\"w-5 h-5\" fill=\"none\" stroke=\"currentColor\" viewBox=\"0 0 24 24\">
            <path strokeLinecap=\"round\" strokeLinejoin=\"round\" strokeWidth={2} d=\"M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z\" />
          </svg>
        );
      case 'formulas':
        return (
          <svg className=\"w-5 h-5\" fill=\"none\" stroke=\"currentColor\" viewBox=\"0 0 24 24\">
            <path strokeLinecap=\"round\" strokeLinejoin=\"round\" strokeWidth={2} d=\"M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z\" />
          </svg>
        );
      case 'macros':
        return (
          <svg className=\"w-5 h-5\" fill=\"none\" stroke=\"currentColor\" viewBox=\"0 0 24 24\">
            <path strokeLinecap=\"round\" strokeLinejoin=\"round\" strokeWidth={2} d=\"M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4\" />
          </svg>
        );
      case 'membership':
        return (
          <svg className=\"w-5 h-5\" fill=\"none\" stroke=\"currentColor\" viewBox=\"0 0 24 24\">
            <path strokeLinecap=\"round\" strokeLinejoin=\"round\" strokeWidth={2} d=\"M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z\" />
          </svg>
        );
      case 'technical':
        return (
          <svg className=\"w-5 h-5\" fill=\"none\" stroke=\"currentColor\" viewBox=\"0 0 24 24\">
            <path strokeLinecap=\"round\" strokeLinejoin=\"round\" strokeWidth={2} d=\"M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z\" />
            <path strokeLinecap=\"round\" strokeLinejoin=\"round\" strokeWidth={2} d=\"M15 12a3 3 0 11-6 0 3 3 0 016 0z\" />
          </svg>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 py-20 sm:py-32">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className=\"text-4xl font-bold text-slate-800 mb-4\">
            Sıkça Sorulan Sorular (SSS)
          </h1>
          <p className=\"text-lg text-slate-600 max-w-2xl mx-auto\">
            Excel Formül Yardımcısı hakkında merak ettiğiniz her şey
          </p>
        </div>

        {/* Category Filters */}
        <div className=\"bg-white rounded-2xl shadow-lg p-6 mb-8\">
          <h2 className=\"text-xl font-semibold text-slate-800 mb-4\">Kategoriler</h2>
          <div className=\"flex flex-wrap gap-2\">
            {Object.entries(categories).map(([key, label]) => (
              <button
                key={key}
                onClick={() => setActiveCategory(key)}
                className={`px-4 py-2 rounded-full transition-all flex items-center gap-2 ${
                  activeCategory === key
                    ? 'bg-emerald-500 text-white shadow-md'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                {key !== 'all' && (
                  <span className={activeCategory === key ? 'text-white' : 'text-slate-500'}>
                    {getCategoryIcon(key)}
                  </span>
                )}
                {label}
                <span className={`text-xs px-2 py-1 rounded-full ${
                  activeCategory === key 
                    ? 'bg-white/20 text-white' 
                    : 'bg-slate-200 text-slate-600'
                }`}>
                  {key === 'all' ? faqData.length : faqData.filter(item => item.category === key).length}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* FAQ Items */}
        <div className=\"space-y-4\">
          {filteredFAQs.map((item) => (
            <div key={item.id} className=\"bg-white rounded-2xl shadow-lg overflow-hidden transition-all hover:shadow-xl\">
              <button
                onClick={() => toggleExpand(item.id)}
                className=\"w-full p-6 text-left flex items-center justify-between hover:bg-slate-50 transition-colors\"
              >
                <div className=\"flex items-start gap-4 flex-1\">
                  <div className=\"flex-shrink-0 w-8 h-8 bg-emerald-100 rounded-lg flex items-center justify-center mt-1\">
                    <span className=\"text-emerald-600\">
                      {getCategoryIcon(item.category)}
                    </span>
                  </div>
                  <div>
                    <h3 className=\"text-lg font-semibold text-slate-800 mb-1\">
                      {item.question}
                    </h3>
                    <span className=\"text-xs px-3 py-1 bg-slate-100 text-slate-600 rounded-full\">
                      {categories[item.category as keyof typeof categories]}
                    </span>
                  </div>
                </div>
                <div className={`flex-shrink-0 ml-4 transform transition-transform ${
                  expandedItems.includes(item.id) ? 'rotate-180' : ''
                }`}>
                  <svg className=\"w-5 h-5 text-slate-500\" fill=\"none\" stroke=\"currentColor\" viewBox=\"0 0 24 24\">
                    <path strokeLinecap=\"round\" strokeLinejoin=\"round\" strokeWidth={2} d=\"M19 9l-7 7-7-7\" />
                  </svg>
                </div>
              </button>
              
              {expandedItems.includes(item.id) && (
                <div className=\"px-6 pb-6\">
                  <div className=\"pl-12\">
                    <div className=\"prose prose-slate max-w-none\">
                      <p className=\"text-slate-700 leading-relaxed\">
                        {item.answer}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* No Results */}
        {filteredFAQs.length === 0 && (
          <div className=\"text-center py-12\">
            <div className=\"w-24 h-24 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4\">
              <svg className=\"w-12 h-12 text-slate-400\" fill=\"none\" stroke=\"currentColor\" viewBox=\"0 0 24 24\">
                <path strokeLinecap=\"round\" strokeLinejoin=\"round\" strokeWidth={2} d=\"M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z\" />
              </svg>
            </div>
            <h3 className=\"text-xl font-semibold text-slate-800 mb-2\">Bu kategoride soru bulunamadı</h3>
            <p className=\"text-slate-600\">Başka bir kategori seçerek daha fazla soruya göz atabilirsiniz.</p>
          </div>
        )}

        {/* Contact Section */}
        <div className=\"bg-gradient-to-r from-emerald-500 to-blue-500 rounded-2xl shadow-lg p-8 mt-12 text-white text-center\">
          <h2 className=\"text-2xl font-bold mb-4\">Sorunuz cevaplanmadı mı?</h2>
          <p className=\"text-emerald-100 mb-6 max-w-2xl mx-auto\">
            Aradığınız cevabı bulamadıysanız, destek ekibimizle iletişime geçebilirsiniz. 
            Size en kısa sürede yardımcı olmaya hazırız.
          </p>
          <div className=\"flex flex-col sm:flex-row gap-4 justify-center\">
            <button className=\"bg-white text-emerald-600 px-6 py-3 rounded-xl font-semibold hover:bg-emerald-50 transition-colors flex items-center justify-center gap-2\">
              <svg className=\"w-5 h-5\" fill=\"none\" stroke=\"currentColor\" viewBox=\"0 0 24 24\">
                <path strokeLinecap=\"round\" strokeLinejoin=\"round\" strokeWidth={2} d=\"M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z\" />
              </svg>
              E-posta Gönder
            </button>
            <button className=\"bg-white/20 border border-white/30 text-white px-6 py-3 rounded-xl font-semibold hover:bg-white/30 transition-colors flex items-center justify-center gap-2\">
              <svg className=\"w-5 h-5\" fill=\"none\" stroke=\"currentColor\" viewBox=\"0 0 24 24\">
                <path strokeLinecap=\"round\" strokeLinejoin=\"round\" strokeWidth={2} d=\"M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z\" />
              </svg>
              Canlı Destek
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQPage;