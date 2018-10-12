import axios from 'axios';
import * as React from 'react';
import './ProductList.css';
import { Search } from './Search';
import { any } from 'prop-types';

const DEFAULT_QUERY = '';

const URL = 'http://localhost:5000/api/product/all/';

export default class ProductList extends React.Component< any, any> {
    
    
    
	constructor(props:any) {
        searchTerm:any
		super(props);
		this.state = {
		products:[], request: null,  showDiscription: false, status: null, searchTerm : DEFAULT_QUERY
        };
        this.fetchProducts = this.fetchProducts.bind(this);
        this.onSearchChange = this.onSearchChange.bind(this);
        this.onSearchSubmit = this.onSearchSubmit.bind(this);       
    }
    onSearchChange(event){
		this.setState({searchTerm: event.target.value});
    }
    public onSearchSubmit(event) {
                    const { searchTerm } = this.state;
                    this.fetchProducts(searchTerm);
                    event.preventDefault();
                    }            

    public fetchProducts(searchTerm){
        axios.get(`{URL}${searchTerm}`)
        .then(res => {
          const products = res.data;
          const status = res.status;
          const request = res.request;
          this.setState({ products, request, status  });
        })       
    }

     public componentDidMount(): void{
        const { searchTerm } = this.state;
        this.fetchProducts(searchTerm);
    }

    public renderAllProducts(product){
        const derp = () => {
            this.setState({showDiscription:1})
        }
        return ( <ul key={product.name} className="product">             
        <canvas id="canvas"/>
            <div>
            <img id="source" src={product.imageName}
                width="300" height="300"/>                                   
         </div>
         <script src="pd.js"/>
         
         <li data-onClick={derp}>{product.name}</li>   

        <li>{product.price}</li> 

        </ul>);
    }

    public render() {   
        var showProducts = this.state.products.map(this.renderAllProducts);
        if(this.state.showDiscription !== false){
            showProducts = "show discription for product id :" + this.state.showDiscription;
        }
        const {searchTerm} = this.state
        return (
        <div className="container2"> 
        <Search                   
            value = {searchTerm}
            onChange = {this.onSearchChange}
            onSubmit = {this.onSearchSubmit}
            >
            Search
         </Search>
                {showProducts } 
        </div>

        
        );
    }
}

