import React, { useState, useEffect } from 'react';
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

const TeamIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none">
        <path d="M16 7a4 4 0 1 1-8 0 4 4 0 0 1 8 0Z" fill="#dcfce7" stroke="#10b981" strokeWidth="1.6"/>
        <path d="M12 14a7 7 0 0 0-7 7h14a7 7 0 0 0-7-7Z" fill="#10b981" fillOpacity="0.1" stroke="#10b981" strokeWidth="1.6"/>
        <path d="M6 21v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2" stroke="#10b981" strokeWidth="1.2" opacity="0.7"/>
        <circle cx="18" cy="9" r="2" fill="#10b981" fillOpacity="0.3" stroke="#10b981" strokeWidth="1.2"/>
        <circle cx="6" cy="9" r="2" fill="#10b981" fillOpacity="0.3" stroke="#10b981" strokeWidth="1.2"/>
    </svg>
);

const RocketIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none">
        {/* Main rocket body */}
        <path d="M4.5 16.5c-1.5 1.5-.5 3.5-.5 3.5s2-1 3.5-.5l1.5-1.5L4.5 16.5z" fill="#10b981" fillOpacity="0.2" stroke="#10b981" strokeWidth="1.5"/>
        <path d="M12 15l-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6.06 11.2A22.35 22.35 0 0 1 12 15z" fill="#dcfce7" stroke="#10b981" strokeWidth="1.8"/>
        {/* Rocket window */}
        <circle cx="15" cy="9" r="2" fill="#10b981" fillOpacity="0.3" stroke="#10b981" strokeWidth="1.2"/>
        {/* Flame */}
        <path d="M9 12a3 3 0 1 0-6 0c0-3 2.5-3 3-3s3 0 3 3z" fill="#f97316" fillOpacity="0.2" stroke="#f97316" strokeWidth="1.2"/>
        {/* Stars */}
        <circle cx="3" cy="3" r="0.8" fill="#10b981" opacity="0.6">
            <animate attributeName="opacity" values="0.6;1;0.6" dur="2s" repeatCount="indefinite"/>
        </circle>
        <circle cx="20" cy="6" r="0.6" fill="#10b981" opacity="0.4">
            <animate attributeName="opacity" values="0.4;0.8;0.4" dur="2.5s" repeatCount="indefinite"/>
        </circle>
    </svg>
);

const HeartIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none">
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" fill="#10b981" fillOpacity="0.1" stroke="#10b981" strokeWidth="1.8"/>
        <path d="M12 8c0-2 1.5-3 3-3s3 1 3 3-1.5 5-3 5-3-3-3-5z" fill="#10b981" fillOpacity="0.2"/>
        <circle cx="9" cy="10" r="1" fill="#10b981" opacity="0.6">
            <animate attributeName="r" values="1;1.2;1" dur="2s" repeatCount="indefinite"/>
        </circle>
        <circle cx="15" cy="8" r="0.8" fill="#10b981" opacity="0.5">
            <animate attributeName="r" values="0.8;1;0.8" dur="1.8s" repeatCount="indefinite"/>
        </circle>
    </svg>
);

interface AboutPageProps {
    onGetStarted?: () => void;
}

