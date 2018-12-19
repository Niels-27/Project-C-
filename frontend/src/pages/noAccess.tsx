import * as React from 'react';
// import { MdFavorite, MdPerson, MdShoppingCart } from "react-icons/md"; // Hiermee Importeer je de Icons


class PageNotFound extends React.Component {

    public render() {
        return (
            <div style={{textAlign:'center',marginTop:'5%'}}>
                <h1>403 - Forbidden</h1>
                <p>Hehe, jij dacht slim te zijn, maar helaas heb je geen toegang tot deze pagina.</p>
                <p>Dat kan door verschillende redenen komen:</p>
                <ul className="list-unstyled">
                    <li>Je winkelmand is leeg en je probeert via de url binnen te komen :)</li>
                    <li>Je bent niet geauthoriseerd en je probeert via de url binnen te komen :).</li>
                    <li>Je probeert via een niet-geautoriseerde weg binnen te komen.</li>
                </ul>
                
                <img src={require('../images/cat.jpg')} width="60%"/>
                <p>Ik verwijs u graag door naar de volgende pagina >><a className="nav-link" href="/">Go Home</a></p>
            </div>
        );
    }
}

export default PageNotFound;