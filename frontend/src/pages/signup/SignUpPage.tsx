import * as React from 'react';
import SignUpForm from './SignUpForm';
import * as PropTypes from 'prop-types';
import  { connect } from 'react-redux';
import { SignUpRequest, IsEmailExists } from '../../actions/signUpActions';
import { Login } from '../../actions/loginActions';

class SignUpPage extends React.Component<any,any>{
    public static propTypes = {userSignUpRequest: PropTypes.func.isRequired, isEmailExists: PropTypes.func.isRequired
    ,login : PropTypes.func.isRequired};
    constructor(props: any) {
        super(props);
        this.state = {};
    }

    public render() {
        const {userSignUpRequest, isEmailExists, login } = this.props;
        return (
            <div className="container">                                     
                    <SignUpForm login={login} isEmailExists={isEmailExists} userSignUpRequest={userSignUpRequest}
                    />  
            </div>
        );
    }
}

export default connect(null, {userSignUpRequest: SignUpRequest, isEmailExists: IsEmailExists , login: Login})(SignUpPage);