import { useState } from "react";
import { ImageOff } from "lucide-react";
import { useLazyLoad } from "@/hooks/useLazyLoad";

export default function OptimizedImage({ 
  src, 
  alt, 
  className = "", 
  width, 
  height,
  priority = false,
  fallbackSrc = null,
  aspectRatio = null // e.g., "16/9", "1/1", "4/3"
}) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const { ref, isVisible } = useLazyLoad();

  const handleError = () => {
    setHasError(true);
    setIsLoaded(true);
  };

  if (hasError && !fallbackSrc) {
    return (
      <div 
        className={`relative overflow-hidden bg-muted flex items-center justify-center ${className}`}
        style={aspectRatio ? { aspectRatio } : {}}
      >
        <div className="text-center p-4">
          <ImageOff size={48} className="text-muted-foreground mx-auto mb-2" />
          <p className="text-sm text-muted-foreground">Image not available</p>
        </div>
      </div>
    );
  }

  return (
    <div 
      ref={ref} 
      className={`relative overflow-hidden ${className}`}
      style={aspectRatio ? { aspectRatio } : {}}
    >
      {/* Enhanced skeleton loader with shimmer effect */}
      {!isLoaded && (isVisible || priority) && (
        <div className="absolute inset-0 bg-muted">
          <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/10 to-transparent" />
          {/* Optional: Add a subtle icon or shape hint */}
          <div className="absolute inset-0 flex items-center justify-center opacity-20">
            <div className="w-12 h-12 rounded-full bg-muted-foreground/20" />
          </div>
        </div>
      )}
      
      {/* Actual image - only load when visible or priority */}
      {(isVisible || priority) && (
        <img
          src={hasError && fallbackSrc ? fallbackSrc : src}
          alt={alt}
          width={width}
          height={height}
          loading={priority ? "eager" : "lazy"}
          decoding="async"
          onLoad={() => setIsLoaded(true)}
          onError={handleError}
          className={`${className} transition-opacity duration-500 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
          style={aspectRatio ? { aspectRatio } : {}}
        />
      )}
    </div>
  );
}
