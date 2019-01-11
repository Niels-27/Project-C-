import * as React from 'react';
import { Tooltip, PieChart, Pie, ResponsiveContainer } from 'recharts';
import ApiCall from '../../../logic/apiCall';
export default class PieChardComp extends React.Component<any, any>{

    constructor(props: any) {
        super(props);
        this.state = {
            title: this.props.title,
            data: this.props.data
        };
    }

    public async componentDidMount() {
        const call: ApiCall = new ApiCall();
        call.setURL('AdminStatsCategorie');
        await this.setState({ data: await call.result() });
    }

    public render() {
        var data = [] as any[];
        if (!this.state.data) {
            data = [{ name: 'loading', value: 1 }];
        } else {
            this.state.data.forEach(x => {
                x.cat.forEach(y => {
                    data.push({ name: y[0].name, value: x.sold });
                });
            });
            const result = [] as any[];
            data.forEach(function (a) {
                if (!this[a.name]) {
                    this[a.name] = { name: a.name, value: 0 };
                    result.push(this[a.name]);
                }
                this[a.name].value += a.value;
            }, Object.create(null));
            data = result;
        }

console.log(data);

        return (
            <div style={{ minWidth: '100px', minHeight: '100px', paddingBottom: '50px' }}>
                <h5 style={{ textAlign: 'center' }}>{this.state.title}</h5>
                <ResponsiveContainer height={150}>
                    <PieChart>
                        <Pie data={data} fill="#8884d8" />
                        <Tooltip />
                    </PieChart>
                </ResponsiveContainer>
            </div>
        );
    }


}