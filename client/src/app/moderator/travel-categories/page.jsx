"use client";

import { Map, Plus, Search } from "lucide-react";
import { useState, useEffect } from "react";
import EditPostModal from "@/components/moderators/EditPostModal";
import DeleteConfirmModal from "@/components/moderators/DeleteConfirmModal";
import AddPostModal from "../../../components/moderators/AddPostModal";
import Toast from "@/components/moderators/Toast";

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
    const [categories, setCategories] = useState(travelCategories);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const filteredCategories = categories.filter((category) => {
  const search = searchTerm.toLowerCase().trim();

  return (
    category.title.toLowerCase().includes(search) ||
    category.description.toLowerCase().includes(search) ||
    category.slug.toLowerCase().includes(search)
  );
});

const [currentPage, setCurrentPage] = useState(1);

const ITEMS_PER_PAGE = 6;

const totalPages = Math.ceil(
  filteredCategories.length / ITEMS_PER_PAGE
);

const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;

const paginatedCategories = filteredCategories.slice(
  startIndex,
  startIndex + ITEMS_PER_PAGE
);
useEffect(() => {
  setCurrentPage(1);
}, [searchTerm]);

  const handleEdit = (category) => {
    setSelectedCategory(category);
    setIsEditModalOpen(true);
  };

  const handleUpdate = (updatedCategory) => {
    setCategories((previousCategories) =>
      previousCategories.map((category) =>
        category.id === updatedCategory.id
          ? updatedCategory
          : category
      )
    );
     showToast("Travel category updated successfully.");
  };

  const [toast, setToast] = useState({
  message: "",
  type: "success",
});
const showToast = (message, type = "success") => {
  setToast({
    message,
    type,
  });

  setTimeout(() => {
    setToast({
      message: "",
      type: "success",
    });
  }, 3000);
};
  const handleDelete = (category) => {
  setSelectedCategory(category);
  setIsDeleteModalOpen(true);
};

const handleConfirmDelete = () => {
  setCategories((previousCategories) =>
    previousCategories.filter(
      (category) => category.id !== selectedCategory.id
    )
  );
  showToast("Travel category deleted successfully.");
  setIsDeleteModalOpen(false);
  setSelectedCategory(null);
};

const handleAdd = (newCategory) => {
  setCategories((previousCategories) => [
    ...previousCategories,
    newCategory,
  ]);
   showToast("New travel category added successfully.");
};
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
              onClick={() => setIsAddModalOpen(true)}
          className="inline-flex w-fit items-center gap-2 rounded-xl bg-[#087F5B] px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-[#066B4C] cursor-pointer"
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
  value={searchTerm}
  onChange={(event) => setSearchTerm(event.target.value)}
  placeholder="Search categories..."
  className="w-full rounded-xl border border-[#DCE9E3] bg-white pl-8 py-3 text-sm text-[#17211D] outline-none transition placeholder:text-[#9AA9A2] focus:border-[#087F5B] focus:ring-2 focus:ring-[#087F5B]/10"
/>
        </div>

      </div>

      {/* Category Cards */}
      <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">

        {paginatedCategories.map((category) => (
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
  onClick={() => handleEdit(category)}
  className="flex-1 rounded-xl border border-[#087F5B] px-4 py-2 text-sm font-semibold text-[#087F5B] transition hover:bg-[#E3F6EE] cursor-pointer"
>
  Edit
</button>

               <button
  type="button"
  onClick={() => handleDelete(category)}
  className="flex-1 rounded-xl border border-red-200 px-4 py-2 text-sm font-semibold text-red-600 transition hover:bg-red-100 cursor-pointer"
>
  Delete
</button>

              </div>

            </div>
          </div>
        ))}

      </div>

      {totalPages > 1 && (
  <div className="mt-8 flex items-center justify-center gap-2">

    <button
      type="button"
      disabled={currentPage === 1}
      onClick={() => setCurrentPage((page) => page - 1)}
      className="rounded-lg border border-[#DCE9E3] px-4 py-2 text-sm font-medium text-[#607169] transition hover:bg-[#F1F5F3] disabled:cursor-not-allowed disabled:opacity-40"
    >
      Previous
    </button>

    {Array.from({ length: totalPages }, (_, index) => {
      const pageNumber = index + 1;

      return (
        <button
          key={pageNumber}
          type="button"
          onClick={() => setCurrentPage(pageNumber)}
          className={`h-9 w-9 rounded-lg text-sm font-semibold transition ${
            currentPage === pageNumber
              ? "bg-[#087F5B] text-white"
              : "border border-[#DCE9E3] text-[#607169] hover:bg-[#F1F5F3]"
          }`}
        >
          {pageNumber}
        </button>
      );
    })}

    <button
      type="button"
      disabled={currentPage === totalPages}
      onClick={() => setCurrentPage((page) => page + 1)}
      className="rounded-lg border border-[#DCE9E3] px-4 py-2 text-sm font-medium text-[#607169] transition hover:bg-[#F1F5F3] disabled:cursor-not-allowed disabled:opacity-40"
    >
      Next
    </button>

  </div>
)}

       <EditPostModal
        category={selectedCategory}
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        onUpdate={handleUpdate}
      />

      <DeleteConfirmModal
  category={selectedCategory}
  isOpen={isDeleteModalOpen}
  onClose={() => {
    setIsDeleteModalOpen(false);
    setSelectedCategory(null);
  }}
  onConfirm={handleConfirmDelete}
/>

<AddPostModal
  isOpen={isAddModalOpen}
  onClose={() => setIsAddModalOpen(false)}
  onAdd={handleAdd}
/>
<Toast
  message={toast.message}
  type={toast.type}
  onClose={() =>
    setToast({
      message: "",
      type: "success",
    })
  }
/>

    </div>
  );
}