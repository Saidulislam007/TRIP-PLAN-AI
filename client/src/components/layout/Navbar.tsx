"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, Heart, Menu, Plane, Search, X } from "lucide-react";
import { useEffect, useState } from "react";

/* ============================================================
   TYPES
============================================================ */

type NavItemProps = {
  href: string;
  label: string;
  active?: boolean;
};

type DropdownItem = {
  label: string;
  href: string;
};

/* ============================================================
   DROPDOWN DATA
============================================================ */

const exploreItems: DropdownItem[] = [
  {
    label: "Travel Categories",
    href: "/travel-categories",
  },
  {
    label: "Hotels",
    href: "/hotels",
  },
  {
    label: "Food",
    href: "/food",
  },
];

const destinationItems: DropdownItem[] = [
  {
    label: "Popular Destinations",
    href: "/destinations",
  },
];

const inspirationItems: DropdownItem[] = [
  {
    label: "Travel Guides",
    href: "/inspiration/guides",
  },
  {
    label: "Travel Stories",
    href: "/inspiration/stories",
  },
  {
    label: "Travel Tips",
    href: "/inspiration/tips",
  },
];

/* ============================================================
   NAVBAR
============================================================ */

export default function Navbar() {
  const pathname = usePathname();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [exploreOpen, setExploreOpen] = useState(false);
  const [destinationsOpen, setDestinationsOpen] = useState(false);
  const [inspirationOpen, setInspirationOpen] = useState(false);

  /* ============================================================
     ACTIVE ROUTES
  ============================================================ */

  const isDestinationsActive =
    pathname === "/destinations" || pathname.startsWith("/destinations/");

  const isPlanTripActive =
    pathname === "/plan-trip" || pathname.startsWith("/plan-trip/");

  const isReviewsActive =
    pathname === "/reviews" || pathname.startsWith("/reviews/");

  const isInspirationActive =
    pathname === "/inspiration" || pathname.startsWith("/inspiration/");

  const isExploreActive = exploreItems.some(
    (item) => pathname === item.href || pathname.startsWith(`${item.href}/`),
  );

  const isSearchActive =
    pathname === "/search" || pathname.startsWith("/search/");

  const isWishlistActive =
    pathname === "/wishlist" || pathname.startsWith("/wishlist/");

  /* ============================================================
     CLOSE MENUS WHEN ROUTE CHANGES
  ============================================================ */

  useEffect(() => {
    setMobileMenuOpen(false);
    setExploreOpen(false);
    setDestinationsOpen(false);
    setInspirationOpen(false);
  }, [pathname]);

  return (
    <header className="fixed inset-x-0 top-0 z-50 w-full bg-transparent px-3 pt-2 font-sans antialiased sm:px-5 sm:pt-3">
      {/* ========================================================
          MAIN NAVBAR
      ======================================================== */}

      <motion.nav
        initial={{ opacity: 0, y: -22, scale: 0.985 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
        className="mx-auto h-[64px] w-full max-w-[1420px] rounded-[22px] border border-white/65 bg-white/[0.74] shadow-[0_14px_40px_rgba(7,26,22,0.14),0_3px_10px_rgba(7,26,22,0.06),inset_0_1px_0_rgba(255,255,255,0.88)] backdrop-blur-2xl sm:rounded-full"
      >
        <div className="relative mx-auto flex h-full w-full items-center px-3 sm:px-5 lg:px-7">
          {/* ====================================================
              LOGO
          ==================================================== */}

          <Link
            href="/"
            aria-label="TripPlan AI Home"
            className="group z-20 flex shrink-0 items-center"
          >
            <div className="flex items-center gap-2.5">
              {/* Logo */}

              <div className="relative flex h-[38px] w-[38px] items-center justify-center rounded-full bg-gradient-to-br from-[#FFD16F] via-[#F4A934] to-[#D9861F] shadow-[0_7px_18px_rgba(217,134,31,0.30),inset_0_1px_0_rgba(255,255,255,0.45)] transition-all duration-300 group-hover:-translate-y-0.5 group-hover:rotate-[-5deg] group-hover:shadow-[0_10px_24px_rgba(217,134,31,0.38)]">
                <span className="pointer-events-none absolute inset-[3px] rounded-full border border-[#FFF0C2]/70" />

                <Plane
                  size={20}
                  strokeWidth={2.3}
                  className="relative rotate-[-45deg] text-[#123B31] transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </div>

              {/* Logo text */}

              <span className="text-[18px] font-extrabold leading-none tracking-[-0.035em] text-[#17332A] transition-colors duration-300 group-hover:text-[#087F5B] sm:text-[20px]">
                TripPlan <span className="text-[#D88928]">AI</span>
              </span>
            </div>
          </Link>

          {/* ====================================================
              CENTERED DESKTOP NAVIGATION

              IMPORTANT:
              This is absolutely centered in the navbar.
          ==================================================== */}

          <div className="absolute left-1/2 top-0 hidden h-full -translate-x-1/2 items-center lg:flex">
            {/* ==================================================
                EXPLORE
            ================================================== */}

            <div className="relative flex h-full items-center">
              <button
                type="button"
                aria-expanded={exploreOpen}
                onClick={() => {
                  setExploreOpen((prev) => !prev);
                  setDestinationsOpen(false);
                  setInspirationOpen(false);
                }}
                className={`
                  relative flex h-full items-center
                  px-[14px]
                  text-[14px]
                  font-medium
                  tracking-[-0.01em]
                  transition-colors duration-200
                  ${
                    isExploreActive || exploreOpen
                      ? "text-[#087F5B]"
                      : "text-[#30483F] hover:text-[#B86D1B]"
                  }
                `}
              >
                <span className="flex items-center gap-[5px]">
                  Explore
                  <ChevronDown
                    size={12}
                    strokeWidth={2}
                    className={`
                      transition-transform duration-200
                      ${exploreOpen ? "rotate-180" : ""}
                    `}
                  />
                </span>

                {/* Active underline */}

                {(isExploreActive || exploreOpen) && (
                  <span className="absolute bottom-[17px] left-[14px] right-[14px] h-[2px] rounded-full bg-[#F4A934]" />
                )}
              </button>

              {exploreOpen && (
                <Dropdown
                  items={exploreItems}
                  pathname={pathname}
                  onClose={() => setExploreOpen(false)}
                />
              )}
            </div>

            {/* ==================================================
                DESTINATIONS
            ================================================== */}

            <NavItem
              href="/destinations"
              label="Destinations"
              active={isDestinationsActive}
            />

            {/* ==================================================
                PLAN MY TRIP
            ================================================== */}

            <NavItem
              href="/plan-trip"
              label="Plan My Trip"
              active={isPlanTripActive}
            />

            {/* ==================================================
                REVIEWS
            ================================================== */}

            <NavItem href="/reviews" label="Reviews" active={isReviewsActive} />

            {/* ==================================================
                INSPIRATION
            ================================================== */}

            <div className="relative flex h-full items-center">
              <button
                type="button"
                aria-expanded={inspirationOpen}
                onClick={() => {
                  setInspirationOpen((prev) => !prev);
                  setExploreOpen(false);
                  setDestinationsOpen(false);
                }}
                className={`
                  relative flex h-full items-center
                  px-[14px]
                  text-[14px]
                  font-medium
                  tracking-[-0.01em]
                  transition-colors duration-200
                  ${
                    isInspirationActive || inspirationOpen
                      ? "text-[#087F5B]"
                      : "text-[#30483F] hover:text-[#B86D1B]"
                  }
                `}
              >
                <span className="flex items-center gap-[5px]">
                  Inspiration
                  <ChevronDown
                    size={12}
                    strokeWidth={2}
                    className={`
                      transition-transform duration-200
                      ${inspirationOpen ? "rotate-180" : ""}
                    `}
                  />
                </span>

                {/* Active underline */}

                {(isInspirationActive || inspirationOpen) && (
                  <span className="absolute bottom-[17px] left-[14px] right-[14px] h-[2px] rounded-full bg-[#F4A934]" />
                )}
              </button>

              {inspirationOpen && (
                <Dropdown
                  items={inspirationItems}
                  pathname={pathname}
                  onClose={() => setInspirationOpen(false)}
                />
              )}
            </div>

            <NavItem
              href="/about"
              label="About"
              active={pathname === "/about" || pathname.startsWith("/about/")}
            />
          </div>

          {/* ====================================================
              RIGHT SIDE ACTIONS

              These stay on the right.
          ==================================================== */}

          <div className="ml-auto hidden items-center lg:flex">
            {/* Search */}

            <Link
              href="/search"
              aria-label="Search"
              className={`
                flex h-[40px] w-[40px]
                items-center justify-center
                rounded-full
                transition-colors duration-200
                ${
                  isSearchActive
                    ? "bg-[#087F5B]/10 text-[#087F5B]"
                    : "text-[#476057] hover:bg-[#087F5B]/[0.07] hover:text-[#087F5B]"
                }
              `}
            >
              <Search size={21} strokeWidth={1.8} />
            </Link>

            {/* Wishlist */}

            <Link
              href="/wishlist"
              aria-label="Wishlist"
              className={`
                ml-1 flex h-[40px] w-[40px]
                items-center justify-center
                rounded-full
                transition-colors duration-200
                ${
                  isWishlistActive
                    ? "bg-[#087F5B]/10 text-[#087F5B]"
                    : "text-[#476057] hover:bg-[#087F5B]/[0.07] hover:text-[#087F5B]"
                }
              `}
            >
              <Heart size={21} strokeWidth={1.8} />
            </Link>

            {/* Login */}

            <Link
              href="/login"
              className="ml-4 flex h-[38px] items-center justify-center rounded-full border border-[#B9CEC5] bg-white/55 px-[17px] text-[14px] font-semibold tracking-[-0.01em] text-[#263D34] shadow-[inset_0_1px_0_rgba(255,255,255,0.75)] transition-all duration-200 hover:border-[#087F5B]/55 hover:bg-[#EDF7F3] hover:text-[#087F5B]"
            >
              Login
            </Link>

            {/* Get Started */}

            <Link
              href="/signup"
              className="ml-[9px] flex h-[38px] items-center justify-center rounded-full border border-[#FFD078]/55 bg-gradient-to-br from-[#FFC65A] via-[#F4A934] to-[#D9861F] px-[18px] text-[14px] font-semibold tracking-[-0.01em] text-[#17332A] shadow-[0_8px_22px_rgba(217,134,31,0.28),inset_0_1px_0_rgba(255,255,255,0.45)] transition-all duration-200 hover:-translate-y-0.5 hover:brightness-105 hover:shadow-[0_11px_28px_rgba(217,134,31,0.36)]"
            >
              Get Started
            </Link>
          </div>

          {/* ====================================================
              MOBILE ACTIONS
          ==================================================== */}

          <div className="ml-auto flex items-center gap-1 lg:hidden">
            <Link
              href="/search"
              aria-label="Search"
              className="flex h-9 w-9 items-center justify-center rounded-full text-[#385047] transition-colors hover:bg-[#087F5B]/10 hover:text-[#087F5B]"
            >
              <Search size={20} strokeWidth={1.8} />
            </Link>

            <button
              type="button"
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              className="flex h-9 w-9 items-center justify-center rounded-full text-[#385047] transition-colors hover:bg-[#087F5B]/10 hover:text-[#087F5B]"
            >
              {mobileMenuOpen ? <X size={21} /> : <Menu size={21} />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* ========================================================
          MOBILE MENU
      ======================================================== */}

      <AnimatePresence>
        {mobileMenuOpen && (
          <MobileMenu
            pathname={pathname}
            onClose={() => setMobileMenuOpen(false)}
          />
        )}
      </AnimatePresence>
    </header>
  );
}

/* ================================================================
   NORMAL NAV ITEM

   Text = 14px
   Underline = directly under text
================================================================ */

function NavItem({ href, label, active = false }: NavItemProps) {
  return (
    <Link
      href={href}
      className={`
        group relative flex h-full items-center
        px-[14px]
        text-[14px]
        font-medium
        tracking-[-0.01em]
        transition-colors duration-200
        ${active ? "text-[#087F5B]" : "text-[#30483F] hover:text-[#B86D1B]"}
      `}
    >
      <span className="relative">
        {label}

        {/* Underline directly under text */}

        <span
          className={`
            absolute
            -bottom-[6px]
            left-0
            right-0
            h-[2px]
            rounded-full
            bg-gradient-to-r from-[#087F5B] to-[#F4A934]
            transition-all duration-200
            ${
              active
                ? "scale-x-100 opacity-100"
                : "scale-x-0 opacity-0 group-hover:scale-x-100 group-hover:opacity-100"
            }
          `}
        />
      </span>
    </Link>
  );
}

/* ================================================================
   DROPDOWN
================================================================ */

function Dropdown({
  items,
  pathname,
  onClose,
}: {
  items: DropdownItem[];
  pathname: string;
  onClose: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -8, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
      className="absolute left-1/2 top-[57px] z-[100] w-[275px] -translate-x-1/2 rounded-2xl border border-white/80 bg-white/[0.94] p-2 shadow-[0_18px_45px_rgba(7,26,22,0.17),inset_0_1px_0_rgba(255,255,255,0.95)] backdrop-blur-2xl"
    >
      {/* Top accent */}

      <div className="absolute left-1/2 top-0 h-[2px] w-[40px] -translate-x-1/2 rounded-b-full bg-[#087F5B]" />

      <div className="pt-1">
        {items.map((item) => {
          const active =
            pathname === item.href || pathname.startsWith(`${item.href}/`);

          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={onClose}
              className={`
                flex items-center justify-between
                rounded-lg px-3 py-3
                text-[14px]
                font-medium
                tracking-[-0.005em]
                transition-colors
                ${
                  active
                    ? "bg-[#EDF7F3] text-[#087F5B]"
                    : "text-[#26342E] hover:bg-[#F4F8F6] hover:text-[#087F5B]"
                }
              `}
            >
              <span>{item.label}</span>

              {active && (
                <span className="h-[6px] w-[6px] rounded-full bg-[#087F5B]" />
              )}
            </Link>
          );
        })}
      </div>
    </motion.div>
  );
}

/* ================================================================
   MOBILE MENU
================================================================ */

function MobileMenu({
  pathname,
  onClose,
}: {
  pathname: string;
  onClose: () => void;
}) {
  const mobileItems = [
    {
      label: "Home",
      href: "/",
      active: pathname === "/",
    },
    {
      label: "Destinations",
      href: "/destinations",
      active:
        pathname === "/destinations" || pathname.startsWith("/destinations/"),
    },
    {
      label: "Plan My Trip",
      href: "/plan-trip",
      active: pathname === "/plan-trip" || pathname.startsWith("/plan-trip/"),
    },
    {
      label: "Reviews",
      href: "/reviews",
      active: pathname === "/reviews" || pathname.startsWith("/reviews/"),
    },
    {
      label: "Inspiration",
      href: "/inspiration",
      active:
        pathname === "/inspiration" || pathname.startsWith("/inspiration/"),
    },
    {
      label: "About",
      href: "/about",
      active: pathname === "/about" || pathname.startsWith("/about/"),
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: -12, scale: 0.985 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -10, scale: 0.985 }}
      transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
      className="mx-auto mt-2 w-full max-w-[1420px] overflow-hidden rounded-[22px] border border-white/80 bg-white/[0.94] px-4 pb-4 pt-3 shadow-[0_18px_45px_rgba(7,26,22,0.18),inset_0_1px_0_rgba(255,255,255,0.95)] backdrop-blur-2xl lg:hidden"
    >
      <div className="space-y-1">
        {mobileItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            onClick={onClose}
            className={`
              relative flex h-11 items-center
              rounded-lg px-4
              text-[15px]
              font-medium
              tracking-[-0.01em]
              ${
                item.active
                  ? "bg-[#087F5B]/10 text-[#087F5B]"
                  : "text-[#30483F] hover:bg-[#087F5B]/[0.07] hover:text-[#087F5B]"
              }
            `}
          >
            <span className="relative">
              {item.label}

              {item.active && (
                <span className="absolute -bottom-[5px] left-0 right-0 h-[2px] rounded-full bg-[#F4A934]" />
              )}
            </span>
          </Link>
        ))}
      </div>

      {/* Mobile buttons */}

      <div className="mt-4 grid grid-cols-2 gap-2 border-t border-[#DDE9E3] pt-4">
        <Link
          href="/login"
          onClick={onClose}
          className="flex h-10 items-center justify-center rounded-full border border-[#B9CEC5] bg-white/70 text-[14px] font-semibold tracking-[-0.01em] text-[#263D34] transition-colors hover:border-[#087F5B]/55 hover:bg-[#EDF7F3] hover:text-[#087F5B]"
        >
          Login
        </Link>

        <Link
          href="/signup"
          onClick={onClose}
          className="flex h-10 items-center justify-center rounded-full bg-gradient-to-br from-[#FFC65A] via-[#F4A934] to-[#D9861F] text-[14px] font-semibold tracking-[-0.01em] text-[#17332A] shadow-[0_7px_18px_rgba(217,134,31,0.25)]"
        >
          Get Started
        </Link>
      </div>
    </motion.div>
  );
}