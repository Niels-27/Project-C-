import './App.css';
import * as React from 'react';
import Home from './pages/home';



 // mport Navbar from './components/NavBar';
 // import ProductList from './components/ProductList';
import { 
  Route,

  HashRouter as Router,

  Switch
} from 'react-router-dom';

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



export default App;
