'use client';

interface HapticFeedback {
  light: () => void;
  medium: () => void;
  strong: () => void;
  success: () => void;
  error: () => void;
  warning: () => void;
}

interface UseHapticReturn {
  haptic: HapticFeedback;
  isSupported: boolean;
}

/**
 * Custom hook for haptic feedback on mobile devices
 * Provides different vibration patterns for various interactions
 */
export function useHaptic(): UseHapticReturn {
  const isSupported = typeof navigator !== 'undefined' && 'vibrate' in navigator;

  const haptic: HapticFeedback = {
    // Light tap for button presses
    light: () => {
      if (isSupported) navigator.vibrate(10);
    },

    // Medium feedback for selections
    medium: () => {
      if (isSupported) navigator.vibrate(20);
    },

    // Strong feedback for important actions
    strong: () => {
      if (isSupported) navigator.vibrate(50);
    },

    // Success pattern
    success: () => {
      if (isSupported) navigator.vibrate([10, 50, 10]);
    },

    // Error pattern
    error: () => {
      if (isSupported) navigator.vibrate([50, 100, 50]);
    },

    // Warning pattern
    warning: () => {
      if (isSupported) navigator.vibrate([30, 50, 30]);
    },
  };

  return { haptic, isSupported };
}
