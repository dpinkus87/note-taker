const express = require('express');
const path = require('path');

const db = require('./db/db');

const PORT = 3001;

const app = express();

app.use(express.static('public'));


// The following HTML routes should be created:

// COMPLETED: `GET /notes` should return the `notes.html` file.

app.get('/', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/notes.html'))
);

// COMPLETED: `GET *` should return the `index.html` file.

app.get('/', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/index.html'))
);

// The following API routes should be created:

// TODO: `GET /api/notes` should read the `db.json` file and return all saved notes as JSON.

app.get('/db/db', (req, res) => {
    res.status(200).json(db);
  });

// * `POST /api/notes` should receive a new note to save on the request body, add it to the `db.json` file, and then return the new note to the client. You'll need to find a way to give each note a unique id when it's saved (look into npm packages that could do this for you).

app.post('/api/reviews', (req, res) => {
    // Log that a POST request was received
    console.info(`${req.method} request received to add a review`);
  
    // Prepare a response object to send back to the client
    let response;
  
    // Check if there is anything in the response body
    if (req.body && req.body.product) {
      response = {
        status: 'success',
        data: req.body,
      };
      res.json(`Review for ${response.data.product} has been added!`);
    } else {
      res.json('Request body must at least contain a product name');
    }
  
    // Log the response body to the console
    console.log(req.body);
  });


  //-------//
app.listen(PORT, () =>
  console.log(`Express server listening on port ${PORT}!`)
);
