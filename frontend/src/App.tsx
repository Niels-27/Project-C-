import * as React from 'react';


// import components here
import Routes from './Routes';



import Navbar from './components/all_pages/NavBar';

class App extends React.Component {
    public render() {
        return (
            <div>
                <Navbar />
                
                <Routes />
            </div>
        );
    }
}

// below a example to add a new page.
// <Route path="/login" component={Login} />
export default App;
