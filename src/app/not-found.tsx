import type { Metadata } from "next";
import { NotFoundPage } from "@/features/not-found/NotFoundPage";

export const metadata: Metadata = {
  title: "Page not found",
};

// Any URL that matches no route (and any notFound() call) lands here.
// Same look as the admin CRM's 404 (gocwgl-admin/src/features/not-found).
export default function NotFound() {
  return <NotFoundPage />;
}
