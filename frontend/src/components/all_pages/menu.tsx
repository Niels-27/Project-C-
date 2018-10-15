import * as React from 'react';
// import { MdFavorite, MdPerson, MdShoppingCart } from "react-icons/md"; // Hiermee Importeer je de Icons
import { Nav } from 'reactstrap';


class MenuBar extends React.Component {

    public render() {
        return (
            <div>
                <Nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"/>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav mr-auto">
                    
                       <li className="nav-item">
                            <a className="nav-link" href="#">Inspiratie</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#">Schoenen</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#">Sneakers</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#">Acce</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#">Sport</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#">Accessoires</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#">Merken</a>
                        </li>


     
                    </ul>
                        <form className="form-inline my-2 my-lg-0">
                            <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" />
                                <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
                            </form>
                </div>
            </Nav>
            </div>
        );
    }
}

export default MenuBar;