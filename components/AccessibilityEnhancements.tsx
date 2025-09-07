import React, { useState, useEffect, useRef, useCallback } from 'react';

// Skip Link Component for keyboard navigation
export const SkipLink: React.FC<{ href: string; children: React.ReactNode }> = ({ href, children }) => (
  <a
    href={href}
    className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 bg-emerald-600 text-white px-4 py-2 rounded-md font-medium"
    role="link"
    aria-label="Skip to main content"
  >
    {children}
  </a>
);

// Focus management hook
export const useFocusManagement = () => {
  const focusTrapRef = useRef<HTMLElement | null>(null);
  
  const trapFocus = useCallback((element: HTMLElement) => {
    const focusableElements = element.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    const firstElement = focusableElements[0] as HTMLElement;
    const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Tab') {
        if (e.shiftKey) {
          if (document.activeElement === firstElement) {
            e.preventDefault();
            lastElement?.focus();
          }
        } else {
          if (document.activeElement === lastElement) {
            e.preventDefault();
            firstElement?.focus();
          }
        }
      }
      if (e.key === 'Escape') {
        firstElement?.focus();
      }
    };

    element.addEventListener('keydown', handleKeyDown);
    firstElement?.focus();

    return () => {
      element.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return { trapFocus, focusTrapRef };
};

// Screen reader announcements
export const ScreenReaderAnnouncer: React.FC = () => {
  const [announcements, setAnnouncements] = useState<string[]>([]);
  
  const announce = useCallback((message: string) => {
    setAnnouncements(prev => [...prev, message]);
    // Clean up old announcements
    setTimeout(() => {
      setAnnouncements(prev => prev.slice(1));
    }, 1000);
  }, []);

  // Expose announce function globally
  useEffect(() => {
    (window as any).announceToScreenReader = announce;
    return () => {
      delete (window as any).announceToScreenReader;
    };
  }, [announce]);

  return (
    <div 
      className="sr-only" 
      aria-live="polite" 
      aria-atomic="true"
      role="status"
      aria-label="Screen reader announcements"
    >
      {announcements.map((announcement, index) => (
        <div key={index}>{announcement}</div>
      ))}
    </div>
  );
};

// High contrast mode support
export const useHighContrast = () => {
  const [isHighContrast, setIsHighContrast] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-contrast: high)');
    setIsHighContrast(mediaQuery.matches);
    
    const handler = (e: MediaQueryListEvent) => setIsHighContrast(e.matches);
    mediaQuery.addEventListener('change', handler);
    
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  useEffect(() => {
    if (isHighContrast) {
      document.documentElement.classList.add('high-contrast');
    } else {
      document.documentElement.classList.remove('high-contrast');
    }
  }, [isHighContrast]);

  return isHighContrast;
};

// Reduced motion support
export const useReducedMotion = () => {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);
    
    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handler);
    
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  useEffect(() => {
    if (prefersReducedMotion) {
      document.documentElement.classList.add('reduce-motion');
    } else {
      document.documentElement.classList.remove('reduce-motion');
    }
  }, [prefersReducedMotion]);

  return prefersReducedMotion;
};

// Keyboard navigation helpers
export const useKeyboardNavigation = () => {
  const [isKeyboardUser, setIsKeyboardUser] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Tab') {
        setIsKeyboardUser(true);
      }
    };

    const handleMouseDown = () => {
      setIsKeyboardUser(false);
    };

    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('mousedown', handleMouseDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('mousedown', handleMouseDown);
    };
  }, []);

  useEffect(() => {
    if (isKeyboardUser) {
      document.body.classList.add('keyboard-navigation');
    } else {
      document.body.classList.remove('keyboard-navigation');
    }
  }, [isKeyboardUser]);

  return isKeyboardUser;
};

// Enhanced button component with accessibility
export const AccessibleButton: React.FC<{
  children: React.ReactNode;
  onClick: () => void;
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  loading?: boolean;
  ariaLabel?: string;
  ariaDescribedBy?: string;
  type?: 'button' | 'submit' | 'reset';
  className?: string;
}> = ({ 
  children, 
  onClick, 
  variant = 'primary', 
  size = 'md', 
  disabled = false,
  loading = false,
  ariaLabel,
  ariaDescribedBy,
  type = 'button',
  className = ''
}) => {
  const baseClasses = `
    inline-flex items-center justify-center font-medium rounded-lg
    focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500
    disabled:opacity-50 disabled:cursor-not-allowed
    transition-all duration-200
  `;

  const variantClasses = {
    primary: 'bg-emerald-600 text-white hover:bg-emerald-700 active:bg-emerald-800',
    secondary: 'bg-slate-200 text-slate-800 hover:bg-slate-300 active:bg-slate-400',
    ghost: 'bg-transparent text-slate-600 hover:bg-slate-100 active:bg-slate-200'
  };

  const sizeClasses = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg'
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      aria-label={ariaLabel}
      aria-describedby={ariaDescribedBy}
      aria-busy={loading}
      className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
    >
      {loading && (
        <svg 
          className="animate-spin -ml-1 mr-2 h-4 w-4" 
          xmlns="http://www.w3.org/2000/svg" 
          fill="none" 
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <circle 
            className="opacity-25" 
            cx="12" 
            cy="12" 
            r="10" 
            stroke="currentColor" 
            strokeWidth="4"
          />
          <path 
            className="opacity-75" 
            fill="currentColor" 
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          />
        </svg>
      )}
      {children}
    </button>
  );
};

