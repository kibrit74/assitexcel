

import { GoogleGenAI, Type, GenerateContentResponse } from "@google/genai";
import { 
    FORMULA_SYSTEM_PROMPT_JSON,
    FORMULA_SYSTEM_PROMPT_WEB_SEARCH,
    MACRO_SYSTEM_PROMPT_JSON,
    MACRO_SYSTEM_PROMPT_WEB_SEARCH,
    ANALYSIS_SYSTEM_PROMPT
} from '../constants';
import { helpContent } from '../data/helpContent';
import type { WorkbookData, FormulaResponse, ColumnAnalysis, MacroResponse, AppResult } from '../types';

if (!process.env.API_KEY) {
  throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

type TrustedFormula = {
    prompt: string;
    formula: string;
};

const formatFormulaLibraryForPrompt = (library: TrustedFormula[]): string => {
    if (!library || library.length === 0) return "";

    let libraryString = "--- GÜVENİLİR FORMÜL KÜTÜPHANESİ (Doğru Çalıştığı Onaylanmış Formüller) ---\n";
    
    library.forEach(item => {
        libraryString += `
# Kullanıcı Talebi: ${item.prompt}
# Onaylanmış Doğru Formül:
${item.formula}
---
`;
    });
    return libraryString;
};


const generateColumnHeaders = (count: number): string[] => {
    const headers: string[] = [];
    for (let i = 0; i < count; i++) {
        let header = '';
        let temp = i;
        do {
            header = String.fromCharCode(65 + (temp % 26)) + header;
            temp = Math.floor(temp / 26) - 1;
        } while (temp >= 0);
        headers.push(header);
    }
    return headers;
};

const formatCellValue = (cell: any): string => {
    if (cell instanceof Date) {
        const day = String(cell.getDate()).padStart(2, '0');
        const month = String(cell.getMonth() + 1).padStart(2, '0');
        const year = cell.getFullYear();
        return `${day}.${month}.${year}`;
    }
    if (cell === null || cell === undefined) {
        return '';
    }
    return String(cell);
};


const formatExcelDataForPrompt = (data: WorkbookData): string => {
  let formattedString = "";
  for (const sheetName in data) {
    formattedString += `Sayfa Adı: ${sheetName}\n`;
    const sheetData = data[sheetName];
    if (sheetData.length === 0) {
        formattedString += "(Bu sayfa boş)\n\n";
        continue;
    }
    const colCount = sheetData.length > 0 ? Math.max(0, ...sheetData.map(row => row ? row.length : 0)) : 0;
    const headers = generateColumnHeaders(colCount);
    sheetData.forEach((row, rowIndex) => {
        if (!row) return; // robustness for sparse arrays
        const rowItems = [];
        for (let i = 0; i < colCount; i++) {
            const cell = row[i];
            const formattedCell = formatCellValue(cell);
            rowItems.push(`${headers[i]}${rowIndex + 1}: [${formattedCell}]`);
        }
        formattedString += rowItems.join(' | ') + '\n';
    });
    formattedString += '\n';
  }
  return formattedString;
};

const analysisSchema = {
    type: Type.ARRAY,
    items: {
        type: Type.OBJECT,
        properties: {
            sheetName: { type: Type.STRING },
            column: { type: Type.STRING },
            description: { type: Type.STRING },
        },
        required: ['sheetName', 'column', 'description'],
    }
};

export const analyzeExcelData = async (workbookData: WorkbookData): Promise<ColumnAnalysis[]> => {
    const formattedExcelData = formatExcelDataForPrompt(workbookData);
    const userContent = `
--- ANALİZ EDİLECEK EXCEL VERİSİ ---
${formattedExcelData}
  `;

  try {
    const response : GenerateContentResponse = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: { parts: [{ text: userContent }] },
      config: {
        systemInstruction: ANALYSIS_SYSTEM_PROMPT,
        responseMimeType: "application/json",
        responseSchema: analysisSchema,
        temperature: 0.1,
      },
    });

    const jsonText = response.text.trim();
    return JSON.parse(jsonText) as ColumnAnalysis[];
  } catch (error) {
    console.error("Error calling Gemini API for analysis:", error);
    throw new Error("Excel verisi analiz edilirken bir hata oluştu.");
  }
}

