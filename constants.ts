// 🚀 HIZLI FORMÜL ÜRETİM SİSTEMİ

// 1. KISA VE NET PROMPT'LAR
export const FAST_ANALYSIS_PROMPT = `
Veri analisti olarak Excel sayfalarını analiz et. Her sütun için:
- Sayfa adı
- Sütun harfi  
- İçerik açıklaması (max 10 kelime)
JSON array döndür: [{"sheetName":"", "column":"", "description":""}]
`;

export const FAST_FORMULA_PROMPT = `
Excel uzmanı olarak:
1. Kullanıcı isteğini analiz et
2. Veri yapısına uygun formül oluştur  
3. Türkçe Excel için: EĞER, DÜŞEYARA, noktalı virgül
4. İngilizce Excel için: IF, VLOOKUP, virgül

SADECE JSON döndür:
{
  "analysis": {"source": "Kaynak", "target": "Hedef", "type": "İşlem türü", "complexity": "Zorluk"},
  "formula": {"code": "=FORMÜL", "description": "Ne yapar"},
  "guide": {"steps": ["Adım 1", "Adım 2"], "tip": "İpucu"},
  "example": {"scenario": "Örnek durum", "result": "Sonuç"},
  "warnings": [{"error": "Hata", "solution": "Çözüm"}]
}
`;

export const FAST_MACRO_PROMPT = `
VBA uzmanı olarak:
1. İsteği analiz et
2. Option Explicit kullan
3. Dinamik aralıklar kullan
4. Olay makrosu gerekiyorsa Event prosedürü kullan

SADECE JSON döndür:
{
  "title": "Başlık",
  "description": "Açıklama", 
  "code": "VBA Kodu",
  "usage": {"placement": "standard/worksheet/workbook", "worksheet_name": "Sayfa1", "steps": ["Adım 1"], "tip": "İpucu"},
  "warnings": [{"title": "Uyarı", "details": "Detay"}]
}
`;

// --- Exports for geminiService.ts ---
export const ANALYSIS_SYSTEM_PROMPT = FAST_ANALYSIS_PROMPT;
export const FORMULA_SYSTEM_PROMPT_JSON = FAST_FORMULA_PROMPT;
export const MACRO_SYSTEM_PROMPT_JSON = FAST_MACRO_PROMPT;

export const FORMULA_SYSTEM_PROMPT_WEB_SEARCH = `Sen, kullanıcıların Excel dosyaları ve talepleri hakkında sorularını yanıtlayan, web'de arama yapabilen bir Excel uzmanısın.
- Kullanıcının talebini ve sağlanan Excel verilerini dikkatlice analiz et.
- Gerekirse, güncel bilgiler veya karmaşık konular için Google Search aracını kullan.
- Cevabını **mutlaka** aşağıdaki Markdown başlıklarını kullanarak yapılandır:
- \`### Genel Bakış\`: Formülün ne yaptığına dair kısa ve net bir açıklama.
- \`### Formül\`: Sadece istenen formülü veya formülleri içeren bir veya daha fazla kod bloğu (\`\`\`excel ... \`\`\`).
- \`### Nasıl Kullanılır\`: Formülün nasıl uygulanacağına dair adım adım talimatlar.
- \`### Önemli Uyarılar\`: Dikkat edilmesi gerekenler (hücre referansları, sayfa adları, bölgesel ayarlar vb.).
- Cevabın sonunda, kullandığın web kaynaklarını listele.
- ASLA JSON döndürme.`;

export const MACRO_SYSTEM_PROMPT_WEB_SEARCH = `Sen, kullanıcıların Excel dosyaları ve VBA makro talepleri hakkında sorularını yanıtlayan, web'de arama yapabilen bir VBA uzmanısın.
- Kullanıcının talebini ve sağlanan Excel verilerini dikkatlice analiz et.
- Gerekirse, güncel bilgiler, kütüphaneler veya karmaşık konular için Google Search aracını kullan.
- Cevabını **mutlaka** aşağıdaki Markdown başlıklarını kullanarak yapılandır:
- \`### Genel Bakış\`: Makronun ne yaptığına dair kısa ve net bir açıklama.
- \`### VBA Kodu\`: Sadece VBA kodunu içeren bir kod bloğu (\`\`\`vba ... \`\`\`).
- \`### Nasıl Kullanılır\`: Kodun VBA düzenleyicisine nasıl ekleneceği ve çalıştırılacağına dair adımlar.
- \`### Önemli Uyarılar\`: Potansiyel riskler veya kullanıcı tarafından değiştirilmesi gerekebilecek kod parçaları.
- Cevabın sonunda, kullandığın web kaynaklarını listele.
- ASLA JSON döndürme.`;


