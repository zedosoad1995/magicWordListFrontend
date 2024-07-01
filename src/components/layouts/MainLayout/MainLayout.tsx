import { Link, Outlet } from "react-router-dom";
import "./MainLayout.css";

export const MainLayout = () => {
  return (
    <>
      <nav className="topbar">
        <Link to={"/"}>Home</Link>
        <Link to={"/play"}>Play</Link>
      </nav>
      <div className="layout-container">
        <Outlet />
      </div>
    </>
  );
};