const responseSchema = {
  type: Type.OBJECT,
  properties: {
    analysis: {
      type: Type.OBJECT,
      properties: {
        source: { type: Type.STRING },
        target: { type: Type.STRING },
        type: { type: Type.STRING },
        complexity: { type: Type.STRING },
      },
    },
    formula: {
      type: Type.OBJECT,
      properties: {
        code: { type: Type.STRING },
        description: { type: Type.STRING },
      },
    },
    guide: {
      type: Type.OBJECT,
      properties: {
        steps: {
          type: Type.ARRAY,
          items: { type: Type.STRING },
        },
        tip: { type: Type.STRING },
      },
    },
    example: {
      type: Type.OBJECT,
      properties: {
        scenario: { type: Type.STRING },
        result: { type: Type.STRING },
      },
    },
    warnings: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          error: { type: Type.STRING },
          solution: { type: Type.STRING },
        },
      },
    },
  },
};

const formatAnalysisForPrompt = (analysis: ColumnAnalysis[]): string => {
  return analysis.map(item => `- Sayfa '${item.sheetName}', Sütun ${item.column}: ${item.description}`).join('\n');
}

const buildContentRequest = (text: string, image: string | null) => {
    if (!image) {
        return { parts: [{ text }] };
    }
    const mimeType = image.match(/^data:(image\/[a-zA-Z0-9-.+]+);base64,/)?.[1];
    if (!mimeType) {
        console.error("Could not determine mime type from image data URL.");
        return { parts: [{ text }] };
    }
    const base64Data = image.split(',')[1];
    const imagePart = {
        inlineData: {
            mimeType: mimeType,
            data: base64Data
        }
    };
    return { parts: [imagePart, { text }] };
};

const getVersionName = (v: string) => {
    switch(v) {
        case '365': return 'Excel 365 / 2021 (En Güncel)';
        case '2019': return 'Excel 2019';
        case '2016': return 'Excel 2016';
        case '2013': return 'Excel 2013 ve Daha Eski';
        default: return 'Bilinmiyor';
    }
};

const formatMacroLibraryForPrompt = (): string => {
    const macroGroups = helpContent.filter(group => group.isMacro);
    let libraryString = "--- DAHİLİ VBA MAKRO KÜTÜPHANESİ (Referans Alınacak Güvenilir Kaynak) ---\n";
    
    macroGroups.forEach(group => {
        group.examples.forEach(macro => {
            if(macro.code) {
                libraryString += `
# Makro Adı: ${macro.title}
# Açıklama: ${macro.helpDescription}
# Kullanım Senaryosu: ${macro.prompt}
# Güvenilir Kod Örneği:
${macro.code}
---
`;
            }
        });
    });
    return libraryString;
};

const buildUserContent = (
    mode: 'formula' | 'macro',
    formattedExcelData: string,
    formattedAnalysis: string,
    userPrompt: string,
    excelLanguage?: 'tr' | 'en',
    excelVersion?: string,
    macroLibrary?: string,
    formulaLibrary?: string
): string => {
    const analysisSection = `
--- SÜTUN ANALİZİ ---
${formattedAnalysis}

--- ANALİZ EDİLECEK EXCEL VERİSİ ---
${formattedExcelData}

--- KULLANICI TALEBİ ---
${userPrompt}
    `;

    if (mode === 'macro' && macroLibrary) {
        return `${macroLibrary}\n${analysisSection}`;
    }

    if (mode === 'formula' && excelLanguage && excelVersion) {
        const formulaLibrarySection = formulaLibrary ? `${formulaLibrary}\n` : '';
        const userInfoSection = `
--- KULLANICI EXCEL BİLGİLERİ ---
Excel Dili: ${excelLanguage === 'tr' ? 'Türkçe' : 'İngilizce'}
Excel Versiyonu: ${getVersionName(excelVersion)}
        `;
        return `${formulaLibrarySection}${userInfoSection}${analysisSection}`;
    }
    
    return analysisSection;
};


