import type { Metadata } from "next";
import { PropertiesContent } from "./properties-content";
import { COMPANY } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Properties",
  description: `Explore ${COMPANY.name}'s portfolio of 90+ gas stations, convenience stores, and commercial properties nationwide.`,
};

export default function PropertiesPage() {
  return <PropertiesContent />;
}
