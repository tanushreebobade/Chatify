function UsersLoadingSkeleton({ rows = 6 }) {
  return (
    <ul className="py-1" aria-busy="true" aria-label="Loading">
      {Array.from({ length: rows }).map((_, i) => (
        <li key={i} className="flex items-center gap-3 px-4 py-2.5" style={{ opacity: 1 - i * 0.12 }}>
          <span className="skeleton size-11 shrink-0 rounded-full" />
          <span className="flex min-w-0 flex-1 flex-col gap-2">
            <span className="flex items-center justify-between gap-3">
              <span className="skeleton h-3.5 w-[45%]" />
              <span className="skeleton h-2.5 w-8" />
            </span>
            <span className="skeleton h-3 w-[70%]" />
          </span>
        </li>
      ))}
    </ul>
  );
}

export default UsersLoadingSkeleton;
