"use client";

import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  SlidersHorizontal,
  Plus,
  Eye,
  Pencil,
  Trash2,
  MapPin,
  Star,
  EyeIcon,
  X,
  ChevronLeft,
  ChevronRight,
  Globe2,
} from "lucide-react";

const destinationsData = [
  {
    id: 1,
    name: "Jaflong",
    location: "Sylhet, Bangladesh",
    category: "Nature",
    rating: 4.8,
    views: 12540,
    status: "Active",
    featured: true,
    image:
      "https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=800&q=80",
    description:
      "A beautiful natural destination famous for hills, rivers and stone collections.",
  },
  {
    id: 2,
    name: "Cox's Bazar",
    location: "Chittagong, Bangladesh",
    category: "Beach",
    rating: 4.9,
    views: 18920,
    status: "Active",
    featured: true,
    image:
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80",
    description:
      "One of the world's longest natural sandy sea beaches.",
  },
  {
    id: 3,
    name: "Sajek Valley",
    location: "Rangamati, Bangladesh",
    category: "Hill",
    rating: 4.7,
    views: 15430,
    status: "Active",
    featured: true,
    image:
      "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=800&q=80",
    description:
      "A popular hill destination surrounded by clouds, mountains and green valleys.",
  },
  {
    id: 4,
    name: "Ratargul Swamp Forest",
    location: "Sylhet, Bangladesh",
    category: "Nature",
    rating: 4.6,
    views: 9870,
    status: "Active",
    featured: false,
    image:
      "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=800&q=80",
    description:
      "A freshwater swamp forest known for its unique ecosystem.",
  },
  {
    id: 5,
    name: "Bandarban",
    location: "Chittagong, Bangladesh",
    category: "Hill",
    rating: 4.8,
    views: 11200,
    status: "Active",
    featured: true,
    image:
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=800&q=80",
    description:
      "A scenic hill district with waterfalls, mountains and tribal culture.",
  },
  {
    id: 6,
    name: "Sundarbans",
    location: "Khulna, Bangladesh",
    category: "Wildlife",
    rating: 4.7,
    views: 8750,
    status: "Active",
    featured: false,
    image:
      "https://images.unsplash.com/photo-1511497584788-876760111969?auto=format&fit=crop&w=800&q=80",
    description:
      "The world's largest mangrove forest and home to the Royal Bengal Tiger.",
  },
  {
    id: 7,
    name: "Saint Martin's Island",
    location: "Cox's Bazar, Bangladesh",
    category: "Beach",
    rating: 4.5,
    views: 7640,
    status: "Draft",
    featured: false,
    image:
      "https://images.unsplash.com/photo-1540202404-a2f29016b523?auto=format&fit=crop&w=800&q=80",
    description:
      "A beautiful coral island known for blue water and peaceful beaches.",
  },
  {
    id: 8,
    name: "Tanguar Haor",
    location: "Sunamganj, Bangladesh",
    category: "Nature",
    rating: 4.6,
    views: 6320,
    status: "Active",
    featured: false,
    image:
      "https://images.unsplash.com/photo-1473448912268-2022ce9509d8?auto=format&fit=crop&w=800&q=80",
    description:
      "A large wetland ecosystem famous for its seasonal beauty.",
  },
  {
    id: 9,
    name: "Kuakata",
    location: "Patuakhali, Bangladesh",
    category: "Beach",
    rating: 4.4,
    views: 5840,
    status: "Active",
    featured: false,
    image:
      "https://images.unsplash.com/photo-1510414842594-a61c69b5ae57?auto=format&fit=crop&w=800&q=80",
    description:
      "A beautiful coastal destination where both sunrise and sunset can be enjoyed.",
  },
  {
    id: 10,
    name: "Madhabkunda Waterfall",
    location: "Moulvibazar, Bangladesh",
    category: "Nature",
    rating: 4.5,
    views: 4930,
    status: "Draft",
    featured: false,
    image:
      "https://images.unsplash.com/photo-1432405972618-c60b0225b8f9?auto=format&fit=crop&w=800&q=80",
    description:
      "One of the most popular waterfalls in Bangladesh.",
  },
];

