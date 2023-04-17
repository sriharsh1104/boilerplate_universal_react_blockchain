import { Outlet } from "react-router-dom";
import Header from "../Header/index";
import "./MainLayout.scss";

const MainLayout = () => {
  return (
    <>
      <Header />
      <main className="main-wrap">
        <Outlet />
      </main>
    </>
  );
};

export default MainLayout;
