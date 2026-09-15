const DAY_MS = 24 * 60 * 60 * 1000;

const timeFormatter = new Intl.DateTimeFormat(undefined, { hour: "numeric", minute: "2-digit" });
const weekdayFormatter = new Intl.DateTimeFormat(undefined, { weekday: "short" });
const monthDayFormatter = new Intl.DateTimeFormat(undefined, { month: "short", day: "numeric" });
const fullDateFormatter = new Intl.DateTimeFormat(undefined, {
  weekday: "short",
  month: "short",
  day: "numeric",
});
const fullDateYearFormatter = new Intl.DateTimeFormat(undefined, {
  month: "short",
  day: "numeric",
  year: "numeric",
});

const startOfDay = (date) => new Date(date.getFullYear(), date.getMonth(), date.getDate());

export const isSameDay = (a, b) => startOfDay(new Date(a)).getTime() === startOfDay(new Date(b)).getTime();

export const formatTime = (value) => timeFormatter.format(new Date(value));

// Compact stamp for list rows: time today, weekday this week, otherwise date.
export const formatListTime = (value) => {
  if (!value) return "";
  const date = new Date(value);
  const now = new Date();
  const dayDiff = Math.round((startOfDay(now) - startOfDay(date)) / DAY_MS);

  if (dayDiff <= 0) return timeFormatter.format(date);
  if (dayDiff === 1) return "Yesterday";
  if (dayDiff < 7) return weekdayFormatter.format(date);
  if (date.getFullYear() === now.getFullYear()) return monthDayFormatter.format(date);
  return fullDateYearFormatter.format(date);
};

// Label for the separator between days in a conversation.
export const formatDayLabel = (value) => {
  const date = new Date(value);
  const now = new Date();
  const dayDiff = Math.round((startOfDay(now) - startOfDay(date)) / DAY_MS);

  if (dayDiff <= 0) return "Today";
  if (dayDiff === 1) return "Yesterday";
  if (date.getFullYear() === now.getFullYear()) return fullDateFormatter.format(date);
  return fullDateYearFormatter.format(date);
};

export const getInitials = (name = "") => {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return "?";
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
};
