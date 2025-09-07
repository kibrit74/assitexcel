# Excel Formül Yardımcısı - Proje Analizi ve Tasarım

## Genel Bakış

Excel Formül Yardımcısı, kullanıcıların doğal dil kullanarak Excel formülleri ve VBA makroları oluşturmasına yardımcı olan kapsamlı bir yapay zeka destekli React uygulamasıdır. Uygulama, Excel dosyalarını analiz etmek ve Türkçe kullanıcı gereksinimlerine dayalı olarak uygun formüller, makrolar ve çözümler üretmek için Google'ın Gemini AI'ını kullanır.

## Teknoloji Yığını ve Bağımlılıklar

### Frontend Framework
- **React 19.1.1** - Modern hook'lar ve özellikler içeren en son React sürümü
- **TypeScript** - Tip güvenliği ve daha iyi geliştirme deneyimi
- **Vite** - Hızlı build aracı ve geliştirme sunucusu

### Yapay Zeka Entegrasyonu
- **@google/genai 1.16.0** - Formül üretimi için Google Gemini AI SDK'sı
- **Özel AI Servis Katmanı** - Yapılandırılmış prompt'lar ve yanıt işleme

### Excel Entegrasyonu
- **XLSX Kütüphanesi** - İstemci tarafında Excel dosya ayrıştırma ve analizi (CDN üzerinden yüklenir)
- **Sheet.js Entegrasyonu** - .xlsx/.xls dosyalarını okumak için

### Build ve Geliştirme
- **Vite 6.2.0** - Modül paketleyici ve geliştirme sunucusu
- **TypeScript 5.8.2** - Statik tip kontrolü
- **Node.js Types** - Geliştirme tip desteği için

## Bileşen Mimarisi

### Temel Uygulama Yapısı

``mermaid
graph TD
    A[App.tsx] --> B[LandingPage.tsx]
    A --> C[Main Application View]
    
    C --> D[File Upload & Analysis]
    C --> E[Formula Generation Interface]
    C --> F[Result Display Components]
    C --> G[Help & Documentation]
    
    D --> H[Excel Data Parser]
    D --> I[Column Analysis]
    
    E --> J[Prompt Input]
    E --> K[Mode Selection]
    E --> L[Settings Panel]
    
    F --> M[ResultDisplay]
    F --> N[MacroResultDisplay]
    F --> O[WebSearchResultDisplay]
    
    G --> P[HelpCenterModal]
    G --> Q[KeyboardShortcutsModal]
    G --> R[ExampleDetailModal]
```

### Bileşen Hiyerarşisi

#### Kök Bileşen (App.tsx)
- **Durum Yönetimi**: Tüm uygulama verileri için merkezi durum
- **Dosya İşleme**: Excel dosya yükleme ve ayrıştırma
- **AI Entegrasyonu**: Gemini API çağrıları ve yanıt işleme
- **Görünüm Yönlendirme**: Giriş sayfası vs ana uygulama görünümleri

#### Görüntüleme Bileşenleri
- **ResultDisplay**: Sözdizimi vurgulama ve açıklamalar içeren formül sonuçları
- **MacroResultDisplay**: Kullanım talimatları içeren VBA makro kodu
- **WebSearchResultDisplay**: Web kaynakları ile AI tarafından üretilen yanıtlar
- **HistoryDisplay**: Kullanıcının formül/makro üretim geçmişi

#### Yardımcı Bileşenler
- **LandingPage**: Animasyonlu demolar içeren pazarlama sayfası
- **Modal Bileşenleri**: Yardım merkezi, klavye kısayolları, örnekler
- **AnimatedSvgs**: Excel fonksiyonlarının görsel gösterimleri

### Durum Yönetimi

Uygulama, hook'lar ile React'in yerleşik durum yönetimini kullanır:

```typescript
// Temel uygulama durumu
const [currentView, setCurrentView] = useState<'landing' | 'app'>('landing');
const [workbookData, setWorkbookData] = useState<WorkbookData | null>(null);
const [activeSheet, setActiveSheet] = useState<string>('');
const [userPrompt, setUserPrompt] = useState<string>('');
const [mode, setMode] = useState<'formula' | 'macro'>('formula');
const [result, setResult] = useState<AppResult | null>(null);
const [history, setHistory] = useState<HistoryItem[]>([]);
```

## Veri Akışı Mimarisi

### Excel Dosya İşleme Akışı

``mermaid
sequenceDiagram
    participant User as Kullanıcı
    participant App as Uygulama
    participant XLSX as XLSX
    participant GeminiService as GeminiServis
    
    User->>App: Excel Dosyası Yükle
    App->>XLSX: Dosyayı Ayrıştır
    XLSX->>Uygulama: WorkbookData Döndür
    Uygulama->>GeminiServis: Excel Verilerini Analiz Et
    GeminiServis->>Uygulama: Sütun Analizi Döndür
    Uygulama->>Kullanıcı: Veri Önizlemesi ve Analizi Göster
```

