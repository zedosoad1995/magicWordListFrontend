import { useState } from "react";
import { login } from "../../api/auth";
import { useNavigate } from "react-router-dom";

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
      <button onClick={handleClickButton}>Login</button>
    </div>
  );
};
