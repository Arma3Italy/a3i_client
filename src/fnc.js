
const axios = require('axios');

function fetchAPI ( url, cb ) {
    axios.get(url)
        .then(response => cb(undefined, response.data))
        .catch(err => cb(err, {}));
};

module.exports = { fetchAPI };