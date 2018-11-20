import * as React from 'react';
// import { MdFavorite, MdPerson, MdShoppingCart } from "react-icons/md"; // Hiermee Importeer je de Icons
import { Nav } from 'reactstrap';
import { withRouter,Link} from 'react-router-dom';

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
            <div style={{backgroundColor:"#ebebeb" }}>
                <Nav className="navbar navbar-expand-lg navbar-dark">
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"/>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">

                        <ul className="navbar-nav mr-auto">
                            <li className="nav-item">
                                <Link to="/AllProducts/all" className="nav-link" style={{color:"black"}}>Alle producten</Link>
                            </li>
                       <li className="nav-item">
                                <Link to="/AllProducts/Shirts" className="nav-link" style={{ color: "black" }}>Shirts</Link>
                        </li>
                        <li className="nav-item">
                                <Link to="/AllProducts/Schoenen" className="nav-link" style={{ color: "black" }}>Schoenen</Link>
                        </li>
                        <li className="nav-item">
                                <Link to="/AllProducts/Jeans" className="nav-link" style={{ color: "black" }}>Jeans</Link>
                        </li>
                        <li className="nav-item">
                                <Link to="/AllProducts/Hoodies" className="nav-link" style={{ color: "black" }}>Hoodies</Link>
                        </li>
                        <li className="nav-item">
                                <Link to="/AllProducts/Vesten" className="nav-link" style={{ color: "black" }}>Vesten</Link>
                        </li>
                    </ul>

                            <input id="Search_bar_input" className="form-control-danger mr-sm-2" type="search" placeholder="Search" aria-label="Search" style={{maxWidth:'250px'}}value={this.state.searchString} onChange={this.handleChange}/>
                        <button className="btn btn-outline-danger my-2 my-sm-0" type="submit" onClick={this.performSearch}>Search</button>
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
        if (this.props.location.pathname.includes("/AllProducts/") && (this.props.location.pathname.split("/").length - 1)  === 2){
            this.props.history.push(this.props.location.pathname + "/search/" + this.state.searchString);  // EERSTE KEER
        }
        // else if(!this.state.searchString){
        //     this.props.history.push("/AllProducts/all/search/" + this.state.searchString); 
        // }
        else if(this.props.location.pathname.includes("/AllProducts/")){
           const locationArray = this.props.location.pathname.split("/")[2];
           this.props.history.push("/AllProducts/" + (locationArray) + "/search/" + this.state.searchString); 
        }
        else{
            this.props.history.push("/AllProducts/all/search/" + this.state.searchString); 
        }
        
    }
}

export default withRouter(MenuBar);
