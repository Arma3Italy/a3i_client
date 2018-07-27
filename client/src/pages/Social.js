import React, { Component } from 'react'

export default class Social extends Component {
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

    createSocialLink(arraySocialLinks) {
        arraySocialLinks = arraySocialLinks.map(data => (
            <a href={data.link} className="btn btn-primary m-2" target="_blank" key={data.name}> <i className={data.icon}></i> {data.name.toUpperCase()} </a>
        ));

        return arraySocialLinks;
    };

    render() {
        return (
            <div className="links col-lg-4 my-3">
                <h3>{this.state.title}</h3>
                <div className="content">
                    {this.createSocialLink(this.state.data)}
                </div>
            </div>
        )
    }
}
