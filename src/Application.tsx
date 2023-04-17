import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { callContractGetMethod } from "./Redux/Actions/contract.action";
import { RequireAuth } from "./Routes/Guard/AuthGuard";
import { WithoutAuth } from "./Routes/Guard/NoGuard";
import { Dispatch } from "redux";
import { USDT_ADDRESS } from "./Constant";
import { usdtDecimals, bnbDecimals } from "./Redux/Slices/ico.slice";
import { ErrorBoundary } from "./Components/Common/ErrorBoundary/Errorboundary";
import Loader from "./Components/Common/Loader";
import MainLayout from "./Components/Common/MainLayout/MainLayout";
import Home from "./Components/Pages/Home/Home";
import LandingPage from "./Components/Pages/LandingPage/LandingPage";
import Dashboard from "./Components/Pages/Dashboard/Dashboard";
import ErrorPage from "./Components/Pages/ErrorPage/ErrorPage";
import AuthLayout from "./Components/Common/AuthLayout/AuthLayout";
import Settings from "./Components/Pages/Settings/Settings";
import DesignUi from "./Components/Pages/DesignUi/DesignUi";
import AuthLogin from "./Components/Pages/AuthLogin/AuthLogin";
import BuyToken from "./Components/Pages/BuyToken/BuyToken";
import { connectmetamask } from "./Redux/Actions/user.action";

const Application: React.FC = () => {
  /**CREATE DISPATCH OBJECT */
  const dispatch: Dispatch<any> = useDispatch();

  /**GET STATES FROM STORE */
  const walletAddress = useSelector((state: any) => state?.user?.walletAddress);
  const walletType = useSelector((state: any) => state?.user?.walletType);

  useEffect(() => {
    /**FUNCTION FOR SET DECIMALS ON PAGE LOAD */
    const getDecimals = async () => {
      let getUsdtDecimals: any = await dispatch(
        callContractGetMethod("decimals", [], "dynamic", false, USDT_ADDRESS)
      );
      dispatch(usdtDecimals(10 ** getUsdtDecimals));
      dispatch(bnbDecimals(10 ** 18));
    };

    getDecimals();
  }, [dispatch]);

  useEffect(() => {
    /**CALL CONNECT METAMASK ON PAGE ONLOAD FOR CREATE NEW WEB3 INSTANCE */
    if (walletAddress && walletType === "MetaMask") {
      dispatch(connectmetamask());
    }
  }, [walletAddress, walletType, dispatch]);

  const router = createBrowserRouter([
    {
      path: "/",
      element: <MainLayout />,
      errorElement: <ErrorBoundary />,
      children: [
        {
          index: true,
          element: (
            <WithoutAuth>
              <Home />
            </WithoutAuth>
          ),
        },
        {
          path: "login",
          element: (
            <WithoutAuth>
              <LandingPage />
            </WithoutAuth>
          ),
        },
        {
          path: "*",
          element: <ErrorPage />,
        },
      ],
    },

    {
      path: "/auth",
      element: <AuthLayout />,
      errorElement: <ErrorBoundary />,
      children: [
        {
          index: true,
          element: (
            <RequireAuth>
              <AuthLogin />
            </RequireAuth>
          ),
        },
        {
          path: "dashboard",
          element: (
            <RequireAuth>
              <Dashboard />
            </RequireAuth>
          ),
        },
        {
          path: "buy-token",
          element: <BuyToken />,
        },
        {
          path: "design-ui",
          element: <DesignUi />,
        },
        {
          path: "login",
          element: <AuthLogin />,
        },
        {
          path: "settings",
          element: <Settings />,
        },
      ],
    },
  ]);

  return (
    <>
      <RouterProvider router={router} fallbackElement={<Loader />} />
    </>
  );
};

export default Application;
