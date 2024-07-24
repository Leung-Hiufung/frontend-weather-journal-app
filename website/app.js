/* Global Variables */
const apiKey = '1221c4808a037e72ed338ae9e4c19f52&units=imperial';

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth() + '.' + d.getDate() + '.' + d.getFullYear();

//

const getWeather = async () => {
    let zip = document.getElementById('zip').value;
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?zip=${zip},au&appid=${apiKey}`);
    try {
        const data = await response.json();
        return data;
    } catch (error) {
        console.error(error);
    }
};

const postData = async (url, data) => {
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });

    try {
        const newData = await response.json();
        return newData;
    } catch (error) { 
        console.error(error);
    }
};

const updateUI = async () => {
    const response = await fetch('/all');

    try {
        const data = await response.json();
        document.getElementById('date').textContent = `Date: ${data.date}`;
        document.getElementById('temp').textContent = `Temperature: ${data.temperature}°F`;
        document.getElementById('content').textContent = `Feeling: ${data.userResponse}`;
    } catch (error) { 
        console.error(error);
    }
};

async function performAction() { 
    

    getWeather()
        .then(
            function (data) {
                let feelings = document.getElementById('feelings').value;
                postData('/add', { 'temperature': data.main.temp, 'date': newDate, 'userResponse': feelings });
            }
        ).then(
            function () {
                updateUI();
            }
        );
}

document.addEventListener('DOMContentLoaded', readyFunction);

function readyFunction() { 
    document.getElementById('generate').addEventListener('click', performAction);
}