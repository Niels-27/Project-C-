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
interface IProps {
        id:number;
        name:string;
        price:string;
        imageName:string;  
}

class ProductList extends React.Component<any, IProps> {

    constructor(props: any) {
        super(props);
    }

    public renderAllProducts = (product) => {

        const onClickProduct = () => {
            this.props.history.push("/product/" + product.id);

        };
        return (
            <div className="col-md-3 col-sm-6" style={{ marginTop: '20px' }}>
                <Card key={product.id + "_key_Product"}>
                    <div className="imageHeightFix" style={{ backgroundImage: 'url(' + product.imageName + ')' }} onClick={onClickProduct} />
                    <CardBody>
                        <CardTitle onClick={onClickProduct}>{product.name}</CardTitle>
                        <CardSubtitle>{product.price}</CardSubtitle>
                    </CardBody>
                </Card>
            </div>);



    }

    public render() {
        var showResults = <div>loading... </div>;
        if (this.props.products){
            showResults = <div className="container"><div className="row">{this.props.products.map(this.renderAllProducts)} </div></div>;
        }
 

        return (
            <div>{showResults}</div>
        );
    }
}


export default withRouter(ProductList);