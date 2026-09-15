import BrandMark from "../ui/BrandMark";

// Left: a typographic statement and two of Chatify's own bubbles so the
// product style is visible before signing in. Right: the form.
function AuthLayout({ title, subtitle, children, footer }) {
  return (
    <div className="min-h-dvh bg-ink-900 lg:grid lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)]">
      <aside className="relative hidden flex-col justify-between overflow-hidden border-r border-ink-600/60 bg-ink-800 p-10 lg:flex xl:p-14">
        <BrandMark size={34} withWordmark />

        <div className="my-16">
          <h1 className="max-w-md text-4xl font-bold leading-[1.1] tracking-tight text-mist-100 xl:text-5xl">
            Talk in real time. Nothing in the way.
          </h1>
          <p className="mt-5 max-w-sm text-[15px] leading-relaxed text-mist-500">
            One-to-one messages, photos and presence — delivered the moment they're sent.
          </p>

          <div className="mt-12 max-w-sm space-y-2" aria-hidden="true">
            <div className="flex justify-start animate-rise-in [animation-delay:120ms]">
              <span className="rounded-bubble rounded-bl-md bg-ink-700 px-3.5 py-2 text-[15px] text-mist-100">
                Are you around?
              </span>
            </div>
            <div className="flex justify-end animate-rise-in [animation-delay:420ms]">
              <span className="rounded-bubble rounded-br-md bg-lagoon-700 px-3.5 py-2 text-[15px] text-white">
                Just signed in. What's up?
              </span>
            </div>
          </div>
        </div>

        <p className="text-xs text-mist-700">Chatify</p>
      </aside>

      <main className="flex min-h-dvh flex-col justify-center px-5 py-10 sm:px-10 lg:min-h-0">
        <div className="mx-auto w-full max-w-[400px] animate-rise-in">
          <BrandMark size={40} className="mb-8 lg:hidden" />
          <h2 className="text-2xl font-bold tracking-tight text-mist-100">{title}</h2>
          <p className="mt-1.5 text-[15px] text-mist-500">{subtitle}</p>
          <div className="mt-8">{children}</div>
          {footer && <p className="mt-8 text-center text-sm text-mist-500">{footer}</p>}
        </div>
      </main>
    </div>
  );
}

export default AuthLayout;
