import * as React from 'react';
import { Route,BrowserRouter as Router, Switch} from 'react-router-dom';

// import components here
import Home from './pages/home';

class App extends React.Component {
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


// <Route path="/login" component={Login} />
export default App;
