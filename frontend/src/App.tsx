import * as React from 'react';


// import components here
import Routes from './Routes';



import Navbar from './components/all_pages/NavBar';
import MenuBar from './components/all_pages/menu';

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
                <Navbar />
                <MenuBar changeSearch={this.changeSearchString}/>
                <Routes searchString={this.state.searchString}/>
            </div>
        );
    }
}

// below a example to add a new page.
// <Route path="/login" component={Login} />
export default App;
