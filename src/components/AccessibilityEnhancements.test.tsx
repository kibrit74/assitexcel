import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {
  AccessibleButton,
  AccessibleInput,
  ProgressiveDisclosure,
  useBreakpoint,
  useHighContrast,
  useReducedMotion,
  AccessibilityProvider
} from '../../components/AccessibilityEnhancements';

describe('AccessibilityEnhancements', () => {
  describe('AccessibleButton', () => {
    it('renders with correct ARIA attributes', () => {
      const handleClick = vi.fn();
      
      render(
        <AccessibleButton
          onClick={handleClick}
          ariaLabel="Test button"
          ariaDescribedBy="button-help"
        >
          Click me
        </AccessibleButton>
      );

      const button = screen.getByRole('button', { name: 'Test button' });
      expect(button).toBeInTheDocument();
      expect(button).toHaveAttribute('aria-label', 'Test button');
      expect(button).toHaveAttribute('aria-describedby', 'button-help');
    });

    it('handles click events', async () => {
      const user = userEvent.setup();
      const handleClick = vi.fn();
      
      render(
        <AccessibleButton onClick={handleClick}>
          Click me
        </AccessibleButton>
      );

      const button = screen.getByRole('button');
      await user.click(button);
      
      expect(handleClick).toHaveBeenCalledOnce();
    });

    it('shows loading state correctly', () => {
      render(
        <AccessibleButton onClick={vi.fn()} loading={true}>
          Click me
        </AccessibleButton>
      );

      const button = screen.getByRole('button');
      expect(button).toHaveAttribute('aria-busy', 'true');
      expect(button).toBeDisabled();
    });

    it('applies correct variant styles', () => {
      const { rerender } = render(
        <AccessibleButton onClick={vi.fn()} variant="primary">
          Primary
        </AccessibleButton>
      );

      let button = screen.getByRole('button');
      expect(button).toHaveClass('bg-emerald-600');

      rerender(
        <AccessibleButton onClick={vi.fn()} variant="secondary">
          Secondary
        </AccessibleButton>
      );

      button = screen.getByRole('button');
      expect(button).toHaveClass('bg-slate-200');
    });
  });

  describe('AccessibleInput', () => {
    it('renders with proper labels and associations', () => {
      const handleChange = vi.fn();
      
      render(
        <AccessibleInput
          id="test-input"
          label="Test Input"
          value=""
          onChange={handleChange}
          helpText="This is help text"
        />
      );

      const input = screen.getByLabelText('Test Input');
      const helpText = screen.getByText('This is help text');
      
      expect(input).toBeInTheDocument();
      expect(input).toHaveAttribute('id', 'test-input');
      expect(input).toHaveAttribute('aria-describedby', 'test-input-help');
      expect(helpText).toHaveAttribute('id', 'test-input-help');
    });

    it('shows error state correctly', () => {
      render(
        <AccessibleInput
          id="test-input"
          label="Test Input"
          value=""
          onChange={vi.fn()}
          error="This field is required"
        />
      );

      const input = screen.getByLabelText('Test Input');
      const errorMessage = screen.getByText('This field is required');
      
      expect(input).toHaveAttribute('aria-invalid', 'true');
      expect(input).toHaveAttribute('aria-describedby', 'test-input-error');
      expect(errorMessage).toHaveAttribute('id', 'test-input-error');
      expect(errorMessage).toHaveAttribute('role', 'alert');
    });

    it('handles value changes', async () => {
      const user = userEvent.setup();
      const handleChange = vi.fn();
      
      render(
        <AccessibleInput
          id="test-input"
          label="Test Input"
          value=""
          onChange={handleChange}
        />
      );

      const input = screen.getByLabelText('Test Input');
      await user.type(input, 'Hello');
      
      expect(handleChange).toHaveBeenCalledTimes(5); // Once for each character
    });

    it('shows required indicator', () => {
      render(
        <AccessibleInput
          id="test-input"
          label="Test Input"
          value=""
          onChange={vi.fn()}
          required={true}
        />
      );

      expect(screen.getByText('*')).toHaveAttribute('aria-label', 'required');
    });
  });

  describe('ProgressiveDisclosure', () => {
    it('toggles content visibility', async () => {
      const user = userEvent.setup();
      
      render(
        <ProgressiveDisclosure title="Show more" defaultOpen={false}>
          <div>Hidden content</div>
        </ProgressiveDisclosure>
      );

      const button = screen.getByRole('button', { name: /show more/i });
      expect(button).toHaveAttribute('aria-expanded', 'false');
      expect(screen.queryByText('Hidden content')).not.toBeVisible();

      await user.click(button);
      
      expect(button).toHaveAttribute('aria-expanded', 'true');
      await waitFor(() => {
        expect(screen.getByText('Hidden content')).toBeVisible();
      });
    });

    it('starts open when defaultOpen is true', () => {
      render(
        <ProgressiveDisclosure title="Show more" defaultOpen={true}>
          <div>Visible content</div>
        </ProgressiveDisclosure>
      );

      const button = screen.getByRole('button', { name: /show more/i });
      expect(button).toHaveAttribute('aria-expanded', 'true');
      expect(screen.getByText('Visible content')).toBeVisible();
    });

    it('calls onToggle callback', async () => {
      const user = userEvent.setup();
      const handleToggle = vi.fn();
      
      render(
        <ProgressiveDisclosure 
          title="Show more" 
          defaultOpen={false}
          onToggle={handleToggle}
        >
          <div>Content</div>
        </ProgressiveDisclosure>
      );

      const button = screen.getByRole('button');
      await user.click(button);
      
      expect(handleToggle).toHaveBeenCalledWith(true);
    });
  });
});

