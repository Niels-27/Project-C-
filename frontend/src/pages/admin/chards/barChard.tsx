import * as React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import ApiCall from '../../../logic/apiCall';
export default class AreaChardComp extends React.Component<any, any>{

    constructor(props: any) {
        super(props);
        this.state = {
            title: this.props.title,
            stats: null,
        };


    }

    public async componentDidMount() {
        const call: ApiCall = new ApiCall();
        call.setURL('AdminPopulairStats');
        await this.setState({ stats: await call.result() });
    }

    public render() {
        console.log(this.state.data);
        var data = [] as any[];
        if (!this.state.stats) {
            data = [{ name: 'Loading', Verkocht: 0 },
            ];
        }else{
            this.state.stats.forEach(x => {
                data.push({ name: x.name[0], Verkocht:x.sold});
            });
        }



        return (
            <div style={{ height: '330px', paddingBottom: '50px' }}>
                <h5 style={{ marginLeft: '35px' }}>{this.state.title}</h5>
                <ResponsiveContainer>
                    <BarChart data={data}
                        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="Verkocht" fill="#82ca9d" />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        );
    }

}