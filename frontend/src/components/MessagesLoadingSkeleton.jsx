const ROWS = [
  { mine: false, w: "w-48" },
  { mine: false, w: "w-64" },
  { mine: true, w: "w-40" },
  { mine: false, w: "w-56" },
  { mine: true, w: "w-72" },
  { mine: true, w: "w-32" },
];

function MessagesLoadingSkeleton() {
  return (
    <div className="flex-1 overflow-hidden px-3 py-4 sm:px-6" aria-busy="true" aria-label="Loading messages">
      <div className="mx-auto max-w-3xl space-y-2">
        {ROWS.map((row, i) => (
          <div key={i} className={`flex ${row.mine ? "justify-end" : "justify-start"}`}>
            <span
              className={`skeleton h-10 max-w-[75%] ${row.w} ${row.mine ? "rounded-bubble rounded-br-md" : "rounded-bubble rounded-bl-md"}`}
              style={{ opacity: 1 - i * 0.1 }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default MessagesLoadingSkeleton;
