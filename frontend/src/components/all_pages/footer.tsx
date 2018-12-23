import * as React from 'react';
import {Col, Nav, NavItem, NavLink, Row } from 'reactstrap';
import './footer.css' ;


 function Footer(/*props*/) {
  return (
    <footer className= "footer w-100 mt-5  ">
    <Row className="">
      <Col className="">
        <Nav justified className="">
          <NavItem>
            Customer Service
            <NavLink className="nav-item" href="#">Contact us</NavLink>
            <NavLink className="nav-item" href="#">Shipping & Delivery</NavLink>
            <NavLink className="nav-item" href="#">My Orders</NavLink>
          </NavItem>
          <NavItem>
            Legal Information
            <NavLink className="nav-item" href="#">Terms & Conditions</NavLink>
            <NavLink className="nav-item" href="#">Privacy Policy</NavLink>
            <NavLink className="nav-item" href="#">Right of Withdrawal</NavLink>
          </NavItem>
          <NavItem title="Item">
            About
            <NavLink className="nav-item" href="#">About HR Fashion</NavLink>
            <NavLink className="nav-item" href="#">Store Locations</NavLink>
        </NavItem>
        <NavItem title="Item">
          Follow Us 
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

