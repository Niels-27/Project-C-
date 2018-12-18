import * as React from 'react';
import ModalForm from '../dashboard_containers/accoundetails_components/ModalForm';
import PersonalAddressDataShowChange from './PersonalAddressDataShowChange';

class WithModal2 extends React.Component<any,any> {
  constructor(props) {
    super(props);
    this.state = {
      modal: false, values: {}, type: '', values2: {}, type2: ''
    };

    this.toggle = this.toggle.bind(this);
    this.storeValues = this.storeValues.bind(this);
    this.storeValues2 = this.storeValues2.bind(this);
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
  public storeValues2(values2: object, type2:string){
    this.setState({values2});
    this.setState({type2});
  }
  public render() {
      const {userData, address} = this.props;
      const {values, modal, type, values2, type2} = this.state;
      var result = <div>.</div>
      if(userData && address){  
         result = <PersonalAddressDataShowChange userData={userData} address={address} toggle={this.toggle} storeValues2={this.storeValues2} storeValues={this.storeValues} {...this.props}/>
      }
    return (
      <div>
        {result}
        <ModalForm userData={userData} values={values} values2={values2} type2={type2} type={type} toggle={this.toggle} modal={modal}/>
      </div>
    );
  }
}

export default WithModal2;
 
  