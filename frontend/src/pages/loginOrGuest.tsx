import * as React from 'react';
import LoggedInOrNot from 'src/components/checkout_components/LoggedInOrNot';
import './loginOrGuest.css'
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import * as PropTypes from 'prop-types'
class LoginOrGuest extends React.Component<any, any>{
    public static propTypes = {isAuthenticated: PropTypes.bool.isRequired}
    constructor(props: any) {
        super(props);
        this.state={};
        this.toRegisterAndPay = this.toRegisterAndPay.bind(this);
        this.goToNoLoginForm = this.goToNoLoginForm.bind(this);
        
    }
    public toRegisterAndPay(){
        this.props.history.push({
            pathname: '/signup',
            state: { origin: this.props.location.state.origin }
        })
    }
    public goToNoLoginForm(){
        this.props.history.push({
            pathname: '/form',
            state: { origin: this.props.location.state.origin }
        })
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
                                        <LoggedInOrNot {...this.props}/>
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
                                        <div><button onClick={this.toRegisterAndPay} className="btn btn-success btn-md" disabled={this.props.isAuthenticated}>
                                            <strong>REGISTREREN EN AFREKENEN</strong>
                                        </button>
                                        </div>
                                        <hr />
                                        <p className="text-center">Of</p>
                                        <div className="">
                                        <p className="card-text">Reken af zonder account.</p>
                                            <button onClick={this.goToNoLoginForm} className="btn btn-success btn-md " disabled={this.props.isAuthenticated} >
                                                <strong>AFREKENEN ALS GAST</strong>
                                            </button>
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
function mapStateToProps(state) {
    return {
      isAuthenticated: state.auth.isAuthenticated
    };
}

export default withRouter(connect(mapStateToProps, {})(LoginOrGuest));