export const generateFormula = async (
  workbookData: WorkbookData, 
  userPrompt: string, 
  analysis: ColumnAnalysis[],
  excelLanguage: 'tr' | 'en',
  excelVersion: string,
  image: string | null,
  trustedFormulas: TrustedFormula[],
  ): Promise<AppResult> => {
    const formattedExcelData = formatExcelDataForPrompt(workbookData);
    const formattedAnalysis = formatAnalysisForPrompt(analysis);
    const formattedFormulaLibrary = formatFormulaLibraryForPrompt(trustedFormulas);
    const userContentText = buildUserContent('formula', formattedExcelData, formattedAnalysis, userPrompt, excelLanguage, excelVersion, undefined, formattedFormulaLibrary);
    const contents = buildContentRequest(userContentText, image);

    try {
        const response: GenerateContentResponse = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: contents,
            config: {
                systemInstruction: FORMULA_SYSTEM_PROMPT_JSON,
                responseMimeType: "application/json",
                responseSchema: responseSchema,
                temperature: 0.2,
            },
        });
        const jsonText = response.text.trim();
        const formulaData = JSON.parse(jsonText) as FormulaResponse;
        return { type: 'formula', data: formulaData };
    } catch (error) {
        console.error("Error calling Gemini API:", error);
        throw new Error("Formül oluşturulurken bir hata oluştu. Lütfen tekrar deneyin.");
    }
};

const macroResponseSchema = {
  type: Type.OBJECT,
  properties: {
    title: { type: Type.STRING },
    description: { type: Type.STRING },
    code: { type: Type.STRING },
    usage: {
      type: Type.OBJECT,
      properties: {
        steps: {
          type: Type.ARRAY,
          items: { type: Type.STRING },
        },
        tip: { type: Type.STRING },
        placement: { type: Type.STRING, enum: ['standard', 'worksheet', 'workbook'] },
        worksheet_name: { type: Type.STRING },
      },
      required: ['steps', 'tip', 'placement'],
    },
    warnings: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          title: { type: Type.STRING },
          details: { type: Type.STRING },
        },
        required: ['title', 'details'],
      },
    },
  },
  required: ['title', 'description', 'code', 'usage', 'warnings'],
};

export const generateMacro = async (
  workbookData: WorkbookData, 
  userPrompt: string, 
  analysis: ColumnAnalysis[],
  image: string | null,
): Promise<AppResult> => {
  const formattedExcelData = formatExcelDataForPrompt(workbookData);
  const formattedAnalysis = formatAnalysisForPrompt(analysis);
  const formattedMacroLibrary = formatMacroLibraryForPrompt();
  const userContentText = buildUserContent('macro', formattedExcelData, formattedAnalysis, userPrompt, undefined, undefined, formattedMacroLibrary);
  const contents = buildContentRequest(userContentText, image);

  try {
    const response: GenerateContentResponse = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: contents,
        config: {
            systemInstruction: MACRO_SYSTEM_PROMPT_JSON,
            responseMimeType: "application/json",
            responseSchema: macroResponseSchema,
            temperature: 0.3,
        },
    });
    const jsonText = response.text.trim();
    const macroData = JSON.parse(jsonText) as MacroResponse;
    return { type: 'macro', data: macroData };
  } catch (error) {
    console.error("Error calling Gemini API for macro generation:", error);
    throw new Error("Makro kodu oluşturulurken bir hata oluştu. Lütfen tekrar deneyin.");
  }
};

const CALCULATION_SYSTEM_PROMPT = `
Sen, bir Excel formül hesaplama motorusun. Görevin, sağlanan veri bağlamına dayanarak verilen Excel formülünün sonucunu hesaplamaktır. SADECE hesaplanan değeri döndür. Açıklama, formülün kendisi veya başka bir metin EKLEME.

Örnek Çıktılar:
- 42
- Ahmet Yılmaz
- 15.03.2024
- #YOK!
- DOĞRU
`;

