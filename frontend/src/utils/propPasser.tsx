import * as React from 'react';
import * as PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {RetrieveData} from '../actions/userActions';

export default function(ComposedComponent) {
  class Propper extends React.Component<any,any> {
    public static propTypes = {user: PropTypes.object.isRequired, address: PropTypes.object.isRequired,
      retrieveData: PropTypes.func.isRequired};
      constructor(props: any) {
        super(props);
        this.state = {user: null, address:null}
      } 
    public async componentWillMount(){
      const {retrieveData} = this.props;
          console.log(this.props.user)
          await retrieveData(this.props.user, "userdata")   // get user info
          .then(res => {this.setState({user: res})},
          (error) => {this.setState({user: error})});   
          
          await retrieveData(this.props.user, "addressdata")  // get addresses
          .then(res => {this.setState({address: res})},
           (error) => {this.setState({address: error})});  
  }
    public render() {
      console.log(this.state.user)
      console.log(this.state.address)

      return (
        <ComposedComponent userData={this.state.user} address = {this.state.address}{...this.props} />
      );
    }
  }
    return connect(mapStateToProps, {retrieveData:RetrieveData})(Propper);;
}
function mapStateToProps(state) {
  return {
    user: state.auth.user
  };
}