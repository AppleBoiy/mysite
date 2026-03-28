import { Zap, ZapOff, Wifi, WifiOff } from "lucide-react";
import { useNetworkStatus } from "@/hooks/useNetworkStatus";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function LiteModeToggle({ liteMode, setLiteMode }) {
  const { isOnline, isSlowConnection, effectiveType } = useNetworkStatus();
  const [hasShownToast, setHasShownToast] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);

  // Auto-enable lite mode on slow connections
  useEffect(() => {
    if (isSlowConnection && !liteMode && !hasShownToast) {
      setLiteMode(true);
      setHasShownToast(true);
      
      toast.info('Lite mode enabled', {
        description: 'Optimized for your connection speed',
        duration: 4000,
      });
    }
  }, [isSlowConnection, liteMode, hasShownToast, setLiteMode]);

  const getTooltipText = () => {
    if (liteMode) {
      return "Lite mode active - Faster loading, reduced animations";
    }
    if (isSlowConnection) {
      return "Enable lite mode - Recommended for your connection";
    }
    return "Enable lite mode - Optimized for slow connections";
  };

  return (
    <div className="flex items-center gap-2">
      {/* Connection indicator */}
      <div className="hidden sm:flex items-center gap-1.5 text-xs text-muted-foreground">
        {isOnline ? (
          <>
            <Wifi size={14} className={isSlowConnection ? 'text-orange-500' : 'text-green-500'} />
            <span className="capitalize">{effectiveType}</span>
          </>
        ) : (
          <>
            <WifiOff size={14} className="text-red-500" />
            <span>Offline</span>
          </>
        )}
      </div>

      {/* Lite mode toggle with tooltip */}
      <div 
        className="relative"
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
      >
        <button
          onClick={() => setLiteMode(!liteMode)}
          className={`w-9 h-9 rounded-full flex items-center justify-center transition-colors ${
            liteMode 
              ? 'bg-accent text-accent-foreground' 
              : 'bg-muted hover:bg-accent/20 text-foreground'
          }`}
          aria-label={liteMode ? "Disable lite mode" : "Enable lite mode"}
        >
          {liteMode ? (
            <Zap size={18} />
          ) : (
            <ZapOff size={18} />
          )}
        </button>

        {/* Tooltip */}
        {showTooltip && (
          <div className="absolute top-full mt-2 right-0 z-50 px-3 py-2 bg-popover text-popover-foreground text-xs rounded-lg shadow-lg border border-border whitespace-nowrap animate-fade-in">
            {getTooltipText()}
            <div className="absolute -top-1 right-3 w-2 h-2 bg-popover border-l border-t border-border rotate-45" />
          </div>
        )}
      </div>
    </div>
  );
}