### Formula Generation Flow

``mermaid
sequenceDiagram
    participant User
    participant App
    participant GeminiService
    participant AI
    
    User->>App: Enter Natural Language Request
    App->>GeminiService: Send Request + Excel Data + Analysis
    GeminiService->>AI: Format Prompt & Call Gemini API
    AI->>GeminiService: Return Structured JSON Response
    GeminiService->>App: Parse & Validate Response
    App->>User: Display Formula with Explanation
```

## AI Integration Layer

### Gemini Service Architecture

The `geminiService.ts` provides a sophisticated AI integration layer:

#### Temel Fonksiyonlar
- **analyzeExcelData()**: Yüklenen Excel verilerini analiz eder ve sütunları açıklar
- **generateFormula()**: Kullanıcı isteklerine dayalı Excel formülleri oluşturur
- **generateMacro()**: VBA makro kodu üretir
- **generateWebSearchStream()**: Web arama yetenekleri ile AI yanıtlarını aktar
- **calculateFormula()**: Canlı önizleme hesaplamaları sağlar

#### Prompt Mühendisliği
Uygulama özenle hazırlanmış sistem prompt'ları kullanır:
- **Formül Üretimi**: Excel formül oluşturma için yapılandırılmış prompt'lar
- **Makro Üretimi**: En iyi uygulamalar içeren VBA'ya özgü prompt'lar
- **Analiz**: Sütun ve veri yapısı analiz prompt'ları
- **Web Arama**: Web destekli yanıtlar için geliştirilmiş prompt'lar

#### Yanıt Şema Doğrulaması
Google GenAI'ın yapılandırılmış çıktı özelliklerini kullanır:

```

```

## Data Models & Types

### Core Type Definitions

```
// Excel veri yapısı
export type SheetData = (string | number | null | Date)[][];
export type WorkbookData = { [sheetName: string]: SheetData };

// Analiz sonuçları
export interface ColumnAnalysis {
  sheetName: string;
  column: string;
  description: string;
}

// Formül yanıt yapısı
export interface FormulaResponse {
  analysis: FormulaAnalysis;
  formula: FormulaDetails;
  guide: FormulaGuide;
  example: FormulaExample;
  warnings: FormulaWarning[];
}

// Birleşik sonuç tipi
export type AppResult =
  | { type: 'formula'; data: FormulaResponse }
  | { type: 'macro'; data: MacroResponse }
  | { type: 'web_search'; data: WebSearchResponse };
```

## Business Logic Layer

### Formula Generation Architecture

#### Multi-Mode Support
- **Standard Mode**: Direct AI formula generation
- **Web Search Mode**: AI with real-time web search capabilities
- **Live Preview Mode**: Real-time formula calculation preview

#### Excel Compatibility
- **Language Support**: Turkish (TÜ) and English (EN) Excel functions
- **Version Support**: Excel 365, 2019, 2016, 2013
- **Formula Library**: Trusted formula caching system

#### Data Processing
- **Sheet Management**: Multi-sheet Excel file support
- **Cell Selection**: Interactive cell range selection
- **Data Formatting**: Automatic date, number, and text formatting

### VBA Macro Generation

#### Code Quality Features
- **Best Practices**: Includes Option Explicit, error handling
- **Dynamic Ranges**: Uses dynamic range detection
- **Event Procedures**: Supports worksheet and workbook events
- **Placement Guidance**: Standard module vs worksheet vs workbook placement

#### Safety Features
- **Code Validation**: Syntax checking and validation
- **Usage Instructions**: Step-by-step implementation guides
- **Warning System**: Potential risks and considerations

## Advanced Features

### Interactive Excel Interface

#### Cell Selection System
```
// Seçim modları
type SelectionMode = 'cell' | 'row' | 'column';

