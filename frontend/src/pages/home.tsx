import * as React from 'react';

import ApiCall from '../logic/apiCall';

// components 
import ProductList from '../components/ProductList';
import Banner from '../components/homePage/banner';
import BrandGrid from '../components/homePage/brandbar';

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
            <div>
                
            <div style={{ textAlign: 'center', marginTop: '15px' }} className="container">
                <Banner />
                <BrandGrid/>
                <span><strong>Populaire Producten</strong></span>
                <ProductList products={this.state.product} maxItems={4}/>
                

            </div>
            </div>
        );
    }
}

export default Home;