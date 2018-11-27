import * as React from 'react';
// import Navbar from '../components/all_pages/NavBar';
import ProductList from '../components/ProductList';
import ApiCall from '../logic/apiCall';
import { withRouter,Link} from 'react-router-dom';

class App extends React.Component<any,any>{

constructor(props:any){
    super(props);
    this.state = { product: null, searchString: "",URL:null};
}
    public async componentDidMount() {


        this.setCattegory(this.props.match.params.category);
        this.refresh(this.props.match.params.search, this.props.match.params.category);

        
    }

    public setCattegory(URL){
        if (URL) {
            this.setState({ URL });  // Jeans..Hoodies... Shirts.. all gefilterd
        } else {
            this.setState({ URL: "Alle producten" });
        }
    }

    public componentWillReceiveProps(props){
        this.setCattegory(props.match.params.category);
        this.refresh(props.match.params.search, props.match.params.category);

    }

    public async refresh(str = "",cat=""){
        console.log(str);
        const call: ApiCall = new ApiCall();
        if (str !== "" && str) {
            call.setURL("search", str, cat);
        } else if (cat !== "all" && cat) {
            call.setURL('categorie', cat);
        }else{
            call.setURL('allProducts');
        }

        await this.setState({ product: await call.result() });
    }


    public render() {
        const test = this.state.product;
        return (
            <div className="container" style={{marginTop: '15px' }}>
                <Link to='/'>Home </Link> > {this.state.URL}
                <ProductList products={test}/>
            
            </div>
        );
    }
}



export default withRouter(App);
