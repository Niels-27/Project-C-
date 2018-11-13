import * as React from 'react';
import {  MdShoppingCart } from "react-icons/md"; // Hiermee Importeer je de Icons
import Cookie  from '../../logic/cookie';
import './ShoppingCard.css';
import ApiCall from '../../logic/apiCall';

class ShoppingCard extends React.Component<any, any> {

    public cookie: Cookie = new Cookie();

    constructor(props) {
        super(props);
        // let getProducts = undefined; // JSON.parse(Cookies.get('products'));
        this.state = { items: this.cookie.get('ShoppingCard') || undefined, showShoppingCard:false,products:null}
    }

    public async UpdateItems(){
        const call: ApiCall = new ApiCall();
        call.setURL('array-id');
        if (this.state.items !== undefined){
           this.setState({ products: await call.result(JSON.parse(this.state.items)) }); 
        }
    }

    public componentDidMount(){
        this.UpdateItems();
    }

    public returnItemsMap(items){
        return(
            <div>
            <p>{items.name}</p>
                </div>
        );
    }

    public renderItems(){
        if (this.state.items && this.state.items !== undefined && this.state.products){
            return <div>{this.state.products.map(this.returnItemsMap)}</div>;
        }else{
            return <span className="span-grey">Uw winkelwagen is leeg!</span>;
        }
    }

    public renderShoppingCard(){
        if (this.state.showShoppingCard){
            return (<div className="ShoppingCard-Holder" >
                <div className="ShoppingCard-titleHolder">
                    Winkelwagen
                </div>
                <div className="ShoppingCard-container">
                    {this.renderItems()}
                </div>
            </div>);
        }
        return ;
    }

    public render() {
        return (
            <div>
                <li className="nav-item"><span className="nav-link"><a onClick={this.handleOnClick}><MdShoppingCart size={32} style={{ color: 'white' }} /></a></span></li>
            
                {this.renderShoppingCard()}

            </div>
        );
    }

    private handleOnClick = () =>{
        const cookieInfo = this.cookie.get('ShoppingCard');
        if (this.state.items !== cookieInfo){
            this.setState({ showShoppingCard: !this.state.showShoppingCard, items: cookieInfo || undefined });
            this.UpdateItems();
        }else{
            this.setState({ showShoppingCard: !this.state.showShoppingCard});
        }
        
    }
}

export default (ShoppingCard);
