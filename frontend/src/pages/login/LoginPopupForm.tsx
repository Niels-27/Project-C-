import * as React from 'react';
import  { connect } from 'react-redux';
import * as PropTypes from 'prop-types';
import { Field, Form, Formik, FormikProps} from "formik";
import * as Yup from 'yup';
import { LoginRequest, UserExists  } from '../../actions/loginActions';

interface IFormikValues 
{
    email: string;
    password: string;
    firstname: string,
    lastname: string,
}

  class LoginPopupForm extends React.Component<any,any>{
    
    public static propTypes = 
    {userLoginRequest: PropTypes.func.isRequired, isUserExists: PropTypes.func.isRequired}

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
        this.handleBlur = this.handleBlur.bind(this);
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
    private handleBlur = (e) => {
        this.setState({errormessage: ''})
    }
    private  checkUserExists = async (email, password) => {
        await this.props.isUserExists(email, password).then((res) => { 
            { this.setState({errormessage: res}); }
            }, () => { console.log("Something Wrong.. With This")});
    }
    private async onSubmit(values: IFormikValues, formik: FormikProps<IFormikValues>){
        formik.setSubmitting(true);
        await this.checkUserExists(values.email, values.password);
        if(this.state.errormessage===''){
        this.setState({ errors: {}});
        this.props.userLoginRequest(values).then(  // Deez doet het nog niet..
            () => {
                alert("Je bent met succes ingelogd.\n" + "Welkom, " + values.firstname + " " + values.lastname + "!");
                this.props.history.push("/");
            },
            ({data}) => this.setState({ errors: data})
        );
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
                            <Field className="form-control" name="email" type="email" onBlur={this.handleBlur}/>
                            {formik.errors.email ?(<div className="text-danger" >{formik.errors.email}</div>
                            ) : this.state.errormessage!== '' && !formik.errors.email ? (
                                <div className="text-danger">{this.state.errormessage}</div>
                            ) :null
                                } 
                        </div>   
                        <div>
                            <label htmlFor="password">Wachtwoord</label>
                            <Field className="form-control"name="password" type="password" onBlur={this.handleBlur}  />
                            {formik.errors.password?(<div className="text-danger" > {formik.errors.password}</div>
                            ) : this.state.errormessage!== '' && !formik.errors.password ? (
                                null
                            ) :null}
                        </div> 
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
export default connect(null, {userLoginRequest: LoginRequest, isUserExists: UserExists})(LoginPopupForm);