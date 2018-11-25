import * as React from 'react';
import LoginForm from './LoginForm';

class LoginPage extends React.Component<any,any>{

    constructor(props: any) {
        super(props);
        this.state = {};
    }

    public render() {
        return (
            <div>     
                <div className="row">              
                        <LoginForm/>       
                </div>
            </div>
        );
    }
}

export default LoginPage;