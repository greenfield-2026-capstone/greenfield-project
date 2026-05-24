import { AirportCode, Character, Place } from "@/types/place";
import {
  getAllPlaces as getLocalAllPlaces,
  getCharacter as getLocalCharacter,
  getFilteredPlaces as getLocalFilteredPlaces,
  getPlace as getLocalPlace,
} from "@/lib/culture-data";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL ?? process.env.API_BASE_URL ?? "http://127.0.0.1:8000";
const USE_BACKEND_API =
  process.env.NEXT_PUBLIC_USE_BACKEND_API === "true" || process.env.USE_BACKEND_API === "true";

async function fetchJson<T>(path: string): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    next: { revalidate: 3600 },
  });

  if (!response.ok) {
    throw new Error(`API request failed: ${response.status} ${response.statusText}`);
  }

  return response.json();
}

export async function getAllPlaces() {
  if (!USE_BACKEND_API) {
    return getLocalAllPlaces();
  }

  try {
    return await fetchJson<Place[]>("/api/places");
  } catch {
    return getLocalAllPlaces();
  }
}

export async function getFilteredPlaces(airport: AirportCode | "all") {
  if (!USE_BACKEND_API) {
    return getLocalFilteredPlaces(airport);
  }

  try {
    return await fetchJson<Place[]>(`/api/places?airport=${airport}`);
  } catch {
    return getLocalFilteredPlaces(airport);
  }
}

export async function getPlace(placeId: string) {
  if (!USE_BACKEND_API) {
    return getLocalPlace(placeId);
  }

  try {
    return await fetchJson<Place>(`/api/places/${placeId}`);
  } catch {
    return getLocalPlace(placeId);
  }
}

export async function getCharacter(placeId: string, characterId: string): Promise<Character | undefined> {
  if (!USE_BACKEND_API) {
    return getLocalCharacter(placeId, characterId);
  }

  try {
    const characters = await fetchJson<Character[]>(`/api/places/${placeId}/characters`);
    return characters.find((character) => character.id === characterId);
  } catch {
    return getLocalCharacter(placeId, characterId);
  }
}
