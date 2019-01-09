import * as React from 'react';
// import './dashboard.css';
import ApiCall from '../../logic/apiCall';
// import { MdSettings, MdPerson} from "react-icons/md";
import { withRouter,Link } from 'react-router-dom';
// import { element } from 'prop-types';
class AdminNewProduct extends React.Component<any, any>{

    constructor(props: any) {
        super(props);
        this.state = {product:null,
            cat:[],
            selectedCat:[],
            allSizes:[],
            size:null
        };
    }

    public async componentDidMount() {
        const call: ApiCall = new ApiCall();
        call.setURL('AdminAllCattegories');
        const cat = await call.result();
        call.setURL('AdminGetAllSizes');
        const allSizes = await call.result();
        this.setState({ cat , allSizes});
    }

 
    public render() {
        const product = this.state;
        return (<div className="col-sm-12">
            <nav aria-label="breadcrumb" style={{ width: '100%' }}>
                <ol className="breadcrumb">
                    <li className="breadcrumb-item"><Link to="/">Dashboard</Link></li>
                    <li className="breadcrumb-item"><Link to="/products">Producten</Link></li>
                    <li className="breadcrumb-item active" aria-current="page">Nieuw Product</li>

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
                                                <img src={product.url} alt="First slide" className="img-fluid img-thumbnail" />
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
                                    <div className="mt-5">
                                        {this.state.selectedCat.map(this.renderSelectedCat)}
                                    </div>
                                </section>


                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-sm-5">
                    <div>
                        <input className="form-control" value={this.state.url} placeholder="Afbeelding url" onChange={this.handleChangeurl} />
                        <input className="form-control" value={this.state.name} placeholder="Product naam"  onChange={this.handleChangename} />
                        <textarea className="form-control" value={this.state.description} placeholder="Product Beschrijving" onChange={this.handleChangedesc} />
                        <input className="form-control" value={this.state.price} placeholder="prijs" onChange={this.handleChangeprice} />
                        <input className="form-control" value={this.state.color} placeholder="Product kleur"  onChange={this.handleChangecolor} />
                        <select className="custom-select" id="inputGroupSelect01" onChange={this.handleChangeSelect}>
                            <option selected>Selecteer een maat</option>
                            {this.state.allSizes.map(this.renderSelectSizes)}
                        </select>
                        <input className="form-control" value={this.state.amount} placeholder="Hoeveel op vooraad." onChange={this.handleChangeamount} />
                        <hr />
                        {this.state.cat.map(this.renderCat)}
                        <hr />
                        <button className="btn btn-light" onClick={this.handleClick}>Opslaan</button>
                        

                    </div>

                </div>
            </div>
        </div>
        );
    }

    public renderSelectSizes = (item) => {
        return (<option value={item.id} id={item.sizeName}>{item.sizeName}</option>);
    }
    public renderSelectedCat = (item) =>{
        const x = () => {this.RemoveThisCat(item);}
        for (const i of this.state.cat) {
            if (i.id === item) {
                return (<button type="button" onClick={x} className="btn btn-primary">{i.name}<span className="badge">X</span>
                </button>);
            }
        }

        return null;
    }




    public renderCat = (item) => {
        const x = () =>{
            this.addThisCat(item.id);
        }
        return (<button type="button" onClick={x} className="btn btn-primary">{item.name}
        </button>);
    }
    public addThisCat(id){
        const x = this.state.selectedCat;
        x.push(id);
        this.setState({ selectedCat:x});
    }
    public RemoveThisCat(id) {
        const x = this.state.selectedCat;
        const arr = x.filter(item => item !== id)
        this.setState({ selectedCat: arr });
    }
    public getNameOfSize = (item) =>{
        for (const i of this.state.allSizes) {
            if (i.id.toString() === item) {
                return i.sizeName;
            }
        }
    }
    public handleChangeSelect = (event) => {
        this.setState({ sizeName: this.getNameOfSize(event.target.value) ,size:event.target.value });
    }
    
    public handleChangeurl = (event) => {
        this.setState({ url: event.target.value, });
    }
    public handleChangename = (event) => {
        this.setState({ name: event.target.value });
    }
    public handleChangeprice = (event) => {
        this.setState({ price: event.target.value });
    }
    public handleChangecolor = (event) => {
        this.setState({ color: event.target.value });
    }
    public handleChangedesc = (event) => {
        this.setState({ description: event.target.value });
    }
    public handleChangeamount = (event) => {
        this.setState({ amount: event.target.value });
    }

    private handleClick = () => {

        if (this.state.url && this.state.name && this.state.price && this.state.color && this.state.description && this.state.size && this.state.selectedCat && this.state.amount) {
            this.makeCall(this.state);
        } else {
            alert('Vul alsjeblief alle velden correct in.');
        }
    }

    private async makeCall(state) {
        const call: ApiCall = new ApiCall();
        call.setURL('AdminNewProduct');
        const result = await call.result({
            imageName: this.state.url,
            name: this.state.name,
            price: this.state.price,
            color: this.state.color,
            description: this.state.description,
            size: this.state.size,
            cat: this.state.selectedCat,
            amount:this.state.amount
        });
        alert(result);

    }

 
}

export default withRouter(AdminNewProduct);