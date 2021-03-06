const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');
const path = require('path')
const config = require('config');
var favicon = require('serve-favicon')
const fileUpload = require('express-fileupload');


const app = express();

// Connect to database
connectDB();

app.use(cors())
app.use(express.json({ limit: '10MB' }));

app.use(fileUpload());

app.use(favicon(__dirname + '/public/favicon.ico'));

// Define Routes
app.use('/', require('./routes/index'));
app.use('/api/url', require('./routes/url'));


// Serve static assets if in production
if (process.env.NODE_ENV === 'production') {
    // Set static folder
    app.use(express.static('../client/build'));

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, '..', 'client', 'build', 'index.html'));
    });
}


const PORT = process.env.PORT || 5000

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
