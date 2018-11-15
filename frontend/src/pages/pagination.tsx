import * as React from 'react';
import { Component} from 'react';
import Pagination from 'react-js-pagination';
import ApiCall from '../logic/apiCall';
import ProductList from "../components/ProductList";


// import { number, any } from 'prop-types';
// require("bootstrap/less/bootstrap.less");
 
 // type activePage = number; 
class Paging extends Component<any , any> {
  constructor(props) {
    super(props);
    this.state = {
        product : {items:null}, 
      currentPage: 0

    };
    this.handlePageChange = this.handlePageChange.bind(this);
  }
 
  public componentDidMount(){
    this.MakeApiCall(this.state.currentPage);
  }

  public async MakeApiCall(pgn){
    const call: ApiCall = new ApiCall();
    call.setURL('pageNation',pgn,'4');    
    await this.setState({ product: await call.result() });
    console.log(this.state.product.items);
  }

  public handlePageChange(pageNumber) {
    console.log(`active page is ${pageNumber}`);
    this.MakeApiCall(pageNumber -1);
    this.setState({currentPage: pageNumber - 1});
  }
 
  public renderProducts(products){
    if (products){
      return <ProductList products={products} />;
    }
    return null;
  }
  public render() {
    console.log(this.state.produ);
    return (
      <div>
      {this.renderProducts(this.state.product.items)}
        <Pagination
        Products= {this.state.productList}
          activePage={this.state.currentPage}
          itemsCountPerPage={3}
          totalItemsCount={30}
          pageRangeDisplayed={7}
          onChange={this.handlePageChange}
        />
      </div>
    );
  }
}
 export default Paging;

