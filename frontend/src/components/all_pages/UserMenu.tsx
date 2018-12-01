import * as React from 'react';
import * as PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter} from 'react-router-dom';
import { Logout } from '../../actions/loginActions';
import { RetrieveUserData } from '../../actions/userActions';

class UserMenu extends React.Component<any,any>{
    public static propTypes = {logout: PropTypes.func.isRequired, user: PropTypes.object.isRequired, 
       retrieveUserData: PropTypes.func.isRequired};
    constructor(props: any) {
        super(props);
        this.state = {user: null, errors: {}, result: null};
        this.handleClick = this.handleClick.bind(this);
    }
    public async componentDidMount(){
        const {retrieveUserData} = this.props;
        await retrieveUserData(this.props.user).then(res => {this.setState({user: res})}, (error) => {this.setState({user: error})});
    }
    public render() {
        
        const {user} = this.state;
        console.log(user);
        var showresults = <div>Aan het laden..</div>
        if (user){
            showresults = <div><strong>Welkom {user.name}</strong></div>;
        }
        return (
            <div>            
                <div className="row p-2">
                    <div className="col ">
                    {showresults}
                    <a className="nav nav-link" href="/dashboard">Mijn account</a>
                    <a className="nav nav-link" href="/dashboard">Mijn bestellingen</a>
                    <a className="nav nav-link" href="/dashboard">Mijn wishlist</a>
                    <button type="submit" className="btn btn-secondary btn-sm mt-1 " onClick={this.handleClick}>
                    <strong>Uitloggen</strong>
                     </button>
                    </div>
                </div>
               
            </div>
        );
    }
    private handleClick(e){
        this.props.logout();
        // this.props.history.push('/');
    }
}

export default withRouter(connect(mapStateToProps, {logout: Logout, retrieveUserData: RetrieveUserData})(UserMenu));

function mapStateToProps(state) {
    return {
      user: state.auth.user
    };
}