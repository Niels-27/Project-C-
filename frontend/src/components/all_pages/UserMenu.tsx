import * as React from 'react';
import * as PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter} from 'react-router-dom';
import { Logout } from '../../actions/loginActions';
class UserMenu extends React.Component<any,any>{
    public static propTypes = {logout: PropTypes.func.isRequired};
    constructor(props: any) {
        super(props);
        this.state = {};
        this.handleClick = this.handleClick.bind(this);
    }
    public render() {
        return (
            <div>            
                hoi je bent geautoriseerd yeey :)
                 <button type="submit" className="btn btn-secondary btn-sm mt-3 " onClick={this.handleClick}>
                    <strong>Uitloggen</strong>
                </button>
            </div>
        );
    }
    private handleClick(e){
        this.props.logout();
        this.props.history.push('/');
    }
}

export default withRouter(connect(null, {logout: Logout})(UserMenu));