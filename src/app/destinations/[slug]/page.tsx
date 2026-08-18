export default function DestinationDetailsPage({ params }: { params: { slug: string } }) {
  return (
    <div className="min-h-screen bg-[#F7F7F2] flex items-center justify-center p-8">
      <div className="bg-white p-12 rounded-2xl border border-[#E2E7E3] text-center max-w-2xl w-full shadow-[0_8px_30px_rgba(23,33,29,0.06)]">
        <h1 className="text-3xl font-serif font-bold text-[#17211D] mb-4">Destination Details</h1>
        <p className="text-[16px] text-[#66736D] mb-8 font-medium">
          You have navigated to the details page for: <span className="text-[#087F5B] font-bold">{params.slug}</span>
        </p>
        <p className="text-[14px] text-[#52615A] mb-8">
          This is a placeholder page for the destination details. The full details implementation would display the specific imagery, reviews, map location, and itinerary planning tools for this destination.
        </p>
        <a 
          href="/destinations"
          className="inline-block bg-[#087F5B] text-white px-8 py-3 rounded-lg font-bold hover:bg-[#065F46] transition-colors"
        >
          ← Back to Destinations
        </a>
      </div>
    </div>
  );
}
