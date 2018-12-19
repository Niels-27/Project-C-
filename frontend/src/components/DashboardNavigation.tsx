import * as React from 'react';
import { IoIosArrowForward } from "react-icons/io";
import "./DashboardNavigation.css";
class DashboardNavigation extends React.Component<any,any>{
    constructor(props: any) {
        super(props);
        this.state = {user: null};
    }

    public render() {
        return (
            <div className="container">                                     
                <div className="row m-md-8 justify-content-center no-gutters mt-5"> 
                    <div className="col col-md-2">
                    <div className="sidebar">
                        <nav className="sidebar-nav">
                            <ul className="nav">
                            <li className="nav-title">
                            <IoIosArrowForward size={15} className="indent-icon" /><b>Mijn HR Fashion</b></li>
                            <div className="indent">
                                <li className="nav-item">
                                    <a className="nav-link" href="/dashboard">
                                    Mijn overzicht
                                    </a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="/dashboard/orders">
                                    Mijn bestellingen
                                    </a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="/dashboard/history">
                                    Mijn geschiedenis
                                    </a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="/dashboard/addressen">
                                    Mijn adressen
                                    </a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="/dashboard/accountdetails">
                                    Mijn gegevens
                                    </a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="/help">
                                     Help
                                    </a>
                                </li>
                            </div>
                            </ul>
                        </nav>
                        </div>           
                    </div>
                    <div className="col col-md-10 main-column"> 
                        {this.props.children}
                    </div>
                </div>     
            </div>
        );
    }
}

export default DashboardNavigation;