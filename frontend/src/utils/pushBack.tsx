import * as React from 'react';
import * as PropTypes from 'prop-types'
import { connect } from 'react-redux';
import { withRouter} from 'react-router-dom';

export default function(ComposedComponent) {
  class PushBack extends React.Component<any,any> {

    public static propTypes = {isAuthenticated: PropTypes.bool.isRequired};

    public componentWillMount() {  
       if(this.props.location.state){
           if (this.props.isAuthenticated) {
            this.props.history.push(this.props.location.state.forwarder)
     }}
     else if(this.props.isAuthenticated || !this.props.location.state){
        this.props.history.push('/');
    }
    }

    public componentWillUpdate(nextProps) {
        if(this.props.location.state){
            if (nextProps.isAuthenticated) {
                this.props.history.push(this.props.location.state.forwarder)
            }
        }
        else if(nextProps.isAuthenticated || !this.props.location.state){
            this.props.history.push('/');
        }
     
    }

    public render() {
      console.log(this.props)
      var showComponent = <div>..</div>
      if (!this.props.isAuthenticated){
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

  return withRouter(connect(mapStateToProps)(PushBack));
}