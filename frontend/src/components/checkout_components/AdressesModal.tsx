import * as React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Modal, ModalHeader, ModalBody ,Button } from 'reactstrap';
import { RetrieveData, PostAddress } from 'src/actions/userActions';
import AdresModal from '../checkout_components/AdresModal';
/* tslint:disable:no-empty */
/* tslint:disable:jsx-boolean-value */

class AddressenModal extends React.Component<any, any>{

    constructor(props: any) {
        super(props);
        this.state = {
            modal: false, values: {}, type: '', count: 0, removedAdres: null, user:null}
        this.toggle = this.toggle.bind(this);
        this.renderAddresses = this.renderAddresses.bind(this);  
        
    }
    public async toggle() {
        await this.setState({
          modal: !this.state.modal  // open/close modal
        });
        return this.state.modal;
      }
      
    public render() {
        const { userData } = this.props
        var showresults = <div>Laden..</div>
        if (userData) {
        showresults=(<div>
            <Modal isOpen={this.props.modal} toggle={this.props.toggle}>
                <ModalHeader toggle={this.props.toggle}>Adres kiezen</ModalHeader>
                <ModalBody>
                    <p id="dashboard-text">
                    <b>Kies een adres als het afleveradres.</b>
                    </p>
                    <div className="row boxes">
                        {this.props.userData.addresses.map(this.renderAddresses)}
                    </div>
                    <div className="mt-4">
                              <Button type="submit" color="primary" style={{ float: "left" }} disabled={this.props.userData.addresses.length ===4} onClick={this.toggle}>
                                           Voeg nieuw adres toe
                            </Button>
                
                        <Button color="secondary" style={{ float: "right" }} onClick={this.props.toggle}>Cancel</Button>
                        </div>
            
                </ModalBody>

            </Modal>

           <AdresModal userData={userData} toggle={this.toggle} modal={this.state.modal} trigger={this.props.trigger}/>

            </div>   )     
        }
        return (<div>{showresults}</div>);
    }
    private renderAddresses(address, index) {
        var showButton= <span>Hoofdadres</span>
        if(index+1 !== 1){
            showButton = <span/>
        }
        const selectAdres = () =>{
            this.props.toggle();
            this.props.storeValue(address);
            this.props.giveId(address);       
            this.props.toggleBool();  
        }
        return(
            <div className="col col-sm-12 window" key={address.id} id={address.id}>
            <button onClick={selectAdres} className="btn btn-link">
            <div className="card">
                <div className="card-header cardHeader">            
                <p className="cardText"><b>Adres {index+1}</b></p> <p className="cardLinks">{showButton}</p>

                </div> 
                <div className="card-body">
                <div className="card-text">
                            <div><p style={{margin: 0}}>{address.street} {address.postalCode} {address.city} {address.country.name}</p>
                            </div></div>                
                </div>
            </div>
            </button>
        
        </div>
        );

    }

}
function mapStateToProps(state) {
    return {
      user: state.auth.user
    };
}

export default withRouter(connect(mapStateToProps,{RetrieveData, PostAddress} )(AddressenModal));