import { createFileRoute } from "@tanstack/react-router";
import { CompanyHome } from "@/components/company-home";

export const Route = createFileRoute("/_authenticated/home")({
  head: () => ({ meta: [
    { title: "Outfit Oasis — Confidence is your best look" },
    { name: "description", content: "Meet Outfit Oasis: a new vision for personal styling, creative wardrobes, and thoughtful fashion discovery. Confidence, creativity, and convenience for everyone." },
    { property: "og:title", content: "Outfit Oasis — Confidence is your best look" },
    { property: "og:description", content: "Discover our vision for fashion that puts your personality, lifestyle, and confidence first." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary_large_image" },
  ] }),
  component: CompanyHome,
});
