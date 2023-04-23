// This is the JavaScript entry file - your code begins here
// Do not delete or rename this file ********

// An example of how you tell webpack to use a CSS (SCSS) file
import './css/styles.css';
import { getTravelerData, handleResponse } from './api-calls' 
import Travelers from './travelers';
import Trips from './trips';

import 'materialize-css/dist/js/materialize.min.js';
import 'materialize-css/dist/css/materialize.min.css';

// An example of how you tell webpack to use an image (also need to link to it in the index.html)
import './images/turing-logo.png'
import './images/lets-go-travel.jpg'

// Event Listeners

document.getElementById('destination').addEventListener('change', updateEstimatedCost);
document.getElementById('start-date').addEventListener('change', updateEstimatedCost);
document.getElementById('travelers').addEventListener('input', updateEstimatedCost);
document.getElementById('duration').addEventListener('input', updateEstimatedCost);


document.addEventListener('DOMContentLoaded', function() {
  M.AutoInit();
});
document.addEventListener('DOMContentLoaded', function() {
  M.AutoInit();

  var elems = document.querySelectorAll('.datepicker');
  var options = {
    defaultDate: new Date(),
    setDefaultDate: true,
    minDate: new Date(),
  };
  var instances = M.Datepicker.init(elems, options);
});

document.getElementById('booking-form').addEventListener('submit', processBookTripForm);



// Document Selectors
const pastTripsTable = document.querySelector('#past-trips tbody');
const futureTripsTable = document.querySelector('#future-trips tbody');
const welcomeName = document.querySelector('h1');
const amountSpent = document.querySelector('#amount-spent');
const destinationsForm = document.querySelector('select');
  M.FormSelect.init(destinationsForm);
const calendarForm = document.querySelector('.datepicker');
  M.Datepicker.init(calendarForm);
const userNameForm = document.querySelector('#user-name');
const destinationOptions = document.querySelector('#destination')

// global variables
let travelers;
let travelerID = 22;
let travelerName; 
let trips;

document.addEventListener("DOMContentLoaded", function() {
  getTravelerData(travelerID)
   .then(([allTravelersData, travelerData, destinationData, tripsData ]) => {
    travelerID = 22
    travelers = new Travelers(allTravelersData)
    trips = new Trips(destinationData, tripsData, travelerID)
    travelers.travelerID = travelerID

    renderWelcome();
    renderPastTrips(travelerID);
    renderFutureTrips(travelerID);
    renderAmountSpent(travelerID);
    autoFillBookTripForm();
   

});
});

function renderPastTrips(travelerID) {
  pastTripsTable.innerHTML = '';
  const usersPastTrips = trips.getPastTrips(travelerID)
  
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
};

function renderFutureTrips(travelerID) {
  const usersFutureTrips = trips.getFutureTripsAll(travelerID);
  futureTripsTable.innerHTML = '';
  usersFutureTrips.forEach((trip) => {
  const newFutureRow = futureTripsTable.insertRow();
  const dateCell = newFutureRow.insertCell(0);
  const cityCell = newFutureRow.insertCell(1);
  const daysCell = newFutureRow.insertCell(2);
  const partyCell = newFutureRow.insertCell(3);
  const statusCell = newFutureRow.inserCell(4);

  dateCell.innerHTML = trip.date;
  cityCell.innerHTML = trips.getDestination(trip.destinationID);
  daysCell.innerHTML = trip.duration;
  partyCell.innerHTML = trip.travelers;
  statusCell.innerHTML = trip.status;

})
};

function renderWelcome() {
  travelers.getTravelersFullName()
  const firstName = travelers.getTravelersFirstName()
  welcomeName.innerHTML = `Let's go travel, ${firstName}!`
}

function renderAmountSpent(travelerID) {
  const amount = trips.calculateLastYearTotalClient(travelerID)
console.log(amount)
  amountSpent.innerHTML = `You spent $${amount} traveling in 2022`
}

function autoFillBookTripForm() {
  userNameForm.value = travelers.getTravelersFullName()
  userNameForm.nextElementSibling.classList.add('active');

  trips.destinationData.sort((a, b) => {
    return a - b
  }).forEach((destination) => {
    const cities = document.createElement('option');
      cities.value = destination.id;
      cities.textContent = destination.destination;
      destinationOptions.appendChild(cities);
  })
  
  M.FormSelect.init(destinationOptions);
};

function processBookTripForm(event) {
  event.preventDefault();

  const destinationIdNewTrip = parseInt(document.getElementById('destination').value);
  const startDate = document.getElementById('start-date').value;
  const travelersParty = document.getElementById('travelers').value;
  const daysNewTrip = document.getElementById('duration').value; 
  const estimatedCost = trips.estimateTripCost(destinationIdNewTrip, travelersParty, daysNewTrip);
  document.getElementById('estimated-cost').value = `${estimatedCost}`
  
  
}

function updateEstimatedCost() {
  
  const destinationIdNewTrip = parseInt(document.getElementById('destination').value);
  const travelersParty = document.getElementById('travelers').value;
  const daysNewTrip = document.getElementById('duration').value;
  const estimatedCost = trips.estimateTripCost(destinationIdNewTrip, travelersParty, daysNewTrip);
  document.getElementById('estimated-cost').value = `$${estimatedCost}`;
  
}






