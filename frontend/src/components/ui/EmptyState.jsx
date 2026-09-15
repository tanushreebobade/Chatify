function EmptyState({ icon: Icon, title, description, action, compact = false, className = "" }) {
  return (
    <div
      className={`flex flex-col items-center justify-center text-center animate-fade-in ${
        compact ? "px-6 py-10" : "h-full p-8"
      } ${className}`}
    >
      {Icon && (
        <span className="mb-4 flex size-12 items-center justify-center rounded-2xl bg-ink-700 text-lagoon-400">
          <Icon className="size-6" aria-hidden="true" />
        </span>
      )}
      <h3 className={`font-semibold text-mist-100 ${compact ? "text-[15px]" : "text-lg"}`}>{title}</h3>
      {description && (
        <p className={`mt-1.5 max-w-xs text-mist-500 ${compact ? "text-[13px]" : "text-sm"}`}>{description}</p>
      )}
      {action && <div className="mt-5">{action}</div>}
    </div>
  );
}

export default EmptyState;
