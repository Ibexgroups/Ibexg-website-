export const COMPANY = {
  name: "IBEX Investments Group",
  shortName: "IBEX",
  owner: "Zaied Musleh",
  founded: 2006,
  tagline: "Strong Foundation • Smarter Futures • Lasting Legacy",
  description:
    "Since 2006, IBEX Investments Group has acquired, operated, and expanded gas stations and franchise businesses across multiple U.S. states. We buy and sell properties, structure sale-leasebacks, pay strong NNN rents, supply fuel through major brand dealerships, and help operators compete and grow — with a $200M+ asset portfolio built for continued expansion.",
  address: {
    street: "55 Calvarese Dr",
    city: "Bear",
    state: "DE",
    zip: "19701",
    country: "United States",
    full: "55 Calvarese Dr, Bear, DE 19701, United States",
  },
  phone: "+1 (504) 595-7385",
  phoneHref: "+15045957385",
  email: "info@ibexinvestments.com",
} as const;

export const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/properties", label: "Properties" },
  { href: "/fuel-distribution", label: "Fuel Distribution" },
  { href: "/our-companies", label: "Our Companies" },
  { href: "/careers", label: "Careers" },
  { href: "/contact", label: "Contact" },
] as const;

export const STATS = [
  { value: 2006, suffix: "", prefix: "", label: "Operating Since", display: "2006" },
  { value: 90, suffix: "+", prefix: "", label: "Locations", display: "" },
  { value: 0, suffix: "", prefix: "", label: "Operations", display: "Multi-State" },
  { value: 200, suffix: "+", prefix: "$", label: "Million Asset Portfolio", display: "" },
  { value: 0, suffix: "", prefix: "", label: "Expansion Strategy", display: "Continuous" },
] as const;

export const SERVICES = [
  {
    title: "Gas Station & Property Acquisitions",
    description:
      "We purchase gas stations and commercial properties nationwide with professional valuations and reliable closings.",
    icon: "Fuel",
    cta: "Request an Offer",
    href: "/contact",
    image: "/hero/05-station-night.jpg",
  },
  {
    title: "Operations & Performance Improvement",
    description:
      "We operate and improve business performance through modern branding, operational excellence, and competitive fuel pricing.",
    icon: "TrendingUp",
    cta: "Learn How We Operate",
    href: "/services",
    image: "/hero/06-fuel-highway.jpg",
  },
  {
    title: "Sale-Leaseback Transactions",
    description:
      "We buy, sell, and structure sale-leaseback transactions that unlock capital while supporting long-term operational continuity.",
    icon: "Handshake",
    cta: "Explore Sale-Leaseback",
    href: "/contact",
    image: "/hero/02-buildings.jpg",
  },
  {
    title: "Triple Net (NNN) Lease Partnerships",
    description:
      "We partner with investors by leasing their properties under long-term Triple Net (NNN) lease agreements.",
    icon: "FileText",
    cta: "Partner With IBEX",
    href: "/contact",
    image: "/hero/04-business.jpg",
  },
  {
    title: "Fuel Retail Management",
    description:
      "We professionally manage and expand fuel retail businesses across our multi-state operating network.",
    icon: "Store",
    cta: "View Our Network",
    href: "/properties",
    image: "/hero/07-fuel-glow.jpg",
  },
  {
    title: "Operator Profitability Support",
    description:
      "We help independent operators increase profitability through modern branding, operational improvements, and competitive fuel pricing.",
    icon: "BarChart3",
    cta: "Talk to Our Team",
    href: "/contact",
    image: "/hero/03-growth.jpg",
  },
] as const;

export const WHY_CHOOSE_US = [
  {
    title: "Operating Since 2006",
    description:
      "Nearly two decades of proven experience in gas station and convenience retail operations.",
    icon: "Calendar",
  },
  {
    title: "90+ Locations",
    description:
      "A strong operating footprint across multiple states in the United States.",
    icon: "MapPin",
  },
  {
    title: "$200M+ Asset Portfolio",
    description:
      "A substantial commercial real estate and fuel retail portfolio built for long-term value.",
    icon: "Shield",
  },
  {
    title: "Multi-State Operations",
    description:
      "Experienced teams managing acquisitions, operations, and expansion across key U.S. markets.",
    icon: "Globe",
  },
  {
    title: "Trusted Fuel Brands",
    description:
      "Authorized dealer and operator partnerships with Exxon, Shell, Chevron, Valero, and Marathon.",
    icon: "Fuel",
  },
  {
    title: "Franchise Strength",
    description:
      "National restaurant brands that enhance convenience store traffic and customer experience.",
    icon: "Utensils",
  },
  {
    title: "Investor Partnerships",
    description:
      "Long-term sale-leaseback and Triple Net (NNN) structures designed for stable returns.",
    icon: "Users",
  },
  {
    title: "Continuous Expansion",
    description:
      "An active growth strategy focused on sustainable expansion and operational excellence.",
    icon: "TrendingUp",
  },
] as const;

