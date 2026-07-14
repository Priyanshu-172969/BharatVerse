export function SkeletonCard({ className = '' }: { className?: string }) {
  return (
    <div className={`skeleton ${className}`}>
      <div className="space-y-3 p-5">
        <div className="h-12 w-12 rounded-xl bg-white/[0.04]" />
        <div className="h-5 w-3/4 rounded bg-white/[0.04]" />
        <div className="h-3 w-full rounded bg-white/[0.03]" />
        <div className="h-3 w-2/3 rounded bg-white/[0.03]" />
        <div className="flex justify-between border-t border-white/[0.04] pt-3">
          <div className="h-3 w-20 rounded bg-white/[0.03]" />
          <div className="h-3 w-12 rounded bg-white/[0.03]" />
        </div>
      </div>
    </div>
  );
}

export function SkeletonTimeline({ className = '' }: { className?: string }) {
  return (
    <div className={`skeleton ${className}`}>
      <div className="flex h-full items-center justify-center">
        <div className="w-full px-8">
          <div className="mb-4 h-px w-full bg-white/[0.06]" />
          <div className="flex justify-between">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="flex flex-col items-center gap-2">
                <div className="h-3 w-3 rounded-full bg-white/[0.06]" />
                <div className="h-2 w-12 rounded bg-white/[0.04]" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export function SkeletonArticle({ className = '' }: { className?: string }) {
  return (
    <div className={`skeleton ${className}`}>
      <div className="space-y-4 p-8">
        <div className="h-8 w-32 rounded bg-white/[0.04]" />
        <div className="h-10 w-3/4 rounded bg-white/[0.04]" />
        <div className="h-4 w-full rounded bg-white/[0.03]" />
        <div className="h-4 w-full rounded bg-white/[0.03]" />
        <div className="h-4 w-5/6 rounded bg-white/[0.03]" />
        <div className="h-4 w-full rounded bg-white/[0.03]" />
        <div className="h-4 w-2/3 rounded bg-white/[0.03]" />
      </div>
    </div>
  );
}

export function SkeletonGrid({ count = 6 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: count }).map((_, i) => (
        <SkeletonCard key={i} />
      ))}
    </div>
  );
}
