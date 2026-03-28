// Optimized skeleton loaders without Framer Motion
export function SkeletonCard({ className = "" }) {
  return (
    <div className={`bg-card border border-border rounded-2xl p-6 animate-fade-in ${className}`}>
      <div className="animate-pulse space-y-4">
        <div className="h-4 bg-muted rounded w-3/4"></div>
        <div className="h-3 bg-muted rounded w-full"></div>
        <div className="h-3 bg-muted rounded w-5/6"></div>
        <div className="flex gap-2 mt-4">
          <div className="h-6 bg-muted rounded-full w-16"></div>
          <div className="h-6 bg-muted rounded-full w-20"></div>
        </div>
      </div>
    </div>
  );
}

export function SkeletonExperience() {
  return (
    <div className="bg-card border border-border rounded-2xl p-6 sm:p-8 animate-fade-in">
      <div className="animate-pulse space-y-4">
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1 space-y-2">
            <div className="h-3 bg-accent/20 rounded-full w-16"></div>
            <div className="h-5 bg-muted rounded w-3/4"></div>
            <div className="h-4 bg-muted rounded w-1/2"></div>
          </div>
          <div className="space-y-2">
            <div className="h-3 bg-muted rounded w-24"></div>
            <div className="h-3 bg-muted rounded w-20"></div>
          </div>
        </div>
        <div className="space-y-2">
          <div className="h-3 bg-muted rounded w-full"></div>
          <div className="h-3 bg-muted rounded w-5/6"></div>
        </div>
        <div className="flex gap-2">
          <div className="h-6 bg-muted rounded-full w-16"></div>
          <div className="h-6 bg-muted rounded-full w-20"></div>
          <div className="h-6 bg-muted rounded-full w-24"></div>
        </div>
      </div>
    </div>
  );
}

export function SkeletonProject() {
  return (
    <div className="bg-card border border-border rounded-2xl p-6 animate-fade-in">
      <div className="animate-pulse space-y-4">
        <div className="flex items-start justify-between">
          <div className="w-10 h-10 bg-muted rounded-xl"></div>
          <div className="flex gap-3">
            <div className="h-4 bg-muted rounded w-12"></div>
            <div className="h-4 bg-muted rounded w-12"></div>
          </div>
        </div>
        <div className="space-y-2">
          <div className="h-5 bg-muted rounded w-2/3"></div>
          <div className="h-3 bg-muted rounded w-full"></div>
          <div className="h-3 bg-muted rounded w-4/5"></div>
        </div>
        <div className="flex gap-2">
          <div className="h-6 bg-muted rounded-full w-16"></div>
          <div className="h-6 bg-muted rounded-full w-20"></div>
          <div className="h-6 bg-muted rounded-full w-24"></div>
        </div>
      </div>
    </div>
  );
}

export function SkeletonPublication() {
  return (
    <div className="bg-card border border-border rounded-2xl p-6 animate-fade-in">
      <div className="animate-pulse space-y-4">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 bg-muted rounded-lg"></div>
          <div className="h-4 bg-accent/20 rounded-full w-20"></div>
        </div>
        <div className="space-y-2">
          <div className="h-5 bg-muted rounded w-full"></div>
          <div className="h-5 bg-muted rounded w-4/5"></div>
        </div>
        <div className="h-3 bg-muted rounded w-3/4"></div>
        <div className="flex gap-2">
          <div className="h-6 bg-muted rounded-full w-24"></div>
          <div className="h-6 bg-muted rounded-full w-20"></div>
        </div>
      </div>
    </div>
  );
}

export function SkeletonSection() {
  return (
    <section className="py-24 lg:py-32">
      <div className="max-w-6xl mx-auto px-6">
        <div className="animate-pulse space-y-8">
          {/* Section header */}
          <div className="text-center space-y-4">
            <div className="h-3 bg-accent/30 rounded w-32 mx-auto"></div>
            <div className="h-8 bg-muted rounded w-64 mx-auto"></div>
          </div>
          
          {/* Content grid */}
          <div className="grid sm:grid-cols-2 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
