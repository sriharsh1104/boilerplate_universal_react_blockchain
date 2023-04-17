import React, { useState } from "react";
import CustomTable from "../../Common/Table/Index";
import "./DesignUi.scss";
import PowerIcon from "../../../Assets/Images/Icons/tokens/power.png";
import BitCoinIcon from "../../../Assets/Images/Icons/tokens/bitcoin.svg";
import EthIcon from "../../../Assets/Images/Icons/tokens/Eth.svg";
import BnbIcon from "../../../Assets/Images/Icons/tokens/BNB.png";
import BusdIcon from "../../../Assets/Images/Icons/tokens/busd.png";
import OneInchIcon from "../../../Assets/Images/Icons/tokens/oneinch.png";
import ButtonCustom from "../../Common/Button/ButtonCustom";
import { Col, Container, Form, Nav, Row, Tab } from "react-bootstrap";
import InputCustom from "../../Common/Inputs/InputCustom";
import Password from "../../Common/FormInputs/Password";
import Checkbox from "../../Common/FormInputs/Checkbox";
import Switch from "../../Common/FormInputs/Switch";
import Radio from "../../Common/FormInputs/Radio";
import { useFormik } from "formik";
import CustomSelect from "../../Common/Select/Select";
import TextArea from "../../Common/FormInputs/TextArea";
import { SocialShare } from "../../Common/SocialShare/SocialShare";

