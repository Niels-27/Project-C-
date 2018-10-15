import * as React from 'react';
import { Route,BrowserRouter as Router, Switch} from 'react-router-dom';

// import components here
import Home from './pages/home';
import Product from './pages/product';

import pageNotFound from './pages/404';

class Routes extends React.Component<any,any> {
  constructor(props) {
    super(props);
    this.state = { searchString:""};
  }

  public componentWillReceiveProps(nextProps) {
    this.setState({ searchString: nextProps.searchString });
  }

  public renderHome = () =>{
    return <Home searchString={this.state.searchString} />;
  }
  public render() {
    return (
        <Router>
          <Switch>
            <Route exact path="/" render={this.renderHome}/>
            <Route path="/product/:id" component={Product} />

            <Route component={pageNotFound} />
          </Switch>
        </Router>      
    );
  }
}

// below a example to add a new page.
// <Route path="/login" component={Login} />
export default Routes;
