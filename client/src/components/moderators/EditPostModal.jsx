"use client";

import { X } from "lucide-react";
import { useEffect, useState } from "react";

export default function EditPostModal({
  category,
  isOpen,
  onClose,
  onUpdate,
}) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    slug: "",
    image: "",
    destinations: "",
  });

  useEffect(() => {
    if (category) {
      setFormData({
        title: category.title || "",
        description: category.description || "",
        slug: category.slug || "",
        image: category.image || "",
        destinations: category.destinations || "",
      });
    }
  }, [category]);

  if (!isOpen || !category) return null;

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    onUpdate({
      ...category,
      ...formData,
      destinations: Number(formData.destinations),
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 px-4 py-6 backdrop-blur-sm">
      <div className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-2xl bg-white shadow-2xl">

        {/* Header */}
        <div className="flex items-center justify-between border-b border-[#E5ECE8] px-6 py-5">
          <div>
            <h2 className="text-xl font-semibold text-[#17211D]">
              Edit Travel Category
            </h2>

            <p className="mt-1 text-xs text-[#607169]">
              Update the category information.
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="flex h-9 w-9 items-center justify-center rounded-lg text-[#607169] transition hover:bg-[#F1F5F3] hover:text-[#17211D]"
          >
            <X size={20} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5 p-6">

          {/* Title */}
          <div>
            <label
              htmlFor="title"
              className="mb-2 block text-sm font-medium text-[#17211D]"
            >
              Title
            </label>

            <input
              id="title"
              name="title"
              type="text"
              value={formData.title}
              onChange={handleChange}
              required
              className="w-full rounded-xl border border-[#DCE9E3] px-4 py-3 text-sm text-[#17211D] outline-none transition placeholder:text-[#9AA9A2] focus:border-[#087F5B] focus:ring-2 focus:ring-[#087F5B]/10"
              placeholder="Enter category title"
            />
          </div>

          {/* Description */}
          <div>
            <label
              htmlFor="description"
              className="mb-2 block text-sm font-medium text-[#17211D]"
            >
              Description
            </label>

            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              rows={3}
              className="w-full resize-none rounded-xl border border-[#DCE9E3] px-4 py-3 text-sm text-[#17211D] outline-none transition placeholder:text-[#9AA9A2] focus:border-[#087F5B] focus:ring-2 focus:ring-[#087F5B]/10"
              placeholder="Enter category description"
            />
          </div>

          {/* Slug */}
          <div>
            <label
              htmlFor="slug"
              className="mb-2 block text-sm font-medium text-[#17211D]"
            >
              Slug
            </label>

            <input
              id="slug"
              name="slug"
              type="text"
              value={formData.slug}
              onChange={handleChange}
              required
              className="w-full rounded-xl border border-[#DCE9E3] px-4 py-3 text-sm text-[#17211D] outline-none transition placeholder:text-[#9AA9A2] focus:border-[#087F5B] focus:ring-2 focus:ring-[#087F5B]/10"
              placeholder="example: adventure"
            />
          </div>

          {/* Image */}
          <div>
            <label
              htmlFor="image"
              className="mb-2 block text-sm font-medium text-[#17211D]"
            >
              Image URL
            </label>

            <input
              id="image"
              name="image"
              type="text"
              value={formData.image}
              onChange={handleChange}
              required
              className="w-full rounded-xl border border-[#DCE9E3] px-4 py-3 text-sm text-[#17211D] outline-none transition placeholder:text-[#9AA9A2] focus:border-[#087F5B] focus:ring-2 focus:ring-[#087F5B]/10"
              placeholder="/images/categories/example.jpg"
            />
          </div>

          {/* Destinations */}
          <div>
            <label
              htmlFor="destinations"
              className="mb-2 block text-sm font-medium text-[#17211D]"
            >
              Number of Destinations
            </label>

            <input
              id="destinations"
              name="destinations"
              type="number"
              min="0"
              value={formData.destinations}
              onChange={handleChange}
              required
              className="w-full rounded-xl border border-[#DCE9E3] px-4 py-3 text-sm text-[#17211D] outline-none transition placeholder:text-[#9AA9A2] focus:border-[#087F5B] focus:ring-2 focus:ring-[#087F5B]/10"
              placeholder="24"
            />
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-3 border-t border-[#E5ECE8] pt-5">

            <button
              type="button"
              onClick={onClose}
              className="rounded-xl border border-[#DCE9E3] px-5 py-2.5 text-sm font-semibold text-[#607169] transition hover:bg-[#F5F8F6]"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="rounded-xl bg-[#087F5B] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#066B4C]"
            >
              Update Category
            </button>

          </div>

        </form>
      </div>
    </div>
  );
}