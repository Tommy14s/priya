"use client";

import { useState, useTransition } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { login } from "@/app/actions/auth";

export default function LoginPage() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    const formData = new FormData(e.currentTarget);

    startTransition(async () => {
      const result = await login(formData);
      if (result.success) {
        router.push("/owner/dashboard");
      } else {
        setError(result.error);
      }
    });
  };

  return (
    <main className="min-h-screen bg-[linear-gradient(180deg,#fcf9f8_0%,#f5f1ea_100%)] text-on-surface">
      <header className="border-b border-outline-variant/40 bg-surface/90 px-5 py-5 backdrop-blur md:px-10 lg:px-20">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4">
          <Link className="font-display text-3xl leading-none text-secondary md:text-4xl" href="/">
            Priya Thai Massage
          </Link>
          <Link
            className="rounded-full border border-primary/20 bg-surface px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-primary transition hover:border-primary hover:bg-surface-container-low"
            href="/"
          >
            Back home
          </Link>
        </div>
      </header>

      <section className="mx-auto flex min-h-[calc(100vh-82px)] w-full max-w-6xl items-center justify-center px-5 py-10 md:px-10 lg:px-20 lg:py-16">
        <div className="grid w-full max-w-5xl grid-cols-1 items-center gap-10 lg:grid-cols-[0.88fr,0.96fr]">
          <div className="mx-auto flex w-full max-w-xl flex-col justify-center text-center lg:mx-0 lg:text-left">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-secondary">
            Admin Access
          </p>
          <h1 className="mt-4 font-display text-5xl leading-none text-[#3f3200] md:text-6xl">
            Manage bookings with calm clarity.
          </h1>
          <p className="mt-5 max-w-xl text-base leading-7 text-on-surface-variant">
            Sign in to review orders, payment status, upcoming appointments, and owner notifications.
          </p>
          </div>

          <div className="flex items-center justify-center">
          <form
            className="w-full max-w-[28rem] rounded-lg border border-outline-variant/50 bg-surface-container-lowest p-6 shadow-[0_24px_70px_rgba(85,67,0,0.14)] md:p-8"
            onSubmit={handleSubmit}
          >
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-secondary">
                Secure Sign In
              </p>
              <h2 className="mt-3 font-display text-4xl leading-none text-[#3f3200]">
                Admin Login
              </h2>
              <p className="mt-3 text-sm leading-6 text-on-surface-variant">
                Use your owner credentials to open the dashboard.
              </p>
            </div>

            <div className="mt-7 space-y-4">
              <div className="space-y-2">
                <label
                  className="block text-xs font-semibold uppercase tracking-[0.14em] text-outline"
                  htmlFor="username"
                >
                  Username
                </label>
                <div className="relative">
                  <span className="material-symbols-outlined pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-xl text-secondary">
                    person
                  </span>
                  <input
                    autoComplete="username"
                    className="block h-11 w-full rounded-lg border border-outline-variant/70 bg-surface px-11 text-sm text-on-surface shadow-sm outline-none transition placeholder:text-outline focus:border-primary focus:ring-2 focus:ring-primary-container/30 disabled:opacity-60"
                    disabled={isPending}
                    id="username"
                    name="username"
                    placeholder="Enter your username"
                    required
                    type="text"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label
                  className="block text-xs font-semibold uppercase tracking-[0.14em] text-outline"
                  htmlFor="password"
                >
                  Password
                </label>
                <div className="relative">
                  <span className="material-symbols-outlined pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-xl text-secondary">
                    key
                  </span>
                  <input
                    autoComplete="current-password"
                    className="block h-11 w-full rounded-lg border border-outline-variant/70 bg-surface px-11 pr-12 text-sm text-on-surface shadow-sm outline-none transition placeholder:text-outline focus:border-primary focus:ring-2 focus:ring-primary-container/30 disabled:opacity-60"
                    disabled={isPending}
                    id="password"
                    name="password"
                    placeholder="Enter your password"
                    required
                    type={showPassword ? "text" : "password"}
                  />
                  <button
                    aria-label={showPassword ? "Hide password" : "Show password"}
                    className="absolute right-2 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-md text-outline transition hover:bg-surface-container-low hover:text-primary disabled:opacity-60"
                    disabled={isPending}
                    onClick={() => setShowPassword((visible) => !visible)}
                    type="button"
                  >
                    <span className="material-symbols-outlined text-xl">
                      {showPassword ? "visibility_off" : "visibility"}
                    </span>
                  </button>
                </div>
              </div>
            </div>

            {error ? (
              <div className="mt-5 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
                {error}
              </div>
            ) : null}

            <button
              className="mt-6 flex h-11 w-full items-center justify-center gap-2 rounded-lg bg-neutral-950 px-5 text-sm font-semibold uppercase tracking-[0.14em] text-white shadow-sm transition hover:bg-[#3f3200] disabled:cursor-not-allowed disabled:opacity-60"
              disabled={isPending}
              type="submit"
            >
              {isPending ? "Signing in..." : "Sign in"}
              <span className="material-symbols-outlined text-lg">
                arrow_forward
              </span>
            </button>
          </form>
        </div>
        </div>
      </section>
    </main>
  );
}
