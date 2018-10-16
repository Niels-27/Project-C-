import * as React from 'react';
// import Navbar from '../components/all_pages/NavBar';
import ProductList from '../components/ProductList';
import ApiCall from '../logic/apiCall';
import { withRouter,Link} from 'react-router-dom';

class App extends React.Component<any,any>{

constructor(props:any){
    super(props);
    this.state = { product: null,searchString: ""};
    console.log(this.props);
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
            <div className="container" style={{marginTop: '15px' }}>
                <Link to='/'>Home </Link> > {this.props.match.params.category}
                <ProductList products={test}/>
            </div>
        );
    }
}



export default withRouter(App);
