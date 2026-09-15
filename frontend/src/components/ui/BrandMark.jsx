function BrandMark({ size = 32, withWordmark = false, className = "" }) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <svg
        width={size}
        height={size}
        viewBox="0 0 64 64"
        fill="none"
        aria-hidden="true"
        className="shrink-0"
      >
        <rect width="64" height="64" rx="16" className="fill-ink-700" />
        <path
          d="M32 14c-10.5 0-19 7.4-19 16.5 0 4.3 1.9 8.2 5 11.1L15.5 50l10.4-4.3c1.9.5 4 .8 6.1.8 10.5 0 19-7.4 19-16.5S42.5 14 32 14Z"
          className="fill-lagoon-400"
        />
        <circle cx="24.5" cy="30.5" r="2.6" className="fill-ink-900" />
        <circle cx="32" cy="30.5" r="2.6" className="fill-ink-900" />
        <circle cx="39.5" cy="30.5" r="2.6" className="fill-ink-900" />
      </svg>
      {withWordmark && (
        <span className="text-lg font-bold tracking-tight text-mist-100">Chatify</span>
      )}
    </span>
  );
}

export default BrandMark;
