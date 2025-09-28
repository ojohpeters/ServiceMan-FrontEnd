import { Link } from "wouter";
import { motion } from "framer-motion";
import { Facebook, Twitter, Instagram, LinkedinIcon, Mail, Phone, MapPin } from "lucide-react";
import { CONFIG, ROUTES } from "@/lib/constants";

const footerLinks = {
  "Quick Links": [
    { label: "Browse Services", href: ROUTES.BROWSE },
    { label: "How it Works", href: ROUTES.HOW_IT_WORKS },
    { label: "Pricing", href: ROUTES.PRICING },
    { label: "Safety & Trust", href: ROUTES.SAFETY },
  ],
  "Support": [
    { label: "Help Center", href: ROUTES.HELP },
    { label: "Contact Us", href: ROUTES.CONTACT },
    { label: "Terms of Service", href: ROUTES.TERMS },
    { label: "Privacy Policy", href: ROUTES.PRIVACY },
  ],
  "For Professionals": [
    { label: "Join as Serviceman", href: `${ROUTES.REGISTER}?type=serviceman` },
    { label: "Serviceman Dashboard", href: ROUTES.SERVICEMAN_DASHBOARD },
    { label: "Requirements", href: "/requirements" },
    { label: "Success Stories", href: "/stories" },
  ],
};

const socialLinks = [
  { icon: Facebook, href: "#", label: "Facebook" },
  { icon: Twitter, href: "#", label: "Twitter" },
  { icon: Instagram, href: "#", label: "Instagram" },
  { icon: LinkedinIcon, href: "#", label: "LinkedIn" },
];

const contactInfo = [
  { icon: Phone, text: "+234 (0) 123 456 7890" },
  { icon: Mail, text: "support@serviceman.ng" },
  { icon: MapPin, text: "Lagos, Nigeria" },
];

export default function Footer() {
  return (
    <footer className="bg-gray-900 dark:bg-gray-950 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <motion.div 
              className="flex items-center space-x-2 mb-4"
              whileHover={{ scale: 1.05 }}
            >
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">S</span>
              </div>
              <span className="text-xl font-bold">{CONFIG.APP_NAME}</span>
            </motion.div>
            <p className="text-gray-400 mb-6 text-sm leading-relaxed">
              Connect with trusted professionals for all your service needs. 
              From emergency repairs to regular maintenance, we've got you covered.
            </p>
            
            {/* Contact Info */}
            <div className="space-y-3">
              {contactInfo.map((item, index) => (
                <div key={index} className="flex items-center space-x-3 text-sm text-gray-400">
                  <item.icon className="w-4 h-4 text-blue-400" />
                  <span>{item.text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Link Sections */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h3 className="text-lg font-semibold mb-4">{title}</h3>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href}>
                      <motion.span
                        className="text-gray-400 hover:text-blue-400 transition-colors text-sm"
                        whileHover={{ x: 5 }}
                      >
                        {link.label}
                      </motion.span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Social Links & Newsletter */}
        <div className="border-t border-gray-800 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            {/* Social Links */}
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-400">Follow us:</span>
              {socialLinks.map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center text-gray-400 hover:text-blue-400 hover:bg-gray-700 transition-colors"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  aria-label={social.label}
                >
                  <social.icon className="w-4 h-4" />
                </motion.a>
              ))}
            </div>

            {/* Newsletter Signup */}
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-400">Stay updated:</span>
              <div className="flex space-x-2">
                <input
                  type="email"
                  placeholder="Your email"
                  className="px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <motion.button
                  className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700 transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Subscribe
                </motion.button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 py-4">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-2 md:space-y-0">
            <p className="text-sm text-gray-400">
              © {new Date().getFullYear()} {CONFIG.APP_NAME}. All rights reserved.
            </p>
            <div className="flex space-x-6 text-sm text-gray-400">
              <Link href={ROUTES.TERMS}>
                <span className="hover:text-blue-400 transition-colors">Terms</span>
              </Link>
              <Link href={ROUTES.PRIVACY}>
                <span className="hover:text-blue-400 transition-colors">Privacy</span>
              </Link>
              <span>Made with ❤️ in Nigeria</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}