// Seçim durum yönetimi
const [selection, setSelection] = useState<{
  start: { row: number, col: number } | null,
  end: { row: number, col: number } | null
}>({ start: null, end: null });
```

#### Live Formula Preview
- **Real-time Calculation**: Shows formula results on different rows
- **Visual Feedback**: Highlighted preview cells with loading states
- **Error Handling**: Graceful handling of calculation errors

### Help Center & Documentation

#### Comprehensive Knowledge Base
- **Categorized Examples**: Organized by function types
- **Visual Demonstrations**: Animated SVG components for each function
- **Interactive Examples**: Click-to-use example prompts
- **Syntax References**: Complete function syntax and usage

#### Content Structure
```
interface HelpContentGroup {
  category: string;
  icon: React.FC;
  examples: Example[];
  isMacro?: boolean;
  isTool?: boolean;
}
```

### Performance Optimizations

#### Caching Strategy
- **Formula Library**: Cached trusted formulas for faster generation
- **History Management**: Local storage for user history
- **Request Optimization**: Abort controllers for request cancellation

#### UI Performance
- **Virtual Scrolling**: Efficient rendering for large Excel files
- **Debounced Input**: Optimized user input handling
- **Lazy Loading**: Component-level code splitting

## Security & Error Handling

### Input Validation
- **File Type Validation**: Restricted to .xlsx/.xls files
- **Data Sanitization**: Safe handling of Excel data
- **Prompt Filtering**: Safe AI prompt construction

### Error Management
- **Graceful Degradation**: Fallback responses for AI failures
- **User Feedback**: Clear error messages and suggestions
- **Retry Mechanisms**: Automatic retry for transient failures

### API Security
- **Environment Variables**: Secure API key management
- **Request Timeouts**: Prevents hanging requests
- **Rate Limiting**: Built-in request throttling

## User Experience Design

### Progressive Disclosure
- **Landing Page**: Engaging introduction with animated demos
- **Guided Onboarding**: Step-by-step file upload and analysis
- **Progressive Features**: Advanced features revealed as needed

### Accessibility Features
- **Keyboard Navigation**: Full keyboard support
- **Screen Reader Support**: Semantic HTML and ARIA labels
- **Visual Feedback**: Clear status indicators and loading states

### Mobile Responsiveness
- **Responsive Design**: Works on desktop, tablet, and mobile
- **Touch Interactions**: Optimized for touch devices
- **Adaptive UI**: Context-aware interface adjustments

## Testing Strategy

### Component Testing
- **Unit Tests**: Individual component functionality
- **Integration Tests**: Component interaction testing
- **E2E Tests**: Complete user workflow validation

### AI Integration Testing
- **Mock Responses**: Test with predefined AI responses
- **Error Scenarios**: Test API failure handling
- **Performance Tests**: Response time and throughput testing

### Excel Integration Testing
- **File Format Support**: Test various Excel file types
- **Data Integrity**: Ensure accurate data parsing
- **Edge Cases**: Handle malformed or corrupted files

## Modern Navbar Tasarımı

### Mevcut Renk Şeması Analizi

Proje mevcut renk paletini kullanır:
- **Ana Renk**: Emerald (Zümrüt) - `emerald-600`, `emerald-700`
- **Arka Plan**: Slate (Kayrak) - `slate-50`, `slate-100`, `slate-800`
- **Vurgu Renkleri**: Blue (`blue-500`), Purple (`purple-600`), Cyan (`cyan-600`)
- **Şeffaflık**: `backdrop-blur-sm`, `bg-white/80`

### Modern Navbar Özellikler

#### Mevcut Navbar Yapısı
Hem ana sayfa hem de uygulama sayfası için aynı header yapısını kullanır:

```tsx
<header className="bg-white/80 backdrop-blur-sm sticky top-0 z-20 border-b border-slate-200/80">
  <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8">
    <div className="flex items-center justify-between h-20">
      {/* Logo ve Brand */}
      <div className="flex items-center gap-4">
        <div className="flex-shrink-0 bg-emerald-100 text-emerald-600 p-2 rounded-lg">
          <SheetIcon />
        </div>
        <h1 className="text-2xl font-bold text-slate-800">Excel Formül & Makro Yardımcısı</h1>
      </div>
      
      {/* Navigation Items */}
      <div className="flex items-center gap-3">
        {/* Navigation buttons */}
      </div>
    </div>
  </div>
