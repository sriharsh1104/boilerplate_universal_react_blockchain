/* eslint-disable testing-library/no-wait-for-multiple-assertions */
import { cleanup, render, screen, waitFor } from "@testing-library/react";
import { BrowserRouter as Routes } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "../TestCommon";
import LandingPage from "../../Components/Pages/LandingPage/LandingPage";

jest.mock("axios");

afterEach(() => {
  cleanup();
  jest.clearAllMocks();
});

test("Landing Page Has Enter your email Text", async () => {

  render(
    <Provider store={store}>
    <Routes>
      <LandingPage />
    </Routes>
    </Provider>
  );

    const checkText = screen.getByText("Enter your email", { exact: true });
    expect(checkText).toBeInTheDocument();
});
