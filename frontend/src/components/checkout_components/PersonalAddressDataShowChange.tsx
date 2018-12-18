import * as React from 'react';
import * as PropTypes from 'prop-types';
import  { connect } from 'react-redux';
import {withRouter}  from 'react-router-dom';
import { IsEmailExists } from '../../actions/signUpActions';
import {ChangeData} from '../../actions/userActions';
import {ErrorMessage, Field, Form, Formik, FormikProps, FormikValues} from "formik";
import * as Yup from 'yup';
/* tslint:disable:no-empty */
/* tslint:disable:jsx-boolean-value */

interface IFormikValues {
    id: number;
    firstname: string;
    lastname: string;
    email: string;
    addressId: number;
    street: string;
    streetnumber: string;
    zipcode: string;
    city: string;
    country: string;
    }

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
  });

class PersonalAddresssDataForm extends React.Component<any,any & IFormikValues>{
    public static propTypes = 
    { isEmailExists: PropTypes.func.isRequired, changeUserData: PropTypes.func.isRequired, toggle: PropTypes.func.isRequired}
    public initialValues: IFormikValues = {
        id: this.props.userData.id,
        firstname: this.props.userData.name.split(' ')[0],
        lastname: this.props.userData.name.split(' ')[1],
        email: this.props.userData.email,
        addressId: this.props.address.id,
        street: this.props.address.street.split(" ")[0],
        streetnumber: this.props.address.street.split(" ")[1],
        zipcode: this.props.address.postalCode,
        city: this.props.address.city,
        country: this.props.address.country,
      };
    constructor(props: any) {
        super(props);
        this.state = {
            errors: {}, user: null, errormessage: '', modal: false
        };
        this.onSubmit = this.onSubmit.bind(this);
        this.checkEmailExists = this.checkEmailExists.bind(this);
        this.handleBlur = this.handleBlur.bind(this);
    } 
    public render() {
        const {userData, address} = this.props
        var showresults = <div>Laden..</div>
        if(userData && address){
            showresults=(<Formik
            initialValues={this.initialValues}
            validationSchema={SignUpSchema}
            onSubmit={this.onSubmit}
            render={this.renderFormik}/> );
       }
        return (<div>{showresults}</div>);
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
        if(values.email !== this.props.userData.email){
            await this.checkEmailExists(values);
        }       
        console.log(this.props)
        const personalValues:object = {
            firstname: values.firstname,
            lastname: values.lastname,
            email: values.email,
        }
        const addressValues:object = {
            street: values.street,
            streetnumber: values.streetnumber,
            city: values.city,
        }
        this.props.storeValues(personalValues, "personal"); // send values back to parent
        this.props.storeValues2(addressValues, "address");
        this.props.toggle() // go to modal
        formik.setSubmitting(false);
    }
    private renderFormik = (formik: FormikProps<IFormikValues>) => {
        return (
            <Form>
                <div className="row mb-md-3 justify-content-center">
                    <div className="col">
                    <span className="text-start">
                    {formik.touched.email && this.state.errormessage !== '' ? (<div className="text-danger">{this.state.errormessage}</div>)
                     : null  }</span>
                    </div>
                </div>
                <div className="form-group">
                 <div className="row justify-content-center">
                    <div className="col col-6" >
                        <div className="mb-2">
                            <label htmlFor="firstname">Voornaam</label>
                            <Field className="form-control" name="firstname"  type="text" />
                            <ErrorMessage
                            name="firstname"
                            component="div"
                            className="field-error text-danger"
                            />
                        </div>
                        <div className="mb-2">
                            <label htmlFor="lastname">Achternaam</label>
                            <Field className="form-control" name="lastname" type="text" />
                            <ErrorMessage
                            name="lastname"
                            component="div"
                            className="field-error text-danger"
                            />
                        </div>
                        <div className="mb-2">
                            <label htmlFor="email">Email</label>
                            <Field className="form-control" name="email" type="email" />
                            <ErrorMessage
                            name="email"
                            component="div"
                            className="field-error text-danger"
                            />
                        </div>   
                        <div className="col col-6" >
                        <div className="mb-2">
                            <label htmlFor="street">Straatnaam</label>
                            <Field className="form-control"name="street" type="text" />
                            <ErrorMessage
                            name="street"
                            component="div"
                            className="field-error text-danger"
                            />
                        </div>   
                    
                        <div className="mb-2">
                            <label htmlFor="streetnumber">Huisnummer</label>
                            <Field className="form-control"name="streetnumber"  type="text" />
                            <ErrorMessage
                            name="streetnumber"
                            component="div"
                            className="field-error text-danger"
                            />
                        </div>   
                        <div className="mb-2">
                            <label htmlFor="zipcode">Postcode</label>
                            <Field className="form-control"name="zipcode" type="text" />
                            <ErrorMessage
                            name="zipcode"
                            component="div"
                            className="field-error text-danger"
                            />
                        </div> 
                        <div className="mb-2">
                            <label htmlFor="city">Stad</label>
                            <Field className="form-control"name="city" type="text" />
                            <ErrorMessage
                            name="city"
                            component="div"
                            className="field-error text-danger"
                            />
                        </div>
                        <div className="mb-2">
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
                        </div>
                        <div className="form-group">
                        <button type="submit" className="btn btn-success btn-sm" style={{float:"right"}} 
                            disabled={!formik.isValid || formik.isValidating || formik.isSubmitting}
                            >
                                <strong>Wijzigen</strong>
                            </button>
                        </div> 
                    </div>
                </div>
            </div>
          </Form>
        );
    };   
}

export default withRouter(connect(null, {isEmailExists: IsEmailExists, changeUserData: ChangeData})(PersonalAddresssDataForm));