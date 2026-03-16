'use client';

import { useEffect } from 'react';
import { injectCSSVariables } from '../../../shared/theme';

export default function ThemeInjector() {
  useEffect(() => {
    try {
      injectCSSVariables();
    } catch (e) {
      console.error('Failed to inject CSS variables:', e);
    }
  }, []);

  return null;
}
