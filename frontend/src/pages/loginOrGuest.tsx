import * as React from 'react';
import LoggedInOrNot from 'src/components/checkout_components/LoggedInOrNot';

class LoginOrGuest extends React.Component<any, any>{
    constructor(props: any) {
        super(props);
    }
    public render() {
        const {userData, address} = this.props;
        var showResults = <div>..</div>
        if(userData && address){
            showResults =
            (
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
                                        <LoggedInOrNot userData={userData} address={address} />
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
                                <div className="row mt-md-4 boxes">
                                    <div className="col window">
                                        <p className="card-text">Registreer en geniet van de vele voordelen.</p>
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
                </div>
            </div>
            )
        }
        return (
           <div>{showResults}</div>
        );
    }
}

export default LoginOrGuest;