export const FUEL_BRANDS = [
  { name: "Exxon", logo: "/brands/exxon.svg", glow: "rgba(237,28,36,0.35)" },
  { name: "Shell", logo: "/brands/shell.svg", glow: "rgba(255,209,0,0.4)" },
  { name: "Chevron", logo: "/brands/chevron.svg", glow: "rgba(0,51,160,0.35)" },
  { name: "Valero", logo: "/brands/valero.svg", glow: "rgba(0,51,160,0.35)" },
  { name: "Marathon", logo: "/brands/marathon.svg", glow: "rgba(227,24,55,0.35)" },
] as const;

export const FRANCHISE_PARTNERS = [
  {
    name: "Burger King",
    logo: "/brands/burger-king.svg",
    description: "A national QSR brand that drives traffic and strengthens convenience retail performance.",
    image: "https://images.unsplash.com/photo-1550547660-d9450f859349?w=900&q=80",
    glow: "rgba(214,35,0,0.35)",
  },
  {
    name: "Pizza Hut",
    logo: "/brands/pizza-hut.svg",
    description: "A trusted pizza brand that adds foodservice value and customer loyalty to our locations.",
    image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=900&q=80",
    glow: "rgba(238,58,36,0.35)",
  },
  {
    name: "Denny's",
    logo: "/brands/dennys.svg",
    description: "An iconic American diner brand that expands dining options across our multi-state network.",
    image: "https://images.unsplash.com/photo-1559339352-11d035aa65de?w=900&q=80",
    glow: "rgba(255,102,0,0.35)",
  },
  {
    name: "Church's Chicken",
    logo: "/brands/churchs.svg",
    description: "A proven chicken franchise that complements fuel retail and boosts in-store visits.",
    image: "https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?w=900&q=80",
    glow: "rgba(200,16,46,0.3)",
  },
  {
    name: "Krispy Krunchy Chicken",
    logo: "/brands/krispy-krunchy.svg",
    description: "A fast-growing chicken brand that enhances convenience store food offerings.",
    image: "https://images.unsplash.com/photo-1562967914-608f82629710?w=900&q=80",
    glow: "rgba(227,24,55,0.3)",
  },
  {
    name: "Brother's Pizza",
    logo: "/brands/brothers-pizza.svg",
    description: "A pizza partner that supports strong local demand and repeat customer traffic.",
    image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=900&q=80",
    glow: "rgba(185,28,28,0.3)",
  },
  {
    name: "Smashburger",
    logo: "/brands/smashburger.svg",
    description: "A premium burger brand that elevates the customer experience at IBEX locations.",
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=900&q=80",
    glow: "rgba(17,17,17,0.25)",
  },
] as const;

export const INVESTMENT_OPPORTUNITIES = [
  {
    title: "Sale-Leaseback Transactions",
    description:
      "Unlock capital through professionally structured sale-leaseback agreements while maintaining long-term operational stability.",
    icon: "Handshake",
  },
  {
    title: "Triple Net (NNN) Lease Agreements",
    description:
      "Partner with IBEX through long-term Triple Net lease structures designed for predictable investor returns.",
    icon: "FileText",
  },
  {
    title: "Commercial Real Estate Investments",
    description:
      "Access opportunities across gas stations, convenience retail sites, and commercial properties nationwide.",
    icon: "Building2",
  },
  {
    title: "Long-Term Property Management",
    description:
      "Benefit from professional management that protects asset value and supports consistent performance.",
    icon: "Briefcase",
  },
  {
    title: "Nationwide Expansion Opportunities",
    description:
      "Participate in IBEX’s continuous expansion strategy across multiple states in the United States.",
    icon: "Globe",
  },
] as const;

