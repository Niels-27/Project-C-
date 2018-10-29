import * as React from 'react';
import { Container, Row, Col } from 'reactstrap';
import './brandbar.css';

// import "./brands.css";

class BrandGrid extends React.Component {

    public render() {
        return (
            <div className="brandsHomepage">
            <Container>
                <Row>
                    <Col> 
                        <ul className="list-inline" style={{paddingTop:50, paddingLeft:20, paddingBottom: 20 }}>
                            <li className="list-inline-item">
                                <a  href="/AllProducts/Nike">
                                    <img className="BrandImg" src="https://www.footlocker.nl/INTERSHOP/static/WFS/Footlocker-Footlocker_NL-Site/-/Footlocker/en_GB/HOMEPAGE_Elements/Brand_Bar/Nike.png"/>
                                    </a>  
                            </li>

                            <li className="list-inline-item">
                                <a href="/AllProducts/Adidas">
                                    <img className="BrandImg" src="https://www.footlocker.nl/INTERSHOP/static/WFS/Footlocker-Footlocker_NL-Site/-/Footlocker/en_GB/HOMEPAGE_Elements/Brand_Bar/Adidas.png"/>
                                    </a>
                            </li>

                            <li className="list-inline-item">
                                <a href="/AllProducts/Puma">
                                    <img className="BrandImg" src="https://www.footlocker.nl/INTERSHOP/static/WFS/Footlocker-Footlocker_NL-Site/-/Footlocker/en_GB/HOMEPAGE_Elements/Brand_Bar/Puma.png"/>
                                    </a>
                            </li>

                            <li className="list-inline-item">
                                <a href="/AllProducts/Timberland">
                                    <img className="BrandImg" src="https://www.footlocker.nl/INTERSHOP/static/WFS/Footlocker-Footlocker_NL-Site/-/Footlocker/nl_NL/HOMEPAGE_Elements/Brand_Bar/timberland.png"/>
                                    </a>
                            </li>

                            <li className="list-inline-item">
                                <a href="/AllProducts/Reebok">
                                    <img className="BrandImg" src="https://www.footlocker.nl/INTERSHOP/static/WFS/Footlocker-Footlocker_NL-Site/-/Footlocker/nl_NL/HOMEPAGE_Elements/Brand_Bar/reebok.png"/>
                                    </a>
                            </li>

                            <li className="list-inline-item">
                                <a href="/AllProducts/Vans">
                                    <img className="BrandImg" src="https://www.footlocker.nl/INTERSHOP/static/WFS/Footlocker-Footlocker_NL-Site/-/Footlocker/nl_NL/HOMEPAGE_Elements/Brand_Bar/vans.png"/>
                                    </a>
                            </li>

                            <li className="list-inline-item">
                                <a href="/AllProducts/HRFashion">
                                    <img className="BrandImg" src="https://i.imgur.com/pSudOqh.png"/>
                                    </a>
                            </li>
                        </ul>               
                    </Col>
                </Row>
            </Container>     
         </div>
        );
    }
}

export default BrandGrid;