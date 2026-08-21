"use client";

import { authClient } from "@/lib/auth-client";
import { motion, useMotionValue, useReducedMotion, useSpring } from "framer-motion";
import {
  AlertCircle,
  ArrowLeft,
  Eye,
  EyeOff,
  LockKeyhole,
  Mail,
  MapPin,
  Plane,
  UserRound,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import {
  type ChangeEvent,
  type FormEvent,
  type MouseEvent,
  useState,
} from "react";

const revealEase = [0.22, 1, 0.36, 1] as const;

const navigationItems = [
  { label: "Explore", href: "/travel-categories" },
  { label: "Destinations", href: "/destinations" },
  { label: "Plan My Trip", href: "/plan-trip" },
  { label: "Reviews", href: "/reviews" },
  { label: "Inspiration", href: "/inspiration" },
  { label: "About", href: "/about" },
] as const;

const destinationCards = [
  {
    name: "Sajek Valley",
    note: "Cloud-kissed mountains",
    image: "/images/destinations/sajek.jpg",
    className: "right-[4%] top-[8%]",
  },
  {
    name: "Cox's Bazar",
    note: "World's longest sea beach",
    image: "/images/destinations/coxs-bazar.jpg",
    className: "left-[4%] top-[49%]",
  },
  {
    name: "Saint Martin",
    note: "Coral island paradise",
    image: "/images/destinations/saint-martin.jpg",
    className: "bottom-[5%] right-[4%]",
  },
] as const;

interface RegisterFormData {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
};

const initialFormData: RegisterFormData = {
  fullName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

export default function RegisterPage() {
  const prefersReducedMotion = useReducedMotion();
  const [formData, setFormData] =
    useState<RegisterFormData>(initialFormData);
  const [showPassword, setShowPassword] = useState(false);
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const rotateXValue = useMotionValue(0);
  const rotateYValue = useMotionValue(0);
  const rotateX = useSpring(rotateXValue, { stiffness: 120, damping: 18 });
  const rotateY = useSpring(rotateYValue, { stiffness: 120, damping: 18 });

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setFormData((current) => ({
      ...current,
      [name]: value,
    }));

    if (errorMessage) setErrorMessage("");
  };

  const handleMapMove = (event: MouseEvent<HTMLDivElement>) => {
    if (prefersReducedMotion) return;

    const bounds = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - bounds.left) / bounds.width - 0.5;
    const y = (event.clientY - bounds.top) / bounds.height - 0.5;

    rotateXValue.set(y * -4);
    rotateYValue.set(x * 5);
  };

  const resetMapTilt = () => {
    rotateXValue.set(0);
    rotateYValue.set(0);
  };

  const handleRegister = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const userData = Object.fromEntries(formData.entries()) as unknown as RegisterFormData;

    console.log("userData", userData);

    const { data, error } = await authClient.signUp.email({
      name: userData.fullName,
      email: userData.email,
      password: userData.password,
    });

    console.log("signup data", { data, error });
    console.log("signup data",  data);
   
    setErrorMessage("");

    // TODO: The backend developer will connect account registration here.
    // Available values: fullName, email, formData.password, and acceptTerms.
  };

  const handleGoogleRegister = () => {
    setErrorMessage("");

    // TODO: The backend developer will connect Google registration here.
  };

  return (
    <main className="min-h-screen overflow-hidden bg-[#FAF8F3] text-[#17211D] antialiased">
      <RegisterNavbar
        prefersReducedMotion={Boolean(prefersReducedMotion)}
      />

      <section className="mx-auto grid w-full max-w-[1500px] gap-5 px-4 pb-8 pt-[92px] sm:px-6 sm:pb-10 sm:pt-[104px] lg:min-h-screen lg:grid-cols-[0.88fr_1.28fr] lg:items-stretch lg:gap-6 lg:px-8 lg:pb-8 xl:px-10">
        <motion.div
          initial={prefersReducedMotion ? false : { opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: revealEase }}
          className="order-1 flex items-center"
        >
          <div className="w-full rounded-[24px] border border-[#DDE5E1] bg-white/[0.88] p-5 shadow-[0_22px_60px_rgba(23,51,42,0.10)] backdrop-blur-xl sm:rounded-[30px] sm:p-8 lg:p-9 xl:p-11">
            <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-[#087F5B] sm:text-[11px]">
              Begin your journey
            </p>

            <AnimatedBrand
              prefersReducedMotion={Boolean(prefersReducedMotion)}
            />

            <p className="mt-4 max-w-[480px] text-[13px] font-medium leading-6 text-[#66766F] sm:text-[14px]">
              Create your account to save destinations and start planning
              personalized journeys with AI.
            </p>

            <form
              className="mt-6"
              onSubmit={handleRegister}
              autoComplete="off"
              noValidate
            >
              <div>
                <label
                  htmlFor="register-name"
                  className="text-[12px] font-bold text-[#203C32] sm:text-[13px]"
                >
                  Full name
                </label>
                <div className="relative mt-2">
                  <UserRound
                    size={17}
                    aria-hidden="true"
                    className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[#7B8A84]"
                  />
                  <input
                    id="register-name"
                    name="fullName"
                    type="text"
                    value={formData.fullName}
                    onChange={handleChange}
                    autoComplete="off"
                    data-lpignore="true"
                    data-1p-ignore="true"
                    required
                    placeholder="Your full name"
                    className="h-[50px] w-full rounded-[14px] border border-[#D8E2DD] bg-[#FCFDFB] py-3 pl-11 pr-4 text-[13px] font-medium text-[#17211D] outline-none transition-all placeholder:text-[#9AA7A1] focus:border-[#087F5B]/60 focus:ring-4 focus:ring-[#087F5B]/10 sm:h-[52px] sm:text-[14px]"
                  />
                </div>
              </div>

              <div className="mt-4">
                <label
                  htmlFor="register-email"
                  className="text-[12px] font-bold text-[#203C32] sm:text-[13px]"
                >
                  Email address
                </label>
                <div className="relative mt-2">
                  <Mail
                    size={17}
                    aria-hidden="true"
                    className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[#7B8A84]"
                  />
                  <input
                    id="register-email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    autoComplete="off"
                    data-lpignore="true"
                    data-1p-ignore="true"
                    required
                    placeholder="you@example.com"
                    className="h-[50px] w-full rounded-[14px] border border-[#D8E2DD] bg-[#FCFDFB] py-3 pl-11 pr-4 text-[13px] font-medium text-[#17211D] outline-none transition-all placeholder:text-[#9AA7A1] focus:border-[#087F5B]/60 focus:ring-4 focus:ring-[#087F5B]/10 sm:h-[52px] sm:text-[14px]"
                  />
                </div>
              </div>

              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="register-password"
                    className="text-[12px] font-bold text-[#203C32] sm:text-[13px]"
                  >
                    Password
                  </label>
                  <div className="relative mt-2">
                    <LockKeyhole
                      size={17}
                      aria-hidden="true"
                      className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[#7B8A84]"
                    />
                    <input
                      id="register-password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      value={formData.password}
                      onChange={handleChange}
                      autoComplete="new-password"
                      data-lpignore="true"
                      data-1p-ignore="true"
                      required
                      placeholder="Create password"
                      className="h-[50px] w-full rounded-[14px] border border-[#D8E2DD] bg-[#FCFDFB] py-3 pl-11 pr-11 text-[12px] font-medium text-[#17211D] outline-none transition-all placeholder:text-[#9AA7A1] focus:border-[#087F5B]/60 focus:ring-4 focus:ring-[#087F5B]/10 sm:h-[52px] sm:text-[13px]"
                    />
                    <button
                      type="button"
                      onClick={() =>
                        setShowPassword((current) => !current)
                      }
                      aria-label={
                        showPassword ? "Hide passwords" : "Show passwords"
                      }
                      className="absolute right-1.5 top-1/2 grid h-9 w-9 -translate-y-1/2 place-items-center rounded-xl text-[#74827C] transition-colors hover:bg-[#EDF7F3] hover:text-[#087F5B] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#087F5B]/35"
                    >
                      {showPassword ? (
                        <EyeOff size={16} />
                      ) : (
                        <Eye size={16} />
                      )}
                    </button>
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="register-confirm-password"
                    className="text-[12px] font-bold text-[#203C32] sm:text-[13px]"
                  >
                    Confirm password
                  </label>
                  <div className="relative mt-2">
                    <LockKeyhole
                      size={17}
                      aria-hidden="true"
                      className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[#7B8A84]"
                    />
                    <input
                      id="register-confirm-password"
                      name="confirmPassword"
                      type={showPassword ? "text" : "password"}
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      autoComplete="new-password"
                      data-lpignore="true"
                      data-1p-ignore="true"
                      required
                      placeholder="Repeat password"
                      className="h-[50px] w-full rounded-[14px] border border-[#D8E2DD] bg-[#FCFDFB] py-3 pl-11 pr-4 text-[12px] font-medium text-[#17211D] outline-none transition-all placeholder:text-[#9AA7A1] focus:border-[#087F5B]/60 focus:ring-4 focus:ring-[#087F5B]/10 sm:h-[52px] sm:text-[13px]"
                    />
                  </div>
                </div>
              </div>

              <label className="mt-4 flex cursor-pointer items-start gap-2 text-[10px] font-medium leading-5 text-[#5F7069] sm:text-[11px]">
                <input
                  type="checkbox"
                  checked={acceptTerms}
                  onChange={(event) => setAcceptTerms(event.target.checked)}
                  className="mt-0.5 h-4 w-4 shrink-0 rounded border-[#C9D6D0] accent-[#F4A934]"
                />
                <span>
                  I agree to the Terms and Privacy Policy.
                </span>
              </label>

              {errorMessage && (
                <motion.div
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  role="alert"
                  className="mt-4 flex items-start gap-2 rounded-[14px] border border-rose-200 bg-rose-50 p-3 text-[12px] font-medium leading-5 text-rose-700"
                >
                  <AlertCircle size={17} className="mt-0.5 shrink-0" />
                  <span>{errorMessage}</span>
                </motion.div>
              )}

              <motion.button
                whileHover={
                  prefersReducedMotion
                    ? undefined
                    : { scale: 1.01, y: -1 }
                }
                whileTap={{ scale: 0.985 }}
                type="submit"
                className="mt-5 flex h-[52px] w-full items-center justify-center gap-2 rounded-[14px] border border-[#FFD078]/60 bg-gradient-to-r from-[#F4A934] via-[#F6AC32] to-[#E89022] px-5 text-[13px] font-bold text-white shadow-[0_10px_26px_rgba(232,144,34,0.27),inset_0_1px_0_rgba(255,255,255,0.35)] transition-[filter,box-shadow] hover:brightness-105 hover:shadow-[0_13px_30px_rgba(232,144,34,0.34)] sm:h-14 sm:text-[14px]"
              >
                <Plane size={17} fill="currentColor" />
                Create My Account
              </motion.button>
            </form>

            <div className="my-4 flex items-center gap-3">
              <span className="h-px flex-1 bg-[#E2E8E5]" />
              <span className="text-[10px] font-medium text-[#89958F] sm:text-[11px]">
                or continue with
              </span>
              <span className="h-px flex-1 bg-[#E2E8E5]" />
            </div>

            <motion.button
              whileTap={{ scale: 0.985 }}
              type="button"
              onClick={handleGoogleRegister}
              className="flex h-[50px] w-full items-center justify-center gap-2.5 rounded-[14px] border border-[#D8E2DD] bg-white text-[12px] font-bold text-[#203C32] shadow-sm transition-colors hover:border-[#B7CEC4] hover:bg-[#FBFCFA] sm:h-[52px] sm:text-[13px]"
            >
              <span className="grid h-5 w-5 place-items-center rounded-full bg-gradient-to-br from-[#4285F4] via-[#34A853] to-[#EA4335] text-[10px] font-black text-white">
                G
              </span>
              Continue with Google
            </motion.button>

            <p className="mt-4 text-center text-[11px] font-medium text-[#6E7D77] sm:text-[12px]">
              Already have an account?{" "}
              <Link
                href="/login"
                className="font-bold text-[#087F5B] transition-colors hover:text-[#065F46] hover:underline"
              >
                Sign in
              </Link>
            </p>
          </div>
        </motion.div>

        <motion.div
          initial={prefersReducedMotion ? false : { opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.12, ease: revealEase }}
          className="order-2 min-h-[390px] [perspective:1200px] sm:min-h-[520px] lg:min-h-0"
          onMouseMove={handleMapMove}
          onMouseLeave={resetMapTilt}
        >
          <motion.div
            style={{
              rotateX: prefersReducedMotion ? 0 : rotateX,
              rotateY: prefersReducedMotion ? 0 : rotateY,
              transformStyle: "preserve-3d",
            }}
            className="relative h-full min-h-[390px] overflow-hidden rounded-[24px] border border-[#DCE6E1] bg-[#E9E8D9] shadow-[0_24px_60px_rgba(23,51,42,0.14)] sm:min-h-[520px] sm:rounded-[30px] lg:min-h-[700px]"
          >
            <Image
              src="/images/login/bangladesh-3d-route-map.png"
              alt="Three-dimensional travel map of Bangladesh"
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 60vw"
              className="object-cover"
            />

            <div className="absolute inset-0 bg-gradient-to-b from-white/[0.08] via-transparent to-[#071A16]/[0.12]" />
            <div className="absolute left-5 top-5 rounded-full border border-white/60 bg-white/[0.76] px-3 py-1.5 text-[9px] font-bold uppercase tracking-[0.18em] text-[#087F5B] shadow-sm backdrop-blur-xl sm:left-7 sm:top-7 sm:text-[10px]">
              Your adventure starts here
            </div>

            <svg
              aria-hidden="true"
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
              className="pointer-events-none absolute inset-0 h-full w-full"
            >
              <motion.path
                d="M 67 23 C 55 33, 64 43, 52 56 C 42 66, 52 73, 47 84"
                fill="none"
                stroke="rgba(255,255,255,0.88)"
                strokeWidth="0.55"
                strokeDasharray="1.4 1.8"
                initial={prefersReducedMotion ? false : { pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{
                  duration: 2.4,
                  delay: 0.55,
                  ease: revealEase,
                }}
                vectorEffect="non-scaling-stroke"
              />
              <motion.path
                d="M 67 23 C 55 33, 64 43, 52 56 C 42 66, 52 73, 47 84"
                fill="none"
                stroke="#087F5B"
                strokeWidth="1.25"
                initial={prefersReducedMotion ? false : { pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{
                  duration: 2.2,
                  delay: 0.35,
                  ease: revealEase,
                }}
                vectorEffect="non-scaling-stroke"
              />
            </svg>

            <motion.div
              aria-hidden="true"
              className="absolute z-20 text-white drop-shadow-[0_3px_8px_rgba(7,26,22,0.35)]"
              initial={{ left: "65%", top: "24%", opacity: 0 }}
              animate={
                prefersReducedMotion
                  ? { left: "52%", top: "54%", opacity: 1 }
                  : {
                    left: ["65%", "55%", "51%", "47%"],
                    top: ["24%", "39%", "58%", "81%"],
                    rotate: [145, 168, 152, 160],
                    opacity: [0, 1, 1, 1],
                  }
              }
              transition={{
                duration: 8,
                delay: 1.1,
                ease: "easeInOut",
                repeat: prefersReducedMotion ? 0 : Infinity,
                repeatDelay: 1.2,
              }}
            >
              <Plane size={21} fill="currentColor" strokeWidth={1.5} />
            </motion.div>

            <MapMarker
              label="Sajek Valley"
              className="left-[64%] top-[20%]"
              delay={0.55}
            />
            <MapMarker
              label="Cox's Bazar"
              className="left-[49%] top-[52%]"
              delay={0.75}
            />
            <MapMarker
              label="Saint Martin"
              className="bottom-[11%] left-[44%]"
              delay={0.95}
            />

            <div className="block">
              {destinationCards.map((destination, index) => (
                <motion.article
                  key={destination.name}
                  initial={
                    prefersReducedMotion
                      ? false
                      : {
                        opacity: 0,
                        y: 18,
                        rotate: index === 1 ? -2 : 2,
                      }
                  }
                  animate={{ opacity: 1, y: 0, rotate: 0 }}
                  transition={{
                    duration: 0.65,
                    delay: 0.85 + index * 0.14,
                    ease: revealEase,
                  }}
                  whileHover={
                    prefersReducedMotion
                      ? undefined
                      : {
                        scale: 1.035,
                        rotateY: index % 2 ? -4 : 4,
                      }
                  }
                  style={{ transformStyle: "preserve-3d" }}
                  className={`absolute z-30 w-[118px] overflow-hidden rounded-[14px] border border-white/75 bg-[#071A16]/[0.88] p-1 text-white shadow-[0_16px_35px_rgba(7,26,22,0.24)] backdrop-blur-lg sm:w-[150px] sm:rounded-[17px] sm:p-1.5 xl:w-[170px] ${destination.className}`}
                >
                  <div className="relative h-[62px] overflow-hidden rounded-[10px] sm:h-[82px] sm:rounded-[12px] xl:h-[96px]">
                    <Image
                      src={destination.image}
                      alt=""
                      fill
                      sizes="(max-width: 639px) 118px, 170px"
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/55 to-transparent" />
                  </div>
                  <div className="px-1 pb-1 pt-1.5 sm:px-1.5 sm:pb-1.5 sm:pt-2">
                    <h2 className="text-[9px] font-bold sm:text-[11px] xl:text-[12px]">
                      {destination.name}
                    </h2>
                    <p className="mt-0.5 text-[7px] text-white/[0.68] sm:text-[8px] xl:text-[9px]">
                      {destination.note}
                    </p>
                  </div>
                </motion.article>
              ))}
            </div>

            <div className="pointer-events-none absolute inset-0 rounded-[inherit] ring-1 ring-inset ring-white/45" />
          </motion.div>
        </motion.div>
      </section>
    </main>
  );
}

function AnimatedBrand({
  prefersReducedMotion,
}: {
  prefersReducedMotion: boolean;
}) {
  return (
    <motion.div
      initial={
        prefersReducedMotion
          ? false
          : { opacity: 0, y: 12, scale: 0.96 }
      }
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.6, delay: 0.32, ease: revealEase }}
      className="mt-4"
    >
      <Link
        href="/"
        aria-label="TripPlan AI Home"
        className="group inline-flex items-center gap-3"
      >
        <motion.div
          animate={
            prefersReducedMotion
              ? undefined
              : {
                rotateX: [0, -8, 0, 7, 0],
                rotateY: [0, 12, 0, -10, 0],
                scale: [1, 1.045, 1, 1.025, 1],
                boxShadow: [
                  "0 9px 24px rgba(217,134,31,0.30), inset 0 1px 0 rgba(255,255,255,0.45)",
                  "0 14px 34px rgba(217,134,31,0.48), inset 0 1px 0 rgba(255,255,255,0.55)",
                  "0 9px 24px rgba(217,134,31,0.30), inset 0 1px 0 rgba(255,255,255,0.45)",
                ],
              }
          }
          transition={{
            duration: 5.5,
            ease: "easeInOut",
            repeat: prefersReducedMotion ? 0 : Infinity,
          }}
          whileHover={
            prefersReducedMotion
              ? undefined
              : { y: -4, scale: 1.08, rotateZ: -5 }
          }
          style={{ transformStyle: "preserve-3d" }}
          className="relative flex h-[52px] w-[52px] items-center justify-center rounded-full bg-gradient-to-br from-[#FFD16F] via-[#F4A934] to-[#D9861F] shadow-[0_9px_24px_rgba(217,134,31,0.30),inset_0_1px_0_rgba(255,255,255,0.45)] sm:h-[58px] sm:w-[58px]"
        >
          <span className="pointer-events-none absolute inset-[4px] rounded-full border border-[#FFF0C2]/70" />
          <Plane
            size={27}
            strokeWidth={2.3}
            className="relative rotate-[-45deg] text-[#123B31] transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
          />
        </motion.div>

        <motion.span
          initial={prefersReducedMotion ? false : { opacity: 0, x: -12 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.65, delay: 0.48, ease: revealEase }}
          className="text-[28px] font-extrabold leading-none tracking-[-0.04em] text-[#17332A] transition-colors duration-300 group-hover:text-[#087F5B] sm:text-[34px]"
        >
          TripPlan <span className="text-[#D88928]">AI</span>
        </motion.span>
      </Link>
    </motion.div>
  );
}

function RegisterNavbar({
  prefersReducedMotion,
}: {
  prefersReducedMotion: boolean;
}) {
  return (
    <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-5 lg:px-7">
      <motion.nav
        initial={
          prefersReducedMotion
            ? false
            : { opacity: 0, y: -22, scale: 0.985 }
        }
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.65, ease: revealEase }}
        className="mx-auto flex h-[64px] w-full max-w-[1420px] items-center rounded-[22px] border border-white/75 bg-white/[0.78] px-3 shadow-[0_14px_40px_rgba(7,26,22,0.12),inset_0_1px_0_rgba(255,255,255,0.92)] backdrop-blur-2xl sm:rounded-full sm:px-5 lg:px-7"
      >
        <Link
          href="/"
          aria-label="TripPlan AI Home"
          className="group z-20 flex shrink-0 items-center"
        >
          <div className="flex items-center gap-2.5">
            <div className="relative flex h-[38px] w-[38px] items-center justify-center rounded-full bg-gradient-to-br from-[#FFD16F] via-[#F4A934] to-[#D9861F] shadow-[0_7px_18px_rgba(217,134,31,0.30),inset_0_1px_0_rgba(255,255,255,0.45)] transition-all duration-300 group-hover:-translate-y-0.5 group-hover:rotate-[-5deg] group-hover:shadow-[0_10px_24px_rgba(217,134,31,0.38)]">
              <span className="pointer-events-none absolute inset-[3px] rounded-full border border-[#FFF0C2]/70" />
              <Plane
                size={20}
                strokeWidth={2.3}
                className="relative rotate-[-45deg] text-[#123B31] transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </div>

            <span className="text-[18px] font-extrabold leading-none tracking-[-0.035em] text-[#17332A] transition-colors duration-300 group-hover:text-[#087F5B] sm:text-[20px]">
              TripPlan <span className="text-[#D88928]">AI</span>
            </span>
          </div>
        </Link>

        <div className="absolute left-1/2 hidden -translate-x-1/2 items-center lg:flex">
          {navigationItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="px-3.5 text-[13px] font-semibold tracking-[-0.01em] text-[#30483F] transition-colors hover:text-[#B86D1B] xl:px-4 xl:text-[14px]"
            >
              {item.label}
            </Link>
          ))}
        </div>

        <Link
          href="/"
          className="ml-auto inline-flex h-10 items-center gap-2 rounded-full px-3 text-[12px] font-bold text-[#40554D] transition-colors hover:bg-white hover:text-[#087F5B] sm:px-4 sm:text-[13px]"
        >
          <ArrowLeft size={15} />
          <span className="hidden sm:inline">Back to Home</span>
          <span className="sm:hidden">Home</span>
        </Link>
      </motion.nav>
    </header>
  );
}

function MapMarker({
  label,
  className,
  delay,
}: {
  label: string;
  className: string;
  delay: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12, scale: 0.85 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.55, delay, ease: revealEase }}
      className={`absolute z-20 flex items-center gap-1.5 ${className}`}
    >
      <span className="relative grid h-9 w-9 place-items-center rounded-full border border-[#FFE2A0] bg-gradient-to-br from-[#FFC44F] to-[#E99123] text-[#17332A] shadow-[0_8px_18px_rgba(217,134,31,0.30)] sm:h-10 sm:w-10">
        <span className="absolute inset-0 animate-ping rounded-full bg-[#F4A934]/[0.22]" />
        <MapPin size={18} fill="currentColor" className="relative" />
      </span>
      <span className="hidden rounded-full border border-white/70 bg-white/[0.88] px-2.5 py-1 text-[9px] font-bold text-[#17332A] shadow-sm backdrop-blur-md xl:block">
        {label}
      </span>
    </motion.div>
  );
}