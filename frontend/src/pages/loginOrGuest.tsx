import * as React from 'react';
import LoggedInOrNot from 'src/components/checkout_components/LoggedInOrNot';
import './loginOrGuest.css'

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

                <div className="row mt-md-4">
                    <div className="col">
                        <div className="card">
                            <div className="card-header guestorLoginHeader">
                                <p className="card-text">Ik heb al een account
                                </p>
                            </div>
                            <div className="card-body">
                                <div className="row cardBodies ">
                                    <div className="col">
                                        <LoggedInOrNot userData={userData} address={address} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="row mt-md-4 ">
                    <div className="col">
                        <div className="card">
                            <div className="card-header guestorLoginHeader">

                                <p className="card-text">Ik heb nog geen account</p>

                            </div>
                            <div className="card-body">
                                <div className="row mt-md-4 mb-md-3 cardBodies ">
                                    <div className="col">
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