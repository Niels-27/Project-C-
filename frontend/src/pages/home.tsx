import * as React from 'react';
// import Navbar from '../components/all_pages/NavBar';
import ProductList from '../components/ProductList2';
import ApiCall from '../logic/apiCall';
class App extends React.Component<any,any>{

constructor(props:any){
    super(props);
    this.state={products:null};
}
    public async componentDidMount() {
        const call: ApiCall = new ApiCall();
        call.setURL('allProducts');
        this.setState({ product: await call.result() });
    }


    public render() {
        const test = this.state.product;
        return (
            <div>
                <ProductList products={test}/>
            </div>
        );
    }
}



export default App;
