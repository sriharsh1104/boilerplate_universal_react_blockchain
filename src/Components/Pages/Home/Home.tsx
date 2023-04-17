import { useState, useEffect } from "react";
import { Col } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import Decentralized from "./Decenterlized/Decentralized";
import Shimmer from "../../Common/Shimmer/Shimmer";

const Home = () => {
  const { t } = useTranslation();

  const [isShown, setIsShown] = useState(false);
  useEffect(() => {
    setTimeout(() => {
      setIsShown(true);
    }, 3000);
  }, []);

  return (
    <div className="App">
      <div className="app-body">
        <Col md="6" className="mb-4">
          {isShown ? (
            <h2>{t("home.slogan")}</h2>
          ) : (
            <Shimmer fluid height={38} />
          )}
        </Col>
        <Decentralized />
      </div>
    </div>
  );
};

export default Home;
