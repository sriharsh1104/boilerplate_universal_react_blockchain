import { useFormik } from "formik";
import { Container } from "react-bootstrap";
import * as Yup from "yup";
import ButtonCustom from "../../Common/Button/ButtonCustom";
import CommonHeading from "../../Common/CommonHeading/CommonHeading";
import InputCustom from "../../Common/Inputs/InputCustom";
import "./AuthLogin.scss";

const AuthLogin = () => {
  const loginSchema = Yup.object().shape({
    address: Yup.string().required("*This Field is required"),
  });
  const formik = useFormik({
    initialValues: {
      address: "",
      password: "",
    },
    validationSchema: loginSchema,
    onSubmit: async (values) => {
      console.log(values);
    },
  });
  return (
    <>
      <Container fluid>
        <section className="login_page">
          <div className="login_page_box">
            <CommonHeading heading="Login" />
            <form onSubmit={formik.handleSubmit}>
              <InputCustom
                label="Enter Wallet Address"
                placeholder="0xd76a771a88c878a"
                id="address"
                name="address"
                type="text"
                onChange={formik.handleChange}
                autoFocus={true}
                value={formik.values.address}
                isInvalid={formik.touched.address && !!formik.errors.address}
                error={
                  formik.errors.address && formik.touched.address ? (
                    <span
                      className="error-message"
                      style={{ color: "red", fontSize: "12px" }}
                    >
                      {formik.errors.address}
                    </span>
                  ) : null
                }
              />
              <div className="mt-4">
                <ButtonCustom type="submit" title="Connect Wallet" fluid />
              </div>
            </form>
          </div>
        </section>
      </Container>
    </>
  );
};

export default AuthLogin;
