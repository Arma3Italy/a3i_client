import React, { Component } from 'react';

class Cards extends Component {
    constructor(props) {
        super(props);

        this.state = {
            title: props.title,
            data: props.data
        };
    };

    createCards( arrayCardsData ) {
        arrayCardsData = arrayCardsData.map(data => (
            <div className="card m-2 col-lg-3" key={data.title} >
                <div className="card-body">
                    <h5 className="card-title">{data.title}</h5>
                    <p className="card-text">{data.body}</p>
                    <p className="card-text"><small className="text-muted">{data.date}</small></p>
                </div>
            </div>
        ));

        return arrayCardsData;
    }

    render() {
        return (
            <div className="changelog col-12 my-3">
                <h3>{this.state.title}</h3>
                <div className="content row">
                    {this.createCards( this.state.data )}
                </div>
            </div>
        );
    };
};

export default Cards;