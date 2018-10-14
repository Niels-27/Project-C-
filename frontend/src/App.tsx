import * as React from 'react';


// import components here
import Routes from './Routes1';



import Navbar from './components/all_pages/NavBar';
import MenuBar from './components/all_pages/menu';

class App extends React.Component {
    public render() {
        return (
            <div>
                <Navbar />
                <MenuBar />
                <Routes />
            </div>
        );
    }
}

// below a example to add a new page.
// <Route path="/login" component={Login} />
export default App;
