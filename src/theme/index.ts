import { theme, colors, spacing, borderRadius, fontSize, injectCSSVariables } from '../../shared/theme';
import type { Theme } from '../../shared/theme';

export { theme, colors, spacing, borderRadius, fontSize, injectCSSVariables };
export type { Theme };

export function useTheme() {
  return theme;
}
