import * as React from 'react';
<<<<<<< HEAD
import './dashboard.css';
import  LineChardComp from './chards/Linechards';
import PieChardComp from './chards/Piechard';
import AreaChardComp from './chards/Areacard';


=======
// import './dashboard.css';
>>>>>>> master
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
                    <AreaChardComp  title="Registraties 2019" />
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

                <div className="col-sm-6" style={{ minHeight: '100px' }}>
                    <LineChardComp title="Aanmeldingen" />
                </div>

                </div>
        );
    }

    
}

export default AdminHome;