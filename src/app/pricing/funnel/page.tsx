import { redirect } from "next/navigation";

// Funnel packages are no longer offered; old links land on CRM pricing.
export default function FunnelPricingRedirect() {
  redirect("/pricing/crm");
}
