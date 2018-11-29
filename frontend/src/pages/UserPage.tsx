import * as React from 'react';

class UserPage extends React.Component<any,any>{
    constructor(props: any) {
        super(props);
        this.state = {};
    }

    public render() {
        return (
            <div className="container">                                     
                <div className="row m-md-5 justify-content-center"> 
                    <div className="col col-md-2"> 
                    Mijn overzicht
                    </div>
                    <div className="col col-md-8 ml-md-2"> 
                    Dashboard
                    </div>
                </div>     
            </div>
        );
    }
}

export default UserPage;