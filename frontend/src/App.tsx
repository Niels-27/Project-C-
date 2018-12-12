import * as React from 'react';
import Routers from './Routes';
// import components here


class App extends React.Component<any,any> {
    constructor(props){
        super(props);
        this.state ={}
    }  
    public render() {
        return (
            <div>
                <Routers/>
            </div>
        );
    }
}

// below a example to add a new page.
// <Route path="/login" component={Login} />
export default App;
