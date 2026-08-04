import type { Metadata } from "next";
import { PropertiesContent } from "./properties-content";
import { COMPANY } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Properties",
  description: `Explore ${COMPANY.name}'s multi-state portfolio across Texas, Louisiana, and Mississippi — gas stations and commercial properties.`,
};

export default function PropertiesPage() {
  return <PropertiesContent />;
}
