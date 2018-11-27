import * as React from 'react';
import Cookie from '../logic/cookie';
import ApiCall from '../logic/apiCall';

import "./shoppingCard.css";
class ShoppingCard extends React.Component<any, any> {

    public cookie: Cookie = new Cookie();
    constructor(props) {
        super(props);
        // let getProducts = undefined; // JSON.parse(Cookies.get('products'));
        this.state = { items: this.cookie.get('ShoppingCard') || undefined, products: null, map:null}
    }

    public async UpdateItems(obj: string = "") {
        const call: ApiCall = new ApiCall();
        call.setURL('array-id');
        if (this.state.items !== undefined) {
            if (obj !== "") {
                this.setState({ products: await call.result(JSON.parse(obj)) });
            } else {
                this.setState({ products: await call.result(JSON.parse(this.state.items)) });
            }

        }
    }
 
    public componentDidMount() {
        this.RefreshShoppingCard();
        this.UpdateItems();
        
    }

    public returnItemsMap = (items) => {
        const arr = JSON.parse(this.state.items).items;
        const map = arr.reduce((prev, cur) => {
            prev[cur] = (prev[cur] || 0) + 1;
            return prev;
        }, {});

        const renderOnClick = () =>{
            this.removeItemButton(items.id)
        }

        const increaseButton = () => {
            const c = this.cookie.get('ShoppingCard');
            if (c) {
                const d = JSON.parse(c);
                d.items.push(items.id.toString());
                this.cookie.set('ShoppingCard', JSON.stringify(d));
                /// add to cookie
            } else {
                const cjson = { items: [items.id.toString()] }
                this.cookie.set('ShoppingCard', JSON.stringify(cjson));
            }

            this.RefreshShoppingCard();
            this.UpdateItems();
        }
        
        const decreseButton = () => {
            const arrItem = JSON.parse(this.state.items).items;
            const newArr:string[] = [];
            var firstone = false;
            for (const item of arrItem) {
                if (!firstone && item.toString() === items.id.toString()){
                    firstone = true;
                }else{
                    newArr.push(item.toString());
                }
            }
            this.cookie.set('ShoppingCard', "{\"items\":" + JSON.stringify(newArr) + "}");

            this.RefreshShoppingCard();
            this.UpdateItems();
        }

        // Object.keys(map) all the items
        // const d = JSON.stringify(map)
        return (
            <tr>
                <td className="col-md-5">
                    <div className="media">
                        <a className="thumbnail pull-left" href="#"> <img className="media-object" src={items.imageName} style={{ width: '72px', height: '72px' }} /> </a>
                        <div className="media-body" style={{ marginLeft: '15px' }}>
                            <h5 className="media-heading"><a href="#">{items.name}</a></h5>
                            <span>Status: </span>
                            {this.returnAvailebility(map[items.id],items.amount)}
                        </div>
                    </div></td>

                <td className="col-md-2" style={{ textAlign: 'center' }}>
                   
                    <button className="ItemsIncreaseUp increaseItem btn btn-default" onClick={increaseButton}>+</button>
                    <input className="ItemsIncreaseInput increaseItem" value={map[items.id]} readOnly/>
                    <button className="ItemsIncreaseDown increaseItem btn btn-default" onClick={decreseButton}>-</button>
                </td>
                <td className="col-md-1 text-center"><strong>{items.price}</strong></td>
                <td className="col-md-1 text-center"><strong>{map[items.id] * items.price}</strong></td>
                <td className="col-md-1">
                    <button type="button" className="btn btn-danger" onClick={renderOnClick}>
                        <span  className="glyphicon glyphicon-remove" /> Remove
                        </button></td>
            </tr>

        );
    }

    public renderItems() {
        if (this.state.items && this.state.items !== undefined && this.state.products) {
              return this.state.products.map(this.returnItemsMap);
        } else {
            return <span className="span-grey">Uw winkelwagen is leeg!</span>;
        }
    }

    public renderShoppingCard() {
        if (this.state.showShoppingCard) {
            return (<div className="" >
                <div className="ShoppingCard-titleHolder">
                    Winkelwagen
                </div>
                <div className="ShoppingCard-container">
                    {this.renderItems()}
                </div>
            </div>);
        }
        return;
    }


    public render() {
        return (
            <div className="container">
            <table className="table table-hover">
                <thead>
                    <tr>
                        <th>Product</th>
                        <th>Quantity</th>
                        <th className="text-center">Price</th>
                        <th className="text-center">Total</th>
                        <th/>
                    </tr>
                </thead>
                <tbody>
                    {this.renderItems()}

                    <tr>
                        <td />
                        <td />
                        <td />
                        <td>Subtotal</td>
                            <td className="text-right" key="93hdnkwo2jm"><strong>{Math.round((this.returnTotalPrice()) * 100) / 100}</strong></td>
                    </tr>
                    <tr>
                        <td />
                        <td />
                        <td />
                        <td>Estimated shipping</td>
                        <td className="text-right"><strong>6.95</strong></td>
                    </tr>
                    <tr>
                        <td />
                        <td />
                        <td />
                        <td>Total</td>
                            <td className="text-right" key="3nXNMK3osm2ml"><strong>{Math.round((this.returnTotalPrice() + 6.95) * 100) / 100}</strong></td>
                    </tr>
                    <tr>
                        <td />
                        <td />
                        <td />
                        <td>
                                            <button type="button" className="btn btn-default">
                                                <span className="glyphicon glyphicon-shopping-cart"/> Continue Shopping
                        </button></td>
                        <td>
                        <button type="button" className="btn btn-success">
                            Checkout <span className="glyphicon glyphicon-play"/>
                        </button></td>
                    </tr>
                </tbody>
            </table>
            </div>
        );
    }

        private RefreshShoppingCard = () =>{
        const cookieInfo = this.cookie.get('ShoppingCard');
        
        if (this.state.items !== cookieInfo){

            this.setState({ items: cookieInfo || undefined });
            this.UpdateItems(cookieInfo);
        }

        
    }

    private removeItemButton = (id) =>{
        const c = this.cookie.get('ShoppingCard');
        if (c) {
            var d = JSON.parse(c);
            
            d = d.items.filter(item => item !== id.toString());
            this.cookie.set('ShoppingCard', "{\"items\":" +JSON.stringify(d) + "}");
            /// add to cookie
            this.RefreshShoppingCard();
            this.UpdateItems();
        }
    }




    private returnAvailebility = (amount,stock) =>{
        if (amount <= stock){
            return <span className="text-succes"><strong>Op voordaad</strong></span>;
        } else if (stock === 0){
            return <span className="text-danger"><strong>Niet op vooraad</strong></span>;
        }else{
            return <span className="text-warning"><strong>Niet goenoeg op vooraad</strong></span>;
        }
        
    }

    private returnTotalPrice =() =>{



        let count = 0;
        
        if (this.state.products && this.state.items){

        const arr = JSON.parse(this.state.items).items;
        const map = arr.reduce((prev, cur) => {
            prev[cur] = (prev[cur] || 0) + 1;
            return prev;
        }, {});

            for (const item of this.state.products) {
                count = count + item.price * map[item.id.toString()];  
            }

        }

        return count;
    }
    

}

export default (ShoppingCard);
