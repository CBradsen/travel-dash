// This is the JavaScript entry file - your code begins here
// Do not delete or rename this file ********

// An example of how you tell webpack to use a CSS (SCSS) file
import './css/styles.css';
import { getTravelerData, handleResponse } from './api-calls' 

// An example of how you tell webpack to use an image (also need to link to it in the index.html)
import './images/turing-logo.png'
import './images/lets-go-travel.jpg'



// Document Selectors
const pastTripsTable = document.getElementById('past-trips');

// global variables
let travelerID = 1


// Event Listeners
document.addEventListener("DOMContentLoaded", function() {
  renderPastTrips();
});

getTravelerData(travelerID)
  .then(([allTravelersData, travelerData, destinationData, tripsData ]) => {
    console.log(allTravelersData, travelerData, destinationData, tripsData)
    makeNewClassInstances(allTravelersData, travelerData, destinationData, tripsData, travelerID)
    renderPastTrips(travelerID)
  })

function makeNewClassInstances(allTravelersData, travelerData, destinationData, tripsData, travelerID) {
const travelers = new Travelers(allTravelersData)
const trips = new Trips(destinationData, tripsData, travelerID)
}

function renderPastTrips(travelerID) {
const usersPastTrips = trips.getPastTrips(travelerID);

pastTripsTable.innerHTML = '';

usersPastTrips.forEach((trip) => { 
const newPastRow = pastTripsTable.insertRow();
const dateCell = newPastRow.insertCell(0);
const cityCell = newPastRow.insertCell(1);
const daysCell = newPastRow.insertCell(2);
const partyCell = newPastRow.insertCell(3);

dateCell.innerHTML = trip.date;
cityCell.innerHTML = trips.getDestination(trip.destinationID);
daysCell.innerHTML = trip.duration;
partyCell.innerHTML = trip.travelers;
})
}