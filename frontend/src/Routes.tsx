import * as React from 'react';
import { Route,BrowserRouter as Router, Switch} from 'react-router-dom';


// normal page coompinents.
import Navbar from './components/all_pages/NavBar';
import MenuBar from './components/all_pages/menu';

// import page components here
import AllProducts from './pages/AllProducts';
import Home from './pages/home';
import Product from './pages/product';
import SignUpPage from './pages/signup/SignUpPage';
import LoginPage from './pages/login/LoginPage';
import Footer from './components/all_pages/footer';
import pageNotFound from './pages/404';

import Pagination from './pages/pagination';


class Routes extends React.Component<any,any> {


  public render() {
    return (
        <Router>
          <div>
          <Navbar />
          <MenuBar />
          <Switch>
            
            <Route exact path="/" component={Home} />
            <Route path="/AllProducts/:category/search/:search" component={AllProducts} />
            <Route path="/AllProducts/:category" component={AllProducts} />
            <Route path="/product/:id" component={Product} />
            <Route path="/pagenation" component={Pagination} />


            <Route path="/signup" component={SignUpPage}/>
            <Route path="/login" component={LoginPage}/>
            <Route component={pageNotFound} />
          </Switch>
          <Footer/>
          </div>
        </Router>      
    );
  }
}

// below a example to add a new page.
// <Route path="/login" component={Login} />
export default Routes;
