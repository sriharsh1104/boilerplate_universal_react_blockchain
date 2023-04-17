import React from "react";
import { Col, Container, Form, Row } from "react-bootstrap";
// import { Dispatch } from 'react';
// import { useDispatch } from 'react-redux';
import ButtonCustom from "../../Common/Button/ButtonCustom";
import InputCustom from "../../Common/Inputs/InputCustom";
import * as Yup from "yup";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import './LandingPage.scss';

const LandingPage = () => {
  /**CREATE DISPATCH OBJECT */
  // const dispatch: Dispatch<any> = useDispatch();

  const navigate: any = useNavigate();

  // CREATE LOGIN SCHEMA USING YUP
  const loginSchema = Yup.object().shape({
    // EMAIL & PASSWORD VALIDATION
    email: Yup.string()
      .email("Please enter valid email")
      .required("*This Field is required")
      .matches(/^[a-zA-Z0-9+.-_]+@[a-zA-Z0-9.-]+$/),
    password: Yup.string().required("*This Field is required"),
  });
  // Set up useFormik hook with initial values, validationSchema, and submit function
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: loginSchema,
    onSubmit: async (values) => {
      let data = {
        email: values.email.toLowerCase(),
        password: values.password,
      };
      console.log("data :>> ", data);
    },
  });

  return (
<Container fluid>
      <section className="login_page">
        <div className="login_page_box">
          <h2>Login</h2>
          <Form onSubmit={formik.handleSubmit}>
            <InputCustom
              label="Enter your email"
              placeholder="sandeep@yopmail.com"
              className=" mb-2"
              id="email"
              name="email"
              type="text"
              onChange={(e: any) => {
                formik.handleChange(e);
              }}
              autoFocus={true}
              value={formik.values.email}
              isInvalid={formik.touched.email && !!formik.errors.email}
              error={
                formik.errors.email && formik.touched.email ? (
                  <span
                    className="error-message"
                    style={{ color: "red", fontSize: "12px" }}
                  >
                    {formik.errors.email}
                  </span>
                ) : null
              }
            />
            <InputCustom
              label="Password"
              placeholder="Enter Your Password"
              id="password"
              className=" mb-2"
              onChange={formik.handleChange}
              autoFocus={true}
              value={formik.values.password}
              isInvalid={formik.touched.password && !!formik.errors.password}
              error={
                formik.errors.password && formik.touched.password ? (
                  <span
                    className="error-message"
                    style={{ color: "red", fontSize: "12px" }}
                  >
                    {formik.errors.password}
                  </span>
                ) : null
              }
            />
            <div className="mt-4">
              <Row>
                <Col xs={6}>
                  <ButtonCustom
                    title="Back"
                    onClick={() => navigate("/")}
                    className='bordered'
                    fluid
                  />
                </Col>
                <Col xs={6}>
                  <ButtonCustom
                    // onClick={handleLogout}
                    type="submit"
                    title="Login"
                    fluid
                  />
                </Col>
              </Row>
            </div>
          </Form>
        </div>
      </section>
</Container>
  );
};

export default LandingPage;
