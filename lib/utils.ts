import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Check if the current page is running inside an iframe
 * SSR-safe: returns false on server, checks window on client
 */
export const isIframe = (): boolean => {
  if (typeof window === 'undefined') {
    return false;
  }
  return window.self !== window.top;
};