const formatRowDataForPrompt = (rowData: (string | number | null | Date)[], headers: string[], rowIndex: number): string => {
    if (!rowData) return "Bu satır için veri yok.";
    return rowData.map((cell, index) => `${headers[index]}${rowIndex + 1}: [${formatCellValue(cell)}]`).join(' | ');
}

export const calculateFormula = async (
    formula: string,
    rowData: (string | number | null | Date)[],
    rowIndex: number,
    workbookData: WorkbookData,
    headers: string[],
    excelLanguage: 'tr' | 'en'
): Promise<string> => {
    const formattedRowData = formatRowDataForPrompt(rowData, headers, rowIndex);
    const formattedExcelData = formatExcelDataForPrompt(workbookData);

    const userContent = `
--- EXCEL DİLİ ---
${excelLanguage === 'tr' ? 'Türkçe (argüman ayıracı olarak noktalı virgül ";" kullan)' : 'İngilizce (argüman ayıracı olarak virgül "," kullan)'}

--- HESAPLANACAK FORMÜL ---
${formula}

--- AKTİF SATIR VERİSİ ---
Hesaplama bu satır için yapılıyor:
${formattedRowData}

--- TÜM VERİ BAĞLAMI (Gerekirse VLOOKUP, vb. için) ---
${formattedExcelData}
`;

    try {
        const response: GenerateContentResponse = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: { parts: [{ text: userContent }] },
            config: {
                systemInstruction: CALCULATION_SYSTEM_PROMPT,
                temperature: 0,
            },
        });
        return response.text.trim().replace(/^"(.*)"$/, '$1');
    } catch (error) {
        console.error("Error calling Gemini API for calculation:", error);
        throw new Error("Formül önizlemesi hesaplanırken bir hata oluştu.");
    }
}


export async function* generateWebSearchStream(
    mode: 'formula' | 'macro',
    workbookData: WorkbookData, 
    userPrompt: string, 
    analysis: ColumnAnalysis[],
    image: string | null,
    excelLanguage: 'tr' | 'en',
    excelVersion: string,
): AsyncGenerator<string, { uri: string; title: string; }[], unknown> {
    const formattedExcelData = formatExcelDataForPrompt(workbookData);
    const formattedAnalysis = formatAnalysisForPrompt(analysis);
    let macroLibrary: string | undefined = undefined;
    if (mode === 'macro') {
        macroLibrary = formatMacroLibraryForPrompt();
    }

    const userContentText = buildUserContent(mode, formattedExcelData, formattedAnalysis, userPrompt, excelLanguage, excelVersion, macroLibrary);
    const systemInstruction = mode === 'formula' ? FORMULA_SYSTEM_PROMPT_WEB_SEARCH : MACRO_SYSTEM_PROMPT_WEB_SEARCH;
    const contents = buildContentRequest(userContentText, image);

    const stream = await ai.models.generateContentStream({
        model: "gemini-2.5-flash",
        contents: contents,
        config: {
            systemInstruction: systemInstruction,
            temperature: 0.5,
            tools: [{googleSearch: {}}],
        },
    });

    const sourcesMap = new Map<string, { uri: string; title: string }>();
    for await (const chunk of stream) {
        if (chunk.text) {
            yield chunk.text;
        }

        const groundingChunks = chunk.candidates?.[0]?.groundingMetadata?.groundingChunks;
        if (groundingChunks) {
            for (const grounding of groundingChunks) {
                if (grounding.web?.uri && !sourcesMap.has(grounding.web.uri)) {
                    sourcesMap.set(grounding.web.uri, {
                        uri: grounding.web.uri,
                        title: grounding.web.title || 'Bilinmeyen Kaynak'
                    });
                }
            }
        }
    }

    return Array.from(sourcesMap.values());
}