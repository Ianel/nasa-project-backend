const express = require("express");
const cors = require("cors");

const app = express();

const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.status(200).json({
        success: true,
        response: "Hello World!",
    });
});

app.get("/picture-day", (req, res) => {
    let url = `https://api.nasa.gov/planetary/apod?api_key=${process.env.NASA_API_KEY}`;

    fetch(url)
        .then((response) => response.json())
        .then((r) => {
            console.log(r);

            res.status(200).json({
                success: true,
                response: r,
            });
        });
});

app.post("/mars-photos", (req, res) => {
    const { earthDate, rover } = req.body;

    if (!earthDate || !rover) {
        res.status(400).json({
            success: false,
            response: "Earth date and Rover name are mandatory",
        });
    }

    const roverName = rover.toLowerCase();

    let url = `https://api.nasa.gov/mars-photos/api/v1/rovers/${roverName}/photos?earth_date=${earthDate}&api_key=${process.env.NASA_API_KEY}`;

    fetch(url)
        .then((result) => result)
        .then((response) => response.json())
        .then((pictures) => {
            res.status(200).json({
                success: true,
                response: pictures.photos,
            });
        });
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
