import * as React from 'react';
import  { connect } from 'react-redux';
import {
    withRouter
} from "react-router-dom";
import * as PropTypes from 'prop-types';
import { Field, Form, Formik, FormikProps, ErrorMessage} from "formik";
import * as Yup from 'yup';
import { Login, UserExists  } from '../../actions/loginActions';

interface IFormikValues 
{
    email: string;
    password: string;
    firstname: string,
    lastname: string,
}
// const GetIp = async () => {
//     return await fetch('https://api.ipify.org', {method: 'get', credentials: "omit", headers:{'content-type': 'application/json'}})
//     .then(response => {
//         console.log(response)
//         return response.text;
//     })
//     .catch(err => {
//         console.log(err);
//         return err;
//     });
// };

  class LoginPopupForm extends React.Component<any,any>{
    
    public static propTypes = 
    {login: PropTypes.func.isRequired, isUserExists: PropTypes.func.isRequired}

    public initialValues: IFormikValues =  {
        email: "",
        password: "",
        firstname: "",
        lastname: "",
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
    private  checkUserExists = async (email, password) => {
        await this.props.isUserExists(email, password).then((res) => { 
            { this.setState({errormessage: res}); console.log(this.state.errormessage)}
            }, () => { console.log("Something Wrong.. With This")});
    }
    private async onSubmit(values: IFormikValues, formik: FormikProps<IFormikValues>){

        formik.setSubmitting(true);

        await this.checkUserExists(values.email, values.password);

        if(this.state.errormessage ===''){
            const result = await this.props.login(values).then(userData =>
            {
                alert("Je bent met succes ingelogd.\n" + "Welkom, " + userData.name + "!");
                this.props.history.push("/")
            }, (error) => 
                {alert(error.text);
                this.props.history.push("/") ;}
            );    
            console.log(result) ;
        }     
        else {formik.setSubmitting(false);}
    }
    private renderFormik = (formik: FormikProps<IFormikValues>) => {
        return (
            <Form>
                <div className="form-group">
                 <div className="row">
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
                        { this.state.errormessage !== ''? (<div className="alert alert-danger mt-md-2 ">{this.state.errormessage}</div>)
                        : null}  
                        <div>
                           <span className="nav-link">Nog geen account? <a href="/signup">Klik hier</a></span>
                        </div> 
                        <div className="mt-md-2">
                             <button type="submit" className="btn btn-success btn-md "
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