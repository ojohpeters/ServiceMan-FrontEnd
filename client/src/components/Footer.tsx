import { Link } from "wouter";
import { Briefcase, Mail, Phone, MapPin } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-card border-t">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand & Description */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Briefcase className="h-6 w-6 text-primary" />
              <span className="text-xl font-bold">ServiceMan</span>
            </div>
            <p className="text-muted-foreground">
              Connecting you with verified professional servicemen for all your needs. 
              Quality service, trusted expertise.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-muted-foreground hover:text-primary" data-testid="link-facebook">
                Facebook
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary" data-testid="link-twitter">
                Twitter
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary" data-testid="link-instagram">
                Instagram
              </a>
            </div>
          </div>

          {/* For Clients */}
          <div className="space-y-4">
            <h3 className="font-semibold">For Clients</h3>
            <ul className="space-y-2 text-muted-foreground">
              <li>
                <Link href="/browse" className="hover:text-primary" data-testid="link-browse-services">
                  Browse Services
                </Link>
              </li>
              <li>
                <Link href="/how-it-works" className="hover:text-primary" data-testid="link-how-it-works">
                  How It Works
                </Link>
              </li>
              <li>
                <Link href="/pricing" className="hover:text-primary" data-testid="link-pricing">
                  Pricing
                </Link>
              </li>
              <li>
                <Link href="/safety" className="hover:text-primary" data-testid="link-safety">
                  Safety & Trust
                </Link>
              </li>
            </ul>
          </div>

          {/* For Servicemen */}
          <div className="space-y-4">
            <h3 className="font-semibold">For Servicemen</h3>
            <ul className="space-y-2 text-muted-foreground">
              <li>
                <Link href="/register" className="hover:text-primary" data-testid="link-become-pro">
                  Become a Pro
                </Link>
              </li>
              <li>
                <Link href="/serviceman/guide" className="hover:text-primary" data-testid="link-pro-guide">
                  Pro Guide
                </Link>
              </li>
              <li>
                <Link href="/serviceman/resources" className="hover:text-primary" data-testid="link-resources">
                  Resources
                </Link>
              </li>
              <li>
                <Link href="/serviceman/community" className="hover:text-primary" data-testid="link-community">
                  Community
                </Link>
              </li>
            </ul>
          </div>

          {/* Support & Contact */}
          <div className="space-y-4">
            <h3 className="font-semibold">Support</h3>
            <ul className="space-y-2 text-muted-foreground">
              <li>
                <Link href="/help" className="hover:text-primary" data-testid="link-help">
                  Help Center
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-primary" data-testid="link-contact">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-primary" data-testid="link-terms">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-primary" data-testid="link-privacy">
                  Privacy Policy
                </Link>
              </li>
            </ul>

            <div className="space-y-2 text-sm text-muted-foreground">
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4" />
                <span>support@serviceman.ng</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4" />
                <span>+234 800 SERVICE</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="h-4 w-4" />
                <span>Lagos, Nigeria</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t mt-8 pt-8 text-center text-muted-foreground">
          <p>&copy; {currentYear} ServiceMan. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}