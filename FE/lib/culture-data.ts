import curatedPlaces from "@/data/curated/places.json";
import { AirportCode, Character, Place } from "@/types/place";

type SeedCharacter = {
  id: string;
  name: string;
  role: string;
  summary: string;
  image_url: string;
  opening_line: string;
  source_title: string;
  focus_keywords: string[];
};

type SeedExperience = {
  title: string;
  category: string;
  description: string;
  address: string;
  distance?: string | null;
  source?: string | null;
};

type SeedPlace = {
  id: string;
  name: string;
  location: string;
  district: string;
  airport_codes: AirportCode[];
  airport_label: string;
  rank_label: string;
  era: string;
  summary: string;
  story_intro: string;
  image_url: string;
  tags: string[];
  source_title: string;
  source_url?: string | null;
  highlights: string[];
  foreigner_note: string;
  buzz_title: string;
  buzz_stat: string;
  recommendation_items: string[];
  data_sources: string[];
  ending_video: {
    good: {
      title: string;
      description: string;
      thumbnailUrl: string;
    };
    bad: {
      title: string;
      description: string;
      thumbnailUrl: string;
    };
  };
  characters: SeedCharacter[];
  experiences: SeedExperience[];
};

const LOCAL_CHARACTER_IMAGES: Record<string, string> = {
  taejo: "/characters/taejo.jpg",
};

const LOCAL_CHARACTER_IMAGE_POSITIONS: Record<string, string> = {
  taejo: "center 12%",
  taejong: "center 14%",
  heungseon: "center 10%",
  gojong: "center 16%",
  jeongjo: "center 18%",
  chusa: "center 20%",
};

function toCharacter(character: SeedCharacter): Character {
  return {
    id: character.id,
    name: character.name,
    role: character.role,
    summary: character.summary,
    imageUrl: LOCAL_CHARACTER_IMAGES[character.id] ?? character.image_url,
    imagePosition: LOCAL_CHARACTER_IMAGE_POSITIONS[character.id],
    openingLine: character.opening_line,
    sourceTitle: character.source_title,
    focusKeywords: character.focus_keywords,
  };
}

function toPlace(place: SeedPlace): Place {
  return {
    id: place.id,
    name: place.name,
    location: place.location,
    district: place.district,
    airportCodes: place.airport_codes,
    airportLabel: place.airport_label,
    rankLabel: place.rank_label,
    era: place.era,
    summary: place.summary,
    storyIntro: place.story_intro,
    imageUrl: place.image_url,
    tags: place.tags,
    sourceTitle: place.source_title,
    sourceUrl: place.source_url ?? undefined,
    highlights: place.highlights,
    foreignerNote: place.foreigner_note,
    buzzTitle: place.buzz_title,
    buzzStat: place.buzz_stat,
    recommendationItems: place.recommendation_items,
    dataSources: place.data_sources,
    endingVideo: place.ending_video,
    characters: place.characters.map(toCharacter),
    experiences: place.experiences.map((experience) => ({
      title: experience.title,
      category: experience.category,
      description: experience.description,
      address: experience.address,
      distance: experience.distance ?? undefined,
      source: experience.source ?? undefined,
    })),
  };
}

const places: Place[] = (curatedPlaces as SeedPlace[]).map(toPlace);

export function getAllPlaces() {
  return places;
}

export function getFilteredPlaces(airport: AirportCode | "all") {
  return airport === "all" ? places : places.filter((place) => place.airportCodes.includes(airport));
}

export function getPlace(placeId: string) {
  return places.find((place) => place.id === placeId);
}

export function getCharacter(placeId: string, characterId: string) {
  return getPlace(placeId)?.characters.find((character) => character.id === characterId);
}
