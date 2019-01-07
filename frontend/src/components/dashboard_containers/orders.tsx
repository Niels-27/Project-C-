import * as React from 'react';
import './orders.css';
import {GetOrders} from '../../actions/orderActions';
import * as PropTypes from 'prop-types';
import  { connect } from 'react-redux';
import { ListGroup, ListGroupItem } from 'reactstrap';
import {
    Card, CardBody, CardHeader
} from 'reactstrap';

class Orders extends React.Component<any,any>{
    public static propTypes = {getOrders: PropTypes.func.isRequired, user: PropTypes.object.isRequired}
    constructor(props: any) {
        super(props);
        this.state = {orders: null}
    }
   
    public async componentDidMount(){
        const {user} = this.props
        console.log("kom hiert langs")
        console.log(user)
        
        await this.props.getOrders(user.unique_name).then(async (result) => await this.setState({orders: result}), (error) => console.log(error))
            
    }
    public render() {
        console.log("Hier komen de orders")
        console.log(this.props)
        var showresults = <div>Laden..</div>
        var orderMessage = <span>U heeft momenteel geen bestellingen.</span>
        if(this.state.orders!== null){
            console.log(this.state.orders)
            orderMessage = <span>U heeft momenteel <b>{this.state.orders.length}</b> bestelling(en) lopen.</span>
            showresults = 
            <div className="container">

                <h5><b>Mijn bestellingen</b></h5>
                <p id="dashboard-text">
                    Hier kun je informatie vinden over je lopende bestellingen.
                </p>        
                <p id="dashboard-text">
                  {orderMessage}
                </p>   
                <div className="row orderBox mt-5">
                {this.state.orders.map(this.renderAllOrders)}
                </div>
            </div>     
        }
        return (
            <div>
                {showresults}
            </div>
        );
    }
    private renderAllOrders = (order, key) => {
        var sum = 0;  
        const dateTime = new Date(order[0].date)
        const date = dateTime.getDate();
        const month = dateTime.getMonth();
        const year = dateTime.getFullYear();
        order.map((item) =>{
            const totalPrice = item.price * item.amount;
            sum += totalPrice;
        })
        
        return (
            <div className="col-12 mb-5">
                    <Card key={key} >
                        <CardHeader className="cardHeader">    
                        <b><p className="left-items"style={{float:"left"}}>
                            <span className="OrderNumber">Ordernummer: {order[0].orderId}</span> 
                            <span className="OrderDate">Datum: {date + "-" + month + "-" +year}</span>
                            <span className="OrderPrice">Totale prijs: €{Math.round((sum) * 100) / 100} </span></p>  </b>
                            <p className="right-items"style={{float:"right"}}><span className="OrderStatus text-info">Status: {order[0].status}</span></p>                      
                        </CardHeader> 
                        <CardBody className="orderSection">       
                            <div className="row inner-boxes"> 
                                <div className="col sectionProductList">       
                                <ListGroup flush >
                                {order.map(this.renderAllOrderItems)}
                                </ListGroup>
                                </div> 
                            </div>               
                        </CardBody>
                    </Card>
                </div>  
        );
    }
    private renderAllOrderItems = (orderItem) =>
    {

        return(
            <div key={orderItem.id}>
                <ListGroupItem tag="span">
                <table className="table table-hover">
                <tbody>
                <tr>
                <td className="col">
                    <div className="media" >
                        <a className="thumbnail pull-left"> <img className="media-object" src={orderItem.imageName} style={{ width: '72px', height: '72px' }} /> </a>
                        <div className="media-body"  style={{ marginLeft: '15px' }}>
                            <h5  className="media-heading">{orderItem.name}</h5>
                            <span>Maat: </span>
                            
                            {orderItem.sizeName}
                        </div>
                    </div></td>
                <td className="col text-center">Qty.: <strong>{orderItem.amount}</strong></td>
                <td className="col text-center">Prijs per stuk: <strong>{orderItem.price}</strong></td>
                <td className="col text-center">Totaal: <strong>{Math.round((orderItem.amount * orderItem.price) * 100) / 100}</strong></td>
            </tr>
            </tbody>
            </table>
           </ListGroupItem>
            </div>
        );

    }
}
function mapStateToProps(state) {
    return {
      user: state.auth.user
    };
  }

export default connect(mapStateToProps, {getOrders: GetOrders})(Orders);
