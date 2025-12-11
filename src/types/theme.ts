/**
 * Theme configuration interface for Myanmar seasonal theming
 */
export interface ThemeColors {
  primary: string;
  secondary: string;
  background: string;
  text: string;
}

export interface Theme {
  name: string;
  season: 'cool' | 'hot' | 'rainy';
  colors: ThemeColors;
}

/**
 * Myanmar seasons enum
 */
export enum MyanmarSeason {
  COOL = 'cool',
  HOT = 'hot',
  RAINY = 'rainy',
}
