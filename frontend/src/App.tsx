import * as React from 'react';


// import components here
import Routes from './Routes';


class App extends React.Component<any,any> {
    constructor(props){
        super(props);
        this.state ={
            searchString:""
        }
        this.changeSearchString = this.changeSearchString.bind(this);
    }

    public changeSearchString(str){
        this.setState({searchString:str});
    }
    
    public render() {
        return (
            <div>
                <Routes searchString={this.state.searchString}/>
            </div>
        );
    }
}

// below a example to add a new page.
// <Route path="/login" component={Login} />
export default App;
