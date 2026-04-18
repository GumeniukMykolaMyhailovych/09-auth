"use client";

import { useEffect, useState } from "react";
import { useAuthStore } from "@/lib/store/authStore";
import { checkSession } from "@/lib/api/clientApi";

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const setUser = useAuthStore((state) => state.setUser);
  const clearAuth = useAuthStore((state) => state.clearAuth);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initAuth = async () => {
      try {
        const user = await checkSession();

        // якщо користувач є
        if (user && user.email) {
          setUser(user);
        } else {
          clearAuth();
        }
      } catch (error) {
        // якщо помилка — просто вважаємо що не залогінений
        clearAuth();
      } finally {
        setLoading(false);
      }
    };

    initAuth();
  }, [setUser, clearAuth]);

  // не рендеримо нічого поки перевіряємо сесію
  if (loading) {
    return null;
  }

  return <>{children}</>;
}