import { Link } from "react-router-dom";
import { ChevronRight, Home } from "lucide-react";
import { useTranslation } from "react-i18next";

export default function Breadcrumbs({ items }) {
  const { t } = useTranslation();
  const lastItem = items[items.length - 1];

  return (
    <nav aria-label="Breadcrumb" className="py-4">
      {/* Mobile: Show only Home > Last item */}
      <ol className="flex sm:hidden items-center gap-2 text-sm">
        <li className="shrink-0">
          <Link
            to="/"
            className="flex items-center gap-1.5 text-muted-foreground hover:text-foreground transition-colors"
            aria-label={t('breadcrumbs.home')}
          >
            <Home size={16} />
          </Link>
        </li>
        <li className="flex items-center gap-2 min-w-0">
          <ChevronRight size={16} className="text-muted-foreground shrink-0" />
          <span 
            className="text-foreground font-medium truncate" 
            title={lastItem.label}
          >
            {lastItem.label}
          </span>
        </li>
      </ol>

      {/* Desktop: Show full breadcrumb */}
      <ol className="hidden sm:flex items-center gap-2 text-sm">
        <li className="shrink-0">
          <Link
            to="/"
            className="flex items-center gap-1.5 text-muted-foreground hover:text-foreground transition-colors"
          >
            <Home size={16} />
            <span>{t('breadcrumbs.home')}</span>
          </Link>
        </li>
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          
          return (
            <li key={index} className="flex items-center gap-2">
              <ChevronRight size={16} className="text-muted-foreground shrink-0" />
              {isLast ? (
                <span className="text-foreground font-medium">
                  {item.label}
                </span>
              ) : (
                <Link
                  to={item.href}
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  {item.label}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
