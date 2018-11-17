import * as React from 'react';
import SignUpForm from './SignUpForm';
import * as PropTypes from 'prop-types';
import  { connect } from 'react-redux';
import { SignUpRequest } from '../../actions/signUpActions';

class SignUpPage extends React.Component<any,any>{
    public static propTypes = {userSignUpRequest: PropTypes.func.isRequired};
    constructor(props: any) {
        super(props);
        this.state = {};
    }

    public render() {
        const {userSignUpRequest} = this.props;
        return (
            <div className="container">                                     
                    <SignUpForm userSignUpRequest={userSignUpRequest}/>  
            </div>
        );
    }
}

export default connect(null, {userSignUpRequest: SignUpRequest})(SignUpPage);