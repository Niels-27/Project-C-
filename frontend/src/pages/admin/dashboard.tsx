import * as React from 'react';
// import './dashboard.css';
import { withRouter, Link} from 'react-router-dom'
class Dashboard extends React.Component<any, any>{

    constructor(props: any) {
        super(props);
        this.state = { product: null };
    }

    public async componentDidMount() {

    }

    public render() {
        return (
            <div>
                <nav className="navbar navbar-expand navbar-dark bg-dark static-top">
                    <a className="navbar-brand mr-1" >HR Admin</a>
                        <button className="btn btn-link btn-sm text-white order-1 order-sm-0" id="sidebarToggle">
                            <i className="fas fa-bars"/>
                        </button>
                </nav>
                <div id="wrapper">
                    <ul className="sidebar-admin navbar-nav">
                        <li className="nav-item active">
                            <Link to="/" className="nav-link">
                                <i className="fas fa-fw fa-tachometer-alt"/>
                                <span>Dashboard</span>
                            </Link>
                        </li>
                        <li className="nav-item active">
                            <Link to="/Users" className="nav-link">
                                <i className="fas fa-fw fa-tachometer-alt" />
                                <span>Gebruikers</span>
                            </Link>
                            <Link to="/products" className="nav-link">
                                <i className="fas fa-fw fa-tachometer-alt" />
                                <span>Producten</span>
                            </Link>

                            
                        </li>
                    </ul>
                    <div id="content-wrapper">
                        <div className="container-fluid">
                            <div className="row">        
                                {this.props.children}
                            </div>
                            <footer className="sticky-footer">
                                <div className="container my-auto">
                                    <div className="copyright text-center my-auto">
                                        <span>Copyright © HR Fasion</span>
                                    </div>
                                </div>
                            </footer>
                        </div>                
                    </div>
                </div>
            </div>
        );
    }
}

export default withRouter(Dashboard);