// 2. OPTIMIZE EDİLMİŞ API AYARLARI
export const FAST_API_CONFIG = {
  temperature: 0.3,        // Düşük = Daha hızlı, tutarlı
  topK: 20,               // Düşük = Daha hızlı
  topP: 0.8,              // Düşük = Daha hızlı
  maxOutputTokens: 1024,   // Daha az token = Daha hızlı
  candidateCount: 1        // Tek candidate = Daha hızlı
};

// 3. TIMEOUT VE RETRY MEKANİZMASI
export class FastFormulaGenerator {
  // FIX: Declare class properties to resolve TypeScript errors about missing properties.
  apiKey: string;
  baseUrl: string;
  timeout: number;
  maxRetries: number;
  retryDelay: number;

  constructor(apiKey: string, options: { timeout?: number, maxRetries?: number, retryDelay?: number } = {}) {
    this.apiKey = apiKey;
    this.baseUrl = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent';
    this.timeout = options.timeout || 10000; // 10 saniye timeout
    this.maxRetries = options.maxRetries || 2;
    this.retryDelay = options.retryDelay || 1000;
  }

  // 4. HIZLI REQUEST FONKSIYONU
  async generateWithTimeout(prompt: string, userMessage: string) {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), this.timeout);

    try {
      const response = await fetch(`${this.baseUrl}?key=${this.apiKey}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [
            {
              role: 'user',
              parts: [{ text: `${prompt}\n\nİstek: ${userMessage}` }]
            }
          ],
          generationConfig: FAST_API_CONFIG,
          safetySettings: [
            {
              category: 'HARM_CATEGORY_HARASSMENT',
              threshold: 'BLOCK_NONE'
            }
          ]
        }),
        signal: controller.signal
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        throw new Error(`API Error: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      return this.processResponse(data);

    } catch (error: any) {
      clearTimeout(timeoutId);
      
      if (error.name === 'AbortError') {
        throw new Error('Request timeout - API çok yavaş yanıt veriyor');
      }
      
      throw error;
    }
  }

  // 5. RETRY MEKANİZMASI
  async generateFormula(userMessage: string, attempt: number = 1): Promise<any> {
    try {
      console.time(`Formula Generation Attempt ${attempt}`);
      
      const result = await this.generateWithTimeout(FAST_FORMULA_PROMPT, userMessage);
      
      console.timeEnd(`Formula Generation Attempt ${attempt}`);
      return result;

    } catch (error: any) {
      console.error(`Attempt ${attempt} failed:`, error.message);

      if (attempt < this.maxRetries) {
        console.log(`Retrying in ${this.retryDelay}ms...`);
        await this.sleep(this.retryDelay);
        return this.generateFormula(userMessage, attempt + 1);
      }

      // Son deneme başarısızsa hızlı fallback
      return this.createFallbackResponse(userMessage, error.message);
    }
  }

  // 6. HIZLI MAKRO ÜRETİMİ
  async generateMacro(userMessage: string, attempt: number = 1): Promise<any> {
    try {
      console.time(`Macro Generation Attempt ${attempt}`);
      
      const result = await this.generateWithTimeout(FAST_MACRO_PROMPT, userMessage);
      
      console.timeEnd(`Macro Generation Attempt ${attempt}`);
      return result;

    } catch (error: any) {
      console.error(`Attempt ${attempt} failed:`, error.message);

      if (attempt < this.maxRetries) {
        console.log(`Retrying in ${this.retryDelay}ms...`);
        await this.sleep(this.retryDelay);
        return this.generateMacro(userMessage, attempt + 1);
      }

      return this.createMacroFallback(userMessage, error.message);
    }
  }

  // 7. RESPONSE İŞLEME - OPTİMİZE
  processResponse(data: any) {
    try {
      if (!data?.candidates?.[0]?.content?.parts?.[0]?.text) {
        throw new Error('Geçersiz API yanıtı');
      }

      let text = data.candidates[0].content.parts[0].text.trim();
      
      // JSON dışındaki metni temizle
      const jsonMatch = text.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        text = jsonMatch[0];
      }

      return JSON.parse(text);

    } catch (error) {
      console.error('Response processing error:', error);
      throw new Error('API yanıtı işlenemedi');
    }
  }

  // 8. FALLBACK RESPONSES
  createFallbackResponse(userMessage: string, errorMessage: string) {
    return {
      formula: {
        code: "=EĞER(A2<>\"\"; A2; \"Boş\")",
        description: "Basit kontrol formülü (API hatası nedeniyle varsayılan)"
      },
      guide: {
        steps: [
          "Formülü ilgili hücreye yapıştırın",
          "Hücre referanslarını ihtiyacınıza göre değiştirin"
        ],
        tip: "Daha karmaşık formüller için tekrar deneyin"
      },
      example: {
        scenario: "A2 hücresi doluysa",
        result: "A2 değerini gösterir, boşsa 'Boş' yazar"
      },
      warnings: [
        {
          error: "API Hatası",
          solution: `Hata: ${errorMessage}. Lütfen tekrar deneyin.`
        }
      ],
      _fallback: true
    };
  }

  createMacroFallback(userMessage: string, errorMessage: string) {
    return {
      title: "Basit Makro (Fallback)",
      description: "API hatası nedeniyle basit bir makro örneği",
      code: `Option Explicit\n\nSub BasitMakro()\n    MsgBox "Makro çalıştı!"\nEnd Sub`,
      usage: {
        placement: "standard",
        steps: [
          "Alt + F11 ile VBA editörünü açın",
          "Insert > Module seçin", 
          "Kodu yapıştırın",
          "Alt + F8 ile makroyu çalıştırın"
        ],
        tip: "Daha karmaşık makrolar için tekrar deneyin"
      },
      warnings: [
        {
          title: "API Hatası",
          details: `Hata: ${errorMessage}. Bu basit bir örnektir.`
        }
      ],
      _fallback: true
    };
  }

  // 9. SLEEP UTILITY
  sleep(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  // 10. PERFORMANs İZLEME
  startTimer(operation: string) {
    console.time(operation);
    return () => console.timeEnd(operation);
  }
}

