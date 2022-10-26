const pool = require('../../config/app');

const router = app => {

    app.get('/countries', (request, response) => {
        pool.query('SELECT * FROM countries', (error, result) => {
            if (error) throw error;

            response.send(result);
        });
    });

    app.get('/hotels/:city', (request, response) => {
        const city = request.params.city;

        pool.query('SELECT * FROM hotels WHERE city = ?', city, (error, result) => {
            if (error) throw error;

            response.send(result);
        });
    });

    // create city get module

    // create airTicket get module

}

module.exports = router;