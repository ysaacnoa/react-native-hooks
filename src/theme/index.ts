import { colors } from './colors';
import { spacing } from './token-spacing';
import { radius } from './token-radius';
import { typography } from './typography';

export const theme = {
  colors,
  spacing,
  radius,
  typography,
} as const;

export type Theme = typeof theme;
