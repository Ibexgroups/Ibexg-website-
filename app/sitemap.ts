import type { MetadataRoute } from "next";

const BASE_URL = "https://ibexinvestment.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    "",
    "/about",
    "/services",
    "/properties",
    "/fuel-distribution",
    "/our-companies",
    "/careers",
    "/contact",
  ];

  const lastModified = new Date();

  return routes.map((route) => ({
    url: `${BASE_URL}${route}`,
    lastModified,
    changeFrequency: route === "" ? "weekly" : "monthly",
    priority: route === "" ? 1 : 0.8,
  }));
}
