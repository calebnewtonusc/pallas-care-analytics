import { redirect } from "next/navigation";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pallas Care Analytics",
  description: "Operational analytics dashboard for Pallas Care home care agency",
};

export default function Home() {
  redirect("/dashboard");
}
