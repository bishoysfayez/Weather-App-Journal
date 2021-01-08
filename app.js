/* Global Variables */

    
    
 
// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.toLocaleString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });

const generateBtn = document.querySelector('#generate');
generateBtn.addEventListener('click', perfromAction);


// API URL & key

const apiURL = 'http://api.openweathermap.org/data/2.5/weather?zip=';
const key = '&appid=f1b096dd02a7f8bc641de299ed2b5e77&units=metric';

//http://api.openweathermap.org/data/2.5/weather?zip=85005&appid=f1b096dd02a7f8bc641de299ed2b5e77&units=metric'

// function for posting the data

function perfromAction(e){
   
    const zip = document.getElementById('zip');
    let zipCode = zip.value;
    const feelings = document.getElementById('feelings').value;
    getWeather(apiURL, zipCode, key)
    
        // Add data to POST request
        .then( function(data){
            console.log(data);
            postData('/add', {date: d, temp: data.main.temp, content: feelings})
            updateUI();
        
        })
};

// Async GET
const getWeather = async (apiURL, zipCode, key)=>{

    const res = await fetch(apiURL + zipCode + key);

    try {
        const data = await res.json();
        return data;
    }
    catch(error) {
        console.log('error', error);
    }
}

// Async POST
const postData = async (url = '', data = {}) => {
    console.log('from post app ' + data);
    const response = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    });
    try {
        const newData = await response.json();
        console.log(newData);
        return newData;
    }
    catch (error) {
        console.log('error', error);
    }
}

// Update user interface
const updateUI = async () => {
    const request = await fetch('/getData');
    try {
        const dataCollection = await request.json();
        console.log("here: "+ dataCollection);
        document.getElementById('date').innerHTML = ' Date : ' +  dataCollection.date;
        document.getElementById('temp').innerHTML = ' Temp : ' + dataCollection.temp;
        document.getElementById('content').innerHTML = ' You Feel : ' + dataCollection.content;
    }
    catch (error) {
        console.log('error', error);
    }
}



