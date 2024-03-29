import * as React from 'react';
import  { connect } from 'react-redux';
import {
    withRouter
} from "react-router-dom";
import * as PropTypes from 'prop-types';
import { Field, Form, Formik, FormikProps, ErrorMessage} from "formik";
import * as Yup from 'yup';
import { Login, UserExists  } from '../actions/loginActions';

interface IFormikValues 
{
    email: string;
    password: string;
}
  class LoginPopupForm extends React.Component<any,any>{
    
    public static propTypes = 
    {login: PropTypes.func.isRequired, isUserExists: PropTypes.func.isRequired}

    public initialValues: IFormikValues =  {
        email: "",
        password: "",
    };
    public SignUpSchema = Yup.object({
        email: Yup.string()
          .email('Ongeldig emailadres')
          .required('Vereist'),
        password: Yup.string()
          .required('Vereist'),      
      }); 

        constructor(props: any) {
        super(props);
        this.state = {
            errors: {}, invalid: false, user: null, email: '', password: '', errormessage: ''
        };
        this.onSubmit = this.onSubmit.bind(this);
        this.checkUserExists = this.checkUserExists.bind(this);
   }

    public render() {
        return (
            <Formik
            initialValues={this.initialValues}
            validationSchema={this.SignUpSchema}
            onSubmit={this.onSubmit}
            render={this.renderFormik}
        /> );
    }  
    private  checkUserExists = async (values) => {
        await this.props.isUserExists(values).then((res) => { 
            { this.setState({errormessage: res}); console.log(this.state.errormessage)}
            }, () => { console.log("Something Wrong.. With This")});
    }
    private async onSubmit(values: IFormikValues, formik: FormikProps<IFormikValues>){

        formik.setSubmitting(true);

        await this.checkUserExists(values);

        if(this.state.errormessage ===''){
            await this.props.login(values).then(userData =>
            {
                alert("Je bent met succes ingelogd.\n" + "Welkom, " + userData.name + "!");
                if(userData.rank === 4){
                    location.reload();
                }

            }, (error) => 
                {alert("Er is iets misgegaan tijdens het inloggen. Probeer het later nog eens. ");
                formik.setSubmitting(false)}
            );    
        }     
        else {formik.setSubmitting(false);}
    }
    private renderFormik = (formik: FormikProps<IFormikValues>) => {
        return (
            <Form>
                <div className="form-group">
                 <div className="row mt-3">
                    <div className="col" >
                        <div>
                            <label htmlFor="email">Email</label>
                            <Field className="form-control" name="email" type="email"/>
                            <ErrorMessage
                            name="email"
                            component="div"
                            className="field-error text-danger"
                            />
                        </div>   
                        <div className="mt-3">
                            <label htmlFor="password">Wachtwoord</label>
                            <Field className="form-control"name="password" type="password" />
                             <ErrorMessage
                            name="password"
                            component="div"
                            className="field-error text-danger"
                            />
                        </div>
                        { this.state.errormessage !== ''? (<div className="alert alert-danger mt-md-3 ">{this.state.errormessage}</div>)
                        : null}  
                       
                        <div className="mt-md-3">
                             <button type="submit" className="btn btn-success btn-md btn-block "
                                 disabled={!formik.isValid || formik.isSubmitting || formik.isValidating}
                                >

                                 <strong>Log in</strong>
                                </button>
                        </div>    
                    </div>
                </div>
            </div>
          </Form>
        );
    }; 
}
export default withRouter(connect(null, {login : Login, isUserExists: UserExists})(LoginPopupForm));