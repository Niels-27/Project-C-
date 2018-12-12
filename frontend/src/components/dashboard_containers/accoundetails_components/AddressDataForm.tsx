import * as React from 'react';
import * as PropTypes from 'prop-types';
import  { connect } from 'react-redux';
import {withRouter}  from 'react-router-dom';
import {ChangeData} from '../../../actions/userActions';
import {ErrorMessage, Field, Form, Formik, FormikProps} from "formik";
import * as Yup from 'yup';
/* tslint:disable:no-empty */
/* tslint:disable:jsx-boolean-value */

interface IFormikValues {
    id: number;
    street: string;
    streetnumber: string;
    zipcode: string;
    city: string;
    country: string;
    }

  const SignUpSchema = Yup.object().shape({
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

class AddressDataForm extends React.Component<any,any & IFormikValues>{
    public static propTypes = 
    {changeAddressData: PropTypes.func.isRequired}
    public initialValues: IFormikValues = {
        id: this.props.address.id,
        street: this.props.address.street.split(" ")[0],
        streetnumber: this.props.address.street.split(" ")[1],
        zipcode: this.props.address.postalCode,
        city: this.props.address.city,
        country: this.props.address.country,
      };
    constructor(props: any) {
        super(props);
        this.state = {
            errors: {}, user: null, errormessage: ''
        };
        this.onSubmit = this.onSubmit.bind(this);
    } 
    public render() {
        const {address} = this.props
        var showresults = <div>Laden..</div>
        if(address){
            showresults=(<Formik
            initialValues={this.initialValues}
            validationSchema={SignUpSchema}
            onSubmit={this.onSubmit}
            render={this.renderFormik}/> );
       }
        return (<div>{showresults}</div>);
    }  
    private async onSubmit(values: IFormikValues, formik: FormikProps<IFormikValues>){
        formik.setSubmitting(true);
   
        console.log(this.props)
        this.props.storeValues(values, "address"); // send values back to parent
        this.props.toggle() // go to modal
        formik.setSubmitting(false);
    }
    private renderFormik = (formik: FormikProps<IFormikValues>) => {
        return (
            <Form>
                <div className="row mb-md-3 justify-content-center">
                    <div className="col col-11">
                    <span className="text-start">
                    {this.state.errormessage !== '' ? (<div className="text-danger">{this.state.errormessage}</div>)
                     : null  }</span>
                    </div>
                </div>
                <div className="form-group">
                 <div className="row justify-content-center">
                    <div className="col-10" >
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

export default withRouter(connect(null, {changeAddressData: ChangeData})(AddressDataForm));