describe('Accessibility Hooks', () => {
  describe('useBreakpoint', () => {
    it('returns correct breakpoint information', () => {
      // Mock window.innerWidth
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        configurable: true,
        value: 1024,
      });

      let result: any;
      const TestComponent = () => {
        result = useBreakpoint();
        return null;
      };

      render(<TestComponent />);

      expect(result.breakpoint).toBe('lg');
      expect(result.isDesktop).toBe(true);
      expect(result.isMobile).toBe(false);
      expect(result.isTablet).toBe(false);
    });
  });

  describe('useHighContrast', () => {
    it('detects high contrast preference', () => {
      // Mock matchMedia for high contrast
      const mockMatchMedia = vi.fn().mockImplementation(query => ({
        matches: query === '(prefers-contrast: high)',
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
      }));
      
      Object.defineProperty(window, 'matchMedia', {
        writable: true,
        value: mockMatchMedia,
      });

      let result: boolean;
      const TestComponent = () => {
        result = useHighContrast();
        return null;
      };

      render(<TestComponent />);
      expect(result!).toBe(true);
    });
  });

  describe('useReducedMotion', () => {
    it('detects reduced motion preference', () => {
      // Mock matchMedia for reduced motion
      const mockMatchMedia = vi.fn().mockImplementation(query => ({
        matches: query === '(prefers-reduced-motion: reduce)',
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
      }));
      
      Object.defineProperty(window, 'matchMedia', {
        writable: true,
        value: mockMatchMedia,
      });

      let result: boolean;
      const TestComponent = () => {
        result = useReducedMotion();
        return null;
      };

      render(<TestComponent />);
      expect(result!).toBe(true);
    });
  });
});

describe('AccessibilityProvider', () => {
  it('provides accessibility context to children', () => {
    render(
      <AccessibilityProvider>
        <div>Test content</div>
      </AccessibilityProvider>
    );

    expect(screen.getByText('Test content')).toBeInTheDocument();
    expect(screen.getByText('Skip to main content')).toBeInTheDocument();
  });

  it('includes screen reader announcer', () => {
    render(
      <AccessibilityProvider>
        <div>Test content</div>
      </AccessibilityProvider>
    );

    // Check for screen reader announcer region
    const announcer = document.querySelector('[aria-live="polite"]');
    expect(announcer).toBeInTheDocument();
    expect(announcer).toHaveAttribute('role', 'status');
  });
});