const DesignUi = () => {
  const fields = [
    "Name",
    "Price",
    "24 Change",
    "24 Volume",
    "Market Cap",
    "Action",
  ];

  let values = [
    {
      coinIcon: EthIcon,
      coinShortName: "ETH",
      coin: "Ethereum",
      price: "$38.395.76000",
      change: "+0.88%",
      volume: "28.802.28M",
      marketCap: "$38.395.76000",
    },
    {
      coinIcon: BitCoinIcon,
      coinShortName: "BTC",
      coin: "Bitcoin",
      price: "$38.395.76000",
      priceRed: true,
      change: "-0.40%",
      changeRed: true,
      volume: "28.802.28M",
      marketCap: "$38.395.76000",
    },
    {
      coinIcon: PowerIcon,
      coinShortName: "POWER",
      coin: "POWER",
      price: "$38.395.76000",
      priceRed: true,
      change: "-0.40%",
      changeRed: true,
      volume: "28.802.28M",
      marketCap: "$38.395.76000",
    },
    {
      coinIcon: BnbIcon,
      coinShortName: "BNB",
      coin: "BNB",
      price: "$38.395.76000",
      change: "+0.88%",
      volume: "28.802.28M",
      marketCap: "$38.395.76000",
    },
    {
      coinIcon: BusdIcon,
      coinShortName: "BUSD",
      coin: "BUSD",
      price: "$38.395.76000",
      priceRed: true,
      change: "-0.40%",
      changeRed: true,
      volume: "28.802.28M",
      marketCap: "$38.395.76000",
    },
    {
      coinIcon: OneInchIcon,
      coinShortName: "1INCH",
      coin: "1INCH",
      price: "$38.395.76000",
      priceRed: true,
      change: "-0.40%",
      changeRed: true,
      volume: "28.802.28M",
      marketCap: "$38.395.76000",
    },
  ];

  const options = [
    { value: "btc", label: "BTC" },
    { value: "busd", label: "BUSD" },
  ];

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
      checkbox: false,
      switch: false,
      radio: "",
      select: "",
      textarea: "",
    },
    onSubmit: (values) => {
      console.log(values);
    },
  });

  const [showData, setShowData] = useState(false);
  return (
    <section>
      <Container fluid>
        <Tab.Container defaultActiveKey="table">
          <Nav>
            <Nav.Item>
              <Nav.Link eventKey="table">Table</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="form">Forms</Nav.Link>
            </Nav.Item>
          </Nav>
          <Tab.Content>
            <Tab.Pane eventKey="table">
              <div className="pb-4 d-flex justify-content-end">
                <Switch
                  name="showData"
                  id="showData"
                  value={showData}
                  onChange={() => setShowData(!showData)}
                  label="Show Data"
                />
              </div>
              <CustomTable fields={fields}>
                {showData &&
                  values.length > 0 &&
                  values.map((item, index) => (
                    <tr key={index}>
                      <td>
                        <div className="coin_detail">
                          <div className="coin_detail_icon">
                            <img src={item.coinIcon} alt="coin" />
                          </div>
                          <p>{item.coinShortName}</p>
                        </div>
                      </td>
                      <td className={item.priceRed ? "red_text" : "green_text"}>
                        {item.price}
                      </td>
                      <td className={item.priceRed ? "red_text" : "green_text"}>
                        {item.change}
                      </td>
                      <td>{item.volume}</td>
                      <td>{item.marketCap}</td>
                      <td>
                        <div className="action_box">
                          <ButtonCustom className="action_btn" title="Detail" />
                          <ButtonCustom className="action_btn" title="Trade" />
                        </div>
                      </td>
                    </tr>
                  ))}
              </CustomTable>
            </Tab.Pane>
            <Tab.Pane eventKey="form">
              <form onSubmit={formik.handleSubmit}>
                <Row>
                  <Col md={6} lg={4}>
                    <InputCustom
                      id="username"
                      name="username"
                      label="Username"
                      placeholder="Enter your username"
                      onChange={formik.handleChange}
                      value={formik.values.username}
                    />
                  </Col>
                  <Col md={6} lg={4}>
                    <Password
                      id="password"
                      name="password"
                      label="Password"
                      placeholder="Enter your Password"
                      onChange={formik.handleChange}
                      value={formik.values.password}
                    />
                  </Col>
                </Row>
                <Row className="py-3">
                  <Col lg={4} xs={6}>
                    <Checkbox
                      label="This is Checkbox"
                      id="checkbox"
                      name="checkbox"
                      onChange={formik.handleChange}
                      value={formik.values.checkbox}
                    />
                  </Col>
                  <Col lg={4} xs={6}>
                    <Switch
                      label="This is Switch"
                      id="switch"
                      name="switch"
                      onChange={formik.handleChange}
                      value={formik.values.switch}
                    />
                  </Col>
                </Row>
                <Row>
                  <Col lg={4}>
                    <Form.Label>Select One Radio Box</Form.Label>
                    <Radio
                      label="This is Radio 1"
                      id="radio1"
                      name="radio"
                      onChange={formik.handleChange}
                      value="radio1"
                      className="mb-2"
                    />
                    <Radio
                      label="This is Radio 2"
                      id="radio2"
                      name="radio"
                      onChange={formik.handleChange}
                      value={"radio2"}
                      className="mb-2"
                    />
                    <Radio
                      label="This is Radio 3"
                      id="radio3"
                      name="radio"
                      onChange={formik.handleChange}
                      value={"radio3"}
                    />
                  </Col>
                </Row>
                <Row className="py-3">
                  <Col sm={6} lg={4} className="mb-sm-0 mb-3">
                    <CustomSelect
                      className="input_select"
                      options={options}
                      name="select"
                      onChange={(selectedOption) =>
                        formik.setFieldValue("select", selectedOption.value)
                      }
                    />
                  </Col>
                  <Col sm={6} lg={4}>
                    <CustomSelect
                      options={options}
                      name="select"
                      onChange={(selectedOption) =>
                        formik.setFieldValue("select", selectedOption.value)
                      }
                    />
                  </Col>
                </Row>
                <Row className="pb-3">
                  <Col lg={4} md={6}>
                    <TextArea
                      onChange={formik.handleChange}
                      name="textarea"
                      value={formik.values.textarea}
                      placeholder="Please enter text here"
                    />
                  </Col>
                </Row>
                <ButtonCustom type="submit" title="Submit" />
              </form>
            </Tab.Pane>
          </Tab.Content>
        </Tab.Container>

        <SocialShare
          socialLinks={[
            "Facebook",
            "LinkedIn",
            "Email",
            "Whatsapp",
            "Pinterest",
          ]}
          // url={"https://www.google.com/"}
        />
      </Container>
    </section>
  );
};

export default DesignUi;
