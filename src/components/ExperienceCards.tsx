// Generated with guidance from Kiro AI for NammaMysuru project
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import foodImg from "@/assets/mysore-food.jpg";
import dasaraImg from "@/assets/dasara-festival.jpg";
import walksImg from "@/assets/heritage-walk.jpg";

const experiences = [
  {
    id: "food",
    title: "Food Trails",
    subtitle: "Taste the Royal Legacy",
    description:
      "From iconic Mysore Pak to steaming idlis at century-old eateries, explore the flavors that define this city.",
    image: foodImg,
    tags: ["Restaurants", "Street Food", "Sweets"],
    color: "from-primary/80",
  },
  {
    id: "dasara",
    title: "Dasara Festival",
    subtitle: "10 Days of Grandeur",
    description:
      "Experience the world-famous Mysuru Dasara — illuminated palace, cultural programs, and the grand Jamboo Savari.",
    image: dasaraImg,
    tags: ["Events", "Procession", "Lights"],
    color: "from-accent-foreground/80",
  },
  {
    id: "walks",
    title: "Heritage Walks",
    subtitle: "Walk Through History",
    description:
      "Discover ancient temples, colonial architecture, and hidden stories along curated heritage trails.",
    image: walksImg,
    tags: ["Temples", "Palaces", "Museums"],
    color: "from-secondary/80",
  },
];

export function ExperienceCards() {
  const scrollToChat = (mode: string) => {
    const chatSection = document.getElementById("chat");
    if (chatSection) {
      chatSection.scrollIntoView({ behavior: "smooth" });
      // Dispatch custom event to set the chat mode
      window.dispatchEvent(new CustomEvent("setChatMode", { detail: mode }));
    }
  };

  return (
    <section id="experiences" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="text-primary font-semibold text-sm uppercase tracking-wide">
            Explore
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mt-2 font-serif">
            Popular Experiences
          </h2>
          <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
            Choose your adventure — whether it's culinary delights, festive grandeur, 
            or a journey through time.
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {experiences.map((exp) => (
            <div
              key={exp.id}
              id={exp.id}
              className="group relative rounded-xl overflow-hidden bg-card border border-border shadow-md hover:shadow-xl transition-all duration-300"
            >
              {/* Image */}
              <div className="relative h-56 overflow-hidden">
                <img
                  src={exp.image}
                  alt={exp.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className={`absolute inset-0 bg-gradient-to-t ${exp.color} to-transparent opacity-60`} />
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="text-xs text-primary font-semibold uppercase tracking-wide mb-1">
                  {exp.subtitle}
                </div>
                <h3 className="text-xl font-bold text-foreground mb-2 font-serif">
                  {exp.title}
                </h3>
                <p className="text-muted-foreground text-sm mb-4 leading-relaxed">
                  {exp.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {exp.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 text-xs rounded-full bg-accent text-accent-foreground font-medium"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* CTA */}
                <Button
                  variant="ghost"
                  className="group/btn p-0 h-auto text-primary hover:text-primary/80"
                  onClick={() => scrollToChat(exp.id)}
                >
                  <span>Ask Mysa about this</span>
                  <ArrowRight className="ml-1 w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
