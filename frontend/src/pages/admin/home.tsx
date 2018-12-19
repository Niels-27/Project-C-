import * as React from 'react';
// import './dashboard.css';
class AdminHome extends React.Component<any, any>{

    constructor(props: any) {
        super(props);
        this.state = { product: null };
    }

    public async componentDidMount() {

    }

    public render() {
        return (
            <div>Homepage</div>
        );
    }
}

export default AdminHome;