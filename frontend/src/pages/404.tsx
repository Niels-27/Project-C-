import * as React from 'react';
// import { MdFavorite, MdPerson, MdShoppingCart } from "react-icons/md"; // Hiermee Importeer je de Icons


class PageNotFound extends React.Component {

    public render() {
        return (
            <div style={{textAlign:'center',marginTop:'5%'}}>
                <h1>404 - Page not found</h1>
                <p>Blijkbaar hebben we ergens een fout gemaakt. om het goed te maken. hier is een plaatje van een schattige kat!</p>
                <img src={require('../images/cat.jpg')} width="60%"/>
            </div>
        );
    }
}

export default PageNotFound;