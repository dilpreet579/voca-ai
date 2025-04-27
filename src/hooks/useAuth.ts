"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export function useAuth({ required = false, redirectTo = "/login" } = {}) {
  const { data: session, status } = useSession();
  const router = useRouter();
  const loading = status === "loading";
  const authenticated = status === "authenticated";
  const unauthenticated = status === "unauthenticated";

  useEffect(() => {
    // If auth is required and user is not authenticated, redirect to login
    if (required && unauthenticated) {
      router.push(redirectTo);
    }
  }, [required, unauthenticated, router, redirectTo]);

  return {
    session,
    loading,
    authenticated,
    unauthenticated,
  };
}

export default useAuth;
