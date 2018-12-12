import * as React from 'react';
import './accountdetails.css';
import WithModal from './accoundetails_components/WithModal';
import PasswordChangeForm from './accoundetails_components/PasswordChangeForm';

class AccountDetails extends React.Component<any,any>{
    constructor(props: any) {
        super(props);
    }
    public render() {
        const {userData, address} = this.props
        var showresults = <div>Laden..</div>
        if(userData && address){
            showresults = 
            <div className="container">
                <h5><b>Mijn gegevens</b></h5>
                <p id="dashboard-text">
                    Hier kun je je contactgegevens bekijken of wijzigen.  
                </p>                                    
                <div className="row mt-md-4 boxes">
                    <div className="col-6 col-sm-5 window">
                        <div className="card">
                        <div className="card-header cardHeader">             
                        <p className="cardText"><b>Persoonlijke gegevens</b>
                        </p>
                        </div> 
                        <div className="card-body">
                            <div className="card-text"><WithModal userData={userData} address={address} showComponent="personal"/></div>                  
                        </div>
                        </div>
                    </div>
                    <div className="col-6 col-sm-5 window">
                        <div className="card">
                            <div className="card-header cardHeader">
                            
                            <p className="cardText"><b>Wachtwoord wijzigen</b></p>
                
                            </div> 
                            <div className="card-body">
                                <div className="card-text"><PasswordChangeForm userData={userData}/></div>                  
                            </div>
                        </div>
                    </div>
                </div>

                    <div className="row mt-md-4 boxes">
                        <div className="col-6 col-sm-5 window">
                            <div className="card">
                                <div className="card-header cardHeader">
                                
                                <p className="cardText"><b>Adresgegevens</b></p>
                    
                                </div> 
                                <div className="card-body">
                                    <div className="card-text"> <WithModal userData={userData} address={address} showComponent="address"/></div>                  
                                </div>
                            </div>
                        </div>
                    </div> 
            </div>
            
        }
        return (
            <div>
                {showresults}
            </div>
        );
    }
}

export default AccountDetails;