import * as React from 'react';
import Overview from '../components/dashboard_containers/overview';
import { Route,BrowserRouter as Router, Switch} from 'react-router-dom';
import DashboardNavigation from '../components/DashboardNavigation';
import propPasser from '../utils/propPasser';
import AccountDetails from 'src/components/dashboard_containers/accountdetails';
import Orders from 'src/components/dashboard_containers/orders';
import History from 'src/components/dashboard_containers/history';

class UserPage extends React.Component<any,any>{

    constructor(props: any) {
        super(props);
        this.state = {user: null}
    }

    public render() {
        console.log(this.props.match.url)
        return (
            <Router>
                <DashboardNavigation>
                <Switch>
                  <Route exact path={`${this.props.match.url}`} component={propPasser(Overview)}/>
                  <Route path={`${this.props.match.url}/orders`} component={propPasser(Orders)} />
                  <Route path={`${this.props.match.url}/history`} component={propPasser(History)} />
                  <Route path={`${this.props.match.url}/accountdetails`} component={propPasser(AccountDetails)} />
                </Switch>   
                </DashboardNavigation>
            </Router>           
        );
    }
}

export default UserPage;
