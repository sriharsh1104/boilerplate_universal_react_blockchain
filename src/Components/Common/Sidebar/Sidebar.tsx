import React from "react";
import { NavLink } from "react-router-dom";
import {
  DashboardIcon,
  LaptopIcon,
  SettingsIcon,
  UserIcon,
} from "../../../Assets/Images/Icons/SvgIcons";
import "./Sidebar.scss";

const Sidebar = ({ handleSidebar }: { handleSidebar?: () => void }) => {
  const NavLinks = [
    {
      icon: <DashboardIcon />,
      label: "Dashboard",
      to: "/auth/dashboard",
    },
    {
      icon: <LaptopIcon />,
      label: "BuyToken",
      to: "/auth/buy-token",
    },
    {
      icon: <LaptopIcon />,
      label: "Design UI",
      to: "/auth/design-ui",
    },
    {
      icon: <UserIcon />,
      label: "Login",
      to: "/auth/login",
    },
    {
      icon: <SettingsIcon />,
      label: "Settings",
      to: "/auth/settings",
    },
  ];

  return (
    <aside className="sidebar">
      <ul className="sidebar_inner">
        {NavLinks.map((item) => (
          <li key={item.label}>
            <NavLink to={item.to} className="nav_link" onClick={handleSidebar}>
              <span className="nav_link_icon">{item.icon}</span>
              {item.label}
            </NavLink>
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default Sidebar;
