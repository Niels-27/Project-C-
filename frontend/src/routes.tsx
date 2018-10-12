import * as React from 'react';
import { Route,BrowserRouter as Router, Switch} from 'react-router-dom';

// import components here
import Home from './pages/home';

class Routes extends React.Component {
  public render() {
    return (
        <Router>
          <Switch>
            <Route exact path="/" component={Home} />
            
          </Switch>
        </Router>      
    );
  }
}

// below a example to add a new page.
// <Route path="/login" component={Login} />
export default Routes;
