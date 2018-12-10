import * as React from 'react';
import ModalForm from './ModalForm';
import PersonalDataForm from './PersonalDataForm';
import AddressDataForm from './AddressDataForm';

class WithModal extends React.Component<any,any> {
  constructor(props) {
    super(props);
    this.state = {
      modal: false, values: {}, type: ''
    };

    this.toggle = this.toggle.bind(this);
    this.storeValues = this.storeValues.bind(this);
  }
  public async toggle() {
    await this.setState({
      modal: !this.state.modal  // open/close modal
    });
    return this.state.modal;
  }
  public storeValues(values: object, type: string){
    this.setState({values});
    this.setState({type});
  }
  public render() {
      const {userData, address, showComponent} = this.props;
      const {values, modal, type} = this.state;
      var result = <div>.</div>
      if(userData && address){   
        if(showComponent === "personal"){
        result = <div><PersonalDataForm userData={userData} address={address} toggle={this.toggle} storeValues={this.storeValues} {...this.props} /></div>
        } else{
          result = <div><AddressDataForm userData={userData} address={address} toggle={this.toggle} storeValues={this.storeValues} {...this.props} /></div>
        }
      }
    return (
      <div>
        {result}
        <ModalForm userData={userData} values={values} type={type} toggle={this.toggle} modal={modal}/>
      </div>
    );
  }
}

export default WithModal;
 
  