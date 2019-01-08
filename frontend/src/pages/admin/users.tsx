import * as React from 'react';
// import './dashboard.css';
import ApiCall from '../../logic/apiCall';
import { withRouter,Link } from 'react-router-dom';
class AdminUsers extends React.Component<any, any>{
    public timeoutID: any;
    constructor(props: any) {
        super(props);
        this.state = { users: null ,search: null, searchString: "" };
    }

    public async componentDidMount() {
        const call: ApiCall = new ApiCall();
        call.setURL('Adminuserdata');
        await this.setState({ users: await call.result() });
    }

    public render() {

        return (
            <div className="card-body">
                <div className="table-responsive">
                    <h5>Gebruikers</h5>
                    <nav className="navbar navbar-light bg-light" style={{ marginBottom: '15px' }}>
                        <form className="form-inline">
                            <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" value={this.state.searchString} onChange={this.handleChange}/>
                        </form>

                        <Link to="/user/make" className="btn btn-outline-dark">New user</Link>
                    </nav>
                    <table className="table table-bordered" id="dataTable" >
                        <thead>
                            <tr>
                                <th>Id</th>
                                <th>Naam</th>
                                <th>Email</th>
                                <th>Geregistreed op</th>
                                <th>Rank</th>
                                <th>Opties</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.users ? this.state.users.map(this.renderUsersTable) : "Loading"}

                        </tbody>
                    </table>
                </div>
            </div>

        );
    }
    public handleChange = (event) => {
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

    public performSearch = () => {
        console.log(this.state.search);
        this.setState({ search: this.state.searchString });
    }
    
    private renderUsersTable = (user)=> {
        const displayRank = (rank) => {
            switch (rank) {
                case 1:
                    return "Gebruiker";
                case 4:
                    return "Administrator";
                case 2:
                    return "Gast Aankoop";
                default:
                    return "Er is iets fout gegaan";
            }
        }
        if (this.state.search === null || this.state.search === "" || user.name.includes(this.state.search)) {
        return (<tr>
            <td>{user.id}</td>
            <td>{user.name}</td>
            <td>{user.email}</td>
            <td>{user.createOn}</td>
            <td>{displayRank(user.rank)}</td>
            <td><Link to={'/user/view/' + user.id}>Bekijk/Bewerk</Link></td>
        </tr>)
        }
        return ;
    }
}

export default withRouter(AdminUsers);