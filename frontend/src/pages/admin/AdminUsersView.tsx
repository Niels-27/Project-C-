import * as React from 'react';
import './dashboard.css';
import ApiCall from '../../logic/apiCall';
// import { MdSettings, MdPerson} from "react-icons/md";
import { withRouter } from 'react-router-dom';
class AdminUsers extends React.Component<any, any>{

    constructor(props: any) {
        super(props);
        this.state = { user: null };
    }

    public async componentDidMount() {
        const call: ApiCall = new ApiCall();
        call.setURL('AdminuserdataView', this.props.match.params.id);
        await this.setState({ user: await call.result() });
    }

    public render() {
        if (this.state.user) {
            const user = this.state.user;
            return (
                <div className="card-body">
                    <h5>{user.name}</h5>
                    <div className="container">
                        <p>{user.email}</p>
                        <p>{user.createOn}</p>
                        <p>{this.displayRank(user.rank)}</p>
                    </div>

                    <div className="container">
                        {user.orders ? user.orders.map(this.renderOrder) : "Geen orders gevonden"}
                    </div>
                </div>
            );
        } else {
            return "loading..";
        }

    }

    private renderOrder(order) {
        return (<p>Order: {order}</p>);
    }
    private displayRank = (rank) => {
        switch (rank) {
            case 1:
                return "Gebruiker";
            case 4:
                return "Administrator";
            default:
                return "Er is iets fout gegaan";
        }
    }
}

export default withRouter(AdminUsers);