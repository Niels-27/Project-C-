import * as React from 'react';
import SignUpForm from './SignUpForm';
import ApiCall from '../../logic/apiCall' 


class SignUpPage extends React.Component<any,any>{

    constructor(props: any) {
        super(props);
        this.state = {countryOpt: ''};
    }

    public async componentDidMount() {
        const call: ApiCall = new ApiCall();
        call.setURL("country");
        await this.setState({ countryOpt: await call.result() });
    }

    public render() {
        return (
            <div className="container">                                     
                    <SignUpForm countryOps={this.state.countryOpt}/>  
            </div>
        );
    }
}

export default SignUpPage;