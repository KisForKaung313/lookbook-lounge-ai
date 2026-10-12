import { createFileRoute } from "@tanstack/react-router";
import { WebsiteShell } from "@/components/website-shell";
import { CompanyHome } from "@/components/company-home";

export const Route = createFileRoute("/")({
  head: () => ({ meta: [
    { title: "Outfit Oasis — Personal style, reimagined" },
    { name: "description", content: "Discover Outfit Oasis, where confidence, creativity, and technology come together to make personal style more accessible." },
    { property: "og:title", content: "Outfit Oasis — Personal style, reimagined" },
    { property: "og:description", content: "Get to know our company and our vision for smarter styling and easier fashion discovery." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary_large_image" },
  ] }),
  component: () => <WebsiteShell><CompanyHome /></WebsiteShell>,
});
