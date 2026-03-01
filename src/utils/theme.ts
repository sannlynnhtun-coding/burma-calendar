import { Theme, ThemeColors, MyanmarSeason } from '../types/theme';

export function getMyanmarSeason(month: number): MyanmarSeason {
  if (month === 10 || month === 11 || month === 0 || month === 1) {
    return MyanmarSeason.COOL;
  }
  if (month === 2 || month === 3 || month === 4) {
    return MyanmarSeason.HOT;
  }
  return MyanmarSeason.RAINY;
}

function getSeasonColors(season: MyanmarSeason, isDark: boolean): ThemeColors {
  if (isDark) {
    switch (season) {
      case MyanmarSeason.COOL:
        return {
          primary: '#3b82f6',
          secondary: '#1e3a8a',
          background: '#020617',
          text: '#f8fafc',
          card: '#0f172a',
          border: '#1e293b',
          accent: '#38bdf8',
        };
      case MyanmarSeason.HOT:
        return {
          primary: '#f59e0b',
          secondary: '#78350f',
          background: '#0c0a09',
          text: '#fafaf9',
          card: '#1c1917',
          border: '#292524',
          accent: '#fbbf24',
        };
      case MyanmarSeason.RAINY:
        return {
          primary: '#10b981',
          secondary: '#064e3b',
          background: '#020617',
          text: '#f8fafc',
          card: '#0f172a',
          border: '#1e293b',
          accent: '#34d399',
        };
    }
  }

  // Light Mode
  switch (season) {
    case MyanmarSeason.COOL:
      return {
        primary: '#2563eb',
        secondary: '#dbeafe',
        background: '#f8fafc',
        text: '#0f172a',
        card: '#ffffff',
        border: '#e2e8f0',
        accent: '#3b82f6',
      };
    case MyanmarSeason.HOT:
      return {
        primary: '#d97706',
        secondary: '#fef3c7',
        background: '#fffcf2',
        text: '#451a03',
        card: '#ffffff',
        border: '#fed7aa',
        accent: '#f59e0b',
      };
    case MyanmarSeason.RAINY:
      return {
        primary: '#059669',
        secondary: '#d1fae5',
        background: '#f0fdf4',
        text: '#064e3b',
        card: '#ffffff',
        border: '#bbf7d0',
        accent: '#10b981',
      };
  }
}

function getSeasonThemeName(season: MyanmarSeason): string {
  switch (season) {
    case MyanmarSeason.COOL: return 'Cool & Crisp';
    case MyanmarSeason.HOT: return 'Warm & Energetic';
    case MyanmarSeason.RAINY: return 'Lush & Calm';
    default: return 'Cool & Crisp';
  }
}

export function getCurrentTheme(date?: Date): Theme {
  const currentDate = date || new Date();
  const month = currentDate.getMonth();
  const season = getMyanmarSeason(month);

  return {
    name: getSeasonThemeName(season),
    season,
    light: getSeasonColors(season, false),
    dark: getSeasonColors(season, true),
  };
}

export function applyTheme(theme: Theme, isDark: boolean) {
  const colors = isDark ? theme.dark : theme.light;
  const root = document.documentElement;

  root.style.setProperty('--primary-hex', colors.primary);
  root.style.setProperty('--secondary-hex', colors.secondary);
  root.style.setProperty('--background-hex', colors.background);
  root.style.setProperty('--text-hex', colors.text);
  root.style.setProperty('--card-hex', colors.card);
  root.style.setProperty('--border-hex', colors.border);
  root.style.setProperty('--accent-hex', colors.accent);
}
