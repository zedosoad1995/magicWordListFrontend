import { useState } from "react";
import { login } from "../../api/auth";
import { Link, useNavigate } from "react-router-dom";

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

  const handleClickButton = async () => {
    await login({ email, password });
    localStorage.setItem("loggedIn", "true");
    navigate("/");
  };

  return (
    <div>
      <div>
        <label>Email</label>
        <input value={email} onChange={handleChangeEmail} type="email" />
      </div>
      <div>
        <label>Password</label>
        <input
          value={password}
          onChange={handleChangePassword}
          type="password"
        />
      </div>
      <div>
        <Link to={"/register"}>Don't have any account? Sign up here</Link>
      </div>
      <button onClick={handleClickButton}>Login</button>
    </div>
  );
};
