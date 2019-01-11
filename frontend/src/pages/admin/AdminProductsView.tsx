import * as React from 'react';
import './dashboard.css';
// import { MdSettings, MdPerson} from "react-icons/md";
import { withRouter, Link } from 'react-router-dom';
import ApiCall from '../../logic/apiCall';

class AdminUsers extends React.Component<any, any>{

    constructor(props: any) {
        super(props);
        this.state = { product: null ,
        url:null,
    name:null,
price:null,
color:null,
description:null,
            sizeName:null,
            amount:null,cat:[]};
    }

    public async componentDidMount() {
        const call: ApiCall = new ApiCall();
        call.setURL('details', this.props.match.params.id.toString());
        const product = await call.result();
        this.setState({ product, url: product.imageName, name: product.name, price: product.price, description: product.description, color: product.color, sizeName: product.sizeName, amount: product.amount});
    }

    public render() {
        if (this.state.product) {
            const product = this.state;
            return (
                <div className="col-sm-12">
                    <nav aria-label="breadcrumb" style={{ width: '100%' }}>
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item"><Link to="/">Dashboard</Link></li>
                            <li className="breadcrumb-item"><Link to="/products">Producten</Link></li>
                            <li className="breadcrumb-item active" aria-current="page">{product.name}</li>
                            <b onClick={this.removeUserHandler} style={{ color: 'red', marginLeft: 'auto' }}>
                                Verwijder Product
                        </b>
                        </ol>
                    </nav>
                    <div className="row" style={{ margin: '15px auto' }}>
                        <div className="col-sm-7" style={{ borderStyle: 'none solid none none', borderWidth: '1px', borderColor: 'lightgrey' }}>
                                           <div className="mt-5 hoverable">
                    <div className="row mt-5">
                        <div className="col-lg-6">
                            <div className="row mx-2">
                                <div id="carousel-thumb" className="carousel slide carousel-fade carousel-thumbnails mb-5 pb-4" data-ride="carousel">

                                    <div className="carousel-inner text-center text-md-left" role="listbox">
                                        <div className="carousel-item active">
                                                        {product.url ? <img src={product.url} alt="First slide" className="img-fluid img-thumbnail"/> :""}
                                        </div>


                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-5 mr-3 text-center text-md-left">
                            <h2 className="h2-responsive text-center text-md-left product-name font-weight-bold dark-grey-text mb-1 ml-xl-0 ml-4">
                                <strong>{product.name}</strong>
                            </h2>


                            <h3 className="h3-responsive text-center text-md-left mb-5 ml-xl-0 ml-4">
                                <span className="grey-text">
                                    <small>€{product.price}</small>
                                </span>
                            </h3>

                            <p className="ml-xl-0 ml-4">{product.description}
                            </p>

                            <p className="ml-xl-0 ml-4">
                                <strong>Kleur: </strong>{product.color}</p>


                            <strong>Maat: </strong>

                            <h3 className="h3-responsive text-center text-md-left mt-2 mb-5 ml-xl-0 ml-4">
                                {product.sizeName}

                            </h3>

                            <section className="Beschikbaarheid">
                                <div className="mt-5">
                                    <p className="grey-text">
                                        <strong>Beschikbaarheid: </strong>{product.amount}</p>
                                </div>
                            </section>


                        </div>
                    </div>
                </div>
                        </div>
                        <div className="col-sm-5">
                            <div>
                                 <input className="form-control" value={this.state.url} onChange={this.handleChangeurl}/>
                                 <input className="form-control" value={this.state.name} onChange={this.handleChangename}/>
                                 <textarea className="form-control" value={this.state.description} onChange={this.handleChangedesc}/>
                                 <input className="form-control" value={this.state.price} onChange={this.handleChangeprice}/>
                                 <input className="form-control" value={this.state.color} onChange={this.handleChangecolor}/>
                                <input className="form-control" value={this.state.amount} onChange={this.handleChangeamount} />
                                
                                 <button className="btn btn-light" onClick={this.handleUpdateClick} >Opslaan</button>
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

      public handleChangeurl = (event) => {
        this.setState({  url:event.target.value});
    }
    public handleChangename = (event) => {
        this.setState({  name:event.target.value});
    }
    public handleChangeprice = (event) => {
        this.setState({  price:event.target.value});
    }
    public handleChangecolor = (event) => {
        this.setState({  color:event.target.value});
    }
      public handleChangedesc = (event) => {
        this.setState({  description:event.target.value});
    }
    public handleChangeamount = (event) => {
        this.setState({ amount: event.target.value });
    }

  

    public handleUpdateClick = () =>{
        if (this.state.url && this.state.name && this.state.price && this.state.color && this.state.description){
            this.makeCall(this.state,this.props.match.params.id);
        }else{
            alert('Vul alsjeblief alle velden correct in.');
        }
    }

    private async makeCall(state,id){
        const call: ApiCall = new ApiCall();
        call.setURL('AdminProductdataChange');
        const result = await call.result({ id ,ImageName: state.url, Name: state.name, Color: state.color, Description:state.description,Price:state.price});
        console.log(result);
    }
       private removeUserHandler = () =>{
        const response = this.removeUser(this.props.match.params.id);
        if(response){
            alert("Product is verwijderd");
            this.props.history.push("/products");
        }else{
            alert(response);
        }
    }

    private async removeUser(id){
        const call: ApiCall = new ApiCall();
        call.setURL('removeProduct', id);
        const result = await call.MakeDeliteCall();
        return result;
    }

    

}

export default withRouter(AdminUsers);