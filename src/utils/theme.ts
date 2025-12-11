import { Theme, ThemeColors, MyanmarSeason } from '../types/theme';

/**
 * Determines the Myanmar season based on the current month
 * @param month - Month number (0-11, where 0 = January, 11 = December)
 * @returns The Myanmar season
 */
export function getMyanmarSeason(month: number): MyanmarSeason {
  // Cool Season: November (10), December (11), January (0), February (1)
  if (month === 10 || month === 11 || month === 0 || month === 1) {
    return MyanmarSeason.COOL;
  }
  
  // Hot Season: March (2), April (3), May (4)
  if (month === 2 || month === 3 || month === 4) {
    return MyanmarSeason.HOT;
  }
  
  // Rainy Season: June (5), July (6), August (7), September (8), October (9)
  return MyanmarSeason.RAINY;
}

/**
 * Gets the theme colors for a specific Myanmar season
 * @param season - The Myanmar season
 * @returns Theme color palette
 */
function getSeasonColors(season: MyanmarSeason): ThemeColors {
  switch (season) {
    case MyanmarSeason.COOL:
      return {
        primary: '#1565C0',      // Blue
        secondary: '#42A5F5',    // Light Blue (complementary)
        background: '#FFFFFF',    // White
        text: '#1A1A1A',         // Dark Gray (for readability on white)
      };
    
    case MyanmarSeason.HOT:
      return {
        primary: '#FFB300',      // Gold
        secondary: '#FF8F00',    // Darker Gold/Orange (complementary)
        background: '#FFF8E1',   // Warm Cream
        text: '#3E2723',         // Dark Brown (for readability on cream)
      };
    
    case MyanmarSeason.RAINY:
      return {
        primary: '#00695C',      // Emerald
        secondary: '#26A69A',    // Light Teal (complementary)
        background: '#ECEFF1',   // Mist Grey
        text: '#1A1A1A',         // Dark Gray (for readability on grey)
      };
    
    default:
      // Fallback to cool season
      return {
        primary: '#1565C0',
        secondary: '#42A5F5',
        background: '#FFFFFF',
        text: '#1A1A1A',
      };
  }
}

/**
 * Gets the theme name for a specific Myanmar season
 * @param season - The Myanmar season
 * @returns Theme name
 */
function getSeasonThemeName(season: MyanmarSeason): string {
  switch (season) {
    case MyanmarSeason.COOL:
      return 'Cool & Crisp';
    case MyanmarSeason.HOT:
      return 'Warm & Energetic';
    case MyanmarSeason.RAINY:
      return 'Lush & Calm';
    default:
      return 'Cool & Crisp';
  }
}

/**
 * Gets the current theme based on the current month
 * Automatically detects the current month and returns the appropriate theme
 * @param date - Optional date object. If not provided, uses current date
 * @returns Complete theme object with name, season, and colors
 */
export function getCurrentTheme(date?: Date): Theme {
  const currentDate = date || new Date();
  const month = currentDate.getMonth(); // 0-11 (0 = January, 11 = December)
  const season = getMyanmarSeason(month);
  
  return {
    name: getSeasonThemeName(season),
    season,
    colors: getSeasonColors(season),
  };
}

/**
 * Gets the theme colors as a JSON object
 * This is the main function requested - returns color palette based on current month
 * @param date - Optional date object. If not provided, uses current date
 * @returns JSON object containing the color palette (Primary, Secondary, Background, Text)
 */
export function getThemeColors(date?: Date): ThemeColors {
  const theme = getCurrentTheme(date);
  return theme.colors;
}

/**
 * Converts hex color to RGB values for use in CSS rgba() or Tailwind opacity
 * @param hex - Hex color string (e.g., '#1565C0')
 * @returns Object with r, g, b values (0-255)
 */
export function hexToRgb(hex: string): { r: number; g: number; b: number } | null {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : null;
}

/**
 * Generates Tailwind CSS classes based on theme colors
 * @param theme - Theme object
 * @returns Object with Tailwind-compatible class suggestions
 */
export function getThemeTailwindClasses(theme: Theme) {
  return {
    primary: `[color:${theme.colors.primary}]`,
    secondary: `[color:${theme.colors.secondary}]`,
    background: `[background-color:${theme.colors.background}]`,
    text: `[color:${theme.colors.text}]`,
    primaryBg: `[background-color:${theme.colors.primary}]`,
    secondaryBg: `[background-color:${theme.colors.secondary}]`,
  };
}
