"use client";


import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  SlidersHorizontal,
  Eye,
  Pencil,
  Trash2,
  UserPlus,
  Users,
  UserCheck,
  UserX,
  ChevronLeft,
  ChevronRight,
  X,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";

const usersData = [
  {
    id: 1,
    name: "Nishat Yeasmin",
    email: "nishat@example.com",
    phone: "+880 1712-345678",
    location: "Sylhet, Bangladesh",
    joined: "Aug 20, 2026",
    trips: 12,
    status: "Active",
  },
  {
    id: 2,
    name: "Sadia Rahman",
    email: "sadia@example.com",
    phone: "+880 1812-456789",
    location: "Dhaka, Bangladesh",
    joined: "Aug 19, 2026",
    trips: 8,
    status: "Active",
  },
  {
    id: 3,
    name: "Tanvir Ahmed",
    email: "tanvir@example.com",
    phone: "+880 1912-567890",
    location: "Chittagong, Bangladesh",
    joined: "Aug 18, 2026",
    trips: 15,
    status: "Active",
  },
  {
    id: 4,
    name: "Mehedi Hasan",
    email: "mehedi@example.com",
    phone: "+880 1612-678901",
    location: "Rajshahi, Bangladesh",
    joined: "Aug 17, 2026",
    trips: 5,
    status: "Inactive",
  },
  {
    id: 5,
    name: "Sumaiya Islam",
    email: "sumaiya@example.com",
    phone: "+880 1512-789012",
    location: "Sylhet, Bangladesh",
    joined: "Aug 16, 2026",
    trips: 10,
    status: "Active",
  },
  {
    id: 6,
    name: "Arif Hossain",
    email: "arif@example.com",
    phone: "+880 1312-890123",
    location: "Khulna, Bangladesh",
    joined: "Aug 15, 2026",
    trips: 7,
    status: "Active",
  },
  {
    id: 7,
    name: "Mim Akter",
    email: "mim@example.com",
    phone: "+880 1412-901234",
    location: "Mymensingh, Bangladesh",
    joined: "Aug 14, 2026",
    trips: 3,
    status: "Inactive",
  },
  {
    id: 8,
    name: "Rakib Hasan",
    email: "rakib@example.com",
    phone: "+880 1212-112233",
    location: "Dhaka, Bangladesh",
    joined: "Aug 13, 2026",
    trips: 18,
    status: "Active",
  },
  {
    id: 9,
    name: "Fahim Rahman",
    email: "fahim@example.com",
    phone: "+880 1112-223344",
    location: "Barisal, Bangladesh",
    joined: "Aug 12, 2026",
    trips: 6,
    status: "Active",
  },
  {
    id: 10,
    name: "Jannatul Ferdous",
    email: "jannatul@example.com",
    phone: "+880 1012-334455",
    location: "Comilla, Bangladesh",
    joined: "Aug 11, 2026",
    trips: 9,
    status: "Active",
  },
  {
    id: 11,
    name: "Siam Ahmed",
    email: "siam@example.com",
    phone: "+880 1711-445566",
    location: "Sylhet, Bangladesh",
    joined: "Aug 10, 2026",
    trips: 4,
    status: "Inactive",
  },
  {
    id: 12,
    name: "Nabila Sultana",
    email: "nabila@example.com",
    phone: "+880 1811-556677",
    location: "Dhaka, Bangladesh",
    joined: "Aug 09, 2026",
    trips: 11,
    status: "Active",
  },
];

const ITEMS_PER_PAGE = 8;

const containerVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const itemVariants = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.45,
      ease: "easeOut",
    },
  },
};

export default function UsersPage() {
  const [users, setUsers] = useState(usersData);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedUser, setSelectedUser] = useState(null);
  const [deleteUser, setDeleteUser] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
const [editingUser, setEditingUser] = useState(null);

const emptyUser = {
  name: "",
  email: "",
  phone: "",
  location: "",
  joined: "",
  trips: 0,
  status: "Active",
};

