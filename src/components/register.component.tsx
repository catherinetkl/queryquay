import { Component } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import AuthService from "../services/auth.service";
import { t } from "i18next";
import i18n from "i18next";
type Props = {};

type State = {
    firstname: string,
    lastname: string,
    email: string,
    password: string,
    successful: boolean,
    message: string
};

export default class Register extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.handleRegister = this.handleRegister.bind(this);

        this.state = {
            firstname: "",
            lastname: "",
            email: "",
            password: "",
            successful: false,
            message: ""
        };
    }

    validationSchema() {
        return Yup.object().shape({
            firstname: Yup.string()
                .test(
                    "len",
                    "The username must be between 3 and 20 characters.",
                    (val: any) =>
                        val &&
                        val.toString().length >= 3 &&
                        val.toString().length <= 20
                )
                .required("This field is required!"),
            lastname: Yup.string()
                .test(
                    "len",
                    "The username must be between 3 and 20 characters.",
                    (val: any) =>
                        val &&
                        val.toString().length >= 3 &&
                        val.toString().length <= 20
                )
                .required("This field is required!"),
            email: Yup.string()
                .email("This is not a valid email.")
                .required("This field is required!"),
            password: Yup.string()
                .test(
                    "len",
                    "The password must be between 6 and 40 characters.",
                    (val: any) =>
                        val &&
                        val.toString().length >= 6 &&
                        val.toString().length <= 40
                )
                .required("This field is required!"),
        });
    }

    handleRegister(formValue: { firstname: string; lastname: string; email: string; password: string }) {
        const { firstname, lastname, email, password } = formValue;

        this.setState({
            message: "",
            successful: false
        });

        AuthService.register(
            firstname,
            lastname,
            email,
            password
        ).then(
            response => {
                this.setState({
                    message: response.data.message,
                    successful: true
                });
                localStorage.setItem('selectedLanguage', i18n.language);
            },
            error => {
                const resMessage =
                    (error.response &&
                        error.response.data &&
                        error.response.data.message) ||
                    error.message ||
                    error.toString();

                this.setState({
                    successful: false,
                    message: resMessage
                });
            }
        );
    }

    render() {
        const { successful, message } = this.state;

        const initialValues = {
            firstname: "",
            lastname: "",
            email: "",
            password: "",
        };

        return (
            <div className="col-md-12">
                <div className="card card-container">
                    <img
                        src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
                        alt="profile-img"
                        className="profile-img-card"
                    />

                    <Formik
                        initialValues={initialValues}
                        validationSchema={this.validationSchema}
                        onSubmit={this.handleRegister}
                    >
                        <Form>
                            {!successful && (
                                <div>
                                    <div className="form-group">
                                        <Field name="firstname" type="text" className="form-control" placeholder={t('form.firstname')} id="firstname"/>
                                        <ErrorMessage
                                            name="firstname"
                                            component="div"
                                            className="alert alert-danger"
                                        />
                                    </div>

                                    <div className="form-group" style={{ paddingTop: '20px' }}>
                                        <Field name="lastname" type="text" className="form-control" placeholder={t('form.lastname')} id="lastname" />
                                        <ErrorMessage
                                            name="lastname"
                                            component="div"
                                            className="alert alert-danger"
                                        />
                                    </div>

                                    <div className="form-group" style={{ paddingTop: '20px' }}>
                                        <Field name="email" type="email" className="form-control" placeholder={t('form.email')} id="email" />
                                        <ErrorMessage
                                            name="email"
                                            component="div"
                                            className="alert alert-danger"
                                        />
                                    </div>

                                    <div className="form-group" style={{ paddingTop: '20px' }}>
                                        <Field
                                            name="password"
                                            type="password"
                                            className="form-control"
                                            id="password"
                                            placeholder={t('form.password')}
                                        />
                                        <ErrorMessage
                                            name="password"
                                            component="div"
                                            className="alert alert-danger"
                                        />
                                    </div>

                                    <div className="form-group" style={{ textAlign: 'center', paddingTop: '20px' }}>
                                        <button type="submit" className="btn btn-primary btn-block">{t('signup.signup')}</button>
                                    </div>
                                </div>
                            )}

                            {message && (
                                <div className="form-group">
                                    <div
                                        className={
                                            successful ? "alert alert-success" : "alert alert-danger"
                                        }
                                        role="alert"
                                    >
                                        {message}
                                    </div>
                                </div>
                            )}
                        </Form>
                    </Formik>
                </div>
            </div>
        );
    }
}