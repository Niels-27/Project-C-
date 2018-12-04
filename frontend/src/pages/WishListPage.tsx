import * as React from 'react';

class WishListPage extends React.Component<any,any>{
    constructor(props: any) {
        super(props);
        this.state = {};
    }

    public render() {
        return (
            <div className="container">                                     
                <div className="row m-md-5 justify-content-center"> 
                    <div className="col col-md-2"> 
                    Mijn wishlist:
                    </div>
                </div>     
            </div>
        );
    }
}

export default WishListPage;