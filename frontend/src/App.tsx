import * as React from 'react';
import './App.css';
import Navbar from './components/NavBar';
import * as Image1 from './Images/Pink-Harajuku-Dress.jpg';
 
class App extends React.Component {
  public render() {
    return (
      <div>
        <Navbar />
        <img src={Image1} alt="Pink Harajuku Dress"/>
      </div>
    );
  }
}

export default App;
