import * as React from 'react';
// import { MdFavorite, MdPerson, MdShoppingCart } from "react-icons/md"; // Hiermee Importeer je de Icons
import { Nav } from 'reactstrap';


class MenuBar extends React.Component<any,any> {
    public timeoutID: any;
    
    constructor(props) {
        super(props);
        this.state ={
            searchString:''
        };
        this.handleChange = this.handleChange.bind(this);
    }

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
                            <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" value={this.state.searchString} onChange={this.handleChange}/>
                        <button className="btn btn-outline-success my-2 my-sm-0" type="submit" onClick={this.performSearch}>Search</button>
                </div>
            </Nav>
            </div>
        );
    }
    public handleChange(event) {
        this.setState({ searchString: event.target.value });
        this.delayedSearch();
    }



    public delayedSearch = () => {
        this.clearSearchDelay();
        this.timeoutID = setTimeout(this.performSearch, 800);
    }

    public clearSearchDelay = () => {
        if (this.timeoutID) {
            clearTimeout(this.timeoutID);
        }
    }

    public performSearch = () =>{
        this.props.changeSearch(this.state.searchString);
    }


}

export default MenuBar;