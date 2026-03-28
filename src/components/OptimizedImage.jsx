import { useState } from "react";
import { ImageOff } from "lucide-react";

export default function OptimizedImage({ 
  src, 
  alt, 
  className = "", 
  width, 
  height,
  priority = false,
  fallbackSrc = null
}) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  const handleError = () => {
    setHasError(true);
    setIsLoaded(true);
  };

  if (hasError && !fallbackSrc) {
    return (
      <div className={`relative overflow-hidden bg-muted flex items-center justify-center ${className}`}>
        <div className="text-center p-4">
          <ImageOff size={48} className="text-muted-foreground mx-auto mb-2" />
          <p className="text-sm text-muted-foreground">Image not available</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {/* Blur placeholder */}
      {!isLoaded && (
        <div className="absolute inset-0 bg-muted animate-pulse" />
      )}
      
      {/* Actual image */}
      <img
        src={hasError && fallbackSrc ? fallbackSrc : src}
        alt={alt}
        width={width}
        height={height}
        loading={priority ? "eager" : "lazy"}
        decoding="async"
        onLoad={() => setIsLoaded(true)}
        onError={handleError}
        className={`${className} transition-opacity duration-300 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
      />
    </div>
  );
}