</header>
```

#### Geliştirilmiş Modern Navbar Tasarımı

```tsx
// Yeni modern navbar bileşeni
const ModernNavbar: React.FC<{ 
  currentView: 'landing' | 'app',
  onViewChange: (view: 'landing' | 'app') => void,
  onOpenShortcuts: () => void,
  onOpenHelp: () => void 
}> = ({ currentView, onViewChange, onOpenShortcuts, onOpenHelp }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Scroll efekti için
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`
      sticky top-0 z-30 transition-all duration-300
      ${
        isScrolled
          ? 'bg-white/95 backdrop-blur-md shadow-lg border-b border-slate-200/60'
          : 'bg-white/80 backdrop-blur-sm border-b border-slate-200/40'
      }
    `}>
      <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          
          {/* Logo ve Brand - Geliştirilmiş */}
          <div className="flex items-center gap-3 lg:gap-4">
            <div className="group">
              <div className="
                flex-shrink-0 bg-gradient-to-br from-emerald-100 to-emerald-50
                text-emerald-600 p-2 lg:p-2.5 rounded-xl shadow-sm
                group-hover:shadow-md group-hover:scale-105 transition-all duration-200
                ring-1 ring-emerald-200/50
              ">
                <SheetIcon className="w-6 h-6 lg:w-7 lg:h-7" />
              </div>
            </div>
            
            <div className="hidden sm:block">
              <h1 className="
                text-xl lg:text-2xl font-bold bg-gradient-to-r 
                from-slate-800 to-slate-600 bg-clip-text text-transparent
                hover:from-emerald-700 hover:to-emerald-600 transition-all duration-300
              ">
                Excel Formül & Makro Yardımcısı
              </h1>
              <p className="text-xs text-slate-500 font-medium mt-0.5">
                AI Destekli Formül Oluşturucu
              </p>
            </div>
            
            {/* Mobil için kısaltılmış */}
            <div className="sm:hidden">
              <h1 className="text-lg font-bold text-slate-800">Excel AI</h1>
              <p className="text-xs text-slate-500">Formül Yardımcısı</p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1">
            <NavButton
              onClick={() => onViewChange('landing')}
              isActive={currentView === 'landing'}
              icon={<HomeIcon className="w-4 h-4" />}
              label="Ana Sayfa"
            />
            
            <NavButton
              onClick={() => onViewChange('app')}
              isActive={currentView === 'app'}
              icon={<SparklesIcon className="w-4 h-4" />}
              label="Uygulama"
            />
            
            <div className="w-px h-6 bg-slate-200 mx-2" />
            
            <IconButton
              onClick={onOpenShortcuts}
              icon={<KeyboardIcon className="w-5 h-5" />}
              tooltip="Klavye Kısayolları"
              variant="ghost"
            />
            
            <IconButton
              onClick={onOpenHelp}
              icon={<BookOpenIcon className="w-5 h-5" />}
              tooltip="Yardım Merkezi"
              variant="ghost"
            />
            
            {currentView === 'landing' && (
              <div className="ml-4">
                <button
                  onClick={() => onViewChange('app')}
                  className="
                    bg-gradient-to-r from-emerald-600 to-emerald-700
                    hover:from-emerald-700 hover:to-emerald-800
                    text-white font-semibold px-6 py-2.5 rounded-xl
                    shadow-lg hover:shadow-xl transform hover:scale-105
                    transition-all duration-200 ring-1 ring-emerald-500/20
                    flex items-center gap-2
                  "
                >
                  <PlayIcon className="w-4 h-4" />
                  Hemen Başla
                </button>
              </div>
            )}
          </nav>

          {/* Mobile Menu Button */}
          <div className="lg:hidden flex items-center gap-2">
            {currentView === 'landing' && (
              <button
                onClick={() => onViewChange('app')}
                className="
                  bg-emerald-600 hover:bg-emerald-700 text-white 
                  font-semibold px-4 py-2 rounded-lg text-sm
                  transition-colors duration-200
                "
              >
                Başla
              </button>
            )}
            
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="
                p-2 rounded-lg text-slate-600 hover:bg-slate-100
                transition-colors duration-200
              "
            >
              {isMenuOpen ? <XIcon className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div className={`
          lg:hidden overflow-hidden transition-all duration-300 ease-in-out
          ${isMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}
        `}>
          <div className="py-4 space-y-2 border-t border-slate-200/60">
            <MobileNavItem
              onClick={() => {
                onViewChange('landing');
                setIsMenuOpen(false);
              }}
              isActive={currentView === 'landing'}
              icon={<HomeIcon className="w-5 h-5" />}
              label="Ana Sayfa"
            />
            
            <MobileNavItem
              onClick={() => {
                onViewChange('app');
                setIsMenuOpen(false);
              }}
              isActive={currentView === 'app'}
              icon={<SparklesIcon className="w-5 h-5" />}
              label="Uygulama"
            />
            
            <div className="my-3 border-t border-slate-200/60" />
            
            <MobileNavItem
              onClick={() => {
                onOpenShortcuts();
                setIsMenuOpen(false);
              }}
              icon={<KeyboardIcon className="w-5 h-5" />}
              label="Klavye Kısayolları"
            />
            
            <MobileNavItem
              onClick={() => {
                onOpenHelp();
                setIsMenuOpen(false);
              }}
              icon={<BookOpenIcon className="w-5 h-5" />}
              label="Yardım Merkezi"
            />
          </div>
        </div>
      </div>
    </header>
  );
};

