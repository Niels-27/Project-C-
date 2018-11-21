/* eslint react/no-multi-comp: 0, react/prop-types: 0 */
import * as React from 'react';
import { MdPerson } from "react-icons/md";
import { Popover, PopoverHeader, PopoverBody } from 'reactstrap';
import LoginPopupForm from '../../pages/login/LoginPopupForm';

export default class LoginPopup extends React.Component<any,any> {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      popoverOpen: false
    };
  }

  public render() {
    return (
      <div>
        <a id="PopLogin" onClick={this.toggle}><MdPerson size={32} style={{color: 'black'}}/> </a>
        <Popover placement="bottom" isOpen={this.state.popoverOpen} target="PopLogin" toggle={this.toggle}>
          <PopoverHeader>Login</PopoverHeader>
          <PopoverBody><LoginPopupForm/></PopoverBody>
        </Popover>
      </div>
    );
  }
  private toggle() {
    this.setState({ popoverOpen: !(this.state.popoverOpen)});
  }
}