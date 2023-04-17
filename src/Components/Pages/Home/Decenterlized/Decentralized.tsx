import { Container } from "react-bootstrap";
import { useTranslation } from "react-i18next";

import "./Decentralized.scss";

const Decentralized = () => {
  const { t } = useTranslation();

  return (
    <Container>
      <section className="decentralized_sec mb-5">
        <span className="big_text">Aa</span>
        <div className="decentralized_box">
          <h1>{t("home.text")}</h1>
          <p>{t("home.bottom_text")}</p>
        </div>
      </section>
    </Container>
  );
};

export default Decentralized;
