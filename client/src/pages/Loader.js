import React, { Component } from 'react';
import './Loader.css'

class Loader extends Component {
    constructor(props) {
        super(props);

        this.state = {
            type: props.type
        };
    };

    componentWillReceiveProps(props) {
        this.setState({ type: props.type });
    };

    render() {
        if (this.props.type === 'full') {
            return (
                <div className="Loader">
    
                    <div className="loader">
                        <div className="loader__figure"></div>
                        <p className="loader__label">Caricamento in corso ...</p>
                    </div>
                </div>
            );
        };
        return  <div className="Loaded"></div>;
    };
};

export default Loader;