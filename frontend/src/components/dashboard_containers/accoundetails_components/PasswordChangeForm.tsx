import * as React from 'react';
import * as PropTypes from 'prop-types';
import  { connect } from 'react-redux';
import {withRouter}  from 'react-router-dom';
import {ChangeData} from '../../../actions/userActions';
import { Logout, UserExists  } from '../../../actions/loginActions';
import {ErrorMessage, Field, Form, Formik, FormikProps} from "formik";
import * as Yup from 'yup';
/* tslint:disable:no-empty */
/* tslint:disable:jsx-boolean-value */

interface IFormikValues {
    id: number;
    password: string
    newPassword: string
    newPasswordConfirmation: string
    email: string;
    }

  const SignUpSchema = Yup.object().shape({
    password: Yup.string()
      .required('Vereist'),
    newPassword: Yup.string()
      .min(6, 'Het wachtwoord moet langer zijn dan 6 karakters')
      .max(20, 'Leuk geprobeerd, maar verzin een korter wachtwoord ;-)') 
      .required('Vereist')
      .notOneOf([Yup.ref('password'), null], "Het wachtwoord mag niet hezelfde zijn als je oude wachtwoord. Verzin een nieuwe"),     
    newPasswordConfirmation: Yup.string()
      .oneOf([Yup.ref('newPassword'), null], "De wachtwoorden komen niet overeen")                                
      .required('Vereist'),
  });

class PasswordChangeForm extends React.Component<any,any & IFormikValues>{
    public static propTypes = 
    {changeUserData: PropTypes.func.isRequired, isUserExists: PropTypes.func.isRequired, logout: PropTypes.func.isRequired}
    public initialValues: IFormikValues = {
        id: this.props.userData.id,
        email: this.props.userData.email,
        password: '',
        newPassword: '',
        newPasswordConfirmation: ''
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
        const {userData} = this.props
        var showresults = <div>Laden..</div>
        if(userData){
            showresults=(<Formik
            initialValues={this.initialValues}
            validationSchema={SignUpSchema}
            onSubmit={this.onSubmit}
            render={this.renderFormik}/> );
       }
        return (<div>{showresults}</div>);
    }  
    private  checkUserExists = async (values) => {
        await this.props.isUserExists(values).then((res) => { 
            { this.setState({errormessage: res}); console.log(this.state.errormessage)}
            }, () => { console.log("Something Wrong.. With This")});
    }
    private async onSubmit(values: IFormikValues, formik: FormikProps<IFormikValues>){
        formik.setSubmitting(true)

        await this.checkUserExists(values);

        console.log(this.props)
        const {changeUserData} = this.props;
        console.log(this.state.errormessage)
        if(this.state.errormessage === ''){
            console.log("gelukt!")
            await changeUserData(values, "password")
            .then( (result) => {console.log(result);alert("Je wachtwoord is gewijzigd! Log opnieuw in.")
                  this.props.logout()}, 
            () => this.setState({errormessage: "Er is iets misgegaan."}) )
            
            // formik.resetForm(this.initialValues);
        }
        formik.setSubmitting(false)
       //  alert("Wijziging mislukt!")
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
                            <label htmlFor="password">Wachtwoord</label>
                            <Field className="form-control"name="password" type="password" />
                            <ErrorMessage
                            name="password"
                            component="div"
                            className="field-error text-danger"
                            />
                        </div> 
                        <div className="mb-2">
                            <label htmlFor="newPassword">Nieuw wachtwoord</label>
                            <Field className="form-control"name="newPassword" type="text" />
                            <ErrorMessage
                            name="newPassword"
                            component="div"
                            className="field-error text-danger"
                            />
                        </div>   
                        <div className="mb-2">
                            <label htmlFor="newPasswordConfirmation">Herhaal nieuw wachtwoord</label>
                            <Field className="form-control"name="newPasswordConfirmation"  type="text" />
                            <ErrorMessage
                            name="newPasswordConfirmation"
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

export default withRouter(connect(null, {changeUserData: ChangeData, isUserExists: UserExists, logout: Logout})(PasswordChangeForm));