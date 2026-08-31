"use client";

import { Map, Plus, Search } from "lucide-react";

const travelCategories = [
  {
    id: 1,
    title: "Adventure",
    description: "For thrill seekers",
    slug: "adventure",
    image: "/images/categories/adventure.jpg",
    destinations: 24,
  },
  {
    id: 2,
    title: "Beach",
    description: "Sun, sea & relaxation",
    slug: "beach",
    image: "/images/categories/beach.jpg",
    destinations: 18,
  },
  {
    id: 3,
    title: "Family",
    description: "Trips everyone can enjoy",
    slug: "family",
    image: "/images/categories/family.jpg",
    destinations: 15,
  },
  {
    id: 4,
    title: "Romantic",
    description: "Beautiful escapes for two",
    slug: "romantic",
    image: "/images/categories/romantic.jpg",
    destinations: 12,
  },
  {
    id: 5,
    title: "Backpacking",
    description: "Travel freely & independently",
    slug: "backpacking",
    image: "/images/categories/backpacking.jpg",
    destinations: 20,
  },
  {
    id: 6,
    title: "Nature",
    description: "Green landscapes & peaceful places",
    slug: "nature",
    image: "/images/categories/nature.jpg",
    destinations: 16,
  },
];

export default function TravelCategoriesPage() {
  return (
    <div className="min-h-screen bg-[#F5F8F6] p-6 pt-24 md:p-8 md:pt-24">

      {/* Header */}
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

        <div>
          <h1 className="text-2xl font-semibold text-[#17211D] md:text-3xl">
            Travel Categories
          </h1>

          <p className="mt-2 text-sm text-[#607169]">
            Manage and organize TripPlan AI travel categories.
          </p>
        </div>

        {/* Add Button */}
        <button
          type="button"
          className="inline-flex w-fit items-center gap-2 rounded-xl bg-[#087F5B] px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-[#066B4C]"
        >
          <Plus size={18} />
          Add New Post
        </button>

      </div>

      {/* Search & Info */}
      <div className="mb-6 flex flex-col gap-4 rounded-2xl border border-[#DCE9E3] bg-white p-4 shadow-sm sm:flex-row sm:items-center sm:justify-between">

        <div className="flex items-center gap-2 text-sm text-[#607169]">
          <Map size={18} className="text-[#087F5B]" />

          <span>
            Total Categories:{" "}
            <strong className="text-[#17211D]">
              {travelCategories.length}
            </strong>
          </span>
        </div>

        <div className="relative w-full sm:max-w-xs">
          <Search
            size={17}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-[#809088]"
          />

          <input
            type="text"
            placeholder="Search categories..."
            className="w-full rounded-xl border border-[#DCE9E3] bg-[#F8FAF9] py-2.5 pl-10 pr-4 text-sm text-[#17211D] outline-none transition placeholder:text-[#9AA9A2] focus:border-[#087F5B] focus:ring-2 focus:ring-[#087F5B]/10"
          />
        </div>

      </div>

      {/* Category Cards */}
      <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">

        {travelCategories.map((category) => (
          <div
            key={category.id}
            className="overflow-hidden rounded-2xl border border-[#DCE9E3] bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-md"
          >

            {/* Image */}
            <div className="relative h-52 overflow-hidden bg-[#E3F6EE]">

              <img
                src={category.image}
                alt={category.title}
                className="h-full w-full object-cover transition duration-500 hover:scale-105"
              />

            </div>

            {/* Content */}
            <div className="p-5">

              <div className="mb-3 flex items-start justify-between gap-3">

                <div>
                  <h2 className="text-xl font-semibold text-[#17211D]">
                    {category.title}
                  </h2>

                  <p className="mt-1 text-sm text-[#607169]">
                    {category.description}
                  </p>
                </div>

                <span className="shrink-0 rounded-full bg-[#E3F6EE] px-3 py-1 text-xs font-semibold text-[#087F5B]">
                  {category.destinations} places
                </span>

              </div>

              {/* Slug */}
              <p className="mb-5 text-xs text-[#8A9992]">
                Slug:{" "}
                <span className="font-medium text-[#607169]">
                  {category.slug}
                </span>
              </p>

              {/* Actions */}
              <div className="flex gap-3 border-t border-[#E8EFEB] pt-4">

                <button
                  type="button"
                  className="flex-1 rounded-xl border border-[#087F5B] px-4 py-2 text-sm font-semibold text-[#087F5B] transition hover:bg-[#E3F6EE]"
                >
                  Edit
                </button>

                <button
                  type="button"
                  className="flex-1 rounded-xl border border-red-200 px-4 py-2 text-sm font-semibold text-red-600 transition hover:bg-red-50"
                >
                  Delete
                </button>

              </div>

            </div>
          </div>
        ))}

      </div>

    </div>
  );
}