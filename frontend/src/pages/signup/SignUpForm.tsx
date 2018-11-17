import * as React from 'react';
// import map from 'lodash/map';
import * as PropTypes from 'prop-types';
import validateInput from '../../validations/signup'
import {ErrorMessage, Field, Form, Formik, FormikProps} from "formik";
import * as Yup from 'yup';
// import ApiCall from '../../logic/apiCall' 
/* tslint:disable:no-empty */

interface IFormikValues {
    firstname: string;
    lastname: string;
    email: string;
  }
const initialValues: IFormikValues = {
    firstname: "",
    lastname: "",
    email: ""
  };

  const SignUpSchema = Yup.object().shape({

    firstname: Yup.string()
      .min(2, 'Must be longer than 2 characters')
      .max(20, 'Nice try, nobody has a first name that long')
      .required('Required'),
    lastname: Yup.string()
      .min(2, 'Must be longer than 2 characters')
      .max(20, 'Nice try, nobody has a last name that long')
      .required('Required'),
      email: Yup.string()
      .email('Invalid email address')
      .required('Required'),
  });


class SignUpForm extends React.Component<any,any>{
    public static propTypes = {userSignUpRequest: PropTypes.func.isRequired};
    constructor(props: any) {
        super(props);
        this.state = {
            errors: {}
        };
        this.onSubmit = this.onSubmit.bind(this);
    }
    public isValid() {
        const { errors, isValid } = validateInput(this.state);
    
        if (!isValid) {
          this.setState({ errors });
        }
    
        return isValid;
      }
    public async onSubmit(values){
       
            setTimeout(() => {
              alert(JSON.stringify(values, null, 2));
            }, 500);
          
        // if (this.isValid()) {

        //     this.setState({ errors: {}, isLoading: true });
        //     this.props.userSignUpRequest(this.state).then(
        //       () => {},
        //       ({data}) => this.setState({ errors: data, isLoading: false })
        //     );
        //   }
        // const call: ApiCall = new ApiCall();
        // call.setURL("testuser");
        // await this.setState({ countryOpt: await call.result(this.state)});
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
    private renderFormik = (formik: FormikProps<IFormikValues>) => {
        return (
            <Form>
                <div className="form-group">
                <div className="mb-5 mt-5">
                    <label htmlFor="firstname">First Name</label>
                    <Field className="form-control" name="firstname" placeholder="Jane" type="text" />
                    <ErrorMessage
                    name="firstname"
                    component="div"
                    className="field-error"
                    />
                </div>
                <div className="mb-5">
                    <label htmlFor="lastname">Last Name</label>
                    <Field className="form-control" name="lastname" placeholder="Doe" type="text" />
                    <ErrorMessage
                    name="lastname"
                    component="div"
                    className="field-error"
                    />
                    </div>
                    <div className="mb-5">
                    <label htmlFor="email">Email</label>
                    <Field className="form-control"name="email" placeholder="jane@acme.com" type="email" />
                    <ErrorMessage
                    name="email"
                    component="div"
                    className="field-error"
                    />
                    </div>
        
                    
                <div className="form-group">
                   <button type="submit" className="btn btn-success btn-lg "
                    disabled={!formik.isValid || formik.isSubmitting || formik.isValidating}
                    onClick={formik.submitForm}>
                        <strong>Aanmelden</strong>
                    </button>
                </div>      
            </div>
          </Form>
        );
    };   
}

export default SignUpForm;