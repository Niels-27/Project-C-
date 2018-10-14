import axios from 'axios';
import * as React from 'react';
import './ProductList.css';

import {
    Card, CardBody,
    CardTitle, CardSubtitle
} from 'reactstrap';

import {
    withRouter
} from "react-router-dom";
// import { Search } from './Search';
// import { any } from 'prop-types';

const DEFAULT_QUERY = '';

const PATH_BASE = 'http://localhost:5000/api/product';

const DEFAULT_SEARCH_KW = '';

 class ProductList extends React.Component< any, any> {
    
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
            this.props.history.push("/product/" + product.id);
    
        };

        return (         
            <div className="col-md-3 col-sm-6" style={{marginTop:'20px'}}>
                <Card key={product.id + "_key_Product"}>
                    <div className="imageHeightFix" style={{ backgroundImage: 'url(' + product.imageName + ')' }} onClick={onClickProduct}/>
                    <CardBody>
                        <CardTitle onClick={onClickProduct}>{product.name}</CardTitle>
                        <CardSubtitle>{product.price}</CardSubtitle>
                    </CardBody>
                </Card>
            </div>);



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
            showResults= <div className="container"><div className="row">{this.state.products.map(this.renderAllProducts) } </div></div>
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

export default withRouter(ProductList);