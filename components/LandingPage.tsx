import React, { useState, useEffect } from 'react';
import ModernFooter from './ModernFooter';

// Icons
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

const BrainIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v1a2.5 2.5 0 0 1-2.5 2.5h-1A2.5 2.5 0 0 1 6 5.5v-1A2.5 2.5 0 0 1 8.5 2h1Z"></path>
        <path d="M14.5 2A2.5 2.5 0 0 1 17 4.5v1a2.5 2.5 0 0 1-2.5 2.5h-1a2.5 2.5 0 0 1-2.5-2.5v-1A2.5 2.5 0 0 1 12.5 2h2Z"></path>
        <path d="M6 10a2.5 2.5 0 0 1 2.5 2.5v1A2.5 2.5 0 0 1 6 16H5a2.5 2.5 0 0 1-2.5-2.5v-1A2.5 2.5 0 0 1 5 10h1Z"></path>
        <path d="M18 10a2.5 2.5 0 0 1 2.5 2.5v1a2.5 2.5 0 0 1-2.5 2.5h-1a2.5 2.5 0 0 1-2.5-2.5v-1A2.5 2.5 0 0 1 15 10h1Z"></path>
        <path d="M12 15a2.5 2.5 0 0 1 2.5 2.5v1a2.5 2.5 0 0 1-2.5 2.5h-1a2.5 2.5 0 0 1-2.5-2.5v-1A2.5 2.5 0 0 1 10 15h2Z"></path>
    </svg>
);

const SparklesIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none">
        <g stroke="#10b981" strokeWidth="2" strokeLinecap="round">
            <path d="M12 2l-1.5 4.5c-0.3 0.9-1.1 1.7-2 2L4 10l4.5 1.5c0.9 0.3 1.7 1.1 2 2L12 18l1.5-4.5c0.3-0.9 1.1-1.7 2-2L20 10l-4.5-1.5c-0.9-0.3-1.7-1.1-2-2L12 2z" fill="#10b981" fillOpacity="0.15"/>
            <path d="M6 2v4M20 17v4M5 3h4M18 19h4"/>
        </g>
        <circle cx="12" cy="10" r="1.5" fill="#10b981"/>
        <circle cx="8" cy="6" r="0.8" fill="#10b981"/>
        <circle cx="19" cy="19" r="0.8" fill="#10b981"/>
    </svg>
);

const ZapIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none">
        <path d="M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14H4Z" fill="#10b981" fillOpacity="0.15" stroke="#10b981" strokeWidth="1.8"/>
        <path d="M8 4l4 6M16 20l-4-6" stroke="#10b981" strokeWidth="1.2" opacity="0.7"/>
        <circle cx="13" cy="10" r="1" fill="#10b981"/>
        <circle cx="11" cy="14" r="1" fill="#10b981"/>
    </svg>
);

const GlobeIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="9" fill="#10b981" fillOpacity="0.1" stroke="#10b981" strokeWidth="1.8"/>
        <circle cx="12" cy="12" r="4" fill="none" stroke="#10b981" strokeWidth="1.5" strokeDasharray="2 2"/>
        <g stroke="#10b981" strokeWidth="1.5" opacity="0.8">
            <path d="M12 3a9 9 0 0 1 0 18M12 3a9 9 0 0 0 0 18"/>
            <path d="M3 12h18"/>
        </g>
        <g fill="#10b981" opacity="0.6">
            <circle cx="6" cy="6" r="1"/>
            <circle cx="18" cy="6" r="1"/>
            <circle cx="6" cy="18" r="1"/>
            <circle cx="18" cy="18" r="1"/>
        </g>
    </svg>
);

const ArrowRightIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none">
        <path d="M5 12h14" stroke="#10b981" strokeWidth="2.5" strokeLinecap="round"/>
        <path d="M12 5l7 7-7 7" stroke="#10b981" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
        <circle cx="19" cy="12" r="1.5" fill="#10b981"/>
        <circle cx="5" cy="12" r="1" fill="#10b981" opacity="0.6"/>
    </svg>
);

const CheckIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="9" fill="#10b981" fillOpacity="0.15" stroke="#10b981" strokeWidth="1.5"/>
        <path d="M8 12l3 3 5-6" stroke="#10b981" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
        <circle cx="11" cy="15" r="0.8" fill="#10b981"/>
    </svg>
);

const PlayIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="9" fill="#10b981" fillOpacity="0.1" stroke="#10b981" strokeWidth="1.6"/>
        <path d="M10 8l6 4-6 4V8z" fill="#10b981" fillOpacity="0.8"/>
        <path d="M10 8l6 4-6 4" stroke="#10b981" strokeWidth="1.5" strokeLinejoin="round" fill="none"/>
    </svg>
);

// Modern Help Center Icons
const AnimationIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none">
        {/* Monitor/Screen */}
        <rect x="2" y="4" width="20" height="12" rx="2" fill="#dcfce7" stroke="#10b981" strokeWidth="1.8"/>
        {/* Play button */}
        <circle cx="12" cy="10" r="3" fill="#10b981" fillOpacity="0.2" stroke="#10b981" strokeWidth="1.5"/>
        <path d="M10.5 8l3 2-3 2V8z" fill="#10b981"/>
        {/* Animation lines */}
        <path d="M6 20l2-2m4 0l2 2m-4-2v2" stroke="#10b981" strokeWidth="1.5" strokeLinecap="round"/>
        {/* Sparkle effects */}
        <circle cx="18" cy="6" r="1" fill="#10b981" opacity="0.6">
            <animate attributeName="opacity" values="0.6;1;0.6" dur="2s" repeatCount="indefinite"/>
        </circle>
        <circle cx="6" cy="8" r="0.8" fill="#10b981" opacity="0.4">
            <animate attributeName="opacity" values="0.4;0.8;0.4" dur="2.5s" repeatCount="indefinite"/>
        </circle>
        <path d="M4 2l1 1-1 1-1-1 1-1z" fill="#10b981" opacity="0.5"/>
        <path d="M19 15l0.5 0.5-0.5 0.5-0.5-0.5 0.5-0.5z" fill="#10b981" opacity="0.7"/>
    </svg>
);

const GuideIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none">
        {/* Book pages */}
        <rect x="4" y="3" width="14" height="18" rx="1" fill="#dcfce7" stroke="#10b981" strokeWidth="1.6"/>
        <rect x="6" y="3" width="12" height="18" rx="1" fill="#f0fdf4" stroke="#10b981" strokeWidth="1.2" strokeDasharray="0,2"/>
        {/* Bookmark */}
        <rect x="15" y="2" width="3" height="8" fill="#10b981" rx="0.5"/>
        <path d="M16.5 10l1-1 1 1" fill="#dcfce7" stroke="#10b981" strokeWidth="0.8"/>
        {/* Text lines */}
        <line x1="7" y1="7" x2="14" y2="7" stroke="#10b981" strokeWidth="1.2" opacity="0.7"/>
        <line x1="7" y1="10" x2="13" y2="10" stroke="#10b981" strokeWidth="1.2" opacity="0.7"/>
        <line x1="7" y1="13" x2="15" y2="13" stroke="#10b981" strokeWidth="1.2" opacity="0.7"/>
        <line x1="7" y1="16" x2="11" y2="16" stroke="#10b981" strokeWidth="1.2" opacity="0.7"/>
        {/* Checkmark for completed sections */}
        <circle cx="16" cy="16" r="2" fill="#10b981" fillOpacity="0.2"/>
        <path d="M15 16l1 1 2-2" stroke="#10b981" strokeWidth="1.5" strokeLinecap="round" fill="none"/>
    </svg>
);

const KeyboardShortcutIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none">
        {/* Keyboard base */}
        <rect x="2" y="6" width="20" height="12" rx="2" fill="#dcfce7" stroke="#10b981" strokeWidth="1.8"/>
        {/* Keys */}
        <rect x="4" y="8" width="2" height="2" rx="0.3" fill="#10b981" fillOpacity="0.3" stroke="#10b981" strokeWidth="0.8"/>
        <rect x="7" y="8" width="2" height="2" rx="0.3" fill="#10b981" fillOpacity="0.3" stroke="#10b981" strokeWidth="0.8"/>
        <rect x="10" y="8" width="2" height="2" rx="0.3" fill="#10b981" fillOpacity="0.3" stroke="#10b981" strokeWidth="0.8"/>
        <rect x="13" y="8" width="2" height="2" rx="0.3" fill="#10b981" fillOpacity="0.3" stroke="#10b981" strokeWidth="0.8"/>
        <rect x="16" y="8" width="2" height="2" rx="0.3" fill="#10b981" fillOpacity="0.3" stroke="#10b981" strokeWidth="0.8"/>
        {/* Special keys */}
        <rect x="4" y="11" width="3" height="2" rx="0.3" fill="#10b981" fillOpacity="0.2" stroke="#10b981" strokeWidth="0.8"/>
        <rect x="8" y="11" width="2" height="2" rx="0.3" fill="#10b981" fillOpacity="0.2" stroke="#10b981" strokeWidth="0.8"/>
        <rect x="11" y="11" width="2" height="2" rx="0.3" fill="#10b981" fillOpacity="0.2" stroke="#10b981" strokeWidth="0.8"/>
        {/* Space bar */}
        <rect x="6" y="14" width="8" height="1.5" rx="0.3" fill="#10b981" fillOpacity="0.4" stroke="#10b981" strokeWidth="0.8"/>
        {/* Highlight effect on Ctrl key */}
        <rect x="16" y="11" width="2" height="2" rx="0.3" fill="#10b981" stroke="#10b981" strokeWidth="1.2"/>
        {/* Lightning bolt for shortcuts */}
        <path d="M19 3l-2 3h1.5l-2 3" stroke="#10b981" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
        {/* Plus symbol */}
        <path d="M4 4h1m-0.5-0.5v1" stroke="#10b981" strokeWidth="1.2" strokeLinecap="round"/>
    </svg>
);

