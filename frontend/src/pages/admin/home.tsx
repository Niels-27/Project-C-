import * as React from 'react';
import './dashboard.css';
// import  LineChardComp from './chards/Linechards';
import PieChardComp from './chards/Piechard';
import AreaChardComp from './chards/Areacard';
import AreaSaleChardComp from './chards/areaSales';
import BarChard from './chards/barChard';

class AdminHome extends React.Component<any, any>{

    constructor(props: any) {
        super(props);
        this.state = { product: null,registrations_stats:null };
    }

    public async componentDidMount() {

    }

    
    public render() {
        console.log(this.state.registrations_stats);

        return (
            <div className="row">
                <div className="col-md-12" style={{minHeight:'100px'}}>
                    <AreaSaleChardComp title="Sales 2019" />
                    
                </div>
                <div className="col-sm-6" style={{ minHeight: '100px' }}>
                    <AreaChardComp title="Registraties 2019" />
                </div>
                <div className="col-sm-6" style={{ minHeight: '100px' }}>
                    <BarChard title="Populairste items Deze maand" />
                </div>

                <div className="col-sm-4" style={{ minHeight: '100px' }}>
                    <PieChardComp title="Man / Vrouw" />
                </div>
                <div className="col-sm-4" style={{ minHeight: '100px' }}>
                    <PieChardComp title="Categorien" />
                </div>
                <div className="col-sm-4" style={{ minHeight: '100px' }}>
                    <PieChardComp title="iets" />
                </div>



                </div>
        );
    }

    
}

export default AdminHome;