const AboutPage: React.FC<AboutPageProps> = ({ onGetStarted }) => {
    // Animation states
    const [currentStoryIndex, setCurrentStoryIndex] = useState(0);
    const [displayText, setDisplayText] = useState('');
    const [isTyping, setIsTyping] = useState(false);

    const stories = [
        { 
            problem: "Excel'de karmaşık formül yazamıyorum", 
            solution: "Sadece 'Ad ve soyadı birleştir' yazın, geri kalanını AI halletsin!" 
        },
        { 
            problem: "VBA makroları çok zor görünüyor", 
            solution: "'Boş satırları sil' deyin, otomatik makro kodu hazır!" 
        },
        { 
            problem: "VLOOKUP formülünü hep karıştırıyorum", 
            solution: "'A tablosundan B'ye veri getir' yazın, doğru formül gelsin!" 
        },
        { 
            problem: "Türkçe kaynak bulamıyorum", 
            solution: "Ana dilinizde hem soru sorun, hem de açıklama alın!" 
        }
    ];

    useEffect(() => {
        const typeStory = async () => {
            setIsTyping(true);
            const currentStory = stories[currentStoryIndex];
            
            // Clear previous text
            setDisplayText('');
            await new Promise(resolve => setTimeout(resolve, 300));
            
            // Type the solution text
            for (let i = 0; i <= currentStory.solution.length; i++) {
                setDisplayText(currentStory.solution.substring(0, i));
                await new Promise(resolve => setTimeout(resolve, 80));
            }
            
            setIsTyping(false);
            
            // Wait before moving to next story
            await new Promise(resolve => setTimeout(resolve, 3000));
            
            setCurrentStoryIndex((prev) => (prev + 1) % stories.length);
        };

        const timer = setTimeout(typeStory, 500);
        return () => clearTimeout(timer);
    }, [currentStoryIndex]);

    const features = [
        {
            icon: <BrainIcon />,
            title: "Yapay Zeka Destekli",
            description: "Gemini AI ile desteklenen gelişmiş yapay zeka, Excel verilerinizi analiz eder ve ihtiyacınıza özel formüller oluşturur."
        },
        {
            icon: <SparklesIcon />,
            title: "Türkçe Doğal Dil",
            description: "Karmaşık formül sözdizimini öğrenmenize gerek yok. Sadece ne istediğinizi Türkçe olarak açıklayın."
        },
        {
            icon: <ZapIcon />,
            title: "VBA Makro Desteği",
            description: "Sadece formül değil, VBA makroları da oluşturun. Tekrarlayan işlemlerinizi otomatikleştirin."
        },
        {
            icon: <GlobeIcon />,
            title: "Her Seviye İçin",
            description: "Excel'de yeni misiniz? Uzman mısınız? Herkes kendi seviyesinde destek alır."
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

    return (
        <div className="min-h-screen bg-slate-50">
            {/* Hero Section */}
            <section className="relative overflow-hidden bg-gradient-to-br from-emerald-50 to-white py-20 sm:py-32">
                <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center">
                        <div className="mx-auto bg-emerald-100 text-emerald-600 w-20 h-20 rounded-full flex items-center justify-center mb-8">
                            <BrainIcon />
                        </div>
                        
                        <h1 className="text-4xl sm:text-6xl font-bold mb-6">
                            <span className="text-slate-800">Hakkımızda</span>
                            <span className="block">
                                <span className="bg-gradient-to-r from-slate-800 via-emerald-600 to-slate-800 bg-clip-text text-transparent bg-[length:300%_300%] animate-[gradientShift_4s_ease-in-out_infinite]">
                                    ExcelBot AI
                                </span>
                            </span>
                        </h1>
                        
                        <p className="text-xl text-slate-600 mb-8 max-w-3xl mx-auto">
                            Excel'de zorlandığınız her formül ve makro için akıllı çözümler sunan 
                            yapay zeka destekli asistanınız. Türkçe açıklayın, geri kalanını bize bırakın.
                        </p>
                        
                        {/* Feature highlights */}
                        <div className="flex flex-wrap items-center justify-center gap-4 mb-8">
                            <div className="flex items-center gap-3 bg-white/70 backdrop-blur-sm px-4 py-2 rounded-full border border-emerald-200/50 shadow-sm hover:shadow-md transition-shadow">
                                <div className="w-5 h-5 flex items-center justify-center">
                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
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
                                <span className="text-slate-700 font-semibold">AI Destekli</span>
                            </div>
                            <div className="flex items-center gap-3 bg-white/70 backdrop-blur-sm px-4 py-2 rounded-full border border-emerald-200/50 shadow-sm hover:shadow-md transition-shadow">
                                <div className="w-5 h-5 flex items-center justify-center">
                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                                        <rect x="4" y="3" width="12" height="16" rx="1" fill="#dcfce7" stroke="#10b981" strokeWidth="1.5"/>
                                        <line x1="6" y1="6" x2="12" y2="6" stroke="#10b981" strokeWidth="1" opacity="0.7"/>
                                        <line x1="6" y1="9" x2="11" y2="9" stroke="#10b981" strokeWidth="1" opacity="0.7"/>
                                        <line x1="6" y1="12" x2="12" y2="12" stroke="#10b981" strokeWidth="1" opacity="0.7"/>
                                        <circle cx="13" cy="15" r="1.5" fill="#10b981" fillOpacity="0.2"/>
                                        <path d="M12.5 15l0.5 0.5 1-1" stroke="#10b981" strokeWidth="1" fill="none"/>
                                    </svg>
                                </div>
                                <span className="text-slate-700 font-semibold">Türkçe Destek</span>
                            </div>
                            <div className="flex items-center gap-3 bg-white/70 backdrop-blur-sm px-4 py-2 rounded-full border border-emerald-200/50 shadow-sm hover:shadow-md transition-shadow">
                                <div className="w-5 h-5 flex items-center justify-center">
                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                                        <path d="M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14H4Z" fill="#dcfce7" stroke="#10b981" strokeWidth="1.5"/>
                                        <circle cx="13" cy="10" r="0.8" fill="#10b981"/>
                                        <circle cx="11" cy="14" r="0.8" fill="#10b981"/>
                                    </svg>
                                </div>
                                <span className="text-slate-700 font-semibold">Anında Sonuç</span>
                            </div>
                        </div>

                        {/* Animated Story Demo */}
                        <div className="relative bg-gradient-to-br from-white via-white to-emerald-50/30 backdrop-blur-sm rounded-2xl p-6 max-w-3xl mx-auto mb-8 border border-emerald-200/50 shadow-xl">
                            {/* Floating particles effect */}
                            <div className="absolute inset-0 overflow-hidden rounded-2xl">
                                <div className="absolute top-4 right-8 w-2 h-2 bg-emerald-300/40 rounded-full animate-bounce" style={{animationDelay: '0s'}}></div>
                                <div className="absolute top-12 left-12 w-1 h-1 bg-emerald-400/40 rounded-full animate-bounce" style={{animationDelay: '1s'}}></div>
                                <div className="absolute bottom-8 right-16 w-1.5 h-1.5 bg-emerald-200/40 rounded-full animate-bounce" style={{animationDelay: '2s'}}></div>
                            </div>
                            
                            <div className="relative z-10">
                                <div className="text-sm text-slate-500 mb-3 flex items-center gap-2">
                                    <div className="flex items-center gap-1">
                                        <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                                        <div className="w-2 h-2 bg-red-400 rounded-full animate-pulse" style={{animationDelay: '0.2s'}}></div>
                                        <div className="w-2 h-2 bg-red-300 rounded-full animate-pulse" style={{animationDelay: '0.4s'}}></div>
                                    </div>
                                    <span className="font-semibold">Yaygın Sorun:</span>
                                </div>
                                <div className="bg-gradient-to-r from-red-50 to-red-100 rounded-lg p-4 mb-4 shadow-sm transform transition-all duration-300 hover:scale-[1.02]">
                                    <span className="text-red-700 font-medium">
                                        😰 "{stories[currentStoryIndex]?.problem}"
                                    </span>
                                </div>
                                
                                <div className="text-sm text-emerald-600 mb-2 flex items-center gap-2">
                                    <div className="flex items-center gap-1">
                                        <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
                                        <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" style={{animationDelay: '0.2s'}}></div>
                                        <div className="w-2 h-2 bg-emerald-300 rounded-full animate-pulse" style={{animationDelay: '0.4s'}}></div>
                                    </div>
                                    <span className="font-semibold">✨ AI Çözümü:</span>
                                </div>
                                <div className="bg-gradient-to-r from-emerald-50 to-emerald-100 border-2 border-emerald-200 rounded-lg p-4 font-medium text-lg shadow-sm">
                                    <div className="flex items-center gap-2">
                                        <span className="text-emerald-700 font-bold">💡</span>
                                        <span className="text-emerald-800 transition-all duration-200">
                                            {displayText}
                                        </span>
                                        {isTyping && (
                                            <span className="inline-block w-2 h-5 bg-emerald-600 animate-pulse ml-1"></span>
                                        )}
                                        {!isTyping && displayText && (
                                            <div className="flex items-center gap-1 ml-2">
                                                <div className="w-1 h-1 bg-emerald-500 rounded-full animate-ping"></div>
                                                <span className="text-xs text-emerald-600 font-semibold">✓ Kolay!</span>
                                            </div>
                                        )}
                                    </div>
                                </div>
                                
                                {/* Progress indicators */}
                                <div className="flex justify-between items-center mt-6">
                                    <div className="flex gap-2">
                                        {stories.map((_, index) => (
                                            <div 
                                                key={index} 
                                                className={`w-2 h-2 rounded-full transition-all duration-500 ${
                                                    index === currentStoryIndex 
                                                        ? 'bg-emerald-500 scale-150 shadow-lg shadow-emerald-200' 
                                                        : index < currentStoryIndex
                                                        ? 'bg-emerald-300'
                                                        : 'bg-slate-200'
                                                }`}
                                            />
                                        ))}
                                    </div>
                                    
                                    <div className="text-xs text-slate-500 bg-white/50 px-3 py-1 rounded-full">
                                        {currentStoryIndex + 1} / {stories.length}
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
                            {onGetStarted && (
                                <button
                                    onClick={onGetStarted}
                                    className="bg-emerald-600 text-white font-bold py-4 px-8 rounded-xl hover:bg-emerald-700 transition-colors shadow-lg hover:shadow-xl flex items-center gap-2"
                                >
                                    <PlayIcon />
                                    Hemen Dene
                                </button>
                            )}
                            <div className="text-sm text-slate-500">
                                ✨ Kayıt gerektirmez, hemen kullanabilirsiniz
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="py-20 bg-white">
                <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl sm:text-4xl font-bold text-slate-800 mb-4">
                            Neden <span className="text-emerald-600">ExcelBot AI?</span>
                        </h2>
                        <p className="text-xl text-slate-600 max-w-2xl mx-auto">
                            Excel çalışmanızı kolaylaştıran özellikler
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
                            4 basit adımda Excel uzmanı gibi çalışın
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

            {/* Mission & Vision Section */}
            <section className="py-20 bg-gradient-to-br from-slate-50 to-blue-50/30">
                <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl sm:text-4xl font-bold text-slate-800 mb-4">
                            <span className="text-emerald-600">Vizyonumuz</span> ve Misyonumuz
                        </h2>
                        <p className="text-xl text-slate-600 max-w-3xl mx-auto">
                            Excel'i herkes için daha kolay ve etkili hale getirmek
                        </p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        <div className="bg-white rounded-2xl p-8 shadow-sm border border-emerald-200/50 hover:shadow-lg transition-shadow group">
                            <div className="bg-emerald-50 w-16 h-16 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                <RocketIcon />
                            </div>
                            <h3 className="text-xl font-bold text-slate-800 mb-4">Vizyonumuz</h3>
                            <p className="text-slate-600">
                                Excel ile çalışan herkesin, teknik bilgi seviyesi ne olursa olsun, 
                                karmaşık formülleri ve makroları kolayca oluşturabileceği bir dünya hayal ediyoruz.
                            </p>
                        </div>
                        
                        <div className="bg-white rounded-2xl p-8 shadow-sm border border-emerald-200/50 hover:shadow-lg transition-shadow group">
                            <div className="bg-emerald-50 w-16 h-16 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                <HeartIcon />
                            </div>
                            <h3 className="text-xl font-bold text-slate-800 mb-4">Misyonumuz</h3>
                            <p className="text-slate-600">
                                Yapay zeka teknolojisini kullanarak Excel öğrenme sürecini hızlandırmak, 
                                hata oranını minimize etmek ve kullanıcı deneyimini en üst seviyeye çıkarmak.
                            </p>
                        </div>
                        
                        <div className="bg-white rounded-2xl p-8 shadow-sm border border-emerald-200/50 hover:shadow-lg transition-shadow group">
                            <div className="bg-emerald-50 w-16 h-16 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                <TeamIcon />
                            </div>
                            <h3 className="text-xl font-bold text-slate-800 mb-4">Değerlerimiz</h3>
                            <p className="text-slate-600">
                                Kullanıcı odaklılık, sürekli öğrenme, yenilikçilik ve herkes için erişilebilir 
                                teknoloji geliştirme ilkelerimizle hareket ediyoruz.
                            </p>
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
                    {onGetStarted ? (
                        <button 
                            onClick={onGetStarted}
                            className="bg-white text-emerald-600 font-bold py-4 px-8 rounded-xl hover:bg-slate-50 transition-colors shadow-lg hover:shadow-xl inline-flex items-center gap-2"
                        >
                            <PlayIcon />
                            Hemen Başla - Ücretsiz
                        </button>
                    ) : (
                        <div className="bg-white text-emerald-600 font-bold py-4 px-8 rounded-xl shadow-lg inline-flex items-center gap-2">
                            <PlayIcon />
                            Excel Formül Yardımcısı
                        </div>
                    )}
                </div>
            </section>

            <ModernFooter />
        </div>
    );
};

export default AboutPage;
