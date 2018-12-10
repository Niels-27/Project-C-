import * as React from 'react';
import "./overview.css";
class Overview extends React.Component<any,any>{
    constructor(props: any) {
        super(props);
        this.GetInfix = this.GetInfix.bind(this)
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
                        
                        <p className="cardText"><b>Laatste orderstatus</b></p> <p className="cardLinks"><a href="/dashboard/orders">Bestellingsoverzicht</a></p>
            
                        </div> 
                        <div className="card-body">
                            <p className="card-text">[Laatste orderstatus]</p>                  
                        </div>
                        </div>
                    </div>
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

                <div className="w-100 d-none d-md-block mt-md-4"/>

                <div className="col-6 col-sm-5 window">
                    <div className="card">
                        <div className="card-header cardHeader">
                        
                        <p className="cardText"><b>Geschiedenis</b></p> <p className="cardLinks"><a href="/dashboard/history">Geschiedenisoverzicht</a></p> 
            
                        </div> 
                        <div className="card-body">
                            <p className="card-text">[Geschiedenis]</p>                  
                        </div>
                    </div>
                </div>
                <div className="col-6 col-sm-5  window">
                    <div className="card">
                        <div className="card-header cardHeader">
                        
                        <p className="cardText"><b>Huidig afleveradres</b></p>  <p className="cardLinks"><a href="/dashboard/accountdetails">Wijzig adres</a></p>
                        </div> 
                        <div className="card-body">
                            <div className="card-text">
                            <div><p style={{margin: 0}}>{address.street} {address.postalCode} {address.city} {address.country.name}</p>
                            </div></div>  
                                   
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