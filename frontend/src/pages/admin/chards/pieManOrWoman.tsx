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
        call.setURL('AdminStatsManOrWoman');
        await this.setState({ data: this.fixData(await call.result()) });
    }

    public render() {
        var data;
        if (!this.state.data) {
            data = [{ name: 'loading', value: 1 }];
        } else { data = [{ name: 'Man', value: this.state.data[0] },
            { name: 'Vrouw', value: this.state.data[1] }];}



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

    private fixData(arr){
        var man = 0;
        var woman = 0;
        arr.forEach(e => {
            if (e.manOrWoman[0] === 1){
                woman += e.sold
            }else{
                man += e.sold
            }
        });
        return [man,woman];
    }
}