// 11. KULLANIM ÖRNEĞİ
export const createFastGenerator = (apiKey: string) => {
  return new FastFormulaGenerator(apiKey, {
    timeout: 8000,      // 8 saniye timeout
    maxRetries: 2,      // 2 deneme
    retryDelay: 500     // 500ms bekleme
  });
};

// 12. HIZLI TEST FONKSİYONU
export const testSpeed = async (generator: FastFormulaGenerator, message: string) => {
  const endTimer = generator.startTimer('Total Generation Time');
  
  try {
    const result = await generator.generateFormula(message);
    endTimer();
    
    console.log('✅ Success:', (result as any)._fallback ? 'Fallback used' : 'API success');
    return result;
    
  } catch (error: any) {
    endTimer();
    console.log('❌ Failed:', error.message);
    throw error;
  }
};

// 13. CACHE SİSTEMİ (OPTIONAL)
export class CachedFormulaGenerator extends FastFormulaGenerator {
  // FIX: Declare class properties to resolve TypeScript errors about missing properties.
  cache: Map<string, any>;
  maxCacheSize: number;

  constructor(apiKey: string, options: { timeout?: number, maxRetries?: number, retryDelay?: number, maxCacheSize?: number } = {}) {
    super(apiKey, options);
    this.cache = new Map();
    this.maxCacheSize = options.maxCacheSize || 50;
  }

  // Cache key oluştur
  createCacheKey(message: string) {
    return message.toLowerCase().trim().substring(0, 100);
  }

  // Cache'li generate
  async generateFormula(userMessage: string, attempt: number = 1): Promise<any> {
    const cacheKey = this.createCacheKey(userMessage);
    
    // Cache'de var mı kontrol et
    if (this.cache.has(cacheKey)) {
      console.log('🚀 Cache hit - instant response');
      return this.cache.get(cacheKey);
    }

    // Cache'de yok, generate et
    const result = await super.generateFormula(userMessage, attempt);
    
    // Cache'e ekle
    if (!(result as any)._fallback) {
      this.addToCache(cacheKey, result);
    }
    
    return result;
  }

  addToCache(key: string, value: any) {
    // Cache boyutu kontrolü
    if (this.cache.size >= this.maxCacheSize) {
      const firstKey = this.cache.keys().next().value;
      this.cache.delete(firstKey);
    }
    
    this.cache.set(key, value);
  }
}

// 14. KULLANIM REHBERİ
export const USAGE_EXAMPLE = `
// Hızlı kullanım
const generator = createFastGenerator('YOUR_API_KEY');

// Formül üretimi (max 8 saniye)
const formula = await generator.generateFormula('A sütunundaki değerleri topla');

// Performans testi
await testSpeed(generator, 'EĞER formülü yap');

// Cache'li versiyon (daha da hızlı)
const cachedGen = new CachedFormulaGenerator('YOUR_API_KEY');
const result = await cachedGen.generateFormula('Aynı istek tekrar');
`;