import * as React from 'react';
import "./overview.css";
import * as PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter} from 'react-router-dom';
import { RetrieveData, PostAddress } from '../../actions/userActions';
import AdresModal from './addressen_components/AdresModal';
class Addressen extends React.Component<any,any>{
    public static propTypes = {user: PropTypes.object.isRequired}
    constructor(props: any) {
        super(props);
        this.state = {modal: false, values: {}, type: '', count: 0, removedAdres: null}
        this.toggle = this.toggle.bind(this);
        this.renderAdres = this.renderAdres.bind(this);
    }
    public async toggle() {
        await this.setState({
          modal: !this.state.modal  // open/close modal
        });
        return this.state.modal;
      }
    public render() {
        const {userData} = this.props
        console.log(this.props)
        var showresults = <span>..</span>
        if ( userData ){
            showresults = (
            <div> 
            <h5><b>Mijn adressen</b></h5>
            <p id="dashboard-text">
                Hier kan je het overzicht van jouw addressen bekijken en beheren. <br/>
                <b>Je mag maximaal 4 addressen beheren.</b>
            </p>
            <div className="row boxes">
                {this.props.userData.addresses.map(this.renderAdres)}
            </div>
            <div className="mt-4">
            <button className="btn btn-success btn-md" onClick={this.toggle} disabled={this.props.userData.addresses.length ===4}>
                                <strong>Voeg een adres toe</strong>
            </button>
            </div>
            <AdresModal userData={userData} toggle={this.toggle} modal={this.state.modal}/>
        </div>)
        }
        return (
            <div className="container">
                {showresults}        
            </div>   
        );
    }
    private renderAdres(address, index){
        const adresObject : object = {
            id: address.id,
            street: address.street,
            zipcode: address.zipcode,
            city: address.city,
            country: address.country.name,
        }
        const removeAdres= () =>{
            this.props.PostAddress(adresObject, "removeAddress")
            .then(removedAdres => {console.log(removedAdres); this.props.history.go() }, error => console.log(error))   // insert functie which removes adres en refreshes the page
        }
        var showButton= <span>Hoofdadres</span>
        if(index+1 !== 1){
            showButton = (<button className="btn btn-link btn-sm"onClick={removeAdres}>Verwijder adres</button>)
        }
        return(
            <div className="col-6 col-sm-5 window" key={address.id}>
            <div className="card">
                <div className="card-header cardHeader">            
                <p className="cardText"><b>Adres {index+1}</b></p> <p className="cardLinks">{showButton}</p>

                </div> 
                <div className="card-body">
                <div className="card-text">
                            <div><p style={{margin: 0}}>{address.street} {address.zipcode} {address.city} {address.country.name}</p>
                            </div></div>                
                </div>
            </div>
        </div>
        );
    }

}

export default withRouter(connect(mapStateToProps, {RetrieveData, PostAddress})(Addressen));

function mapStateToProps(state) {
    return {
      user: state.auth.user
    };
}