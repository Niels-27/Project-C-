import * as React from 'react';
import * as PropTypes from 'prop-types';
import {ErrorMessage, Field, Form, Formik, FormikProps, FormikValues} from "formik";
import * as Yup from 'yup';
import {
    withRouter
} from "react-router-dom";
/* tslint:disable:no-empty */

interface IFormikValues {
    firstname: string;
    lastname: string;
    email: string;
    password: string;
    passwordConfirmation: string;
    street: string;
    streetnumber: string;
    zipcode: string;
    city: string;
    country: string;
    createdon: Date;
    }

const initialValues: IFormikValues = {
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    passwordConfirmation: "",
    street: "",
    streetnumber: "",
    zipcode: "",
    city: "",
    country: "",
    createdon: new Date('1900-1-1T00:00:00'),
  };

  const SignUpSchema = Yup.object().shape({
    firstname: Yup.string()
      .min(2, 'Moet langer zijn dan 2 karakters')
      .max(20, 'Leuk geprobeerd, maar niemand heeft zo een lange naam ;-)')
      .required('Vereist'),
    lastname: Yup.string()
      .min(2, 'Moet langer zijn dan 2 karakters')
      .max(20, 'Leuk geprobeerd, maar niemand heeft zo een lange naam ;-)')
      .required('Vereist'),
    email: Yup.string()
      .email('Ongeldig emailadres')
      .required('Vereist'),
    password: Yup.string()
      .min(6, 'Het wachtwoord moet langer zijn dan 6 karakters')
      .max(20, 'Leuk geprobeerd, maar verzin een korter wachtwoord ;-)')
      .required('Vereist'),
    passwordConfirmation: Yup.string()
      .oneOf([Yup.ref('password'), null], "De wachtwoorden komen niet overeen")                                
      .required('Vereist'),
    street: Yup.string() 
      .max(50, 'Leuk geprobeerd, maar niemand heeft zo een lange straatnaam ;-)')  
      .required('Vereist'),
    streetnumber: Yup.string()
      .max(10, 'Leuk geprobeerd, maar niemand heeft zo een lang straatnummer ;-)')
      .required('Vereist'),
    zipcode: Yup.string()
      .max(10, 'Leuk geprobeerd, maar niemand heeft zo een lange postcode ;-)')
      .required('Vereist'),
    city: Yup.string()
      .max(20, 'Leuk geprobeerd, maar niemand heeft zo een lange stadsnaam ;-)')
      .required('Vereist'),
    country: Yup.string()
      .required('Vereist'),
  });

