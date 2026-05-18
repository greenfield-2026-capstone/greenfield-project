"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { airports } from "@/lib/airports";

export function AirportFilter() {
  const router = useRouter();
  const params = useSearchParams();
  const value = params.get("airport") ?? "all";

  return (
    <div className="filter-row">
      <label htmlFor="airport-filter">공항 필터</label>
      <select
        id="airport-filter"
        value={value}
        onChange={(event) => {
          const next = event.target.value;
          const search = new URLSearchParams(params.toString());
          if (next === "all") {
            search.delete("airport");
          } else {
            search.set("airport", next);
          }
          router.push(`/?${search.toString()}`);
        }}
      >
        {airports.map((airport) => (
          <option key={airport.code} value={airport.code}>
            {airport.label}
          </option>
        ))}
      </select>
    </div>
  );
}
