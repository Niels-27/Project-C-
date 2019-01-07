import * as React from 'react';
import * as PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter} from 'react-router-dom';
import { Logout } from '../../actions/loginActions';
import { RetrieveData } from '../../actions/userActions';

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
         await retrieveUserData(this.props.user, "userdata").then(res => {this.setState({user: res})}, (error) => {this.setState({user: error})});
    }
    public render() {
        
        const {user} = this.state;
        console.log(user);
        var showresults = <div>..</div>
        if (user){
            showresults = (
            <div className="Usermenu">            
                <div className="row p-2">
                    <div className="col ">
                    <strong>Welkom {user.name}</strong>
                    <a className="nav nav-link" href="/dashboard">Mijn account</a>
                    <a className="nav nav-link" href="/dashboard/orders">Mijn bestellingen</a>
                    <a className="nav nav-link" href="/wishlist">Mijn wishlist</a>
                    <button type="submit" className="btn btn-secondary btn-sm mt-1 LogoutButton" onClick={this.handleClick}>
                    <strong>Uitloggen</strong>
                    </button>
                    </div>
                </div>
           </div>)        
        }
        return (
            <div>{showresults}</div>
        );
    }
    private handleClick(e){
        if(this.props.location.pathname.includes("/payment")){
            this.props.logout(); 
            this.props.history.push("/"); 
        }
        else{
            this.props.logout(); 
        }  
        // this.props.history.push('/');
    }
}

export default withRouter(connect(mapStateToProps, {logout: Logout, retrieveUserData: RetrieveData})(UserMenu));

function mapStateToProps(state) {
    return {
      user: state.auth.user
    };
}