"use client";
import React, { useEffect, useMemo, useState } from "react";
import { AuthCtx } from "./AuthContext";
import { SBClient } from "../supabaseClient";

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isReady, setReady] = useState(false);

  useEffect(() => {
    SBClient.auth.getSession().then(({ data: { session } }) => {
      setUser(
        session?.user
          ? { id: session.user.id, email: session.user.email }
          : null
      );
      setReady(true);
    });

    const { data: sub } = SBClient.auth.onAuthStateChange((_event, session) => {
      setUser(
        session?.user
          ? { id: session.user.id, email: session.user.email }
          : null
      );
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
    () => ({ user, isReady, signInWithEmail, signOut }),
    [user, isReady]
  );

  return <AuthCtx.Provider value={value}>{children}</AuthCtx.Provider>;
};

export default AuthProvider;
