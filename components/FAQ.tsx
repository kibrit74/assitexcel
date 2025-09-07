import React, { useState } from 'react';
import ModernFooter from './ModernFooter';

// Icons
const BrainIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v1a2.5 2.5 0 0 1-2.5 2.5h-1A2.5 2.5 0 0 1 6 5.5v-1A2.5 2.5 0 0 1 8.5 2h1Z"></path>
        <path d="M14.5 2A2.5 2.5 0 0 1 17 4.5v1a2.5 2.5 0 0 1-2.5 2.5h-1a2.5 2.5 0 0 1-2.5-2.5v-1A2.5 2.5 0 0 1 12.5 2h2Z"></path>
        <path d="M6 10a2.5 2.5 0 0 1 2.5 2.5v1A2.5 2.5 0 0 1 6 16H5a2.5 2.5 0 0 1-2.5-2.5v-1A2.5 2.5 0 0 1 5 10h1Z"></path>
        <path d="M18 10a2.5 2.5 0 0 1 2.5 2.5v1a2.5 2.5 0 0 1-2.5 2.5h-1a2.5 2.5 0 0 1-2.5-2.5v-1A2.5 2.5 0 0 1 15 10h1Z"></path>
        <path d="M12 15a2.5 2.5 0 0 1 2.5 2.5v1a2.5 2.5 0 0 1-2.5 2.5h-1a2.5 2.5 0 0 1-2.5-2.5v-1A2.5 2.5 0 0 1 10 15h2Z"></path>
    </svg>
);

const ExcelIcon = () => (
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
);

const QuestionIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none">
        {/* Main chat bubble */}
        <path d="M21 15c0 1.1-.9 2-2 2H7l-4 4V5c0-1.1.9-2 2-2h14c1.1 0 2 .9 2 2v10z" fill="#10b981" fillOpacity="0.15" stroke="#10b981" strokeWidth="1.8"/>
        {/* Question mark */}
        <circle cx="12" cy="8" r="2" fill="none" stroke="#10b981" strokeWidth="1.5"/>
        <path d="M10.5 8a1.5 1.5 0 0 1 3 0c0 1-1.5 1.5-1.5 2.5" stroke="#10b981" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
        <circle cx="12" cy="13" r="0.8" fill="#10b981"/>
        {/* Chat indicator dots */}
        <circle cx="8" cy="16" r="0.6" fill="#10b981" opacity="0.6">
            <animate attributeName="opacity" values="0.6;1;0.6" dur="2s" repeatCount="indefinite"/>
        </circle>
        <circle cx="12" cy="16" r="0.6" fill="#10b981" opacity="0.4">
            <animate attributeName="opacity" values="0.4;0.8;0.4" dur="2.2s" repeatCount="indefinite"/>
        </circle>
        <circle cx="16" cy="16" r="0.6" fill="#10b981" opacity="0.5">
            <animate attributeName="opacity" values="0.5;0.9;0.5" dur="1.8s" repeatCount="indefinite"/>
        </circle>
    </svg>
);

const CheckIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="9" fill="#10b981" fillOpacity="0.15" stroke="#10b981" strokeWidth="1.5"/>
        <path d="M8 12l3 3 5-6" stroke="#10b981" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
        <circle cx="11" cy="15" r="0.8" fill="#10b981"/>
    </svg>
);


interface FAQItem {
    id: string;
    question: string;
    answer: string;
    category: 'genel' | 'kullanim' | 'teknik' | 'formul' | 'vba';
}

