export type LocaleCode = "ko" | "en";

export const languageOptions = [
  { code: "ko", label: "한국어" },
  { code: "en", label: "English" },
  { code: "zh-Hans", label: "简体中文" },
  { code: "zh-Hant", label: "繁體中文" },
  { code: "ja", label: "日本語" },
  { code: "th", label: "ไทย" },
  { code: "vi", label: "Tiếng Việt" },
  { code: "ru", label: "Русский" },
  { code: "fr", label: "Français" },
  { code: "de", label: "Deutsch" },
  { code: "es", label: "Español" },
] as const;

export const regionOptions = [
  { code: "KR", label: "대한민국" },
  { code: "US", label: "United States" },
  { code: "JP", label: "일본" },
  { code: "CN", label: "중국" },
  { code: "TW", label: "대만" },
  { code: "HK", label: "Hong Kong" },
  { code: "TH", label: "태국" },
  { code: "VN", label: "베트남" },
  { code: "SG", label: "Singapore" },
  { code: "MY", label: "Malaysia" },
  { code: "PH", label: "Philippines" },
  { code: "ID", label: "Indonesia" },
  { code: "AU", label: "Australia" },
  { code: "CA", label: "Canada" },
  { code: "GB", label: "United Kingdom" },
  { code: "FR", label: "France" },
  { code: "DE", label: "Germany" },
  { code: "ES", label: "España" },
] as const;

export function isEnglishSelected(value?: string | null) {
  return value === "en";
}
