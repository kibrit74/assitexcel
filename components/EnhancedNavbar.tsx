import React, { useState, useEffect } from 'react';

// Enhanced Green Icon Components - Redesigned to match the navbar design
const SearchIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none">
        <circle cx="11" cy="11" r="7" fill="#10b981" fillOpacity="0.15" stroke="#10b981" strokeWidth="2.5"/>
        <circle cx="11" cy="11" r="3" fill="#10b981" fillOpacity="0.8"/>
        <path d="m19 19l-4-4" stroke="#10b981" strokeWidth="3" strokeLinecap="round"/>
        <circle cx="11" cy="11" r="1" fill="white"/>
        <path d="M8 8l6 6M16 8l-6 6" stroke="white" strokeWidth="1" strokeLinecap="round" opacity="0.6"/>
    </svg>
);

const GeneralInfoIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none">
        <rect x="4" y="3" width="16" height="18" rx="3" fill="#10b981" fillOpacity="0.15" stroke="#10b981" strokeWidth="2.5"/>
        <rect x="6" y="6" width="12" height="2" rx="1" fill="#10b981" fillOpacity="0.8"/>
        <rect x="6" y="9" width="8" height="1.5" rx="0.75" fill="#10b981" fillOpacity="0.6"/>
        <rect x="6" y="11.5" width="10" height="1.5" rx="0.75" fill="#10b981" fillOpacity="0.6"/>
        <rect x="6" y="14" width="6" height="1.5" rx="0.75" fill="#10b981" fillOpacity="0.6"/>
        <rect x="6" y="16.5" width="9" height="1.5" rx="0.75" fill="#10b981" fillOpacity="0.6"/>
        <circle cx="19" cy="5" r="2" fill="#10b981"/>
        <path d="M18.5 4.5l0.5 0.5 1-1" stroke="white" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
);

const UserGuideIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="9" fill="#10b981" fillOpacity="0.15" stroke="#10b981" strokeWidth="2.5"/>
        <path d="M9 12h6" stroke="#10b981" strokeWidth="3" strokeLinecap="round"/>
        <path d="M12 9v6" stroke="#10b981" strokeWidth="3" strokeLinecap="round"/>
        <circle cx="12" cy="12" r="4" fill="none" stroke="#10b981" strokeWidth="1.5" strokeDasharray="1 1" opacity="0.5"/>
        <circle cx="12" cy="12" r="2" fill="#10b981" fillOpacity="0.9"/>
        <circle cx="12" cy="12" r="0.8" fill="white"/>
    </svg>
);

const TechnicalIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none">
        <rect x="2" y="6" width="20" height="12" rx="3" fill="#10b981" fillOpacity="0.15" stroke="#10b981" strokeWidth="2.5"/>
        <rect x="4" y="8" width="2.5" height="2" rx="0.5" fill="#10b981"/>
        <rect x="7" y="8" width="2.5" height="2" rx="0.5" fill="#10b981"/>
        <rect x="10" y="8" width="2.5" height="2" rx="0.5" fill="#10b981"/>
        <rect x="13" y="8" width="2.5" height="2" rx="0.5" fill="#10b981"/>
        <rect x="16" y="8" width="2.5" height="2" rx="0.5" fill="#10b981"/>
        <rect x="5" y="11" width="2.5" height="2" rx="0.5" fill="#10b981" fillOpacity="0.7"/>
        <rect x="8" y="11" width="2.5" height="2" rx="0.5" fill="#10b981" fillOpacity="0.7"/>
        <rect x="11" y="11" width="2.5" height="2" rx="0.5" fill="#10b981" fillOpacity="0.7"/>
        <rect x="14" y="11" width="2.5" height="2" rx="0.5" fill="#10b981" fillOpacity="0.7"/>
        <rect x="6" y="14" width="8" height="2" rx="1" fill="#10b981" fillOpacity="0.6"/>
        <path d="M20 3l1 1-1 1-1-1 1-1z" fill="#10b981"/>
        <circle cx="19" cy="16" r="1" fill="#10b981"/>
    </svg>
);

const FormulaIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none">
        <rect x="3" y="3" width="18" height="18" rx="3" fill="#10b981" fillOpacity="0.15" stroke="#10b981" strokeWidth="2.5"/>
        <g fill="#10b981" fontFamily="monospace" fontWeight="bold">
            <text x="6" y="12" fontSize="10">=</text>
            <text x="10" y="12" fontSize="8">SUM</text>
        </g>
        <rect x="5" y="14" width="6" height="1.2" fill="#10b981" fillOpacity="0.7"/>
        <rect x="12" y="14" width="6" height="1.2" fill="#10b981" fillOpacity="0.7"/>
        <rect x="5" y="16" width="8" height="1.2" fill="#10b981" fillOpacity="0.5"/>
        <rect x="14" y="16" width="4" height="1.2" fill="#10b981" fillOpacity="0.5"/>
        <circle cx="18.5" cy="6.5" r="2" fill="#10b981"/>
        <path d="M17.5 6l1 0.5 1-1" stroke="white" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
        <g stroke="#10b981" strokeWidth="1.2" strokeLinecap="round">
            <path d="M6 8h2M12 8h2M6 10h3M11 10h3"/>
        </g>
    </svg>
);

const VBAMacroIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none">
        <rect x="2" y="3" width="20" height="18" rx="3" fill="#10b981" fillOpacity="0.15" stroke="#10b981" strokeWidth="2.5"/>
        <rect x="4" y="5" width="16" height="3" rx="1" fill="#10b981" fillOpacity="0.4"/>
        <circle cx="6" cy="6.5" r="1" fill="#10b981"/>
        <circle cx="8.5" cy="6.5" r="1" fill="#10b981"/>
        <circle cx="11" cy="6.5" r="1" fill="#10b981"/>
        <g fill="#10b981" fontFamily="monospace" fontSize="2.5">
            <text x="5" y="12">Sub Formula()</text>
            <text x="5" y="15">  Range("A1")</text>
            <text x="5" y="18">End Sub</text>
        </g>
        <path d="M17.5 10l2.5 2-2.5 2" stroke="#10b981" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
        <circle cx="18.5" cy="12" r="2.5" fill="#10b981" fillOpacity="0.2" stroke="#10b981" strokeWidth="1.2"/>
        <path d="M17.2 12l1 1 1.8-1.8" stroke="#10b981" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
);

// Navigation Button Component
interface NavButtonProps {
    icon: React.ReactNode;
    label: string;
    count: number;
    isActive: boolean;
    onClick: () => void;
}

const NavButton: React.FC<NavButtonProps> = ({ icon, label, count, isActive, onClick }) => {
    return (
        <button
            onClick={onClick}
            className={`
                group relative flex items-center gap-3 px-4 py-3 rounded-xl font-semibold text-sm
                transition-all duration-300 ease-out transform hover:scale-105 active:scale-95
                ${isActive 
                    ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/25' 
                    : 'bg-white text-slate-600 hover:bg-emerald-50 hover:text-emerald-600 border border-slate-200/60 hover:border-emerald-200'
                }
            `}
        >
            <div className={`transition-all duration-300 ${isActive ? 'scale-110' : 'group-hover:scale-110'}`}>
                {icon}
            </div>
            
            <span className="font-medium whitespace-nowrap tracking-wide">
                {label}
            </span>
            
            <span className={`
                ml-1 px-2 py-0.5 rounded-full text-xs font-bold
                transition-all duration-300
                ${isActive 
                    ? 'bg-white/20 text-white' 
                    : 'bg-slate-100 text-slate-500 group-hover:bg-emerald-100 group-hover:text-emerald-600'
                }
            `}>
                {count}
            </span>
            
            {/* Active indicator */}
            {isActive && (
                <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-emerald-400 to-emerald-600 opacity-90 -z-10" />
            )}
            
            {/* Hover glow effect */}
            <div className={`
                absolute inset-0 rounded-xl bg-gradient-to-r from-emerald-400/20 to-emerald-600/20 
                opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10
                ${isActive ? 'hidden' : ''}
            `} />
        </button>
    );
};

// Main Enhanced Navbar Component
interface EnhancedNavbarProps {
    currentView: string;
    onViewChange: (view: string) => void;
}

