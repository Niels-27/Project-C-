import * as React from 'react';
// import Navbar from '../components/all_pages/NavBar';
import ProductList from '../components/ProductList';
import ApiCall from '../logic/apiCall';
import { withRouter,Link} from 'react-router-dom';

class App extends React.Component<any,any>{

constructor(props:any){
    super(props);
    this.state = { product: null, searchString: this.props.searchString,URL:null};
    console.log();
}
    public componentWillReceiveProps(nextProps) {
        this.refresh(nextProps.searchString);
    }

    public async componentDidMount() {
        if (this.props.match.params.category){
            this.setState({URL: this.props.match.params.category});
        }else{
            this.setState({ URL: "Alle producten" });
        }
        this.refresh(this.state.searchString);
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
