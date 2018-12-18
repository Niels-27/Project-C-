import * as React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { ChangeData } from '../../../actions/userActions';
import { UserExists } from '../../../actions/loginActions';
import { ErrorMessage, Field, Form, Formik, FormikProps } from "formik";
import { Button, Modal, ModalHeader, ModalBody } from 'reactstrap';
import * as Yup from 'yup';
/* tslint:disable:no-empty */
/* tslint:disable:jsx-boolean-value */

interface IFormikValues {
    id: number;
    password: string
    email: string;
}

const SignUpSchema = Yup.object().shape({
    email: Yup.string()
        .email('Ongeldig emailadres')
        .required('Vereist'),
    password: Yup.string()
        .required('Vereist'),
});

class PasswordChangeForm extends React.Component<any, any & IFormikValues>{
    public initialValues: IFormikValues = {
        id: this.props.userData.id,
        email: this.props.userData.email,
        password: '',
    };
    constructor(props: any) {
        super(props);
        this.state = {
            errors: {}, user: null, errormessage: ''
        };
        this.onSubmit = this.onSubmit.bind(this);
        this.checkUserExists = this.checkUserExists.bind(this);
    }
    public render() {
        const { userData } = this.props
        var showresults = <div>Laden..</div>
        if (userData) {
            showresults = (<Formik
                initialValues={this.initialValues}
                validationSchema={SignUpSchema}
                onSubmit={this.onSubmit}
                render={this.renderFormik} />);
        }
        return (<div>{showresults}</div>);
    }
    private checkUserExists = async (values) => {
        await this.props.isUserExists(values).then((res) => {
            { this.setState({ errormessage: res }); console.log(this.state.errormessage) }
        }, () => { console.log("Something Wrong.. With This") });
    }
    private async onSubmit(values: IFormikValues, formik: FormikProps<IFormikValues>) {
        formik.setSubmitting(true)

        await this.checkUserExists(values);

        console.log(this.props.values)
        console.log(this.props.values2)
        console.log(this.state.errormessage)
        if (this.state.errormessage === '') {
            const { changeData } = this.props;
            console.log(this.props.values)
            if (this.state.errormessage === '') {
                console.log("gelukt!")

                await changeData(this.props.values, this.props.type)
                    .then(async (result) => { console.log(result); },
                        () => this.setState({ errormessage: "Er is iets misgegaan." }))


                await changeData(this.props.values2, this.props.type2)
                    .then((res2) => { console.log(res2); },
                        () => this.setState({ errormessage: "Er is iets misgegaan." }))

                alert("Wijziging gelukt!")
                this.props.history.go()
            }
        }
        formik.setSubmitting(false)
    }
    private renderFormik = (formik: FormikProps<IFormikValues>) => {
        return (
            <Modal isOpen={this.props.modal} toggle={this.props.toggle}>
                <ModalHeader toggle={this.props.toggle}>Adres toevoegen</ModalHeader>
                <ModalBody>
                    <Form>
                        <div className="row mt-md-1 mb-md-1 justify-content-center">
                            <div className="col col-10">
                                <h5 className="h5-responsive text-start"><strong>Vul eerst je wachtwoord in als je gegevens wilt veranderen.</strong></h5>
                            </div>
                        </div>
                        <div className="row mb-md-3 justify-content-center">
                            <div className="col col-11">
                                <span className="text-start">
                                    {this.state.errormessage !== '' ? (<div className="text-danger">{this.state.errormessage}</div>)
                                        : null}</span>
                            </div>
                        </div>
                        <div className="form-group">
                            <div className="row justify-content-center">
                                <div className="col-10" >
                                    <div className="mb-2">
                                        <label htmlFor="email">Email</label>
                                        <Field className="form-control" name="email" type="email" disabled={true} />
                                        <ErrorMessage
                                            name="email"
                                            component="div"
                                            className="field-error text-danger"
                                        />
                                    </div>
                                    <div className="mb-2">
                                        <label htmlFor="password">Wachtwoord</label>
                                        <Field className="form-control" name="password" type="password" />
                                        <ErrorMessage
                                            name="password"
                                            component="div"
                                            className="field-error text-danger"
                                        />
                                    </div>
                                    <div className="form-group">
                                        <Button type="submit" color="primary" style={{ float: "left" }}
                                            disabled={!formik.isValid || formik.isValidating || formik.isSubmitting}
                                        >
                                            Ok
                                 </Button>
                                        <Button color="secondary" style={{ float: "right" }} onClick={this.props.toggle}>Cancel</Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Form>
                </ModalBody>

            </Modal>
        );
    };
}

export default withRouter(connect(null, { changeData: ChangeData, isUserExists: UserExists })(PasswordChangeForm));