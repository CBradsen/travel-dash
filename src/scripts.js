import './css/styles.css';
import { getTravelerData, handleResponse } from './api-calls';
import Travelers from './travelers';
import Trips from './trips';
import { getCurrentDate, formatDate, setTomorrowDate } from './utility';
import './images/lets-go-travel.jpg'


const pastTripsTable = document.querySelector('#past-trips tbody');
const futureTripsTable = document.querySelector('#future-trips tbody');
const welcomeName = document.querySelector('h2');
const amountSpent = document.querySelector('#amount-spent');
const destinationsForm = document.querySelector('select');
const calendarForm = document.querySelector('.datepicker');
const userNameForm = document.querySelector('#user-name');
const destinationOptions = document.querySelector('#destination');
const loginPage = document.querySelector(".login-container");
const loginForm = document.querySelector('.login-form')
const contentAfterLogin = document.querySelector(".content-after-login");
const startDateInput = document.getElementById("start-date");
const bookTripButton = document.getElementById('btn');

// Event Listeners
document.getElementById('destination').addEventListener('change', updateEstimatedCost);
document.getElementById('start-date').addEventListener('change', updateEstimatedCost);
document.getElementById('travelers').addEventListener('input', updateEstimatedCost);
document.getElementById('duration').addEventListener('input', updateEstimatedCost);
document.getElementById('booking-form').addEventListener('submit', processBookTripForm);
loginForm.addEventListener("submit", verifyLogin);

startDateInput.setAttribute("min", setTomorrowDate());


// global variables
let travelers;
let travelerID;
let travelerName; 
let trips;
let tripsLength;


function verifyLogin(event) {
  event.preventDefault(); 
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;
  if (password === "travel") {
    travelerID = checkUsername(username);
  } else {
    alert("Incorrect password or username, please try again.");
  }
  if (travelerID) {
      contentAfterLogin.classList.remove("hidden");
      loginPage.style.display = "none";
      fetchTravelerData(travelerID)
    }
  
}

function checkUsername(username) {
    if (username.startsWith("traveler")) {
    const currentID = parseInt(username.slice(8));
     if (currentID > 0 && currentID < 51) {
    return currentID
   } else {
      alert("Not a valid username. Please try again")
      return null;
    }
  }
}

function fetchTravelerData(travelerID) {
  getTravelerData(travelerID)

   .then(([allTravelersData, destinationData, tripsData ]) => {

    travelers = new Travelers(allTravelersData);
    trips = new Trips(destinationData, tripsData, travelerID);
    travelers.travelerID = travelerID;
    tripsLength = tripsData.trips.length;
    
    renderWelcome();
    renderPastTrips(travelerID);
    renderFutureTrips(travelerID);
    renderAmountSpent(travelerID);
    autoFillBookTripForm();
});
};

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
  futureTripsTable.innerHTML = '';
  const usersFutureTrips = trips.getFutureTripsAll(travelerID);
  
  usersFutureTrips.forEach((trip) => {
  const newFutureRow = futureTripsTable.insertRow();
  const dateCell = newFutureRow.insertCell(0);
  const cityCell = newFutureRow.insertCell(1);
  const daysCell = newFutureRow.insertCell(2);
  const partyCell = newFutureRow.insertCell(3);
  const statusCell = newFutureRow.insertCell(4);

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
  amountSpent.innerHTML = `You spent $${amount} traveling in 2022`
}

function autoFillBookTripForm() {
  userNameForm.value = travelers.getTravelersFullName()

  trips.destinationData.sort((a, b) => {
    return a.destination.localeCompare(b.destination);
  }).forEach((destination) => {
    const cities = document.createElement('option');
      cities.value = destination.id;
      cities.textContent = destination.destination;
      destinationOptions.appendChild(cities);
  }) 
};

function processBookTripForm(event) {
  event.preventDefault();
 
  const destinationIdNewTrip = parseInt(document.getElementById('destination').value);
  const startDate = formatDate(document.getElementById('start-date').value);
  const travelersParty = document.getElementById('travelers').value;
  const daysNewTrip = document.getElementById('duration').value; 
  const estimatedCost = trips.estimateTripCost(destinationIdNewTrip, travelersParty, daysNewTrip);
  
  document.getElementById('estimated-cost').value = `${estimatedCost}`
  
  const requestedTripData = {
    id: tripsLength += 1,
    userID: travelerID,
    destinationID: destinationIdNewTrip,
    travelers: travelersParty,
    date: startDate,
    duration: daysNewTrip,
    status: "pending",
    suggestedActivities: []
  }
    disableSubmitTripButton()
    submitNewTrip(requestedTripData)
    resetForm()
    enableSubmitTripButton()
}

function updateEstimatedCost() {
  const destinationIdNewTrip = parseInt(document.getElementById('destination').value);
  const travelersParty = document.getElementById('travelers').value;
  const daysNewTrip = document.getElementById('duration').value;
  const estimatedCost = trips.estimateTripCost(destinationIdNewTrip, travelersParty, daysNewTrip);
  document.getElementById('estimated-cost').value = `$${estimatedCost}`; 
}

function submitNewTrip(requestedTripData) {
  
  fetch("http://localhost:3001/api/v1/trips", {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(requestedTripData),

  })
  .then(response => response.json())
  .then(data => {
    console.log("New trip was successfully posted")
    return fetch("http://localhost:3001/api/v1/trips").then(handleResponse);
  })
  .then(tripsData => {
    trips.tripData = tripsData.trips;
    renderFutureTrips(travelerID);
  })
  .catch((error) => {
    if (error.message === '422') {
    alert("We're having a problem gathering your information. Please check your trip requests and try again.")
    } else {
    console.error("Error posting the data", error);
    alert('Error processing your trip request. Please try again later or call the Lets Go! office to have someone help you book your trip. We want to make your next adventure the best yet!');
    }
  });
}
 
function resetForm() {
  document.querySelector('#booking-form').reset();
  autoFillBookTripForm()
}

function disableSubmitTripButton() {
  document.querySelector('#btn-form').setAttribute('disabled', true);
}

function enableSubmitTripButton() {
    document.querySelector('#btn-form').removeAttribute('disabled');
  }


