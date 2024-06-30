import { Outlet } from "react-router-dom";
import "./MainLayout.css";

export const MainLayout = () => {
  return (
    <div className="layout-container">
      <Outlet />
    </div>
  );
};
