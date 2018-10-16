import * as React from 'react';
import ProductList from '../components/ProductList';
import ApiCall from '../logic/apiCall';
class Home extends React.Component<any,any>{

    constructor(props: any) {
        super(props);
        this.state = { product: null};
    }

    public async componentDidMount() {
        const call: ApiCall = new ApiCall();
        call.setURL('allProducts');
        await this.setState({ product: await call.result() });
    }

    public render() {
        return (
            <div style={{ textAlign: 'center', marginTop: '5%' }} className="container">

                <ProductList products={this.state.product} maxItems={4}/>

            </div>
        );
    }
}

export default Home;