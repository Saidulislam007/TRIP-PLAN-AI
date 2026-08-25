"use client";

import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  Plus,
  Pencil,
  Trash2,
  Eye,
  X,
  FolderOpen,
  MapPin,
  Mountain,
  Waves,
  Trees,
  Building2,
  Utensils,
  Camera,
  Heart,
  MoreHorizontal,
} from "lucide-react";

const initialCategories = [
  {
    id: 1,
    name: "Nature",
    description: "Beautiful natural places, forests and landscapes.",
    destinations: 24,
    status: "Active",
    icon: Trees,
  },
  {
    id: 2,
    name: "Beach",
    description: "Relaxing beaches, islands and coastal destinations.",
    destinations: 18,
    status: "Active",
    icon: Waves,
  },
  {
    id: 3,
    name: "Hill",
    description: "Mountains, hills and scenic highland destinations.",
    destinations: 15,
    status: "Active",
    icon: Mountain,
  },
  {
    id: 4,
    name: "City",
    description: "Popular cities, urban attractions and landmarks.",
    destinations: 12,
    status: "Active",
    icon: Building2,
  },
  {
    id: 5,
    name: "Food",
    description: "Popular food spots and local culinary experiences.",
    destinations: 9,
    status: "Active",
    icon: Utensils,
  },
  {
    id: 6,
    name: "Photography",
    description: "Scenic places perfect for photography.",
    destinations: 11,
    status: "Active",
    icon: Camera,
  },
  {
    id: 7,
    name: "Romantic",
    description: "Romantic destinations for couples and special trips.",
    destinations: 8,
    status: "Active",
    icon: Heart,
  },
  {
    id: 8,
    name: "Adventure",
    description: "Exciting destinations for adventurous travelers.",
    destinations: 13,
    status: "Draft",
    icon: MoreHorizontal,
  },
];

const categoryColors = {
  Nature: "bg-green-50 text-green-600",
  Beach: "bg-blue-50 text-blue-600",
  Hill: "bg-emerald-50 text-emerald-600",
  City: "bg-purple-50 text-purple-600",
  Food: "bg-orange-50 text-orange-600",
  Photography: "bg-pink-50 text-pink-600",
  Romantic: "bg-rose-50 text-rose-600",
  Adventure: "bg-gray-100 text-gray-600",
};

const containerVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.07,
    },
  },
};

const cardVariants = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: "easeOut",
    },
  },
};

