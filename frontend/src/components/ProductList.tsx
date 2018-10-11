import axios from 'axios';
import * as React from 'react';
import './ProductList.css';

export default class ProductList extends React.Component< any, any> {
	
	constructor(props:any) {
		super(props);
		this.state = {
		products:[], request: null,  showDiscription: false, status: null, 
        };
        
    }
     public componentDidMount(): void{
        axios.get('http://localhost:5000/api/product/all')
      .then(res => {
        const products = res.data;
        const status = res.status;
        const request = res.request;
        this.setState({ products, request, status  });
      })
       
    }


    public renderAllProducts(product){

        const deleteUser = () => {
            console.log(product.id );
            //// navigate to new product page with link
        };

        return ( <ul key={product.name} className="product">             
        <canvas id="canvas"/>
            <div>
            <img id="source" src={product.imageName}
                width="300" height="300"/>                                   
         </div>
         <script src="pd.js"/>
         
            <li onClick={deleteUser}>{product.name}</li>   

            <li>{product.price}</li> 

        </ul>);
    }



    public render() {   
        return (
        <div className="container2"> 
                {this.state.products.map(this.renderAllProducts.bind(this)) } 
        </div>
        );
    }
}

