const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');
const path = require('path')
const config = require('config');


const app = express();

// Connect to database
connectDB();

app.use(cors())
app.use(express.json());

// Serve static assets if in production
if (process.env.NODE_ENV === 'production') {
    // Set static folder
    app.use(express.static('../client/build'));

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, '..', 'client', 'build', 'index.html'));
    });
}

// Define Routes
app.use('/', require('./routes/index'));
app.use('/api/url', require('./routes/url'));

const PORT = config.get('PORT');

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));