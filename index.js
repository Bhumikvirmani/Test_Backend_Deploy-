const express = require("express");
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();
const app = express();
app.use(express.json());
const PORT = process.env.PORT || 5000;
const corsOptionsDelegate = (req, callback) => {
    const corsOptions = {
        origin: req.headers.origin,
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
        credentials: true
    };
    callback(null, corsOptions);
};
app.use(cors(corsOptionsDelegate));
app.use(express.urlencoded({ extended: true }));

app.post('/', (req, res) => {
    const { name, email, message } = req.body;
    console.log(`Name: ${name}, Email: ${email}, Message: ${message}`);
    res.status(200).json({ message: 'Data received successfully' });
}
);
app.get('/', (req, res) => {
    res.send('Hello World!');
});
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
