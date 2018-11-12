import * as React from 'react';
import { MdShoppingCart } from "react-icons/md"; // Hiermee Importeer je de Icons
import Cookie from '../../logic/cookie';
import './ShoppingCard.css';


class ShoppingCard extends React.Component<any, any> {

    public cookie: Cookie = new Cookie();

    constructor(props) {
        super(props);
        // let getProducts = undefined; // JSON.parse(Cookies.get('products'));
        this.state = { items: this.cookie.get('ShoppingCard') || undefined, showShoppingCard: false }
    }

    public renderItems() {
        if (this.state.items && this.state.items !== undefined) {
            const arr = JSON.parse(this.state.items).items;
            const map = arr.reduce((prev, cur) => {
                prev[cur] = (prev[cur] || 0) + 1;
                return prev;
            }, {});

            // Object.keys(map) all the items
            // JSON.stringify(map) all items plus how manny
            return JSON.stringify(map);
        } else {
            return <span className="span-grey">Uw winkelwagen is leeg!</span>;
        }
    }

    public renderShoppingCard() {
        if (this.state.showShoppingCard) {
            return (<div className="ShoppingCard-Holder" >
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
            <div>
                <li className="nav-item"><span className="nav-link"><a onClick={this.handleOnClick}><MdShoppingCart size={32} style={{ color: 'white' }} /></a></span></li>

                {this.renderShoppingCard()}

            </div>
        );
    }

    private handleOnClick = () => {
        this.setState({ showShoppingCard: !this.state.showShoppingCard, items: this.cookie.get('ShoppingCard') || undefined });
    }
}

export default (ShoppingCard);
