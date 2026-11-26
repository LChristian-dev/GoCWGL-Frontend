"use client";

import { useRouter } from "next/navigation";
import { ArrowIcon } from "./ArrowIcon";

// Goes back when there's history to go back to; otherwise home.
export function BackButton({ className }: { className?: string }) {
  const router = useRouter();
  return (
    <button
      type="button"
      className={className}
      onClick={() => (window.history.length > 1 ? router.back() : router.push("/"))}
    >
      <ArrowIcon direction="left" />
      Go back
    </button>
  );
}
