import { Link, useLocation } from "wouter";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import { track } from "@/lib/track";
import { ModeToggle } from "@/components/mode-toggle";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, X } from "lucide-react";

export function SiteNav() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [location] = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [location]);

  const navLinks = [
    { href: "/platform", label: "Platform", track: "nav_platform" },
    { href: "/solutions", label: "Solutions", track: "nav_solutions" },
    { href: "/integrations", label: "Integrations", track: "nav_integrations" },
    { href: "/security", label: "Security", track: "nav_security" },
    { href: "/resources", label: "Resources", track: "nav_resources" },
    { href: "/pricing", label: "Pricing", track: "nav_pricing" },
    { href: "/company", label: "Company", track: "nav_company" },
  ];

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b",
        scrolled
          ? "bg-background/80 backdrop-blur-md border-border py-3 lg:py-4"
          : "bg-transparent border-transparent py-4 lg:py-6"
      )}
    >
      <div className="cv-container flex items-center justify-between">
        <Link href="/" onClick={() => track("nav_home")} className="flex items-center">
          <img 
            src="/assets/logo-white.png" 
            alt="CloudVerse AI" 
            className="h-6 lg:h-7 w-auto hidden dark:block"
          />
          <img 
            src="/assets/logo-black.png" 
            alt="CloudVerse AI" 
            className="h-6 lg:h-7 w-auto dark:hidden"
          />
        </Link>

        <div className="hidden lg:flex items-center gap-6">
          {navLinks.map((link) => (
            <Link 
              key={link.href} 
              href={link.href} 
              onClick={() => track(link.track)}
              className={cn(
                "text-[13px] font-medium transition-colors hover:text-primary",
                location === link.href ? "text-primary" : "text-muted-foreground"
              )}
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-3 sm:gap-4">
          <Link 
            href="/signin" 
            onClick={() => track("nav_signin")}
            className="text-[13px] font-medium text-foreground hover:text-primary hidden lg:block"
          >
            Sign in
          </Link>
          <Link 
            href="/demo" 
            onClick={() => track("cta_demo", { location: "nav" })}
            className="text-[12px] sm:text-[13px] font-medium bg-foreground text-background px-3 sm:px-4 py-2 rounded-full hover:bg-foreground/90 transition-colors"
          >
            Book a demo
          </Link>
          <ModeToggle />
          
          <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
            <SheetTrigger asChild>
              <button 
                className="lg:hidden p-2 -mr-2 text-foreground hover:text-primary transition-colors"
                aria-label="Toggle menu"
              >
                <Menu className="h-5 w-5" />
              </button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[280px] sm:w-[320px] bg-background border-border">
              <div className="flex flex-col gap-1 mt-8">
                {navLinks.map((link) => (
                  <Link 
                    key={link.href} 
                    href={link.href} 
                    onClick={() => {
                      track(link.track);
                      setMobileOpen(false);
                    }}
                    className={cn(
                      "text-[15px] font-medium py-3 px-2 rounded-lg transition-colors",
                      location === link.href 
                        ? "text-primary bg-primary/10" 
                        : "text-foreground hover:bg-muted"
                    )}
                  >
                    {link.label}
                  </Link>
                ))}
                <div className="border-t border-border my-4" />
                <Link 
                  href="/signin" 
                  onClick={() => {
                    track("nav_signin");
                    setMobileOpen(false);
                  }}
                  className="text-[15px] font-medium py-3 px-2 rounded-lg text-foreground hover:bg-muted transition-colors"
                >
                  Sign in
                </Link>
                <Link 
                  href="/demo" 
                  onClick={() => {
                    track("cta_demo", { location: "nav_mobile" });
                    setMobileOpen(false);
                  }}
                  className="text-[15px] font-medium text-center bg-foreground text-background py-3 px-4 rounded-full hover:bg-foreground/90 transition-colors mt-2"
                >
                  Book a demo
                </Link>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
}
