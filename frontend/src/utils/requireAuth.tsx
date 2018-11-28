import * as React from 'react';
import * as PropTypes from 'prop-types'
import { connect } from 'react-redux';
import { withRouter} from 'react-router-dom';

export default function(ComposedComponent) {
  class Authenticate extends React.Component<any,any> {

    public static propTypes = {isAuthenticated: PropTypes.bool.isRequired};

    public componentWillMount() {   
      if (!this.props.isAuthenticated) {
        alert("Je hebt geen toegang. Niet geautoriseerd");
        this.props.history.push('/');
      }
    }

    public componentWillUpdate(nextProps) {
      if (!nextProps.isAuthenticated) {
        this.props.history.push('/');
      }
    }

    public render() {
      return (
        <ComposedComponent {...this.props} />
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