import * as React from 'react';
import './dashboard.css';
import ApiCall from '../../logic/apiCall';
import { withRouter,Link } from 'react-router-dom';
class AdminUsers extends React.Component<any, any>{

    constructor(props: any) {
        super(props);
        this.state = { users: null };
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
                            <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" />
                            <button className="btn btn-outline-success my-2 my-sm-0" type="submit">WERKT NOG NIET</button>
                        </form>
                    </nav>
                    <table className="table table-bordered" id="dataTable" >
                        <thead>
                            <tr>
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

    private renderUsersTable(user) {
        const displayRank = (rank) => {
            switch (rank) {
                case 1:
                    return "Gebruiker";
                case 4:
                    return "Administrator";
                default:
                    return "Er is iets fout gegaan";
            }
        }

        return (<tr>
            <td>{user.name}</td>
            <td>{user.email}</td>
            <td>{user.createOn}</td>
            <td>{displayRank(user.rank)}</td>
            <td><Link to={'/user/view/' + user.id}>Bekijk</Link> | <Link to={'/user/edite/' + user.id}>Bewerk</Link></td>
        </tr>)
    }
}

export default withRouter(AdminUsers);