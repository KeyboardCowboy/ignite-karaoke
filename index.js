const fs = require('fs-extra');
const path = require('path');
const express = require('express');
const { engine } = require('express-handlebars');
const app = express();
const bodyParser = require('body-parser');
const multer = require('multer');
const SlideDeckApp = require('./src/SlideDeckApp');

// Define some variables.
const webroot = 'public';
const slides_dir = `${webroot}/slides`;

const hbs = engine({
    partialsDir: __dirname + '/views/partials',
    helpers: {
        addOne: function(value) {
            return value + 1;
        }
    }
});

// Configure the web app.
app.engine('handlebars', hbs);
app.set('view engine', 'handlebars');
app.set('views', './views');
app.use(express.static(webroot));
app.use(bodyParser.urlencoded({ extended: true }));

// Configure the file storage.
const upload = multer({
    storage: multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, slides_dir);
        },
        filename: function (req, file, cb) {
            cb(null, 'slide' + Math.random() + '-' + Date.now() + path.extname(file.originalname));
        }
    }),
    // Define the file filter
    fileFilter: function (req, file, cb) {
        if (file.mimetype.startsWith('image/')) {
            // Accept the file
            cb(null, true);
            console.log(`✅ Adding ${file.originalname}...`);
        } else {
            // Reject the file.
            cb(null, false);
            console.log(`❌ Skipping ${file.originalname}...`);
        }
    }
});

// Generate the home page with form.
app.get('/', (req, res) => {
    SlideDeckApp.flushImageDir(fs, `${__dirname}/${webroot}/slides`);

    res.render('home', {
       title: "Ignite Karaoke"
    });
});

// Parse the form data.
app.post('/slideshow', upload.array('directory'), (req, res) => {
    let slides = SlideDeckApp.selectSlides(req.files, 20);

    res.render('slides', {
        'images': slides,
    });
});

// Run the webserver.
const port = 3000;
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