export default function CategoriesPage() {
  const [categories, setCategories] =
    useState(initialCategories);

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  const [selectedCategory, setSelectedCategory] =
    useState(null);

  const [deleteCategory, setDeleteCategory] =
    useState(null);

  const [showAddModal, setShowAddModal] =
    useState(false);

    const [showEditModal, setShowEditModal] = useState(false);

const [editCategory, setEditCategory] = useState(null);

const [editCategoryData, setEditCategoryData] = useState({
  name: "",
  description: "",
});

  const [newCategory, setNewCategory] = useState({
    name: "",
    description: "",
  });

  const filteredCategories = useMemo(() => {
    return categories.filter((category) => {
      const searchText = search.toLowerCase().trim();

      const matchesSearch =
        category.name
          .toLowerCase()
          .includes(searchText) ||
        category.description
          .toLowerCase()
          .includes(searchText);

      const matchesStatus =
        statusFilter === "All" ||
        category.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [categories, search, statusFilter]);

  const totalCategories = categories.length;

  const activeCategories = categories.filter(
    (category) => category.status === "Active"
  ).length;

  const totalDestinations = categories.reduce(
    (sum, category) =>
      sum + category.destinations,
    0
  );

  const handleDelete = () => {
    if (!deleteCategory) return;

    setCategories((current) =>
      current.filter(
        (category) =>
          category.id !== deleteCategory.id
      )
    );

    setDeleteCategory(null);
  };

 const handleAddCategory = (e) => {
  e.preventDefault();

  if (!newCategory.name.trim()) return;

  const newItem = {
    id: Date.now(),
    name: newCategory.name.trim(),
    description:
      newCategory.description.trim() ||
      "A new travel category.",
    destinations: 0,
    status: "Active",
    icon: FolderOpen,
  };

  setCategories((current) => [
    ...current,
    newItem,
  ]);

  setNewCategory({
    name: "",
    description: "",
  });

  setShowAddModal(false);
};

const handleEditOpen = (category) => {
  setEditCategory(category);

  setEditCategoryData({
    name: category.name,
    description: category.description,
  });

  setShowEditModal(true);
};

const handleEditCategory = (e) => {
  e.preventDefault();

  if (!editCategory) return;
  if (!editCategoryData.name.trim()) return;

  setCategories((current) =>
    current.map((category) =>
      category.id === editCategory.id
        ? {
            ...category,
            name: editCategoryData.name.trim(),
            description:
              editCategoryData.description.trim() ||
              "A travel category.",
          }
        : category
    )
  );

  setEditCategory(null);

  setEditCategoryData({
    name: "",
    description: "",
  });

  setShowEditModal(false);
};

  return (
    <div className="w-full min-w-0 overflow-x-hidden p-4 sm:p-6 lg:p-8">

      {/* =========================
          PAGE HEADER
      ========================= */}

      <motion.div
        initial={{
          opacity: 0,
          y: -20,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          duration: 0.5,
        }}
        className="
          mb-7
          flex
          flex-col
          gap-4
          sm:flex-row
          sm:items-center
          sm:justify-between
        "
      >
        <div className="min-w-0">

          <h1 className="
            text-2xl
            font-bold
            text-gray-900
            sm:text-3xl
          ">
            Categories
          </h1>

          <p className="
            mt-1
            text-sm
            text-gray-500
          ">
            Manage destination categories for your platform.
          </p>

        </div>

        <motion.button
          whileHover={{
            scale: 1.03,
            y: -2,
          }}
          whileTap={{
            scale: 0.96,
          }}
          onClick={() =>
            setShowAddModal(true)
          }
          className="
            flex
            w-full
            cursor-pointer
            items-center
            justify-center
            gap-2
            rounded-xl
            bg-green-600
            px-4
            py-2.5
            text-sm
            font-semibold
            text-white
            shadow-sm
            shadow-green-200
            transition
            hover:bg-green-700
            sm:w-auto
          "
        >
          <Plus size={18} />
          Add Category
        </motion.button>

      </motion.div>

      {/* =========================
          STATS
      ========================= */}

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="
          mb-6
          grid
          grid-cols-1
          gap-4
          sm:grid-cols-2
          lg:grid-cols-3
        "
      >

        <StatCard
          title="Total Categories"
          value={totalCategories}
          icon={<FolderOpen size={21} />}
        />

        <StatCard
          title="Active Categories"
          value={activeCategories}
          icon={<MapPin size={21} />}
        />

        <StatCard
          title="Total Destinations"
          value={totalDestinations}
          icon={<Trees size={21} />}
        />

      </motion.div>

      {/* =========================
          MAIN CARD
      ========================= */}

      <motion.div
        initial={{
          opacity: 0,
          y: 25,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          duration: 0.55,
          delay: 0.15,
        }}
        className="
          w-full
          min-w-0
          overflow-hidden
          rounded-2xl
          border
          border-gray-100
          bg-white
          shadow-sm
        "
      >

        {/* SEARCH + FILTER */}

        <div className="
          flex
          flex-col
          gap-3
          border-b
          border-gray-100
          p-4
          sm:p-5
          md:flex-row
          md:items-center
          md:justify-between
        ">

          {/* Search */}

          <div className="
            relative
            w-full
            md:max-w-md
          ">

            <Search
              size={18}
              className="
                absolute
                left-3.5
                top-1/2
                -translate-y-1/2
                text-gray-400
              "
            />

            <input
              type="text"
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
              placeholder="Search categories..."
              className="
                h-11
                w-full
                rounded-xl
                border
                border-gray-200
                bg-gray-50
                pl-10
                pr-10
                text-sm
                text-gray-700
                outline-none
                transition
                focus:border-green-500
                focus:bg-white
                focus:ring-4
                focus:ring-green-50
              "
            />

            {search && (
              <button
                onClick={() => setSearch("")}
                className="
                  absolute
                  right-3
                  top-1/2
                  -translate-y-1/2
                  cursor-pointer
                  text-gray-400
                  hover:text-gray-700
                "
              >
                <X size={16} />
              </button>
            )}

          </div>

          {/* Filter */}

          <div className="
            flex
            w-full
            gap-2
            md:w-auto
          ">

            <button
              onClick={() =>
                setStatusFilter("All")
              }
              className={`
                flex-1
                cursor-pointer
                rounded-xl
                px-4
                py-2.5
                text-sm
                font-medium
                transition
                md:flex-none
                ${
                  statusFilter === "All"
                    ? "bg-green-600 text-white"
                    : "bg-gray-50 text-gray-500 hover:bg-green-50 hover:text-green-600"
                }
              `}
            >
              All
            </button>

            <button
              onClick={() =>
                setStatusFilter("Active")
              }
              className={`
                flex-1
                cursor-pointer
                rounded-xl
                px-4
                py-2.5
                text-sm
                font-medium
                transition
                md:flex-none
                ${
                  statusFilter === "Active"
                    ? "bg-green-600 text-white"
                    : "bg-gray-50 text-gray-500 hover:bg-green-50 hover:text-green-600"
                }
              `}
            >
              Active
            </button>

            <button
              onClick={() =>
                setStatusFilter("Draft")
              }
              className={`
                flex-1
                cursor-pointer
                rounded-xl
                px-4
                py-2.5
                text-sm
                font-medium
                transition
                md:flex-none
                ${
                  statusFilter === "Draft"
                    ? "bg-green-600 text-white"
                    : "bg-gray-50 text-gray-500 hover:bg-green-50 hover:text-green-600"
                }
              `}
            >
              Draft
            </button>

          </div>

        </div>

        {/* =========================
            DESKTOP TABLE
        ========================= */}

        <div className="hidden overflow-x-auto lg:block">

          <table className="w-full min-w-[800px]">

            <thead>
              <tr className="
                border-b
                border-gray-100
                bg-gray-50/70
              ">

                <th className="
                  px-6
                  py-4
                  text-left
                  text-xs
                  font-semibold
                  uppercase
                  tracking-wider
                  text-gray-400
                ">
                  Category
                </th>

                <th className="
                  px-6
                  py-4
                  text-left
                  text-xs
                  font-semibold
                  uppercase
                  tracking-wider
                  text-gray-400
                ">
                  Description
                </th>

                <th className="
                  px-6
                  py-4
                  text-left
                  text-xs
                  font-semibold
                  uppercase
                  tracking-wider
                  text-gray-400
                ">
                  Destinations
                </th>

                <th className="
                  px-6
                  py-4
                  text-left
                  text-xs
                  font-semibold
                  uppercase
                  tracking-wider
                  text-gray-400
                ">
                  Status
                </th>

                <th className="
                  px-6
                  py-4
                  text-right
                  text-xs
                  font-semibold
                  uppercase
                  tracking-wider
                  text-gray-400
                ">
                  Actions
                </th>

              </tr>
            </thead>

            <tbody>

              <AnimatePresence mode="popLayout">

                {filteredCategories.map(
                  (category, index) => {
                    const Icon = category.icon;

                    return (
                      <motion.tr
                        key={category.id}
                        layout
                        initial={{
                          opacity: 0,
                          x: -15,
                        }}
                        animate={{
                          opacity: 1,
                          x: 0,
                        }}
                        exit={{
                          opacity: 0,
                          x: 20,
                        }}
                        transition={{
                          duration: 0.35,
                          delay: index * 0.04,
                        }}
                        whileHover={{
                          backgroundColor:
                            "rgba(240,253,244,0.7)",
                        }}
                        className="
                          border-b
                          border-gray-50
                        "
                      >

                        {/* Category */}

                        <td className="px-6 py-4">

                          <div className="
                            flex
                            items-center
                            gap-3
                          ">

                            <div className={`
                              flex
                              h-11
                              w-11
                              shrink-0
                              items-center
                              justify-center
                              rounded-xl
                              ${
                                categoryColors[
                                  category.name
                                ] ||
                                "bg-green-50 text-green-600"
                              }
                            `}>
                              <Icon size={20} />
                            </div>

                            <div>
                              <p className="
                                text-sm
                                font-semibold
                                text-gray-800
                              ">
                                {category.name}
                              </p>

                              <p className="
                                mt-0.5
                                text-xs
                                text-gray-400
                              ">
                                Category #{category.id}
                              </p>
                            </div>

                          </div>

                        </td>

                        {/* Description */}

                        <td className="
                          max-w-xs
                          px-6
                          py-4
                        ">

                          <p className="
                            truncate
                            text-sm
                            text-gray-500
                          ">
                            {category.description}
                          </p>

                        </td>

                        {/* Destinations */}

                        <td className="px-6 py-4">

                          <div className="
                            flex
                            items-center
                            gap-2
                          ">

                            <MapPin
                              size={15}
                              className="text-green-500"
                            />

                            <span className="
                              text-sm
                              font-semibold
                              text-gray-700
                            ">
                              {category.destinations}
                            </span>

                          </div>

                        </td>

                        {/* Status */}

                        <td className="px-6 py-4">

                          <span className={`
                            inline-flex
                            items-center
                            gap-1.5
                            rounded-full
                            px-3
                            py-1
                            text-xs
                            font-semibold
                            ${
                              category.status ===
                              "Active"
                                ? "bg-green-50 text-green-700"
                                : "bg-gray-100 text-gray-500"
                            }
                          `}>

                            <span className={`
                              h-1.5
                              w-1.5
                              rounded-full
                              ${
                                category.status ===
                                "Active"
                                  ? "bg-green-500"
                                  : "bg-gray-400"
                              }
                            `} />

                            {category.status}

                          </span>

                        </td>

                        {/* Actions */}

                        <td className="px-6 py-4">

                          <div className="
                            flex
                            items-center
                            justify-end
                            gap-1
                          ">

                            <ActionButton
                              icon={<Eye size={17} />}
                              onClick={() =>
                                setSelectedCategory(
                                  category
                                )
                              }
                              type="green"
                            />

                 <ActionButton
  icon={<Pencil size={17} />}
  onClick={() => handleEditOpen(category)}
  type="blue"
/>
                            <ActionButton
                              icon={<Trash2 size={17} />}
                              onClick={() =>
                                setDeleteCategory(
                                  category
                                )
                              }
                              type="red"
                            />

                          </div>

                        </td>

                      </motion.tr>
                    );
                  }
                )}

              </AnimatePresence>

            </tbody>

          </table>

        </div>

        {/* =========================
            MOBILE / TABLET CARDS
        ========================= */}

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="
            grid
            grid-cols-1
            gap-4
            p-4
            sm:grid-cols-2
            lg:hidden
          "
        >

          <AnimatePresence mode="popLayout">

            {filteredCategories.map(
              (category) => {
                const Icon = category.icon;

                return (
                  <motion.div
                    key={category.id}
                    layout
                    variants={cardVariants}
                    initial="hidden"
                    animate="show"
                    exit={{
                      opacity: 0,
                      scale: 0.95,
                    }}
                    whileHover={{
                      y: -4,
                    }}
                    className="
                      rounded-2xl
                      border
                      border-gray-100
                      bg-white
                      p-4
                      shadow-sm
                      transition
                      hover:shadow-md
                    "
                  >

                    <div className="
                      flex
                      items-start
                      justify-between
                      gap-3
                    ">

                      <div className="
                        flex
                        min-w-0
                        items-center
                        gap-3
                      ">

                        <div className={`
                          flex
                          h-12
                          w-12
                          shrink-0
                          items-center
                          justify-center
                          rounded-xl
                          ${
                            categoryColors[
                              category.name
                            ] ||
                            "bg-green-50 text-green-600"
                          }
                        `}>
                          <Icon size={21} />
                        </div>

                        <div className="min-w-0">

                          <h3 className="
                            truncate
                            text-base
                            font-bold
                            text-gray-800
                          ">
                            {category.name}
                          </h3>

                          <p className="
                            mt-0.5
                            text-xs
                            text-gray-400
                          ">
                            {category.destinations} destinations
                          </p>

                        </div>

                      </div>

                      <span className={`
                        shrink-0
                        rounded-full
                        px-2.5
                        py-1
                        text-[10px]
                        font-semibold
                        ${
                          category.status ===
                          "Active"
                            ? "bg-green-50 text-green-700"
                            : "bg-gray-100 text-gray-500"
                        }
                      `}>
                        {category.status}
                      </span>

                    </div>

                    <p className="
                      mt-4
                      line-clamp-2
                      text-sm
                      leading-5
                      text-gray-500
                    ">
                      {category.description}
                    </p>

                    <div className="
                      mt-4
                      flex
                      gap-2
                    ">

                      <motion.button
                        whileTap={{
                          scale: 0.95,
                        }}
                        onClick={() =>
                          setSelectedCategory(
                            category
                          )
                        }
                        className="
                          flex
                          flex-1
                          cursor-pointer
                          items-center
                          justify-center
                          gap-1.5
                          rounded-lg
                          bg-green-50
                          py-2
                          text-xs
                          font-semibold
                          text-green-700
                          transition
                          hover:bg-green-100
                        "
                      >
                        <Eye size={14} />
                        View
                      </motion.button>

<motion.button
  type="button"
  whileTap={{
    scale: 0.95,
  }}
  onClick={() => handleEditOpen(category)}
  className="
    flex
    flex-1
    cursor-pointer
    items-center
    justify-center
    gap-1.5
    rounded-lg
    bg-blue-50
    py-2
    text-xs
    font-semibold
    text-blue-600
    transition
    hover:bg-blue-100
  "
>
  <Pencil size={14} />
  Edit
</motion.button>

                      <motion.button
                        whileTap={{
                          scale: 0.95,
                        }}
                        onClick={() =>
                          setDeleteCategory(
                            category
                          )
                        }
                        className="
                          flex
                          flex-1
                          cursor-pointer
                          items-center
                          justify-center
                          gap-1.5
                          rounded-lg
                          bg-red-50
                          py-2
                          text-xs
                          font-semibold
                          text-red-500
                          transition
                          hover:bg-red-100
                        "
                      >
                        <Trash2 size={14} />
                        Delete
                      </motion.button>

                    </div>

                  </motion.div>
                );
              }
            )}

          </AnimatePresence>

        </motion.div>

        {/* EMPTY STATE */}

        {filteredCategories.length === 0 && (
          <div className="
            px-5
            py-16
            text-center
          ">

            <FolderOpen
              size={38}
              className="
                mx-auto
                text-green-500
              "
            />

            <h3 className="
              mt-4
              font-semibold
              text-gray-800
            ">
              No categories found
            </h3>

            <p className="
              mt-1
              text-sm
              text-gray-400
            ">
              Try changing your search or filter.
            </p>

          </div>
        )}

      </motion.div>

      {/* =========================
          VIEW MODAL
      ========================= */}

      <AnimatePresence>
        {selectedCategory && (
          <ModalOverlay
            onClose={() =>
              setSelectedCategory(null)
            }
          >

            <motion.div
              initial={{
                opacity: 0,
                scale: 0.9,
                y: 20,
              }}
              animate={{
                opacity: 1,
                scale: 1,
                y: 0,
              }}
              exit={{
                opacity: 0,
                scale: 0.95,
              }}
              className="
                w-full
                max-w-md
                rounded-2xl
                bg-white
                p-6
                shadow-2xl
              "
            >

              {(() => {
                const Icon =
                  selectedCategory.icon;

                return (
                  <>
                    <div className="
                      flex
                      items-start
                      justify-between
                    ">

                      <div className="
                        flex
                        items-center
                        gap-3
                      ">

                        <div className={`
                          flex
                          h-12
                          w-12
                          items-center
                          justify-center
                          rounded-xl
                          ${
                            categoryColors[
                              selectedCategory.name
                            ] ||
                            "bg-green-50 text-green-600"
                          }
                        `}>
                          <Icon size={22} />
                        </div>

                        <div>

                          <h2 className="
                            text-lg
                            font-bold
                            text-gray-900
                          ">
                            {selectedCategory.name}
                          </h2>

                          <p className="
                            text-xs
                            text-gray-400
                          ">
                            Category details
                          </p>

                        </div>

                      </div>

                      <button
                        onClick={() =>
                          setSelectedCategory(null)
                        }
                        className="
                          cursor-pointer
                          rounded-lg
                          p-2
                          text-gray-400
                          hover:bg-gray-100
                          hover:text-gray-700
                        "
                      >
                        <X size={18} />
                      </button>

                    </div>

                    <p className="
                      mt-5
                      text-sm
                      leading-6
                      text-gray-500
                    ">
                      {selectedCategory.description}
                    </p>

                    <div className="
                      mt-5
                      grid
                      grid-cols-2
                      gap-3
                    ">

                      <div className="
                        rounded-xl
                        bg-green-50
                        p-4
                      ">
                        <p className="
                          text-xs
                          text-green-600
                        ">
                          Destinations
                        </p>

                        <p className="
                          mt-1
                          text-xl
                          font-bold
                          text-gray-800
                        ">
                          {selectedCategory.destinations}
                        </p>
                      </div>

                      <div className="
                        rounded-xl
                        bg-gray-50
                        p-4
                      ">
                        <p className="
                          text-xs
                          text-gray-400
                        ">
                          Status
                        </p>

                        <p className="
                          mt-1
                          text-xl
                          font-bold
                          text-gray-800
                        ">
                          {selectedCategory.status}
                        </p>
                      </div>

                    </div>
                  </>
                );
              })()}

            </motion.div>

          </ModalOverlay>
        )}
      </AnimatePresence>

      {/* =========================
          DELETE MODAL
      ========================= */}

      <AnimatePresence>
        {deleteCategory && (
          <ModalOverlay
            onClose={() =>
              setDeleteCategory(null)
            }
          >

            <motion.div
              initial={{
                opacity: 0,
                scale: 0.9,
              }}
              animate={{
                opacity: 1,
                scale: 1,
              }}
              exit={{
                opacity: 0,
                scale: 0.95,
              }}
              className="
                w-full
                max-w-sm
                rounded-2xl
                bg-white
                p-6
                text-center
                shadow-2xl
              "
            >

              <div className="
                mx-auto
                flex
                h-14
                w-14
                items-center
                justify-center
                rounded-full
                bg-red-50
                text-red-500
              ">
                <Trash2 size={24} />
              </div>

              <h3 className="
                mt-4
                text-lg
                font-bold
                text-gray-900
              ">
                Delete Category?
              </h3>

              <p className="
                mt-2
                text-sm
                leading-6
                text-gray-500
              ">
                Are you sure you want to delete{" "}
                <b className="text-gray-700">
                  {deleteCategory.name}
                </b>
                ?
              </p>

              <div className="
                mt-6
                flex
                gap-3
              ">

                <button
                  onClick={() =>
                    setDeleteCategory(null)
                  }
                  className="
                    flex-1
                    cursor-pointer
                    rounded-xl
                    border
                    border-gray-200
                    py-2.5
                    text-sm
                    font-semibold
                    text-gray-600
                    transition
                    hover:bg-gray-50
                  "
                >
                  Cancel
                </button>

                <motion.button
                  whileTap={{
                    scale: 0.95,
                  }}
                  onClick={handleDelete}
                  className="
                    flex-1
                    cursor-pointer
                    rounded-xl
                    bg-red-500
                    py-2.5
                    text-sm
                    font-semibold
                    text-white
                    transition
                    hover:bg-red-600
                  "
                >
                  Delete
                </motion.button>

              </div>

            </motion.div>

          </ModalOverlay>
        )}
      </AnimatePresence>

      {/* =========================
          ADD CATEGORY MODAL
      ========================= */}

      <AnimatePresence>
        {showAddModal && (
          <ModalOverlay
            onClose={() =>
              setShowAddModal(false)
            }
          >

            <motion.form
              onSubmit={handleAddCategory}
              initial={{
                opacity: 0,
                scale: 0.9,
                y: 20,
              }}
              animate={{
                opacity: 1,
                scale: 1,
                y: 0,
              }}
              exit={{
                opacity: 0,
                scale: 0.95,
              }}
              className="
                w-full
                max-w-md
                rounded-2xl
                bg-white
                p-6
                shadow-2xl
              "
            >

              <div className="
                flex
                items-center
                justify-between
              ">

                <div>

                  <h2 className="
                    text-lg
                    font-bold
                    text-gray-900
                  ">
                    Add Category
                  </h2>

                  <p className="
                    mt-1
                    text-xs
                    text-gray-400
                  ">
                    Create a new destination category.
                  </p>

                </div>

                <button
                  type="button"
                  onClick={() =>
                    setShowAddModal(false)
                  }
                  className="
                    cursor-pointer
                    rounded-lg
                    p-2
                    text-gray-400
                    hover:bg-gray-100
                  "
                >
                  <X size={18} />
                </button>

              </div>

              <div className="mt-6">

                <label className="
                  text-sm
                  font-semibold
                  text-gray-700
                ">
                  Category Name
                </label>

                <input
                  type="text"
                  value={newCategory.name}
                  onChange={(e) =>
                    setNewCategory({
                      ...newCategory,
                      name: e.target.value,
                    })
                  }
                  placeholder="e.g. Historical"
                  className="
                    mt-2
                    h-11
                    w-full
                    rounded-xl
                    border
                    border-gray-200
                    bg-gray-50
                    px-4
                    text-sm
                    outline-none
                    transition
                    focus:border-green-500
                    focus:bg-white
                    focus:ring-4
                    focus:ring-green-50
                  "
                  required
                />

              </div>

              <div className="mt-4">

                <label className="
                  text-sm
                  font-semibold
                  text-gray-700
                ">
                  Description
                </label>

                <textarea
                  value={newCategory.description}
                  onChange={(e) =>
                    setNewCategory({
                      ...newCategory,
                      description:
                        e.target.value,
                    })
                  }
                  placeholder="Write a short description..."
                  rows={4}
                  className="
                    mt-2
                    w-full
                    resize-none
                    rounded-xl
                    border
                    border-gray-200
                    bg-gray-50
                    p-4
                    text-sm
                    outline-none
                    transition
                    focus:border-green-500
                    focus:bg-white
                    focus:ring-4
                    focus:ring-green-50
                  "
                />

              </div>

              <div className="
                mt-6
                flex
                gap-3
              ">

                <button
                  type="button"
                  onClick={() =>
                    setShowAddModal(false)
                  }
                  className="
                    flex-1
                    cursor-pointer
                    rounded-xl
                    border
                    border-gray-200
                    py-2.5
                    text-sm
                    font-semibold
                    text-gray-600
                    transition
                    hover:bg-gray-50
                  "
                >
                  Cancel
                </button>

                <motion.button
                  whileTap={{
                    scale: 0.96,
                  }}
                  type="submit"
                  className="
                    flex-1
                    cursor-pointer
                    rounded-xl
                    bg-green-600
                    py-2.5
                    text-sm
                    font-semibold
                    text-white
                    transition
                    hover:bg-green-700
                  "
                >
                  Create Category
                </motion.button>

              </div>

            </motion.form>

          </ModalOverlay>
        )}
      </AnimatePresence>

      {/* =========================
    EDIT CATEGORY MODAL
========================= */}

<AnimatePresence>
  {showEditModal && editCategory && (
    <ModalOverlay
      onClose={() => {
        setShowEditModal(false);
        setEditCategory(null);
      }}
    >
      <motion.form
        onSubmit={handleEditCategory}
        initial={{
          opacity: 0,
          scale: 0.9,
          y: 20,
        }}
        animate={{
          opacity: 1,
          scale: 1,
          y: 0,
        }}
        exit={{
          opacity: 0,
          scale: 0.95,
        }}
        className="
          w-full
          max-w-md
          rounded-2xl
          bg-white
          p-6
          shadow-2xl
        "
      >

        {/* Header */}

        <div className="
          flex
          items-center
          justify-between
        ">

          <div>
            <h2 className="
              text-lg
              font-bold
              text-gray-900
            ">
              Edit Category
            </h2>

            <p className="
              mt-1
              text-xs
              text-gray-400
            ">
              Update category information.
            </p>
          </div>

          <button
            type="button"
            onClick={() => {
              setShowEditModal(false);
              setEditCategory(null);
            }}
            className="
              cursor-pointer
              rounded-lg
              p-2
              text-gray-400
              transition
              hover:bg-gray-100
              hover:text-gray-700
            "
          >
            <X size={18} />
          </button>

        </div>

        {/* Category Name */}

        <div className="mt-6">

          <label className="
            text-sm
            font-semibold
            text-gray-700
          ">
            Category Name
          </label>

          <input
            type="text"
            value={editCategoryData.name}
            onChange={(e) =>
              setEditCategoryData({
                ...editCategoryData,
                name: e.target.value,
              })
            }
            placeholder="Category name"
            className="
              mt-2
              h-11
              w-full
              rounded-xl
              border
              border-gray-200
              bg-gray-50
              px-4
              text-sm
              text-gray-700
              outline-none
              transition
              focus:border-green-500
              focus:bg-white
              focus:ring-4
              focus:ring-green-50
            "
            required
          />

        </div>

        {/* Description */}

        <div className="mt-4">

          <label className="
            text-sm
            font-semibold
            text-gray-700
          ">
            Description
          </label>

          <textarea
            value={editCategoryData.description}
            onChange={(e) =>
              setEditCategoryData({
                ...editCategoryData,
                description: e.target.value,
              })
            }
            placeholder="Write a short description..."
            rows={4}
            className="
              mt-2
              w-full
              resize-none
              rounded-xl
              border
              border-gray-200
              bg-gray-50
              p-4
              text-sm
              text-gray-700
              outline-none
              transition
              focus:border-green-500
              focus:bg-white
              focus:ring-4
              focus:ring-green-50
            "
          />

        </div>

        {/* Buttons */}

        <div className="
          mt-6
          flex
          gap-3
        ">

          <button
            type="button"
            onClick={() => {
              setShowEditModal(false);
              setEditCategory(null);
            }}
            className="
              flex-1
              cursor-pointer
              rounded-xl
              border
              border-gray-200
              py-2.5
              text-sm
              font-semibold
              text-gray-600
              transition
              hover:bg-gray-50
            "
          >
            Cancel
          </button>

          <motion.button
            type="submit"
            whileTap={{
              scale: 0.96,
            }}
            className="
              flex-1
              cursor-pointer
              rounded-xl
              bg-green-600
              py-2.5
              text-sm
              font-semibold
              text-white
              shadow-sm
              transition
              hover:bg-green-700
            "
          >
            Save Changes
          </motion.button>

        </div>

      </motion.form>
    </ModalOverlay>
  )}
</AnimatePresence>

    </div>
  );
}





/* =========================================
   STAT CARD
========================================= */

function StatCard({
  title,
  value,
  icon,
}) {
  return (
    <motion.div
      variants={cardVariants}
      whileHover={{
        y: -5,
      }}
      className="
        rounded-2xl
        border
        border-gray-100
        bg-white
        p-5
        shadow-sm
        transition
        hover:shadow-md
      "
    >

      <div className="
        flex
        items-center
        justify-between
      ">

        <div>

          <p className="
            text-sm
            font-medium
            text-gray-500
          ">
            {title}
          </p>

          <motion.p
            initial={{
              opacity: 0,
              scale: 0.8,
            }}
            animate={{
              opacity: 1,
              scale: 1,
            }}
            className="
              mt-2
              text-2xl
              font-bold
              text-gray-900
            "
          >
            {value}
          </motion.p>

        </div>

        <motion.div
          whileHover={{
            scale: 1.08,
            rotate: 6,
          }}
          className="
            flex
            h-11
            w-11
            items-center
            justify-center
            rounded-xl
            bg-green-50
            text-green-600
          "
        >
          {icon}
        </motion.div>

      </div>

    </motion.div>
  );
}


/* =========================================
   ACTION BUTTON
========================================= */

function ActionButton({
  icon,
  onClick,
  type,
}) {
  const colors = {
    green:
      "hover:bg-green-50 hover:text-green-600",
    blue:
      "hover:bg-blue-50 hover:text-blue-600",
    red:
      "hover:bg-red-50 hover:text-red-500",
  };

  return (
    <motion.button
      type="button"
      whileHover={{
        scale: 1.1,
      }}
      whileTap={{
        scale: 0.9,
      }}
      onClick={onClick}
      className={`
        cursor-pointer
        rounded-lg
        p-2
        text-gray-400
        transition
        ${colors[type]}
      `}
    >
      {icon}
    </motion.button>
  );
}

/* =========================================
   MODAL OVERLAY
========================================= */

function ModalOverlay({
  children,
  onClose,
}) {
  return (
    <motion.div
      initial={{
        opacity: 0,
      }}
      animate={{
        opacity: 1,
      }}
      exit={{
        opacity: 0,
      }}
      onClick={onClose}
      className="
        fixed
        inset-0
        z-[100]
        flex
        items-center
        justify-center
        overflow-y-auto
        bg-black/40
        p-4
        backdrop-blur-sm
      "
    >
      <div
        onClick={(e) =>
          e.stopPropagation()
        }
        className="w-full flex justify-center"
      >
        {children}
      </div>
    </motion.div>
  );
}