export type TravelCategory = {
  _id: string;
  title: string;
  description: string;
  slug: string;
  image: string;
  destinations: number;
  href: string;
  sortOrder: number;
  isActive: boolean;
};

const TRAVEL_CATEGORIES: TravelCategory[] = [
  {
    _id: "backpacking",
    title: "Backpacking",
    description: "Travel freely",
    slug: "backpacking",
    image: "/assets/jaflong/cover-1.jpg",
    destinations: 20,
    href: "/destinations?category=backpacking",
    sortOrder: 1,
    isActive: true,
  },
  {
    _id: "adventure",
    title: "Adventure",
    description: "Go beyond the familiar",
    slug: "adventure",
    image: "/assets/Sajek/cover-1.jpg",
    destinations: 24,
    href: "/destinations?category=adventure",
    sortOrder: 2,
    isActive: true,
  },
  {
    _id: "family",
    title: "Family",
    description: "Make memories",
    slug: "family",
    image: "/assets/Sylhet/cover-1.jpg",
    destinations: 15,
    href: "/destinations?category=family",
    sortOrder: 3,
    isActive: true,
  },
  {
    _id: "nature",
    title: "Nature",
    description: "Return to calm",
    slug: "nature",
    image: "/assets/sreemangal/cover-1.webp",
    destinations: 16,
    href: "/destinations?category=nature",
    sortOrder: 4,
    isActive: true,
  },
  {
    _id: "beach",
    title: "Beach",
    description: "Follow the sun",
    slug: "beach",
    image: "/assets/Coxs/cover-1.jpg",
    destinations: 18,
    href: "/destinations?category=beach",
    sortOrder: 5,
    isActive: true,
  },
  {
    _id: "romantic",
    title: "Romantic",
    description: "Escape together",
    slug: "romantic",
    image: "/assets/Saintmartin/cover-1.jpg",
    destinations: 12,
    href: "/destinations?category=romantic",
    sortOrder: 6,
    isActive: true,
  },
];

export async function getTravelCategories(): Promise<TravelCategory[]> {
  return TRAVEL_CATEGORIES.filter((category) => category.isActive).sort(
    (a, b) => a.sortOrder - b.sortOrder,
  );
}