/* eslint react/no-multi-comp: 0, react/prop-types: 0 */
import * as React from 'react';
import { connect } from 'react-redux';
import { withRouter} from 'react-router-dom';
import WithModal from './WithModal2';
import * as PropTypes from 'prop-types'
import LoginFormCheckout from '../checkout_components/LoginFormCheckout';
class LoggedInOrNot extends React.Component<any,any> {

  public static propTypes = {isAuthenticated: PropTypes.bool.isRequired};
  public render() {
      const {isAuthenticated, userData, address} = this.props;
    var renderComponent = <div>..</div>
    if(isAuthenticated && userData && address){
        renderComponent= <div>
            <div>
                Je bent nu ingelogd als <b>{userData.name}</b>. <br/>
                Is de onderstaande informatie incorrect of wil je nog iets wijzigen? Dan kun je die hieronder nog aanpassen.
            </div>
            <WithModal userData={userData} address={address}/>   
        </div>
    }
    else if(!isAuthenticated){
        renderComponent = <LoginFormCheckout/>;
    }
    return (
      <div>
          {renderComponent}
      </div>
    );
  }
}
export default withRouter(connect(mapStateToProps)(LoggedInOrNot));

function mapStateToProps(state) {
  return {
    isAuthenticated: state.auth.isAuthenticated
  };
}