export const COMPANIES = [
  {
    title: "ATM Company",
    description:
      "Nationwide ATM placement and management services across our retail network and partner locations.",
    icon: "CreditCard",
  },
  {
    title: "Air Machine Company",
    description:
      "Professional air machine installation, maintenance, and revenue optimization for fuel retail sites.",
    icon: "Wind",
  },
  {
    title: "Fuel Distribution",
    description:
      "Commercial fuel supply and logistics serving fleet operators, retailers, and industrial customers.",
    icon: "Truck",
  },
  {
    title: "Commercial Properties",
    description:
      "Portfolio of commercial real estate assets including retail pads, outparcels, and mixed-use developments.",
    icon: "Building",
  },
  {
    title: "Retail Operations",
    description:
      "Full-scale convenience store and fuel center operations with professional merchandising and management.",
    icon: "ShoppingBag",
  },
  {
    title: "Investment Division",
    description:
      "Strategic capital deployment in energy retail, real estate, and ancillary service businesses nationwide.",
    icon: "LineChart",
  },
] as const;

export const TESTIMONIALS = [
  {
    quote:
      "IBEX made selling our gas station straightforward and professional. They closed quickly and handled every detail with integrity.",
    author: "Michael R.",
    role: "Gas Station Owner, Louisiana",
  },
  {
    quote:
      "As a commercial broker, IBEX is one of the most reliable buyers I've worked with. They understand the market and move decisively.",
    author: "Sarah T.",
    role: "Commercial Real Estate Broker, Texas",
  },
  {
    quote:
      "Their fuel distribution team has been a dependable partner for our fleet operations. Consistent supply and excellent service.",
    author: "James K.",
    role: "Fleet Operations Manager, Florida",
  },
  {
    quote:
      "IBEX's financial strength and operational expertise made them the ideal partner for our sale-leaseback transaction.",
    author: "David L.",
    role: "Property Owner, Georgia",
  },
] as const;

export const PROPERTIES = [
  {
    id: 1,
    title: "Highway Fuel Center",
    location: "Baton Rouge, LA",
    type: "Gas Station",
    image:
      "https://images.unsplash.com/photo-1574263867129-91466a5fef45?w=800&q=80",
  },
  {
    id: 2,
    title: "Metro Travel Plaza",
    location: "Houston, TX",
    type: "Gas Station",
    image:
      "https://images.unsplash.com/photo-1597764694900-55d837a7a1c4?w=800&q=80",
  },
  {
    id: 3,
    title: "Coastal Convenience Hub",
    location: "Jacksonville, FL",
    type: "Convenience Store",
    image:
      "https://images.unsplash.com/photo-1604719312566-8912a92a1b02?w=800&q=80",
  },
  {
    id: 4,
    title: "Interstate Commerce Park",
    location: "Atlanta, GA",
    type: "Commercial",
    image:
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80",
  },
  {
    id: 5,
    title: "Regional Fuel Depot",
    location: "Charlotte, NC",
    type: "Fuel Distribution",
    image:
      "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=800&q=80",
  },
  {
    id: 6,
    title: "Urban Retail Outparcel",
    location: "Philadelphia, PA",
    type: "Commercial",
    image:
      "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80",
  },
] as const;

export const CAREERS = [
  {
    title: "Regional Operations Manager",
    department: "Operations",
    location: "Southeast US",
    type: "Full-time",
  },
  {
    title: "Fuel Distribution Coordinator",
    department: "Fuel Distribution",
    location: "Bear, DE",
    type: "Full-time",
  },
  {
    title: "Commercial Real Estate Analyst",
    department: "Investment Division",
    location: "Remote",
    type: "Full-time",
  },
  {
    title: "Store Manager",
    department: "Retail Operations",
    location: "Multiple Locations",
    type: "Full-time",
  },
] as const;

export const CORE_VALUES = [
  {
    title: "Integrity",
    description:
      "We conduct every transaction with transparency, honesty, and respect for all parties.",
  },
  {
    title: "Excellence",
    description:
      "We hold ourselves to the highest standards in operations, service, and performance.",
  },
  {
    title: "Growth",
    description:
      "We continuously expand our reach, capabilities, and impact across the nation.",
  },
  {
    title: "Partnership",
    description:
      "We build lasting relationships with owners, brokers, suppliers, investors, and communities.",
  },
] as const;

export const SOCIAL_LINKS = [
  { label: "LinkedIn", href: "#" },
  { label: "Facebook", href: "#" },
  { label: "Twitter", href: "#" },
] as const;
