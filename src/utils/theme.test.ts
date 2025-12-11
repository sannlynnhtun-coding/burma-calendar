/**
 * Test file to verify Myanmar seasonal theming logic
 * Run with: node -r ts-node/register src/utils/theme.test.ts
 * Or use in your test framework
 */

import { getCurrentTheme, getThemeColors, getMyanmarSeason, MyanmarSeason } from './theme';

// Test function to verify season logic
function testSeasonLogic() {
  console.log('Testing Myanmar Seasonal Theming System\n');
  console.log('='.repeat(50));

  // Test each month
  const testCases = [
    { month: 0, name: 'January', expected: MyanmarSeason.COOL },
    { month: 1, name: 'February', expected: MyanmarSeason.COOL },
    { month: 2, name: 'March', expected: MyanmarSeason.HOT },
    { month: 3, name: 'April', expected: MyanmarSeason.HOT },
    { month: 4, name: 'May', expected: MyanmarSeason.HOT },
    { month: 5, name: 'June', expected: MyanmarSeason.RAINY },
    { month: 6, name: 'July', expected: MyanmarSeason.RAINY },
    { month: 7, name: 'August', expected: MyanmarSeason.RAINY },
    { month: 8, name: 'September', expected: MyanmarSeason.RAINY },
    { month: 9, name: 'October', expected: MyanmarSeason.RAINY },
    { month: 10, name: 'November', expected: MyanmarSeason.COOL },
    { month: 11, name: 'December', expected: MyanmarSeason.COOL },
  ];

  let passed = 0;
  let failed = 0;

  testCases.forEach(({ month, name, expected }) => {
    const season = getMyanmarSeason(month);
    const theme = getCurrentTheme(new Date(2024, month, 15));
    const colors = getThemeColors(new Date(2024, month, 15));

    const isCorrect = season === expected;
    if (isCorrect) {
      passed++;
    } else {
      failed++;
    }

    console.log(`\n${name} (Month ${month}):`);
    console.log(`  Season: ${season} ${isCorrect ? '✓' : '✗ (Expected: ' + expected + ')'}`);
    console.log(`  Theme: ${theme.name}`);
    console.log(`  Colors:`, colors);
  });

  console.log('\n' + '='.repeat(50));
  console.log(`Results: ${passed} passed, ${failed} failed`);

  // Test current date
  console.log('\n' + '='.repeat(50));
  console.log('Current Date Theme:');
  const currentTheme = getCurrentTheme();
  console.log(`  Season: ${currentTheme.season}`);
  console.log(`  Theme: ${currentTheme.name}`);
  console.log(`  Colors:`, currentTheme.colors);
  console.log('='.repeat(50));
}

// Run tests if executed directly
if (require.main === module) {
  testSeasonLogic();
}

export { testSeasonLogic };
