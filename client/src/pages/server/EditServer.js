import React, { Component } from 'react';
import './EditServer.css';

class EditServer extends Component {
    render() {
        return (
            <div className="EditServer">
                <div className="xe_container">
                    <div className="">
                        <h1>Edit Server</h1>
                    </div>
                    <form>
                        <div className="group">
                            <label for="name">Nome</label>
                            <input type="text" name="name" autoFocus/>
                        </div>
                        <div className="group">
                            <label for="ip">IP</label>
                            <input type="text" name="ip"/>
                        </div>
                        <div className="group">
                            <label for="gamemode">Modalità di gioco</label>
                            <input type="text" name="gamemode"/>
                        </div>
                        <hr/>
                        <div className="group">
                            <label>Aggiornamenti</label>
                            <input type="text" name="changelogTitle"/>
                            <textarea name="changelogBody"/>
                        </div>
                        <button>INDIETRO</button>
                        <button>SALVA</button>
                    </form>
                </div>
            </div>
        );
    };
};

export default EditServer;