import { useId, useState } from "react";
import { EyeIcon, EyeOffIcon } from "lucide-react";

function FormField({ label, icon: Icon, error, hint, type = "text", className = "", ...inputProps }) {
  const id = useId();
  const [reveal, setReveal] = useState(false);
  const isPassword = type === "password";
  const resolvedType = isPassword && reveal ? "text" : type;
  const describedBy = error ? `${id}-error` : hint ? `${id}-hint` : undefined;

  return (
    <div className={className}>
      <label htmlFor={id} className="mb-1.5 block text-sm font-medium text-mist-300">
        {label}
      </label>
      <div className="relative">
        {Icon && (
          <Icon
            className="pointer-events-none absolute left-3.5 top-1/2 size-[18px] -translate-y-1/2 text-mist-700"
            aria-hidden="true"
          />
        )}
        <input
          id={id}
          type={resolvedType}
          aria-invalid={Boolean(error) || undefined}
          aria-describedby={describedBy}
          className={`field ${Icon ? "pl-11" : ""} ${isPassword ? "pr-11" : ""} ${error ? "field-error" : ""}`}
          {...inputProps}
        />
        {isPassword && (
          <button
            type="button"
            onClick={() => setReveal((r) => !r)}
            className="focus-ring absolute right-1.5 top-1/2 flex size-8 -translate-y-1/2 items-center justify-center rounded-lg text-mist-500 hover:text-mist-100"
            aria-label={reveal ? "Hide password" : "Show password"}
            aria-pressed={reveal}
          >
            {reveal ? <EyeOffIcon className="size-[18px]" /> : <EyeIcon className="size-[18px]" />}
          </button>
        )}
      </div>
      {error ? (
        <p id={`${id}-error`} className="mt-1.5 text-[13px] text-danger" role="alert">
          {error}
        </p>
      ) : hint ? (
        <p id={`${id}-hint`} className="mt-1.5 text-[13px] text-mist-700">
          {hint}
        </p>
      ) : null}
    </div>
  );
}

export default FormField;
