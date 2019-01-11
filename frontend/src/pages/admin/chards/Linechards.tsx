import * as React from 'react';

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer} from 'recharts';




export default class LineChardComp extends React.Component<any, any>{

    constructor(props: any) {
        super(props);
        this.state = { 
            title:this.props.title, 
        data: this.props.data};
    }

    public async componentDidMount() {

       // this.setstate({ data: this.props.data ,title:this.props.title });
    }

    public render() {
        var data;
        if(!this.state.data){
             data = [{name: 'Januari', "2018": 0, "2019": 5},
            {name: 'Februari', "2018": 0, "2019": 0},
            {name: 'Maart', "2018": 0, "2019": 0},
            {name: 'April', "2018": 0, "2019": 0},
            {name: 'Mei', "2018": 0, "2019": 0},
            {name: 'Juni', "2018": 0, "2019": 0},
            {name: 'juli', "2018": 0, "2019": 0},
            {name: 'Augustus', "2018": 0, "2019": 0},
            {name: 'Seuptember', "2018": 3, "2019": 0},
            {name: 'November', "2018": 9, "2019": 0},
            {name: 'December', "2018": 21, "2019": 0},];
        }else{ data = this.state.data;}
      


        return (
            <div style={{height:'300px'}}>
                <h5 style={{ marginLeft: '35px' }}>{this.state.title}</h5>
                <ResponsiveContainer>
                               	<LineChart data={data}
            margin={{top: 5, right: 30, left: 20, bottom: 5}}>
       <XAxis dataKey="name"/>
       <YAxis/>
       <CartesianGrid strokeDasharray="3 3"/>
       <Tooltip/>
       <Legend />
       <Line type="monotone" dataKey="2018" stroke="#8884d8" activeDot={{r: 8}}/>
       <Line type="monotone" dataKey="2019" stroke="#82ca9d" />
      </LineChart>
                </ResponsiveContainer>
                </div>
        );
    }
}
