"use client";

import { useEffect, useState } from "react";
import {
  Users,
  Map,
  MapPin,
  Star,
  ArrowUpRight,
  TrendingUp,
} from "lucide-react";

import DashboardChart from "@/components/admin-panel/DashboardChart";
import RecentActivity from "../../components/admin-panel/RecentlyActivity";

const stats = [
  {
    title: "Total Users",
    value: "1,248",
    change: "+12.5%",
    description: "from last month",
    icon: Users,
  },
  {
    title: "Total Trips",
    value: "356",
    change: "+8.2%",
    description: "from last month",
    icon: Map,
  },
  {
    title: "Destinations",
    value: "89",
    change: "+5.4%",
    description: "from last month",
    icon: MapPin,
  },
  {
    title: "Total Reviews",
    value: "642",
    change: "+10.8%",
    description: "from last month",
    icon: Star,
  },
];

export default function AdminPanelPage() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="p-4 sm:p-6 lg:p-8">

      {/* Welcome Section */}
      <div
        className={`mb-8 transform transition-all duration-700 ${
          visible
            ? "translate-y-0 opacity-100"
            : "translate-y-4 opacity-0"
        }`}
      >
        <div className="flex items-center gap-2">
          <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
            Welcome back, Admin
          </h1>

          <span className="animate-bounce text-xl">
            👋
          </span>
        </div>

        <p className="mt-1 text-sm text-gray-500">
          Here&apos;s what&apos;s happening with your travel
          platform today.
        </p>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat, index) => {
          const Icon = stat.icon;

          return (
            <div
              key={stat.title}
              className={`group transform rounded-2xl border border-gray-100 bg-white p-5 shadow-sm transition-all duration-700 hover:-translate-y-2 hover:border-green-100 hover:shadow-lg ${
                visible
                  ? "translate-y-0 opacity-100"
                  : "translate-y-8 opacity-0"
              }`}
              style={{
                transitionDelay: `${index * 120}ms`,
              }}
            >
              {/* Card Top */}
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">
                    {stat.title}
                  </p>

                  <h3 className="mt-2 text-2xl font-bold text-gray-900 sm:text-3xl">
                    {stat.value}
                  </h3>
                </div>

                {/* Icon */}
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-green-50 text-green-600 transition-all duration-300 group-hover:rotate-6 group-hover:bg-green-600 group-hover:text-white">
                  <Icon size={21} strokeWidth={2} />
                </div>
              </div>

              {/* Card Bottom */}
              <div className="mt-5 flex items-center gap-2">
                <span className="flex items-center gap-1 rounded-lg bg-green-50 px-2 py-1 text-xs font-semibold text-green-600">
                  <ArrowUpRight size={13} />
                  {stat.change}
                </span>

                <span className="text-xs text-gray-400">
                  {stat.description}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Analytics + Overview */}
      <div className="mt-6 grid grid-cols-1 gap-6 xl:grid-cols-3">

        {/* Trip Analytics */}
        <div
          className={`rounded-2xl border border-gray-100 bg-white p-5 shadow-sm transition-all duration-700 sm:p-6 xl:col-span-2 ${
            visible
              ? "translate-y-0 opacity-100"
              : "translate-y-8 opacity-0"
          }`}
          style={{
            transitionDelay: "550ms",
          }}
        >
          {/* Header */}
          <div className="mb-5 flex items-start justify-between">
            <div>
              <h2 className="text-lg font-bold text-gray-900">
                Trip Analytics
              </h2>

              <p className="mt-1 text-sm text-gray-500">
                Monthly trip creation overview
              </p>
            </div>

            <div className="flex items-center gap-2 rounded-lg bg-green-50 px-3 py-2">
              <TrendingUp
                size={16}
                className="text-green-600"
              />

              <span className="text-xs font-semibold text-green-600">
                +18.4%
              </span>
            </div>
          </div>

          {/* Chart */}
          <DashboardChart />
        </div>

        {/* Quick Overview */}
        <div
          className={`rounded-2xl border border-gray-100 bg-white p-5 shadow-sm transition-all duration-700 sm:p-6 ${
            visible
              ? "translate-y-0 opacity-100"
              : "translate-y-8 opacity-0"
          }`}
          style={{
            transitionDelay: "700ms",
          }}
        >
          <h2 className="text-lg font-bold text-gray-900">
            Quick Overview
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            Platform performance
          </p>

          <div className="mt-7 space-y-6">

            {/* Active Users */}
            <div>
              <div className="mb-2 flex justify-between">
                <span className="text-sm text-gray-600">
                  Active Users
                </span>

                <span className="text-sm font-semibold text-gray-900">
                  78%
                </span>
              </div>

              <div className="h-2 overflow-hidden rounded-full bg-gray-100">
                <div
                  className={`h-full rounded-full bg-green-600 transition-all duration-1000 ${
                    visible ? "w-[78%]" : "w-0"
                  }`}
                />
              </div>
            </div>

            {/* Completed Trips */}
            <div>
              <div className="mb-2 flex justify-between">
                <span className="text-sm text-gray-600">
                  Completed Trips
                </span>

                <span className="text-sm font-semibold text-gray-900">
                  64%
                </span>
              </div>

              <div className="h-2 overflow-hidden rounded-full bg-gray-100">
                <div
                  className={`h-full rounded-full bg-green-500 transition-all duration-1000 ${
                    visible ? "w-[64%]" : "w-0"
                  }`}
                  style={{
                    transitionDelay: "300ms",
                  }}
                />
              </div>
            </div>

            {/* User Satisfaction */}
            <div>
              <div className="mb-2 flex justify-between">
                <span className="text-sm text-gray-600">
                  User Satisfaction
                </span>

                <span className="text-sm font-semibold text-gray-900">
                  92%
                </span>
              </div>

              <div className="h-2 overflow-hidden rounded-full bg-gray-100">
                <div
                  className={`h-full rounded-full bg-green-600 transition-all duration-1000 ${
                    visible ? "w-[92%]" : "w-0"
                  }`}
                  style={{
                    transitionDelay: "500ms",
                  }}
                />
              </div>
            </div>

          </div>

          {/* Bottom Message */}
          <div className="mt-8 rounded-xl bg-green-50 p-4">
            <p className="text-sm font-semibold text-green-700">
              Great performance! 🎉
            </p>

            <p className="mt-1 text-xs leading-5 text-green-600">
              Your platform is growing steadily this month.
            </p>
          </div>
        </div>

      </div>

      <RecentActivity/>

    </div>
  );
}