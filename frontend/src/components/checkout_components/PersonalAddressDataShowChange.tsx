import * as React from 'react';
import {withRouter}  from 'react-router-dom';
/* tslint:disable:no-empty */
/* tslint:disable:jsx-boolean-value */

class PersonalAddresssDataForm extends React.Component<any,any>{
    constructor(props: any) {
        super(props);
        this.state = {
            errors: {}, user: null, errormessage: '', modal: false
        };
    }
    public componentDidUpdate(){
        console.log("vanuticpomepen")
    }
    public render() {
        console.log("jebent er weer")
        const {userData, address} = this.props
        console.log(address)
        var showresults = <div>Laden..</div>  
        if (userData && address){
            showresults=  <div> 
            Je bent nu ingelogd als <b>{this.props.userData.name}</b>. <br/>
            Is de onderstaande informatie incorrect of wil je nog het adres wijzigen? Klik op <b>WIJZIG ADRES</b> om het huidige adres aan te passen.
            <div className="row mt-md-3">
                <div className="col">
                    <span className="text-start">
                            <h5>Woonadres</h5>
                            </span>
                    <hr/>
               </div>
             </div>
            
            <div className="form-group">
             <div className="row justify-content-center">
                <div className="col col-5" >
                    <div className="mb-2">
                        <label htmlFor="firstname">Voornaam</label>
                        <input value={this.props.userData.name.split(' ')[0]}className="form-control" name="firstname"  type="text" disabled/>
                    </div>
                      
                    <div className="mb-2">
                        <label htmlFor="street">Straatnaam</label>
                        <input value={this.props.address.street.split(" ")[0]}className="form-control"name="street" type="text" disabled />
                    </div>  
                    <div className="mb-5">
                        <label htmlFor="zipcode">Postcode</label>
                        <input  value={this.props.address.postalCode} className="form-control"name="zipcode" type="text" disabled />
                        
                    </div>  
                    </div>   
                    <div className="col col-5 ml-5" >
                    <div className="mb-2">
                        <label htmlFor="lastname">Achternaam</label>
                        <input  value={this.props.userData.name.split(' ')[1]}className="form-control" name="lastname" type="text" disabled />
                        
                    </div>      
                    <div className="mb-2">
                        <label htmlFor="streetnumber">Huisnummer</label>
                        <input  value={this.props.address.street.split(' ')[1]}className="form-control"name="streetnumber"  type="text"  disabled/>
                        
                    </div>    
                  
                    <div className="mb-2">
                        <label htmlFor="city">Stad</label>
                        <input  value={this.props.address.city}className="form-control"name="city" type="text"  disabled/>
                        
                    </div>
                    <div className="mb-4">
                        <label htmlFor="country">Land</label>
                        <select className="form-control"name="country" disabled={true}>
                        <option value="" disabled>Kies een land</option>
                            <option>Nederland</option>
                        </select>
                    </div>   
                    </div>
            </div>
            <span className="text-start">
                    <h5>Persoonlijke gegevens</h5>
                    </span>
                    <hr/>
            <div className="row">
                <div className="col col-5 ml-5" >
                        <div className="mb-2">
                        <label htmlFor="email">Email</label>
                        <input value={this.props.userData.email} className="form-control" name="email" type="email" disabled />
                    </div>     
                </div>
                </div>
        </div>
      </div>
       }
        
        return (<div>{showresults}</div>
           
        );
    }    
}

export default withRouter(PersonalAddresssDataForm);