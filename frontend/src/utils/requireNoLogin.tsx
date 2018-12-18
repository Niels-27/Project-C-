import * as React from 'react';
import * as PropTypes from 'prop-types'
import { connect } from 'react-redux';
import { withRouter} from 'react-router-dom';
import Cookie from '../logic/cookie';

export default function(ComposedComponent) {
  class Authenticate extends React.Component<any,any> {
    public static propTypes = {isAuthenticated: PropTypes.bool.isRequired};
    public cookie: Cookie = new Cookie();

    constructor(props: any) {
        super(props);

        this.state = {
            items: this.cookie.get('ShoppingCard') || undefined, origin: ""
        };

    }
    public componentWillMount() { 
        console.log(this.state.items)
        const lol = JSON.parse(this.state.items)
        console.log(lol)
        console.log(lol.items)
        console.log(this.props)

        if((lol.items.length === 0)){
            this.props.history.push('/ShoppingCard');}
        else if(!this.props.isAuthenticated){
            this.props.history.push({
                pathname: '/checkout',
                state: { origin: this.state.origin }  // this.props.location.state.origin in the rendered component
              });
            } 
       
    }

    public componentWillUpdate(nextProps) {
        console.log(this.state.items)
        const lol = JSON.parse(this.state.items)
        console.log(lol)
        console.log(lol.items)

        if (!nextProps.isAuthenticated) {
            this.props.history.push({
                pathname: '/checkout',
                state: { origin: this.state.origin }  // this.props.location.state.origin in the rendered component
              });
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