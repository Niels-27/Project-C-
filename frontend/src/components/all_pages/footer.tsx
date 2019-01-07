import * as React from 'react';
import {Col, Nav, NavItem, Row } from 'reactstrap';
import './footer.css' ;


 function Footer(/*props*/) {
  return (
    <footer className= "footer w-100 mt-5  ">
    <Row className="">
      <Col className="">
        <Nav justified className="">
        <NavItem>
            Customer Service
            <li className="nav-item ">
                            <a className="nav-link " >Contact us</a>
                </li>
                <li className="nav-item">
                            <a className="nav-link" >Shipping & Delivery</a>
                </li>
                <li className="nav-item">
                            <a className="nav-link" >My Orders</a>
                </li>
          </NavItem>
          <NavItem>
            Legal Information
            <li className="nav-item">
                            <a className="nav-link" >Terms & Conditions</a>
                </li>
                <li className="nav-item">
                            <a className="nav-link" >Privacy Policy</a>
                </li>
                <li className="nav-item">
                            <a className="nav-link" >Right of Withdrawal</a>
                </li>
          </NavItem>
          <NavItem
            title="Item">
            About
            <li className="nav-item">
                            <a className="nav-link" >About HR Fashion</a>
                </li>
                <li className="nav-item">
                            <a className="nav-link" >Store Locations</a>
                </li>
          </NavItem>
          <NavItem
            title="Item">
            Follow Us 
            {/* social media Links here
             <li className="nav-item">
                            <a className="nav-link" href="#">Facebook</a>
                </li>
                <li className="nav-item">
                            <a className="nav-link" href="#">Twitter</a>
                </li> */}
          </NavItem>
          
               
        </Nav>
         <div className="text-right  copyright">
          © HR 2018
        </div>

      </Col>
      </Row>
    </footer>
  );
}
 export default Footer; 