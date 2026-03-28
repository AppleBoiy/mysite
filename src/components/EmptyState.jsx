import { motion } from "framer-motion";
import { FileQuestion, Search, Inbox } from "lucide-react";

export default function EmptyState({ 
  icon: Icon = Inbox, 
  title, 
  description, 
  action,
  variant = "default" // "default" | "search"
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col items-center justify-center py-16 px-6 text-center"
    >
      <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-6 ${
        variant === "search" 
          ? "bg-muted/50" 
          : "bg-accent/10"
      }`}>
        <Icon size={32} className={variant === "search" ? "text-muted-foreground" : "text-accent"} />
      </div>
      
      <h3 className="text-xl font-semibold text-foreground mb-2">
        {title}
      </h3>
      
      <p className="text-muted-foreground text-sm max-w-md mb-6">
        {description}
      </p>
      
      {action && (
        <div className="mt-2">
          {action}
        </div>
      )}
    </motion.div>
  );
}
