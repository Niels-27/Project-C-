import * as React from 'react';
import "./overview.css";
class Overview extends React.Component<any,any>{
    constructor(props: any) {
        super(props);
        this.GetInfix = this.GetInfix.bind(this)
        this.renderAdres = this.renderAdres.bind(this)
    }

    public render() {
        const {userData, address} = this.props
        console.log(this.props)
        var showresults = <span>..</span>
        var title = "";
        if (userData && address){
            title = this.GetInfix(userData.gender);
            showresults = (
            <div> 
            <h5><b>Mijn overzicht</b></h5>
            <p id="dashboard-text">
                Hallo {userData.name} <br/>
                Hier kan je het overzicht van jouw bestellingen, accountgegevens en geschiedenis bekijken en beheren.    
            </p>
            <div className="row boxes">
        
                <div className="col-6 col-sm-5 window">
                    <div className="card">
                        <div className="card-header cardHeader">
                        
                        <p className="cardText"><b>Contactgegevens</b></p>  <p className="cardLinks"><a href="/dashboard/accountdetails">Details</a></p>
            
                        </div> 
                        <div className="card-body">
                            <p className="card-text">{title} {userData.name}<br/>
                                                    {userData.email}</p>                  
                        </div>
                    </div>
                </div>
                <div className="col-6 col-sm-5  window">
                    <div className="card">
                        <div className="card-header cardHeader">
                        
                        <p className="cardText"><b>Hoofdadres</b></p>  <p className="cardLinks"><a href="/dashboard/addressen">Wijzig of voeg nieuw adres toe</a></p>
                        </div> 
                        <div className="card-body">
                            <div className="card-text">
                            {this.props.userData.addresses.slice(0, 1).map(this.renderAdres)}   <a href="/dashboard/accountdetails">Verander hoofdadres</a>
                            
                            </div>  
                                   
                        </div>
                    </div>                   
                </div>
            </div>
        </div>)
        }
        return (
            <div className="container">
                {showresults}        
            </div>   
        );
    }
    private renderAdres = (address) =>{
        return(<div key={address.id}
        ><p style={{margin: 0}}>{address.street} {address.postalCode} {address.city} {address.country.name}</p>
        </div>);

    }
    private GetInfix(gender : string){
        switch(gender){
            case "Man" :
               return "Meneer"      
            case "Vrouw":
                return "Mevrouw"
            default: return ""       
        }          
    }
}

export default Overview;