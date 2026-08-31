export const ENGLISH_MONTHS = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
] as const;

export const MYANMAR_MONTH_PAIRS = [
  'နတ်တော် / ပြာသို',
  'ပြာသို / တပို့တွဲ',
  'တပို့တွဲ / တပေါင်း',
  'တပေါင်း / တန်ခူး',
  'တန်ခူး / ကဆုန်',
  'ကဆုန် / နယုန်',
  'နယုန် / ဝါဆို',
  'ဝါဆို / ဝါခေါင်',
  'ဝါခေါင် / တော်သလင်း',
  'တော်သလင်း / သီတင်းကျွတ်',
  'သီတင်းကျွတ် / တန်ဆောင်မုန်း',
  'တန်ဆောင်မုန်း / နတ်တော်',
] as const;

export const WEEKDAYS = [
  { short: 'SUN', myanmar: 'တနင်္ဂနွေ' },
  { short: 'MON', myanmar: 'တနင်္လာ' },
  { short: 'TUE', myanmar: 'အင်္ဂါ' },
  { short: 'WED', myanmar: 'ဗုဒ္ဓဟူး' },
  { short: 'THU', myanmar: 'ကြာသပတေး' },
  { short: 'FRI', myanmar: 'သောကြာ' },
  { short: 'SAT', myanmar: 'စနေ' },
] as const;

const MYANMAR_DIGITS: Record<string, string> = {
  '0': '၀',
  '1': '၁',
  '2': '၂',
  '3': '၃',
  '4': '၄',
  '5': '၅',
  '6': '၆',
  '7': '၇',
  '8': '၈',
  '9': '၉',
};

export function toMyanmarNumerals(value: number | string): string {
  return String(value)
    .split('')
    .map((digit) => MYANMAR_DIGITS[digit] ?? digit)
    .join('');
}

export function getMyanmarEraLabel(date: Date): string {
  const year = date.getFullYear();
  const month = date.getMonth();

  if (month === 3) {
    return `${toMyanmarNumerals(year - 639)} / ${toMyanmarNumerals(year - 638)}`;
  }

  return toMyanmarNumerals(year - (month < 3 ? 639 : 638));
}
