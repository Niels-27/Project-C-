import * as React from 'react';
import {Col, Nav, NavItem, Row } from 'reactstrap';
import './footer.css' ;


 function Footer(/*props*/) {
  return (
    <footer className= "footer w-100 mt-5  ">
    <Row className="">
      <Col className="">
        <Nav justified className="">
        <NavItem
            eventKey={1}>
            Customer Service
            <li className="nav-item ">
                            <a className="nav-link " href="#">Contact us</a>
                </li>
                <li className="nav-item">
                            <a className="nav-link" href="#">Shipping & Delivery</a>
                </li>
                <li className="nav-item">
                            <a className="nav-link" href="#">My Orders</a>
                </li>
          </NavItem>
          <NavItem
            eventKey={2}>
            Legal Information
            <li className="nav-item">
                            <a className="nav-link" href="#">Terms & Conditions</a>
                </li>
                <li className="nav-item">
                            <a className="nav-link" href="#">Privacy Policy</a>
                </li>
                <li className="nav-item">
                            <a className="nav-link" href="#">Right of Withdrawal</a>
                </li>
          </NavItem>
          <NavItem
            eventKey={3}
            title="Item">
            About
            <li className="nav-item">
                            <a className="nav-link" href="#">About HR Fashion</a>
                </li>
                <li className="nav-item">
                            <a className="nav-link" href="#">Store Locations</a>
                </li>
          </NavItem>
          <NavItem
            eventKey={4}
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