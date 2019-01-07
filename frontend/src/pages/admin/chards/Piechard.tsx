import * as React from 'react';
import { Tooltip, PieChart, Pie, ResponsiveContainer} from 'recharts';
export default class PieChardComp extends React.Component<any, any>{

    constructor(props: any) {
        super(props);
        this.state = {
            title: this.props.title,
            data: this.props.data
        };
    }

    public async componentDidMount() {
        // this.setstate({ data: this.props.data ,title:this.props.title });
    }

    public render() {
        var data;
        if (!this.state.data) {
            data = [{ name: 'loading', value: 1 }];
        } else { data = this.state.data; }



        return (
            <div style={{minWidth:'100px',minHeight:'100px',paddingBottom:'50px'}}>
                <h5 style={{ textAlign:'center' }}>{this.state.title}</h5>
                <ResponsiveContainer height={150}>
                <PieChart>
                    <Pie data={data} fill="#82ca9d" />
                    <Tooltip />
                </PieChart>
                </ResponsiveContainer>
            </div>
        );
    }
}