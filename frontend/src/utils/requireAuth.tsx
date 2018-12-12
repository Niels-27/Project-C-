import * as React from 'react';
import * as PropTypes from 'prop-types'
import { connect } from 'react-redux';
import { withRouter} from 'react-router-dom';

export default function(ComposedComponent) {
  class Authenticate extends React.Component<any,any> {

    public static propTypes = {isAuthenticated: PropTypes.bool.isRequired};

    public componentWillMount() {   
      if (!this.props.isAuthenticated) {
        this.props.history.push('/login');
      }
    }

    public componentWillUpdate(nextProps) {
      if (!nextProps.isAuthenticated) {
        this.props.history.push('/login');
      }
    }

    public render() {
      var showComponent = <div>..</div>
      if (this.props.isAuthenticated){
        showComponent = <div><ComposedComponent {...this.props} /></div>
      }
      return (
        <div>{showComponent}</div>
      );
    }
  }

  function mapStateToProps(state) {
    return {
      isAuthenticated: state.auth.isAuthenticated
    };
  }

  return withRouter(connect(mapStateToProps)(Authenticate));
}