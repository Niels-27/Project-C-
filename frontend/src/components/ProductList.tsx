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

class ProductList extends React.Component<any, any> {

    constructor(props) {
        super(props);
        this.state = { products: this.props.products}

    }

    public componentWillReceiveProps(nextProps) {
        this.setState({ products: nextProps.products });
    }


    public renderAllProducts = (product) => {

        const onClickProduct = () => {
            this.props.history.push("/product/" + product.id);

        };

        return (
            <div className="col-md-3 col-sm-6" style={{ marginTop: '10px' }}>
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
            if (this.props.maxItems && Object.keys(this.props.products).length > this.props.maxItems){

                const tempArr = this.state.products.slice(0, this.props.maxItems);
                showResults = <div className="row">{tempArr.map(this.renderAllProducts)} </div>;
            } else if (Object.keys(this.props.products).length > 0){
                showResults = <div className="row">{this.state.products.map(this.renderAllProducts)} </div>;
            }else{
                showResults = <div className="row"> Woops Geen producten Gevonden</div>;
            }
            
        }



        return (
            <div>{showResults}</div>
        );
    }
}


export default withRouter(ProductList);