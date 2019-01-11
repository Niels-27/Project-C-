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
            <NavLink className="nav-item" >Contact us</NavLink>
            <NavLink className="nav-item" >Shipping & Delivery</NavLink>
            <NavLink className="nav-item" >My Orders</NavLink>
          </NavItem>
          <NavItem>
            Legal Information
            <NavLink className="nav-item" >Terms & Conditions</NavLink>
            <NavLink className="nav-item" >Privacy Policy</NavLink>
            <NavLink className="nav-item" >Right of Withdrawal</NavLink>
          </NavItem>
          <NavItem title="Item">
            About
            <NavLink className="nav-item" >About HR Fashion</NavLink>
            <NavLink className="nav-item" >Store Locations</NavLink>
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

