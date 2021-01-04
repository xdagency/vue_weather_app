import axios from 'axios';

exports.handler = function(event, context, callback) {

    const parsedBody = JSON.parse(event.body);

    // axios.get(`https://api.openweathermap.org/data/2.5/weather/?q=${body.location}&appid=${process.env.WEATHER_API_KEY}&units=metric`)
    axios.get(`https://api.openweathermap.org/data/2.5/weather/?q=${parsedBody.location}&appid=${parsedBody.api_key}&units=metric`)

        .then(result => {

            callback(null, {
                statusCode: 200,
                body: JSON.stringify(result.data)
            })

        })

        .catch(error => {

            console.log(error);
            callback(new Error("Could not get weather."));

        });

}