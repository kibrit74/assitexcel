# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Project Overview
This is an **Excel Formula Assistant** application built with React, TypeScript, and Vite. The app allows users to upload Excel files (.xlsx/.xls), analyze their structure using AI (Google Gemini), and generate Turkish/English Excel formulas or VBA macros based on natural language requests.

## Key Features
- AI-powered Excel formula generation in Turkish and English
- VBA macro code generation with detailed usage instructions
- Excel file upload, analysis, and data visualization
- Live formula preview and testing on actual data
- Formula history and trusted formula library
- Web-enhanced search capabilities using Google's tools
- Extensive built-in help system with animated examples

## Technology Stack
- **Frontend**: React 19, TypeScript, Tailwind CSS
- **Build Tool**: Vite 6
- **AI Service**: Google Gemini API (@google/genai)
- **Excel Processing**: XLSX.js (client-side)
- **Language**: Turkish interface with English Excel formula support

## Development Commands

### Environment Setup
```bash
# Install dependencies
npm install

# Set up environment variables
# Create .env.local file with:
GEMINI_API_KEY=your_gemini_api_key_here
```

### Development
```bash
# Start development server (default: http://localhost:5173)
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

### Testing & Debugging
```bash
# No test suite configured - add tests if needed
# The app uses console logging for debugging API calls

# Check for TypeScript errors
npx tsc --noEmit

# Analyze bundle size
npx vite-bundle-analyzer dist
```

## Architecture Overview

### Core Components
- **App.tsx** - Main application component with state management
- **services/geminiService.ts** - AI service layer for Gemini API integration
- **components/** - UI components (ResultDisplay, HistoryDisplay, Modals)
- **data/helpContent.ts** - Extensive help system with formula examples
- **types.ts** - TypeScript interfaces for type safety

### Key Architectural Patterns

#### AI Service Integration
The app uses a sophisticated prompt engineering approach:
- **Analysis Phase**: Analyzes Excel structure before generating formulas
- **Context-Aware Generation**: Includes column analysis and sample data
- **Multi-language Support**: Handles Turkish vs English Excel syntax
- **Trusted Formula Library**: Maintains user-confirmed working formulas
- **Web-Enhanced Mode**: Integrates Google Search for complex queries

#### State Management Strategy
- Uses React hooks for local state (no external state management)
- **localStorage Integration**: Persists history and trusted formulas
- **Real-time Preview**: Live formula calculation on actual data
- **Selection System**: Cell range selection with visual feedback

#### Data Processing Pipeline
1. **File Upload** → Parse with XLSX.js
2. **AI Analysis** → Column structure analysis via Gemini
3. **User Request** → Natural language processing
4. **Formula Generation** → Context-aware formula creation
5. **Live Preview** → Real-time calculation on data
6. **History Storage** → Local persistence

### Important File Locations
- **Environment Config**: `.env.local` (create manually)
- **AI Prompts**: `constants.ts` - Contains system prompts for different modes
- **Help System**: `data/helpContent.ts` - Formula library and examples
- **Type Definitions**: `types.ts` - Core interfaces
- **Vite Config**: `vite.config.ts` - Handles environment variable injection

## AI Integration Details

### Gemini API Configuration
- **Model**: gemini-2.5-flash (configurable in service)
- **Temperature**: 0.1-0.3 for consistent results
- **Response Format**: Structured JSON with schema validation
- **Safety Settings**: Configured for productivity tools

### Prompt Engineering Strategy
The app uses three main system prompts:
- **ANALYSIS_SYSTEM_PROMPT**: For Excel structure analysis
- **FORMULA_SYSTEM_PROMPT_JSON**: For formula generation (structured)
- **MACRO_SYSTEM_PROMPT_JSON**: For VBA macro generation

### Context Enhancement
- Includes Excel version compatibility (365, 2019, 2016, 2013)
- Handles Turkish vs English formula syntax automatically
- Provides sample data context for accurate formula generation
- Maintains trusted formula library for improved accuracy

## Development Workflow

### Adding New Formula Types
1. Update `helpContent.ts` with new examples
2. Extend prompts in `constants.ts` if needed
3. Add TypeScript types in `types.ts`
4. Create corresponding UI components

### Extending AI Capabilities
- Modify system prompts in `constants.ts`
- Update schema definitions in `geminiService.ts`
- Test with various Excel file structures
- Consider adding new response types to `AppResult` union

### UI Component Development
- Follow existing Card-based layout pattern
- Use Tailwind utility classes consistently
- Add proper TypeScript interfaces
- Include accessibility attributes (aria-labels)

## Environment Variables
```bash
# Required
GEMINI_API_KEY=your_gemini_api_key

# Build-time injection (handled by vite.config.ts)
# These are automatically available as process.env.GEMINI_API_KEY in code
```

## Performance Considerations
- Excel files are processed client-side (no server uploads)
- AI requests are optimized with structured responses
- History is limited to 20 items for performance
- Component state is managed efficiently with React hooks
- Large Excel files may impact browser performance

## Localization
- Primary language: Turkish
- Excel formula support: Both Turkish and English syntax
- System prompts are in Turkish for better AI comprehension
- UI text is primarily in Turkish

## Error Handling
- Comprehensive error handling in AI service layer
- User-friendly error messages in Turkish
- Fallback responses for API failures
- File validation for Excel uploads

## Security Considerations
- API key is injected at build time via environment variables
- No sensitive data is sent to external services beyond file structure
- Client-side Excel processing (no server storage)
- No authentication system implemented

## Future Development Areas
- Add automated testing suite
- Implement more sophisticated caching
- Add support for additional file formats
- Enhance error recovery mechanisms
- Add telemetry for usage analytics

## Debugging Tips
- Check browser console for AI service errors
- Verify GEMINI_API_KEY is properly set
- Test with various Excel file structures
- Monitor network requests to Gemini API
- Use React DevTools for component state inspection

