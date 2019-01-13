import * as React from 'react';
import { Route,BrowserRouter as Router, Switch} from 'react-router-dom';
import requireAuth from './utils/requireAuth';
import { RetrieveData } from './actions/userActions';
import * as PropTypes from 'prop-types';
import { connect } from 'react-redux';
import CookieConsent from "react-cookie-consent";

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
import noLoginRequireForm from './pages/noLoginRequireForm';
import loginOrGuest from './pages/loginOrGuest';
import WishListPage from './pages/WishListPage'
import Footer from './components/all_pages/footer';
import pageNotFound from './pages/404';
import ShoppingCard from './pages/shoppingCard';
import Payment from './pages/payment';
import Pagination from './pages/pagination';
import Help from './pages/help';
import propPasser from './utils/propPasser';


// imports admin

import pushBack from './utils/pushBack';
import requireNoLogin from './utils/requireNoLogin';
import noAccess from './pages/noAccess';
// imports for admin 

import DashboardWrap from './pages/admin/dashboard';
import AdminHome from './pages/admin/home';
import AdminUsers from './pages/admin/users';
import AdminUsersView from './pages/admin/AdminUsersView';
import AdminProductsView from './pages/admin/AdminProductsView';
import AdminProducts from './pages/admin/AdminProducts';
import AdminNewProduct from './pages/admin/newProduct';
class Routes extends React.Component<any,any> {
  public static propTypes = {  
    user: PropTypes.object.isRequired,
    retrieveUserData: PropTypes.func.isRequired
  };

  constructor(props: any) {
    super(props);
    this.state = { user: null, errors: {}, result: null };
  }

  public async componentDidMount() {
    const { retrieveUserData } = this.props;
    await retrieveUserData(this.props.user,"userdata").then(res => { this.setState({ user: res }) }, (error) => { this.setState({ user: error }) });
  }

  public render() {
    const { user } = this.state;
    if (user){
      console.log(user)
      if(user.rank === 4){
        return this.renderAdmin();
      }
    }

   return this.renderUser();
  }

  private renderUser(){
    return (
      <Router>
        <div>
          <Navbar />
          <MenuBar />
          <Switch>

            <Route exact path="/" component={Home} />
            <Route path="/AllProducts/:category/search/:search" component={AllProducts} />
            <Route path="/AllProducts/:category" component={AllProducts} />
            <Route path="/product/:id" component={propPasser(Product)} />
            <Route path="/ShoppingCard" component={ShoppingCard} />
            <Route path="/pagenation" component={Pagination} />
            <Route path="/form" component={requireNoLogin(noLoginRequireForm)}/>
            <Route path="/checkout" component={requireNoLogin(propPasser(loginOrGuest))}/>
            <Route path="/signup" component={SignUpPage}/>
            <Route path="/payment/:price" component={requireNoLogin(propPasser(Payment))}/>
            <Route path="/login" component={pushBack(SignLoginPage)}/>
            <Route path="/dashboard" component={requireAuth(UserPageRouter)}/>
            <Route path="/wishlist" component={requireAuth(WishListPage)}/>
            <Route path="/help" component={Help} />
            <Route path="/forbidden" component={noAccess} />
            <Route component={pageNotFound} />

          </Switch>
          <CookieConsent>
            This website uses cookies to enhance the user experience.
          </CookieConsent>
          <Footer />
        </div>
      </Router>
    );
  }

  private renderAdmin(){
    return (
    <Router>
      <DashboardWrap>
        <Switch>
            <Route exact path="/" component={AdminHome} />
            <Route exact path="/product/view/:id" component={AdminProductsView} />
            <Route exact path="/user/view/:id" component={AdminUsersView} />
            <Route exact path="/user/make" component={SignUpPage} />
            <Route exact path="/users" component={AdminUsers} />
            <Route exact path="/products" component={AdminProducts} />
            <Route exact path="/product/make" component={AdminNewProduct} />
            
            <Route component={pageNotFound} />
        </Switch>
      </DashboardWrap>
    </Router>);
  }
}

// below a example to add a new page.
// <Route path="/login" component={Login} />
// export default Routes;
export default connect(mapStateToProps, { retrieveUserData: RetrieveData })(Routes);

function mapStateToProps(state) {
  return {
    user: state.auth.user
  };
}