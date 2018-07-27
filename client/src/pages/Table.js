import React, { Component } from 'react';

class Table extends Component {
    constructor(props) {
        super(props);

        this.state = {
            title: props.title,
            data: props.data
        };
    };

    componentWillReceiveProps(props) {
        this.setState({
            title: props.title,
            data: props.data
        });
    };

    createTab(arrayTabInfo) {
        arrayTabInfo = arrayTabInfo.map(data => (
            <div className="row shadow my-1"> <div className="bg-dark text-light col-4 rounded-left">{String(data.head)}</div> <div className="bg-light text-dark col-8 rounded-right">{data.body}</div> </div>
        ));

        return arrayTabInfo;
    };

    render() {
        return (
            <div className="info col-lg-7 my-3">
                <h3>Informazioni</h3>
                <div className="content m-3">
                    <div>
                        {this.createTab(this.state.data)}
                    </div>
                </div>
            </div>
        );
    };
};

export default Table;