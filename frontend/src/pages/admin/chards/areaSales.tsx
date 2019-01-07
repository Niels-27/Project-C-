import * as React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import ApiCall from '../../../logic/apiCall';
export default class AreaChardComp extends React.Component<any, any>{

    constructor(props: any) {
        super(props);
        this.state = {
            title: this.props.title,
            registrations_stats: null,
        };


    }

    public async componentDidMount() {
        const call: ApiCall = new ApiCall();
        call.setURL('Adminuserstats');
        await this.setState({ registrations_stats: await call.result() });
    }

    public render() {
        console.log(this.state.data);
        var data;
        if (!this.state.registrations_stats) {
            data = [{ name: 'Januari', Registraties: 0 },
            { name: 'Februari', Registraties: 0 },
            { name: 'Maart', Registraties: 0 },
            { name: 'April', Registraties: 0 },
            { name: 'Mei', Registraties: 0 },
            { name: 'Juni', Registraties: 0 },
            { name: 'juli', Registraties: 0 },
            { name: 'Augustus', Registraties: 0 },
            { name: 'September', Registraties: 0 },
            { name: 'Oktober', Registraties: 0 },
            { name: 'November', Registraties: 0 },
            { name: 'December', Registraties: 0 },];
        } else {
            data = [{ name: 'Januari', Registraties: this.state.registrations_stats[0] },
            { name: 'Februari', Registraties: this.state.registrations_stats[1] },
            { name: 'Maart', Registraties: this.state.registrations_stats[2] },
            { name: 'April', Registraties: this.state.registrations_stats[3] },
            { name: 'Mei', Registraties: this.state.registrations_stats[4] },
            { name: 'Juni', Registraties: this.state.registrations_stats[5] },
            { name: 'juli', Registraties: this.state.registrations_stats[6] },
            { name: 'Augustus', Registraties: this.state.registrations_stats[7] },
            { name: 'September', Registraties: this.state.registrations_stats[8] },
            { name: 'Oktober', Registraties: this.state.registrations_stats[9] },
            { name: 'November', Registraties: this.state.registrations_stats[10] },
            { name: 'December', Registraties: this.state.registrations_stats[11] },];
        }



        return (
            <div style={{ height: '300px', paddingBottom: '50px' }}>
                <h5 style={{ marginLeft: '35px' }}>{this.state.title}</h5>
                <ResponsiveContainer>
                    <AreaChart data={data}
                        margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Area type='monotone' dataKey='Registraties' stroke='#8884d8' fill='#8884d8' />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
        );
    }

}