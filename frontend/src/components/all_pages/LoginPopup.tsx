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
  // public componentWillMount(){
  //   if (!this.props.isAuthenticated) {
  //     alert("Je hebt geen toegang. Niet geautoriseerd");
  //     this.props.history.push('/');
  //   }
  // }
  // public componentDidUpdate(nextProps){
  //   if (!nextProps.isAuthenticated) {
  //     this.props.history.push('/');
  //   }
  // }
  public render() {
    var renderComponent = <LoginPopupForm/>;
    if(this.props.isAuthenticated){
      renderComponent = <UserMenu/>;
    }
    return (
      <div>
        <a id="PopLogin" onClick={this.toggle}><MdPerson size={32} style={{color: 'black'}}/> </a>
        <Popover placement="bottom" isOpen={this.state.popoverOpen} target="PopLogin" toggle={this.toggle}>
          <PopoverHeader>Login</PopoverHeader>
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