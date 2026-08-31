"use client";

import { Map, Plus, Tags } from "lucide-react";

export default function ModeratorDashboard() {
  return (
    <div className="min-h-screen bg-[#F5F8F6] p-6 md:p-8 pt-24 md:pt-24">
      
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-[#17211D] md:text-3xl">
          Moderator Dashboard
        </h1>

        <p className="mt-2 text-sm text-[#607169]">
          Manage TripPlan AI travel content from here.
        </p>
      </div>

      {/* Stats */}
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">

        {/* Travel Categories */}
        <div className="rounded-2xl border border-[#DCE9E3] bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-[#607169]">
                Travel Categories
              </p>

              <h2 className="mt-2 text-3xl font-semibold text-[#17211D]">
                6
              </h2>
            </div>

            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#E3F6EE] text-[#087F5B]">
              <Tags size={24} />
            </div>
          </div>
        </div>

        {/* Total Destinations */}
        <div className="rounded-2xl border border-[#DCE9E3] bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-[#607169]">
                Total Destinations
              </p>

              <h2 className="mt-2 text-3xl font-semibold text-[#17211D]">
                105
              </h2>
            </div>

            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#FFF0D0] text-[#C87920]">
              <Map size={24} />
            </div>
          </div>
        </div>

        {/* Quick Action */}
        <div className="rounded-2xl border border-[#DCE9E3] bg-white p-6 shadow-sm">
          <p className="text-sm font-medium text-[#607169]">
            Quick Action
          </p>

          <button
            type="button"
            className="mt-4 inline-flex items-center gap-2 rounded-xl bg-[#087F5B] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#066B4C]"
          >
            <Plus size={18} />
            Add New Post
          </button>
        </div>

      </div>

      {/* Welcome Section */}
      <div className="mt-8 rounded-2xl border border-[#DCE9E3] bg-white p-6 shadow-sm">
        <h2 className="text-xl font-semibold text-[#17211D]">
          Welcome to Moderator Panel
        </h2>

        <p className="mt-2 max-w-2xl text-sm leading-6 text-[#607169]">
          From the moderator panel, you will be able to manage TripPlan AI
          travel categories, add new posts, edit existing content, and delete
          outdated posts.
        </p>
      </div>

    </div>
  );
}