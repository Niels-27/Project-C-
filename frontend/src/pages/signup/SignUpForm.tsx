import * as React from 'react';
import * as PropTypes from 'prop-types';
import {ErrorMessage, Field, Form, Formik, FormikProps} from "formik";
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
    ip: string;
    }
// const GetIp = async () => {
//     const res = await fetch('https://api.ipify.org', {method: 'get', credentials: "include", headers:{'content-type': 'application/json'}})
//     .then(response =>{ response.text()}, ()=> "error");
//     console.log(res);
//     return res;
// };

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
    ip: "fakeIp"
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
      .max(20, 'Leuk geprobeerd, maar niemand heeft zo een lange naam ;-)')
      .required('Vereist'),
      passwordConfirmation: Yup.string()
      .oneOf([Yup.ref('password'), null], "Het wachtwoord komt niet overeen met de bovenste")                                
      .required('Vereist'),
      street: Yup.string()      
      .required('Vereist'),
      streetnumber: Yup.string()
      .required('Vereist'),
      zipcode: Yup.string()
      .required('Vereist'),
      city: Yup.string()
      .required('Vereist'),
      country: Yup.string()
      .required('Vereist'),
  });

class SignUpForm extends React.Component<any,any>{
    public static propTypes = 
    {userSignUpRequest: PropTypes.func.isRequired, isEmailExists: PropTypes.func.isRequired}
    constructor(props: any) {
        super(props);
        this.state = {
            errors: {}, invalid: false, user: null
        };
        this.onSubmit = this.onSubmit.bind(this);
        this.checkEmailExists = this.checkEmailExists.bind(this);
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
    private checkEmailExists(e) {
        this.setState({user: null});
        const val = e.target.value;
        if (val !== '') {           
          this.props.isEmailExists(val).then((res) => { 
              console.log(res); 
              this.setState({user: res.data}); 
            }, () => { console.log("Something Wrong.. With This")})
        }
    }
    private async onSubmit(values: IFormikValues, formik: FormikProps<IFormikValues>){
        formik.setSubmitting(true);
        this.setState({ errors: {}});
        this.props.userSignUpRequest(values).then(
            () => {
                alert("Je bent met succes geregistreerd.\n" + "Welkom, " + values.firstname + " " + values.lastname + "!");
                this.props.history.push("/");
            }, ({data}) => this.setState({ errors: data}));
    }
    private renderFormik = (formik: FormikProps<IFormikValues>) => {
        return (
            <Form>
                <div className="row mt-md-5 mb-md-3 justify-content-center">
                    <div className="col col-10">
                    <h1 className="h1-responsive text-start"><strong>Meld je nu aan!</strong></h1>
                    </div>
                </div>
                <div className="form-group">
                 <div className="row justify-content-around">
                    <div className="col col-6 col-md-4" >
                        <div className="mb-5">
                            <label htmlFor="firstname">Voornaam</label>
                            <Field className="form-control" name="firstname" placeholder="Nofit" type="text" />
                            <ErrorMessage
                            name="firstname"
                            component="div"
                            className="field-error text-danger"
                            />
                        </div>
                        <div className="mb-5">
                            <label htmlFor="lastname">Achternaam</label>
                            <Field className="form-control" name="lastname" placeholder="Kartoredjo" type="text" />
                            <ErrorMessage
                            name="lastname"
                            component="div"
                            className="field-error text-danger"
                            />
                        </div>
                        <div className="mb-5">
                            <label htmlFor="email">Email</label>
                            <Field className="form-control" onBlur={this.checkEmailExists} name="email" placeholder="@gmail.com" type="email" />
                            {formik.errors.email ?(<div className="text-danger" >Error: {formik.errors.email}</div>
                            ) : this.state.user!== null && !formik.errors.email ? (
                                <div className="text-danger">User Already exists..</div>
                            ) : this.state.user=== null && !formik.errors.email && formik.values.email ? <div className="text-success">Deze email is beschikbaar</div>
                            : null
                                } 
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
                            disabled={!formik.isValid || formik.isSubmitting || formik.isValidating || this.state.user!==null}
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