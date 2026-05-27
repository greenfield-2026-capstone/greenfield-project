export type AirportCode = "ICN" | "GMP" | "PUS" | "CJU";

export interface Character {
  id: string;
  name: string;
  role: string;
  summary: string;
  imageUrl: string;
  imagePosition?: string;
  openingLine: string;
  sourceTitle: string;
  focusKeywords: string[];
}

export interface ExperienceItem {
  title: string;
  category: string;
  description: string;
  address: string;
  distance?: string;
  source?: string;
}

export interface EndingVideo {
  good: {
    title: string;
    description: string;
    thumbnailUrl: string;
    videoUrl?: string;
  };
  bad: {
    title: string;
    description: string;
    thumbnailUrl: string;
    videoUrl?: string;
  };
}

export interface Place {
  id: string;
  name: string;
  location: string;
  district: string;
  airportCodes: AirportCode[];
  airportLabel: string;
  rankLabel: string;
  era: string;
  summary: string;
  storyIntro: string;
  imageUrl: string;
  tags: string[];
  sourceTitle: string;
  sourceUrl?: string;
  highlights: string[];
  foreignerNote: string;
  buzzTitle: string;
  buzzStat: string;
  recommendationItems: string[];
  dataSources: string[];
  experiences: ExperienceItem[];
  characters: Character[];
  endingVideo: EndingVideo;
}
