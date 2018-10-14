import axios from 'axios';
import * as React from 'react';
import './ProductList.css';
// import { Search } from './Search';
// import { any } from 'prop-types';

const DEFAULT_QUERY = '';

const PATH_BASE = 'http://localhost:5000/api/product';

const DEFAULT_SEARCH_KW = '';

export default class ProductList extends React.Component< any, any> {
    
	constructor(props:any) {
		super(props);
		this.state = {
		products:[], request: null,  showDiscription: false, status: null, searchTerm : DEFAULT_QUERY,
        searchKeyword: DEFAULT_SEARCH_KW, searchButtonTouched: false, noResult: false };
        this.fetchProducts = this.fetchProducts.bind(this);
        this.onSearchChange = this.onSearchChange.bind(this);
        this.onSearchSubmit = this.onSearchSubmit.bind(this); 

        this.renderAllProducts = this.renderAllProducts.bind(this);
    }

    public onSearchChange(event){
        this.setState({searchTerm: event.target.value});
        this.setState({searchKeyword: 'search/'});
        this.setState({searchButtonTouched:true});
    }
    public onSearchSubmit(event) {
        const { searchTerm, searchKeyword, searchButtonTouched } = this.state;
        
        if(!searchTerm){
            this.setState({searchButtonTouched:false});
            this.setState({searchKeyword:''});
        }
        this.fetchProducts(searchTerm, searchKeyword, searchButtonTouched);
        event.preventDefault();
              }            

    public fetchProducts(searchTerm, searchKeyword, searchButtonTouched){
        this.setState({noResult:false})
        axios.get(`${PATH_BASE}/${searchKeyword}${searchTerm}`)
        .then(res => {
          const products = res.data;         
          const status = res.status;
          const request = res.request;       
          this.setState({ products, request, status  });
          if(products.length === 0 && searchButtonTouched){
            this.setState({noResult: true});
          }
         
        })       
    }
     public componentDidMount(): void{
        const { searchTerm, searchKeyword, searchButtonTouched} = this.state;
        this.fetchProducts(searchTerm, searchKeyword, searchButtonTouched);
    }

    public renderAllProducts(product){

        const onClickProduct = () => {
            console.log(product.id );
            //// navigate to new product page with link
        };

        return ( 
        <ul key={product.name} className="product">             
        <canvas id="canvas"/>
            <div>
            <img id="source" src={product.imageName}
                width="300" height="300" />                                   
         </div>     
            <li onClick={onClickProduct}>{product.name}</li>   

            <li>{product.price}</li> 
        </ul>);
    }

    public render() {  
        const {searchTerm, noResult, request, status, products} = this.state
        console.log(products);
        console.log(request);
        console.log(status);
        
        let showResults;
        if(noResult){
            showResults= <div>Geen resultaten gevonden.</div>
        }
        else{
            showResults= <div>{this.state.products.map(this.renderAllProducts) } </div>
        }   
        return (
        <div className="container2"> 
        <Search                   
            value = {searchTerm}
            onChange = {this.onSearchChange}
            onSubmit = {this.onSearchSubmit}
            >
            Search
         </Search>  
         {showResults}
        </div>
        );
    }   
}
    const Search = ({
       value,
       onChange,
       onSubmit,
       children
       }) =><form onSubmit={onSubmit}>
            <input
            type="text"
            value={value}
            onChange={onChange}
            />
            <button type="submit">
            {children}
            </button>
            </form>

