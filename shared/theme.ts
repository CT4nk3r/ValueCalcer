export const colors = {
  primary: '#3B82F6',
  background: '#FFFFFF',
  surface: '#F9FAFB',
  text: '#111827',
  textSecondary: '#6B7280',
  success: '#10B981',
  successLight: '#D1FAE5',
  border: '#E5E7EB',
  white: '#FFFFFF',
  error: '#EF4444',
};

export const spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  xxl: 32,
};

export const borderRadius = {
  sm: 4,
  md: 8,
  lg: 16,
  xl: 24,
};

export const fontSize = {
  sm: 12,
  md: 14,
  lg: 16,
  xl: 20,
  xxl: 28,
};

export const theme = {
  colors,
  spacing,
  borderRadius,
  fontSize,
};

export type Theme = typeof theme;

export function injectCSSVariables(): void {
  if (typeof document === 'undefined') return;
  const root = document.documentElement;
  root.style.setProperty('--color-primary', colors.primary);
  root.style.setProperty('--color-background', colors.background);
  root.style.setProperty('--color-surface', colors.surface);
  root.style.setProperty('--color-text', colors.text);
  root.style.setProperty('--color-text-secondary', colors.textSecondary);
  root.style.setProperty('--color-success', colors.success);
  root.style.setProperty('--color-success-light', colors.successLight);
  root.style.setProperty('--color-border', colors.border);
  root.style.setProperty('--color-error', colors.error);
}
