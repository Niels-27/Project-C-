import * as React from 'react';
import * as PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {RetrieveData} from '../actions/userActions';
import { Row, Container } from 'reactstrap';
import Cookie from '../logic/cookie';



class WishListPage extends React.Component<any,any>{
    public static propTypes = {user: PropTypes.object.isRequired,
        retrieveWishListData: PropTypes.func.isRequired};

    public cookie: Cookie = new Cookie();

    constructor(props: any) {
        super(props);
        this.state = {
            wishlist: null
        };
        this.UpdateList = this.UpdateList.bind(this);
        this.renderWishListItem = this.renderWishListItem.bind(this);
    }

    public async componentDidMount(){
        this.UpdateList();
    }
    public DeleteFromWishFunc = async(id) =>{
        const options = {
            method: 'delete',
            headers: {
                'Content-type': 'application/x-www-form-urlencoded; charset=UTF-8'
            }
        }
        
        fetch("http://localhost:5000/api/user/wishlistDelete/"+this.props.user.unique_name+"/"+id, options).catch(err => {
            console.error('Request failed', err)
        })
        this.UpdateList();   
    }


    public renderWishListItem = (wishitem, index) => {

        return (
                <tr key={index} id={wishitem.id}>
                        <td><img src={wishitem.imageName} style={{width: 100, height: 100}}/></td>
                        <td>{wishitem.name}</td> 
                        <td>{wishitem.price}</td>
                        <td>{wishitem.amount}</td>
                        <td>
                            <button type="button" className="btn btn-success w-100" style={{marginBottom: 10}} onClick={this.addProductToShoppiongCard.bind(this, wishitem.id)}>
                                Toevoegen
                            </button>
                            <br/>
                            <button type="button" className="btn btn-danger w-100" onClick={this.DeleteFromWishFunc.bind(this,wishitem.id)}>
                                Verwijderen
                            </button>
                        </td>
                    </tr>    
        );
    }

    public render() {

        var test = <tr><td>Loading...</td></tr>
        console.log(this.state.wishlist)
        if (this.state.wishlist) {
            test = <div>
            <Container>
                <Row style={{marginTop:20}}>
                    <h1 style={{marginBottom:10, marginLeft:15}}>Mijn Wishlist</h1>
                </Row>
                <table className="table table-hover">
                    <thead>
                        <tr>
                            <th>Foto</th>
                            <th>Naam</th>
                            <th>Prijs</th>
                            <th>Amount</th>
                            <th>Button</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.wishlist.map(this.renderWishListItem)}
                    </tbody>
                </table>
            </Container>     
        </div>
        }
        return (
           <div>   {test}      </div>
        );
    }
    private async UpdateList(){
        const {retrieveWishListData} = this.props
        this.setState({wishlist: await 
            retrieveWishListData(this.props.user, "wishlistdata").then(async res => res, (error) => error)
 
        }) 
        console.log(this.props.user);
    }
    
    private addProductToShoppiongCard = (id) => {
        const c = this.cookie.get('ShoppingCard');
        if (c) {
            const d = JSON.parse(c);
            d.items.push(id.toString());
            this.cookie.set('ShoppingCard', JSON.stringify(d));
            /// add to cookie
        } else {
            const cjson = { items: [this.props.match.params.id.toString()] }
            this.cookie.set('ShoppingCard', JSON.stringify(cjson));
        }
    }
}

export default connect(mapStateToProps, {retrieveWishListData:RetrieveData})(WishListPage);;

function mapStateToProps(state) {
  return {
    user: state.auth.user
  };
}