const path = require('path');
const fs = require('fs');

function checkObject(type, data) {
    if (type === 'o') return (typeof data === 'object' ? data : JSON.parse(data));
    if (type === 's') return (typeof data === 'string' ? data : JSON.stringify(data));
};

function checkFile(rout, file, newData, cb) {
    const compRout = path.resolve(rout, file);
    fs.readdir(rout, (err) => {
        if (err) {
            fs.mkdir(rout, (e) => {
                if (e) {console.log('--> Error: Creating folder');}
                else { fs.writeFileSync( compRout, cb(newData, {}) ); };
            });
        } else {
            fs.readFile(compRout, 'utf8', (error, oldData) => fs.writeFileSync(compRout, cb(newData, oldData)));
        };
    });
};

module.exports = { checkObject, checkFile };