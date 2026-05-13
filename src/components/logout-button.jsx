"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { logout } from "@/app/actions/auth";

export default function LogoutButton() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const handleLogout = () => {
    startTransition(async () => {
      await logout();
      router.push("/owner/login");
    });
  };

  return (
    <button
      onClick={handleLogout}
      disabled={isPending}
      className="rounded-full bg-neutral-900 border border-neutral-700 px-4 py-2 text-xs font-semibold uppercase tracking-[0.1em] text-neutral-300 hover:bg-neutral-800 hover:text-amber-500 transition-colors"
    >
      {isPending ? "Logging out..." : "Logout"}
    </button>
  );
}
