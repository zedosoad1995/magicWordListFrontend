import "./Login.css";
import { useState } from "react";
import { login } from "../../api/auth";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "../../components/Button/Button";
import { useLoadingCallback } from "../../hooks/useLoadingCallback";

export const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleChangeEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.currentTarget.value);
  };

  const handleChangePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.currentTarget.value);
  };

  const { callback: handleClickButton, isLoading } = useLoadingCallback(
    async () => {
      await login({ email, password });
      localStorage.setItem("loggedIn", "true");
      navigate("/");
    }
  );

  return (
    <div className="login-container">
      <h1>Login</h1>
      <div className="login-field">
        <label>Email</label>
        <input value={email} onChange={handleChangeEmail} type="email" />
      </div>
      <div className="login-field">
        <label>Password</label>
        <input
          value={password}
          onChange={handleChangePassword}
          type="password"
        />
      </div>
      <div>
        <Link className="login-link" to={"/register"}>
          Don't have any account? Sign up here
        </Link>
      </div>
      <div>
        <Button onClick={handleClickButton} isLoading={isLoading}>
          Login
        </Button>
      </div>
    </div>
  );
};
