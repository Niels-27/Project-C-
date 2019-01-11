import * as React from 'react';
// import './dashboard.css';
import ApiCall from '../../logic/apiCall';
// import { MdSettings, MdPerson} from "react-icons/md";
import { withRouter ,Link} from 'react-router-dom';
class AdminUsers extends React.Component<any, any>{

    constructor(props: any) {
        super(props);
        this.state = { user: null, userInput:{
            name:String,
            email:String,
            rank:String,
        },
        userInputAddres:{
            postal:String,
            street: String,
            city:String
        },
            user_adr:null,
            orders:null};
    }

    public async componentDidMount() {
        const call: ApiCall = new ApiCall();
        call.setURL('AdminuserdataView', this.props.match.params.id);
        const result = await call.result();
        await this.setState({ user: result, userInput: { name: result.name, email: result.email, rank: result.rank },orders: await this.getUserOrders(result.id)});
        await this.getAddresInfo(this.state.user.id);
        
    }


    public handleChangeName = (event) => {
        this.setState({ userInput: { name: event.target.value, email: this.state.userInput.email, rank: this.state.userInput.rank } });
    }
    public handleChangeMail = (event) => {
        this.setState({ userInput: { name: this.state.userInput.name, email: event.target.value , rank: this.state.userInput.rank } });
    }
    public handleChangeSelect = (event) => {
        this.setState({ userInput: { name: this.state.userInput.name, email: this.state.userInput.email, rank: event.target.value } });
    }

    public handleChangeStreet = (event) => {
        this.setState({ userInputAddres: { street: event.target.value, postal: this.state.userInputAddres.email, city: this.state.userInputAddres.city } });
    }
    public handleChangePostal = (event) => {
        this.setState({ userInputAddres: { street: this.state.userInputAddres.street, postal: event.target.value, city: this.state.userInputAddres.city } });
    }
    public handleChangeCity = (event) => {
        this.setState({ userInputAddres: { street: this.state.userInputAddres.street, postal: this.state.userInputAddres.email, city: event.target.value } });
    }


    public render() {
        if (this.state.user) {
            console.log(this.state.orders );
            const user = this.state.user;
            const input = this.state.userInput;
            return (
                <div className="col-sm-12">
                    <nav aria-label="breadcrumb" style={{ width: '100%' }}>
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item"><Link to="/">Dashboard</Link></li>
                            <li className="breadcrumb-item"><Link to="/Users">Users</Link></li>
                            <li className="breadcrumb-item active" aria-current="page">{user.name}</li>
                             <b onClick={this.removeUserHandler} style={{color:'red',marginLeft:'auto'}}>
                            Verwijder Gebruiker
                        </b>
                        </ol>

                    </nav>
                <div className="row" style={{ margin: '15px auto'}}>
                    <div className="col-sm-12">
                        <h5>{user.name}</h5>
                    </div>
                    <div className="col-sm-6" style={{borderStyle:'none solid none none',borderWidth:'1px',borderColor:'lightgrey'}}>
                        <p>{user.email}</p>
                        <p>{user.createOn}</p>
                        <p>{this.displayRank(user.rank)}</p>
                        <hr />
                        {this.renderAdress()}
                        <hr />
                            {this.state.orders ? this.state.orders.map(this.renderOrder) : "Geen orders gevonden"}
                    </div>
                    <div className="col-sm-6">
                    <div style={{maxWidth:'300px',width:'100%'}}>
                            <input className="form-control" value={input.name} onChange={this.handleChangeName}/>
                            <input className="form-control" value={input.email} onChange={this.handleChangeMail}/>
                            <select className="custom-select" id="inputGroupSelect01" onChange={this.handleChangeSelect}>
                                <option selected>{this.displayRank(user.rank)}</option>
                                <option value="1">{this.displayRank(1)}</option>
                                <option value = "4" > { this.displayRank(4)}</option>
                            </select>
                                <button className="btn btn-light" onClick={this.handleClick}>Opslaan</button>

                        <hr />

                    </div>
 
                    </div>

                </div>
                </div>
            );
        } else {
            return "loading..";
        }

    }

    private removeUserHandler = () =>{
        const response = this.removeUser(this.props.match.params.id);
        if(response){
            alert("gebruiker is verwijderd");
            this.props.history.push("/Users");
        }else{
            alert(response);
        }
    }

    private async removeUser(id){
        const call: ApiCall = new ApiCall();
        call.setURL('removeUser', id);
        const result = await call.MakeDeliteCall();
        return result;
    }

    private async getUserOrders(id){
        const call: ApiCall = new ApiCall();
        call.setURL('getOrders', id);
        const result = await call.result();
        return result;
        
    }

    private renderAdress =() =>{
        if(this.state.user_adr !== null){
            return(<div>
                {this.state.user_adr.city + " "}
                {this.state.user_adr.street + " "}
                {this.state.user_adr.postalCode + " "}
                {this.state.user_adr.country ? this.state.user_adr.country.name : "Deze user heeft geen gegevends"}

                
                </div>);
        }
        return ;
    }
    private async getAddresInfo(id){
        const call: ApiCall = new ApiCall();
        call.setURL('addressdata');
        const result = await call.result({ unique_name: id});
        await this.setState({
            user_adr: result, userInputAddres: {
                postal: result.postalCode,
                street: result.street,
                city: result.city
            }});
    }

    private handleClick = () =>{
        if (this.state.userInput.name && this.state.userInput.email && this.state.userInput.rank){
            this.makeCall(this.state);
        }else{
            alert('Vul alsjeblief alle velden correct in.');
        }
    }


    
 

    private async makeCall(state){
        const call: ApiCall = new ApiCall();
        call.setURL('AdminuserdataChange');
        const result = await call.result({ id: state.user.id,name: state.userInput.name, email: state.userInput.email, rank: state.userInput.rank });
        console.log(result);
    }
    private renderOrder = (order) => {
        console.log("order");

        return (<div>
            <p>order datum : {order[0].date}</p>
            {order.map(this.mapOrderItems)}
        </div>);
    }

    private mapOrderItems(item){
        return (<div style={{paddingLeft:'15px'}}>
            <div style={{ width: '10%' ,float:'left'}}><img src={item.imageName} height="25p" /></div>
            <div style={{ width: '10%', float: 'left'}}>{item.amount} x</div>
            <div style={{ width: '60%', float: 'left'}}>{item.name}</div>
            <div style={{ width: '10%', float: 'left'}}>{item.price}</div>
            <div style={{ width: '10%', float: 'left' }}>{item.price * item.amount}</div>
        </div>);

    }
    private displayRank = (rank) => {
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
}

export default withRouter(AdminUsers);