import * as React from 'react';
import * as PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Logout } from '../../actions/loginActions';
import { RetrieveData } from '../../actions/userActions';

class UserMenu extends React.Component<any, any>{
    public static propTypes = {
        logout: PropTypes.func.isRequired, user: PropTypes.object.isRequired,
        retrieveUserData: PropTypes.func.isRequired
    };
    constructor(props: any) {
        super(props);
        this.state = { user: null, errors: {}, result: null };
        this.handleClick = this.handleClick.bind(this);
    }
    public async componentDidMount() {
        const { retrieveUserData } = this.props;
        await retrieveUserData(this.props.user, "userdata").then(res => { this.setState({ user: res }) }, (error) => { this.setState({ user: error }) });
    }
    public render() {

        const { user } = this.state;
        console.log(user);
        var showresults = <div>..</div>
        if (user) {
            showresults = (
                <div style={{ float: 'right' }} >
                            <strong style={{color:'grey',marginTop:'5px'}}>Welkom {user.name} </strong>
                            <button type="submit" className="btn btn-secondary btn-sm mt-1 LogoutButton" style={{marginLeft:'10px',marginRight:'10px'}} onClick={this.handleClick}>
                                <strong>Uitloggen</strong>
                            </button>
                </div>)
        }
        return (
            <div style={{ width:'100%'}}>{showresults}</div>
        );
    }
    private handleClick(e) {
        this.props.logout();
        location.reload();
    }
}

export default withRouter(connect(mapStateToProps, { logout: Logout, retrieveUserData: RetrieveData })(UserMenu));

function mapStateToProps(state) {
    return {
        user: state.auth.user
    };
}