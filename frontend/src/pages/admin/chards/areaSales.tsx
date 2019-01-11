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
        call.setURL('Adminsalestats');
        await this.setState({ registrations_stats: await call.result() });
    }

    public render() {
        console.log(this.state.data);
        var data;
        if (!this.state.registrations_stats) {
            data = [{ name: 'Januari', Verkocht: 0 },
            { name: 'Februari', Verkocht: 0 },
            { name: 'Maart', Verkocht: 0 },
            { name: 'April', Verkocht: 0 },
            { name: 'Mei', Verkocht: 0 },
            { name: 'Juni', Verkocht: 0 },
                { name: 'juli', Verkocht: 0 },
            { name: 'Augustus', Verkocht: 0 },
            { name: 'September', Verkocht: 0 },
                { name: 'Oktober', Verkocht: 0 },
            { name: 'November', Verkocht: 0 },
            { name: 'December', Verkocht: 0 },];
        } else {
            data = [{ name: 'Januari', Verkocht: this.state.registrations_stats[0] },
                { name: 'Februari', Verkocht: this.state.registrations_stats[1] },
            { name: 'Maart', Verkocht: this.state.registrations_stats[2] },
            { name: 'April', Verkocht: this.state.registrations_stats[3] },
            { name: 'Mei', Verkocht: this.state.registrations_stats[4] },
            { name: 'Juni', Verkocht: this.state.registrations_stats[5] },
            { name: 'juli', Verkocht: this.state.registrations_stats[6] },
            { name: 'Augustus', Verkocht: this.state.registrations_stats[7] },
            { name: 'September', Verkocht: this.state.registrations_stats[8] },
            { name: 'Oktober', Verkocht: this.state.registrations_stats[9] },
            { name: 'November', Verkocht: this.state.registrations_stats[10] },
            { name: 'December', Verkocht: this.state.registrations_stats[11] },];
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
                        <Area type='monotone' dataKey='Verkocht' stroke='#8884d8' fill='#8884d8' />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
        );
    }

}