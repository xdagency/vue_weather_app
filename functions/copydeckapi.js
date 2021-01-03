import axios from 'axios';

exports.handler = function(event, context, callback) {

    // axios.get(`${process.env.COPYDECK_URL}`, { headers: { 'Authorization': 'Bearer ' + process.env.COPYDECK_API_KEY }})
    axios.get(`${process.env.VUE_APP_COPYDECK_URL}`, { headers: { 'Authorization': 'Bearer ' + process.env.VUE_APP_COPYDECK_API_KEY }})

        .then(result => {

            // set the results from airtable into copy array
            let copyArray = result.data.records;

            // compress what we get back from airtable into simple arrays of KEYS and VALUES
            // English
            let copyDeckEN = copyArray.map(elem => {
            return [elem.fields.Key, elem.fields.EN];
            // return this.copy[elem.fields.Key] = elem.fields.EN;
            });
            // Japanese
            let copyDeckJP = copyArray.map(elem => {
            return [elem.fields.Key, elem.fields.JP];
            // return this.copy[elem.fields.Key] = elem.fields.EN;
            });

            // turn the compressed copy array into an object and save to data function
            let copydeck = {
                EN: Object.fromEntries(copyDeckEN),
                JP: Object.fromEntries(copyDeckJP)
            }

            callback(null, {
                statusCode: 200,
                body: JSON.stringify(copydeck)
            })

        })

        .catch(error => {

            console.log(error);
            callback(new Error("Could not get copy."));

        });
    
}