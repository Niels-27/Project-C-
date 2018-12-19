/* eslint react/no-multi-comp: 0, react/prop-types: 0 */
import * as React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PersonalAddressDataShowChange from './PersonalAddressDataShowChange';
import AddressesModal from './AdressesModal';
import { RetrieveData } from '../../actions/userActions';
import * as PropTypes from 'prop-types'
import LoginFormCheckout from '../checkout_components/LoginFormCheckout';
class LoggedInOrNot extends React.Component<any, any> {
    public static propTypes = { isAuthenticated: PropTypes.bool.isRequired };
    constructor(props: any) {
        super(props);
        this.state = {modal: false, values: {}, address: null, doSomething: false}
        this.toggle = this.toggle.bind(this);
        this.toggleBool = this.toggleBool.bind(this)
    }
    public async toggle() {
        await this.setState({
          modal: !this.state.modal  // open/close modal
        });
        return this.state.modal;
      }
      public async toggleBool(){
        await this.setState({
            doSomething: !this.state.doSomething  // open/close modal
          });     
      }

    public render() {
        const goToPayment = () => {
            if(this.props.location.state){
                this.props.history.push({
                    pathname:this.props.location.state.origin,
                    state: {origin: "/checkout"}})
            }
            else{
                alert("Je hebt geen items in de winkelmand.")
                this.props.history.push("/ShoppingCard")
            }
        }
        console.log(this.props)
        const { isAuthenticated, userData, address } = this.props;
        const {modal,doSomething, type} = this.state;   
        var renderComponent = <div>..</div>
        if (isAuthenticated && userData && address) {
            renderComponent = <div>
               <PersonalAddressDataShowChange toggleBool={this.toggleBool}doSomething ={doSomething}address={address}toggle={this.toggle} {...this.props}/>
                <div className="mt-md-5">
                    <button onClick={goToPayment}className="btn btn-success btn-md" style={{ float: "left" }}>
                        <strong>GA NAAR KASSA</strong>
                      </button>
                    <button className="btn btn-secondary btn-md" style={{ float: "right" }} onClick={this.toggle}><b>WIJZIG ADRES</b></button>
                </div>
                <AddressesModal toggleBool={this.toggleBool} type={type} toggle={this.toggle} modal={modal}{...this.props}/>
            </div>
        }
        else if (!isAuthenticated) {
            renderComponent = <LoginFormCheckout {...this.props} />;
        }
        return (
            <div>
                {renderComponent}
            </div>
        );
    }
}
export default withRouter(connect(mapStateToProps, { RetrieveData })(LoggedInOrNot));

function mapStateToProps(state) {
    return {
        isAuthenticated: state.auth.isAuthenticated,
        user: state.auth.user
    };
}