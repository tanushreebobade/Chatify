import { useState } from "react";
import { getInitials } from "../../lib/format";

const SIZES = {
  sm: { box: "size-9", text: "text-xs", dot: "size-2.5 ring-2" },
  md: { box: "size-11", text: "text-sm", dot: "size-3 ring-2" },
  lg: { box: "size-14", text: "text-base", dot: "size-3.5 ring-[3px]" },
  xl: { box: "size-20", text: "text-xl", dot: "size-4 ring-[3px]" },
};

// A handful of muted hues so initials avatars read as distinct people
// without competing with the lagoon accent.
const HUES = [
  "bg-[#3B4F6B] text-[#DCE6F2]",
  "bg-[#4A3F6B] text-[#E4DCF2]",
  "bg-[#3F5E5A] text-[#D8EFEA]",
  "bg-[#6B4F3B] text-[#F2E6DC]",
  "bg-[#5C3F55] text-[#F2DCEC]",
  "bg-[#3F556B] text-[#DCE9F2]",
];

const hueFor = (seed = "") => {
  let hash = 0;
  for (let i = 0; i < seed.length; i++) hash = (hash * 31 + seed.charCodeAt(i)) | 0;
  return HUES[Math.abs(hash) % HUES.length];
};

function Avatar({ src, name = "", size = "md", online, ringClass = "ring-ink-800", className = "" }) {
  const [failed, setFailed] = useState(false);
  const s = SIZES[size] || SIZES.md;
  const showImage = src && !failed;

  return (
    <span className={`relative inline-flex shrink-0 ${s.box} ${className}`}>
      {showImage ? (
        <img
          src={src}
          alt=""
          onError={() => setFailed(true)}
          className="size-full rounded-full object-cover"
          draggable="false"
        />
      ) : (
        <span
          aria-hidden="true"
          className={`flex size-full select-none items-center justify-center rounded-full font-semibold ${s.text} ${hueFor(name)}`}
        >
          {getInitials(name)}
        </span>
      )}
      {online !== undefined && (
        <span
          aria-hidden="true"
          className={`absolute bottom-0 right-0 rounded-full ${s.dot} ${ringClass} transition-colors duration-300 ${
            online ? "bg-live" : "bg-mist-700"
          }`}
        />
      )}
    </span>
  );
}

export default Avatar;
