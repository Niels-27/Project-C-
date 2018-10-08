import * as React from 'react';
import './App.css';
import Navbar from './components/NavBar';
import ProductList from './components/ProductList';
 
class App extends React.Component {
  public render() {
    return (
      <div>
        <Navbar />
        <ProductList />       
      </div>
    );
  }
}



export default App;
