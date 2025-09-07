import React, { useState, useEffect } from 'react';

// Icon Components - Modern Green Design
const HomeIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none">
    <path d="M12 2.5l9 7.2v11.8c0 0.8-0.7 1.5-1.5 1.5h-15c-0.8 0-1.5-0.7-1.5-1.5V9.7l9-7.2z" fill="#10b981" fillOpacity="0.1" stroke="#10b981" strokeWidth="1.8" strokeLinejoin="round"/>
    <path d="M9 22V13h6v9" stroke="#10b981" strokeWidth="1.8" strokeLinecap="round"/>
    <circle cx="11" cy="17" r="0.8" fill="#10b981"/>
  </svg>
);

const SparklesIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none">
    <g stroke="#10b981" strokeWidth="1.8" strokeLinecap="round">
      <path d="M12 2l-1.5 4.5c-0.3 0.9-1.1 1.7-2 2L4 10l4.5 1.5c0.9 0.3 1.7 1.1 2 2L12 18l1.5-4.5c0.3-0.9 1.1-1.7 2-2L20 10l-4.5-1.5c-0.9-0.3-1.7-1.1-2-2L12 2z" fill="#10b981" fillOpacity="0.15"/>
      <path d="M6 2v3M20 17v3M5 3h3M18 19h3"/>
    </g>
    <circle cx="12" cy="10" r="1" fill="#10b981"/>
    <circle cx="8" cy="6" r="0.5" fill="#10b981"/>
    <circle cx="19" cy="19" r="0.5" fill="#10b981"/>
  </svg>
);

const KeyboardIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none">
    <rect x="2" y="6" width="20" height="12" rx="3" fill="#10b981" fillOpacity="0.1" stroke="#10b981" strokeWidth="1.6"/>
    <g fill="#10b981">
      <rect x="4" y="8" width="2" height="2" rx="0.5"/>
      <rect x="7" y="8" width="2" height="2" rx="0.5"/>
      <rect x="10" y="8" width="2" height="2" rx="0.5"/>
      <rect x="13" y="8" width="2" height="2" rx="0.5"/>
      <rect x="16" y="8" width="2" height="2" rx="0.5"/>
      <rect x="4.5" y="11" width="2" height="2" rx="0.5"/>
      <rect x="7.5" y="11" width="2" height="2" rx="0.5"/>
      <rect x="10.5" y="11" width="2" height="2" rx="0.5"/>
      <rect x="13.5" y="11" width="2" height="2" rx="0.5"/>
      <rect x="16.5" y="11" width="2" height="2" rx="0.5"/>
      <rect x="6" y="14" width="8" height="2" rx="0.5"/>
    </g>
  </svg>
);

const BookOpenIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none">
    <path d="M2 4h6a4 4 0 0 1 4 4v12a3 3 0 0 0-3-3H2z" fill="#10b981" fillOpacity="0.15" stroke="#10b981" strokeWidth="1.6" strokeLinejoin="round"/>
    <path d="M22 4h-6a4 4 0 0 0-4 4v12a3 3 0 0 1 3-3h7z" fill="#10b981" fillOpacity="0.1" stroke="#10b981" strokeWidth="1.6" strokeLinejoin="round"/>
    <path d="M12 8v12" stroke="#10b981" strokeWidth="1.2"/>
    <g stroke="#10b981" strokeWidth="1" opacity="0.7">
      <path d="M5 9h3M5 12h4M5 15h2"/>
      <path d="M16 9h3M15 12h4M17 15h2"/>
    </g>
  </svg>
);

const InfoIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="12" r="9" fill="#10b981" fillOpacity="0.1" stroke="#10b981" strokeWidth="1.8"/>
    <path d="M12 16v-4" stroke="#10b981" strokeWidth="2.2" strokeLinecap="round"/>
    <circle cx="12" cy="8" r="1" fill="#10b981"/>
    <circle cx="12" cy="12" r="0.5" fill="#10b981" fillOpacity="0.6"/>
  </svg>
);

const HelpCircleIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="12" r="9" fill="#10b981" fillOpacity="0.1" stroke="#10b981" strokeWidth="1.8"/>
    <path d="M9.5 9a2.5 2.5 0 0 1 5 1c0 1.5-2.5 2.5-2.5 2.5" stroke="#10b981" strokeWidth="2" strokeLinecap="round" fill="none"/>
    <circle cx="12" cy="16" r="1" fill="#10b981"/>
    <path d="M8 8l1 1M15 8l1 1" stroke="#10b981" strokeWidth="1.2" strokeLinecap="round" opacity="0.6"/>
  </svg>
);

const UserIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="8" r="4" fill="#10b981" fillOpacity="0.15" stroke="#10b981" strokeWidth="1.8"/>
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" fill="none" stroke="#10b981" strokeWidth="1.8" strokeLinecap="round"/>
    <circle cx="12" cy="8" r="2" fill="#10b981" fillOpacity="0.8"/>
    <path d="M8 21c0-2.2 1.8-4 4-4s4 1.8 4 4" fill="#10b981" fillOpacity="0.1"/>
  </svg>
);

const LoginIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none">
    <rect x="14" y="3" width="7" height="18" rx="2" fill="#10b981" fillOpacity="0.1" stroke="#10b981" strokeWidth="1.6"/>
    <path d="M10 17l5-5-5-5" stroke="#10b981" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
    <path d="M15 12H3" stroke="#10b981" strokeWidth="2" strokeLinecap="round"/>
    <circle cx="15" cy="12" r="1" fill="#10b981"/>
  </svg>
);

const LogoutIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none">
    <rect x="3" y="3" width="8" height="18" rx="2" fill="#10b981" fillOpacity="0.1" stroke="#10b981" strokeWidth="1.6"/>
    <path d="M16 17l5-5-5-5" stroke="#10b981" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
    <path d="M21 12H9" stroke="#10b981" strokeWidth="2" strokeLinecap="round"/>
    <circle cx="9" cy="12" r="1" fill="#10b981"/>
  </svg>
);

const ChevronDownIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none">
    <path d="M7 10l5 5 5-5" stroke="#10b981" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
    <circle cx="12" cy="12" r="8" fill="none" stroke="#10b981" strokeWidth="0.8" opacity="0.3"/>
  </svg>
);

const ExcelLogo = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none">
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

const SheetIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"></path>
    <polyline points="14 2 14 8 20 8"></polyline>
    <line x1="16" y1="13" x2="8" y2="13"></line>
    <line x1="16" y1="17" x2="8" y2="17"></line>
    <line x1="10" y1="9" x2="8" y2="9"></line>
  </svg>
);

const MenuIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
    <g stroke="#10b981" strokeWidth="2.5" strokeLinecap="round">
      <path d="M4 6h16"/>
      <path d="M4 12h16"/>
      <path d="M4 18h16"/>
    </g>
    <g fill="#10b981" opacity="0.4">
      <circle cx="3" cy="6" r="1"/>
      <circle cx="3" cy="12" r="1"/>
      <circle cx="3" cy="18" r="1"/>
    </g>
  </svg>
);

const XIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="12" r="9" fill="#10b981" fillOpacity="0.1" stroke="#10b981" strokeWidth="1.2"/>
    <g stroke="#10b981" strokeWidth="2.5" strokeLinecap="round">
      <path d="M16 8l-8 8"/>
      <path d="M8 8l8 8"/>
    </g>
  </svg>
);

// NavButton Component
interface NavButtonProps {
  onClick: () => void;
  isActive: boolean;
  icon: React.ReactNode;
  label: string;
}

const NavButton: React.FC<NavButtonProps> = ({ onClick, isActive, icon, label }) => (
  <button
    onClick={onClick}
    className={`
      relative flex items-center gap-2 px-4 py-2 rounded-lg font-semibold
      transition-all duration-200 text-sm whitespace-nowrap tracking-wide
      font-['Inter',_'Poppins',_sans-serif] antialiased
      ${isActive 
        ? 'bg-emerald-100 text-emerald-700 shadow-sm' 
        : 'text-slate-600 hover:text-emerald-600 hover:bg-emerald-50'
      }
    `}
  >
    {icon}
    <span>{label}</span>
    {isActive && (
      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1/2 h-0.5 bg-emerald-600 rounded-full"></div>
    )}
  </button>
);

// IconButton Component
interface IconButtonProps {
  onClick: () => void;
  icon: React.ReactNode;
  tooltip: string;
  variant?: 'ghost' | 'solid';
}

const IconButton: React.FC<IconButtonProps> = ({ onClick, icon, tooltip, variant = 'ghost' }) => (
  <button
    onClick={onClick}
    title={tooltip}
    className={`
      relative p-2 rounded-lg transition-all duration-200 group
      ${variant === 'ghost' 
        ? 'text-slate-600 hover:text-emerald-600 hover:bg-emerald-50' 
        : 'bg-emerald-600 text-white hover:bg-emerald-700'
      }
    `}
  >
    {icon}
    <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
      <div className="bg-slate-800 text-white text-xs px-2 py-1 rounded whitespace-nowrap">
        {tooltip}
      </div>
    </div>
  </button>
);

