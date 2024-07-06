import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";

export const UnprotectedLayout = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (localStorage.getItem("loggedIn")) {
      navigate("/");
    }
    setIsLoading(false);
  }, []);

  if (isLoading) {
    return <></>;
  }

  return (
    <div className="layout-container">
      <Outlet />
    </div>
  );
};
