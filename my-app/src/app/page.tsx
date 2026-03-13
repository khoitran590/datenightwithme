"use client";

import { useEffect, useState } from "react";

const TAPS_TO_OPEN = 20;

export default function Home() {
  const [taps, setTaps] = useState(0);
  const [opened, setOpened] = useState(false);
  const [opening, setOpening] = useState(false);
  const [answer, setAnswer] = useState<"yes" | "no" | null>(null);

  useEffect(() => {
    if (!opened) return;
    setOpening(true);
    const t = setTimeout(() => setOpening(false), 900);
    return () => clearTimeout(t);
  }, [opened]);

  function handleTap() {
    if (opened) return;
    setTaps((prev) => {
      const next = prev + 1;
      if (next >= TAPS_TO_OPEN) setOpened(true);
      return next;
    });
  }

  function resetInvitation() {
    setTaps(0);
    setOpened(false);
    setOpening(false);
    setAnswer(null);
  }

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-pink-100 px-6 py-16 text-zinc-900">
      <main className="w-full max-w-2xl">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-semibold tracking-tight">Can I take my princess out on a little date night?</h1>
        </div>

        <div
          role="button"
          tabIndex={opened ? -1 : 0}
          onPointerDown={() => handleTap()}
          onKeyDown={(e) => {
            if (opened) return;
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              handleTap();
            }
          }}
          aria-label={opened ? "Invitation opened" : "Tap to open invitation"}
          aria-disabled={opened}
          className={[
            "group relative mx-auto w-full max-w-2xl select-none rounded-3xl border border-black/10 bg-white/80 p-0 text-left shadow-xl shadow-pink-300/40 backdrop-blur",
            "transition-transform active:scale-[0.99]",
            opened ? "cursor-default" : "cursor-pointer",
          ].join(" ")}
        >
          <div className="relative overflow-hidden rounded-3xl">
            {/* Envelope back */}
            <div className="h-[420px] bg-gradient-to-br from-pink-200 via-pink-100 to-pink-50" />

            {/* Envelope label */}
            <div className="pointer-events-none absolute inset-x-0 top-[232px] z-10 text-center">
              <div className="inline-flex rounded-full bg-white/70 px-4 py-1.5 text-xs font-semibold tracking-wide text-pink-700 shadow-sm ring-1 ring-pink-200/70 backdrop-blur">
                For you, my princess
              </div>
            </div>

            {/* Envelope flap */}
            <div
              className={[
                "z-20",
                "pointer-events-none absolute inset-x-0 top-0 mx-auto h-36 w-[110%] origin-top",
                "bg-gradient-to-b from-white/80 to-white/10",
                opening
                  ? "animate-[dn-flap-pop_900ms_ease-out_forwards]"
                  : "transition-transform duration-700",
                opened ? "-translate-y-10 rotate-[-18deg]" : "translate-y-0 rotate-0",
              ].join(" ")}
              style={{ clipPath: "polygon(0 0, 100% 0, 50% 100%)" }}
            />

            {/* Wax seal */}
            <div
              className={[
                "z-30",
                "pointer-events-none absolute left-1/2 top-[118px] flex h-14 w-14 -translate-x-1/2 items-center justify-center rounded-full",
                "bg-sky-200 text-sky-900 shadow-lg shadow-sky-200/60 ring-4 ring-white/70",
                "transition-all duration-700",
                opened ? "scale-75 opacity-0" : "scale-100 opacity-100",
              ].join(" ")}
            >
              <span className="text-lg font-semibold tracking-tight">J</span>
            </div>

            {/* Letter */}
            <div
              className={[
                "absolute inset-x-8 bottom-10 z-10 max-h-[420px] overflow-y-auto rounded-2xl border border-black/10 bg-white p-6 shadow-md shadow-black/5",
                opening
                  ? "animate-[dn-letter-rise_900ms_cubic-bezier(0.2,0.9,0.2,1)_forwards]"
                  : "transition-transform duration-700",
                opened ? "translate-y-0" : "translate-y-24",
              ].join(" ")}
            >
              {!opened ? null : answer === "yes" ? (
                <div className="rounded-2xl border border-pink-200/80 bg-gradient-to-br from-pink-50 via-pink-100 to-rose-50 p-5 text-center text-base font-semibold text-pink-900 shadow-sm">
                  YAYYYYYY I'm excited to take my princess out on a date nightttttttt!!!!
                </div>
              ) : answer === null ? (
                <div className="space-y-5">
                  <div className="space-y-2 rounded-2xl border border-pink-100 bg-pink-50/70 p-5 shadow-sm">
                    <div className="text-xs font-semibold uppercase tracking-[0.16em] text-pink-700">
                      Dear princess,
                    </div>
                    <div className="text-lg font-semibold leading-snug text-zinc-900">
                      Would you like to go on a date night with me?
                    </div>
                  </div>
                  <div className="flex gap-3 pt-1">
                    <button
                      type="button"
                      onClick={() => setAnswer("yes")}
                      className="flex-1 rounded-full bg-pink-600 px-4 py-3 text-center text-sm font-semibold text-white shadow-sm transition-colors hover:bg-pink-700"
                    >
                      Yes
                    </button>
                    <button
                      type="button"
                      onClick={() => setAnswer("no")}
                      className="flex-1 rounded-full border border-pink-200 bg-white px-4 py-3 text-center text-sm font-semibold text-zinc-900 shadow-sm transition-colors hover:bg-pink-50"
                    >
                      No
                    </button>
                  </div>
                </div>
              ) : (
                <div className="rounded-2xl border border-pink-200/80 bg-gradient-to-br from-pink-50 via-pink-100 to-rose-50 p-5 text-sm text-zinc-800 shadow-sm">
                  No, I will not stay home tonight and go with my boyfriend instead!!!
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="mt-4 flex justify-center">
          <button
            type="button"
            onClick={resetInvitation}
            className="rounded-full border border-pink-300 bg-white/70 px-4 py-2 text-xs font-medium text-pink-700 shadow-sm backdrop-blur transition-colors hover:bg-pink-50"
          >
            Restart invitation
          </button>
        </div>

        <div className="mt-3 text-center text-[11px] text-zinc-500">
          (Tap the envelope to open.)
        </div>
      </main>
    </div>
  );
}
