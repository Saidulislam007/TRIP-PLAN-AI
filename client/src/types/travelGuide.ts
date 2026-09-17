export type TravelGuideSection = {
  title: string;
  text: string;
};

export type TravelGuide = {
  _id?: string;
  id: string;
  title: string;
  description: string;
  category: string;
  image: string;
  minutes: number;
  tags: string[];
  sections: TravelGuideSection[];
  sortOrder?: number;
  isActive?: boolean;
};