const ITEMS_PER_PAGE = 6;

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

export default function DestinationsPage() {
  const [destinations, setDestinations] =
    useState(destinationsData);

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [status, setStatus] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);

  const [selectedDestination, setSelectedDestination] =
    useState(null);

  const [deleteDestination, setDeleteDestination] =
    useState(null);

  const filteredDestinations = useMemo(() => {
    return destinations.filter((destination) => {
      const searchText = search.toLowerCase().trim();

      const matchesSearch =
        destination.name
          .toLowerCase()
          .includes(searchText) ||
        destination.location
          .toLowerCase()
          .includes(searchText);

      const matchesCategory =
        category === "All" ||
        destination.category === category;

      const matchesStatus =
        status === "All" ||
        destination.status === status;

      return (
        matchesSearch &&
        matchesCategory &&
        matchesStatus
      );
    });
  }, [destinations, search, category, status]);

  const totalPages = Math.max(
    1,
    Math.ceil(
      filteredDestinations.length / ITEMS_PER_PAGE
    )
  );

  const paginatedDestinations =
    filteredDestinations.slice(
      (currentPage - 1) * ITEMS_PER_PAGE,
      currentPage * ITEMS_PER_PAGE
    );

  const totalDestinations = destinations.length;

  const featuredDestinations = destinations.filter(
    (destination) => destination.featured
  ).length;

  const activeDestinations = destinations.filter(
    (destination) => destination.status === "Active"
  ).length;

  const totalViews = destinations.reduce(
    (total, destination) =>
      total + destination.views,
    0
  );

  const handleSearch = (value) => {
    setSearch(value);
    setCurrentPage(1);
  };

  const handleCategory = (value) => {
    setCategory(value);
    setCurrentPage(1);
  };

  const handleStatus = (value) => {
    setStatus(value);
    setCurrentPage(1);
  };

  const clearFilters = () => {
    setSearch("");
    setCategory("All");
    setStatus("All");
    setCurrentPage(1);
  };

  const handleDelete = () => {
    if (!deleteDestination) return;

    const updated = destinations.filter(
      (destination) =>
        destination.id !== deleteDestination.id
    );

    setDestinations(updated);
    setDeleteDestination(null);

    const newTotalPages = Math.max(
      1,
      Math.ceil(
        updated.length / ITEMS_PER_PAGE
      )
    );

    if (currentPage > newTotalPages) {
      setCurrentPage(newTotalPages);
    }
  };

  return (
    <div className="w-full min-w-0 overflow-x-hidden p-4 sm:p-6 lg:p-8">

      {/* =========================
          HEADER
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
          flex flex-col gap-4
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
            Destinations
          </h1>

          <p className="
            mt-1
            text-sm
            text-gray-500
          ">
            Manage travel destinations and places.
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
          className="
            flex
            w-full
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
            transition-colors
            hover:bg-green-700
            sm:w-auto
          "
        >
          <Plus size={18} />
          Add Destination
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
          xl:grid-cols-4
        "
      >

        <Stat
          title="Total Destinations"
          value={totalDestinations}
          icon={<Globe2 size={21} />}
          variants={cardVariants}
        />

        <Stat
          title="Featured"
          value={featuredDestinations}
          icon={<Star size={21} />}
          variants={cardVariants}
        />

        <Stat
          title="Active"
          value={activeDestinations}
          icon={<MapPin size={21} />}
          variants={cardVariants}
        />

        <Stat
          title="Total Views"
          value={totalViews.toLocaleString()}
          icon={<EyeIcon size={21} />}
          variants={cardVariants}
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
          delay: 0.2,
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

        {/* FILTER AREA */}

        <div className="
          flex
          flex-col
          gap-3
          border-b
          border-gray-100
          p-4
          sm:p-5
          lg:flex-row
          lg:items-center
          lg:justify-between
        ">

          {/* Search */}

          <div className="
            relative
            w-full
            lg:max-w-md
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
                handleSearch(e.target.value)
              }
              placeholder="Search destinations..."
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
                transition-all
                duration-300
                placeholder:text-gray-400
                focus:border-green-500
                focus:bg-white
                focus:ring-4
                focus:ring-green-50
              "
            />

            <AnimatePresence>
              {search && (
                <motion.button
                  initial={{
                    opacity: 0,
                    scale: 0.7,
                  }}
                  animate={{
                    opacity: 1,
                    scale: 1,
                  }}
                  exit={{
                    opacity: 0,
                    scale: 0.7,
                  }}
                  onClick={() =>
                    handleSearch("")
                  }
                  className="
                    absolute
                    right-3
                    top-1/2
                    -translate-y-1/2
                    text-gray-400
                    hover:text-gray-700
                  "
                >
                  <X size={16} />
                </motion.button>
              )}
            </AnimatePresence>

          </div>

          {/* Filters */}

          <div className="
            flex
            w-full
            flex-col
            gap-2
            sm:flex-row
            lg:w-auto
          ">

            <div className="
              flex
              items-center
              gap-2
              text-sm
              text-gray-500
            ">
              <SlidersHorizontal size={17} />

              <span className="hidden sm:block">
                Filter
              </span>
            </div>

            <select
              value={category}
              onChange={(e) =>
                handleCategory(e.target.value)
              }
              className="
                h-10
                rounded-xl
                border
                border-gray-200
                bg-white
                px-3
                text-sm
                text-gray-600
                outline-none
                focus:border-green-500
                focus:ring-4
                focus:ring-green-50
              "
            >
              <option value="All">
                All Categories
              </option>

              <option value="Nature">
                Nature
              </option>

              <option value="Beach">
                Beach
              </option>

              <option value="Hill">
                Hill
              </option>

              <option value="Wildlife">
                Wildlife
              </option>
            </select>

            <select
              value={status}
              onChange={(e) =>
                handleStatus(e.target.value)
              }
              className="
                h-10
                rounded-xl
                border
                border-gray-200
                bg-white
                px-3
                text-sm
                text-gray-600
                outline-none
                focus:border-green-500
                focus:ring-4
                focus:ring-green-50
              "
            >
              <option value="All">
                All Status
              </option>

              <option value="Active">
                Active
              </option>

              <option value="Draft">
                Draft
              </option>
            </select>

          </div>

        </div>

        {/* =========================
            DESKTOP TABLE
        ========================= */}

        <div className="
          hidden
          overflow-x-auto
          lg:block
        ">

          <table className="
            w-full
            min-w-[900px]
          ">

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
                  Destination
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
                  Rating
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
                  Views
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

                {paginatedDestinations.map(
                  (destination, index) => (

                    <motion.tr
                      key={destination.id}
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
                        delay: index * 0.05,
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

                      {/* Destination */}

                      <td className="px-6 py-4">

                        <div className="
                          flex
                          items-center
                          gap-3
                        ">

                          <motion.img
                            whileHover={{
                              scale: 1.06,
                            }}
                            src={destination.image}
                            alt={destination.name}
                            className="
                              h-12
                              w-16
                              shrink-0
                              rounded-lg
                              object-cover
                            "
                          />

                          <div className="min-w-0">

                            <div className="
                              flex
                              items-center
                              gap-2
                            ">

                              <p className="
                                truncate
                                text-sm
                                font-semibold
                                text-gray-800
                              ">
                                {destination.name}
                              </p>

                              {destination.featured && (
                                <Star
                                  size={13}
                                  className="
                                    shrink-0
                                    fill-green-500
                                    text-green-500
                                  "
                                />
                              )}

                            </div>

                            <div className="
                              mt-1
                              flex
                              items-center
                              gap-1
                              text-xs
                              text-gray-400
                            ">
                              <MapPin size={12} />
                              <span className="truncate">
                                {destination.location}
                              </span>
                            </div>

                          </div>

                        </div>

                      </td>

                      {/* Category */}

                      <td className="px-6 py-4">

                        <span className="
                          rounded-full
                          bg-green-50
                          px-3
                          py-1
                          text-xs
                          font-semibold
                          text-green-700
                        ">
                          {destination.category}
                        </span>

                      </td>

                      {/* Rating */}

                      <td className="px-6 py-4">

                        <div className="
                          flex
                          items-center
                          gap-1
                        ">

                          <Star
                            size={15}
                            className="
                              fill-yellow-400
                              text-yellow-400
                            "
                          />

                          <span className="
                            text-sm
                            font-semibold
                            text-gray-700
                          ">
                            {destination.rating}
                          </span>

                        </div>

                      </td>

                      {/* Views */}

                      <td className="px-6 py-4">

                        <span className="
                          text-sm
                          text-gray-600
                        ">
                          {destination.views.toLocaleString()}
                        </span>

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
                            destination.status ===
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
                              destination.status ===
                              "Active"
                                ? "bg-green-500"
                                : "bg-gray-400"
                            }
                          `} />

                          {destination.status}

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
                              setSelectedDestination(
                                destination
                              )
                            }
                            hover="green"
                          />

                          <ActionButton
                            icon={<Pencil size={17} />}
                            hover="blue"
                          />

                          <ActionButton
                            icon={<Trash2 size={17} />}
                            onClick={() =>
                              setDeleteDestination(
                                destination
                              )
                            }
                            hover="red"
                          />

                        </div>

                      </td>

                    </motion.tr>

                  )
                )}

              </AnimatePresence>

            </tbody>

          </table>

        </div>

        {/* =========================
            MOBILE + TABLET CARDS
        ========================= */}

        <div className="
          grid
          grid-cols-1
          gap-4
          p-4
          sm:grid-cols-2
          lg:hidden
        ">

          <AnimatePresence mode="popLayout">

            {paginatedDestinations.map(
              (destination, index) => (

                <motion.div
                  key={destination.id}
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
                    overflow-hidden
                    rounded-2xl
                    border
                    border-gray-100
                    bg-white
                    shadow-sm
                    transition-shadow
                    hover:shadow-md
                  "
                >

                  {/* Image */}

                  <div className="
                    relative
                    h-44
                    overflow-hidden
                  ">

                    <motion.img
                      whileHover={{
                        scale: 1.05,
                      }}
                      transition={{
                        duration: 0.4,
                      }}
                      src={destination.image}
                      alt={destination.name}
                      className="
                        h-full
                        w-full
                        object-cover
                      "
                    />

                    <div className="
                      absolute
                      left-3
                      top-3
                    ">

                      <span className="
                        rounded-full
                        bg-white/90
                        px-2.5
                        py-1
                        text-[10px]
                        font-semibold
                        text-green-700
                        backdrop-blur-sm
                      ">
                        {destination.category}
                      </span>

                    </div>

                    {destination.featured && (
                      <div className="
                        absolute
                        right-3
                        top-3
                        flex
                        h-8
                        w-8
                        items-center
                        justify-center
                        rounded-full
                        bg-white/90
                        backdrop-blur-sm
                      ">
                        <Star
                          size={15}
                          className="
                            fill-yellow-400
                            text-yellow-400
                          "
                        />
                      </div>
                    )}

                  </div>

                  {/* Card Content */}

                  <div className="p-4">

                    <div className="
                      flex
                      items-start
                      justify-between
                      gap-3
                    ">

                      <div className="min-w-0">

                        <h3 className="
                          truncate
                          text-base
                          font-bold
                          text-gray-800
                        ">
                          {destination.name}
                        </h3>

                        <div className="
                          mt-1
                          flex
                          items-center
                          gap-1
                          text-xs
                          text-gray-400
                        ">
                          <MapPin size={12} />

                          <span className="truncate">
                            {destination.location}
                          </span>
                        </div>

                      </div>

                      <div className="
                        flex
                        shrink-0
                        items-center
                        gap-1
                      ">
                        <Star
                          size={14}
                          className="
                            fill-yellow-400
                            text-yellow-400
                          "
                        />

                        <span className="
                          text-xs
                          font-semibold
                          text-gray-700
                        ">
                          {destination.rating}
                        </span>
                      </div>

                    </div>

                    <div className="
                      mt-4
                      grid
                      grid-cols-2
                      gap-3
                    ">

                      <div className="
                        rounded-xl
                        bg-gray-50
                        p-3
                      ">

                        <p className="
                          text-[10px]
                          text-gray-400
                        ">
                          Views
                        </p>

                        <p className="
                          mt-1
                          text-sm
                          font-semibold
                          text-gray-700
                        ">
                          {destination.views.toLocaleString()}
                        </p>

                      </div>

                      <div className="
                        rounded-xl
                        bg-gray-50
                        p-3
                      ">

                        <p className="
                          text-[10px]
                          text-gray-400
                        ">
                          Status
                        </p>

                        <p className={`
                          mt-1
                          text-xs
                          font-semibold
                          ${
                            destination.status ===
                            "Active"
                              ? "text-green-600"
                              : "text-gray-500"
                          }
                        `}>
                          {destination.status}
                        </p>

                      </div>

                    </div>

                    {/* Actions */}

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
                          setSelectedDestination(
                            destination
                          )
                        }
                        className="
                          flex
                          flex-1
                          items-center
                          justify-center
                          gap-1.5
                          rounded-lg
                          bg-green-50
                          py-2
                          text-xs
                          font-semibold
                          text-green-700
                          hover:bg-green-100
                        "
                      >
                        <Eye size={14} />
                        View
                      </motion.button>

                      <motion.button
                        whileTap={{
                          scale: 0.95,
                        }}
                        className="
                          flex
                          flex-1
                          items-center
                          justify-center
                          gap-1.5
                          rounded-lg
                          bg-blue-50
                          py-2
                          text-xs
                          font-semibold
                          text-blue-600
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
                          setDeleteDestination(
                            destination
                          )
                        }
                        className="
                          flex
                          flex-1
                          items-center
                          justify-center
                          gap-1.5
                          rounded-lg
                          bg-red-50
                          py-2
                          text-xs
                          font-semibold
                          text-red-500
                          hover:bg-red-100
                        "
                      >
                        <Trash2 size={14} />
                        Delete
                      </motion.button>

                    </div>

                  </div>

                </motion.div>

              )
            )}

          </AnimatePresence>

        </div>

        {/* EMPTY */}

        {paginatedDestinations.length === 0 && (
          <div className="
            px-5
            py-16
            text-center
          ">

            <Globe2
              size={35}
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
              No destinations found
            </h3>

            <p className="
              mt-1
              text-sm
              text-gray-400
            ">
              Try changing your filters.
            </p>

            <button
              onClick={clearFilters}
              className="
                mt-4
                text-sm
                font-semibold
                text-green-600
              "
            >
              Clear Filters
            </button>

          </div>
        )}

        {/* PAGINATION */}

        {filteredDestinations.length > 0 && (
          <div className="
            flex
            flex-col
            gap-3
            border-t
            border-gray-100
            px-4
            py-4
            sm:flex-row
            sm:items-center
            sm:justify-between
            sm:px-6
          ">

            <p className="
              text-center
              text-xs
              text-gray-400
              sm:text-left
            ">
              Showing{" "}
              <b className="text-gray-600">
                {(currentPage - 1) *
                  ITEMS_PER_PAGE +
                  1}
              </b>{" "}
              to{" "}
              <b className="text-gray-600">
                {Math.min(
                  currentPage *
                    ITEMS_PER_PAGE,
                  filteredDestinations.length
                )}
              </b>{" "}
              of{" "}
              <b className="text-gray-600">
                {filteredDestinations.length}
              </b>
            </p>

            <div className="
              flex
              items-center
              justify-center
              gap-1
            ">

              <button
                disabled={currentPage === 1}
                onClick={() =>
                  setCurrentPage((page) =>
                    Math.max(page - 1, 1)
                  )
                }
                className="
                  rounded-lg
                  p-2
                  text-gray-500
                  hover:bg-green-50
                  hover:text-green-600
                  disabled:opacity-30
                "
              >
                <ChevronLeft size={17} />
              </button>

              {Array.from(
                { length: totalPages },
                (_, index) => index + 1
              ).map((page) => (
                <button
                  key={page}
                  onClick={() =>
                    setCurrentPage(page)
                  }
                  className={`
                    h-8
                    min-w-8
                    rounded-lg
                    px-2
                    text-xs
                    font-semibold
                    ${
                      currentPage === page
                        ? "bg-green-600 text-white"
                        : "text-gray-500 hover:bg-green-50 hover:text-green-600"
                    }
                  `}
                >
                  {page}
                </button>
              ))}

              <button
                disabled={
                  currentPage === totalPages
                }
                onClick={() =>
                  setCurrentPage((page) =>
                    Math.min(
                      page + 1,
                      totalPages
                    )
                  )
                }
                className="
                  rounded-lg
                  p-2
                  text-gray-500
                  hover:bg-green-50
                  hover:text-green-600
                  disabled:opacity-30
                "
              >
                <ChevronRight size={17} />
              </button>

            </div>

          </div>
        )}

      </motion.div>

      {/* =========================
          VIEW MODAL
      ========================= */}

      <AnimatePresence>
        {selectedDestination && (
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
            onClick={() =>
              setSelectedDestination(null)
            }
            className="
              fixed
              inset-0
              z-[100]
              flex
              items-center
              justify-center
              bg-black/40
              p-4
              backdrop-blur-sm
            "
          >

            <motion.div
              initial={{
                opacity: 0,
                scale: 0.9,
                y: 25,
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
              onClick={(e) =>
                e.stopPropagation()
              }
              className="
                max-h-[90vh]
                w-full
                max-w-lg
                overflow-y-auto
                rounded-2xl
                bg-white
                shadow-2xl
              "
            >

              <div className="
                relative
                h-52
              ">

                <img
                  src={selectedDestination.image}
                  alt={selectedDestination.name}
                  className="
                    h-full
                    w-full
                    object-cover
                  "
                />

                <button
                  onClick={() =>
                    setSelectedDestination(null)
                  }
                  className="
                    absolute
                    right-3
                    top-3
                    rounded-full
                    bg-white/90
                    p-2
                    text-gray-600
                    backdrop-blur-sm
                  "
                >
                  <X size={18} />
                </button>

              </div>

              <div className="p-6">

                <div className="
                  flex
                  items-start
                  justify-between
                  gap-3
                ">

                  <div>

                    <h2 className="
                      text-xl
                      font-bold
                      text-gray-900
                    ">
                      {selectedDestination.name}
                    </h2>

                    <p className="
                      mt-1
                      flex
                      items-center
                      gap-1
                      text-sm
                      text-gray-400
                    ">
                      <MapPin size={14} />
                      {selectedDestination.location}
                    </p>

                  </div>

                  <span className="
                    rounded-full
                    bg-green-50
                    px-3
                    py-1
                    text-xs
                    font-semibold
                    text-green-700
                  ">
                    {selectedDestination.category}
                  </span>

                </div>

                <p className="
                  mt-5
                  text-sm
                  leading-6
                  text-gray-500
                ">
                  {selectedDestination.description}
                </p>

                <div className="
                  mt-5
                  grid
                  grid-cols-3
                  gap-3
                ">

                  <div className="
                    rounded-xl
                    bg-gray-50
                    p-3
                    text-center
                  ">
                    <Star
                      size={17}
                      className="
                        mx-auto
                        fill-yellow-400
                        text-yellow-400
                      "
                    />
                    <p className="
                      mt-1
                      text-sm
                      font-bold
                      text-gray-800
                    ">
                      {selectedDestination.rating}
                    </p>
                    <p className="
                      text-[10px]
                      text-gray-400
                    ">
                      Rating
                    </p>
                  </div>

                  <div className="
                    rounded-xl
                    bg-gray-50
                    p-3
                    text-center
                  ">
                    <Eye
                      size={17}
                      className="
                        mx-auto
                        text-green-600
                      "
                    />
                    <p className="
                      mt-1
                      text-sm
                      font-bold
                      text-gray-800
                    ">
                      {selectedDestination.views.toLocaleString()}
                    </p>
                    <p className="
                      text-[10px]
                      text-gray-400
                    ">
                      Views
                    </p>
                  </div>

                  <div className="
                    rounded-xl
                    bg-gray-50
                    p-3
                    text-center
                  ">
                    <MapPin
                      size={17}
                      className="
                        mx-auto
                        text-green-600
                      "
                    />
                    <p className="
                      mt-1
                      text-sm
                      font-bold
                      text-gray-800
                    ">
                      {selectedDestination.status}
                    </p>
                    <p className="
                      text-[10px]
                      text-gray-400
                    ">
                      Status
                    </p>
                  </div>

                </div>

              </div>

            </motion.div>

          </motion.div>
        )}
      </AnimatePresence>

      {/* =========================
          DELETE MODAL
      ========================= */}

      <AnimatePresence>
        {deleteDestination && (
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
            onClick={() =>
              setDeleteDestination(null)
            }
            className="
              fixed
              inset-0
              z-[100]
              flex
              items-center
              justify-center
              bg-black/40
              p-4
              backdrop-blur-sm
            "
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
              onClick={(e) =>
                e.stopPropagation()
              }
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
                Delete Destination?
              </h3>

              <p className="
                mt-2
                text-sm
                leading-6
                text-gray-500
              ">
                Are you sure you want to delete{" "}
                <b className="text-gray-700">
                  {deleteDestination.name}
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
                    setDeleteDestination(null)
                  }
                  className="
                    flex-1
                    rounded-xl
                    border
                    border-gray-200
                    py-2.5
                    text-sm
                    font-semibold
                    text-gray-600
                    hover:bg-gray-50
                  "
                >
                  Cancel
                </button>

                <motion.button
                  whileTap={{
                    scale: 0.96,
                  }}
                  onClick={handleDelete}
                  className="
                    flex-1
                    rounded-xl
                    bg-red-500
                    py-2.5
                    text-sm
                    font-semibold
                    text-white
                    hover:bg-red-600
                  "
                >
                  Delete
                </motion.button>

              </div>

            </motion.div>

          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}


/* =========================================
   STAT COMPONENT
========================================= */

function Stat({
  title,
  value,
  icon,
  variants,
}) {
  return (
    <motion.div
      variants={variants}
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
        transition-shadow
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
            transition={{
              duration: 0.35,
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
  hover,
}) {
  const hoverClasses = {
    green:
      "hover:bg-green-50 hover:text-green-600",
    blue:
      "hover:bg-blue-50 hover:text-blue-600",
    red:
      "hover:bg-red-50 hover:text-red-500",
  };

  return (
    <motion.button
      whileHover={{
        scale: 1.1,
      }}
      whileTap={{
        scale: 0.9,
      }}
      onClick={onClick}
      className={`
        rounded-lg
        p-2
        text-gray-400
        transition-colors
        ${hoverClasses[hover]}
      `}
    >
      {icon}
    </motion.button>
  );
}