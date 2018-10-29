import * as React from 'react';

// import "./brands.css";

class BrandGrid extends React.Component {

    public render() {
        return (
            <div className="brandsHomepage">
                <div className = "container-fluid">
                    <div id="brandRow"className="row mt-5  justify-content-center">
                        <a className="col-2 bg-dark nav-link text-white p-5 mb-5 mr-2 text-center" href="/AllProducts/Adidas">                    
                            <h6 className="h6-responsive">Adidas<span className="sr-only">Adidas</span>        </h6>                            
                        </a>

                        <a className="col-2 bg-dark nav-link text-white p-5 mb-5 mr-2 text-center" href="/AllProducts/Nike">
                            <h6 className="h6-responsive"> Nike<span className="sr-only">Nike</span> </h6>
                        </a>

                        <a className="col-2 bg-dark nav-link text-white p-5 mb-5 mr-2 text-center" href="/AllProducts/HRFashion">
                             <h6 className="h6-responsive">HR Fashion<span className="sr-only">HR Fashion</span> </h6>
                        </a> 
    
                        <a className="col-2 bg-dark nav-link text-white p-5 mb-5 mr-2 text-center" href="/AllProducts/CykaBlyat">
                            <h6 className="h6-responsive"> Cyka Blyat<span className="sr-only">Cyka Blyat</span> </h6>
                        </a>  

                        <a className="col-2 bg-dark nav-link text-white p-5 mb-5 text-center" href="/AllProducts/Gucci">
                         <h6 className="h6-responsive"> Gucci<span className="sr-only">Gucci</span> </h6>
                        </a>

                    </div> 
                </div>
         </div>
        );
    }
}

export default BrandGrid;