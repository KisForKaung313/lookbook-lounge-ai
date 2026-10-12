import { Link } from "@tanstack/react-router";
import { ArrowDown, ArrowUpRight, Sparkles, Shirt, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import campaign from "@/assets/company-campaign.jpg";
import community from "@/assets/company-community.jpg";
import minimal from "@/assets/looks/minimal.jpg";
import streetwear from "@/assets/looks/streetwear.jpg";
import elegant from "@/assets/looks/elegant.jpg";

export function CompanyHome() {
  return <>
    <section className="company-hero relative isolate overflow-hidden">
      <img src={campaign} alt="Three people confidently expressing their personal style in contemporary tailoring" width={1536} height={1024} fetchPriority="high" className="absolute inset-0 -z-20 size-full object-cover object-[65%_center]" />
      <div className="campaign-scrim absolute inset-0 -z-10" />
      <div className="mx-auto flex min-h-[inherit] max-w-7xl flex-col justify-center px-5 py-16 sm:px-10">
        <p className="eyebrow mb-5 text-foreground">Fashion. Reimagined around you.</p>
        <h1 className="max-w-lg text-6xl leading-[0.98] sm:text-7xl">Outfit Oasis<span className="text-success">.</span></h1>
        <p className="mt-5 max-w-sm font-display text-3xl leading-tight">The best thing you can wear<br className="hidden sm:block" /> is <em>confidence.</em></p>
        <p className="mt-5 max-w-sm text-sm leading-7">Not a designer label. Not a bigger wardrobe. Just the freedom to feel like yourself. We’re bringing personal style, inspiration, and smarter shopping together.</p>
        <Button asChild size="lg" className="mt-7 h-12 w-fit rounded-none"><Link to="/about">Discover our story <ArrowUpRight /></Link></Button>
      </div>
      <a href="#our-belief" className="absolute bottom-5 left-5 flex items-center gap-2 text-xs sm:left-10"><ArrowDown className="size-4" /> A different way to dress</a>
    </section>
    <div className="border-b border-border bg-primary text-primary-foreground"><div className="mx-auto flex max-w-7xl flex-wrap justify-between gap-4 px-5 py-5 text-xs sm:px-10"><span>PERSONAL STYLE, NOT PRICE TAGS</span><span>INSPIRED BY YOU</span><span>CONFIDENCE FOR EVERYONE</span></div></div>
    <section id="our-belief" className="mx-auto grid max-w-7xl gap-8 px-5 py-20 sm:px-10 md:grid-cols-[1fr_2fr] md:py-24">
      <p className="eyebrow pt-2">01 / Our belief</p>
      <div><h2 className="max-w-3xl text-4xl leading-tight sm:text-5xl">A wardrobe full of clothes.<br /><em>A world of possibilities.</em></h2><div className="mt-8 grid gap-6 text-sm leading-7 text-muted-foreground sm:grid-cols-2"><p>We’ve all been there: buying something we love, then feeling that it doesn’t quite look the way we imagined. Or standing in front of a full wardrobe with nothing to wear. Getting dressed shouldn’t make you doubt yourself.</p><p>Outfit Oasis began with a simple belief: great style isn’t about expensive brands. It’s about discovering what works for you, dressing for the moments that matter, and finding confidence in your own expression.</p></div><Button asChild variant="link" className="mt-5 px-0"><Link to="/about">More about our purpose <ArrowUpRight /></Link></Button></div>
    </section>
    <section className="border-y border-border bg-muted">
      <div className="mx-auto max-w-7xl px-5 py-20 sm:px-10">
        <div className="mb-12 flex flex-wrap items-end justify-between gap-5"><div><p className="eyebrow mb-4">02 / The Outfit Oasis vision</p><h2 className="text-4xl sm:text-5xl">Style smarter. <em>Live confidently.</em></h2></div><p className="max-w-sm text-sm leading-7 text-muted-foreground">A personal fashion companion designed to connect the clothes you own, the looks you love, and the life you lead.</p></div>
        <div className="grid gap-8 md:grid-cols-3">
          {[
            { image: minimal, icon: Sparkles, title: "A stylist that gets you", text: "Our vision is personal styling in your pocket: ideas shaped around your taste, lifestyle, and occasion, not a one-size-fits-all trend.", label: "PERSONALIZED INSPIRATION" },
            { image: streetwear, icon: Shirt, title: "More from what you own", text: "Rediscover your wardrobe. Explore creative combinations and see familiar pieces in a new light, instead of always needing something new.", label: "YOUR WARDROBE, REIMAGINED" },
            { image: elegant, icon: ShoppingBag, title: "Inspiration meets discovery", text: "We aim to connect outfit inspiration with local and global fashion brands, making the journey from a great idea to the right piece feel effortless.", label: "THOUGHTFUL SHOPPING" },
          ].map(({ image, icon: Icon, title, text, label }) => <article key={title}><div className="relative overflow-hidden"><img src={image} alt={title + " — editorial fashion inspiration"} loading="lazy" width={768} height={1024} className="aspect-[4/5] w-full object-cover transition-transform duration-700 hover:scale-105" /><span className="absolute bottom-4 left-4 flex size-10 items-center justify-center rounded-full bg-background text-foreground"><Icon className="size-4" /></span></div><p className="eyebrow mt-6">{label}</p><h3 className="mt-3 text-3xl">{title}</h3><p className="mt-3 text-sm leading-7 text-muted-foreground">{text}</p></article>)}
        </div>
        <p className="mt-10 border-t border-border pt-5 text-xs leading-6 text-muted-foreground">We’re building this vision step by step. The platform is in development; some experiences are previews or are still to come.</p>
      </div>
    </section>
    <section className="mx-auto grid max-w-7xl items-center gap-10 px-5 py-20 sm:px-10 md:grid-cols-2 md:gap-16">
      <img src={community} alt="Friends expressing different personal styles together" loading="lazy" width={1536} height={1024} className="aspect-[6/5] w-full object-cover" />
      <div><p className="eyebrow mb-5">03 / Made for real people</p><h2 className="text-4xl leading-tight sm:text-5xl">Your personality.<br />Your budget.<br /><em>Your kind of style.</em></h2><p className="mt-6 text-sm leading-7 text-muted-foreground">Fashion should be accessible, whatever your background, budget, or experience. Whether you lean minimal, love streetwear, or are still figuring it out, there’s room for you here.</p><p className="mt-4 text-sm leading-7 text-muted-foreground">We’re creating a destination where technology supports creativity, and where feeling good in what you wear matters more than following the crowd.</p><Button asChild variant="link" className="mt-5 px-0"><Link to="/about">Get to know Outfit Oasis <ArrowUpRight /></Link></Button></div>
    </section>
    <section className="bg-primary px-5 py-20 text-center text-primary-foreground sm:px-10"><p className="mb-5 text-xs uppercase">Less uncertainty. More you.</p><h2 className="text-4xl sm:text-5xl">A little inspiration.<br /><em>A whole lot of confidence.</em></h2><p className="mx-auto mt-6 max-w-lg text-sm leading-7 opacity-80">Discover the idea behind Outfit Oasis and the future we’re building. A more creative, convenient, and personal way to experience fashion.</p><Button asChild variant="secondary" size="lg" className="mt-8 h-12 rounded-none"><Link to="/about">Explore our vision <ArrowUpRight /></Link></Button></section>
  </>;
}