import './App.css';
import * as React from 'react';

import Home from './pages/home';
import Product from './pages/product';


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
            <Route path="/product" component={Product} />

          </Switch>
        </Router>      
      </div>
    );
  }
}



export default App;
