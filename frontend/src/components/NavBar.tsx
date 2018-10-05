import * as React from 'react';
import { MdFavorite, MdPerson, MdShoppingCart } from "react-icons/md"; // Hiermee Importeer je de Icons
import { Nav } from 'reactstrap';


export default class NavBar extends React.Component<any, any> {

public render() {
    return (
    <div>
        <Nav className="navbar navbar-dark navbar-expand-sm bg-success justify-content-between">
            <div className="container-fluid">
                <div className="navbar-collapse collapse dual-nav w-50 order-1 order-sm-0">
                    <ul className="navbar-nav">
                        <li className="nav-item active">
                            <a className="nav-link pl-0" href="#">Dames <span className="sr-only">Dames</span></a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link pl-0" >| <span className="sr-only">|</span></a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link pl-0" href="#">Heren <span className="sr-only">Heren</span></a>
                        </li>
                    </ul>
                </div>
                <a href="/" className="navbar-brand mx-auto d-block text-center order-0 order-sm-1 w-25">HR Fashion</a>
                <div className="navbar-collapse collapse dual-nav w-50 order-2">
                    <ul className="nav navbar-nav ml-auto">
                        <li className="nav-item"><span className="nav-link"><a href="#"><MdPerson size={32} style={{color: 'white'}}/></a></span></li>
                        <li className="nav-item"><span className="nav-link"><a href="#"><MdFavorite size={32} style={{color: 'white'}}/></a></span></li>
                        <li className="nav-item"><span className="nav-link"><a href="#"><MdShoppingCart size={32} style={{color: 'white'}}/></a></span></li>
                    </ul>
                </div>
            </div>
        </Nav>
    </div>
    );
}
}