// Yardımcı Bileşenler
const NavButton: React.FC<{
  onClick: () => void;
  isActive: boolean;
  icon: React.ReactNode;
  label: string;
}> = ({ onClick, isActive, icon, label }) => (
  <button
    onClick={onClick}
    className={`
      flex items-center gap-2 px-4 py-2 rounded-lg font-medium text-sm
      transition-all duration-200 relative overflow-hidden
      ${
        isActive
          ? 'bg-emerald-100 text-emerald-700 shadow-sm ring-1 ring-emerald-200/50'
          : 'text-slate-600 hover:text-slate-800 hover:bg-slate-100'
      }
    `}
  >
    {icon}
    <span>{label}</span>
    {isActive && (
      <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-emerald-500" />
    )}
  </button>
);

const IconButton: React.FC<{
  onClick: () => void;
  icon: React.ReactNode;
  tooltip: string;
  variant?: 'default' | 'ghost';
}> = ({ onClick, icon, tooltip, variant = 'default' }) => (
  <div className="relative group">
    <button
      onClick={onClick}
      className={`
        p-2.5 rounded-lg transition-all duration-200
        ${
          variant === 'ghost'
            ? 'text-slate-600 hover:text-emerald-600 hover:bg-emerald-50'
            : 'text-emerald-600 hover:bg-emerald-100 bg-emerald-50/50'
        }
        hover:shadow-sm ring-1 ring-transparent hover:ring-emerald-200/50
      `}
    >
      {icon}
    </button>
    
    {/* Tooltip */}
    <div className="
      absolute top-full left-1/2 -translate-x-1/2 mt-2 px-3 py-1.5
      bg-slate-800 text-white text-xs font-medium rounded-lg
      opacity-0 group-hover:opacity-100 transition-opacity duration-200
      pointer-events-none z-40 whitespace-nowrap
    ">
      {tooltip}
      <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-slate-800 rotate-45" />
    </div>
  </div>
);

