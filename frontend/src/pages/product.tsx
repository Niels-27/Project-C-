import * as React from 'react';

import { Link } from 'react-router-dom';
import ApiCall from '../logic/apiCall';
// import { Row, Col } from 'reactstrap';
interface IProps {
    match: {
        params: {
            id: number;
        }
    };
}

class App extends React.Component<IProps, any> {

    constructor(props: IProps) {
        super(props);
        this.state = { product: {
            name:"",
            imageName:"",
            price:"",
            discription:"",
        } };
    }

    public async componentDidMount() {
        const call: ApiCall = new ApiCall();
        call.setURL('details', this.props.match.params.id.toString());
        this.setState({ product: await call.result() });
    }

    public render() {
        var renderItem = <span>loading</span>;

        if (this.state.product !== null) {
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

                            <button type="button" className="btn btn-success btn-lg w-100">Koop nu</button>

                            <section className="Beschikbaarheid">
                                <div className="mt-5">
                                    <p className="grey-text">
                                    <strong>Beschikbaarheid: </strong>{this.state.product.amount}</p>
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

}



export default App;