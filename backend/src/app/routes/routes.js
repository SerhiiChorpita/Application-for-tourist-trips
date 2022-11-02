const pool = require('../../config/app');

const router = app => {
    app.use((req, res, next) => {
        res.header('Access-Control-Allow-Origin', '*');
        next();
    });
    app.get('/countries', (request, response) => {
        pool.query('SELECT * FROM countries', (error, result) => {
            if (error) throw error;

            response.send(result);
        });
    });

    app.get('/hotels/:country', (request, response) => {
        const country = request.params.country;

        pool.query('SELECT * FROM hotels WHERE country = ?', country, (error, result) => {
            if (error) throw error;

            response.send(result);
        });
    });

    app.get('/tickets', (request, response) => {
        pool.query('SELECT * FROM tickets', (error, result) => {
            if (error) throw error;

            response.send(result);
        });
    });

    app.get('/successfulorder', (request, response) => {
        pool.query('SELECT * FROM successfulorder', (error, result) => {
            if (error) throw error;

            response.send(result);
        });
    });

}

module.exports = router;