import * as React from 'react';
import { Button, Modal, ModalHeader, ModalBody, Row, Col, Container } from 'reactstrap';


import { Link } from 'react-router-dom';
import ApiCall from '../logic/apiCall';

import Cookie from '../logic/cookie';

// import { Row, Col } from 'reactstrap';
interface IProps {
    match: {
        params: {
            id: number;
        }
    };
}

class App extends React.Component<IProps&any, any> {

    public cookie: Cookie = new Cookie();

    constructor(props: IProps) {
        super(props);
        this.state = {
            product: {
                modal: false,
                name: "",
                imageName: "",
                price: "",
                discription: "",
            },
            wishobject: {
                user_id: 0, 
                product_id:0
            }
        };

        this.toggle = this.toggle.bind(this);
    }

    public async componentDidMount() {
        const call: ApiCall = new ApiCall();
        call.setURL('details', this.props.match.params.id.toString());
        this.setState({ product: await call.result() });
    }

    // Onderstaande code letterlijk overgenomen. Even re-organiseren.

    public async SaveToWish(props) {
        const call: ApiCall = new ApiCall();
        const test = props;
        if (this.props.userData) {
            // const userobject = {user_id:this.props.userData.id, product_id:props.match.params.id }
            // const okeoke = new Object(user_id: )
            call.setURL('wishlistAdd');
            await call.result(test).then(result => console.log(result + "succes bando"))
        }
    }

    public SaveToWishFunc = () =>{
        this.setState(prevState => ({
            wishobject: {
                user_id: this.props.userData.id,
                product_id:this.props.match.params.id, 
            }
        }), async () => {
            console.log(this.state.wishobject + "");
            this.SaveToWish(this.state.wishobject);
        }
        
        )
        // this.SaveToWish(this.state.wishobject);
    }
    
    // Bovenstaande code letterlijk overgenomen. Even re-organiseren.


    public toggle() {
        this.setState({
          modal: !this.state.modal
        });
      }

    public render() {
        var renderItem = <span>loading</span>;
        const closeBtn = <button className="close" onClick={this.toggle}>&times;</button>;
        
        if (this.state.product !== null) {
            var beschikbaarheid = <span>{this.state.product.amount}</span>
            if(this.state.product.amount <= 0){
                beschikbaarheid = <span className="text-danger">Uitverkocht</span>
            }
            renderItem = (
                <div className="mt-5 hoverable">
                    <Link to='/'>Home </Link> > {this.state.product.name}
                    <div className="row mt-5">
                        <div className="col-lg-6">
                            <div className="row mx-2">
                                <div id="carousel-thumb" className="carousel slide carousel-fade carousel-thumbnails mb-5 pb-4" data-ride="carousel">

                                    <div className="carousel-inner text-center text-md-left" role="listbox">
                                        <div className="carousel-item active">
                                            <img src={this.state.product.imageName} alt="First slide" className="img-fluid img-thumbnail" />
                                        </div>


                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-5 mr-3 text-center text-md-left">
                            <h2 className="h2-responsive text-center text-md-left product-name font-weight-bold dark-grey-text mb-1 ml-xl-0 ml-4">
                                <strong>{this.state.product.name}</strong>
                            </h2>


                            <h3 className="h3-responsive text-center text-md-left mb-5 ml-xl-0 ml-4">
                                <span className="grey-text">
                                    <small>€{this.state.product.price}</small>
                                </span>
                            </h3>

                            <p className="ml-xl-0 ml-4">{this.state.product.description}
                            </p>

                            <p className="ml-xl-0 ml-4">
                                <strong>Kleur: </strong>{this.state.product.color}</p>


                            <strong>Dit product is beschikbaar in de volgende maat: </strong>

                            <h3 className="h3-responsive text-center text-md-left mt-2 mb-5 ml-xl-0 ml-4">
                                {this.state.product.sizeName}

                            </h3>

                            <Button type="button" className="btn btn-success btn-lg w-100" disabled={this.state.product.amount <= 0} onClick={this.addProductToShoppiongCard}>Koop Nu</Button>
                            <Button type="button" className="btn btn-success btn-lg w-100" onClick={this.SaveToWishFunc} style={{marginTop:15}}>Smash Like</Button>

                            <Modal isOpen={this.state.modal} toggle={this.toggle}  >
                                <ModalHeader toggle={this.toggle} close={closeBtn}>In winkelmandje geplaatst</ModalHeader>                                
                                <ModalBody>
                                    <Container>
                                    <Row>
                                        <Col xs="7">
                                            <Row>
                                            <Col xs="5">
                                                <img src={this.state.product.imageName} style={{width:100, height:100}}/>
                                            </Col>
                                            <Col xs="7">
                                                <table>
                                                    <tr>
                                                        <td>{this.state.product.name}</td>
                                                    </tr>
                                                    <tr>
                                                        <td>€{this.state.product.price}</td>
                                                    </tr>
                                                    <tr>
                                                        <td>Maat: {this.state.product.sizeName}</td>
                                                    </tr>
                                                </table>
                                            </Col>
                                            </Row>
                                        </Col>
                                        <Col xs="5">
                                            <Button type="button" className="btn btn-success w-100" style={{marginBottom:15}}>
                                                <Link style={{color:"white", textDecoration:"none"}} to="/ShoppingCard">Afrekenen</Link>
                                            </Button>
                                            <Button type="button" className="btn btn-success w-100" onClick={this.toggle}>Verder Winkelen</Button>
                                        </Col>
                                    </Row>
                                    </Container>
                                </ModalBody>
                            </Modal>

                            <section className="Beschikbaarheid">
                                <div className="mt-5">
                                    <p className="grey-text">
                                        <strong>Beschikbaarheid: </strong>{beschikbaarheid}</p>
                                </div>
                            </section>


                        </div>
                    </div>
                </div>
            );
        }

        return (
            <div className="container">
                {renderItem}
            </div>
        );
    }

    private addProductToShoppiongCard = () => {
        const c = this.cookie.get('ShoppingCard');
        this.toggle();
        if (c) {
            const d = JSON.parse(c);
            d.items.push(this.props.match.params.id.toString());
            this.cookie.set('ShoppingCard', JSON.stringify(d));
            /// add to cookie
        } else {
            const cjson = { items: [this.props.match.params.id.toString()] }
            this.cookie.set('ShoppingCard', JSON.stringify(cjson));
        }
    }

}



export default App;
