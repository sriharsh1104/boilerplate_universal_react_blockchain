import { Container, Navbar } from "react-bootstrap";
import "./index.scss";
import logo from "../../../Assets/Images/logo.svg";
import ConnectWallet from "../ConnectWallet";
import { useTranslation } from "react-i18next";
import i18next from "i18next";
import cookies from "js-cookie";
import { MouseEvent, useEffect, useState } from "react";
import ButtonCommon from "../Button/ButtonCustom";
import { useNavigate } from "react-router-dom";
import IndiaIcon from "../../../Assets/Images/Icons/flags/india.png";
import FranceIcon from "../../../Assets/Images/Icons/flags/fr.svg";
import UsIcon from "../../../Assets/Images/Icons/flags/us.png";
import { useDispatch, useSelector } from "react-redux";
import { changeTheme } from "../../../Redux/Slices/theme.slice";
import {
  MoonIcon,
  SunICon,
  TokenIcon,
  UserIcon,
} from "../../../Assets/Images/Icons/SvgIcons";
import Shimmer from "../Shimmer/Shimmer";
import useCopyClipboard from "../../../hooks/useCopyToClipboard";
import CustomSelect from "../Select/Select";
import toaster from "../Toast";
import LoadingBar from "react-top-loading-bar";

const language = [
  {
    code: "en",
    label: (
      <div className="selector_item">
        <img className="selector_icon" src={UsIcon} alt="" />{" "}
        <span className="selector_name">English</span>
      </div>
    ),
    country_code: "US",
    value: "en",
  },
  {
    code: "fr",
    label: (
      <div className="selector_item">
        <img className="selector_icon" src={FranceIcon} alt="" />{" "}
        <span className="selector_name">Français</span>
      </div>
    ),
    country_code: "FR",
    value: "fr",
  },
  {
    code: "hi",
    label: (
      <div className="selector_item">
        <img className="selector_icon" src={IndiaIcon} alt="" />{" "}
        <span className="selector_name">हिंदी</span>
      </div>
    ),
    country_code: "In",
    value: "hi",
  },
];

const Header = ({
  afterLogin,
  handleSidebar,
  active,
}: {
  afterLogin?: boolean;
  active?: boolean;
  handleSidebar?: () => void;
}) => {
  /**CREATE useNavigate OBJECT */
  const navigate: any = useNavigate();
  const walletAddress = useSelector((state: any) => state?.user?.walletAddress);

  const { t } = useTranslation();

  const theme = useSelector((state: any) => state?.theme?.theme);

  const dispatch = useDispatch();

  useEffect(() => {
    if (!theme) {
      document.body.classList.remove("lightTheme");
      return document.body.classList.add("darkTheme");
    } else if (theme === "dark") {
      document.body.classList.remove("lightTheme");
      return document.body.classList.add("darkTheme");
    } else if (theme === "light") {
      document.body.classList.remove("darkTheme");
      document.body.classList.add("lightTheme");
    }
  }, [theme]);

  const handleTheme = () => {
    if (theme === "light") {
      dispatch(changeTheme("dark"));
    } else {
      dispatch(changeTheme("light"));
    }
  };
  const currentLocation = cookies.get("i18next") || "en";
  const [selectedOption, setSelectedOption] = useState<any>(
    language.find((item) => item.value === currentLocation)
  );

  //copy string to clipboard with below code
  const [setCopied] = useCopyClipboard();
  const copy = (data: any, message?: string) => {
    setCopied(data);
    if (message) toaster.success(message);
  };

  const [progress, setProgress] = useState(0);

  const fetchPhotos = async (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    setProgress(20);
    let result: any = await fetch(
      "https://jsonplaceholder.typicode.com/photos"
    );
    await result.json();
    setProgress(70);
    setProgress(100);
    afterLogin ? navigate("/auth/dashboard") : navigate("/");
  };

  const chainsOptions = [
    {
      value: "bnb",
      label: (
        <div className="selector_item">
          <TokenIcon icon={"bnb"} className="selector_icon" />{" "}
          <span className="selector_name">BNB Chain</span>
        </div>
      ),
    },
    {
      value: "btc",
      label: (
        <div className="selector_item">
          <TokenIcon className="selector_icon" />{" "}
          <span className="selector_name">BTC</span>
        </div>
      ),
    },
  ];

  const [isShown, setIsShown] = useState(false);
  useEffect(() => {
    setTimeout(() => {
      setIsShown(true);
    }, 3000);
  }, []);

  return (
    <>
      {active && (
        <div
          onClick={handleSidebar}
          className={`${active ? "active" : ""} sidebar_backdrop d-lg-none`}
        />
      )}

      <header className="header">
        <LoadingBar
          color={theme === "light" ? "#0e3c52" : "#0D9DDC"}
          progress={progress}
          height={4}
          onLoaderFinished={() => setProgress(0)}
        />
        <Navbar className="app-header">
          <Container fluid={afterLogin ? true : "lg"}>
            <Navbar.Brand href="/" onClick={fetchPhotos}>
              <img
                src={logo}
                width="30"
                height="30"
                className="d-inline-block align-top me-2"
                alt="React Bootstrap logo"
              />
              <span className="d-md-inline d-none">
                {t("header.company_name")}
              </span>
            </Navbar.Brand>
            <Navbar.Toggle />
            <Navbar.Collapse className="justify-content-end">
              {isShown ? (
                <>
                  {!walletAddress ? (
                    <ButtonCommon
                      className="WltBtn mx-3"
                      // title={t("header.login")}
                      onlyIcon={<UserIcon />}
                      onClick={() => navigate("/login")}
                    />
                  ) : (
                    <ButtonCommon
                      className="WltBtn mx-3"
                      title="Copy Wallet Address"
                      onClick={() =>
                        copy(walletAddress, "Address copied to clipboard")
                      }
                    />
                  )}
                </>
              ) : (
                <Shimmer width={56} height={48} className="mx-3 asbutton" />
              )}

              {false ? <Shimmer height={38} /> : <ConnectWallet />}
              <CustomSelect
                defaultValue={selectedOption}
                onChange={(value: { code: string | undefined }) => {
                  i18next.changeLanguage(value.code);
                  setSelectedOption(value);
                }}
                options={language}
                className="language_selector"
              />
              <CustomSelect
                className="ms-3"
                defaultValue={chainsOptions[0]}
                options={chainsOptions}
              />
              {/* theme mode */}
              <button onClick={handleTheme} className={`theme-btn ${theme}`}>
                {theme === "light" ? <SunICon /> : <MoonIcon />}
              </button>
              {afterLogin && (
                <>
                  <button
                    className={`toggle_btn d-lg-none ${active ? "active" : ""}`}
                    onClick={handleSidebar}
                  >
                    <span></span>
                    <span></span>
                    <span></span>
                  </button>
                </>
              )}
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </header>
    </>
  );
};

export default Header;
