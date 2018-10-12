import './App.css';
import * as React from 'react';

// import components here
import Home from './pages/home';
import { Route,BrowserRouter as Router, Switch} from 'react-router-dom';

class App extends React.Component {
  public render() {
    return (
      <div>
        <Router>
          <Switch>
            <Route exact path="/" component={Home} />
            
          </Switch>
        </Router>      
      </div>
    );
  }
}


// <Route path="/login" component={Login} />
export default App;
