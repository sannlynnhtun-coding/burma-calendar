# Myanmar Seasonal Theming System

A dynamic theming system that automatically changes based on the current month, following Myanmar's 3 distinct seasons.

## Overview

The theming system provides automatic color palette switching based on Myanmar's traditional seasons:
- **Cool Season** (Nov, Dec, Jan, Feb): Cool & Crisp theme
- **Hot Season** (Mar, Apr, May): Warm & Energetic theme  
- **Rainy Season** (Jun, Jul, Aug, Sep, Oct): Lush & Calm theme

## Quick Start

### Basic Usage

```typescript
import { getCurrentTheme, getThemeColors } from './utils/theme';

// Get complete theme object
const theme = getCurrentTheme();
console.log(theme);
// {
//   name: "Cool & Crisp",
//   season: "cool",
//   colors: {
//     primary: "#1565C0",
//     secondary: "#42A5F5",
//     background: "#FFFFFF",
//     text: "#1A1A1A"
//   }
// }

// Get just the colors (JSON object)
const colors = getThemeColors();
console.log(colors);
// {
//   primary: "#1565C0",
//   secondary: "#42A5F5",
//   background: "#FFFFFF",
//   text: "#1A1A1A"
// }
```

### Get Theme for Specific Date

```typescript
// Get theme for a specific date (useful for calendar apps)
const januaryTheme = getCurrentTheme(new Date(2024, 0, 15)); // January
const julyTheme = getCurrentTheme(new Date(2024, 6, 15));    // July
```

## Color Palettes

### Cool Season (November - February)
- **Primary**: `#1565C0` (Blue)
- **Secondary**: `#42A5F5` (Light Blue)
- **Background**: `#FFFFFF` (White)
- **Text**: `#1A1A1A` (Dark Gray)

### Hot Season (March - May)
- **Primary**: `#FFB300` (Gold)
- **Secondary**: `#FF8F00` (Darker Gold/Orange)
- **Background**: `#FFF8E1` (Warm Cream)
- **Text**: `#3E2723` (Dark Brown)

### Rainy Season (June - October)
- **Primary**: `#00695C` (Emerald)
- **Secondary**: `#26A69A` (Light Teal)
- **Background**: `#ECEFF1` (Mist Grey)
- **Text**: `#1A1A1A` (Dark Gray)

## Usage Examples

### 1. Inline Styles (React)

```tsx
import { getCurrentTheme } from './utils/theme';

function MyComponent() {
  const theme = getCurrentTheme();
  
  return (
    <div 
      style={{ 
        backgroundColor: theme.colors.background,
        color: theme.colors.text 
      }}
    >
      <h1 style={{ color: theme.colors.primary }}>
        {theme.name} Season
      </h1>
      <button 
        style={{ 
          backgroundColor: theme.colors.primary,
          color: '#FFFFFF'
        }}
      >
        Primary Button
      </button>
    </div>
  );
}
```

### 2. Tailwind CSS (Arbitrary Values)

```tsx
import { getCurrentTheme } from './utils/theme';

function MyComponent() {
  const theme = getCurrentTheme();
  
  return (
    <div className={`bg-[${theme.colors.background}] text-[${theme.colors.text}]`}>
      <h1 className={`text-[${theme.colors.primary}]`}>
        {theme.name} Season
      </h1>
      <button className={`bg-[${theme.colors.primary}] text-white px-4 py-2 rounded`}>
        Primary Button
      </button>
    </div>
  );
}
```

### 3. CSS Variables (Recommended)

```tsx
import { getCurrentTheme } from './utils/theme';

function MyComponent() {
  const theme = getCurrentTheme();
  
  const style = {
    '--theme-primary': theme.colors.primary,
    '--theme-secondary': theme.colors.secondary,
    '--theme-background': theme.colors.background,
    '--theme-text': theme.colors.text,
  } as React.CSSProperties;
  
  return (
    <div style={style} className="bg-[var(--theme-background)] text-[var(--theme-text)]">
      <h1 className="text-[var(--theme-primary)]">
        {theme.name} Season
      </h1>
      <button className="bg-[var(--theme-primary)] text-white px-4 py-2 rounded">
        Primary Button
      </button>
    </div>
  );
}
```

### 4. With useMemo (Performance Optimization)

```tsx
import { useMemo } from 'react';
import { getCurrentTheme } from './utils/theme';

function MyComponent({ currentDate }: { currentDate: Date }) {
  // Memoize theme to avoid recalculation on every render
  const theme = useMemo(() => getCurrentTheme(currentDate), [currentDate]);
  
  return (
    <div style={{ backgroundColor: theme.colors.background }}>
      <h1 style={{ color: theme.colors.primary }}>{theme.name}</h1>
    </div>
  );
}
```

## API Reference

### `getCurrentTheme(date?: Date): Theme`

Returns the complete theme object for the specified date (or current date if not provided).

**Parameters:**
- `date` (optional): Date object. Defaults to `new Date()`

**Returns:**
```typescript
{
  name: string;        // Theme name: "Cool & Crisp" | "Warm & Energetic" | "Lush & Calm"
  season: string;      // Season: "cool" | "hot" | "rainy"
  colors: {
    primary: string;   // Hex color code
    secondary: string;  // Hex color code
    background: string; // Hex color code
    text: string;      // Hex color code
  }
}
```

### `getThemeColors(date?: Date): ThemeColors`

Returns just the color palette as a JSON object.

**Parameters:**
- `date` (optional): Date object. Defaults to `new Date()`

**Returns:**
```typescript
{
  primary: string;
  secondary: string;
  background: string;
  text: string;
}
```

### `getMyanmarSeason(month: number): MyanmarSeason`

Determines the Myanmar season based on month number (0-11).

**Parameters:**
- `month`: Month number (0 = January, 11 = December)

**Returns:**
- `MyanmarSeason.COOL` | `MyanmarSeason.HOT` | `MyanmarSeason.RAINY`

## Implementation in App.tsx

The theming system is already integrated into the main App component:

```tsx
// Get dynamic theme based on current date's month
const theme = useMemo(() => getCurrentTheme(currentDate), [currentDate]);

// Apply to background
<div 
  className="min-h-screen transition-colors duration-500"
  style={{ backgroundColor: theme.colors.background }}
>

// Apply to footer
<footer 
  className="text-white text-center py-6 mt-12 transition-colors duration-500"
  style={{ backgroundColor: theme.colors.primary }}
>
```

## Notes

- The theme automatically updates when the `currentDate` changes
- Smooth transitions are achieved using Tailwind's `transition-colors` class
- The system uses 0-based month indexing (0 = January, 11 = December) as per JavaScript Date API
- All color values are provided as hex codes for maximum compatibility
