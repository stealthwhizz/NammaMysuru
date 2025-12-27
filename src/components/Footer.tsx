// Generated with guidance from Kiro AI for NammaMysuru project
import { MapPin, Heart } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-foreground py-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center">
              <MapPin className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold text-background font-serif">
              NammaMysuru
            </span>
          </div>

          {/* Links */}
          <div className="flex flex-wrap items-center justify-center gap-6">
            <a
              href="#home"
              className="text-background/70 hover:text-background transition-colors text-sm"
            >
              Home
            </a>
            <a
              href="#food"
              className="text-background/70 hover:text-background transition-colors text-sm"
            >
              Food
            </a>
            <a
              href="#dasara"
              className="text-background/70 hover:text-background transition-colors text-sm"
            >
              Dasara
            </a>
            <a
              href="#walks"
              className="text-background/70 hover:text-background transition-colors text-sm"
            >
              Walks
            </a>
            <a
              href="#chat"
              className="text-background/70 hover:text-background transition-colors text-sm"
            >
              Chat
            </a>
          </div>

          {/* Made with love */}
          <div className="flex items-center gap-1 text-background/70 text-sm">
            <span>Made with ❤️ for Mysore with KIRO</span>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-background/20 text-center">
          <p className="text-background/50 text-sm">
            © {new Date().getFullYear()} NammaMysuru. Your AI guide to the City of Palaces.
          </p>
        </div>
      </div>
    </footer>
  );
}
