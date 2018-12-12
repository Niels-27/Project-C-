import * as React from 'react';
import './dashboard.css';
import ApiCall from '../../logic/apiCall';

import { withRouter, Link } from 'react-router-dom';
class AdminUsers extends React.Component<any, any>{
    public timeoutID: any;
    constructor(props: any) {
        super(props);
        this.state = { products: null,search:null ,searchString:""};
    }

    public async componentDidMount() {
        const call: ApiCall = new ApiCall();
        call.setURL('allProducts');
        await this.setState({ products: await call.result() });
    }

    public render() {

        return (
            <div className="card-body">
                <div className="table-responsive">
                    <h5>Producten</h5>
                    <nav className="navbar navbar-light bg-light" style={{marginBottom:'15px'}}>
                        <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" style={{ maxWidth: '300px' }} value={this.state.searchString} onChange={this.handleChange}/>
                    </nav>
                    <table className="table table-bordered" id="dataTable" >
                        <thead>
                            <tr>
                                <th>Foto</th>
                                <th>Naam</th>
                                <th>Prijs</th>
                                <th>Op vooraad</th>
                                <th>Opties</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.products ? this.state.products.map(this.renderProductsTable) : "Loading"}

                        </tbody>
                    </table>
                </div>
            </div>

        );
    }

    public handleChange = (event) =>{
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


    private renderProductsTable = (product) =>{
        if (this.state.search === null || this.state.search === "" || product.name.includes(this.state.search)){
            return (<tr>
                        <td><img src={product.imageName} height="20px" /></td>
                        <td>{product.name}</td>
                        <td>{product.price}</td>
                        <td>{product.amount}</td>
                        <td><Link to={'/product/view/' + product.id}>Bekijk</Link> | <Link to={'/product/edite/' + product.id}>Bewerk</Link></td>
                    </tr>);
        }
       return ;
    }
    
}

export default withRouter(AdminUsers);