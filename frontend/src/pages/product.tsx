import * as React from 'react';

import axios from 'axios';
import { Link} from 'react-router-dom';
// import { Row, Col } from 'reactstrap';
interface IProps {
    match:{
        params:{
            id:number;
        }
    };
}

class App extends React.Component<IProps,any> {
    
    constructor(props: IProps) {
        super(props);
        this.state = { product : null};
    }

    public componentDidMount(){
       this.getProductInfo(this.props.match.params.id);
    }

    public render() {
        var renderItem = <span>loading</span>;

        if (this.state.product !== null){
             renderItem = (
             <div className="mt-5 hoverable">
                     <Link to='/'>Home </Link> > {this.state.product.name}
                <div className="row mt-5">
                    <div className="col-lg-6">
                        <div className="row mx-2">
                            <div id="carousel-thumb" className="carousel slide carousel-fade carousel-thumbnails mb-5 pb-4" data-ride="carousel">

                                <div className="carousel-inner text-center text-md-left" role="listbox">
                                    <div className="carousel-item active">
                                             <img src={this.state.product.imageName} alt="First slide" className="img-fluid" />
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
                                 <strong>Availability: </strong>{this.state.product.amount}</p>
                        <section className="color">
                            <div className="mt-5">
                                <p className="grey-text">Pick a size</p>
                                <div className="row text-center text-md-left">                          
                                    .
                                </div>

                                
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

    private getProductInfo(id){
        axios.get(`http://localhost:5000/api/product/${id}/details`)
            .then(res => {
                const product = res.data;
                this.setState({ product});
            })       
    }
}



export default App;
