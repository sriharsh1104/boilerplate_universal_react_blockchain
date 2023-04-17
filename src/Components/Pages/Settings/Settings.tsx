import { useFormik } from 'formik';
import React from 'react';
import './Settings.scss';
import * as Yup from "yup";
import InputCustom from '../../Common/Inputs/InputCustom';
import ButtonCustom from '../../Common/Button/ButtonCustom';
import CommonHeading from '../../Common/CommonHeading/CommonHeading';
import { Container } from 'react-bootstrap';

const Settings = () => {
    const loginSchema = Yup.object().shape({
        // EMAIL & PASSWORD VALIDATION
        address: Yup.string()
            .email("Please enter valid address")
            .required("*This Field is required")
            .matches(/^[a-zA-Z0-9+.-_]+@[a-zA-Z0-9.-]+$/),
    });
    const formik = useFormik({
        initialValues: {
            address: "",
        },
        validationSchema: loginSchema,
        onSubmit: async (values) => {
            console.log(values);
        },
    });
    return (
        <Container fluid>
            <section className='settings_page'>
                <div className="settings_page_box">
                    <CommonHeading heading="Ownership Transfer" />
                    <form onSubmit={formik.handleSubmit}>
                        <InputCustom
                            label="Address :"
                            placeholder="0xd76a771a88c878a"
                            id="address"
                            name="address"
                            type="text"
                            onChange={(e: any) => {
                                formik.handleChange(e);
                            }}
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
                            <ButtonCustom
                                title="Change"
                                // className='bordered'
                                fluid
                            />
                        </div>
                    </form>
                </div>
            </section>
        </Container>
    )
}

export default Settings
