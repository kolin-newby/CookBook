import React, { useState } from "react";
import { useNavigate } from "react-router";
import { useAuth } from "../components/auth/AuthContext";

const SignInPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState(null);

  const { signInWithEmail } = useAuth();
  const navigate = useNavigate();

  const handleLogin = (event) => {
    event.preventDefault();

    signInWithEmail(username, password).then((data) => {
      if (data?.error) setLoginError(data?.error);
      else {
        setLoginError(null);
        navigate("/admin");
      }
    });
  };

  return (
    <form
      onSubmit={handleLogin}
      className="flex flex-col items-center justify-center w-full h-full space-y-4 text-theme-5"
    >
      <h2 className="text-3xl">Login</h2>
      <input
        className="flex rounded-full bg-theme-2 py-2 px-10 text-center shadow"
        type="email"
        placeholder="email"
        autoComplete="email"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        className="flex rounded-full bg-theme-2 py-2 px-10 text-center shadow"
        type="password"
        placeholder="password"
        autoComplete="current-password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button
        type="submit"
        className="text-3xl rounded-full bg-theme-3 text-theme-1 py-2 px-10 shadow cursor-pointer transform transition-all duration-300 hover:shadow-lg hover:scale-[103%]"
      >
        <h2>Submit</h2>
      </button>
      {loginError ? (
        <div className="flex font-bol text-red-600">{loginError.message}</div>
      ) : null}
    </form>
  );
};

export default SignInPage;
