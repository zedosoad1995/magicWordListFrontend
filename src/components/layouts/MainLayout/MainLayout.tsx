import { Link, Outlet, useNavigate } from "react-router-dom";
import "./MainLayout.css";
import { useEffect, useState } from "react";
import { logout } from "../../../api/auth";

export const MainLayout = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!localStorage.getItem("loggedIn")) {
      navigate("/login");
    }
    setIsLoading(false);
  }, []);

  const handleClickLogout = async () => {
    await logout();
    localStorage.removeItem("loggedIn");
    navigate("/login");
  };

  if (isLoading) {
    return <></>;
  }

  return (
    <>
      <nav className="topbar">
        <div className="links-container">
          <Link to={"/"}>Home</Link>
          <Link to={"/play"}>Play</Link>
          <Link to={"/words"}>Words</Link>
          <Link to={"/settings"}>Settings</Link>
        </div>
        <button onClick={handleClickLogout}>Logout</button>
      </nav>
      <div className="layout-container">
        <Outlet />
      </div>
    </>
  );
};
