import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Home, ArrowLeft, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import SEOHead from "../components/SEOHead";

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <>
      <SEOHead
        title="404 - Page Not Found | Chaipat Jainan"
        description="The page you're looking for doesn't exist."
      />
      <div className="min-h-screen bg-background flex items-center justify-center px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl"
        >
          {/* 404 Illustration */}
          <motion.div
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mb-8"
          >
            <div className="relative inline-block">
              <h1 className="font-serif text-9xl sm:text-[12rem] font-bold text-foreground/10">
                404
              </h1>
              <div className="absolute inset-0 flex items-center justify-center">
                <Search size={80} className="text-accent/30" />
              </div>
            </div>
          </motion.div>

          {/* Message */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <h2 className="font-serif text-3xl sm:text-4xl font-semibold text-foreground mb-4">
              Page Not Found
            </h2>
            <p className="text-muted-foreground text-lg mb-8 max-w-md mx-auto">
              The page you're looking for doesn't exist or has been moved. Let's get you back on track.
            </p>
          </motion.div>

          {/* Actions */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="flex flex-wrap gap-4 justify-center"
          >
            <Button
              onClick={() => navigate("/")}
              className="px-6 py-6 rounded-full text-sm font-medium flex items-center gap-2"
            >
              <Home size={18} />
              Go to Homepage
            </Button>
            <Button
              onClick={() => navigate(-1)}
              variant="outline"
              className="px-6 py-6 rounded-full text-sm font-medium flex items-center gap-2"
            >
              <ArrowLeft size={18} />
              Go Back
            </Button>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="mt-12 pt-8 border-t border-border"
          >
            <p className="text-sm text-muted-foreground mb-4">Quick Links</p>
            <div className="flex flex-wrap gap-4 justify-center text-sm">
              <a href="/#about" className="text-foreground hover:text-accent transition-colors">
                About
              </a>
              <a href="/#experience" className="text-foreground hover:text-accent transition-colors">
                Experience
              </a>
              <a href="/#projects" className="text-foreground hover:text-accent transition-colors">
                Projects
              </a>
              <a href="/#publications" className="text-foreground hover:text-accent transition-colors">
                Publications
              </a>
              <a href="/contact" className="text-foreground hover:text-accent transition-colors">
                Contact
              </a>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </>
  );
}
