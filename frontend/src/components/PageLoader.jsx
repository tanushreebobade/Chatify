import BrandMark from "./ui/BrandMark";

function PageLoader() {
  return (
    <div
      className="flex h-dvh flex-col items-center justify-center gap-5 bg-ink-900"
      role="status"
      aria-label="Loading Chatify"
    >
      <BrandMark size={48} />
      <span className="flex items-center gap-1.5" aria-hidden="true">
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            className="size-1.5 animate-pulse rounded-full bg-lagoon-400"
            style={{ animationDelay: `${i * 160}ms` }}
          />
        ))}
      </span>
    </div>
  );
}

export default PageLoader;
