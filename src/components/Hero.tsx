// Generated with guidance from Kiro AI for NammaMysuru project
import { ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Hero() {
  console.log('Hero component rendering');
  
  const scrollToChat = () => {
    document.getElementById("chat")?.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToExperiences = () => {
    document.getElementById("experiences")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center"
    >
      {/* Background Image with Overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ 
          backgroundImage: `url('/hero-mysore-palace.jpg')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        <div className="absolute inset-0 bg-black/40" />
        {/* Extended gradient transition to white covering stats area */}
        <div className="absolute bottom-0 left-0 right-0 h-64 bg-gradient-to-t from-white via-white/90 via-white/60 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
        <div className="max-w-4xl mx-auto">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/20 backdrop-blur-sm mb-8">
            <Sparkles className="w-4 h-4 text-white" />
            <span className="text-sm font-medium text-white">
              Your AI-Powered Local Guide
            </span>
          </div>

          {/* Heading */}
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-6 leading-tight">
            Discover Mysuru
            <br />
            <span className="text-white">with Mysa</span>
          </h1>

          {/* Subtext */}
          <p className="text-xl md:text-2xl text-white/90 mb-12 max-w-3xl mx-auto leading-relaxed">
            Experience the royal city like a local. From hidden food gems to Dasara 
            festivities and heritage walks — Mysa knows every corner of Mysuru.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-20">
            <Button
              size="lg"
              onClick={scrollToChat}
              className="group text-lg px-8 py-4 shadow-lg bg-emerald-600 hover:bg-emerald-700 text-white rounded-md"
            >
              <span>Start chatting with Mysa</span>
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button
              variant="outline"
              size="lg"
              onClick={scrollToExperiences}
              className="text-lg px-8 py-4 bg-white/20 border-white/30 text-white hover:bg-white/30 rounded-md backdrop-blur-sm"
            >
              Explore Experiences
            </Button>
          </div>

          {/* Stats */}
          <div className="flex flex-wrap items-center justify-center gap-12 md:gap-20 text-white">
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold mb-2">100+</div>
              <div className="text-lg opacity-90">Local Spots</div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold mb-2">10</div>
              <div className="text-lg opacity-90">Dasara Days</div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold mb-2">5</div>
              <div className="text-lg opacity-90">Heritage Trails</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