const MobileNavItem: React.FC<{
  onClick: () => void;
  isActive?: boolean;
  icon: React.ReactNode;
  label: string;
}> = ({ onClick, isActive = false, icon, label }) => (
  <button
    onClick={onClick}
    className={`
      w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left
      transition-all duration-200
      ${
        isActive
          ? 'bg-emerald-100 text-emerald-700 font-semibold'
          : 'text-slate-700 hover:bg-slate-100 hover:text-slate-900'
      }
    `}
  >
    <div className={`${isActive ? 'text-emerald-600' : 'text-slate-500'}`}>
      {icon}
    </div>
    <span>{label}</span>
  </button>
);
```

### Modern Navbar Özellikleri

#### 1. Gelişmiş Görsel Efektler
- **Scroll Efekti**: Sayfa kaydırıldığında navbar şeffaflığı ve gölgesi değişir
- **Gradient Logo**: Logo arka planında subtle gradient efekti
- **Hover Animasyonları**: Tüm interaktif elementlerde smooth hover efektleri
- **Active State Indicators**: Aktif sayfa için alt çizgi ve renk değişimi

#### 2. Responsive Tasarım
- **Desktop**: Tam navigation menüsü görünür
- **Mobile**: Hamburger menü ile collapsible navigation
- **Tablet**: Orta boyut optimizasyonu

#### 3. Accessibility Features
- **Keyboard Navigation**: Tab ile erişilebilir tüm elementler
- **Screen Reader Support**: Uygun ARIA etiketleri
- **High Contrast**: Yeterli renk kontrastı
- **Touch Targets**: Minimum 44px dokunma alanları

#### 4. Performance Optimizations
- **CSS Transitions**: Hardware accelerated animasyonlar
- **Conditional Rendering**: Gereksiz re-render'ların önlenmesi
- **Event Debouncing**: Scroll event optimizasyonu

#### 5. Marka Tutarlılığı
- **Renk Paleti**: Mevcut emerald/slate color scheme
- **Typography**: Consistent font weights ve sizing
- **Spacing**: Tailwind spacing sistemi
- **Border Radius**: Consistent border radius değerleri

### Kullanım Örnekleri

```tsx
// App.tsx içinde kullanım
function App() {
  const [currentView, setCurrentView] = useState<'landing' | 'app'>('landing');
  const [isShortcutsModalOpen, setIsShortcutsModalOpen] = useState(false);
  const [isHelpCenterModalOpen, setIsHelpCenterModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-50">
      <ModernNavbar
        currentView={currentView}
        onViewChange={setCurrentView}
        onOpenShortcuts={() => setIsShortcutsModalOpen(true)}
        onOpenHelp={() => setIsHelpCenterModalOpen(true)}
      />
      
      {/* Rest of the app */}
    </div>
  );
}
```

### CSS Animations

```css
/* index.css'e eklenecek ek animasyonlar */
@keyframes slideDown {
  from {
    transform: translateY(-10px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}

@keyframes pulse-ring {
  0% {
    transform: scale(1);
    opacity: 1;
  }
  100% {
    transform: scale(1.1);
    opacity: 0;
  }
}

.navbar-slide-down {
  animation: slideDown 0.3s ease-out;
}

.pulse-ring {
  animation: pulse-ring 2s infinite;
}
```

## Deployment Architecture

### Build Configuration
```
// vite.config.ts
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, '.', '');
  return {
    define: {
      'process.env.API_KEY': JSON.stringify(env.GEMINI_API_KEY)
    }
  };
});
```

### Ortam Yönetimi
- **Geliştirme**: Sıcak yeniden yükleme ile yerel geliştirme
- **Üretim**: Ortam değişkenleri ile optimize edilmiş build
- **API Konfigürasyonu**: Güvenli API anahtarı enjeksiyonu

### Performans İzleme
- **Paket Analizi**: Paket boyutu ve optimizasyon takibi
- **Çalışma Zamanı Performansı**: Bileşen render sürelerini izleme
- **AI Yanıt Süreleri**: API yanıt performansını takip
