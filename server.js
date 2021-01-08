// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes

const express = require('express');

// Start up an instance of app
const app = express();

// including body-parser pack

const bodyParser = require('body-parser')

// Cors for cross origin allowance

const cors = require('cors');
app.use(cors());


/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());



// Initialize the main project folder
app.use(express.static('website'));

// Setup Server

const port = 3000;

/* spin up the server */
const server = app.listen(port, listening);

function listening(){
	console.log('running on localhost: ' + port);
};
 


// GET route for '/getData'
app.get('/getData', (req, res) => {
	res.send(projectData);
	// resetting project data
	projectData = {};
});

//posting the data POST request
app.post('/add', function addData(req, res){
	dataToPost = {
		date : req.body.date,
		temp : req.body.temp,
		content : req.body.content
	}
	projectData = dataToPost;
});

