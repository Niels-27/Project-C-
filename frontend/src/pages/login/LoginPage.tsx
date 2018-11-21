import * as React from 'react';
import LoginForm from './LoginForm';

class LoginPage extends React.Component<any,any>{

    constructor(props: any) {
        super(props);
        this.state = {};
    }

    // public async componentDidMount() {

    // }

    public render() {
        return (
            <div>     
                <div className="row">
                    <div className="col-md-4 col-md-offset-4">
                        <LoginForm/> 
                    </div>
                        
                </div>
            </div>
        );
    }
}

export default LoginPage;