import * as React from 'react';
import SignUpForm from './SignUpForm';
import * as PropTypes from 'prop-types';
import  { connect } from 'react-redux';
import { SignUpRequest, IsUserExists } from '../../actions/signUpActions';

class SignUpPage extends React.Component<any,any>{
    public static propTypes = {userSignUpRequest: PropTypes.func.isRequired, isUserExists: PropTypes.func.isRequired};
    constructor(props: any) {
        super(props);
        this.state = {};
    }

    public render() {
        const {userSignUpRequest, isUserExists } = this.props;
        return (
            <div className="container">                                     
                    <SignUpForm isUserExists ={isUserExists} userSignUpRequest={userSignUpRequest}
                    />  
            </div>
        );
    }
}

export default connect(null, {userSignUpRequest: SignUpRequest, isUserExists: IsUserExists})(SignUpPage);