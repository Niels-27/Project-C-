import * as React from 'react';
import {Link} from 'react-router-dom';
import LoginPop from './LoginPopup';
import { MdFavorite } from "react-icons/md"; // Hiermee Importeer je de Icons
import { Nav } from 'reactstrap';
// import './menu.css';

import ShoppingCard from './ShoppingCard';

class NavBar extends React.Component<any, any> {

    public render() {
        return (
            <div style={{ paddingTop: 60 }}>
                <Nav className="navbar navbar-dark navbar-expand-sm bg-light justify-content-between fixed-top ">
                    <div className="container-fluid">
                        <div className="navbar-collapse collapse dual-nav w-50 order-1 order-sm-0">
                            <ul className="navbar-nav">
                                <li className="nav-item">
                                    <Link to="/AllProducts/Dames" className="nav-link pl-0" style={{color:"black"}}>Dames <span className="sr-only">Dames</span></Link>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link menu pl-0" style={{color:"black"}} >| <span className="sr-only">|</span></a>
                                </li>
                                <li className="nav-item">
                                    <Link to="/AllProducts/Heren" className="nav-link pl-0" style={{color:"black"}}>Heren <span className="sr-only">Heren</span></Link>
                                </li>
                            </ul>
                        </div>
                        <a href="/" className="navbar-brand mx-auto d-block text-center order-0 order-sm-1 w-25" style={{color:"black"}}><img src="https://i.imgur.com/yxLWWml.png" />  HR Fashion</a>
                        <div className="navbar-collapse collapse dual-nav w-50 order-2">
                            <ul className="nav navbar-nav ml-auto">
                            <li className="nav-item"><span className="nav-link"><LoginPop/></span></li>
                                <li className="nav-item"><span className="nav-link"><a href="/login"><MdFavorite size={32} style={{ color: 'black' }} /></a></span></li>
                                <ShoppingCard />
                            </ul>
                        </div>
                    </div>
                </Nav>
            </div>
        );
    }
}

export default NavBar;
