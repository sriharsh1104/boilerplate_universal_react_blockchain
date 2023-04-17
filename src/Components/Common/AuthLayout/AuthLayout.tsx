import React, { useState } from "react";
import { IdleTimerProvider } from "react-idle-timer";
import { useDispatch } from "react-redux";
import { Outlet } from "react-router-dom";
import Swal from "sweetalert2";
import { logoutUser } from "../../../Redux/Slices/user.slice";
import Header from "../Header";
import Sidebar from "../Sidebar/Sidebar";
import "./AuthLayout.scss";

const AuthLayout = () => {
  const dispatch = useDispatch();
  const [active, setActive] = useState(false);
  const handleSidebar = () => setActive(!active);
  const onIdle = () => {
    localStorage.clear();
    Swal.fire({
      icon: "info",
      title: "Session Expired",
      text: "Your session is expired, You have to login again to continue",
      showCancelButton: false,
      confirmButtonText: "Ok",
    }).then(() => {
      dispatch(logoutUser());
    });
  };
  return (
    <IdleTimerProvider timeout={1000 * 60 * 15} crossTab={true} onIdle={onIdle}>
      <div className={`auth_layout ${active ? "expanded_sidebar" : ""}`}>
        <Header active={active} handleSidebar={handleSidebar} afterLogin />
        <Sidebar handleSidebar={handleSidebar} />
        <div className="auth_layout_inner">
          <Outlet />
        </div>
      </div>
    </IdleTimerProvider>
  );
};

export default AuthLayout;