const [userForm, setUserForm] = useState(emptyUser);

  const filteredUsers = useMemo(() => {
    return users.filter((user) => {
      const searchValue = search.toLowerCase().trim();

      const matchesSearch =
        user.name.toLowerCase().includes(searchValue) ||
        user.email.toLowerCase().includes(searchValue);

      const matchesStatus =
        statusFilter === "All" ||
        user.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [users, search, statusFilter]);

  const totalPages = Math.max(
    1,
    Math.ceil(filteredUsers.length / ITEMS_PER_PAGE)
  );

  const paginatedUsers = filteredUsers.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const activeUsers = users.filter(
    (user) => user.status === "Active"
  ).length;

  const inactiveUsers = users.filter(
    (user) => user.status === "Inactive"
  ).length;

  const handleSearch = (value) => {
    setSearch(value);
    setCurrentPage(1);
  };

  const handleFilter = (value) => {
    setStatusFilter(value);
    setCurrentPage(1);
  };

  const clearFilters = () => {
    setSearch("");
    setStatusFilter("All");
    setCurrentPage(1);
  };

  const handleAddUser = () => {
  if (!userForm.name || !userForm.email) return;

  const newUser = {
    ...userForm,
    id: Date.now(),
    trips: Number(userForm.trips) || 0,
  };

  setUsers((prev) => [newUser, ...prev]);

  setShowAddModal(false);
  setUserForm(emptyUser);
  setCurrentPage(1);
};

const openEditModal = (user) => {
  setEditingUser(user);
  setUserForm({
    name: user.name,
    email: user.email,
    phone: user.phone,
    location: user.location,
    joined: user.joined,
    trips: user.trips,
    status: user.status,
  });
};

const handleEditUser = () => {
  if (!editingUser || !userForm.name || !userForm.email) return;

  setUsers((prev) =>
    prev.map((user) =>
      user.id === editingUser.id
        ? {
            ...user,
            ...userForm,
            trips: Number(userForm.trips) || 0,
          }
        : user
    )
  );

  setEditingUser(null);
  setUserForm(emptyUser);
};

  const handleDelete = () => {
    if (!deleteUser) return;

    const updatedUsers = users.filter(
      (user) => user.id !== deleteUser.id
    );

    setUsers(updatedUsers);
    setDeleteUser(null);

    const newTotalPages = Math.max(
      1,
      Math.ceil(updatedUsers.length / ITEMS_PER_PAGE)
    );

    if (currentPage > newTotalPages) {
      setCurrentPage(newTotalPages);
    }
  };

  return (
    <div className="min-h-full p-4 sm:p-6 lg:p-8">

      {/* =========================================
          PAGE HEADER
      ========================================= */}

      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-7 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between"
      >
        <div>
          <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
            Users
          </h1>

          <p className="mt-1 text-sm text-gray-500">
            Manage and monitor all registered users.
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
           onClick={() => {
    setUserForm(emptyUser);
    setShowAddModal(true);
  }}
          className="
            flex cursor-pointer items-center justify-center gap-2
            rounded-xl bg-green-600
            px-4 py-2.5
            text-sm font-semibold text-white
            shadow-sm shadow-green-200
            transition-colors duration-300
            hover:bg-green-700
          "
        >
          <UserPlus size={18} />
          Add User
        </motion.button>
      </motion.div>

      {/* =========================================
          STATISTICS
      ========================================= */}

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-3"
      >

        {/* Total Users */}
        <motion.div
          variants={itemVariants}
          whileHover={{
            y: -5,
            transition: { duration: 0.2 },
          }}
          className="
            group rounded-2xl
            border border-gray-100
            bg-white p-5
            shadow-sm
            transition-shadow duration-300
            hover:shadow-md
          "
        >
          <div className="flex items-center justify-between">

            <div>
              <p className="text-sm font-medium text-gray-500">
                Total Users
              </p>

              <motion.p
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.35 }}
                className="mt-2 text-2xl font-bold text-gray-900"
              >
                {users.length}
              </motion.p>
            </div>

            <motion.div
              whileHover={{
                rotate: 8,
                scale: 1.08,
              }}
              className="
                flex h-11 w-11
                items-center justify-center
                rounded-xl bg-green-50
                text-green-600
              "
            >
              <Users size={21} />
            </motion.div>

          </div>
        </motion.div>

        {/* Active Users */}
        <motion.div
          variants={itemVariants}
          whileHover={{
            y: -5,
            transition: { duration: 0.2 },
          }}
          className="
            group rounded-2xl
            border border-gray-100
            bg-white p-5
            shadow-sm
            transition-shadow duration-300
            hover:shadow-md
          "
        >
          <div className="flex items-center justify-between">

            <div>
              <p className="text-sm font-medium text-gray-500">
                Active Users
              </p>

              <motion.p
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.45 }}
                className="mt-2 text-2xl font-bold text-gray-900"
              >
                {activeUsers}
              </motion.p>
            </div>

            <motion.div
              whileHover={{
                rotate: 8,
                scale: 1.08,
              }}
              className="
                flex h-11 w-11
                items-center justify-center
                rounded-xl bg-green-50
                text-green-600
              "
            >
              <UserCheck size={21} />
            </motion.div>

          </div>
        </motion.div>

        {/* Inactive Users */}
        <motion.div
          variants={itemVariants}
          whileHover={{
            y: -5,
            transition: { duration: 0.2 },
          }}
          className="
            group rounded-2xl
            border border-gray-100
            bg-white p-5
            shadow-sm
            transition-shadow duration-300
            hover:shadow-md
          "
        >
          <div className="flex items-center justify-between">

            <div>
              <p className="text-sm font-medium text-gray-500">
                Inactive Users
              </p>

              <motion.p
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.55 }}
                className="mt-2 text-2xl font-bold text-gray-900"
              >
                {inactiveUsers}
              </motion.p>
            </div>

            <motion.div
              whileHover={{
                rotate: 8,
                scale: 1.08,
              }}
              className="
                flex h-11 w-11
                items-center justify-center
                rounded-xl bg-gray-100
                text-gray-500
              "
            >
              <UserX size={21} />
            </motion.div>

          </div>
        </motion.div>

      </motion.div>

      {/* =========================================
          MAIN USERS CARD
      ========================================= */}

      <motion.div
        initial={{
          opacity: 0,
          y: 30,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          duration: 0.6,
          delay: 0.25,
        }}
        className="
          overflow-hidden
          rounded-2xl
          border border-gray-100
          bg-white
          shadow-sm
        "
      >

        {/* =====================================
            SEARCH + FILTER
        ===================================== */}

        <div className="
          flex flex-col gap-3
          border-b border-gray-100
          p-4
          sm:p-5
          lg:flex-row
          lg:items-center
          lg:justify-between
        ">

          {/* Search */}
          <div className="relative w-full lg:max-w-md">

            <Search
              size={18}
              className="
                absolute left-3.5 top-1/2
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
              placeholder="Search users by name or email..."
              className="
                h-11 w-full
                rounded-xl
                border border-gray-200
                bg-gray-50
                pl-10 pr-10
                text-sm text-gray-700
                outline-none
                transition-all duration-300
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
                  whileTap={{
                    scale: 0.85,
                  }}
                  onClick={() =>
                    handleSearch("")
                  }
                  className="
                    absolute right-3
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

          {/* Filter */}
          <div className="flex items-center gap-2">

            <div className="
              flex items-center gap-2
              text-sm text-gray-500
            ">
              <SlidersHorizontal size={17} />

              <span className="hidden sm:inline">
                Status:
              </span>
            </div>

            <select
              value={statusFilter}
              onChange={(e) =>
                handleFilter(e.target.value)
              }
              className="
                h-11
                rounded-xl
                border border-gray-200
                bg-white
                px-3
                text-sm text-gray-600
                outline-none
                transition-all
                focus:border-green-500
                focus:ring-4
                focus:ring-green-50
              "
            >
              <option value="All">
                All Users
              </option>

              <option value="Active">
                Active
              </option>

              <option value="Inactive">
                Inactive
              </option>
            </select>

          </div>

        </div>

        {/* =====================================
            DESKTOP TABLE
        ===================================== */}

        <div className="hidden overflow-x-auto md:block">

          <table className="w-full min-w-[850px]">

            <thead>
              <tr className="
                border-b border-gray-100
                bg-gray-50/70
              ">

                <th className="
                  px-6 py-4
                  text-left
                  text-xs font-semibold
                  uppercase tracking-wider
                  text-gray-400
                ">
                  User
                </th>

                <th className="
                  px-6 py-4
                  text-left
                  text-xs font-semibold
                  uppercase tracking-wider
                  text-gray-400
                ">
                  Phone
                </th>

                <th className="
                  px-6 py-4
                  text-left
                  text-xs font-semibold
                  uppercase tracking-wider
                  text-gray-400
                ">
                  Joined
                </th>

                <th className="
                  px-6 py-4
                  text-center
                  text-xs font-semibold
                  uppercase tracking-wider
                  text-gray-400
                ">
                  Trips
                </th>

                <th className="
                  px-6 py-4
                  text-left
                  text-xs font-semibold
                  uppercase tracking-wider
                  text-gray-400
                ">
                  Status
                </th>

                <th className="
                  px-6 py-4
                  text-right
                  text-xs font-semibold
                  uppercase tracking-wider
                  text-gray-400
                ">
                  Actions
                </th>

              </tr>
            </thead>

            <tbody>

              <AnimatePresence mode="popLayout">

                {paginatedUsers.map((user, index) => (

                  <motion.tr
                    key={user.id}
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
                        "rgba(240, 253, 244, 0.7)",
                    }}
                    className="
                      border-b
                      border-gray-50
                    "
                  >

                    {/* User */}
                    <td className="px-6 py-4">

                      <div className="
                        flex items-center gap-3
                      ">

                        <motion.div
                          whileHover={{
                            scale: 1.08,
                          }}
                          className="
                            flex h-10 w-10
                            shrink-0
                            items-center
                            justify-center
                            rounded-full
                            bg-green-100
                            text-sm font-bold
                            text-green-700
                          "
                        >
                          {user.name.charAt(0)}
                        </motion.div>

                        <div className="min-w-0">

                          <p className="
                            truncate
                            text-sm font-semibold
                            text-gray-800
                          ">
                            {user.name}
                          </p>

                          <p className="
                            truncate
                            text-xs
                            text-gray-400
                          ">
                            {user.email}
                          </p>

                        </div>

                      </div>

                    </td>

                    {/* Phone */}
                    <td className="px-6 py-4">

                      <span className="
                        text-sm
                        text-gray-600
                      ">
                        {user.phone}
                      </span>

                    </td>

                    {/* Joined */}
                    <td className="px-6 py-4">

                      <span className="
                        text-sm
                        text-gray-500
                      ">
                        {user.joined}
                      </span>

                    </td>

                    {/* Trips */}
                    <td className="
                      px-6 py-4
                      text-center
                    ">

                      <span className="
                        font-semibold
                        text-gray-700
                      ">
                        {user.trips}
                      </span>

                    </td>

                    {/* Status */}
                    <td className="px-6 py-4">

                      <span
                        className={`
                          inline-flex
                          items-center gap-1.5
                          rounded-full
                          px-3 py-1
                          text-xs font-semibold
                          ${
                            user.status === "Active"
                              ? "bg-green-50 text-green-700"
                              : "bg-gray-100 text-gray-500"
                          }
                        `}
                      >

                        <span
                          className={`
                            h-1.5 w-1.5
                            rounded-full
                            ${
                              user.status === "Active"
                                ? "bg-green-500"
                                : "bg-gray-400"
                            }
                          `}
                        />

                        {user.status}

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

                        <motion.button
                          whileHover={{
                            scale: 1.1,
                          }}
                          whileTap={{
                            scale: 0.9,
                          }}
                          onClick={() =>
                            setSelectedUser(user)
                          }
                          title="View User"
                          className="
                            rounded-lg
                            p-2
                            text-gray-400
                            transition-colors
                            hover:bg-green-50
                            hover:text-green-600
                          "
                        >
                          <Eye size={17} />
                        </motion.button>

                        <motion.button
                          whileHover={{
                            scale: 1.1,
                          }}
                          whileTap={{
                            scale: 0.9,
                          }}
                           onClick={() => openEditModal(user)}
                          title="Edit User"
                          className="
                            rounded-lg
                            p-2 cursor-pointer
                            text-gray-400
                            transition-colors
                            hover:bg-blue-50
                            hover:text-blue-600
                          "
                        >
                          <Pencil size={17} />
                        </motion.button>

                        <motion.button
                          whileHover={{
                            scale: 1.1,
                          }}
                          whileTap={{
                            scale: 0.9,
                          }}
                          onClick={() =>
                            setDeleteUser(user)
                          }
                          title="Delete User"
                          className="
                            rounded-lg
                            p-2
                            text-gray-400
                            transition-colors
                            hover:bg-red-50
                            hover:text-red-500
                          "
                        >
                          <Trash2 size={17} />
                        </motion.button>

                      </div>

                    </td>

                  </motion.tr>

                ))}

              </AnimatePresence>

            </tbody>

          </table>

        </div>

        {/* =====================================
            MOBILE USER CARDS
        ===================================== */}

        <div className="
          divide-y
          divide-gray-100
          md:hidden
        ">

          <AnimatePresence mode="popLayout">

            {paginatedUsers.map((user, index) => (

              <motion.div
                key={user.id}
                layout
                initial={{
                  opacity: 0,
                  y: 15,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                exit={{
                  opacity: 0,
                  y: -10,
                }}
                transition={{
                  duration: 0.35,
                  delay: index * 0.05,
                }}
                className="p-4"
              >

                <div className="
                  flex items-start gap-3
                ">

                  {/* Avatar */}
                  <motion.div
                    whileHover={{
                      scale: 1.08,
                    }}
                    className="
                      flex h-11 w-11
                      shrink-0
                      items-center
                      justify-center
                      rounded-full
                      bg-green-100
                      font-bold
                      text-green-700
                    "
                  >
                    {user.name.charAt(0)}
                  </motion.div>

                  {/* Content */}
                  <div className="
                    min-w-0
                    flex-1
                  ">

                    <div className="
                      flex
                      items-start
                      justify-between
                      gap-2
                    ">

                      <div className="min-w-0">

                        <p className="
                          truncate
                          text-sm font-semibold
                          text-gray-800
                        ">
                          {user.name}
                        </p>

                        <p className="
                          truncate
                          text-xs
                          text-gray-400
                        ">
                          {user.email}
                        </p>

                      </div>

                      <span
                        className={`
                          shrink-0
                          rounded-full
                          px-2.5 py-1
                          text-[10px]
                          font-semibold
                          ${
                            user.status === "Active"
                              ? "bg-green-50 text-green-700"
                              : "bg-gray-100 text-gray-500"
                          }
                        `}
                      >
                        {user.status}
                      </span>

                    </div>

                    {/* Info */}
                    <div className="
                      mt-3
                      grid grid-cols-2
                      gap-3
                    ">

                      <div>
                        <span className="
                          text-xs
                          text-gray-400
                        ">
                          Joined
                        </span>

                        <p className="
                          mt-0.5
                          text-xs font-medium
                          text-gray-600
                        ">
                          {user.joined}
                        </p>
                      </div>

                      <div>
                        <span className="
                          text-xs
                          text-gray-400
                        ">
                          Trips
                        </span>

                        <p className="
                          mt-0.5
                          text-xs font-medium
                          text-gray-600
                        ">
                          {user.trips}
                        </p>
                      </div>

                    </div>

                    {/* Actions */}
                    <div className="
                      mt-3
                      flex gap-2
                    ">

                      <motion.button
                        whileTap={{
                          scale: 0.95,
                        }}
                        onClick={() =>
                          setSelectedUser(user)
                        }
                        className="
                          flex flex-1
                          items-center
                          justify-center
                          gap-1.5
                          rounded-lg
                          bg-green-50
                          py-2
                          text-xs font-semibold
                          text-green-700
                          transition-colors
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
                          onClick={() => openEditModal(user)}
                        className="
                          flex flex-1
                          items-center
                          justify-center
                          gap-1.5
                          rounded-lg
                          bg-blue-50
                          py-2 cursor-pointer
                          text-xs font-semibold
                          text-blue-600
                          transition-colors
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
                          setDeleteUser(user)
                        }
                        className="
                          flex flex-1
                          items-center
                          justify-center
                          gap-1.5
                          rounded-lg
                          bg-red-50
                          py-2
                          text-xs font-semibold
                          text-red-500
                          transition-colors
                          hover:bg-red-100
                        "
                      >
                        <Trash2 size={14} />
                        Delete
                      </motion.button>

                    </div>

                  </div>

                </div>

              </motion.div>

            ))}

          </AnimatePresence>

        </div>

        {/* =====================================
            EMPTY STATE
        ===================================== */}

        {paginatedUsers.length === 0 && (

          <motion.div
            initial={{
              opacity: 0,
              scale: 0.95,
            }}
            animate={{
              opacity: 1,
              scale: 1,
            }}
            className="
              px-5 py-16
              text-center
            "
          >

            <motion.div
              animate={{
                y: [0, -5, 0],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="
                mx-auto
                flex h-14 w-14
                items-center
                justify-center
                rounded-2xl
                bg-green-50
                text-green-600
              "
            >
              <Users size={24} />
            </motion.div>

            <h3 className="
              mt-4
              text-base font-semibold
              text-gray-800
            ">
              No users found
            </h3>

            <p className="
              mt-1
              text-sm
              text-gray-400
            ">
              Try changing your search or filter.
            </p>

            <motion.button
              whileHover={{
                scale: 1.03,
              }}
              whileTap={{
                scale: 0.95,
              }}
              onClick={clearFilters}
              className="
                mt-4
                text-sm font-semibold
                text-green-600
                hover:text-green-700
              "
            >
              Clear filters
            </motion.button>

          </motion.div>

        )}

        {/* =====================================
            PAGINATION
        ===================================== */}

        {filteredUsers.length > 0 && (

          <div className="
            flex flex-col gap-3
            border-t border-gray-100
            px-4 py-4
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

              <span className="
                font-semibold
                text-gray-600
              ">
                {(currentPage - 1) *
                  ITEMS_PER_PAGE +
                  1}
              </span>{" "}

              to{" "}

              <span className="
                font-semibold
                text-gray-600
              ">
                {Math.min(
                  currentPage * ITEMS_PER_PAGE,
                  filteredUsers.length
                )}
              </span>{" "}

              of{" "}

              <span className="
                font-semibold
                text-gray-600
              ">
                {filteredUsers.length}
              </span>{" "}

              users
            </p>

            <div className="
              flex
              items-center
              justify-center
              gap-1
            ">

              <motion.button
                whileTap={{
                  scale: 0.9,
                }}
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
                  transition-colors
                  hover:bg-green-50
                  hover:text-green-600
                  disabled:cursor-not-allowed
                  disabled:opacity-30
                "
              >
                <ChevronLeft size={17} />
              </motion.button>

              {Array.from(
                {
                  length: totalPages,
                },
                (_, index) => index + 1
              ).map((page) => (

                <motion.button
                  key={page}
                  whileTap={{
                    scale: 0.9,
                  }}
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
                    transition-colors
                    ${
                      currentPage === page
                        ? "bg-green-600 text-white shadow-sm"
                        : "text-gray-500 hover:bg-green-50 hover:text-green-600"
                    }
                  `}
                >
                  {page}
                </motion.button>

              ))}

              <motion.button
                whileTap={{
                  scale: 0.9,
                }}
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
                  transition-colors
                  hover:bg-green-50
                  hover:text-green-600
                  disabled:cursor-not-allowed
                  disabled:opacity-30
                "
              >
                <ChevronRight size={17} />
              </motion.button>

            </div>

          </div>

        )}

      </motion.div>

      {/* =========================================
          VIEW USER MODAL
      ========================================= */}

      <AnimatePresence>
        {selectedUser && (

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
              setSelectedUser(null)
            }
            className="
              fixed inset-0
              z-[100]
              flex items-center
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
                y: 15,
              }}
              transition={{
                duration: 0.25,
              }}
              onClick={(e) =>
                e.stopPropagation()
              }
              className="
                w-full
                max-w-md
                rounded-2xl
                bg-white
                p-6
                shadow-2xl
              "
            >

              {/* Modal Header */}
              <div className="
                flex
                items-start
                justify-between
              ">

                <div className="
                  flex items-center gap-3
                ">

                  <motion.div
                    initial={{
                      scale: 0.7,
                    }}
                    animate={{
                      scale: 1,
                    }}
                    transition={{
                      delay: 0.1,
                    }}
                    className="
                      flex h-12 w-12
                      items-center
                      justify-center
                      rounded-full
                      bg-green-100
                      font-bold
                      text-green-700
                    "
                  >
                    {selectedUser.name.charAt(0)}
                  </motion.div>

                  <div>

                    <h3 className="
                      font-bold
                      text-gray-900
                    ">
                      {selectedUser.name}
                    </h3>

                    <p className="
                      text-xs
                      text-gray-400
                    ">
                      User Details
                    </p>

                  </div>

                </div>

                <motion.button
                  whileHover={{
                    rotate: 90,
                  }}
                  whileTap={{
                    scale: 0.9,
                  }}
                  onClick={() =>
                    setSelectedUser(null)
                  }
                  className="
                    rounded-lg
                    p-2
                    text-gray-400
                    hover:bg-gray-100
                    hover:text-gray-700
                  "
                >
                  <X size={18} />
                </motion.button>

              </div>

              {/* User Details */}
              <div className="
                mt-6
                space-y-4
              ">

                {/* Email */}
                <div className="
                  flex items-start gap-3
                ">

                  <div className="
                    mt-0.5
                    flex h-8 w-8
                    items-center
                    justify-center
                    rounded-lg
                    bg-green-50
                    text-green-600
                  ">
                    <Mail size={15} />
                  </div>

                  <div>
                    <p className="
                      text-xs
                      text-gray-400
                    ">
                      Email
                    </p>

                    <p className="
                      mt-1
                      text-sm font-medium
                      text-gray-700
                    ">
                      {selectedUser.email}
                    </p>
                  </div>

                </div>

                {/* Phone */}
                <div className="
                  flex items-start gap-3
                ">

                  <div className="
                    mt-0.5
                    flex h-8 w-8
                    items-center
                    justify-center
                    rounded-lg
                    bg-green-50
                    text-green-600
                  ">
                    <Phone size={15} />
                  </div>

                  <div>
                    <p className="
                      text-xs
                      text-gray-400
                    ">
                      Phone
                    </p>

                    <p className="
                      mt-1
                      text-sm font-medium
                      text-gray-700
                    ">
                      {selectedUser.phone}
                    </p>
                  </div>

                </div>

                {/* Location */}
                <div className="
                  flex items-start gap-3
                ">

                  <div className="
                    mt-0.5
                    flex h-8 w-8
                    items-center
                    justify-center
                    rounded-lg
                    bg-green-50
                    text-green-600
                  ">
                    <MapPin size={15} />
                  </div>

                  <div>
                    <p className="
                      text-xs
                      text-gray-400
                    ">
                      Location
                    </p>

                    <p className="
                      mt-1
                      text-sm font-medium
                      text-gray-700
                    ">
                      {selectedUser.location}
                    </p>
                  </div>

                </div>

                {/* Joined + Trips */}
                <div className="
                  grid grid-cols-2
                  gap-4
                ">

                  <div>
                    <p className="
                      text-xs
                      text-gray-400
                    ">
                      Joined
                    </p>

                    <p className="
                      mt-1
                      text-sm font-medium
                      text-gray-700
                    ">
                      {selectedUser.joined}
                    </p>
                  </div>

                  <div>
                    <p className="
                      text-xs
                      text-gray-400
                    ">
                      Total Trips
                    </p>

                    <p className="
                      mt-1
                      text-sm font-medium
                      text-gray-700
                    ">
                      {selectedUser.trips}
                    </p>
                  </div>

                </div>

                {/* Status */}
                <div>

                  <p className="
                    text-xs
                    text-gray-400
                  ">
                    Status
                  </p>

                  <span
                    className={`
                      mt-1
                      inline-flex
                      rounded-full
                      px-3 py-1
                      text-xs font-semibold
                      ${
                        selectedUser.status ===
                        "Active"
                          ? "bg-green-50 text-green-700"
                          : "bg-gray-100 text-gray-500"
                      }
                    `}
                  >
                    {selectedUser.status}
                  </span>

                </div>

              </div>

              <motion.button
                whileHover={{
                  scale: 1.02,
                }}
                whileTap={{
                  scale: 0.97,
                }}
                onClick={() =>
                  setSelectedUser(null)
                }
                className="
                  mt-6
                  w-full
                  rounded-xl
                  bg-green-600
                  py-2.5
                  text-sm
                  font-semibold
                  text-white
                  transition-colors
                  hover:bg-green-700
                "
              >
                Close
              </motion.button>

            </motion.div>

          </motion.div>

        )}
      </AnimatePresence>

      {/* =========================================
    ADD / EDIT USER MODAL
========================================= */}

<AnimatePresence>
  {(showAddModal || editingUser) && (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={() => {
        setShowAddModal(false);
        setEditingUser(null);
        setUserForm(emptyUser);
      }}
      className="
        fixed inset-0 z-[100]
        flex items-center justify-center
        bg-black/40 p-4
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
          y: 15,
        }}
        transition={{
          duration: 0.25,
        }}
        onClick={(e) => e.stopPropagation()}
        className="
          max-h-[90vh]
          w-full max-w-lg
          overflow-y-auto
          rounded-2xl
          bg-white
          p-5 sm:p-6
          shadow-2xl
        "
      >

        {/* Header */}
        <div className="flex items-center justify-between">

          <div>
            <h3 className="text-lg font-bold text-gray-900">
              {editingUser ? "Edit User" : "Add New User"}
            </h3>

            <p className="mt-1 text-xs text-gray-400">
              {editingUser
                ? "Update user information."
                : "Create a new user account."}
            </p>
          </div>

          <motion.button
            whileHover={{ rotate: 90 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => {
              setShowAddModal(false);
              setEditingUser(null);
              setUserForm(emptyUser);
            }}
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
          </motion.button>

        </div>

        {/* Form */}
        <div className="mt-6 space-y-4">

          {/* Name */}
          <div>
            <label className="mb-1.5 block text-xs font-semibold text-gray-600">
              Full Name
            </label>

            <input
              type="text"
              value={userForm.name}
              onChange={(e) =>
                setUserForm({
                  ...userForm,
                  name: e.target.value,
                })
              }
              placeholder="Enter full name"
              className="
                h-11 w-full
                rounded-xl
                border border-gray-200
                bg-gray-50
                px-4
                text-sm text-gray-700
                outline-none
                transition
                focus:border-green-500
                focus:bg-white
                focus:ring-4
                focus:ring-green-50
              "
            />
          </div>

          {/* Email */}
          <div>
            <label className="mb-1.5 block text-xs font-semibold text-gray-600">
              Email
            </label>

            <input
              type="email"
              value={userForm.email}
              onChange={(e) =>
                setUserForm({
                  ...userForm,
                  email: e.target.value,
                })
              }
              placeholder="Enter email address"
              className="
                h-11 w-full
                rounded-xl
                border border-gray-200
                bg-gray-50
                px-4
                text-sm text-gray-700
                outline-none
                transition
                focus:border-green-500
                focus:bg-white
                focus:ring-4
                focus:ring-green-50
              "
            />
          </div>

          {/* Phone + Location */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">

            <div>
              <label className="mb-1.5 block text-xs font-semibold text-gray-600">
                Phone
              </label>

              <input
                type="text"
                value={userForm.phone}
                onChange={(e) =>
                  setUserForm({
                    ...userForm,
                    phone: e.target.value,
                  })
                }
                placeholder="+880..."
                className="
                  h-11 w-full
                  rounded-xl
                  border border-gray-200
                  bg-gray-50
                  px-4
                  text-sm text-gray-700
                  outline-none
                  transition
                  focus:border-green-500
                  focus:bg-white
                  focus:ring-4
                  focus:ring-green-50
                "
              />
            </div>

            <div>
              <label className="mb-1.5 block text-xs font-semibold text-gray-600">
                Location
              </label>

              <input
                type="text"
                value={userForm.location}
                onChange={(e) =>
                  setUserForm({
                    ...userForm,
                    location: e.target.value,
                  })
                }
                placeholder="Sylhet, Bangladesh"
                className="
                  h-11 w-full
                  rounded-xl
                  border border-gray-200
                  bg-gray-50
                  px-4
                  text-sm text-gray-700
                  outline-none
                  transition
                  focus:border-green-500
                  focus:bg-white
                  focus:ring-4
                  focus:ring-green-50
                "
              />
            </div>

          </div>

          {/* Joined + Trips */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">

            <div>
              <label className="mb-1.5 block text-xs font-semibold text-gray-600">
                Joined Date
              </label>

              <input
                type="text"
                value={userForm.joined}
                onChange={(e) =>
                  setUserForm({
                    ...userForm,
                    joined: e.target.value,
                  })
                }
                placeholder="Aug 25, 2026"
                className="
                  h-11 w-full
                  rounded-xl
                  border border-gray-200
                  bg-gray-50
                  px-4
                  text-sm text-gray-700
                  outline-none
                  transition
                  focus:border-green-500
                  focus:bg-white
                  focus:ring-4
                  focus:ring-green-50
                "
              />
            </div>

            <div>
              <label className="mb-1.5 block text-xs font-semibold text-gray-600">
                Total Trips
              </label>

              <input
                type="number"
                min="0"
                value={userForm.trips}
                onChange={(e) =>
                  setUserForm({
                    ...userForm,
                    trips: e.target.value,
                  })
                }
                className="
                  h-11 w-full
                  rounded-xl
                  border border-gray-200
                  bg-gray-50
                  px-4
                  text-sm text-gray-700
                  outline-none
                  transition
                  focus:border-green-500
                  focus:bg-white
                  focus:ring-4
                  focus:ring-green-50
                "
              />
            </div>

          </div>

          {/* Status */}
          <div>
            <label className="mb-1.5 block text-xs font-semibold text-gray-600">
              Status
            </label>

            <select
              value={userForm.status}
              onChange={(e) =>
                setUserForm({
                  ...userForm,
                  status: e.target.value,
                })
              }
              className="
                h-11 w-full
                cursor-pointer
                rounded-xl
                border border-gray-200
                bg-gray-50
                px-4
                text-sm text-gray-700
                outline-none
                transition
                focus:border-green-500
                focus:bg-white
                focus:ring-4
                focus:ring-green-50
              "
            >
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>

        </div>

        {/* Buttons */}
        <div className="mt-6 flex gap-3">

          <motion.button
            whileTap={{ scale: 0.96 }}
            onClick={() => {
              setShowAddModal(false);
              setEditingUser(null);
              setUserForm(emptyUser);
            }}
            className="
              flex-1
              cursor-pointer
              rounded-xl
              border border-gray-200
              py-2.5
              text-sm font-semibold
              text-gray-600
              transition-colors
              hover:bg-gray-50
            "
          >
            Cancel
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.96 }}
            onClick={
              editingUser
                ? handleEditUser
                : handleAddUser
            }
            disabled={!userForm.name || !userForm.email}
            className="
              flex-1
              cursor-pointer
              rounded-xl
              bg-green-600
              py-2.5
              text-sm font-semibold
              text-white
              transition-colors
              hover:bg-green-700
              disabled:cursor-not-allowed
              disabled:opacity-50
            "
          >
            {editingUser ? "Save Changes" : "Add User"}
          </motion.button>

        </div>

      </motion.div>
    </motion.div>
  )}
</AnimatePresence>

      {/* =========================================
          DELETE MODAL
      ========================================= */}

      <AnimatePresence>
        {deleteUser && (

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
              setDeleteUser(null)
            }
            className="
              fixed inset-0
              z-[100]
              flex items-center
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
              transition={{
                duration: 0.25,
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

              {/* Delete Icon */}
              <motion.div
                initial={{
                  scale: 0.5,
                  rotate: -10,
                }}
                animate={{
                  scale: 1,
                  rotate: 0,
                }}
                className="
                  mx-auto
                  flex h-14 w-14
                  items-center
                  justify-center
                  rounded-full
                  bg-red-50
                  text-red-500
                "
              >
                <Trash2 size={24} />
              </motion.div>

              <h3 className="
                mt-4
                text-lg
                font-bold
                text-gray-900
              ">
                Delete User?
              </h3>

              <p className="
                mt-2
                text-sm
                leading-6
                text-gray-500
              ">
                Are you sure you want to delete{" "}
                <span className="
                  font-semibold
                  text-gray-700
                ">
                  {deleteUser.name}
                </span>
                ? This action cannot be undone.
              </p>

              <div className="
                mt-6
                flex gap-3
              ">

                <motion.button
                  whileTap={{
                    scale: 0.96,
                  }}
                  onClick={() =>
                    setDeleteUser(null)
                  }
                  className="
                    flex-1
                    rounded-xl
                    border border-gray-200
                    py-2.5
                    text-sm
                    font-semibold
                    text-gray-600
                    transition-colors
                    hover:bg-gray-50
                  "
                >
                  Cancel
                </motion.button>

                <motion.button
                  whileHover={{
                    scale: 1.02,
                  }}
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
                    transition-colors
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