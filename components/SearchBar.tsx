'use client';

import { Search } from "lucide-react";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}

export default function SearchBar({ 
  value, 
  onChange, 
  placeholder = "Search...",
  className = ""
}: SearchBarProps) {
  return (
    <div className={`relative ${className}`}>
      <Search 
        size={18} 
        className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none" 
      />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full h-12 pl-11 pr-4 bg-card border border-border rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all"
        aria-label="Search"
      />
    </div>
  );
}
