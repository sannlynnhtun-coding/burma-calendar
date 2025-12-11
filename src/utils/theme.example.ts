/**
 * USAGE EXAMPLES FOR MYANMAR SEASONAL THEMING SYSTEM
 * 
 * This file demonstrates how to use the dynamic theming system
 * in your React components with Tailwind CSS and inline styles.
 */

import { getCurrentTheme, getThemeColors, getThemeTailwindClasses } from './theme';

// ============================================================================
// Example 1: Get Current Theme (Automatic - uses current date)
// ============================================================================

const currentTheme = getCurrentTheme();
console.log('Current Theme:', currentTheme);
// Output:
// {
//   name: "Cool & Crisp" | "Warm & Energetic" | "Lush & Calm",
//   season: "cool" | "hot" | "rainy",
//   colors: {
//     primary: "#1565C0",
//     secondary: "#42A5F5",
//     background: "#FFFFFF",
//     text: "#1A1A1A"
//   }
// }

// ============================================================================
// Example 2: Get Theme Colors Only (JSON object)
// ============================================================================

const colors = getThemeColors();
console.log('Theme Colors:', colors);
// Output:
// {
//   primary: "#1565C0",
//   secondary: "#42A5F5",
//   background: "#FFFFFF",
//   text: "#1A1A1A"
// }

// ============================================================================
// Example 3: Get Theme for a Specific Date
// ============================================================================

const januaryTheme = getCurrentTheme(new Date(2024, 0, 15)); // January
const julyTheme = getCurrentTheme(new Date(2024, 6, 15));    // July
const aprilTheme = getCurrentTheme(new Date(2024, 3, 15));   // April

// ============================================================================
// Example 4: Using in React Component with Inline Styles
// ============================================================================

export function ExampleComponentWithInlineStyles() {
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

// ============================================================================
// Example 5: Using with Tailwind CSS (Arbitrary Values)
// ============================================================================

export function ExampleComponentWithTailwind() {
  const theme = getCurrentTheme();
  const tailwindClasses = getThemeTailwindClasses(theme);
  
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

// ============================================================================
// Example 6: Using CSS Variables (Recommended for Dynamic Theming)
// ============================================================================

export function ExampleComponentWithCSSVariables() {
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

// ============================================================================
// Example 7: Complete App-Level Implementation
// ============================================================================

export function ExampleAppImplementation() {
  const theme = getCurrentTheme();
  
  return (
    <div 
      className="min-h-screen transition-colors duration-300"
      style={{ 
        backgroundColor: theme.colors.background,
        color: theme.colors.text 
      }}
    >
      {/* Header with primary color */}
      <header 
        className="shadow-md"
        style={{ backgroundColor: theme.colors.primary }}
      >
        <div className="container mx-auto px-4 py-4">
          <h1 className="text-white text-2xl font-bold">
            Myanmar Calendar - {theme.name}
          </h1>
        </div>
      </header>
      
      {/* Main content */}
      <main className="container mx-auto px-4 py-8">
        <div className="space-y-4">
          {/* Card with secondary color accent */}
          <div 
            className="p-6 rounded-lg shadow-lg border-l-4"
            style={{ 
              borderLeftColor: theme.colors.secondary,
              backgroundColor: theme.colors.background 
            }}
          >
            <h2 className="text-xl font-semibold mb-2" style={{ color: theme.colors.primary }}>
              Current Season: {theme.season}
            </h2>
            <p>Theme: {theme.name}</p>
          </div>
          
          {/* Buttons */}
          <div className="flex gap-4">
            <button 
              className="px-6 py-3 rounded-lg font-medium text-white transition-opacity hover:opacity-90"
              style={{ backgroundColor: theme.colors.primary }}
            >
              Primary Action
            </button>
            <button 
              className="px-6 py-3 rounded-lg font-medium text-white transition-opacity hover:opacity-90"
              style={{ backgroundColor: theme.colors.secondary }}
            >
              Secondary Action
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}

// ============================================================================
// Example 8: Using with useMemo for Performance
// ============================================================================

import { useMemo } from 'react';

export function ExampleOptimizedComponent() {
  // Memoize theme to avoid recalculation on every render
  const theme = useMemo(() => getCurrentTheme(), []);
  
  return (
    <div style={{ backgroundColor: theme.colors.background }}>
      <h1 style={{ color: theme.colors.primary }}>{theme.name}</h1>
    </div>
  );
}

// ============================================================================
// Example 9: Dynamic Theme Based on Selected Date (for Calendar Apps)
// ============================================================================

export function ExampleWithDateSelection(selectedDate: Date) {
  // Get theme based on the selected date, not current date
  const theme = getCurrentTheme(selectedDate);
  
  return (
    <div style={{ backgroundColor: theme.colors.background }}>
      <h1 style={{ color: theme.colors.primary }}>
        {selectedDate.toLocaleDateString()} - {theme.name}
      </h1>
    </div>
  );
}
