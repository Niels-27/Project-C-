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
        return (
        <div className="container2"> 
                {showProducts } 
        </div>
        );
    }
}

