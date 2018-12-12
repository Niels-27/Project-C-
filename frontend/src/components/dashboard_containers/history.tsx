import * as React from 'react';
import './orders.css';
import { ListGroup, ListGroupItem } from 'reactstrap';
import {
    Card, CardBody,
    CardTitle, CardHeader, CardText
} from 'reactstrap';

class History extends React.Component<any,any>{
    constructor(props: any) {
        super(props);
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
                       
                    </CardBody>
                </Card>
            </div>);



    }
    public render() {
        const {userData, address} = this.props
        var showresults = <div>Laden..</div>
        if(userData && address){
            showresults = 
            <div className="container">

                <h5><b>Mijn geschiedenis</b></h5>
                <p id="dashboard-text">
                    Hier kun je informatie vinden over je oude bestellingen.
                </p>        


                <div className="row orderBox">
                <div className="col-12 mb-4">
                    <Card>
                        <CardHeader className="cardHeader">    
                         <b><p className="left-items"style={{float:"left"}}>
                            <span className="OrderNumber">Bestellingsnummer: </span> 
                            <span className="OrderDate">Bestellingsdatum: </span>
                            <span className="OrderPrice">Totale prijs: </span></p>  </b>
                            <p className="right-items"style={{float:"right"}}><span className="OrderStatus text-info">Bestelling Status</span></p>                      
                        </CardHeader> 
                        <CardBody className="orderSection">       
                            <div className="row inner-boxes"> 
                                <div className="col-10 sectionProductList">       
                                <ListGroup flush >
                                    <ListGroupItem tag="span">Product 1</ListGroupItem>
                                    <ListGroupItem tag="span">Product 2</ListGroupItem>
                                    <ListGroupItem tag="span">Product 3</ListGroupItem>
                                    <ListGroupItem tag="span">Product 4</ListGroupItem>
                                    <ListGroupItem tag="span">Product 5</ListGroupItem>
                                </ListGroup>
                                </div> 
                                <div className="col-2 border-left sectionOrderDetails">  
                                <CardText className="cardTextsection2">
                                    Order details
                                </CardText>    
                                </div> 
                            </div>               
                        </CardBody>
                    </Card>
                </div>    
                <div className="col-12 mb-4">
                    <Card>
                        <CardHeader className="cardHeader">    
                        <b><p className="left-items"style={{float:"left"}}>
                            <span className="OrderNumber">Bestellingsnummer: </span> 
                            <span className="OrderDate">Bestellingsdatum: </span>
                            <span className="OrderPrice">Totale prijs: </span></p>  </b>
                            <p className="right-items"style={{float:"right"}}><span className="OrderStatus text-info">Bestelling Status</span></p>                      
                        </CardHeader> 
                        <CardBody className="orderSection">       
                            <div className="row inner-boxes"> 
                                <div className="col-10 sectionProductList">       
                                <ListGroup flush >
                                    <ListGroupItem tag="span">Product 1</ListGroupItem>
                                    <ListGroupItem tag="span">Product 2</ListGroupItem>
                                    <ListGroupItem tag="span">Product 3</ListGroupItem>
                                    <ListGroupItem tag="span">Product 4</ListGroupItem>
                                    <ListGroupItem tag="span">Product 5</ListGroupItem>
                                </ListGroup>
                                </div> 
                                <div className="col-2 border-left sectionOrderDetails">  
                                <CardText className="cardTextsection2">
                                    Order details
                                </CardText>    
                                </div> 
                            </div>               
                        </CardBody>
                    </Card>
                </div>      
            </div>


        </div>
            
        }
        return (
            <div>
                {showresults}
            </div>
        );
    }
}

export default History;