const EnhancedNavbar: React.FC<EnhancedNavbarProps> = ({ currentView, onViewChange }) => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const [activeCategory, setActiveCategory] = useState('about'); // Default to 'about' for Genel Bilgiler

    // Scroll effect
    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Mobile detection
    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 1024);
        };
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const navItems = [
        {
            id: 'search',
            icon: <SearchIcon />,
            label: 'Tümü',
            count: 20,
            view: 'app'
        },
        {
            id: 'general',
            icon: <GeneralInfoIcon />,
            label: 'Genel Bilgiler',
            count: 4,
            view: 'about'
        },
        {
            id: 'guide',
            icon: <UserGuideIcon />,
            label: 'Kullanım',
            count: 4,
            view: 'guide'
        },
        {
            id: 'technical',
            icon: <TechnicalIcon />,
            label: 'Teknik',
            count: 4,
            view: 'technical'
        },
        {
            id: 'formulas',
            icon: <FormulaIcon />,
            label: 'Formüller',
            count: 4,
            view: 'formulas'
        },
        {
            id: 'macros',
            icon: <VBAMacroIcon />,
            label: 'VBA Makroları',
            count: 4,
            view: 'macros'
        }
    ];

    return (
        <div className={`
            sticky top-0 z-50 transition-all duration-300 
            ${isScrolled 
                ? 'bg-white/95 backdrop-blur-md shadow-lg border-b border-slate-200/60' 
                : 'bg-white/80 backdrop-blur-sm'
            }
        `}>
            {/* Main Navigation */}
            <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                <div className="flex items-center justify-between">
                    {/* Logo Area */}
                    <div className="flex items-center gap-4">
                        <button 
                            onClick={() => onViewChange('landing')}
                            className="flex items-center gap-3 hover:opacity-80 transition-opacity"
                        >
                            <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl flex items-center justify-center shadow-md">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                                    <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" fill="white" fillOpacity="0.9"/>
                                    <path d="M14 2v6h6" stroke="white" strokeWidth="1.5"/>
                                    <path d="M16 13H8M16 17H8M10 9H8" stroke="#10b981" strokeWidth="1.2"/>
                                </svg>
                            </div>
                            <div className="hidden sm:block">
                                <h1 className="text-xl font-bold text-slate-800">
                                    <span className="text-emerald-600">Excel</span>Bot AI
                                </h1>
                                <p className="text-xs text-slate-500">Formül Yardımcısı</p>
                            </div>
                        </button>
                    </div>

                    {/* Desktop Navigation */}
                    {!isMobile && (
                        <div className="flex items-center gap-2">
                            {navItems.map((item) => (
                                <NavButton
                                    key={item.id}
                                    icon={item.icon}
                                    label={item.label}
                                    count={item.count}
                                    isActive={activeCategory === item.view}
                                    onClick={() => {
                                        setActiveCategory(item.view);
                                        onViewChange(item.view);
                                    }}
                                />
                            ))}
                        </div>
                    )}

                    {/* Mobile Toggle */}
                    {isMobile && (
                        <button className="p-2 rounded-lg text-slate-600 hover:bg-emerald-50">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M4 6h16M4 12h16M4 18h16"/>
                            </svg>
                        </button>
                    )}
                </div>

                {/* Mobile Navigation */}
                {isMobile && (
                    <div className="mt-4 flex flex-wrap gap-2">
                        {navItems.map((item) => (
                            <NavButton
                                key={item.id}
                                icon={item.icon}
                                label={item.label}
                                count={item.count}
                                isActive={activeCategory === item.view}
                                onClick={() => {
                                    setActiveCategory(item.view);
                                    onViewChange(item.view);
                                }}
                            />
                        ))}
                    </div>
                )}
            </div>

            {/* Enhanced Progress Bar */}
            <div className="h-1 bg-gradient-to-r from-emerald-200 via-emerald-500 to-emerald-200">
                <div className="h-full bg-gradient-to-r from-emerald-400 to-emerald-600 transform origin-left transition-transform duration-1000 ease-out scale-x-75" />
            </div>
        </div>
    );
};

export default EnhancedNavbar;