const FAQ: React.FC = () => {
    const [openItems, setOpenItems] = useState<Set<string>>(new Set());
    const [activeCategory, setActiveCategory] = useState<string>('tumu');

    const categories = [
        { id: 'tumu', name: 'Tümü', icon: (
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none">
                <circle cx="11" cy="11" r="7" fill="#10b981" fillOpacity="0.15" stroke="#10b981" strokeWidth="2"/>
                <path d="m20 20-4.35-4.35" stroke="#10b981" strokeWidth="2.5" strokeLinecap="round"/>
                <circle cx="11" cy="11" r="3" fill="#10b981" fillOpacity="0.3"/>
                <path d="M9 11l1 1 2-2" stroke="white" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
        ) },
        { id: 'genel', name: 'Genel Bilgiler', icon: (
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none">
                <rect x="3" y="4" width="18" height="16" rx="3" fill="#10b981" fillOpacity="0.15" stroke="#10b981" strokeWidth="2"/>
                <rect x="6" y="7" width="12" height="2" rx="1" fill="#10b981" fillOpacity="0.6"/>
                <rect x="6" y="10" width="8" height="1.5" rx="0.75" fill="#10b981" fillOpacity="0.4"/>
                <rect x="6" y="12.5" width="10" height="1.5" rx="0.75" fill="#10b981" fillOpacity="0.4"/>
                <rect x="6" y="15" width="6" height="1.5" rx="0.75" fill="#10b981" fillOpacity="0.4"/>
                <circle cx="18" cy="6" r="2" fill="#10b981"/>
                <path d="M17 5.5l0.5 0.5 1-1" stroke="white" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
        ) },
        { id: 'kullanim', name: 'Kullanım', icon: (
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path d="M4.5 16.5c-1.5 1.5-.5 3.5-.5 3.5s2-1 3.5-.5l1.5-1.5L4.5 16.5z" fill="#10b981" fillOpacity="0.2" stroke="#10b981" strokeWidth="1.5"/>
                <path d="M12 15l-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6.06 11.2A22.35 22.35 0 0 1 12 15z" fill="#10b981" fillOpacity="0.15" stroke="#10b981" strokeWidth="1.8"/>
                <circle cx="15" cy="9" r="2" fill="#10b981" fillOpacity="0.3" stroke="#10b981" strokeWidth="1.2"/>
                <path d="M9 12a3 3 0 1 0-6 0c0-3 2.5-3 3-3s3 0 3 3z" fill="#f97316" fillOpacity="0.2" stroke="#f97316" strokeWidth="1.2"/>
            </svg>
        ) },
        { id: 'teknik', name: 'Teknik', icon: (
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none">
                <rect x="2" y="5" width="20" height="14" rx="3" fill="#10b981" fillOpacity="0.15" stroke="#10b981" strokeWidth="2"/>
                <rect x="4" y="7" width="2" height="2" rx="0.5" fill="#10b981"/>
                <rect x="7" y="7" width="2" height="2" rx="0.5" fill="#10b981"/>
                <rect x="10" y="7" width="2" height="2" rx="0.5" fill="#10b981"/>
                <rect x="13" y="7" width="2" height="2" rx="0.5" fill="#10b981"/>
                <rect x="16" y="7" width="2" height="2" rx="0.5" fill="#10b981"/>
                <rect x="5" y="10" width="2" height="2" rx="0.5" fill="#10b981" fillOpacity="0.7"/>
                <rect x="8" y="10" width="2" height="2" rx="0.5" fill="#10b981" fillOpacity="0.7"/>
                <rect x="11" y="10" width="2" height="2" rx="0.5" fill="#10b981" fillOpacity="0.7"/>
                <rect x="14" y="10" width="2" height="2" rx="0.5" fill="#10b981" fillOpacity="0.7"/>
                <rect x="6" y="13" width="8" height="2" rx="1" fill="#10b981" fillOpacity="0.5"/>
                <path d="M19 4l1 1-1 1-1-1 1-1z" fill="#10b981"/>
                <circle cx="20" cy="15" r="1" fill="#10b981"/>
            </svg>
        ) },
        { id: 'formul', name: 'Formüller', icon: (
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none">
                <rect x="3" y="3" width="18" height="18" rx="3" fill="#10b981" fillOpacity="0.15" stroke="#10b981" strokeWidth="2"/>
                <text x="7" y="11" fontSize="8" fill="#10b981" fontFamily="monospace" fontWeight="bold">=</text>
                <text x="10" y="11" fontSize="6" fill="#10b981" fontFamily="monospace">SUM</text>
                <rect x="5" y="13" width="6" height="1" fill="#10b981" fillOpacity="0.6"/>
                <rect x="12" y="13" width="6" height="1" fill="#10b981" fillOpacity="0.6"/>
                <rect x="5" y="15" width="8" height="1" fill="#10b981" fillOpacity="0.4"/>
                <circle cx="18" cy="7" r="2" fill="#10b981"/>
                <path d="M17 6.5l0.5 0.5 1-1" stroke="white" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"/>
                <g stroke="#10b981" strokeWidth="1" strokeLinecap="round">
                    <path d="M6 7h2M14 7h2M6 9h3M13 9h3"/>
                </g>
            </svg>
        ) },
        { id: 'vba', name: 'VBA Makroları', icon: (
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none">
                <rect x="2" y="3" width="20" height="18" rx="3" fill="#10b981" fillOpacity="0.15" stroke="#10b981" strokeWidth="2"/>
                <rect x="4" y="5" width="16" height="3" rx="1" fill="#10b981" fillOpacity="0.3"/>
                <circle cx="6" cy="6.5" r="0.8" fill="#10b981"/>
                <circle cx="8.5" cy="6.5" r="0.8" fill="#10b981"/>
                <circle cx="11" cy="6.5" r="0.8" fill="#10b981"/>
                <g stroke="#10b981" strokeWidth="1.2" strokeLinecap="round" fontFamily="monospace">
                    <text x="5" y="13" fontSize="3" fill="#10b981">Sub AutoFormula()</text>
                    <text x="5" y="15.5" fontSize="3" fill="#10b981">  Range("A1")</text>
                    <text x="5" y="18" fontSize="3" fill="#10b981">End Sub</text>
                </g>
                <path d="M18 10l2 2-2 2" stroke="#10b981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <circle cx="19" cy="12" r="3" fill="#10b981" fillOpacity="0.15" stroke="#10b981" strokeWidth="1"/>
                <path d="M17.5 12l1 1 2-2" stroke="#10b981" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
        ) }
    ];

    const faqData: FAQItem[] = [
        // Genel Bilgiler
        {
            id: '1',
            category: 'genel',
            question: 'Excel Formül Yardımcısı nedir ve nasıl çalışır?',
            answer: 'Excel Formül Yardımcısı, Gemini AI destekli bir araçtır. Excel verilerinizi analiz ederek, doğal dilde yazdığınız istekleri otomatik olarak Excel formüllerine veya VBA makrolarına dönüştürür. Sadece "A ve B sütunlarını birleştir" gibi Türkçe bir açıklama yazmanız yeterlidir.'
        },
        {
            id: '2',
            category: 'genel',
            question: 'Bu araç ücretsiz mi? Kayıt olmam gerekiyor mu?',
            answer: 'Evet, Excel Formül Yardımcısı tamamen ücretsizdir ve herhangi bir kayıt işlemi gerektirmez. Direkt olarak Excel dosyanızı yükleyerek kullanmaya başlayabilirsiniz. Verileriniz güvenli bir şekilde işlenir ve saklanmaz.'
        },
        {
            id: '3',
            category: 'genel',
            question: 'Hangi Excel sürümleri destekleniyor?',
            answer: 'Araç, Microsoft Excel 2016 ve sonrası tüm sürümlerle uyumludur. Ayrıca Excel Online, LibreOffice Calc ve Google Sheets gibi alternatif çalışma sayfası uygulamalarında da oluşturulan formüller çalışır.'
        },
        {
            id: '4',
            category: 'genel',
            question: 'Verilerim güvenli mi? Dosyalarım saklanıyor mu?',
            answer: 'Kesinlikle güvenli! Yüklediğiniz Excel dosyaları yalnızca formül oluşturma işlemi sırasında analiz edilir ve işlem tamamlandıktan sonra sistemden silinir. Hiçbir veri saklanmaz veya üçüncü şahıslarla paylaşılmaz.'
        },

        // Kullanım
        {
            id: '5',
            category: 'kullanim',
            question: 'Nasıl bir Excel dosyası yükleyebilirim?',
            answer: 'Ana sayfada "Dosya Seç" butonuna tıklayarak .xlsx, .xls veya .csv formatındaki dosyalarınızı yükleyebilirsiniz. Dosya boyutu maksimum 10MB olmalıdır. Yükleme işlemi birkaç saniye sürer.'
        },
        {
            id: '6',
            category: 'kullanim',
            question: 'İsteğimi nasıl yazmalıyım? Örnekler verebilir misiniz?',
            answer: 'İsteklerinizi günlük konuşma dilinizle yazabilirsiniz. Örnekler: "A1 ve B1 hücrelerini birleştir", "C sütunundaki sayıların toplamını hesapla", "Boş olan satırları sil", "Tarihleri gün-ay-yıl formatına çevir", "Yinelenen kayıtları bul ve sil".'
        },
        {
            id: '7',
            category: 'kullanim',
            question: 'Birden fazla formül aynı anda oluşturabilir miyim?',
            answer: 'Evet! Tek bir istekte birden fazla işlem tanımlayabilirsiniz. Örneğin: "A ve B sütunlarını birleştir, ardından C sütunundaki toplam değeri hesapla ve D sütununa yüzde olarak yaz" gibi karmaşık istekleri de anlayabilir.'
        },
        {
            id: '8',
            category: 'kullanim',
            question: 'Oluşturulan formülleri nasıl Excel\'e kopyalarım?',
            answer: 'Formül oluşturulduktan sonra, sonuç ekranında "Kopyala" butonuna tıklayarak formülü panoya alabilirsiniz. Ardından Excel\'de istediğiniz hücreye sağ tıklayıp "Yapıştır" seçeneğini kullanarak formülü yerleştirebilirsiniz.'
        },

        // Teknik
        {
            id: '9',
            category: 'teknik',
            question: 'Yapay zeka hangi dili anlıyor? İngilizce yazmam gerekir mi?',
            answer: 'Hayır, tamamen Türkçe destekli! İsteklerinizi Türkçe yazabilirsiniz. Ayrıca İngilizce istekleri de anlayabilir. Gemini AI, doğal dil işleme sayesinde günlük konuşma dilinizi Excel formüllerine dönüştürür.'
        },
        {
            id: '10',
            category: 'teknik',
            question: 'İnternet bağlantısı olmadan çalışır mı?',
            answer: 'Hayır, araç yapay zeka işleme için internet bağlantısı gerektirir. Gemini AI bulut tabanlı olarak çalıştığı için dosya analizi ve formül oluşturma işlemleri online yapılır. Stabil internet bağlantısı önerilir.'
        },
        {
            id: '11',
            category: 'teknik',
            question: 'Büyük dosyalarla çalışır mı? Sınırlar neler?',
            answer: 'Araç 10MB\'a kadar olan Excel dosyalarını destekler. Bu genellikle 50.000-100.000 satır arası veri anlamına gelir. Çok büyük dosyalar için işlem süresi artabilir, ancak sonuç kalitesi etkilenmez.'
        },
        {
            id: '12',
            category: 'teknik',
            question: 'Hangi tarayıcılarda çalışır?',
            answer: 'Modern tüm tarayıcılarda çalışır: Chrome, Firefox, Safari, Edge ve Opera. En iyi performans için güncel tarayıci sürümü kullanılması önerilir. Mobil tarayıcılarda da kullanılabilir ancak masaüstü deneyimi daha idealdir.'
        },

        // Formüller
        {
            id: '13',
            category: 'formul',
            question: 'Hangi tür formüller oluşturulabilir?',
            answer: 'Neredeyse tüm Excel formül türleri: Matematik işlemler (SUM, AVERAGE, COUNT), Metin işlemleri (CONCATENATE, UPPER, LOWER), Mantıksal işlemler (IF, AND, OR), Tarih işlemleri (DATE, DATEDIF), Arama işlemleri (VLOOKUP, INDEX-MATCH) ve çok daha fazlası.'
        },
        {
            id: '14',
            category: 'formul',
            question: 'Karmaşık VLOOKUP veya INDEX-MATCH formülleri oluşturabilir mi?',
            answer: 'Evet! Karmaşık arama ve eşleştirme formülleri de dahil olmak üzere gelişmiş Excel formülleri oluşturabilir. "A tablosundan B tablosuna eşleşen değerleri getir" gibi açıklamalar yeterlidir, gerekli VLOOKUP veya INDEX-MATCH formülü otomatik oluşturulur.'
        },
        {
            id: '15',
            category: 'formul',
            question: 'Koşullu formatlamalara yönelik formüller yapılabilir mi?',
            answer: 'Evet, koşullu formatlama için gereken formülleri oluşturabilir. "100\'den büyük değerleri vurgula" veya "Bugünün tarihinden eski değerleri kırmızı yap" gibi isteklere uygun formüller ve açıklamalar sağlanır.'
        },
        {
            id: '16',
            category: 'formul',
            question: 'Pivot tablo formülleri destekleniyor mu?',
            answer: 'Temel pivot tablo hesaplamaları için formül desteği mevcuttur. Ancak karmaşık pivot tablo yapıları için manuel oluşturma önerilir. Pivot alternatifi olarak SUMIF, COUNTIF gibi formüllerle benzer sonuçlar elde edilebilir.'
        },

        // VBA Makroları
        {
            id: '17',
            category: 'vba',
            question: 'VBA makroları da oluşturabiliyor mu?',
            answer: 'Evet! Tekrarlayan işlemler için VBA makroları oluşturabilir. "Her hafta rapor oluştur" veya "Boş satırları otomatik sil" gibi isteklere uygun VBA kodları üretilir. Kodlar açıklamalı olarak sunulur.'
        },
        {
            id: '18',
            category: 'vba',
            question: 'VBA kodlarını nasıl Excel\'e eklerim?',
            answer: 'Oluşturulan VBA kodunu kopyalayın. Excel\'de Alt+F11 tuşlarına basarak VBA editörünü açın. "Insert > Module" seçeneğiyle yeni modül oluşturun ve kodu yapıştırın. F5 tuşuna basarak veya Excel\'de Macro menüsünden çalıştırabilirsiniz.'
        },
        {
            id: '19',
            category: 'vba',
            question: 'VBA makroları güvenli mi?',
            answer: 'Oluşturulan VBA kodları zararsızdır ve sadece Excel işlemleri yapar. Ancak güvenlik için kodu incelemeniz önerilir. Excel\'de makro güvenlik ayarlarını "Enable VBA macros" olarak ayarlamanız gerekebilir.'
        },
        {
            id: '20',
            category: 'vba',
            question: 'Hangi tür VBA işlemleri destekleniyor?',
            answer: 'Veri temizleme, formatlanma, rapor oluşturma, otomatik hesaplama, dosya işlemleri ve kullanıcı arayüzü oluşturma gibi çoğu VBA işlemi desteklenir. Sistem dosyalarına erişim veya internet işlemleri gibi güvenlik riski taşıyan kodlar üretilmez.'
        }
    ];

    const toggleItem = (id: string) => {
        setOpenItems(prev => {
            const newSet = new Set(prev);
            if (newSet.has(id)) {
                newSet.delete(id);
            } else {
                newSet.add(id);
            }
            return newSet;
        });
    };

    const filteredFAQ = activeCategory === 'tumu' 
        ? faqData 
        : faqData.filter(item => item.category === activeCategory);

    return (
        <div className="min-h-screen bg-slate-50">
            {/* Header */}
            <section className="relative overflow-hidden bg-gradient-to-br from-emerald-50 to-white py-16">
                <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">

                    <div className="text-center">
                        <div className="mx-auto bg-emerald-100 text-emerald-600 w-20 h-20 rounded-full flex items-center justify-center mb-8">
                            <QuestionIcon />
                        </div>
                        
                        <h1 className="text-4xl sm:text-5xl font-bold mb-6">
                            <span className="text-slate-800">Sıkça Sorulan</span>
                            <span className="block">
                                <span className="bg-gradient-to-r from-slate-800 via-emerald-600 to-slate-800 bg-clip-text text-transparent bg-[length:300%_300%] animate-[gradientShift_4s_ease-in-out_infinite]">
                                    Sorular
                                </span>
                            </span>
                        </h1>
                        
                        <p className="text-xl text-slate-600 mb-8 max-w-3xl mx-auto">
                            Excel Formül Yardımcısı hakkında merak ettiğiniz her şey burada. 
                            Aradığınızı bulamazsanız bize ulaşabilirsiniz.
                        </p>

                        {/* Stats */}
                        <div className="flex flex-wrap items-center justify-center gap-6 mb-8">
                            <div className="flex items-center gap-3 bg-white/70 backdrop-blur-sm px-6 py-3 rounded-full border border-emerald-200/50 shadow-sm">
                                <div className="w-5 h-5 flex items-center justify-center">
                                    <CheckIcon />
                                </div>
                                <span className="text-slate-700 font-semibold">{faqData.length} Detaylı Cevap</span>
                            </div>
                            <div className="flex items-center gap-3 bg-white/70 backdrop-blur-sm px-6 py-3 rounded-full border border-emerald-200/50 shadow-sm">
                                <div className="w-5 h-5 flex items-center justify-center">
                                    <ExcelIcon />
                                </div>
                                <span className="text-slate-700 font-semibold">5 Farklı Kategori</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Category Filter */}
            <section className="py-8 bg-white border-b border-slate-200">
                <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-wrap justify-center gap-3">
                        {categories.map(category => (
                            <button
                                key={category.id}
                                onClick={() => setActiveCategory(category.id)}
                                className={`flex items-center gap-2 px-6 py-3 rounded-full font-semibold transition-all duration-200 ${
                                    activeCategory === category.id
                                        ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-200'
                                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-800'
                                }`}
                            >
                                <span className={`flex items-center justify-center ${
                                    activeCategory === category.id ? '[&_svg]:text-white [&_svg_*]:!fill-white [&_svg_*]:!stroke-white' : ''
                                }`}>{category.icon}</span>
                                {category.name}
                                <span className="text-xs opacity-75">
                                    ({category.id === 'tumu' ? faqData.length : faqData.filter(item => item.category === category.id).length})
                                </span>
                            </button>
                        ))}
                    </div>
                </div>
            </section>

            {/* FAQ Content */}
            <section className="py-16">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    {filteredFAQ.length === 0 ? (
                        <div className="text-center py-16">
                            <div className="text-6xl mb-4">🤔</div>
                            <h3 className="text-2xl font-bold text-slate-800 mb-4">Bu kategoride henüz soru yok</h3>
                            <p className="text-slate-600">Başka bir kategori seçmeyi deneyin.</p>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {filteredFAQ.map((item, index) => {
                                const isOpen = openItems.has(item.id);
                                return (
                                    <div
                                        key={item.id}
                                        className="bg-white rounded-2xl shadow-sm border border-slate-200/80 overflow-hidden hover:shadow-md transition-shadow"
                                    >
                                        <button
                                            onClick={() => toggleItem(item.id)}
                                            className="w-full text-left p-6 flex justify-between items-center hover:bg-slate-50 transition-colors"
                                        >
                                            <div className="flex items-start gap-4 flex-grow pr-4">
                                                <div className="flex-shrink-0 bg-emerald-100 text-emerald-600 w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm">
                                                    {index + 1}
                                                </div>
                                                <h3 className="text-lg font-semibold text-slate-800 leading-tight">
                                                    {item.question}
                                                </h3>
                                            </div>
                                            <div className="flex-shrink-0">
                                                <svg 
                                                    className={`w-6 h-6 transition-transform duration-200 text-emerald-600 ${isOpen ? 'transform rotate-180' : ''}`} 
                                                    fill="none" 
                                                    stroke="currentColor" 
                                                    viewBox="0 0 24 24"
                                                >
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                                                </svg>
                                            </div>
                                        </button>
                                        
                                        {isOpen && (
                                            <div className="px-6 pb-6">
                                                <div className="ml-12 pl-4 border-l-4 border-emerald-200 bg-gradient-to-r from-emerald-50 to-white rounded-r-lg p-4">
                                                    <p className="text-slate-700 leading-relaxed">
                                                        {item.answer}
                                                    </p>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </div>
            </section>

            {/* Additional Help Section */}
            <section className="py-16 bg-gradient-to-br from-emerald-600 to-emerald-700">
                <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 max-w-2xl mx-auto">
                        <h2 className="text-3xl font-bold text-white mb-4">
                            Aradığınızı Bulamadınız mı?
                        </h2>
                        <p className="text-emerald-100 mb-6 text-lg">
                            Sorunuz listede yoksa, yardım merkezimizi kontrol edebilir 
                            veya doğrudan destek ekibimizle iletişime geçebilirsiniz.
                        </p>
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                            <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-white">
                                <ExcelIcon />
                                <span className="font-semibold">7/24 Destek</span>
                            </div>
                            <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-white">
                                <BrainIcon />
                                <span className="font-semibold">AI Destekli Yanıtlar</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <ModernFooter />
        </div>
    );
};

export default FAQ;
