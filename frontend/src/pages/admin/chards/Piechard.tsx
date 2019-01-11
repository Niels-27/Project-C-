import * as React from 'react';
import { Tooltip, PieChart, Pie, ResponsiveContainer} from 'recharts';
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
        // this.setstate({ data: this.props.data ,title:this.props.title });
        const call: ApiCall = new ApiCall();
        call.setURL('AdminStatsRigisterdVSGuest');
        await this.setState({ data: await call.result() });
    }

    public render() {
        var data = [] as any[];
        if (!this.state.data) {
            data = [{ name: 'loading', value: 1 }];
        } else {
            this.state.data.forEach(x => {
                data.push({ name: this.displayRank(x.rank), value: x.amount });
            });
        }




        return (
            <div style={{minWidth:'100px',minHeight:'100px',paddingBottom:'50px'}}>
                <h5 style={{ textAlign:'center' }}>{this.state.title}</h5>
                <ResponsiveContainer height={150}>
                <PieChart>
                        <Pie data={data} fill="#8884d8" />
                    <Tooltip />
                </PieChart>
                </ResponsiveContainer>
            </div>
        );
    }

    private displayRank = (rank) => {
        switch (rank) {
            case 1:
                return "Gebruiker";
            case 4:
                return "Administrator";
            case 2:
                return "Gast Aankoop";
            default:
                return "Er is iets fout gegaan";
        }
}
}