interface LandingPageProps {
    onGetStarted: () => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onGetStarted }) => {
    // Formula animation states
    const [currentFormulaIndex, setCurrentFormulaIndex] = useState(0);
    const [displayText, setDisplayText] = useState('');
    const [isTyping, setIsTyping] = useState(false);

    const formulas = [
        { request: "Ad ve soyadı birleştir", formula: "=A1&\" \"&B1" },
        { request: "KDV hesapla (%18)", formula: "=B1*1.18" },
        { request: "Tarih formatı düzenle", formula: "=TEXT(A1,\"dd.mm.yyyy\")" },
        { request: "Koşullu değer kontrolü", formula: "=IF(A1>100,\"Yüksek\",\"Düşük\")" },
        { request: "Ortalama hesapla", formula: "=AVERAGE(A1:A10)" },
        { request: "Toplam hesapla", formula: "=SUM(A1:A5)" },
        { request: "Büyük harf yap", formula: "=UPPER(A1)" },
        { request: "Yüzde hesapla", formula: "=(B1/A1)*100" }
    ];

    useEffect(() => {
        const typeFormula = async () => {
            setIsTyping(true);
            const currentFormula = formulas[currentFormulaIndex];
            
            // Clear previous text with a smooth transition
            setDisplayText('');
            await new Promise(resolve => setTimeout(resolve, 300));
            
            // Type the formula character by character with variable speed
            for (let i = 0; i <= currentFormula.formula.length; i++) {
                setDisplayText(currentFormula.formula.substring(0, i));
                // Faster typing for simple characters, slower for complex parts
                const char = currentFormula.formula[i];
                const delay = char === '(' || char === ')' || char === '"' ? 150 : 80;
                await new Promise(resolve => setTimeout(resolve, delay));
            }
            
            setIsTyping(false);
            
            // Wait before moving to next formula (longer pause to read)
            await new Promise(resolve => setTimeout(resolve, 3000));
            
            setCurrentFormulaIndex((prev) => (prev + 1) % formulas.length);
        };

        const timer = setTimeout(typeFormula, 500); // Initial delay
        return () => clearTimeout(timer);
    }, [currentFormulaIndex]);

    const features = [
        {
            icon: <BrainIcon />,
            title: "Yapay Zeka Destekli",
            description: "Gemini AI ile desteklenen gelişmiş yapay zeka, Excel verilerinizi analiz eder ve ihtiyacınıza özel formüller oluşturur."
        },
        {
            icon: <SparklesIcon />,
            title: "Canlı Animasyonlu Anlatım",
            description: "Formüllerin nasıl oluşturulduğunu görsel animasyonlarla izleyin. Her adımı anlayın ve öğrenin."
        },
        {
            icon: <ZapIcon />,
            title: "VBA Makro Desteği",
            description: "Sadece formül değil, VBA makroları da oluşturun. Tekrarlayan işlemlerinizi otomatikleştirin."
        },
        {
            icon: <GlobeIcon />,
            title: "Kapsamlı Yardım Merkezi",
            description: "Detaylı kılavuzlar, örnekler ve klavye kısayolları ile her seviyeden kullanıcı destek alır."
        }
    ];

    const howItWorks = [
        {
            step: "1",
            title: "Excel Dosyanızı Yükleyin",
            description: "Formül veya makro oluşturmak istediğiniz Excel dosyasını yükleyin. AI verilerinizi analiz edecek."
        },
        {
            step: "2",
            title: "İsteğinizi Doğal Dilde Yazın",
            description: "Ne yapmak istediğinizi Türkçe olarak yazın. Örn: 'A ve B sütunlarını birleştir' veya 'Yinelenen kayıtları sil'"
        },
        {
            step: "3",
            title: "AI Formülünüzü Oluştursun",
            description: "Yapay zeka verilerinizi analiz ederek size özel formül veya VBA makrosu oluşturacak."
        },
        {
            step: "4",
            title: "Kopyalayın ve Kullanın",
            description: "Oluşturulan formülü veya makroyu Excel'e kopyalayın ve hemen kullanmaya başlayın."
        }
    ];

    const examples = [
        "Ad ve soyadı sütunlarını birleştir",
        "Satış verilerine göre komisyon hesapla", 
        "Boş hücreleri otomatik doldur",
        "Yinelenen kayıtları temizle",
        "Tarih formatlarını düzenle",
        "Koşullu renklendirme uygula"
    ];

    return (
        <div className="min-h-screen bg-slate-50">
            {/* Hero Section */}
            <section className="relative overflow-hidden bg-gradient-to-br from-emerald-50 to-white py-20 sm:py-32">
                <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center">
                        <div className="mx-auto bg-gradient-to-br from-emerald-100 to-emerald-50 w-24 h-24 rounded-3xl shadow-xl flex items-center justify-center mb-8 ring-4 ring-white ring-opacity-50">
                            <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none">
                                {/* Excel + AI combination icon */}
                                <rect x="3" y="3" width="14" height="18" rx="2" fill="#10b981" fillOpacity="0.1" stroke="#10b981" strokeWidth="1.8"/>
                                {/* Excel grid lines */}
                                <line x1="7" y1="8" x2="13" y2="8" stroke="#10b981" strokeWidth="0.8" opacity="0.6"/>
                                <line x1="7" y1="12" x2="13" y2="12" stroke="#10b981" strokeWidth="0.8" opacity="0.6"/>
                                <line x1="7" y1="16" x2="13" y2="16" stroke="#10b981" strokeWidth="0.8" opacity="0.6"/>
                                <line x1="10" y1="5" x2="10" y2="19" stroke="#10b981" strokeWidth="0.8" opacity="0.6"/>
                                {/* AI brain overlay */}
                                <circle cx="17" cy="8" r="5" fill="#10b981" fillOpacity="0.15" stroke="#10b981" strokeWidth="1.5"/>
                                <path d="M15 7.5c0-0.5 0.5-1 1-1s1 0.5 1 1M19 7.5c0-0.5 0.5-1 1-1s1 0.5 1 1" stroke="#10b981" strokeWidth="1" strokeLinecap="round"/>
                                <path d="M17 6v2M16 8h2M18 8h2" stroke="#10b981" strokeWidth="1" strokeLinecap="round"/>
                                <circle cx="17" cy="8" r="1.5" fill="#10b981" fillOpacity="0.3"/>
                                {/* Formula symbol */}
                                <text x="5" y="14" fill="#10b981" fontSize="8" fontWeight="bold" fontFamily="monospace">=fx</text>
                            </svg>
                        </div>
                        
                        <h1 className="text-4xl sm:text-6xl font-bold mb-6">
                            <span className="text-slate-800">Excel'de</span>
                            <span className="block">
                                <span className="bg-gradient-to-r from-slate-800 via-emerald-600 to-slate-800 bg-clip-text text-transparent bg-[length:300%_300%] animate-[gradientShift_4s_ease-in-out_infinite]">
                                    Yapay Zeka Devrimi
                                </span>
                            </span>
                        </h1>
                        
                        <p className="text-xl text-slate-600 mb-8 max-w-3xl mx-auto">
                            Karmaşık Excel formüllerini ve VBA makrolarını doğal dilde açıklayın, 
                            yapay zeka sizin için otomatik olarak oluştursun. Veri analizinizi 
                            hızlandırın, işinizi kolaylaştırın.
                        </p>
                        
                        {/* Feature highlights */}
                        <div className="flex flex-wrap items-center justify-center gap-4 mb-8 text-sm">
                            <div className="flex items-center gap-3 bg-white/70 backdrop-blur-sm px-4 py-2 rounded-full border border-emerald-200/50 shadow-sm hover:shadow-md transition-shadow">
                                <div className="w-5 h-5 flex items-center justify-center">
                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                                        <rect x="2" y="3" width="20" height="12" rx="2" fill="#dcfce7" stroke="#10b981" strokeWidth="1.5"/>
                                        <circle cx="12" cy="9" r="2" fill="#10b981" fillOpacity="0.3" stroke="#10b981" strokeWidth="1"/>
                                        <path d="M11 8l1 1-1 1" stroke="#10b981" strokeWidth="1.5" fill="none"/>
                                        <circle cx="6" cy="6" r="0.5" fill="#10b981" opacity="0.7">
                                            <animate attributeName="opacity" values="0.7;1;0.7" dur="2s" repeatCount="indefinite"/>
                                        </circle>
                                        <circle cx="18" cy="12" r="0.5" fill="#10b981" opacity="0.5">
                                            <animate attributeName="opacity" values="0.5;0.9;0.5" dur="2.5s" repeatCount="indefinite"/>
                                        </circle>
                                    </svg>
                                </div>
                                <span className="text-slate-700 font-semibold">Canlı Animasyonlu Anlatım</span>
                            </div>
                            <div className="flex items-center gap-3 bg-white/70 backdrop-blur-sm px-4 py-2 rounded-full border border-emerald-200/50 shadow-sm hover:shadow-md transition-shadow">
                                <div className="w-5 h-5 flex items-center justify-center">
                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                                        <rect x="4" y="3" width="12" height="16" rx="1" fill="#dcfce7" stroke="#10b981" strokeWidth="1.5"/>
                                        <rect x="13" y="2" width="2" height="6" fill="#10b981" rx="0.3"/>
                                        <path d="M14 8l0.5-0.5 0.5 0.5" fill="#dcfce7" stroke="#10b981" strokeWidth="0.5"/>
                                        <line x1="6" y1="6" x2="12" y2="6" stroke="#10b981" strokeWidth="1" opacity="0.7"/>
                                        <line x1="6" y1="9" x2="11" y2="9" stroke="#10b981" strokeWidth="1" opacity="0.7"/>
                                        <line x1="6" y1="12" x2="12" y2="12" stroke="#10b981" strokeWidth="1" opacity="0.7"/>
                                        <circle cx="13" cy="15" r="1.5" fill="#10b981" fillOpacity="0.2"/>
                                        <path d="M12.5 15l0.5 0.5 1-1" stroke="#10b981" strokeWidth="1" fill="none"/>
                                    </svg>
                                </div>
                                <span className="text-slate-700 font-semibold">Kapsamlı Yardım Merkezi</span>
                            </div>
                            <div className="flex items-center gap-3 bg-white/70 backdrop-blur-sm px-4 py-2 rounded-full border border-emerald-200/50 shadow-sm hover:shadow-md transition-shadow">
                                <div className="w-5 h-5 flex items-center justify-center">
                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                                        <path d="M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14H4Z" fill="#dcfce7" stroke="#10b981" strokeWidth="1.5"/>
                                        <path d="M8 4l2 3M16 20l-2-3" stroke="#10b981" strokeWidth="1" opacity="0.7"/>
                                        <circle cx="13" cy="10" r="0.8" fill="#10b981"/>
                                        <circle cx="11" cy="14" r="0.8" fill="#10b981"/>
                                    </svg>
                                </div>
                                <span className="text-slate-700 font-semibold">Anında Sonuç</span>
                            </div>
                        </div>

                        {/* Animated Formula Demo */}
                        <div className="relative bg-gradient-to-br from-white via-white to-emerald-50/30 backdrop-blur-sm rounded-2xl p-6 max-w-3xl mx-auto mb-8 border border-emerald-200/50 shadow-xl">
                            {/* Floating particles effect */}
                            <div className="absolute inset-0 overflow-hidden rounded-2xl">
                                <div className="absolute top-4 right-8 w-2 h-2 bg-emerald-300/40 rounded-full animate-bounce" style={{animationDelay: '0s'}}></div>
                                <div className="absolute top-12 left-12 w-1 h-1 bg-emerald-400/40 rounded-full animate-bounce" style={{animationDelay: '1s'}}></div>
                                <div className="absolute bottom-8 right-16 w-1.5 h-1.5 bg-emerald-200/40 rounded-full animate-bounce" style={{animationDelay: '2s'}}></div>
                                <div className="absolute bottom-12 left-8 w-1 h-1 bg-emerald-500/40 rounded-full animate-bounce" style={{animationDelay: '0.5s'}}></div>
                            </div>
                            
                            <div className="relative z-10">
                                <div className="text-sm text-slate-500 mb-3 flex items-center gap-2">
                                    <div className="flex items-center gap-1">
                                        <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                                        <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse" style={{animationDelay: '0.2s'}}></div>
                                        <div className="w-2 h-2 bg-blue-300 rounded-full animate-pulse" style={{animationDelay: '0.4s'}}></div>
                                    </div>
                                    <span className="font-semibold">Kullanıcı İsteği:</span>
                                </div>
                                <div className="bg-gradient-to-r from-slate-50 to-slate-100 rounded-lg p-4 mb-4 shadow-sm transform transition-all duration-300 hover:scale-[1.02]">
                                    <span className="text-slate-700 font-medium">
                                        💬 "{formulas[currentFormulaIndex]?.request}"
                                    </span>
                                </div>
                                
                                <div className="text-sm text-emerald-600 mb-2 flex items-center gap-2">
                                    <div className="flex items-center gap-1">
                                        <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
                                        <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" style={{animationDelay: '0.2s'}}></div>
                                        <div className="w-2 h-2 bg-emerald-300 rounded-full animate-pulse" style={{animationDelay: '0.4s'}}></div>
                                    </div>
                                    <span className="font-semibold">✨ AI Formülü:</span>
                                </div>
                                <div className="bg-gradient-to-r from-emerald-50 to-emerald-100 border-2 border-emerald-200 rounded-lg p-4 font-mono text-lg shadow-sm">
                                    <div className="flex items-center gap-2">
                                        <span className="text-emerald-700 font-bold">=</span>
                                        <span className="text-emerald-800 transition-all duration-200">
                                            {displayText.substring(1)}
                                        </span>
                                        {isTyping && (
                                            <span className="inline-block w-2 h-5 bg-emerald-600 animate-pulse ml-1"></span>
                                        )}
                                        {!isTyping && displayText && (
                                            <div className="flex items-center gap-1 ml-2">
                                                <div className="w-1 h-1 bg-emerald-500 rounded-full animate-ping"></div>
                                                <span className="text-xs text-emerald-600 font-semibold">✓ Hazır!</span>
                                            </div>
                                        )}
                                    </div>
                                </div>
                                
                                {/* Progress indicators */}
                                <div className="flex justify-between items-center mt-6">
                                    <div className="flex gap-2">
                                        {formulas.map((_, index) => (
                                            <div 
                                                key={index} 
                                                className={`w-2 h-2 rounded-full transition-all duration-500 ${
                                                    index === currentFormulaIndex 
                                                        ? 'bg-emerald-500 scale-150 shadow-lg shadow-emerald-200' 
                                                        : index < currentFormulaIndex
                                                        ? 'bg-emerald-300'
                                                        : 'bg-slate-200'
                                                }`}
                                            />
                                        ))}
                                    </div>
                                    
                                    <div className="text-xs text-slate-500 bg-white/50 px-3 py-1 rounded-full">
                                        {currentFormulaIndex + 1} / {formulas.length}
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
                            <button
                                onClick={onGetStarted}
                                className="bg-emerald-600 text-white font-bold py-4 px-8 rounded-xl hover:bg-emerald-700 transition-colors shadow-lg hover:shadow-xl flex items-center gap-2"
                            >
                                <PlayIcon />
                                Ücretsiz Dene
                            </button>
                            <div className="text-sm text-slate-500">
                                ✨ Kayıt gerektirmez, hemen kullanabilirsiniz
                            </div>
                        </div>

                        {/* Example queries */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 max-w-4xl mx-auto">
                            {examples.map((example, index) => (
                                <div key={index} className="bg-white/60 backdrop-blur-sm border border-emerald-200/50 rounded-lg p-3 text-sm text-slate-600 hover:bg-white/80 hover:border-emerald-300/60 transition-all duration-200 hover:shadow-sm">
                                    <div className="flex items-center gap-2">
                                        <div className="w-4 h-4 flex-shrink-0">
                                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                                                {/* Bulb shape */}
                                                <path d="M12 2a7 7 0 0 1 5 11.9V17a1 1 0 0 1-1 1h-8a1 1 0 0 1-1-1v-3.1A7 7 0 0 1 12 2z" fill="#dcfce7" stroke="#10b981" strokeWidth="1.5"/>
                                                {/* Bulb base */}
                                                <rect x="9" y="18" width="6" height="2" rx="1" fill="#10b981" fillOpacity="0.3" stroke="#10b981" strokeWidth="1"/>
                                                {/* Light rays */}
                                                <g stroke="#10b981" strokeWidth="1.2" strokeLinecap="round" opacity="0.7">
                                                    <path d="M12 1v1M4.2 4.2l.7.7M1 12h1M4.9 19.8l.7-.7M19.8 19.1l-.7-.7M23 12h-1M19.8 4.2l-.7.7"/>
                                                </g>
                                                {/* Inner glow */}
                                                <circle cx="12" cy="9" r="3" fill="#10b981" fillOpacity="0.1"/>
                                                <circle cx="10" cy="7" r="1" fill="#10b981" fillOpacity="0.4"/>
                                            </svg>
                                        </div>
                                        <span className="flex-1">{example}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="py-20 bg-white">
                <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl sm:text-4xl font-bold text-slate-800 mb-4">
                            Neden <span className="text-emerald-600">Excel</span> Formül Yardımcısı?
                        </h2>
                        <p className="text-xl text-slate-600 max-w-2xl mx-auto">
                            Yapay zeka gücüyle Excel çalışmanızı bir üst seviyeye taşıyın
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {features.map((feature, index) => (
                            <div key={index} className="text-center group">
                                <div className="mx-auto bg-emerald-100 text-emerald-600 w-16 h-16 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                    {feature.icon}
                                </div>
                                <h3 className="text-xl font-bold text-slate-800 mb-3">{feature.title}</h3>
                                <p className="text-slate-600 leading-relaxed">{feature.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* How it Works */}
            <section className="py-20 bg-slate-50">
                <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl sm:text-4xl font-bold text-slate-800 mb-4">
                            Nasıl <span className="text-emerald-600">Çalışır?</span>
                        </h2>
                        <p className="text-xl text-slate-600 max-w-2xl mx-auto">
                            4 basit adımda Excel formüllerinizi oluşturun
                        </p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                        {howItWorks.map((step, index) => (
                            <div key={index} className="relative">
                                <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200/80 h-full">
                                    <div className="bg-emerald-600 text-white w-12 h-12 rounded-full flex items-center justify-center font-bold text-xl mb-4">
                                        {step.step}
                                    </div>
                                    <h3 className="text-xl font-bold text-slate-800 mb-3">{step.title}</h3>
                                    <p className="text-slate-600 leading-relaxed">{step.description}</p>
                                </div>
                                {index < howItWorks.length - 1 && (
                                    <div className="hidden lg:block absolute top-1/2 -right-4 transform -translate-y-1/2 text-emerald-600">
                                        <ArrowRightIcon />
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Help Center Section */}
            <section className="py-20 bg-gradient-to-br from-slate-50 to-blue-50/30">
                <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl sm:text-4xl font-bold text-slate-800 mb-4">
                            Kapsamlı <span className="text-blue-600">Yardım Merkezi</span> ve <span className="text-emerald-600">Animasyonlu Anlatım</span>
                        </h2>
                        <p className="text-xl text-slate-600 max-w-3xl mx-auto">
                            Sadece formül oluşturmakla kalmıyoruz, aynı zamanda Excel öğrenim yolculuğunuzda rehber oluyoruz
                        </p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
                        <div className="bg-white rounded-2xl p-6 shadow-sm border border-emerald-200/50 hover:shadow-lg transition-shadow group">
                            <div className="bg-emerald-50 w-16 h-16 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                                <AnimationIcon />
                            </div>
                            <h3 className="text-xl font-bold text-slate-800 mb-3">Canlı Animasyonlar</h3>
                            <p className="text-slate-600">
                                Her formülün nasıl oluşturulduğunu adım adım görün. Typewriter efekti ile gerçek zamanlı yazım animasyonu.
                            </p>
                        </div>
                        
                        <div className="bg-white rounded-2xl p-6 shadow-sm border border-emerald-200/50 hover:shadow-lg transition-shadow group">
                            <div className="bg-emerald-50 w-16 h-16 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                                <GuideIcon />
                            </div>
                            <h3 className="text-xl font-bold text-slate-800 mb-3">Detaylı Kılavuzlar</h3>
                            <p className="text-slate-600">
                                Her formül için kapsamlı açıklamalar, kullanım senaryoları ve pratik örnekler.
                            </p>
                        </div>
                        
                        <div className="bg-white rounded-2xl p-6 shadow-sm border border-emerald-200/50 hover:shadow-lg transition-shadow group">
                            <div className="bg-emerald-50 w-16 h-16 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                                <KeyboardShortcutIcon />
                            </div>
                            <h3 className="text-xl font-bold text-slate-800 mb-3">Klavye Kısayolları</h3>
                            <p className="text-slate-600">
                                Hızlı çalışma için klavye kısayolları rehberi ve verimlilik ipuçları.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Benefits Section */}
            <section className="py-20 bg-white">
                <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                        <div>
                            <h2 className="text-3xl sm:text-4xl font-bold text-slate-800 mb-6">
                                Excel Uzmanlığınızı <span className="text-emerald-600">10x Hızlandırın</span>
                            </h2>
                            <p className="text-xl text-slate-600 mb-8">
                                Karmaşık formülleri öğrenmek için saatler harcamak yerine, 
                                yapay zeka ile saniyeler içinde istediğiniz sonuca ulaşın.
                            </p>
                            
                            <div className="space-y-4">
                                {[
                                    "Zaman kazanın: Formül araştırması yapmayın",
                                    "Hata oranını azaltın: AI doğru formül üretir", 
                                    "Öğrenin: Her formül açıklamasıyla gelir",
                                    "Türkçe destekli: Kendi dilinizde çalışın",
                                    "VBA makroları: Otomatik kod üretimi",
                                    "Animasyonlu öğrenim: Görsel rehberlik",
                                    "Kapsamlı yardım: Her seviye için destek"
                                ].map((benefit, index) => (
                                    <div key={index} className="flex items-center gap-3">
                                        <div className="bg-emerald-100 text-emerald-600 w-6 h-6 rounded-full flex items-center justify-center">
                                            <CheckIcon />
                                        </div>
                                        <span className="text-slate-600">{benefit}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                        
                        <div className="bg-gradient-to-br from-emerald-50 to-white rounded-2xl p-8 border border-slate-200/80">
                            <div className="bg-white rounded-xl p-6 shadow-sm mb-6">
                                <div className="text-sm text-slate-500 mb-2">Kullanıcı İsteği:</div>
                                <div className="bg-slate-50 rounded-lg p-3 text-slate-700 italic">
                                    "A sütunundaki ad ile B sütunundaki soyadı birleştir ve C sütununa yaz"
                                </div>
                            </div>
                            
                            <div className="bg-emerald-600 text-white rounded-xl p-6 shadow-sm">
                                <div className="text-emerald-100 text-sm mb-2">AI Çözümü:</div>
                                <div className="font-mono bg-emerald-700 rounded-lg p-3">
                                    =A1&" "&B1
                                </div>
                                <div className="text-emerald-100 text-sm mt-3">
                                    ✨ Açıklama ve kullanım rehberi dahil
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 bg-gradient-to-br from-emerald-600 to-emerald-700">
                <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
                        Excel Çalışmanızı Devrimleştirmeye Hazır mısınız?
                    </h2>
                    <p className="text-xl text-emerald-100 mb-8 max-w-2xl mx-auto">
                        Ücretsiz deneyin, kayıt gerektirmez. Hemen Excel dosyanızı yükleyip 
                        yapay zekanın gücünü keşfedin.
                    </p>
                    <button
                        onClick={onGetStarted}
                        className="bg-white text-emerald-600 font-bold py-4 px-8 rounded-xl hover:bg-slate-50 transition-colors shadow-lg hover:shadow-xl inline-flex items-center gap-2"
                    >
                        <PlayIcon />
                        Hemen Başla - Ücretsiz
                    </button>
                </div>
            </section>

            <ModernFooter />
        </div>
    );
};

export default LandingPage;
