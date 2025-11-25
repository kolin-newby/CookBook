import React, { useState } from "react";
import { useNavigate } from "react-router";
import { useAuth } from "../components/auth/AuthContext";

const LoginPage = () => {
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
        navigate("/account");
      }
    });
  };

  return (
    <div className="flex flex-col w-full h-full items-center justify-center">
      <div className="flex flex-col grow px-10 py-10 max-w-[600px] items-center justify-center">
        <span className="flex text-theme-5">
          Get in the Mother FKN Kitchen is a recipe site for our friends and
          family, it is by invite only and is not open to the public. If you are
          one of our friends or family members, hi! Please login below to access
          the recipes and if you have any issues or questions reach out to Kolin
          or Jaiden.
        </span>
      </div>
      <form
        onSubmit={handleLogin}
        className="flex flex-col grow items-center justify-start max-w-[600px] space-y-4 text-theme-5"
      >
        <h2 className="text-3xl">Login</h2>
        <input
          className="flex rounded-[50px] bg-theme-2 py-2 px-10 text-center shadow"
          type="email"
          placeholder="email"
          autoComplete="email"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          className="flex rounded-[50px] bg-theme-2 py-2 px-10 text-center shadow"
          type="password"
          placeholder="password"
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          type="submit"
          className="text-3xl rounded-[50px] bg-theme-3 text-theme-1 py-2 px-10 shadow cursor-pointer transform transition-all duration-300 hover:shadow-lg hover:scale-[103%]"
        >
          <h2>Submit</h2>
        </button>
        {loginError ? (
          <div className="flex font-bol text-red-600">{loginError.message}</div>
        ) : null}
      </form>
    </div>
  );
};

export default LoginPage;
