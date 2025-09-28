import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Star, Users, CheckCircle } from "lucide-react";
import { Link, useLocation } from "wouter";
import { motion } from "framer-motion";
import heroImage from "@assets/generated_images/ServiceMan_hero_background_image_8a80d7a1.png";

export default function Hero() {
  const [searchQuery, setSearchQuery] = useState("");
  const [, setLocation] = useLocation();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setLocation(`/browse?search=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <section 
      className="relative h-[60vh] min-h-[500px] bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url(${heroImage})`
      }}
    >
      <div className="absolute inset-0 flex items-center">
        <div className="container mx-auto px-4">
          <motion.div 
            className="max-w-2xl text-white"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <motion.h1 
              className="mb-6 text-5xl font-bold leading-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Find Professional <span className="text-primary-foreground">Servicemen</span> Near You
            </motion.h1>
            <motion.p 
              className="mb-8 text-xl opacity-90"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              Connect with verified, skilled professionals for all your home and business needs. 
              Quality service, trusted expertise.
            </motion.p>

            {/* Search Form */}
            <motion.form 
              onSubmit={handleSearch} 
              className="mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                  <Input
                    type="search"
                    placeholder="What service do you need? (e.g., plumber, electrician, carpenter)"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="h-12 pl-10 text-lg backdrop-blur-sm bg-white/10 border-white/20 text-white placeholder:text-white/70"
                    data-testid="input-hero-search"
                  />
                </div>
                <Button 
                  type="submit" 
                  size="lg" 
                  className="h-12 px-8 bg-primary border-primary-border"
                  data-testid="button-hero-search"
                >
                  Search
                </Button>
              </div>
            </motion.form>

            {/* CTA Buttons */}
            <motion.div 
              className="flex flex-wrap gap-4 mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
            >
              <Button 
                size="lg" 
                className="bg-white text-primary hover:bg-white/90"
                asChild
                data-testid="button-hire-professional"
              >
                <Link href="/browse">Hire a Professional</Link>
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-white text-white bg-black/20 backdrop-blur-sm hover:bg-white/10"
                asChild
                data-testid="button-become-serviceman"
              >
                <Link href="/register">Become a Serviceman</Link>
              </Button>
            </motion.div>

            {/* Trust Indicators */}
            <motion.div 
              className="flex flex-wrap items-center gap-6 text-sm"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.0 }}
            >
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4" />
                <span>10,000+ Verified Professionals</span>
              </div>
              <div className="flex items-center gap-2">
                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                <span>4.8 Average Rating</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4" />
                <span>Background Checked</span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}