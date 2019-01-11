import * as React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { ErrorMessage, Field, Form, Formik, FormikProps } from "formik";
import { PostAddress} from '../../actions/userActions';
import { Button, Modal, ModalHeader, ModalBody } from 'reactstrap';
import * as Yup from 'yup';
/* tslint:disable:no-empty */
/* tslint:disable:jsx-boolean-value */
interface IFormikValues {
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

class AdresModal extends React.Component<any, any & IFormikValues>{
        public initialValues: IFormikValues = {
            street: '',
            streetnumber: '',
            zipcode: '',
            city: '',
            country: '',
          };
    constructor(props: any) {
        super(props);
        this.state = {
            errors: {}, user: null, errormessage: ''
        };
        this.onSubmit = this.onSubmit.bind(this);
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
    private async onSubmit(values: IFormikValues, formik: FormikProps<IFormikValues>) {
        formik.setSubmitting(true)
        const adresObject : object = {
            userid: this.props.userData.id,
            street: values.street + " " + values.streetnumber,
            zipcode: values.zipcode,
            city: values.city,
            country: values.country,
        }

        console.log(this.state.errormessage)
        if (this.state.errormessage === '') {
            await this.props.PostAddress(adresObject, 'postAddress')
            .then(addedAdres => {console.log(addedAdres)}, (error) => console.log(error))  
            formik.resetForm();
            this.props.toggle(); 
            this.props.trigger();                
        }
        
        formik.setSubmitting(false)
    }
    private renderFormik = (formik: FormikProps<IFormikValues>) => {
        return (
            <Modal isOpen={this.props.modal} toggle={this.props.toggle}>
                <ModalHeader toggle={this.props.toggle}>Adres toevoegen</ModalHeader>
                <ModalBody>
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
                        <div className="mt-4'">
                              <Button type="submit" color="primary" style={{ float: "left" }}
                                            disabled={!formik.isValid || formik.isValidating || formik.isSubmitting}
                                        >
                                           Voeg toe
                            </Button>
                        <Button color="secondary" style={{ float: "right" }} onClick={this.props.toggle}>Cancel</Button>
                        </div>
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

export default withRouter(connect(null, {PostAddress} )(AdresModal));