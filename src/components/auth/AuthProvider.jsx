"use client";
import React, { useEffect, useMemo, useState } from "react";
import { AuthCtx } from "./AuthContext";
import { SBClient } from "../supabaseClient";

const ADMIN_IDS = (import.meta.env.VITE_ADMIN_USER_IDS ?? "")
  .split(",")
  .map((s) => s.trim())
  .filter(Boolean);

const computeUser = (supabaseUser) => {
  if (!supabaseUser) return null;

  const role = supabaseUser.app_metadata?.role;
  const isAdminFromRole = role === "admin";
  const isAdminFromList = ADMIN_IDS.includes(supabaseUser.id);

  const isAdmin = isAdminFromRole || isAdminFromList;

  return {
    id: supabaseUser.id,
    email: supabaseUser.email,
    role,
    isAdmin,
  };
};

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isReady, setReady] = useState(false);

  useEffect(() => {
    SBClient.auth.getSession().then(({ data: { session } }) => {
      setUser(computeUser(session?.user ?? null));
      setReady(true);
    });

    const { data: sub } = SBClient.auth.onAuthStateChange((_event, session) => {
      setUser(computeUser(session?.user ?? null));
    });

    return () => sub.subscription.unsubscribe();
  }, []);

  const signInWithEmail = async (email, password) => {
    return await SBClient.auth.signInWithPassword({
      email,
      password,
    });
  };

  const signOut = async () => {
    await SBClient.auth.signOut();
  };

  const value = useMemo(
    () => ({
      user,
      isReady,
      isAdmin: user?.isAdmin ?? false,
      signInWithEmail,
      signOut,
    }),
    [user, isReady]
  );

  return <AuthCtx.Provider value={value}>{children}</AuthCtx.Provider>;
};

export default AuthProvider;