// Enhanced input component with accessibility
export const AccessibleInput: React.FC<{
  id: string;
  label: string;
  type?: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  error?: string;
  helpText?: string;
  autoComplete?: string;
  className?: string;
}> = ({
  id,
  label,
  type = 'text',
  value,
  onChange,
  placeholder,
  required = false,
  disabled = false,
  error,
  helpText,
  autoComplete,
  className = ''
}) => {
  const inputClasses = `
    block w-full px-3 py-2 border rounded-md shadow-sm
    focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500
    disabled:bg-gray-50 disabled:text-gray-500 disabled:cursor-not-allowed
    ${error ? 'border-red-300 text-red-900' : 'border-gray-300'}
    ${className}
  `;

  return (
    <div>
      <label 
        htmlFor={id} 
        className="block text-sm font-medium text-gray-700 mb-1"
      >
        {label}
        {required && <span className="text-red-500 ml-1" aria-label="required">*</span>}
      </label>
      
      <input
        id={id}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        required={required}
        disabled={disabled}
        autoComplete={autoComplete}
        aria-invalid={error ? 'true' : 'false'}
        aria-describedby={
          error ? `${id}-error` : helpText ? `${id}-help` : undefined
        }
        className={inputClasses}
      />
      
      {helpText && !error && (
        <p id={`${id}-help`} className="mt-1 text-sm text-gray-500">
          {helpText}
        </p>
      )}
      
      {error && (
        <p id={`${id}-error`} className="mt-1 text-sm text-red-600" role="alert">
          {error}
        </p>
      )}
    </div>
  );
};

// Live region for dynamic content updates
export const LiveRegion: React.FC<{
  message: string;
  priority?: 'polite' | 'assertive';
  clearAfter?: number;
}> = ({ message, priority = 'polite', clearAfter = 5000 }) => {
  const [currentMessage, setCurrentMessage] = useState(message);

  useEffect(() => {
    setCurrentMessage(message);
    
    if (clearAfter && message) {
      const timer = setTimeout(() => {
        setCurrentMessage('');
      }, clearAfter);
      
      return () => clearTimeout(timer);
    }
  }, [message, clearAfter]);

  return (
    <div
      aria-live={priority}
      aria-atomic="true"
      className="sr-only"
      role="status"
    >
      {currentMessage}
    </div>
  );
};

// Progressive disclosure component
export const ProgressiveDisclosure: React.FC<{
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
  onToggle?: (isOpen: boolean) => void;
  className?: string;
}> = ({ title, children, defaultOpen = false, onToggle, className = '' }) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  const contentId = `disclosure-content-${Math.random().toString(36).substr(2, 9)}`;

  const handleToggle = () => {
    const newState = !isOpen;
    setIsOpen(newState);
    onToggle?.(newState);
  };

  return (
    <div className={className}>
      <button
        onClick={handleToggle}
        aria-expanded={isOpen}
        aria-controls={contentId}
        className="flex items-center justify-between w-full p-4 text-left bg-white border border-gray-200 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-emerald-500"
      >
        <span className="font-medium text-gray-900">{title}</span>
        <svg
          className={`w-5 h-5 text-gray-500 transition-transform duration-200 ${
            isOpen ? 'transform rotate-180' : ''
          }`}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden="true"
        >
          <path
            fillRule="evenodd"
            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
            clipRule="evenodd"
          />
        </svg>
      </button>
      
      <div
        id={contentId}
        className={`transition-all duration-200 overflow-hidden ${
          isOpen ? 'max-h-none opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="p-4 border-t border-gray-200">
          {children}
        </div>
      </div>
    </div>
  );
};

// Mobile responsive breakpoint hook
export const useBreakpoint = () => {
  const [breakpoint, setBreakpoint] = useState<'sm' | 'md' | 'lg' | 'xl' | '2xl'>('lg');

  useEffect(() => {
    const updateBreakpoint = () => {
      const width = window.innerWidth;
      if (width < 640) setBreakpoint('sm');
      else if (width < 768) setBreakpoint('md');
      else if (width < 1024) setBreakpoint('lg');
      else if (width < 1280) setBreakpoint('xl');
      else setBreakpoint('2xl');
    };

    updateBreakpoint();
    window.addEventListener('resize', updateBreakpoint);
    
    return () => window.removeEventListener('resize', updateBreakpoint);
  }, []);

  return {
    breakpoint,
    isMobile: breakpoint === 'sm',
    isTablet: breakpoint === 'md',
    isDesktop: ['lg', 'xl', '2xl'].includes(breakpoint),
    isSmall: ['sm', 'md'].includes(breakpoint),
    isLarge: ['xl', '2xl'].includes(breakpoint),
  };
};

// Accessibility enhancement provider
export const AccessibilityProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  useHighContrast();
  useReducedMotion();
  useKeyboardNavigation();

  return (
    <>
      <SkipLink href="#main-content">Skip to main content</SkipLink>
      <ScreenReaderAnnouncer />
      {children}
    </>
  );
};

export default AccessibilityProvider;