import { Link, Outlet } from "react-router-dom";
import "./MainLayout.css";

export const MainLayout = () => {
  return (
    <>
      <nav className="topbar">
        <Link to={"/"}>Home</Link>
        <Link to={"/play"}>Play</Link>
        <Link to={"/words"}>Words</Link>
        <Link to={"/settings"}>Settings</Link>
      </nav>
      <div className="layout-container">
        <Outlet />
      </div>
    </>
  );
};
