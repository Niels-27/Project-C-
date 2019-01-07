import * as React from 'react';
import * as PropTypes from 'prop-types'
import { connect } from 'react-redux';
import { withRouter} from 'react-router-dom';

export default function(ComposedComponent) {
  class Authenticate extends React.Component<any,any> {

    public static propTypes = {isAuthenticated: PropTypes.bool.isRequired};

    constructor(props: any) {
      super(props);
      this.state = { origin: ""};
  }

    public async componentWillMount() {  
      console.log(this.props.location.pathname)
      await this.setState({origin: this.props.location.pathname}) 
      if (!this.props.isAuthenticated) {
        this.props.history.push({
          pathname: '/login',
          state: { origin: this.state.origin }  // this.props.location.state.origin in the rendered component
        });
      }
    }

    public async componentWillUpdate(nextProps) {
      await this.setState({origin: this.props.location.pathname}) 
      if (!nextProps.isAuthenticated) {
        this.props.history.push({
          pathname: '/login',
          state: { origin: this.state.origin }  // this.props.location.state.origin in the rendered component
        });
      }
    }

    public render() {
      console.log(this.props)
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