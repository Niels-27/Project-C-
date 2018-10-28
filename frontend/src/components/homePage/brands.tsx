import * as React from 'react';

// import "./brands.css";

class BrandGrid extends React.Component {

    public render() {
        return (
            <div className="brandsHomepage">
                <div className = "container-fluid">
                    <div className="row mt-5  ">
                        <div className="col-2 w-4 bg-dark text-white p-5 ml-5  mb-5 mr-2">
                            Adidas

                        </div>
                        <div className="col-2 bg-dark text-white p-5 ml-2  mb-5 mr-2">
                            Nike

                        </div>
                        <div className="col-2 bg-dark text-white p-5 ml-2  mb-5 mr-2">
                            HR Fashion

                        </div>
                        <div className="col-2 bg-dark text-white p-5 ml-2  mb-5 mr-2">
                            Cyka Blyat

                        </div>
                        <div className="col-2 bg-dark text-white p-5 ml-2 mb-5 mr-2">
                            Gucci
                        </div>
                    </div> 
                </div>
         </div>
        );
    }
}

export default BrandGrid;