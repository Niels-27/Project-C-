/* eslint react/no-multi-comp: 0, react/prop-types: 0 */
import * as React from 'react';
import { connect } from 'react-redux';
import { withRouter} from 'react-router-dom';
import { MdPerson } from "react-icons/md";
import { Popover, PopoverHeader, PopoverBody } from 'reactstrap';
import * as PropTypes from 'prop-types'
import LoginPopupForm from './LoginPopupForm';
import UserMenu from './UserMenu';
class LoginPopup extends React.Component<any,any> {

  public static propTypes = {isAuthenticated: PropTypes.bool.isRequired};

  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      popoverOpen: false,
    };
  }
  public render() {
    var renderComponent = <LoginPopupForm/>;
    var popheader = <div>Login</div>
    if(this.props.isAuthenticated){
      renderComponent = <UserMenu/>;
      popheader = <div>Account</div>
    }
    return (
      <div>
        <a id="PopLogin" onClick={this.toggle}><MdPerson size={32} style={{color: 'black'}}/> </a>
        <Popover placement="bottom" isOpen={this.state.popoverOpen} target="PopLogin" toggle={this.toggle}>
          <PopoverHeader>{popheader}</PopoverHeader>
          <PopoverBody>{renderComponent}</PopoverBody>
        </Popover>
      </div>
    );
  }

  private toggle() {
    this.setState({ popoverOpen: !(this.state.popoverOpen)});
  } 
}
export default withRouter(connect(mapStateToProps)(LoginPopup));

function mapStateToProps(state) {
  return {
    isAuthenticated: state.auth.isAuthenticated
  };
}