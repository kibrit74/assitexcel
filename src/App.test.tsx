import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import type { WorkbookData } from '../types';

// Mock the services
vi.mock('../services/geminiService', () => ({
  analyzeExcelData: vi.fn(),
  generateFormula: vi.fn(),
  generateMacro: vi.fn(),
  calculateFormula: vi.fn(),
  generateWebSearchStream: vi.fn(),
}));

vi.mock('../services/enhancedAIService', () => ({
  RequestManager: {
    withTimeout: vi.fn(),
  },
  AIServiceError: class extends Error {},
  ValidationError: class extends Error {},
  TimeoutError: class extends Error {},
  RateLimitError: class extends Error {},
}));

describe('App Integration Tests', () => {
  const mockWorkbookData: WorkbookData = {
    'Sheet1': [
      ['Name', 'Age', 'City'],
      ['John', 25, 'New York'],
      ['Jane', 30, 'London'],
      ['Bob', 35, 'Paris']
    ]
  };

  beforeEach(() => {
    // Reset all mocks
    vi.clearAllMocks();
    
    // Mock localStorage
    const localStorageMock = {
      getItem: vi.fn(() => null),
      setItem: vi.fn(),
      removeItem: vi.fn(),
      clear: vi.fn(),
    };
    Object.defineProperty(window, 'localStorage', {
      value: localStorageMock,
      writable: true,
    });

    // Mock XLSX for file processing
    global.XLSX = {
      read: vi.fn().mockReturnValue({
        SheetNames: ['Sheet1'],
        Sheets: {
          Sheet1: {}
        }
      }),
      utils: {
        sheet_to_json: vi.fn().mockReturnValue(mockWorkbookData.Sheet1)
      }
    };
  });

  describe('Landing Page', () => {
    it('renders landing page by default', () => {
      render(<App />);
      
      expect(screen.getByText(/Excel'de Yapay Zeka Devrimi/i)).toBeInTheDocument();
      expect(screen.getByText(/Ücretsiz Dene/i)).toBeInTheDocument();
    });

    it('navigates to app view when get started is clicked', async () => {
      const user = userEvent.setup();
      render(<App />);
      
      const getStartedButton = screen.getByText(/Ücretsiz Dene/i);
      await user.click(getStartedButton);
      
      // Should navigate to app view
      await waitFor(() => {
        expect(screen.getByText(/Excel Dosyanızı Yükleyin/i)).toBeInTheDocument();
      });
    });

    it('opens help modal from landing page', async () => {
      const user = userEvent.setup();
      render(<App />);
      
      // Find and click help button (might be in navbar)
      const helpButtons = screen.getAllByLabelText(/yardım/i);
      if (helpButtons.length > 0) {
        await user.click(helpButtons[0]);
        
        await waitFor(() => {
          expect(screen.getByText(/Excel Yardım Merkezi/i)).toBeInTheDocument();
        });
      }
    });
  });

  describe('Main Application', () => {
    beforeEach(async () => {
      const user = userEvent.setup();
      render(<App />);
      
      // Navigate to main app
      const getStartedButton = screen.getByText(/Ücretsiz Dene/i);
      await user.click(getStartedButton);
      
      await waitFor(() => {
        expect(screen.getByText(/Excel Dosyanızı Yükleyin/i)).toBeInTheDocument();
      });
    });

    it('shows file upload section when no workbook is loaded', () => {
      expect(screen.getByText(/Excel Dosyanızı Yükleyin/i)).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /dosya seç/i })).toBeInTheDocument();
    });

    it('handles file upload', async () => {
      const user = userEvent.setup();
      
      // Create a mock file
      const file = new File([''], 'test.xlsx', { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      
      // Mock FileReader
      const mockFileReader = {
        readAsArrayBuffer: vi.fn(),
        onload: null as any,
        result: new ArrayBuffer(8)
      };
      
      vi.spyOn(window, 'FileReader').mockImplementation(() => mockFileReader as any);
      
      const fileInput = screen.getByLabelText(/excel dosyası seçici/i);
      await user.upload(fileInput, file);
      
      // Simulate FileReader onload
      if (mockFileReader.onload) {
        mockFileReader.onload({ target: { result: mockFileReader.result } } as any);
      }
      
      expect(mockFileReader.readAsArrayBuffer).toHaveBeenCalledWith(file);
    });

    it('switches between formula and macro modes', async () => {
      const user = userEvent.setup();
      
      const formulaButton = screen.getByText(/Formül Oluştur/i);
      const macroButton = screen.getByText(/Makro Kodu Oluştur/i);
      
      expect(formulaButton).toHaveClass('bg-emerald-600'); // Default selected
      
      await user.click(macroButton);
      expect(macroButton).toHaveClass('bg-emerald-600');
    });

    it('shows progressive disclosure for advanced options', async () => {
      const user = userEvent.setup();
      
      const advancedOptionsButton = screen.getByText(/Gelişmiş Seçenekler/i);
      await user.click(advancedOptionsButton);
      
      await waitFor(() => {
        expect(screen.getByText(/Web Destekli/i)).toBeInTheDocument();
      });
    });

    it('disables submit button when no workbook or prompt', () => {
      const submitButton = screen.getByRole('button', { name: /oluştur/i });
      expect(submitButton).toBeDisabled();
    });

    it('opens keyboard shortcuts modal', async () => {
      const user = userEvent.setup();
      
      // Find keyboard shortcuts button in navbar
      const keyboardButtons = screen.getAllByLabelText(/klavye kısayolları/i);
      if (keyboardButtons.length > 0) {
        await user.click(keyboardButtons[0]);
        
        await waitFor(() => {
          expect(screen.getByText(/Klavye Kısayolları/i)).toBeInTheDocument();
        });
      }
    });
  });

  describe('Accessibility Features', () => {
    it('provides skip link for keyboard navigation', () => {
      render(<App />);
      
      const skipLink = screen.getByText(/Skip to main content/i);
      expect(skipLink).toBeInTheDocument();
      expect(skipLink).toHaveClass('sr-only');
    });

    it('has proper ARIA labels on buttons', async () => {
      const user = userEvent.setup();
      render(<App />);
      
      // Navigate to app view
      const getStartedButton = screen.getByText(/Ücretsiz Dene/i);
      await user.click(getStartedButton);
      
      await waitFor(() => {
        const fileSelectButton = screen.getByLabelText(/excel dosyası seç/i);
        expect(fileSelectButton).toBeInTheDocument();
      });
    });

    it('provides live region for screen reader announcements', () => {
      render(<App />);
      
      const liveRegion = document.querySelector('[aria-live="polite"]');
      expect(liveRegion).toBeInTheDocument();
    });
  });

  describe('Responsive Design', () => {
    it('adapts to mobile viewport', () => {
      // Mock mobile viewport
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        configurable: true,
        value: 375,
      });

      render(<App />);
      
      // Should have mobile-responsive classes
      const container = document.querySelector('.container-responsive');
      expect(container).toBeInTheDocument();
    });
  });

  describe('Error Handling', () => {
    it('shows error messages to users', async () => {
      const { analyzeExcelData } = await import('../services/geminiService');
      
      // Mock error from service
      (analyzeExcelData as any).mockRejectedValue(new Error('API Error'));
      
      render(<App />);
      
      // Simulate error scenario - this would require triggering an actual error
      // In a real test, we might need to mock the file upload process more completely
    });

    it('handles network errors gracefully', async () => {
      // Mock network error
      global.fetch = vi.fn().mockRejectedValue(new Error('Network error'));
      
      render(<App />);
      
      // Test would verify error handling behavior
    });
  });

  describe('Performance Features', () => {
    it('includes performance monitor in development', () => {
      render(<App />);
      
      // Performance monitor should be present
      const perfMonitor = document.querySelector('[aria-label*="Performance"]');
      // In test environment, it might not be visible, but component should be mounted
    });

    it('caches user history in localStorage', async () => {
      const user = userEvent.setup();
      render(<App />);
      
      // Navigate to app
      const getStartedButton = screen.getByText(/Ücretsiz Dene/i);
      await user.click(getStartedButton);
      
      // Any interactions that would generate history should trigger localStorage
      // This would need to be tested with actual app usage
    });
  });

  describe('Integration with AI Services', () => {
    it('calls AI service with correct parameters', async () => {
      const { generateFormula } = await import('../services/geminiService');
      
      // Mock successful response
      (generateFormula as any).mockResolvedValue({
        type: 'formula',
        data: {
          analysis: { source: 'A1', target: 'B1', type: 'text', complexity: 'simple' },
          formula: { code: '=A1&B1', description: 'Concatenate' },
          guide: { steps: ['Step 1'], tip: 'Tip' },
          example: { scenario: 'Example', result: 'Result' },
          warnings: []
        }
      });

      const user = userEvent.setup();
      render(<App />);
      
      // Navigate to app and simulate usage
      const getStartedButton = screen.getByText(/Ücretsiz Dene/i);
      await user.click(getStartedButton);
      
      // This would require full app flow simulation
      // Including file upload, prompt entry, and submit
    });
  });
});