// Main ModernNavbar Component
interface ModernNavbarProps {
  currentView: 'landing' | 'app' | 'about' | 'faq' | 'login' | 'register' | 'profile' | 'settings';
  onViewChange: (view: 'landing' | 'app' | 'about' | 'faq' | 'login' | 'register' | 'profile' | 'settings') => void;
  onOpenShortcuts: () => void;
  onOpenHelp: () => void;
  isAuthenticated?: boolean;
  user?: { fullName: string; profileImage?: string } | null;
  onLogout?: () => void;
}

export const ModernNavbar: React.FC<ModernNavbarProps> = ({
  currentView,
  onViewChange,
  onOpenShortcuts,
  onOpenHelp,
  isAuthenticated = false,
  user = null,
  onLogout = () => {}
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  // Scroll effect for navbar
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when view changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [currentView]);

  return (
    <>
      <header className={`
        sticky top-0 z-30 transition-all duration-300
        ${isScrolled
          ? 'bg-white/95 backdrop-blur-md shadow-lg border-b border-slate-200/60'
          : 'bg-white/80 backdrop-blur-sm border-b border-slate-200/40'
        }
      `}>
        <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            
            {/* Logo and Brand - Enhanced */}
            <div className="flex items-center gap-3 lg:gap-4">
              <div className="group">
                <div className="
                  flex-shrink-0 bg-gradient-to-br from-emerald-100 to-emerald-50
                  text-emerald-600 p-2 lg:p-2.5 rounded-xl shadow-sm
                  group-hover:shadow-md group-hover:scale-105 transition-all duration-200
                  ring-1 ring-emerald-200/50
                ">
                  <ExcelLogo />
                </div>
              </div>
              
              <div className="hidden sm:block">
                <h1 className="
                  text-xl lg:text-2xl font-bold bg-gradient-to-r 
                  from-slate-800 to-slate-600 bg-clip-text text-transparent
                  hover:from-emerald-700 hover:to-emerald-600 transition-all duration-300
                  font-['Poppins',_'Inter',_sans-serif] antialiased
                ">
                  <span className="
                    text-emerald-600 font-['JetBrains_Mono',_monospace] bg-emerald-50 px-3 py-1.5 rounded-lg 
                    border border-emerald-200 shadow-md text-base
                    hover:bg-emerald-100 transition-colors duration-200
                    before:content-['='] before:text-emerald-700 before:font-bold
                  ">ExcelBot AI:</span> 
                </h1>
                <p className="text-xs text-slate-600 font-bold mt-1.5 drop-shadow-md text-shadow-lg font-['Inter',_sans-serif] tracking-wide antialiased">
                  AI-Powered Formül & Makro Desteği
                </p>
              </div>
              
              {/* Mobile short title */}
              <div className="sm:hidden">
                <h1 className="text-lg font-bold text-slate-800 font-['Poppins',_'Inter',_sans-serif] antialiased"><span className="text-emerald-600 font-['JetBrains_Mono',_monospace]">ExcelBot</span> AI</h1>
                <p className="text-xs text-slate-500 font-['Inter',_sans-serif] tracking-wide antialiased">Formül Yardımcısı</p>
              </div>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-1">
              <NavButton
                onClick={() => onViewChange('landing')}
                isActive={currentView === 'landing'}
                icon={<HomeIcon />}
                label="Ana Sayfa"
              />
              
              <NavButton
                onClick={() => onViewChange('app')}
                isActive={currentView === 'app'}
                icon={<SparklesIcon />}
                label="Uygulama"
              />
              
              <NavButton
                onClick={() => onViewChange('about')}
                isActive={currentView === 'about'}
                icon={<InfoIcon />}
                label="Hakkında"
              />
              
              <NavButton
                onClick={() => onViewChange('faq')}
                isActive={currentView === 'faq'}
                icon={<HelpCircleIcon />}
                label="SSS"
              />
              
              <div className="w-px h-6 bg-slate-200 mx-2" />
              
              <IconButton
                onClick={onOpenShortcuts}
                icon={<KeyboardIcon />}
                tooltip="Klavye Kısayolları"
                variant="ghost"
              />
              
              <IconButton
                onClick={onOpenHelp}
                icon={<BookOpenIcon />}
                tooltip="Yardım Merkezi"
                variant="ghost"
              />
              
              {/* Authentication Section */}
              <div className="ml-4 flex items-center gap-3">
                {isAuthenticated && user ? (
                  <div className="relative">
                    <button
                      onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                      className="flex items-center gap-2 px-3 py-2 rounded-lg text-slate-700 hover:bg-emerald-50 transition-colors"
                    >
                      <div className="w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center">
                        {user.profileImage ? (
                          <img src={user.profileImage} alt={user.fullName} className="w-8 h-8 rounded-full object-cover" />
                        ) : (
                          <span className="text-sm font-medium text-emerald-600">
                            {user.fullName.split(' ').map(n => n[0]).join('').toUpperCase()}
                          </span>
                        )}
                      </div>
                      <span className="font-medium hidden xl:inline">{user.fullName}</span>
                      <ChevronDownIcon />
                    </button>
                    
                    {isUserMenuOpen && (
                      <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-slate-200 py-2 z-50">
                        <button
                          onClick={() => {
                            onViewChange('profile');
                            setIsUserMenuOpen(false);
                          }}
                          className="w-full flex items-center gap-3 px-4 py-2 text-slate-700 hover:bg-emerald-50 transition-colors text-left"
                        >
                          <UserIcon />
                          <span>Profil</span>
                        </button>
                        <button
                          onClick={() => {
                            onViewChange('settings');
                            setIsUserMenuOpen(false);
                          }}
                          className="w-full flex items-center gap-3 px-4 py-2 text-slate-700 hover:bg-emerald-50 transition-colors text-left"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
                          <span>Ayarlar</span>
                        </button>
                        <div className="border-t border-slate-200 my-1"></div>
                        <button
                          onClick={() => {
                            onLogout();
                            setIsUserMenuOpen(false);
                          }}
                          className="w-full flex items-center gap-3 px-4 py-2 text-red-600 hover:bg-red-50 transition-colors text-left"
                        >
                          <LogoutIcon />
                          <span>Çıkış Yap</span>
                        </button>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => onViewChange('login')}
                      className="flex items-center gap-2 px-4 py-2 text-slate-600 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors font-semibold font-['Inter',_'Poppins',_sans-serif] tracking-wide antialiased"
                    >
                      <LoginIcon />
                      <span>Giriş</span>
                    </button>
                    <button
                      onClick={() => onViewChange('register')}
                      className="bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white px-4 py-2 rounded-lg font-semibold font-['Inter',_'Poppins',_sans-serif] tracking-wide transition-all duration-200 shadow-sm hover:shadow-md transform hover:scale-105 active:scale-95 antialiased"
                    >
                      Kayıt Ol
                    </button>
                  </div>
                )}
              </div>
            </nav>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden p-2 rounded-lg text-slate-600 hover:text-emerald-600 hover:bg-emerald-50 transition-colors"
            >
              {isMenuOpen ? <XIcon /> : <MenuIcon />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isMenuOpen && (
          <div className="lg:hidden border-t border-slate-200/40 bg-white/95 backdrop-blur-md">
            <div className="max-w-screen-2xl mx-auto px-4 py-4 space-y-2">
              <button
                onClick={() => onViewChange('landing')}
                className={`
                  w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-all duration-200
                  ${currentView === 'landing'
                    ? 'bg-emerald-100 text-emerald-700 shadow-sm'
                    : 'text-slate-700 hover:bg-emerald-50 hover:text-emerald-600'
                  }
                `}
              >
                <HomeIcon />
                <span className="font-semibold font-['Inter',_'Poppins',_sans-serif] tracking-wide antialiased">Ana Sayfa</span>
              </button>
              
              <button
                onClick={() => onViewChange('app')}
                className={`
                  w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-all duration-200
                  ${currentView === 'app'
                    ? 'bg-emerald-100 text-emerald-700 shadow-sm'
                    : 'text-slate-700 hover:bg-emerald-50 hover:text-emerald-600'
                  }
                `}
              >
                <SparklesIcon />
                <span className="font-semibold font-['Inter',_'Poppins',_sans-serif] tracking-wide antialiased">Uygulama</span>
              </button>
              
              <button
                onClick={() => onViewChange('about')}
                className={`
                  w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-all duration-200
                  ${currentView === 'about'
                    ? 'bg-emerald-100 text-emerald-700 shadow-sm'
                    : 'text-slate-700 hover:bg-emerald-50 hover:text-emerald-600'
                  }
                `}
              >
                <InfoIcon />
                <span className="font-semibold font-['Inter',_'Poppins',_sans-serif] tracking-wide antialiased">Hakkında</span>
              </button>
              
              <button
                onClick={() => onViewChange('faq')}
                className={`
                  w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-all duration-200
                  ${currentView === 'faq'
                    ? 'bg-emerald-100 text-emerald-700 shadow-sm'
                    : 'text-slate-700 hover:bg-emerald-50 hover:text-emerald-600'
                  }
                `}
              >
                <HelpCircleIcon />
                <span className="font-semibold font-['Inter',_'Poppins',_sans-serif] tracking-wide antialiased">SSS</span>
              </button>
              
              <div className="border-t border-slate-200 my-3"></div>
              
              <button
                onClick={onOpenShortcuts}
                className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left text-slate-700 hover:bg-emerald-50 hover:text-emerald-600 transition-all duration-200"
              >
                <KeyboardIcon />
                <span className="font-semibold font-['Inter',_'Poppins',_sans-serif] tracking-wide antialiased">Klavye Kısayolları</span>
              </button>
              
              <button
                onClick={onOpenHelp}
                className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left text-slate-700 hover:bg-emerald-50 hover:text-emerald-600 transition-all duration-200"
              >
                <BookOpenIcon />
                <span className="font-semibold font-['Inter',_'Poppins',_sans-serif] tracking-wide antialiased">Yardım Merkezi</span>
              </button>
              
              {/* Mobile Authentication */}
              {isAuthenticated && user ? (
                <div className="border-t border-slate-200 pt-3 mt-3">
                  <div className="flex items-center gap-3 px-4 py-2 mb-2">
                    <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center">
                      {user.profileImage ? (
                        <img src={user.profileImage} alt={user.fullName} className="w-10 h-10 rounded-full object-cover" />
                      ) : (
                        <span className="text-sm font-medium text-emerald-600">
                          {user.fullName.split(' ').map(n => n[0]).join('').toUpperCase()}
                        </span>
                      )}
                    </div>
                    <div>
                      <p className="font-medium text-slate-800">{user.fullName}</p>
                      <p className="text-sm text-slate-600">Hoş geldiniz</p>
                    </div>
                  </div>
                  
                  <button
                    onClick={() => onViewChange('profile')}
                    className={`
                      w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-all duration-200
                      ${currentView === 'profile'
                        ? 'bg-emerald-100 text-emerald-700 shadow-sm'
                        : 'text-slate-700 hover:bg-emerald-50 hover:text-emerald-600'
                      }
                    `}
                  >
                    <UserIcon />
                    <span className="font-semibold font-['Inter',_'Poppins',_sans-serif] tracking-wide antialiased">Profil</span>
                  </button>
                  
                  <button
                    onClick={() => onViewChange('settings')}
                    className={`
                      w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-all duration-200
                      ${currentView === 'settings'
                        ? 'bg-emerald-100 text-emerald-700 shadow-sm'
                        : 'text-slate-700 hover:bg-emerald-50 hover:text-emerald-600'
                      }
                    `}
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <span className="font-semibold font-['Inter',_'Poppins',_sans-serif] tracking-wide antialiased">Ayarlar</span>
                  </button>
                  
                  <button
                    onClick={onLogout}
                    className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left text-red-600 hover:bg-red-50 transition-all duration-200"
                  >
                    <LogoutIcon />
                    <span className="font-semibold font-['Inter',_'Poppins',_sans-serif] tracking-wide antialiased">Çıkış Yap</span>
                  </button>
                </div>
              ) : (
                <div className="border-t border-slate-200 pt-3 mt-3 space-y-2">
                  <button
                    onClick={() => onViewChange('login')}
                    className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left text-slate-700 hover:bg-emerald-50 hover:text-emerald-600 transition-all duration-200"
                  >
                    <LoginIcon />
                    <span className="font-semibold font-['Inter',_'Poppins',_sans-serif] tracking-wide antialiased">Giriş Yap</span>
                  </button>
                  
                  <button
                    onClick={() => onViewChange('register')}
                    className="w-full bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white px-4 py-3 rounded-lg font-semibold font-['Inter',_'Poppins',_sans-serif] tracking-wide transition-all duration-200 shadow-sm hover:shadow-md antialiased"
                  >
                    Kayıt Ol
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </header>
    </>
  );
};

export default ModernNavbar;