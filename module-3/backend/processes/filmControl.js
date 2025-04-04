const Films = require("./../models/films");

async function addFilm (req, res) {
    try {
        const {title, runtime} = req.body;

        const alreadyExists = await Films.findOne({title});
        if(alreadyExists) {
            return console.status(301).json({
                message: "Film already airing."
            });
        }
        const movieEntry = new Films({
            title,
            runtime,
            noOfSeatsBooked: 0
        });
    } catch (err) {
        console.error(err);
        console.status(500).json({
            message: "server fucked up"
        });
    }
}