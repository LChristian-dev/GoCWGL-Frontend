import { redirect } from "next/navigation";

// There's no combined pricing page: CRM and funnels each have their own.
// CRM is the lead offer, so a bare /pricing goes there.
export default function PricingIndex() {
  redirect("/pricing/crm");
}
