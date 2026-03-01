/**
 * Theme configuration interface for Myanmar seasonal theming
 */
export interface ThemeColors {
  primary: string;
  secondary: string;
  background: string;
  text: string;
  card: string;
  border: string;
  accent: string;
}

export interface Theme {
  name: string;
  season: 'cool' | 'hot' | 'rainy';
  light: ThemeColors;
  dark: ThemeColors;
}

export enum MyanmarSeason {
  COOL = 'cool',
  HOT = 'hot',
  RAINY = 'rainy',
}
