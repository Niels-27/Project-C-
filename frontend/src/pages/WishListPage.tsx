import * as React from 'react';
import * as PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {RetrieveData} from '../actions/userActions';


class WishListPage extends React.Component<any,any>{
    public static propTypes = {user: PropTypes.object.isRequired,
        retrieveWishListData: PropTypes.func.isRequired};
    constructor(props: any) {
        super(props);
        this.state = {};
    }
    public async componentDidMount(){
        const {retrieveWishListData} = this.props
        await retrieveWishListData(this.props.user, "wishlistdata").then(res => {this.setState({user: res})}, (error) => {this.setState({user: error})});
    }
    public render() {
        return (
           <div>hallo :D Iemand maak hier een wishlist</div>
        );
    }
}
export default connect(mapStateToProps, {retrieveWishListData:RetrieveData})(WishListPage);;

function mapStateToProps(state) {
  return {
    user: state.auth.user
  };
}