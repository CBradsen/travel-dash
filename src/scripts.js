// This is the JavaScript entry file - your code begins here
// Do not delete or rename this file ********

// An example of how you tell webpack to use a CSS (SCSS) file
import './css/styles.css';

// An example of how you tell webpack to use an image (also need to link to it in the index.html)
import './images/turing-logo.png'
import './images/lets-go-travel.jpg'



// Document Selectors
const pastTripsTable = document.getElementById('past-trips');

// global variables


// Event Listeners
document.addEventListener("DOMContentLoaded", function() {
  renderPastTrips();
});

function renderPastTrips() {
const newPastRow = pastTripsTable.insertRow();
const dateCell = newPastRow.insertCell(0);
const cityCell = newPastRow.insertCell(1);
const daysCell = newPastRow.insertCell(2);
const partyCell = newPastRow.insertCell(3);

dateCell.innerHTML = "2023-04-21";
cityCell.innerHTML = "New York";
daysCell.innerHTML = "3";
partyCell.innerHTML = "2";

}