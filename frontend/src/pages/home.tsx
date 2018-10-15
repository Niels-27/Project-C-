import * as React from 'react';
// import Navbar from '../components/all_pages/NavBar';
import ProductList from '../components/ProductList2';
import ApiCall from '../logic/apiCall';
class App extends React.Component<any,any>{

constructor(props:any){
    super(props);
    this.state = { product: null,searchString: ""};
}
    public componentWillReceiveProps(nextProps) {
        this.refresh(nextProps.searchString);
    }

    public async componentDidMount() {
        this.refresh();
    }

    public async refresh(str = ""){
        const call: ApiCall = new ApiCall();
        if (str !== "") {
            call.setURL("search", str);
        } else {
            call.setURL('allProducts');
        }

        await this.setState({ product: await call.result() });
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
