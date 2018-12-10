import * as React from 'react';
import { Route,BrowserRouter as Router, Switch} from 'react-router-dom';
import requireAuth from './utils/requireAuth';


// normal page coompinents.
import Navbar from './components/all_pages/NavBar';
import MenuBar from './components/all_pages/menu';

// import page components here
import AllProducts from './pages/AllProducts';
import Home from './pages/home';
import Product from './pages/product';
import SignUpPage from './pages/signup/SignUpPage';
import SignLoginPage from './pages/signlogin/SignLoginPage';
import UserPageRouter from './pages/UserPage';
import WishListPage from './pages/WishListPage'
import Footer from './components/all_pages/footer';
import pageNotFound from './pages/404';
import ShoppingCard from './pages/shoppingCard';
import Payment from './pages/payment';
import Pagination from './pages/pagination';
import Help from './pages/help';
import propPasser from './utils/propPasser';


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
            <Route path="/ShoppingCard" component={ShoppingCard} />
            <Route path="/pagenation" component={Pagination} />
            <Route path="/signup" component={SignUpPage}/>
            <Route path="/payment/:price" component={Payment}/>
            <Route path="/login" component={SignLoginPage}/>
            <Route path="/dashboard" component={requireAuth(UserPageRouter)}/>
            <Route path="/wishlist" component={requireAuth(propPasser(WishListPage))}/>
            <Route path="/help" component={Help} />
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
