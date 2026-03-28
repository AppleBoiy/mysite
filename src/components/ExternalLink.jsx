import { useState } from "react";
import { ExternalLink as ExternalLinkIcon, Loader2 } from "lucide-react";

export default function ExternalLink({ 
  href, 
  children, 
  className = "",
  showIcon = true,
  ...props 
}) {
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = (e) => {
    setIsLoading(true);
    
    // Reset loading state after a short delay
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  };

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      onClick={handleClick}
      className={`inline-flex items-center gap-1.5 transition-colors ${className}`}
      {...props}
    >
      {children}
      {showIcon && (
        isLoading ? (
          <Loader2 size={14} className="animate-spin" />
        ) : (
          <ExternalLinkIcon size={14} />
        )
      )}
    </a>
  );
}
