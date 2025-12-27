// Generated with guidance from Kiro AI for NammaMysuru project
import { MapPin, Utensils, Calendar, Footprints } from "lucide-react";

const features = [
  {
    icon: MapPin,
    title: "Hyper-Local Knowledge",
    description:
      "Mysa knows spots that only Mysuru locals know — from the best filter coffee to hidden temple corners.",
  },
  {
    icon: Utensils,
    title: "Authentic Food Trails",
    description:
      "Skip tourist traps. Discover legendary eateries for Mysore Pak, dosas, and South Indian thalis.",
  },
  {
    icon: Calendar,
    title: "Dasara Expertise",
    description:
      "Navigate the 10-day Dasara festival like a pro with day-by-day schedules and insider tips.",
  },
  {
    icon: Footprints,
    title: "Curated Heritage Walks",
    description:
      "Explore centuries of history with self-guided or recommended guided heritage walks.",
  },
];

export function WhySection() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="text-emerald-600 font-semibold text-sm uppercase tracking-wide">
            Why Choose Us
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-2">
            Why NammaMysuru?
          </h2>
          <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
            We're not just another travel guide. We're your digital companion with 
            deep roots in Mysuru's culture and traditions.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group p-6 rounded-lg bg-white border border-gray-200 hover:border-emerald-200 transition-all duration-300 hover:shadow-lg"
            >
              <div className="w-14 h-14 rounded-lg bg-emerald-100 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <feature.icon className="w-7 h-7 text-emerald-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
