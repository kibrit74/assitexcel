import '@testing-library/jest-dom';
import { cleanup } from '@testing-library/react';
import { afterEach, beforeAll, afterAll, vi } from 'vitest';
import React from 'react';

// Cleanup after each test case
afterEach(() => {
  cleanup();
});

// Mock environment variables for testing
beforeAll(() => {
  // Mock process.env for Gemini API
  vi.stubGlobal('process', {
    env: {
      API_KEY: 'test-api-key',
      NODE_ENV: 'test',
    }
  });

  // Mock XLSX global
  vi.stubGlobal('XLSX', {
    read: vi.fn(),
    utils: {
      sheet_to_json: vi.fn(),
    },
  });

  // Mock window.matchMedia for responsive hooks
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: vi.fn().mockImplementation(query => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    })),
  });

  // Mock IntersectionObserver
  global.IntersectionObserver = vi.fn().mockImplementation(() => ({
    observe: vi.fn(),
    unobserve: vi.fn(),
    disconnect: vi.fn(),
  }));

  // Mock ResizeObserver
  global.ResizeObserver = vi.fn().mockImplementation(() => ({
    observe: vi.fn(),
    unobserve: vi.fn(),
    disconnect: vi.fn(),
  }));

  // Mock localStorage
  const localStorageMock = {
    getItem: vi.fn(),
    setItem: vi.fn(),
    removeItem: vi.fn(),
    clear: vi.fn(),
  };
  vi.stubGlobal('localStorage', localStorageMock);

  // Mock performance.memory for MemoryMonitor
  Object.defineProperty(performance, 'memory', {
    writable: true,
    value: {
      usedJSHeapSize: 1024 * 1024, // 1MB
      totalJSHeapSize: 2048 * 1024, // 2MB
    },
  });

  // Mock fetch for API calls
  global.fetch = vi.fn();
});

afterAll(() => {
  vi.restoreAllMocks();
});

// Custom render function for components with providers
import { render } from '@testing-library/react';
import AccessibilityProvider from '../../components/AccessibilityEnhancements';

export const renderWithProviders = (ui: React.ReactElement, options = {}) => {
  const Wrapper = ({ children }: { children: React.ReactNode }) => (
    React.createElement(AccessibilityProvider, null, children)
  );

  return render(ui, { wrapper: Wrapper, ...options });
};

// Re-export everything
export * from '@testing-library/react';
export { renderWithProviders as render };