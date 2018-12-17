import * as React from 'react';
import LoginFormCheckout from 'src/components/checkout_components/LoginFormCheckout';

class LoginOrGuest extends React.Component<any,any>{
    constructor(props: any) {
        super(props);
    }
    public render() {
        return (
            <div className="container">
                                            
            <div className="row mt-md-4 boxes">
                <div className="col-6 col-sm-8 window">
                    <div className="card">
                    <div className="card-header cardHeader">             
                    <p className="cardText"><b>Ik heb al een account</b>
                    </p>
                    </div> 
                    <div className="card-body">
                    <div className="row mt-md-4 boxes">
                    <div className="col-6 col-sm-6 window">
                        <div className="card-text"><b>Login</b></div>                  
                        <LoginFormCheckout/>
                        </div>
                    </div>
                    </div>
                    </div>
                </div>
            </div>

                <div className="row mt-md-4 boxes">
                    <div className="col-6 col-sm-8 window">
                        <div className="card">
                            <div className="card-header cardHeader">
                            
                            <p className="card-text"><b>Ik heb nog geen account </b></p>
                
                            </div> 
                            <div className="card-body">

                            <p className="card-text"><b>Registreer en geniet van de vele voordelen. </b></p>

                             <div><a href="/signup" className="btn btn-success btn-md  ">
                                <strong>REGISTREREN EN AFREKENEN</strong>
                            </a>
                            </div>
                            <hr />
                            <p className="text-center">Of</p>
                            <div className="">
                            <a href="/userform" className="btn btn-success btn-md mt-4 ">
                                <strong>AFREKENEN ALS GAST</strong>
                            </a>  
                            </div>                            
                            </div>
                        </div>
                    </div>
                </div> 
        </div>
        );
    }
}

export default LoginOrGuest;