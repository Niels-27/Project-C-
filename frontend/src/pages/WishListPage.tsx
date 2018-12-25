import * as React from 'react';
import * as PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {RetrieveData} from '../actions/userActions';
import { Row, Container } from 'reactstrap';



class WishListPage extends React.Component<any,any>{
    public static propTypes = {user: PropTypes.object.isRequired,
        retrieveWishListData: PropTypes.func.isRequired};
    constructor(props: any) {
        super(props);
        this.state = {};
    }

    public async componentDidMount(){
        const {retrieveWishListData} = this.props
        await retrieveWishListData(this.props.user, "wishlistdata").then(res => {this.setState({user: res})}, (error) => {this.setState({user: error})});
        console.log(this.props.user);
        console.log(this.props.wishlist);
    }

    public DeleteFromWishFunc = (id) =>{
        const options = {
            method: 'delete',
            headers: {
                'Content-type': 'application/x-www-form-urlencoded; charset=UTF-8'
            }
        }
        
        fetch("http://localhost:5000/api/user/wishlistDelete/"+this.props.user.unique_name+"/"+id, options).catch(err => {
            console.error('Request failed', err)
        })
    }

    public render() {

        var test = <tr><td>Loading...</td></tr>

        if (this.props.wishlist) {
            test = this.props.wishlist.map(wishitem => {
                return(                    
                    
                    <tr key={wishitem.id}>
                        <td><img src={wishitem.imageName} style={{width: 100, height: 100}}/></td>
                        <td>{wishitem.name}</td> 
                        <td>{wishitem.price}</td>
                        <td>{wishitem.amount}</td>
                        <td>
                            <button type="button" className="btn btn-success w-100" style={{marginBottom: 10}}>
                                Toevoegen
                            </button>
                            <br/>
                            <button type="button" className="btn btn-danger w-100" onClick={this.DeleteFromWishFunc.bind(this, wishitem.id)}>
                                Verwijderen
                            </button>
                        </td>
                    </tr>           
                       
                );
            })
        }

        return (
            <div>
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
                            {test}
                        </tbody>
                    </table>
                </Container>     
            </div>
        );
    }
}

export default connect(mapStateToProps, {retrieveWishListData:RetrieveData})(WishListPage);;

function mapStateToProps(state) {
  return {
    user: state.auth.user
  };
}