class SignUpForm extends React.Component<any,any>{
    public static propTypes = 
    {userSignUpRequest: PropTypes.func.isRequired, isEmailExists: PropTypes.func.isRequired, login: PropTypes.func.isRequired}
    constructor(props: any) {
        super(props);
        this.state = {
            errors: {}, invalid: false, user: null, errormessage: ''
        };
        this.onSubmit = this.onSubmit.bind(this);
        this.checkEmailExists = this.checkEmailExists.bind(this);
        this.handleBlur = this.handleBlur.bind(this);
    }
    public render() {
        return (
            <Formik
            initialValues={initialValues}
            validationSchema={SignUpSchema}
            onSubmit={this.onSubmit}
            render={this.renderFormik}
        /> );
    }  
    private async checkEmailExists(values: FormikValues) {          
        await this.props.isEmailExists(values).then((res) => { 
            this.setState({errormessage: res}); console.log(this.state.errormessage); 
        }, () => { console.log("Something Wrong.. With This")})   
    }
    private handleBlur = (e) => {
        this.setState({errormessage: ''})
    }
    private async onSubmit(values: IFormikValues, formik: FormikProps<IFormikValues>){
        formik.setSubmitting(true);
        await this.checkEmailExists(values);
        if(this.state.errormessage === ''){
            console.log("gelukt!")
            await this.props.userSignUpRequest(values).then(
                 async() => {
                    alert("Je bent met succes geregistreerd.\n" + "Welkom, " + values.firstname + " " + values.lastname + "!");
                    await this.props.login(values).then(()=> {
                        
                        this.props.history.push("/dashboard");}, () => {this.props.history.push("/")});
                    
                }, ({data}) => this.setState({ errors: data}));
        }
       
        else{formik.setSubmitting(false)}
    }
    private renderFormik = (formik: FormikProps<IFormikValues>) => {
        return (
            <Form>
                <div className="row mt-md-5 mb-md-3 justify-content-center">
                    <div className="col col-10">
                    <h1 className="h1-responsive text-start"><strong>Meld je nu aan!</strong></h1>
                    </div>
                </div>
                <div className="row mt-md-2 mb-md-3 justify-content-center">
                    <div className="col col-10">
                    <span className="text-start">
                    {formik.touched.email && this.state.errormessage !== '' ? (<div className="text-danger">{this.state.errormessage}</div>)
                     : null  }</span>
                    </div>
                </div>
                <div className="form-group">
                 <div className="row justify-content-around">
                    <div className="col col-6 col-md-4" >
                        <div className="mb-5">
                            <label htmlFor="firstname">Voornaam</label>
                            <Field className="form-control" name="firstname" placeholder="Jan" type="text" />
                            <ErrorMessage
                            name="firstname"
                            component="div"
                            className="field-error text-danger"
                            />
                        </div>
                        <div className="mb-5">
                            <label htmlFor="lastname">Achternaam</label>
                            <Field className="form-control" name="lastname" placeholder="Pietersen" type="text" />
                            <ErrorMessage
                            name="lastname"
                            component="div"
                            className="field-error text-danger"
                            />
                        </div>
                        <div className="mb-5">
                            <label htmlFor="email">Email</label>
                            <Field className="form-control" name="email" placeholder="test1234@gmail.com" type="email" />
                            <ErrorMessage
                            name="email"
                            component="div"
                            className="field-error text-danger"
                            />
                        </div>   
                        <div className="mb-5">
                            <label htmlFor="password">Wachtwoord</label>
                            <Field className="form-control"name="password" type="password" />
                            <ErrorMessage
                            name="password"
                            component="div"
                            className="field-error text-danger"
                            />
                        </div>   
                        <div className="mb-5">
                            <label htmlFor="passwordConfirmation">Herhaal wachtwoord</label>
                            <Field className="form-control"name="passwordConfirmation"  type="password" />
                            <ErrorMessage
                            name="passwordConfirmation"
                            component="div"
                            className="field-error text-danger"
                            />
                        </div>   
                    </div>
                    <div className="col col-6 col-md-4" >
                        <div className="mb-5">
                            <label htmlFor="street">Straatnaam</label>
                            <Field className="form-control"name="street" placeholder="Jan Pieterstraat" type="text" />
                            <ErrorMessage
                            name="street"
                            component="div"
                            className="field-error text-danger"
                            />
                        </div>   
                    
                        <div className="mb-5">
                            <label htmlFor="streetnumber">Huisnummer</label>
                            <Field className="form-control"name="streetnumber" placeholder="61" type="text" />
                            <ErrorMessage
                            name="streetnumber"
                            component="div"
                            className="field-error text-danger"
                            />
                        </div>   
                        <div className="mb-5">
                            <label htmlFor="zipcode">Postcode</label>
                            <Field className="form-control"name="zipcode" placeholder="1234AB" type="text" />
                            <ErrorMessage
                            name="zipcode"
                            component="div"
                            className="field-error text-danger"
                            />
                        </div> 
                        <div className="mb-5">
                            <label htmlFor="city">Stad</label>
                            <Field className="form-control"name="city" placeholder="Rotterdam" type="text" />
                            <ErrorMessage
                            name="city"
                            component="div"
                            className="field-error text-danger"
                            />
                        </div>
                        <div className="mb-5">
                            <label htmlFor="country">Land</label>
                            <Field component="select"className="form-control"name="country" type="text">
                            <option value="" disabled>Kies een land</option>
                                <option>Nederland</option>
                            </Field>
                            <ErrorMessage
                            name="country"
                            component="div"
                            className="field-error text-danger"
                            />
                        </div>    
                        <div className="form-group">
                        <button type="submit" className="btn btn-success btn-lg "
                            disabled={!formik.isValid || formik.isSubmitting || formik.isValidating}
                            >
                                <strong>Aanmelden</strong>
                            </button>
                        </div> 
                    </div>
                </div>
            </div>
          </Form>
        );
    };   
}

export default withRouter(SignUpForm);