"use client";

import { useRouter } from "next/navigation";
import { ArrowIcon } from "./ArrowIcon";

// Goes back when there's history to go back to; otherwise home, as a full
// page load (see the note in NotFoundPage.tsx).
export function BackButton({ className }: { className?: string }) {
  const router = useRouter();
  return (
    <button
      type="button"
      className={className}
      // eslint-disable-next-line @next/next/no-location-assign-relative-destination -- full page load on purpose
      onClick={() => (window.history.length > 1 ? router.back() : window.location.assign("/"))}
    >
      <ArrowIcon direction="left" />
      Go back
    </button>
  );
}
