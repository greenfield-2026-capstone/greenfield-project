import { AirportCode } from "@/types/place";

export const airports: { code: AirportCode | "all"; label: string }[] = [
  { code: "all", label: "전체" },
  { code: "ICN", label: "인천공항" },
  { code: "GMP", label: "김포공항" },
  { code: "PUS", label: "김해공항" },
  { code: "CJU", label: "제주공항" }
];
