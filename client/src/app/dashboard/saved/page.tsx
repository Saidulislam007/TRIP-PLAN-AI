
import { getBookmarksByUser } from "@/lib/api/bookmarks";
import { fetchCardDestinations } from "@/lib/api/destination";
import { getUserSession } from "@/lib/core/session";
import DestinationCard from "@/components/destinations/listings/DestinationCard";
import { DestinationData } from "@/data/destinations";

const BookMarkPage = async () => {
  const user = await getUserSession();

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F7F7F2]">
        <p className="text-gray-600">
          Please login to see your saved destinations.
        </p>
      </div>
    );
  }

  try {
    // Get user's saved bookmark records
    const bookmarkResponse = await getBookmarksByUser(user.id);

    // Get all destination cards
    const destinationResponse = await fetchCardDestinations();

    const bookmarks = Array.isArray(bookmarkResponse)
      ? bookmarkResponse
      : [];

    const destinations: DestinationData[] = destinationResponse?.data || [];

    // Get destination IDs from bookmarks
    const savedDestinationIds = bookmarks.map(
      (bookmark: { destinationId: string }) => bookmark.destinationId
    );

    // Match bookmarks with actual destination data
    const savedDestinations = destinations.filter((destination) =>
      savedDestinationIds.includes(destination.id)
    );

    console.log("Bookmarks:", bookmarks);
    console.log("Saved destinations:", savedDestinations);

    return (
      <div className="min-h-screen bg-[#F7F7F2]">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 py-10">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-[#0B1A16]">
              Saved Destinations
            </h1>

            <p className="mt-2 text-gray-600">
              Your favorite destinations are saved here.
            </p>
          </div>

          {/* No saved destinations */}
          {savedDestinations.length === 0 ? (
            <div className="min-h-[400px] flex flex-col items-center justify-center text-center bg-white rounded-2xl border border-gray-200">
              <div className="w-16 h-16 rounded-full bg-[#F4A62A]/10 flex items-center justify-center mb-5">
                <span className="text-3xl">♡</span>
              </div>

              <h2 className="text-xl font-semibold text-[#0B1A16]">
                No saved destinations yet
              </h2>

              <p className="text-gray-500 mt-2 max-w-md">
                Explore destinations and tap the heart icon to save your
                favorite places.
              </p>
            </div>
          ) : (
            <>
              {/* Result count */}
              <div className="mb-5">
                <p className="text-sm text-gray-600">
                  {savedDestinations.length}{" "}
                  {savedDestinations.length === 1
                    ? "destination"
                    : "destinations"}{" "}
                  saved
                </p>
              </div>

              {/* Saved destination cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {savedDestinations.map((destination) => (
                  <DestinationCard
                    key={destination.id}
                    destination={destination}
                  />
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    );
  } catch (error) {
    console.error("Saved destinations error:", error);

    return (
      <div className="min-h-screen bg-[#F7F7F2] flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-red-600">
            Failed to load saved destinations
          </h2>

          <p className="text-gray-500 mt-2">
            Please try again later.
          </p>
        </div>
      </div>
    );
  }
};

export default BookMarkPage;
