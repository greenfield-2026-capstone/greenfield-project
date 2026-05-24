import { AirportCode } from "@/types/place";

export const airports: { code: AirportCode | "all"; label: string; englishLabel: string }[] = [
  { code: "all", label: "전체", englishLabel: "All" },
  { code: "ICN", label: "인천공항", englishLabel: "Incheon Airport" },
  { code: "GMP", label: "김포공항", englishLabel: "Gimpo Airport" },
  { code: "PUS", label: "김해공항", englishLabel: "Gimhae Airport" },
  { code: "CJU", label: "제주공항", englishLabel: "Jeju Airport" }
];
