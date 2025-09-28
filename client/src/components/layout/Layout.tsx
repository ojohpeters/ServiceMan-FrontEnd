import { ReactNode } from "react";
import { motion } from "framer-motion";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { User, Category } from "@/types";

interface LayoutProps {
  children: ReactNode;
  user?: User | null;
  categories?: Category[];
  notifications?: number;
  onSearch?: (query: string) => void;
  hideFooter?: boolean;
}

export default function Layout({ 
  children, 
  user, 
  categories = [], 
  notifications = 0, 
  onSearch,
  hideFooter = false 
}: LayoutProps) {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900">
      <Navbar 
        user={user} 
        categories={categories} 
        notifications={notifications} 
        onSearch={onSearch}
      />
      
      <main className="flex-1 pt-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {children}
        </motion.div>
      </main>
      
      {!hideFooter && <Footer />}
    </div>
  );
}