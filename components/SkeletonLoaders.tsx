export function ExperienceSkeleton() {
  return (
    <section className="py-24 lg:py-32">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16 animate-pulse">
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="h-px w-10 bg-accent/30"></div>
            <div className="h-3 bg-accent/30 rounded w-24"></div>
            <div className="h-px w-10 bg-accent/30"></div>
          </div>
          <div className="h-8 bg-muted rounded w-64 mx-auto"></div>
        </div>
        <div className="space-y-8">
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-card border border-border rounded-2xl p-6 animate-pulse">
              <div className="h-6 bg-muted rounded w-48 mb-2"></div>
              <div className="h-4 bg-muted rounded w-64 mb-4"></div>
              <div className="space-y-2">
                <div className="h-3 bg-muted rounded w-full"></div>
                <div className="h-3 bg-muted rounded w-5/6"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function SkillsSkeleton() {
  return (
    <section className="py-24 lg:py-32">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16 animate-pulse">
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="h-px w-10 bg-accent/30"></div>
            <div className="h-3 bg-accent/30 rounded w-24"></div>
            <div className="h-px w-10 bg-accent/30"></div>
          </div>
          <div className="h-8 bg-muted rounded w-64 mx-auto"></div>
        </div>
        <div className="grid sm:grid-cols-2 gap-8">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-[240px] bg-card border border-border rounded-2xl p-6 animate-pulse">
              <div className="h-6 bg-muted rounded w-32 mb-4"></div>
              <div className="flex flex-wrap gap-2">
                {[1, 2, 3, 4].map((j) => (
                  <div key={j} className="h-8 bg-muted rounded-full w-20"></div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function ProjectsSkeleton() {
  return (
    <section className="py-24 lg:py-32">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16 animate-pulse">
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="h-px w-10 bg-accent/30"></div>
            <div className="h-3 bg-accent/30 rounded w-24"></div>
            <div className="h-px w-10 bg-accent/30"></div>
          </div>
          <div className="h-8 bg-muted rounded w-64 mx-auto"></div>
        </div>
        <div className="grid sm:grid-cols-2 gap-6">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="bg-card border border-border rounded-2xl p-6 animate-pulse">
              <div className="h-6 bg-muted rounded w-3/4 mb-3"></div>
              <div className="space-y-2 mb-4">
                <div className="h-3 bg-muted rounded w-full"></div>
                <div className="h-3 bg-muted rounded w-5/6"></div>
              </div>
              <div className="flex gap-2">
                <div className="h-8 bg-muted rounded w-16"></div>
                <div className="h-8 bg-muted rounded w-16"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function AcademicSkeleton() {
  return (
    <section className="py-24 lg:py-32 bg-muted/30">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16 animate-pulse">
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="h-px w-10 bg-accent/30"></div>
            <div className="h-3 bg-accent/30 rounded w-24"></div>
            <div className="h-px w-10 bg-accent/30"></div>
          </div>
          <div className="h-8 bg-muted rounded w-64 mx-auto"></div>
        </div>
        <div className="space-y-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-card border border-border rounded-2xl p-6 animate-pulse">
              <div className="h-6 bg-muted rounded w-3/4 mb-3"></div>
              <div className="h-4 bg-muted rounded w-48 mb-4"></div>
              <div className="space-y-2">
                <div className="h-3 bg-muted rounded w-full"></div>
                <div className="h-3 bg-muted rounded w-5/6"></div>
                <div className="h-3 bg-muted rounded w-4/5"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
