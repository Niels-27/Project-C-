import axios from 'axios';
import * as React from 'react';

export default class ProductList extends React.Component< any, any> {
	
	constructor(props:any) {
		super(props);
		this.state = {
		products:[], request: null, status: null,  
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
    public render() {
        console.log(this.state.status);
        console.log(this.state.request);     
        return (
        <div className="container2"> 
                { this.state.products.map((product: any) => 
                <div key= {product.name}>
                <canvas id="canvas"/>
                    <div>
                    <img id="source" src={product.imageName}
                        width="300" height="227"/>                                   
                 </div>
                <span>{product.name}</span>  
                </div>
                )} 
        </div>
        );
    }
}

