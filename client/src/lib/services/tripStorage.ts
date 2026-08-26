import { readStoredValue, storeValue } from "@/data/travelStyles";
import type { GeneratedTrip } from "@/types/tripPlan";

const SAVED_TRIPS_KEY = "tripplan-ai-saved-trips";

export function listSavedTrips(): GeneratedTrip[] {
  return readStoredValue<GeneratedTrip[]>(SAVED_TRIPS_KEY, []);
}

export function getSavedTrip(id: string): GeneratedTrip | null {
  return listSavedTrips().find((trip) => trip.id === id) ?? null;
}

export function saveTrip(trip: GeneratedTrip): void {
  const existing = listSavedTrips().filter((entry) => entry.id !== trip.id);
  storeValue(SAVED_TRIPS_KEY, [trip, ...existing]);
}

export function deleteSavedTrip(id: string): void {
  storeValue(
    SAVED_TRIPS_KEY,
    listSavedTrips().filter((trip) => trip.id !== id),
  );
}

export function isTripSaved(id: string): boolean {
  return listSavedTrips().some((trip) => trip.id === id);
}
