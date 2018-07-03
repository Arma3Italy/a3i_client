import React, { Component } from 'react';

class BG extends Component {
    render() {
        return (
            <div className="BG" style={{ 
                    backgroundColor: '#eee',
                    height: '100vh',
                    width: '100%',
                    position: 'fixed',
                    top: '0',
                    left: '0',
                    zIndex: '-100'
                }}>
            </div>
        );
    };
};

export default BG;