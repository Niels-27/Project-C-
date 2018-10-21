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
        this.refresh(this.props.match.params.search);

        
    }

    public setCattegory(URL){
        if (URL) {
            this.setState({ URL });
        } else {
            this.setState({ URL: "Alle producten" });
        }
    }

    public componentWillReceiveProps(props){
        this.setCattegory(props.match.params.category);
        this.refresh(props.match.params.search);

    }

    public async refresh(str = ""){
        const call: ApiCall = new ApiCall();
        if (str !== "" && str) {
            call.setURL("search", str);
        } else {
            call.setURL('allProducts');
        }

        await this.setState({ product: await call.result() });
    }
public handleClickFix(){
    var inputValue = (document.getElementById("Search_bar_input") as HTMLInputElement).value;
    console.log(inputValue);
    inputValue = "";
    console.log(inputValue);
    }

    public render() {
        const test = this.state.product;
        return (
            <div className="container" style={{marginTop: '15px' }}>
                <Link to='/' onClick={this.handleClickFix}>Home </Link> > {this.state.URL}
                <ProductList products={test}/>
            </div>
        );
    }
}



export default withRouter(App);
